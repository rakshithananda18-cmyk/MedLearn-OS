// Builds the body's nervous system and lymph nodes in apps/web/public/models/body-<system>.glb
// from Z-Anatomy, which has what BodyParts3D lacks: the peripheral nerves, and the lymph nodes by
// group. (The organs layer takes the lungs and the whole liver from Z-Anatomy too; see
// build-body-systems.mjs.) Every structure is one mesh named as Z-Anatomy names it, so a tap anywhere can say what
// it is, and each joins the body index for search.
//
// Source: Z-Anatomy by Gauthier Kervyn and Lluís Vinent Juanico, built on BodyParts3D, licensed
// CC BY-SA 4.0: the FBX set at github.com/LluisV/Z-Anatomy (Resources/Models/FBX). The originals
// stay in models-src/z-anatomy; the layers built from them are shared under the same licence
// (body-z-anatomy.LICENSE.txt).
// Usage: node scripts/models/build-z-anatomy.mjs [folder with the FBX files, default
// models-src/z-anatomy]
import { join } from 'node:path';

import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

import { fail } from '../lib/cli.mjs';
import { indexEntry, layerIO, updateIndex, writeLayer } from './build-body-systems.mjs';
import { structuresOf } from './z-anatomy.mjs';

/** Each layer's source file, triangles across the whole body, and the download it may take. */
export const LAYERS = {
  nerves: { file: 'NervousSystem100.fbx', triangles: 200_000, maxBytes: 2_600_000 },
  lymph: { file: 'LymphoidOrgans100.fbx', triangles: 40_000, maxBytes: 800_000 },
};

async function main() {
  const folder = process.argv[2] ?? 'models-src/z-anatomy';
  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;
  const io = layerIO();
  const entries = [];
  for (const [system, layer] of Object.entries(LAYERS)) {
    let meshes;
    try {
      meshes = structuresOf(join(folder, layer.file));
    } catch (error) {
      fail(`Could not read ${layer.file} in ${folder}: ${error.message}`);
    }
    entries.push(...meshes.map(([name, mesh]) => indexEntry(system, name, mesh.positions)));
    await writeLayer(system, meshes, layer, io);
  }
  updateIndex(Object.keys(LAYERS), entries);
}

if (process.argv[1]?.endsWith('build-z-anatomy.mjs')) await main();
