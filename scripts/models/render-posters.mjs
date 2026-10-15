// Renders a still poster of every 3D model into apps/web/public/posters, for the heroes on Today
// and the topic pages: a picture loads at once, where the live 3D view would cost the phone
// seconds. Transparent WebP, trimmed to the model, so it sits on any background.
//
// Usage: start the app (pnpm dev, or a production build), then
//   node scripts/models/render-posters.mjs [base URL, default http://localhost:3200] [names...]
// Names (such as ribs) render just those posters; none renders them all.
// Re-run when a model or a topic's first camera view changes.
import { mkdirSync } from 'node:fs';

import { chromium } from '@playwright/test';
import sharp from 'sharp';

import { fail, step } from '../lib/cli.mjs';

const BASE = process.argv[2] ?? 'http://localhost:3200';
const ONLY = process.argv.slice(3);
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
  { name: 'back-muscles', path: '/studio?topic=back-muscles' },
  { name: 'deltoid-rotator-cuff', path: '/studio?topic=deltoid-rotator-cuff' },
  { name: 'scapular-spaces', path: '/studio?topic=scapular-spaces' },
  { name: 'arm-front', path: '/studio?topic=arm-front' },
  { name: 'arm-back-radial', path: '/studio?topic=arm-back-radial' },
  { name: 'skin-veins-lymph', path: '/studio?topic=skin-veins-lymph' },
  { name: 'cubital-fossa', path: '/studio?topic=cubital-fossa' },
  { name: 'forearm-flexors', path: '/studio?topic=forearm-flexors' },
  { name: 'forearm-vessels-nerves', path: '/studio?topic=forearm-vessels-nerves' },
  { name: 'carpal-tunnel', path: '/studio?topic=carpal-tunnel' },
  { name: 'hand-muscles', path: '/studio?topic=hand-muscles' },
  { name: 'palm-vessels-nerves', path: '/studio?topic=palm-vessels-nerves' },
  { name: 'palm-spaces', path: '/studio?topic=palm-spaces' },
  { name: 'wrist-back', path: '/studio?topic=wrist-back' },
  { name: 'forearm-extensors', path: '/studio?topic=forearm-extensors' },
  { name: 'shoulder-girdle', path: '/studio?topic=shoulder-girdle' },
  { name: 'shoulder-joint', path: '/studio?topic=shoulder-joint' },
  { name: 'elbow-joint', path: '/studio?topic=elbow-joint' },
  { name: 'radioulnar-joints', path: '/studio?topic=radioulnar-joints' },
  { name: 'wrist-hand-joints', path: '/studio?topic=wrist-hand-joints' },
  { name: 'surface-marking', path: '/studio?topic=surface-marking' },
  { name: 'upper-limb-xrays', path: '/studio?topic=upper-limb-xrays' },
  { name: 'nerve-injuries', path: '/studio?topic=nerve-injuries' },
  { name: 'elbow-anastomosis', path: '/studio?topic=elbow-anastomosis' },
  { name: 'upper-limb-development', path: '/studio?topic=upper-limb-development' },
  { name: 'thorax-introduction', path: '/studio?topic=thorax-introduction' },
  { name: 'ribs', path: '/studio?topic=ribs' },
  { name: 'sternum-thoracic-vertebrae', path: '/studio?topic=sternum-thoracic-vertebrae' },
  { name: 'thoracic-joints-respiration', path: '/studio?topic=thoracic-joints-respiration' },
  { name: 'intercostal-spaces', path: '/studio?topic=intercostal-spaces' },
  { name: 'internal-thoracic-azygos', path: '/studio?topic=internal-thoracic-azygos' },
  { name: 'pleura', path: '/studio?topic=pleura' },
  { name: 'lungs', path: '/studio?topic=lungs' },
  { name: 'lung-root-bronchial-tree', path: '/studio?topic=lung-root-bronchial-tree' },
  { name: 'bronchopulmonary-segments', path: '/studio?topic=bronchopulmonary-segments' },
  { name: 'mediastinum', path: '/studio?topic=mediastinum' },
  { name: 'pericardium', path: '/studio?topic=pericardium' },
  { name: 'heart-external-features', path: '/studio?topic=heart-external-features' },
  { name: 'heart-chambers', path: '/studio?topic=heart-chambers' },
  { name: 'heart-valves-conduction', path: '/studio?topic=heart-valves-conduction' },
  { name: 'coronary-circulation', path: '/studio?topic=coronary-circulation' },
  { name: 'fetal-circulation', path: '/studio?topic=fetal-circulation' },
  { name: 'svc-pulmonary-trunk', path: '/studio?topic=svc-pulmonary-trunk' },
  { name: 'aorta', path: '/studio?topic=aorta' },
  { name: 'trachea', path: '/studio?topic=trachea' },
  { name: 'oesophagus', path: '/studio?topic=oesophagus' },
  { name: 'thoracic-duct', path: '/studio?topic=thoracic-duct' },
  { name: 'thorax-surface-xray', path: '/studio?topic=thorax-surface-xray' },
  { name: 'thigh-superficial', path: '/studio?topic=thigh-superficial' },
  { name: 'femoral-triangle', path: '/studio?topic=femoral-triangle' },
  { name: 'femoral-vessels-nerve', path: '/studio?topic=femoral-vessels-nerve' },
  { name: 'thigh-front-muscles', path: '/studio?topic=thigh-front-muscles' },
  { name: 'thigh-medial', path: '/studio?topic=thigh-medial' },
  { name: 'gluteal-muscles', path: '/studio?topic=gluteal-muscles' },
  { name: 'gluteal-nerves-vessels', path: '/studio?topic=gluteal-nerves-vessels' },
  { name: 'popliteal-fossa', path: '/studio?topic=popliteal-fossa' },
  { name: 'popliteal-vessels-nerves', path: '/studio?topic=popliteal-vessels-nerves' },
  { name: 'knee-anastomoses', path: '/studio?topic=knee-anastomoses' },
  { name: 'hamstrings', path: '/studio?topic=hamstrings' },
  { name: 'sciatic-nerve-thigh', path: '/studio?topic=sciatic-nerve-thigh' },
  { name: 'leg-superficial', path: '/studio?topic=leg-superficial' },
  { name: 'leg-front-muscles', path: '/studio?topic=leg-front-muscles' },
  { name: 'anterior-tibial-dorsalis-pedis', path: '/studio?topic=anterior-tibial-dorsalis-pedis' },
  { name: 'leg-lateral-medial', path: '/studio?topic=leg-lateral-medial' },
  { name: 'calf-muscles', path: '/studio?topic=calf-muscles' },
  { name: 'posterior-tibial-tibial-nerve', path: '/studio?topic=posterior-tibial-tibial-nerve' },
  { name: 'sole-skin-fascia', path: '/studio?topic=sole-skin-fascia' },
  { name: 'sole-layers-1-2', path: '/studio?topic=sole-layers-1-2' },
  { name: 'sole-layers-3-4', path: '/studio?topic=sole-layers-3-4' },
  { name: 'plantar-vessels-nerves', path: '/studio?topic=plantar-vessels-nerves' },
  { name: 'lower-limb-veins', path: '/studio?topic=lower-limb-veins' },
  { name: 'lower-limb-lymphatics', path: '/studio?topic=lower-limb-lymphatics' },
  { name: 'lower-limb-dermatomes', path: '/studio?topic=lower-limb-dermatomes' },
  { name: 'hip-joint', path: '/studio?topic=hip-joint' },
  { name: 'knee-joint', path: '/studio?topic=knee-joint' },
  { name: 'ankle-tibiofibular-joints', path: '/studio?topic=ankle-tibiofibular-joints' },
  { name: 'foot-joints', path: '/studio?topic=foot-joints' },
  { name: 'foot-arches', path: '/studio?topic=foot-arches' },
  { name: 'lower-limb-surface-marking', path: '/studio?topic=lower-limb-surface-marking' },
  { name: 'lower-limb-xrays', path: '/studio?topic=lower-limb-xrays' },
  { name: 'lower-limb-nerve-injuries', path: '/studio?topic=lower-limb-nerve-injuries' },
  { name: 'lower-limb-development', path: '/studio?topic=lower-limb-development' },
  { name: 'lumbar-vertebrae-sacrum', path: '/studio?topic=lumbar-vertebrae-sacrum' },
  { name: 'intervertebral-disc', path: '/studio?topic=intervertebral-disc' },
  { name: 'bony-pelvis', path: '/studio?topic=bony-pelvis' },
  { name: 'abdominal-regions', path: '/studio?topic=abdominal-regions' },
  { name: 'abdominal-wall-superficial', path: '/studio?topic=abdominal-wall-superficial' },
  { name: 'abdominal-wall-muscles', path: '/studio?topic=abdominal-wall-muscles' },
  { name: 'rectus-sheath', path: '/studio?topic=rectus-sheath' },
  { name: 'inguinal-canal', path: '/studio?topic=inguinal-canal' },
  { name: 'penis', path: '/studio?topic=penis' },
  { name: 'scrotum-testis', path: '/studio?topic=scrotum-testis' },
  { name: 'testis-descent', path: '/studio?topic=testis-descent' },
  { name: 'peritoneum', path: '/studio?topic=peritoneum' },
  { name: 'peritoneal-folds', path: '/studio?topic=peritoneal-folds' },
  { name: 'lesser-sac', path: '/studio?topic=lesser-sac' },
  { name: 'peritoneal-spaces', path: '/studio?topic=peritoneal-spaces' },
  { name: 'stomach', path: '/studio?topic=stomach' },
  { name: 'stomach-supply', path: '/studio?topic=stomach-supply' },
  { name: 'duodenum', path: '/studio?topic=duodenum' },
  { name: 'jejunum-ileum', path: '/studio?topic=jejunum-ileum' },
  { name: 'large-intestine', path: '/studio?topic=large-intestine' },
  { name: 'appendix', path: '/studio?topic=appendix' },
  { name: 'coeliac-trunk', path: '/studio?topic=coeliac-trunk' },
  { name: 'mesenteric-vessels', path: '/studio?topic=mesenteric-vessels' },
  { name: 'portal-vein', path: '/studio?topic=portal-vein' },
];

// Only the model: no app chrome, no studio controls or labels, and no backgrounds.
const BARE = `nav, .bg-sky, section[aria-label="3D studio"] > :not(figure),
  figure [aria-hidden="true"] { display: none !important; }
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
    for (const poster of POSTERS.filter(({ name }) => ONLY.length === 0 || ONLY.includes(name))) {
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
