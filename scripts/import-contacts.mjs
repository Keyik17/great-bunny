#!/usr/bin/env node
/**
 * import-contacts.mjs
 *
 * Read scripts/contacts-to-import.json (produced by analyze-contacts.mjs)
 * and POST each contact to the Resend Audience defined in .env.local.
 *
 * Rate-limited to ~5 requests/second (Resend allows 10/s; we leave headroom).
 * Treats HTTP 422 ("contact already exists") as no-op success.
 * Resumable: re-running skips contacts already in the audience.
 *
 * Usage:
 *   node scripts/import-contacts.mjs [--dry-run]
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const DRY_RUN = process.argv.includes('--dry-run')
const PAUSE_MS = 200 // 5 req/sec

// --- env -----------------------------------------------------------------
loadDotenv()
const API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
if (!API_KEY || !AUDIENCE_ID) {
  console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID in .env.local')
  process.exit(1)
}

// --- input ---------------------------------------------------------------
const path = fileURLToPath(new URL('./contacts-to-import.json', import.meta.url))
const contacts = JSON.parse(readFileSync(path, 'utf8'))
console.log(`Loaded ${contacts.length} contacts from contacts-to-import.json`)
if (DRY_RUN) console.log('DRY RUN, no API calls will be made.')
console.log()

// --- import loop ---------------------------------------------------------
let added = 0
let alreadyExisting = 0
let failed = 0
const errors = []

for (let i = 0; i < contacts.length; i++) {
  const c = contacts[i]
  const label = `[${String(i + 1).padStart(3, ' ')}/${contacts.length}] ${c.email}`

  if (DRY_RUN) {
    console.log(`${label}  (dry-run, would add)`)
    continue
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: c.email,
          first_name: c.firstName || undefined,
          last_name: c.lastName || undefined,
          unsubscribed: false,
        }),
      },
    )

    if (res.ok) {
      added++
      console.log(`${label}  ✓ added`)
    } else if (res.status === 422) {
      alreadyExisting++
      console.log(`${label}  · already exists`)
    } else {
      failed++
      const body = await res.text().catch(() => '')
      errors.push({ email: c.email, status: res.status, body })
      console.log(`${label}  ✗ ${res.status} ${body.slice(0, 80)}`)
    }
  } catch (err) {
    failed++
    errors.push({ email: c.email, error: String(err) })
    console.log(`${label}  ✗ network error`)
  }

  await sleep(PAUSE_MS)
}

console.log()
console.log('=== DONE ===')
console.log(`Added new:        ${added}`)
console.log(`Already existed:  ${alreadyExisting}`)
console.log(`Failed:           ${failed}`)
if (errors.length > 0) {
  console.log('\nFirst 5 errors:')
  for (const e of errors.slice(0, 5)) console.log(' ', e)
}

// --- helpers -------------------------------------------------------------

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

function loadDotenv() {
  // Tiny dotenv: read .env.local KEY=VALUE pairs into process.env.
  const envPath = fileURLToPath(new URL('../.env.local', import.meta.url))
  try {
    const text = readFileSync(envPath, 'utf8')
    for (const line of text.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // .env.local missing, env vars must come from somewhere else.
  }
}
