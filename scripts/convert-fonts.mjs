import subsetFont from 'subset-font';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'fonts');
const outDir = join(root, 'public', 'fonts');

// Weights we actually use in the design (SF Pro Display).
const faces = [
  { file: 'SF-Pro-Display-Regular.otf', out: 'sf-pro-display-400.woff2' },
  { file: 'SF-Pro-Display-Medium.otf', out: 'sf-pro-display-500.woff2' },
  { file: 'SF-Pro-Display-Semibold.otf', out: 'sf-pro-display-600.woff2' },
  { file: 'SF-Pro-Display-Bold.otf', out: 'sf-pro-display-700.woff2' },
  { file: 'SF-Pro-Display-Heavy.otf', out: 'sf-pro-display-800.woff2' },
];

// Generous Latin subset: Basic Latin + Latin-1 Supplement + common typographic punctuation.
function buildCharset() {
  let chars = '';
  for (let c = 0x20; c <= 0x7e; c++) chars += String.fromCodePoint(c);
  for (let c = 0xa0; c <= 0xff; c++) chars += String.fromCodePoint(c);
  const extra = [
    0x2018, 0x2019, 0x201c, 0x201d, // curly quotes
    0x2013, 0x2014, // en/em dash
    0x2026, // ellipsis
    0x2022, // bullet
    0x2192, 0x2190, // arrows
    0x2122, 0x00ae, 0x00a9, // tm, r, c
    0x20ac, // euro
    0x2605, 0x2606, // stars
    0x2713, 0x2714, // checkmarks
  ];
  chars += extra.map((c) => String.fromCodePoint(c)).join('');
  return chars;
}

const charset = buildCharset();
await mkdir(outDir, { recursive: true });

for (const face of faces) {
  const buf = await readFile(join(srcDir, face.file));
  const subset = await subsetFont(buf, charset, { targetFormat: 'woff2' });
  await writeFile(join(outDir, face.out), subset);
  const kb = (subset.length / 1024).toFixed(1);
  console.log(`${face.out.padEnd(28)} ${kb} KB  (from ${(buf.length / 1024).toFixed(0)} KB)`);
}
console.log('Done.');
