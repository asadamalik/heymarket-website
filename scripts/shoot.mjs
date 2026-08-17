import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const width = Number(process.argv[2] || 1440);
const url = process.argv[3] || 'http://localhost:4321';
const outDir = join(root, 'design-refs', 'shots');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'load', timeout: 30000 });

// Force every lazy image to load, then wait until they've all decoded.
await page.evaluate(() => {
  for (const img of document.images) {
    img.loading = 'eager';
    if (!img.complete || img.naturalWidth === 0) {
      const s = img.src;
      img.src = '';
      img.src = s;
    }
  }
});
await page
  .waitForFunction(
    () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
    { timeout: 20000 }
  )
  .catch(() => console.warn('warning: some images did not finish loading'));
await page.waitForTimeout(300);

const full = join(outDir, `full-${width}.png`);
await page.screenshot({ path: full, fullPage: true });
const meta = await sharp(full).metadata();
console.log('shot', meta.width, 'x', meta.height);

// Slice into readable bands, into a per-width folder.
const bandDir = join(outDir, String(width));
await mkdir(bandDir, { recursive: true });
const bandH = width >= 1024 ? 900 : 760;
const n = Math.ceil(meta.height / bandH);
for (let i = 0; i < n; i++) {
  const top = i * bandH;
  const h = Math.min(bandH, meta.height - top);
  await sharp(full)
    .extract({ left: 0, top, width: meta.width, height: h })
    .toFile(join(bandDir, `band-${String(i).padStart(2, '0')}.png`));
}
console.log('sliced into', n, 'bands ->', bandDir);

await browser.close();
