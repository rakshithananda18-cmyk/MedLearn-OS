// Builds the body atlas plates in apps/web/public/atlas from illustrations on Wikimedia Commons.
//
// Sources (checked on each file page on 30 September 2026):
//  - Mariana Ruiz Villarreal (LadyofHats) and Jmarchn: skeleton, circulation, digestion; public
//    domain
//  - Mikael Häggström: muscles, front; public domain
//  - Medium69 and Jmarchn: nervous system; CC BY-SA 4.0
//  - BruceBlaus (Blausen Medical): female lymphatic and reproductive systems; CC BY 3.0
// The originals stay out of git, in models-src/atlas; each plate here is drawn at most 1600 pixels
// on its long side (SVGs are rendered at that size) and saved as WebP.
//
// Usage: node scripts/models/build-atlas.mjs [folder with the originals, default models-src/atlas]
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import sharp from 'sharp';

const LONG_SIDE = 1600;
const OUT = 'apps/web/public/atlas';

/** Plate id in the app, from the original's file name on Commons. */
export const PLATES = {
  'skeleton-front': 'Human skeleton front en.svg',
  'skeleton-back': 'Human skeleton back en.svg',
  circulation: 'Circulatory System en.svg',
  digestion: 'Digestive system diagram en.svg',
  'muscles-front': 'Muscles anterior labeled.png',
  nerves: 'Nervous system diagram-en.svg',
  'lymph-female': 'Blausen 0623 LymphaticSystem Female.png',
  'reproductive-female': 'Blausen 0399 FemaleReproSystem 01.png',
};

const source = process.argv[2] ?? 'models-src/atlas';
mkdirSync(OUT, { recursive: true });
for (const [id, file] of Object.entries(PLATES)) {
  // SVGs are rendered big enough to stay sharp once scaled down; a white page behind them all.
  const input = sharp(join(source, file), { density: file.endsWith('.svg') ? 300 : 72 });
  const { width, height, size } = await input
    .resize({ width: LONG_SIDE, height: LONG_SIDE, fit: 'inside', withoutEnlargement: false })
    .flatten({ background: '#ffffff' })
    .webp({ quality: 82 })
    .toFile(join(OUT, `${id}.webp`));
  console.log(`${id}.webp ${width}x${height} ${Math.round(size / 1024)} KB`);
}
