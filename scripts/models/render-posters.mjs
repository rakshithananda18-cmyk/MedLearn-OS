// Renders a still poster of every 3D model into apps/web/public/posters, for the heroes on Today
// and the topic pages: a picture loads at once, where the live 3D view would cost the phone
// seconds. Transparent WebP, trimmed to the model, so it sits on any background.
//
// Usage: start the app (pnpm dev, or a production build), then
//   node scripts/models/render-posters.mjs [base URL, default http://localhost:3200]
// Re-run when a model or a topic's first camera view changes.
import { mkdirSync } from 'node:fs';

import { chromium } from '@playwright/test';
import sharp from 'sharp';

import { fail, step } from '../lib/cli.mjs';

const BASE = process.argv[2] ?? 'http://localhost:3200';
const OUT = 'apps/web/public/posters';
const WIDTH = 560;

/** Poster name and the studio address that shows it. */
export const POSTERS = [
  { name: 'body', path: '/studio' },
  { name: 'pectoral-region', path: '/studio?topic=pectoral-region' },
  { name: 'axilla', path: '/studio?topic=axilla' },
  { name: 'axillary-vessels', path: '/studio?topic=axillary-vessels' },
  { name: 'axillary-lymph-nodes', path: '/studio?topic=axillary-lymph-nodes' },
  { name: 'brachial-plexus', path: '/studio?topic=brachial-plexus' },
];

// Only the model: no app chrome and no backgrounds.
const BARE = `nav, header, footer, section[aria-label] section, .bg-sky { display: none !important; }
  html, body, main, section[aria-label="3D studio"] { background: transparent !important; border: 0 !important; }`;

async function main() {
  mkdirSync(OUT, { recursive: true });
  // Software WebGL, so the posters look the same on any machine.
  const browser = await chromium.launch({
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const page = await browser.newPage({
    viewport: { width: 760, height: 760 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  });
  try {
    for (const poster of POSTERS) {
      step(`Rendering ${poster.name}`);
      await page.goto(`${BASE}${poster.path}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('canvas', { timeout: 60_000 });
      await page.addStyleTag({ content: BARE });
      // Let the model file load and the camera settle.
      await page.waitForTimeout(6000);
      const png = await page.locator('canvas').screenshot({ omitBackground: true });
      await sharp(png)
        .trim()
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: 76, alphaQuality: 80 })
        .toFile(`${OUT}/${poster.name}.webp`);
    }
  } catch (error) {
    fail(`Could not render the posters from ${BASE}: ${error.message}. Is the app running?`);
  } finally {
    await browser.close();
  }
}

if (process.argv[1]?.endsWith('render-posters.mjs')) await main();
