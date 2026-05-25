import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const PORTFOLIO_DIR = new URL('../public/portfolio', import.meta.url).pathname
const MAX_WIDTH = 1920
const QUALITY = 82

const EXTS = new Set(['.jpg', '.jpeg', '.png'])

const files = await readdir(PORTFOLIO_DIR)
const images = files.filter((f) => EXTS.has(extname(f).toLowerCase()))

for (const file of images) {
  const filepath = join(PORTFOLIO_DIR, file)
  const before = (await stat(filepath)).size

  const meta = await sharp(filepath).metadata()
  const needsResize = meta.width && meta.width > MAX_WIDTH

  await sharp(filepath)
    .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(filepath + '.tmp')

  const { rename } = await import('fs/promises')
  await rename(filepath + '.tmp', filepath)

  const after = (await stat(filepath)).size
  const saved = (((before - after) / before) * 100).toFixed(1)
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${saved}%)`)
}

console.log('\nDone.')
