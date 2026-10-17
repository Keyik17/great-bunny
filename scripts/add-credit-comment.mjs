/**
 * Stamps a build-credit HTML comment into every emitted .html file,
 * placed between <!DOCTYPE html> and <html ...>.
 *
 * Author + URL read from .web-starter.json (root of this project).
 * Output dir read from same config. Idempotent, re-running build will not double-stamp.
 *
 * Invoked from package.json "build" script. Skips silently when the build did not
 * produce HTML files (e.g. SSR-only builds without prerendering).
 */
import { readdir, readFile, writeFile, access } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = dirname(__dirname)

const configPath = join(projectRoot, '.web-starter.json')
if (!existsSync(configPath)) {
  console.warn('[credit] .web-starter.json not found, skipping credit comment.')
  process.exit(0)
}

const config = JSON.parse(readFileSync(configPath, 'utf8'))
if (!config.creditAuthor || !config.creditUrl) {
  throw new Error(
    '[credit] Missing creditAuthor or creditUrl in .web-starter.json. Re-run /web-starter setup.',
  )
}

const CREDIT = `<!-- Made by ${config.creditAuthor} · ${config.creditUrl} -->`
const OUT_DIR = join(projectRoot, config.outputDir || '.output/public')

try {
  await access(OUT_DIR)
} catch {
  console.warn(`[credit] outputDir not found (${OUT_DIR}), nothing to stamp.`)
  process.exit(0)
}

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await htmlFiles(full)))
    } else if (entry.name.endsWith('.html')) {
      files.push(full)
    }
  }
  return files
}

const files = await htmlFiles(OUT_DIR)
let stamped = 0

for (const file of files) {
  const html = await readFile(file, 'utf8')
  if (html.includes(CREDIT)) continue
  const updated = html.replace(
    /(<!doctype html>)\s*(<html)/i,
    `$1\n${CREDIT}\n$2`,
  )
  if (updated !== html) {
    await writeFile(file, updated)
    stamped++
  }
}

console.log(
  `[credit] Stamped ${stamped}/${files.length} HTML file(s) under ${OUT_DIR.replace(projectRoot + '/', '')}`,
)
