// Builds the one body's system layers in apps/web/public/models/body-<system>.glb from the whole of
// BodyParts3D: skeleton, muscles, arteries, veins and organs. Every structure is one mesh named by
// its BodyParts3D (FMA) term, so a tap anywhere on the body can say what it is. The nervous system
// and the lymph nodes come from Z-Anatomy instead (build-z-anatomy.mjs), which has the peripheral
// nerves BodyParts3D lacks.
//
// Source: BodyParts3D 4.0 (see build-models.mjs for the licence), polygon-reduced OBJ set.
// Usage: node scripts/models/build-body-systems.mjs <extracted OBJ folder> <isa_element_parts.txt>
// Each system is simplified to a triangle budget, so the body runs in a phone's browser; systems
// load one at a time, when switched on.
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { meshopt, prune, simplifyPrimitive, weld } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

import { fail, step } from '../lib/cli.mjs';
import { mergeMeshes, parseObj } from './build-models.mjs';
import { structuresOf as zAnatomyStructures } from './z-anatomy.mjs';

/** Triangles per system across the whole body, and the download each may take. */
export const SYSTEMS = {
  skeleton: { triangles: 160_000, maxBytes: 2_600_000 },
  muscles: { triangles: 240_000, maxBytes: 3_600_000 },
  arteries: { triangles: 90_000, maxBytes: 1_600_000 },
  veins: { triangles: 90_000, maxBytes: 1_600_000 },
  organs: { triangles: 160_000, maxBytes: 2_400_000 },
};

/**
 * Organs BodyParts3D has only in pieces, or not at all, taken whole from Z-Anatomy's visceral set
 * (CC BY-SA 4.0; see build-z-anatomy.mjs): the liver, in place of BodyParts3D's hepatovenous
 * segments and caudate lobe, and the lungs, lobe by lobe.
 */
export const Z_ANATOMY_ORGANS = {
  file: 'models-src/z-anatomy/VisceralSystem100.fbx',
  names: [
    'Liver',
    'Superior lobe of right lung',
    'Middle lobe of right lung',
    'Inferior lobe of right lung',
    'Superior lobe of left lung',
    'Inferior lobe of left lung',
  ],
  replaces: /^(hepatovenous segment|caudate lobe of liver)/,
};

// Which system a BodyParts3D element belongs to, from the concepts it is a kind of. Checked in
// this order: a muscle head is a muscle before it is an organ part. Nerves are still recognised,
// so they are not taken for organ parts, though their layer is built from Z-Anatomy.
const RULES = [
  [
    'nerves',
    [
      'nerve',
      'neural tree organ',
      'segment of neuraxis',
      'segment of brain',
      'cell part cluster of neuraxis',
      'gyrus of neuraxis',
      'white matter of neuraxis',
      'subdivision of parasympathetic nervous system',
      'segment of neural tree organ',
    ],
  ],
  [
    'skeleton',
    [
      'bone organ',
      'cartilage organ',
      'cartilage organ component',
      'costal cartilage',
      'skeletal ligament',
    ],
  ],
  [
    'muscles',
    ['muscle organ', 'head of muscle organ', 'zone of muscle organ', 'musculature', 'tendon'],
  ],
  ['arteries', ['artery', 'segment of arterial tree organ', 'set of arteries', 'zone of artery']],
  ['veins', ['vein', 'segment of venous tree organ', 'set of veins']],
  [
    'organs',
    [
      'solid organ',
      'cavitated organ',
      'organ with cavitated organ parts',
      'segment of tracheobronchial tree',
      'segment of bronchial tree',
      'zone of small intestine',
      // Organs BodyParts3D keeps only as parts: the heart's walls and valves, the liver's segments,
      // the colon, the eye's coats, the thymus, the ducts.
      'wall of cardiac chamber',
      'cusp of cardiac valve',
      'leaf of cardiac valve',
      'region of papillary muscle',
      'hepatovenous subsector',
      'lobular organ component',
      'segment of large intestine',
      'layer of wall of eyeball',
      'duct',
    ],
  ],
];

