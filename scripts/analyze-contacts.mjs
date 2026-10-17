#!/usr/bin/env node
/**
 * analyze-contacts.mjs
 *
 * Read the invoice CSV, dedupe by email, compute per-customer RFM stats,
 * and print a report so we can agree on scoring before any API call.
 *
 * Usage:
 *   node scripts/analyze-contacts.mjs <path-to-csv>
 */

import { readFileSync } from 'node:fs'
import { parse } from 'csv-parse/sync'

const csvPath = process.argv[2]
if (!csvPath) {
  console.error('Usage: node scripts/analyze-contacts.mjs <path-to-csv>')
  process.exit(1)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rows = readCsv(csvPath)

/**
 * Read the CSV line-by-line and parse each line independently. The export
 * file mixes quoted and unquoted fields and occasionally has unbalanced
 * quotes inside an address field; parsing per-line lets us skip the bad
 * ones without losing everything after them.
 */
function readCsv(path) {
  const text = readFileSync(path, 'utf8')
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0)
  if (lines.length === 0) return []

  const header = parseLine(lines[0])
  if (!header) {
    console.error('Could not parse header row')
    process.exit(1)
  }

  const out = []
  let skipped = 0
  for (let i = 1; i < lines.length; i++) {
    const cols = parseLine(lines[i])
    if (!cols) {
      skipped++
      continue
    }
    const record = {}
    for (let j = 0; j < header.length; j++) {
      record[header[j]] = cols[j] ?? ''
    }
    out.push(record)
  }
  if (skipped) console.log(`(Skipped ${skipped} malformed lines)`)
  return out
}

function parseLine(line) {
  try {
    const rows = parse(line, {
      skip_empty_lines: true,
      relax_column_count: true,
      relax_quotes: true,
      trim: true,
    })
    return rows[0] ?? null
  } catch {
    return null
  }
}

console.log(`Total rows: ${rows.length}`)

const byEmail = new Map()
let noEmail = 0
let badEmail = 0

for (const r of rows) {
  const email = (r['Email'] || '').toLowerCase().trim()
  if (!email) {
    noEmail++
    continue
  }
  if (!EMAIL_RE.test(email)) {
    badEmail++
    continue
  }

  const total = parseFloat(r['Total']) || 0
  const dateStr = r['Invoice Date']
  const date = parseDate(dateStr)

  let entry = byEmail.get(email)
  if (!entry) {
    entry = {
      email,
      firstName: r['Contact First'] || '',
      lastName: r['Contact Last'] || '',
      customerName: r['Customer Name'] || '',
      totalSpent: 0,
      invoiceCount: 0,
      firstDate: null,
      lastDate: null,
    }
    byEmail.set(email, entry)
  }
  entry.totalSpent += total
  entry.invoiceCount += 1
  if (date) {
    if (!entry.firstDate || date < entry.firstDate) entry.firstDate = date
    if (!entry.lastDate || date > entry.lastDate) entry.lastDate = date
  }
  // Prefer the most recent first/last name (later rows overwrite if non-empty).
  if (r['Contact First']) entry.firstName = r['Contact First']
  if (r['Contact Last']) entry.lastName = r['Contact Last']
}

const contacts = [...byEmail.values()]
console.log(`Rows with no email: ${noEmail}`)
console.log(`Rows with invalid email: ${badEmail}`)
console.log(`Unique valid emails: ${contacts.length}`)
console.log()

if (contacts.length === 0) {
  process.exit(0)
}

const totalSpend = contacts.reduce((s, c) => s + c.totalSpent, 0)
console.log(`Total invoiced across unique customers: $${totalSpend.toFixed(2)}`)
console.log(`Average per customer: $${(totalSpend / contacts.length).toFixed(2)}`)
console.log()

// Distributions
const repeat = contacts.filter((c) => c.invoiceCount >= 2).length
const veryRepeat = contacts.filter((c) => c.invoiceCount >= 5).length
console.log(`Customers with 2+ invoices: ${repeat}`)
console.log(`Customers with 5+ invoices: ${veryRepeat}`)
console.log()

const now = new Date()
const within1y = contacts.filter(
  (c) => c.lastDate && (now - c.lastDate) / (1000 * 60 * 60 * 24) <= 365,
).length
const within2y = contacts.filter(
  (c) => c.lastDate && (now - c.lastDate) / (1000 * 60 * 60 * 24) <= 730,
).length
console.log(`Customers active in last 1 year:  ${within1y}`)
console.log(`Customers active in last 2 years: ${within2y}`)
console.log()

