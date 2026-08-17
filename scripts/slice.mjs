import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'design-refs', 'full-page.png');
const outDir = join(root, 'design-refs', 'bands');
await mkdir(outDir, { recursive: true });

const meta = await sharp(src).metadata();
console.log('source', meta.width, 'x', meta.height);

// Survey bands: full width, ~858px tall, so text stays readable when I Read them.
const bandH = 858;
const n = Math.ceil(meta.height / bandH);
for (let i = 0; i < n; i++) {
  const top = i * bandH;
  const h = Math.min(bandH, meta.height - top);
  const y0 = String(top).padStart(5, '0');
  const y1 = String(top + h).padStart(5, '0');
  const out = join(outDir, `band-${String(i).padStart(2, '0')}_${y0}-${y1}.png`);
  await sharp(src).extract({ left: 0, top, width: meta.width, height: h }).toFile(out);
  console.log('wrote', out);
}
