/**
 * Professional B&W pass: clear midtones, friendly openness, cool neutral grays.
 */
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const input = path.join(root, 'public', 'portrait-frank.png')
const output = path.join(root, 'public', 'portrait-photo-bw.png')

await sharp(input)
  .rotate()
  .flatten({ background: { r: 245, g: 245, b: 245 } })
  .grayscale()
  .normalize()
  .linear(1.08, -6)
  .gamma(1.04)
  .sharpen({ sigma: 0.55, m1: 1, m2: 0.1 })
  .png({ compressionLevel: 9 })
  .toFile(output)

console.log('Wrote', output)
