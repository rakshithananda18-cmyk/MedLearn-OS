// Renders the app icon (scripts/icons/icon.svg) to the PNG sizes phones ask for. Run after
// changing the SVG: node scripts/icons/build-icons.mjs
import { copyFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = fileURLToPath(new URL('../../', import.meta.url));
const svg = readFileSync(`${root}scripts/icons/icon.svg`);
const outputs = [
  ['apps/web/public/icons/icon-192.png', 192],
  ['apps/web/public/icons/icon-512.png', 512],
  // iOS home screen; Next links it from the app folder.
  ['apps/web/src/app/apple-icon.png', 180],
];

for (const [file, size] of outputs) {
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(root + file);
  console.log(`wrote ${file}`);
}
// Browsers take the SVG itself as the tab icon.
copyFileSync(`${root}scripts/icons/icon.svg`, `${root}apps/web/src/app/icon.svg`);
console.log('wrote apps/web/src/app/icon.svg');
