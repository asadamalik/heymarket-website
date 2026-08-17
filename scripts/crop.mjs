import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'design-refs', 'full-page.png');

// Pass a JSON array of crops as argv[2].
// Each: { name, left, top, width, height, out? }  out defaults to public/assets
const crops = JSON.parse(process.argv[2]);
const defaultOut = join(root, 'public', 'assets');
await mkdir(defaultOut, { recursive: true });
await mkdir(join(root, 'design-refs', 'verify'), { recursive: true });

for (const c of crops) {
  const dir = c.out === 'verify' ? join(root, 'design-refs', 'verify') : defaultOut;
  const file = join(dir, `${c.name}.png`);
  await sharp(src)
    .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
    .toFile(file);
  console.log('wrote', file, `${c.width}x${c.height}`);
}
