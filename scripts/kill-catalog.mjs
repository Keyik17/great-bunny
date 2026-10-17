#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * KILL CATALOG, strip the block-browsing layer before a client launch.
 *
 *   npm run kill:catalog
 *
 * The catalog ( /library + /preview routes and src/catalog/blocks.tsx ) is a
 * DEV-ONLY shelf for composing a site by picking blocks. It must never ship to a
 * client's production site. This removes it cleanly:
 *
 *   - deletes src/routes/library.tsx, src/routes/preview.tsx, src/catalog/
 *   - drops the '/library' clause from isAppFlow in src/routes/__root.tsx
 *   - removes the /library + /preview Disallow lines from public/robots.txt
 *
 * It does NOT delete any component in src/components/, a client may have placed
 * catalog blocks into their pages. Any block left UNused after the catalog is
 * gone simply tree-shakes out of the production bundle (its source stays in the
 * repo, dormant, shipping nothing).
 *
 * After running, rebuild so the route tree regenerates without /library and
 * /preview:  npm run build
 *
 * Idempotent: re-running after the catalog is gone is a no-op.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { existsSync, rmSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const done = []
const skipped = []

function del(rel) {
  const p = join(ROOT, rel)
  if (existsSync(p)) {
    rmSync(p, { recursive: true, force: true })
    done.push(`deleted ${rel}`)
  } else {
    skipped.push(rel)
  }
}

del('src/routes/library.tsx')
del('src/routes/preview.tsx')
del('src/catalog')

// __root.tsx, drop the '/library' clause from isAppFlow
{
  const p = join(ROOT, 'src/routes/__root.tsx')
  if (existsSync(p)) {
    let c = readFileSync(p, 'utf8')
    const before = c
    c = c.replace(/\s*\|\|\s*pathname === '\/library'/, '')
    if (c !== before) {
      writeFileSync(p, c)
      done.push("__root.tsx: removed '/library' from isAppFlow")
    }
  }
}

// robots.txt, remove the catalog Disallow lines
{
  const p = join(ROOT, 'public/robots.txt')
  if (existsSync(p)) {
    let c = readFileSync(p, 'utf8')
    const before = c
    c = c
      .split('\n')
      .filter((l) => !/^Disallow:\s*\/(library|preview)\s*$/.test(l.trim()))
      .join('\n')
    if (c !== before) {
      writeFileSync(p, c)
      done.push('robots.txt: removed /library + /preview Disallow lines')
    }
  }
}

console.log('\n🔪 kill-catalog\n')
if (done.length) {
  console.log('Removed:')
  for (const d of done) console.log(`  • ${d}`)
} else {
  console.log('Nothing to remove, the catalog is already gone.')
}
if (done.length) {
  console.log('\nNext: rebuild so the route tree regenerates without /library + /preview:')
  console.log('  npm run build')
}