/** Concepts by element file, and files by concept, from isa_element_parts.txt. */
export function readIndex(text) {
  const conceptsOf = new Map();
  const filesOf = new Map();
  for (const line of text.split('\n').slice(1)) {
    const [, rawName, rawFile] = line.split('\t');
    const name = rawName?.trim().toLowerCase();
    const file = rawFile?.trim();
    if (!name || !file) continue;
    conceptsOf.set(file, [...(conceptsOf.get(file) ?? []), name]);
    filesOf.set(name, [...(filesOf.get(name) ?? []), file]);
  }
  return { conceptsOf, filesOf };
}

export function systemOf(concepts) {
  // The body file carries the skin; here it would be a second skin over every system.
  if (concepts.includes('skin')) return null;
  for (const [system, kinds] of RULES) {
    if (kinds.some((kind) => concepts.includes(kind))) return system;
  }
  // Nerves named plainly (the optic nerve is filed as an organ part).
  return null;
}

/** An element's own name: its most specific concept, the one covering the fewest files. */
export function nameOf(concepts, filesOf) {
  return [...concepts].sort(
    (a, b) => (filesOf.get(a)?.length ?? 0) - (filesOf.get(b)?.length ?? 0) || b.length - a.length,
  )[0];
}

export const slug = (name) =>
  name
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '');

/** The element files of each system, grouped into named structures. */
export function groupBySystem({ conceptsOf, filesOf }, files) {
  const systems = Object.fromEntries(Object.keys(SYSTEMS).map((system) => [system, new Map()]));
  for (const file of files) {
    const concepts = conceptsOf.get(file) ?? [];
    const name = nameOf(concepts, filesOf);
    const system = systemOf(concepts) ?? (/\bnerve\b|chiasm/.test(name ?? '') ? 'nerves' : null);
    if (!system || !name || !(system in systems)) continue;
    if (system === 'organs' && Z_ANATOMY_ORGANS.replaces.test(name)) continue;
    const structures = systems[system];
    structures.set(name, [...(structures.get(name) ?? []), file]);
  }
  return systems;
}

/**
 * Writes one system layer: each structure one named mesh, simplified together to the layer's
 * triangle budget, then quantised and compressed. `meshes` is `[name, { positions, indices }][]`
 * in BodyParts3D millimetres.
 */
export async function writeLayer(system, meshes, { triangles: budget, maxBytes }, io) {
  const output = `apps/web/public/models/body-${system}.glb`;
  const document = new Document();
  const buffer = document.createBuffer();
  const scene = document.createScene(system);
  const material = document.createMaterial(system);

  let total = 0;
  for (const [name, merged] of meshes) {
    total += merged.indices.length / 3;
    const primitive = document
      .createPrimitive()
      .setMaterial(material)
      .setAttribute(
        'POSITION',
        document.createAccessor().setType('VEC3').setArray(merged.positions).setBuffer(buffer),
      )
      .setIndices(
        document.createAccessor().setType('SCALAR').setArray(merged.indices).setBuffer(buffer),
      );
    const id = slug(name);
    const mesh = document.createMesh(id).addPrimitive(primitive);
    scene.addChild(document.createNode(id).setMesh(mesh).setExtras({ name }));
  }

  step(`${system}: ${meshes.length} structures, ${total} triangles; simplifying`);
  await document.transform(weld());
  const ratio = Math.min(1, budget / total);
  for (const mesh of document.getRoot().listMeshes()) {
    for (const primitive of mesh.listPrimitives()) {
      // A looser error than the regional models: the whole body is seen from further away.
      simplifyPrimitive(primitive, { simplifier: MeshoptSimplifier, ratio, error: 0.01 });
    }
  }
  await document.transform(prune());
  document.createExtension(KHRMeshQuantization).setRequired(true);
  document.createExtension(EXTMeshoptCompression).setRequired(true);
  await document.transform(meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
  const kept = document
    .getRoot()
    .listMeshes()
    .flatMap((mesh) => mesh.listPrimitives())
    .reduce((sum, primitive) => sum + (primitive.getIndices()?.getCount() ?? 0) / 3, 0);
  await io.write(output, document);
  const bytes = statSync(output).size;
  console.log(`  ${kept} triangles, ${(bytes / 1024).toFixed(0)} KB -> ${output}`);
  if (bytes > maxBytes) fail(`${system}: over its ${(maxBytes / 1e6).toFixed(1)} MB budget`);
}

const INDEX_FILE = 'apps/web/public/models/body-index.json';

/** The middle of a mesh and the radius around it, in whole millimetres. */
export function boundsOf(positions) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let at = 0; at < positions.length; at += 3) {
    for (let axis = 0; axis < 3; axis++) {
      min[axis] = Math.min(min[axis], positions[at + axis]);
      max[axis] = Math.max(max[axis], positions[at + axis]);
    }
  }
  const centre = min.map((low, axis) => Math.round((low + max[axis]) / 2));
  const radius = Math.round(Math.hypot(...max.map((high, axis) => high - min[axis])) / 2);
  return { centre, radius };
}

