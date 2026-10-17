#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SHIP GATE, proves a site is clean before it goes out.
 *
 *   node scripts/check-clean.mjs            # donor check (template + every client)
 *   node scripts/check-clean.mjs --launch   # donor check + placeholder check
 *
 * Two independent checks:
 *
 *   1. DONOR , content from a site this template was derived from must NEVER
 *      appear. This must pass in the template itself and in every client.
 *      Any hit exits non-zero.
 *
 *   2. PLACEHOLDER, the neutral stand-in identity (SABLE-CLIENT, (555) numbers,
 *      "PLACEHOLDER", "XX Years"). Expected to be present in the bare template,
 *      so it is informational by default. Pass --launch to make leftover
 *      placeholders a hard failure (run this before a real customer goes live).
 *
 * Unlike a one-line grep, this walks EVERY text file in the tree (code, CSS,
 * public/, scripts, configs), which is the class of leak the old .ts-only gate
 * missed.
 *
 * WHEN YOU HARVEST A NEW DESIGN from another site, add that site's identity
 * terms (business name, cities, owners, phone fragments, payment processors,
 * trade-specific brand names) to DONOR_TERMS so they can never leak forward.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')

/** Directories to walk for text files. Plus the loose root files below. */
const SCAN_DIRS = ['src', 'public', 'scripts', 'context', 'docs']
const SCAN_ROOT_FILES = [
  'package.json',
  'wrangler.jsonc',
  '.env.example',
  'client.config.js',
  '.web-starter.json',
  'index.html',
  'tsconfig.json',
]

/** Files excluded from BOTH scans: the gates themselves (they hold the
 *  placeholder/replacement literals by design), and README.md (internal docs
 *  that legitimately describe the placeholder system, never shipped). */
const SKIP_FILES = new Set([
  'scripts/check-clean.mjs',
  'scripts/init-client.mjs',
  'README.md',
])

/** Files excluded from the PLACEHOLDER (launch) scan only, still donor-scanned.
 *  .web-starter.json is build-config meta, not visitor content; its *Notes
 *  fields legitimately contain the word "PLACEHOLDER" as instructions. */
const PLACEHOLDER_SKIP_FILES = new Set(['.web-starter.json'])

const SKIP_DIRS = new Set(['node_modules', '.git', '.output', 'dist', '.vinxi', '.nitro'])
const TEXT_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.scss',
  '.json', '.jsonc', '.md', '.mdx', '.txt', '.html', '.svg',
  '.xml', '.webmanifest', '.example', '.env',
])

/**
 * Donor identity terms. Case-insensitive, matched as substrings unless wrapped
 * in \b. KEEP THIS UPDATED as new donor designs are harvested.
 */
const DONOR_TERMS = [
  // Extreme Steam (Design 1 source)
  /extreme\s*steam/i,
  /extremesteam/i,
  // South Florida geography
  /\bpembroke\b/i,
  /\bbroward\b/i,
  /\bmiami\b/i,
  /\bhialeah\b/i,
  /fort\s*lauderdale/i,
  /south\s*florida/i,
  /\bflorida\b/i,
  // Owners / staff
  /\btony\b/i,
  /\bgomez\b/i,
  /\bgaby\b/i,
  /\balvarado\b/i,
  /\beduardo\b/i,
  // Phone fragments
  /\(954\)/,
  /\(305\)/,
  /\(786\)/,
  /954\)?\s*505/,
  // Donor analytics properties (their GA4 + GTM ids must never ship in a client)
  /G-HYHR69211B/i,
  /GTM-5L8VHLS2/i,
  // Donor app-prefixed identifiers ('es' = Extreme Steam; gate caught none of
  // these before, they slipped through as localStorage keys)
  /es-cookie-consent/i,
  /es_newsletter_seen/i,
  // Donor payment specifics
  /\bzelle\b/i,
  /\bvenmo\b/i,
  /cash\s*app/i,
]

/**
 * Placeholder identity. Present on purpose in the bare template; must be gone
 * before a real customer launch (--launch turns these into failures).
 */
const PLACEHOLDER_TERMS = [
  /SABLE-CLIENT/i,
  /sable-client/i,
  /\(555\)\s*123-4567/,
  /\+?1?\s*555[\s-]*123[\s-]*4567/,
  /\bPLACEHOLDER\b/,
  /Placeholder review/i,
  /XX\s*Years/i,
  /XX\s*A[nñ]os/i,
  /\bREPLACE\b/,
  /Your City/,
  /Your County/,
  /City Two|City Three/,
  /sableclient/i,
  // Unfilled placeholder copy from the neutral baseline (lorem + labeled stand-ins)
  /lorem ipsum/i,
  /Your Headline/i,
  /Your Eyebrow Phrase/i,
  /Your Article Headline/i,
  /Short tagline goes here/i,
  /\bService (One|Two|Three|Four|Five|Six|Seven|Eight|Nine)\b/,
  /Servicio (Uno|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|Nueve)\b/,
  /\bPerson Name\b/,
]

function walk(dir, out) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue
    const full = join(dir, name)
    let st
    try {
      st = statSync(full)
    } catch {
      continue
    }
    if (st.isDirectory()) walk(full, out)
    else if (TEXT_EXT.has(extname(name)) || SCAN_ROOT_FILES.includes(name)) out.push(full)
  }
}

function collectFiles() {
  const files = []
  for (const d of SCAN_DIRS) walk(join(ROOT, d), files)
  for (const f of SCAN_ROOT_FILES) {
    const full = join(ROOT, f)
    try {
      if (statSync(full).isFile()) files.push(full)
    } catch {
      /* missing optional root file is fine */
    }
  }
  return [...new Set(files)]
}

function scan(files, patterns, extraSkip = new Set()) {
  const hits = []
  for (const file of files) {
    const rel = relative(ROOT, file)
    if (SKIP_FILES.has(rel) || extraSkip.has(rel)) continue
    let lines
    try {
      lines = readFileSync(file, 'utf8').split('\n')
    } catch {
      continue
    }
    lines.forEach((text, i) => {
      for (const re of patterns) {
        if (re.test(text)) {
          hits.push({ file: relative(ROOT, file), line: i + 1, text: text.trim(), term: re.source })
          break
        }
      }
    })
  }
  return hits
}

function report(title, hits) {
  if (hits.length === 0) return
  console.log(`\n${title}, ${hits.length} hit(s):`)
  for (const h of hits) {
    const snippet = h.text.length > 110 ? h.text.slice(0, 110) + '…' : h.text
    console.log(`  ${h.file}:${h.line}  ${snippet}`)
  }
}

const launch = process.argv.includes('--launch')
const files = collectFiles()

const donorHits = scan(files, DONOR_TERMS)
const placeholderHits = launch ? scan(files, PLACEHOLDER_TERMS, PLACEHOLDER_SKIP_FILES) : []

report('❌ DONOR identity found', donorHits)
if (launch) report('❌ PLACEHOLDER identity still present (pre-launch)', placeholderHits)

const failed = donorHits.length > 0 || (launch && placeholderHits.length > 0)

if (failed) {
  console.log(`\nShip gate FAILED. Scanned ${files.length} files.`)
  process.exit(1)
}

console.log(
  `✅ Ship gate passed (${files.length} files scanned). No donor identity${
    launch ? ' or leftover placeholders' : ''
  }.`,
)
if (!launch) {
  console.log('   Run with --launch to also flag leftover placeholder content before a customer goes live.')
}
