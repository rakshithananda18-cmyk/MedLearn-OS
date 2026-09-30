// Builds the one body's system layers in apps/web/public/models/body-<system>.glb from the whole of
// BodyParts3D: skeleton, muscles, arteries, veins, nervous system and organs. Every structure is
// one mesh named by its BodyParts3D (FMA) term, so a tap anywhere on the body can say what it is.
//
// Source: BodyParts3D 4.0 (see build-models.mjs for the licence), polygon-reduced OBJ set.
// Usage: node scripts/models/build-body-systems.mjs <extracted OBJ folder> <isa_element_parts.txt>
// Each system is simplified to a triangle budget, so the body runs in a phone's browser; systems
// load one at a time, when switched on.
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { meshopt, prune, simplifyPrimitive, weld } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

import { fail, step } from '../lib/cli.mjs';
import { mergeMeshes, parseObj } from './build-models.mjs';

/** Triangles per system across the whole body, and the download each may take. */
export const SYSTEMS = {
  skeleton: { triangles: 160_000, maxBytes: 2_600_000 },
  muscles: { triangles: 240_000, maxBytes: 3_600_000 },
  arteries: { triangles: 90_000, maxBytes: 1_600_000 },
  veins: { triangles: 90_000, maxBytes: 1_600_000 },
  nerves: { triangles: 80_000, maxBytes: 1_400_000 },
  organs: { triangles: 120_000, maxBytes: 2_000_000 },
};

// Which system a BodyParts3D element belongs to, from the concepts it is a kind of. Checked in
// this order: a muscle head is a muscle before it is an organ part.
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
    if (!system || !name) continue;
    const structures = systems[system];
    structures.set(name, [...(structures.get(name) ?? []), file]);
  }
  return systems;
}

async function build(system, structures, sourceDir, io) {
  const { triangles: budget, maxBytes } = SYSTEMS[system];
  const output = `apps/web/public/models/body-${system}.glb`;
  const document = new Document();
  const buffer = document.createBuffer();
  const scene = document.createScene(system);
  const material = document.createMaterial(system);

  let total = 0;
  for (const [name, files] of structures) {
    const merged = mergeMeshes(
      files.map((file) => parseObj(readFileSync(join(sourceDir, `${file}.obj`), 'utf8'))),
    );
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

  step(`${system}: ${structures.size} structures, ${total} triangles; simplifying`);
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

async function main() {
  const [sourceDir, indexFile] = process.argv.slice(2);
  if (!sourceDir || !indexFile) {
    fail('Usage: node scripts/models/build-body-systems.mjs <OBJ folder> <isa_element_parts.txt>');
  }
  const index = readIndex(readFileSync(indexFile, 'utf8'));
  const files = [...index.conceptsOf.keys()];
  const systems = groupBySystem(index, files);

  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;
  const io = new NodeIO()
    .registerExtensions([KHRMeshQuantization, EXTMeshoptCompression])
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
  for (const [system, structures] of Object.entries(systems)) {
    await build(system, structures, sourceDir, io);
  }
}

if (process.argv[1]?.endsWith('build-body-systems.mjs')) await main();
