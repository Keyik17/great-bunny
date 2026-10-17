#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the live data layer so it can never go
 * stale: the canonical origin comes from src/config/site.ts, service slugs
 * from src/data/services.ts, location slugs from src/data/locations.ts, and
 * article slugs from src/content/articles/*.mdx. Also rewrites the Sitemap
 * line in public/robots.txt to match the configured origin.
 *
 * Run after any change to site config, services, locations, or articles:
 *   node scripts/gen-sitemap.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

// Canonical origin from the site config (single source of truth).
const site = read('src/config/site.ts').match(/url:\s*'([^']+)'/)?.[1]
if (!site) throw new Error('Could not parse SITE_CONFIG.url from src/config/site.ts')

const slugsIn = (p) => [...read(p).matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
const serviceSlugs = slugsIn('src/data/services.ts')
const locationSlugs = slugsIn('src/data/locations.ts')
// The shell ships without blog content; src/content/articles may not exist.
let articleSlugs = []
try {
  articleSlugs = readdirSync(join(root, 'src/content/articles'))
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
} catch {
  articleSlugs = []
}

// The cookie policy is only a public page when cookie consent is enabled
// (flag in CookieBanner.tsx). Off by default, so it's kept out of the sitemap.
const cookieConsent = /ENABLE_COOKIE_CONSENT\s*=\s*true/.test(
  read('src/components/shared/CookieBanner.tsx'),
)

const today = new Date().toISOString().slice(0, 10)

/** [path, changefreq, priority] */
const routes = [
  ['/', 'weekly', '1.0'],
  ['/services', 'monthly', '0.9'],
  ...serviceSlugs.map((s) => [`/services/${s}`, 'monthly', '0.8']),
  ['/pricing', 'monthly', '0.8'],
  ['/free-quote', 'monthly', '0.8'],
  ['/locations', 'monthly', '0.8'],
  ...locationSlugs.map((s) => [`/locations/${s}`, 'monthly', '0.7']),
  ['/about', 'monthly', '0.6'],
  ['/faq', 'monthly', '0.6'],
  ['/contact', 'monthly', '0.6'],
  ['/blog', 'weekly', '0.7'],
  ['/celebrating-youth-biz-success-at-young-americans-awards', 'yearly', '0.6'],
  ...articleSlugs.map((s) => [`/blog/${s}`, 'monthly', '0.6']),
  ['/sitemap', 'monthly', '0.4'],
  ['/legal/privacy-policy', 'yearly', '0.3'],
  ['/legal/terms-conditions', 'yearly', '0.3'],
  ...(cookieConsent ? [['/legal/cookie-policy', 'yearly', '0.3']] : []),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([path, changefreq, priority]) => `  <url>
    <loc>${site}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)

// Keep robots.txt pointing at the same origin.
const robotsPath = join(root, 'public/robots.txt')
const robots = readFileSync(robotsPath, 'utf8').replace(
  /^Sitemap:.*$/m,
  `Sitemap: ${site}/sitemap.xml`,
)
writeFileSync(robotsPath, robots)

console.log(`sitemap.xml: ${routes.length} URLs @ ${site} (robots.txt synced)`)