/** A structure's entry in the body index: `[id, x, y, z, radius]` in BodyParts3D millimetres. */
export function indexEntry(system, name, positions) {
  const { centre, radius } = boundsOf(positions);
  return [`${system}/${slug(name)}`, ...centre, radius];
}

/**
 * Puts these systems' structures in the body index, keeping the other systems' (built by the
 * other script), so a search can name any structure and the camera can turn to it.
 */
export function updateIndex(systems, entries) {
  let kept = [];
  try {
    kept = JSON.parse(readFileSync(INDEX_FILE, 'utf8')).structures.filter(
      ([id]) => !systems.includes(id.split('/')[0]),
    );
  } catch {
    // The first build: no index yet.
  }
  const structures = [...kept, ...entries];
  writeFileSync(INDEX_FILE, `${JSON.stringify({ structures })}\n`);
  console.log(`  ${entries.length} structures of ${systems.join(', ')} -> ${INDEX_FILE}`);
}

/** The organs taken whole from Z-Anatomy: every one of them, or the build stops. */
function zAnatomyOrgans() {
  const wanted = new Set(Z_ANATOMY_ORGANS.names);
  const found = zAnatomyStructures(Z_ANATOMY_ORGANS.file).filter(([name]) => wanted.has(name));
  const missing = Z_ANATOMY_ORGANS.names.filter((name) => !found.some(([got]) => got === name));
  if (missing.length > 0) fail(`Not in ${Z_ANATOMY_ORGANS.file}: ${missing.join(', ')}`);
  return found;
}

/** One system's structures from the OBJ files, each merged into one mesh. */
function meshesOf(structures, sourceDir) {
  return [...structures].map(([name, files]) => [
    name,
    mergeMeshes(
      files.map((file) => parseObj(readFileSync(join(sourceDir, `${file}.obj`), 'utf8'))),
    ),
  ]);
}

async function main() {
  const [sourceDir, indexFile, ...flags] = process.argv.slice(2);
  const indexOnly = flags.includes('--index-only');
  // --only=organs rebuilds one layer; the index still covers every system.
  const only = flags.find((flag) => flag.startsWith('--only='))?.slice('--only='.length);
  if (!sourceDir || !indexFile) {
    fail(
      'Usage: node scripts/models/build-body-systems.mjs <OBJ folder> <isa_element_parts.txt> [--index-only] [--only=<system>]',
    );
  }
  const index = readIndex(readFileSync(indexFile, 'utf8'));
  const files = [...index.conceptsOf.keys()];
  const systems = groupBySystem(index, files);

  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;
  const io = layerIO();
  const entries = [];
  for (const [system, structures] of Object.entries(systems)) {
    const meshes = meshesOf(structures, sourceDir);
    if (system === 'organs') meshes.push(...zAnatomyOrgans());
    entries.push(...meshes.map(([name, mesh]) => indexEntry(system, name, mesh.positions)));
    if (!indexOnly && (!only || only === system)) {
      await writeLayer(system, meshes, SYSTEMS[system], io);
    }
  }
  updateIndex(Object.keys(SYSTEMS), entries);
}

/** Reads and writes the layers: quantised, meshopt-compressed glTF. */
export function layerIO() {
  return new NodeIO()
    .registerExtensions([KHRMeshQuantization, EXTMeshoptCompression])
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
}

if (process.argv[1]?.endsWith('build-body-systems.mjs')) await main();
