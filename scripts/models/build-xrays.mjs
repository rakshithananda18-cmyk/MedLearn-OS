// Builds the X-ray films in apps/web/public/xrays from the originals on Wikimedia Commons.
//
// Source: the "X-ray of normal …" series by Mikael Häggström, released as CC0 (checked on each
// file page on 30 September 2026). The originals stay out of git, in models-src/xrays; each film
// here is resized to at most 1400 pixels on its long side and saved as WebP.
//
// Usage: node scripts/models/build-xrays.mjs [folder with the originals, default models-src/xrays]
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import sharp from 'sharp';

const LONG_SIDE = 1400;
const OUT = 'apps/web/public/xrays';

/** Film id in the app, from the original's file name on Commons. */
export const FILMS = {
  'shoulder-grashey': 'Anteroposterior glenoid (Grashey view) X-ray of a normal shoulder.jpg',
  'shoulder-y': 'Y-projection X-ray of a normal shoulder.jpg',
  'elbow-ap': 'X-ray of normal elbow by anteroposterior projection.jpg',
  'elbow-lateral': 'X-ray of normal elbow by lateral projection.jpg',
  'elbow-external-oblique': 'X-ray of normal elbow by 30 degrees external oblique projection.jpg',
  'elbow-internal-oblique': 'X-ray of normal elbow by 30 degrees internal oblique projection.jpg',
  'wrist-pa': 'X-ray of normal wrist by dorsoplantar projection.jpg',
  'wrist-lateral': 'X-ray of normal wrist by lateral projection.jpg',
  'hand-pa': 'X-ray of normal hand by dorsoplantar projection.jpg',
  'hand-lateral': 'X-ray of normal hand by lateral projection.jpg',
  'hand-oblique': 'X-ray of normal hand by oblique projection.jpg',
};

const source = process.argv[2] ?? 'models-src/xrays';
mkdirSync(OUT, { recursive: true });
// Every film is converted at once; each prints its size when done.
await Promise.all(
  Object.entries(FILMS).map(async ([id, file]) => {
    const { width, height, size } = await sharp(join(source, file))
      .resize({ width: LONG_SIDE, height: LONG_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(OUT, `${id}.webp`));
    console.log(`${id}.webp ${width}x${height} ${Math.round(size / 1024)} KB`);
  }),
);
