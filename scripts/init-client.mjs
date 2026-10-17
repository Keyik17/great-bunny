#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * INIT CLIENT, fills the identity layer from client.config.js.
 *
 *   npm run init-client                 # reads ./client.config.js
 *   node scripts/init-client.mjs path   # reads a specific config file
 *   node scripts/init-client.mjs --dry  # preview every change, write nothing
 *
 * Deterministically rewrites the parts of a fresh clone that are pure
 * find-and-replace of the placeholder identity:
 *
 *   • src/config/site.ts        name, url, phone (3 forms), email, address,
 *                               rating, instagram/google links, sameAs
 *   • package.json              "name" → slug
 *   • wrangler.jsonc            "name" → slug (Cloudflare Pages project)
 *   • public/site.webmanifest   name + short_name
 *   • public/llms.txt           name + domain + city throughout
 *   • src/data/locations.ts     service areas (only if config.cities is set)
 *   • src/data/location-content.tsx  matching per-city page content
 *   • then runs scripts/gen-sitemap.mjs
 *
 * This is the mechanical 80%. After it runs, fill the CONTENT layer (services,
 * marketing copy, real photos, brand colors, .env, GA4), see the printed
 * checklist and the README runbook.
 *
 * This script and src/config/site.ts are a PAIR: the replacement literals below
 * track the placeholder values in site.ts. If a literal stops matching, the
 * script warns instead of silently skipping, so drift is caught.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, isAbsolute } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const DRY = process.argv.includes('--dry')
const configArg = process.argv.slice(2).find((a) => !a.startsWith('--'))

// ── load config ──────────────────────────────────────────────────────────────
const configPath = configArg
  ? isAbsolute(configArg)
    ? configArg
    : join(process.cwd(), configArg)
  : join(ROOT, 'client.config.js')

if (!existsSync(configPath)) {
  console.error(
    `\n✗ No config found at ${configPath}\n` +
      `   Copy client.config.example.js to client.config.js, fill it in, then re-run.\n`,
  )
  process.exit(1)
}

const cfg = (await import(pathToFileURL(configPath).href)).default
if (!cfg?.name || !cfg?.domain) {
  console.error('\n✗ client config must at least set `name` and `domain`.\n')
  process.exit(1)
}

// ── helpers ──────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
const camelize = (slug) =>
  slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '')

const domain = cfg.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
const url = `https://${domain}`
const phoneDigits = (cfg.phone || '').replace(/\D/g, '').replace(/^1/, '')
const phone = cfg.phone
  ? {
      display: cfg.phone,
      e164: `+1${phoneDigits}`,
      schema: `+1-${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`,
    }
  : null
const addr = cfg.address || {}
const addrDisplay = addr.city && addr.region ? `${addr.city}, ${addr.region} ${addr.zip || ''}`.trim() : null
const slug = slugify(cfg.name)

const edits = [] // { file, summary } for the report
const warnings = []

/** Apply exact-substring replacements; warn on any literal that isn't found. */
function patch(relFile, pairs) {
  const file = join(ROOT, relFile)
  if (!existsSync(file)) {
    warnings.push(`${relFile} not found, skipped.`)
    return
  }
  let content = readFileSync(file, 'utf8')
  const applied = []
  for (const [find, replace, label] of pairs) {
    if (replace === undefined || replace === null) continue
    if (typeof find === 'string') {
      if (!content.includes(find)) {
        warnings.push(`${relFile}: expected literal not found, ${label || find}`)
        continue
      }
      if (find !== replace) {
        content = content.split(find).join(replace)
        applied.push(label || find)
      }
    } else {
      // regex
      if (!find.test(content)) {
        warnings.push(`${relFile}: pattern not found, ${label}`)
        continue
      }
      content = content.replace(find, replace)
      applied.push(label)
    }
  }
  if (applied.length === 0) return
  if (!DRY) writeFileSync(file, content)
  edits.push({ file: relFile, summary: applied.join(', ') })
}

