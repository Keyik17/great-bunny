import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Favicon generator. Point LIGHT/DARK at the customer's logo PNGs (a
// full-color logo on transparent and a dark app-icon variant), then run
// `node scripts/gen-icons.mjs` to emit the favicon set into public/.
const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const LIGHT = join(PUB, 'brand', 'icon-master-light-1024.png')  // black bunny mark, transparent
const DARK = join(PUB, 'brand', 'icon-master-dark-1024.png')    // white bunny on #111 rounded square

// Trim transparent padding off the light logo so the shield fills the favicon.
const lightTrimmed = await sharp(LIGHT).trim({ threshold: 10 }).toBuffer()

const png = (buf, size, bg) => {
  let p = sharp(buf).resize(size, size, { fit: 'contain', background: bg ?? { r:0,g:0,b:0,alpha:0 } })
  if (bg) p = p.flatten({ background: bg })
  return p.png().toBuffer()
}

// Standard (light) favicons from the trimmed colour logo, transparent bg.
const sizes = { 'favicon-16x16.png':16, 'favicon-32x32.png':32, 'favicon.png':32,
  'android-chrome-192x192.png':192, 'android-chrome-512x512.png':512 }
for (const [name, s] of Object.entries(sizes)) {
  writeFileSync(`${PUB}/${name}`, await png(lightTrimmed, s))
}

// Dark-mode tab variant from the dark app icon.
writeFileSync(`${PUB}/favicon-dark-32x32.png`, await png(DARK, 32))

// Apple touch icon (iOS home screen), the dark app icon, flattened on black (no transparency).
writeFileSync(`${PUB}/apple-touch-icon.png`, await png(DARK, 180, { r:0,g:0,b:0 }))

// favicon.ico: embed PNG-encoded 16/32/48 entries (Vista+ ICO supports PNG).
const icoSizes = [16,32,48]
const buffers = await Promise.all(icoSizes.map(s => png(lightTrimmed, s)))
const count = buffers.length
const header = Buffer.alloc(6); header.writeUInt16LE(0,0); header.writeUInt16LE(1,2); header.writeUInt16LE(count,4)
const entries = []; let offset = 6 + count*16
for (let i=0;i<count;i++){
  const e = Buffer.alloc(16); const s = icoSizes[i]
  e.writeUInt8(s>=256?0:s,0); e.writeUInt8(s>=256?0:s,1); e.writeUInt8(0,2); e.writeUInt8(0,3)
  e.writeUInt16LE(1,4); e.writeUInt16LE(32,6); e.writeUInt32LE(buffers[i].length,8); e.writeUInt32LE(offset,12)
  offset += buffers[i].length; entries.push(e)
}
writeFileSync(`${PUB}/favicon.ico`, Buffer.concat([header, ...entries, ...buffers]))

// Flatten the OG image onto white (strip alpha channel) so strict validators can analyze it.
const ogIn = `${PUB}/brand/og-image.png`
await sharp(ogIn).flatten({ background:'#ffffff' }).png({ compressionLevel:9 }).toFile(`${PUB}/brand/og-image-flat.png`)

console.log('icons + og written')