// RFM scoring (0–10 per dimension, sum 0–30).
const scored = contacts.map((c) => {
  const r = recencyScore(c.lastDate, now)
  const f = frequencyScore(c.invoiceCount)
  const m = monetaryScore(c.totalSpent)
  return { ...c, r, f, m, score: r + f + m }
})

// === Strategy C: recent (last 3y) OR top spenders ($1000+ lifetime) ===
const THREE_YEARS_MS = 1095 * 24 * 60 * 60 * 1000
const HIGH_SPEND_THRESHOLD = 1000
const CAP = 1000

const recent = scored.filter(
  (c) => c.lastDate && now - c.lastDate <= THREE_YEARS_MS,
)
const bigSpenders = scored.filter((c) => c.totalSpent >= HIGH_SPEND_THRESHOLD)

const union = new Map()
for (const c of recent) union.set(c.email, c)
for (const c of bigSpenders) union.set(c.email, c)
const eligible = [...union.values()].sort((a, b) => b.score - a.score)

const final = eligible.slice(0, CAP)

console.log('=== STRATEGY C: recent (last 3y) OR lifetime $1000+ ===')
console.log(`Recent customers (active last 3y):   ${recent.length}`)
console.log(`Big spenders ($1000+ lifetime):       ${bigSpenders.length}`)
console.log(`Union (deduped):                      ${eligible.length}`)
console.log(`Final import list (capped at ${CAP}):     ${final.length}`)
console.log()

console.log('--- TOP 20 OF FINAL LIST ---')
printTable(final.slice(0, 20))
console.log()
console.log('--- BOTTOM 20 OF FINAL LIST (sanity check) ---')
printTable(final.slice(-20))
console.log()

if (eligible.length > CAP) {
  console.log(
    `⚠️  ${eligible.length - CAP} eligible contacts would be dropped at the ${CAP} cap.`,
  )
}

// Write the final list to a JSON file so the import script can read it
// without re-running the heavy analysis.
const { writeFileSync } = await import('node:fs')
const { fileURLToPath } = await import('node:url')
const outPath = fileURLToPath(new URL('./contacts-to-import.json', import.meta.url))
const slim = final.map((c) => ({
  email: c.email,
  firstName: c.firstName,
  lastName: c.lastName,
  totalSpent: Math.round(c.totalSpent * 100) / 100,
  invoiceCount: c.invoiceCount,
  lastDate: c.lastDate?.toISOString().slice(0, 10) ?? null,
  score: c.score,
}))
writeFileSync(outPath, JSON.stringify(slim, null, 2))
console.log(`Wrote ${final.length} contacts → ${outPath}`)

// --- helpers ----------------------------------------------------------------

function parseDate(s) {
  if (!s) return null
  // CSV uses MM/DD/YYYY.
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (!m) return null
  const [, mm, dd, yyyy] = m
  const d = new Date(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`)
  return isNaN(d.getTime()) ? null : d
}

function recencyScore(lastDate, now) {
  if (!lastDate) return 0
  const days = (now - lastDate) / (1000 * 60 * 60 * 24)
  if (days <= 90) return 10
  if (days <= 180) return 9
  if (days <= 365) return 8
  if (days <= 730) return 6
  if (days <= 1095) return 4
  if (days <= 1825) return 2
  return 1
}

function frequencyScore(n) {
  if (n >= 10) return 10
  if (n >= 6) return 8
  if (n >= 4) return 6
  if (n >= 3) return 5
  if (n >= 2) return 3
  return 1
}

function monetaryScore(total) {
  if (total >= 5000) return 10
  if (total >= 2500) return 8
  if (total >= 1000) return 6
  if (total >= 500) return 4
  if (total >= 250) return 3
  if (total >= 100) return 2
  return 1
}

function printTable(rows) {
  const header = ['SCORE', 'R/F/M', '$ TOTAL', 'INV', 'LAST', 'NAME', 'EMAIL']
  const widths = [5, 8, 9, 4, 10, 24, 36]
  console.log(header.map((h, i) => h.padEnd(widths[i])).join(' '))
  for (const c of rows) {
    const name = `${c.firstName} ${c.lastName}`.trim().slice(0, widths[5])
    const last = c.lastDate ? c.lastDate.toISOString().slice(0, 10) : '-'
    console.log(
      [
        String(c.score).padEnd(widths[0]),
        `${c.r}/${c.f}/${c.m}`.padEnd(widths[1]),
        `$${c.totalSpent.toFixed(2)}`.padEnd(widths[2]),
        String(c.invoiceCount).padEnd(widths[3]),
        last.padEnd(widths[4]),
        name.padEnd(widths[5]),
        c.email.slice(0, widths[6]),
      ].join(' '),
    )
  }
}