// ── site.ts ──────────────────────────────────────────────────────────────────
const sameAs = cfg.social?.sameAs?.length
  ? `sameAs: [\n${cfg.social.sameAs.map((u) => `      '${esc(u)}',`).join('\n')}\n    ]`
  : null

patch('src/config/site.ts', [
  [`name: 'SABLE-CLIENT'`, `name: '${esc(cfg.name)}'`, 'name'],
  [`url: 'https://sable-client.com'`, `url: '${esc(url)}'`, 'url'],
  phone && [`display: '(555) 123-4567'`, `display: '${esc(phone.display)}'`, 'phone.display'],
  phone && [`e164: '+15551234567'`, `e164: '${esc(phone.e164)}'`, 'phone.e164'],
  phone && [`schema: '+1-555-123-4567'`, `schema: '${esc(phone.schema)}'`, 'phone.schema'],
  cfg.email && [`email: 'hello@sable-client.com'`, `email: '${esc(cfg.email)}'`, 'email'],
  addr.street && [`street: '123 Main St'`, `street: '${esc(addr.street)}'`, 'address.street'],
  addr.city && [`city: 'Your City'`, `city: '${esc(addr.city)}'`, 'address.city'],
  addr.region && [`region: 'ST'`, `region: '${esc(addr.region)}'`, 'address.region'],
  addr.zip && [`zip: '00000'`, `zip: '${esc(addr.zip)}'`, 'address.zip'],
  addr.country && [`country: 'US'`, `country: '${esc(addr.country)}'`, 'address.country'],
  addrDisplay && [`display: 'Your City, ST 00000'`, `display: '${esc(addrDisplay)}'`, 'address.display'],
  cfg.rating?.value && [`value: '4.9'`, `value: '${esc(cfg.rating.value)}'`, 'rating.value'],
  cfg.rating?.count && [`count: '270'`, `count: '${esc(cfg.rating.count)}'`, 'rating.count'],
  cfg.social?.instagramHandle && [
    `instagramHandle: '@sableclient'`,
    `instagramHandle: '${esc(cfg.social.instagramHandle)}'`,
    'instagramHandle',
  ],
  cfg.social?.googleReviewsUrl && [
    `googleReviewsUrl: 'https://maps.google.com/'`,
    `googleReviewsUrl: '${esc(cfg.social.googleReviewsUrl)}'`,
    'googleReviewsUrl',
  ],
  cfg.social?.googleMapsUrl && [
    `googleMapsUrl: 'https://maps.google.com/'`,
    `googleMapsUrl: '${esc(cfg.social.googleMapsUrl)}'`,
    'googleMapsUrl',
  ],
  sameAs && [/sameAs: \[[\s\S]*?\n {4}\]/, sameAs, 'sameAs'],
].filter(Boolean))

// ── package.json + wrangler.jsonc ────────────────────────────────────────────
patch('package.json', [[`"name": "protocol-web-customers"`, `"name": "${slug}"`, 'name']])
patch('wrangler.jsonc', [[`"name": "protocol-web-customers"`, `"name": "${slug}"`, 'name']])

// ── public/site.webmanifest ──────────────────────────────────────────────────
patch('public/site.webmanifest', [
  [`"name": "SABLE-CLIENT"`, `"name": "${esc(cfg.name)}"`, 'name'],
  [`"short_name": "SABLE-CLIENT"`, `"short_name": "${esc(cfg.name)}"`, 'short_name'],
])

// ── public/llms.txt (global text replacements) ───────────────────────────────
{
  const file = join(ROOT, 'public/llms.txt')
  if (existsSync(file)) {
    let c = readFileSync(file, 'utf8')
    const before = c
    c = c.split('sable-client.com').join(domain)
    c = c.split('SABLE-CLIENT').join(cfg.name)
    if (addr.city && addr.region) c = c.split('Your City, ST').join(`${addr.city}, ${addr.region}`)
    if (addr.city) c = c.split('Your City').join(addr.city)
    if (c !== before) {
      if (!DRY) writeFileSync(file, c)
      edits.push({ file: 'public/llms.txt', summary: 'name, domain, city replaced throughout' })
    }
  }
}

