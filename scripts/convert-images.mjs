import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'assets');
const files = (await readdir(dir)).filter((f) => f.endsWith('.png'));

let before = 0;
let after = 0;
for (const f of files) {
  const src = join(dir, f);
  const out = src.replace(/\.png$/, '.webp');
  const meta = await sharp(src).metadata();
  before += meta.size ?? 0;
  const info = await sharp(src).webp({ quality: 86, effort: 6 }).toFile(out);
  after += info.size;
  await unlink(src);
}
console.log(
  `converted ${files.length} images: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`
);