// ── service areas (optional) ─────────────────────────────────────────────────
if (Array.isArray(cfg.cities) && cfg.cities.length) {
  const cities = cfg.cities.map((c, i) => {
    const o = typeof c === 'string' ? { name: c } : c
    return {
      name: o.name,
      slug: slugify(o.name),
      county: o.county || o.name,
      neighborhoods: o.neighborhoods || ['Neighborhood One', 'Neighborhood Two', 'Neighborhood Three'],
      zips: o.zips || ['00000', '00001'],
      featured: o.featured ?? i < 6,
    }
  })

  // locations.ts, replace the LOCATIONS array
  const locArray =
    'export const LOCATIONS: Location[] = [\n' +
    cities
      .map(
        (c) =>
          `  { slug: '${esc(c.slug)}', name: '${esc(c.name)}', county: '${esc(
            c.county,
          )}', type: 'city', image: '/placeholder.jpg', featured: ${c.featured} },`,
      )
      .join('\n') +
    '\n]'
  patch('src/data/locations.ts', [
    [/export const LOCATIONS: Location\[\] = \[[\s\S]*?\n\]/, locArray, 'LOCATIONS'],
  ])

  // location-content.tsx, replace makeLocation calls + the map
  const blocks = cities
    .map(
      (c) =>
        `const ${camelize(c.slug)} = makeLocation({\n` +
        `  slug: '${esc(c.slug)}',\n` +
        `  name: '${esc(c.name)}',\n` +
        `  county: '${esc(c.county)} County',\n` +
        `  neighborhoods: [${c.neighborhoods.map((n) => `'${esc(n)}'`).join(', ')}],\n` +
        `  zips: [${c.zips.map((z) => `'${esc(z)}'`).join(', ')}],\n` +
        `})`,
    )
    .join('\n\n')
  const map =
    'export const locationContentMap: Record<string, LocationContent> = {\n' +
    cities.map((c) => `  '${esc(c.slug)}': ${camelize(c.slug)},`).join('\n') +
    '\n}'
  patch('src/data/location-content.tsx', [
    [/const \w+ = makeLocation\(\{[\s\S]*$/, `${blocks}\n\n${map}\n`, 'makeLocation blocks + map'],
  ])
}

// ── regenerate sitemap ───────────────────────────────────────────────────────
if (!DRY) {
  const r = spawnSync('node', [join(ROOT, 'scripts/gen-sitemap.mjs')], { cwd: ROOT, encoding: 'utf8' })
  if (r.status === 0) edits.push({ file: 'public/sitemap.xml + robots.txt', summary: 'regenerated' })
  else warnings.push(`gen-sitemap failed:\n${r.stderr || r.stdout}`)
}

// ── report ───────────────────────────────────────────────────────────────────
console.log(`\n${DRY ? '🔎 DRY RUN, no files written' : '✅ init-client'} for "${cfg.name}" (${url})\n`)
if (edits.length) {
  console.log('Changed:')
  for (const e of edits) console.log(`  • ${e.file}, ${e.summary}`)
} else {
  console.log('No changes (already initialized, or every value matched).')
}
if (warnings.length) {
  console.log('\n⚠ Warnings:')
  for (const w of warnings) console.log(`  • ${w}`)
}

console.log(
  `\nNext (the content pass, by hand or the /new-client skill):\n` +
    `  1. src/data/services.ts + service-content.tsx, the real service list & copy\n` +
    `  2. src/content/copy.tsx, marketing wording (headlines, FAQ, about)\n` +
    `  3. public/, real photos, logo (src/components ... brand), og-image, favicons (npm run … gen-icons)\n` +
    `  4. src/styles/tokens.css, brand colors\n` +
    `  5. .env, RESEND_*, plus GA4/GTM IDs\n` +
    `  6. Replace remaining PLACEHOLDER content, then: npm run typecheck && npm run build && npm run check:launch\n`,
)
