// Builds apps/web/public/models/upper-limb.glb from BodyParts3D meshes (the M4c 3D spike).
//
// Source: BodyParts3D 4.0 by the Database Center for Life Science (DBCLS),
// https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html, file isa_BP3D_4.0_obj_99.zip.
// The licence page says CC BY 4.0; the 2013 OBJ headers still say CC BY-SA 2.1 Japan, so the
// model built here is shared under CC BY-SA to be safe (logged for legal review).
//
// Usage: node scripts/models/build-upper-limb.mjs <folder with the extracted FJ*.obj files>
// Coordinates stay in the source frame (millimetres, Z up); the viewer turns them into its scene.
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { meshopt, prune, simplifyPrimitive, weld } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

import { fail, step } from '../lib/cli.mjs';

/** BodyParts3D element file, part id used by the app, and how far to simplify it. */
export const PARTS = [
  { file: 'FJ3362', id: 'clavicle', ratio: 1 },
  { file: 'FJ3384', id: 'scapula', ratio: 0.3 },
  { file: 'FJ3368', id: 'humerus', ratio: 1 },
  { file: 'FJ3334', id: 'first-rib', ratio: 1 },
  { file: 'FJ3167', id: 'vertebra-c5', ratio: 1 },
  { file: 'FJ3170', id: 'vertebra-c6', ratio: 1 },
  { file: 'FJ3172', id: 'vertebra-c7', ratio: 1 },
  { file: 'FJ3158', id: 'vertebra-t1', ratio: 1 },
  { file: 'FJ3579', id: 'subclavian-artery', ratio: 1 },
  { file: 'FJ2268', id: 'axillary-artery', ratio: 1 },
  { file: 'FJ2271', id: 'brachial-artery', ratio: 1 },
];

const MAX_TRIANGLES = 50_000;
const MAX_BYTES = 1.5 * 1024 * 1024;

/** Vertex positions and triangle indices from a BodyParts3D OBJ ("f a//a b//b c//c"). */
export function parseObj(text) {
  const positions = [];
  const indices = [];
  for (const line of text.split('\n')) {
    if (line.startsWith('v ')) {
      const [, x, y, z] = line.trim().split(/\s+/);
      positions.push(Number(x), Number(y), Number(z));
    } else if (line.startsWith('f ')) {
      const corners = line
        .trim()
        .split(/\s+/)
        .slice(1)
        .map((c) => Number(c.split('/')[0]) - 1);
      for (let k = 1; k + 1 < corners.length; k += 1) {
        indices.push(corners[0], corners[k], corners[k + 1]);
      }
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

async function main() {
  const [sourceDir] = process.argv.slice(2);
  const output = 'apps/web/public/models/upper-limb.glb';
  if (!sourceDir) fail('Usage: node scripts/models/build-upper-limb.mjs <extracted OBJ folder>');

  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;

  const document = new Document();
  const buffer = document.createBuffer();
  const scene = document.createScene('upper-limb');
  const material = document.createMaterial('part');

  step('Reading BodyParts3D meshes');
  for (const part of PARTS) {
    const { positions, indices } = parseObj(
      readFileSync(join(sourceDir, `${part.file}.obj`), 'utf8'),
    );
    const primitive = document
      .createPrimitive()
      .setMaterial(material)
      .setAttribute(
        'POSITION',
        document.createAccessor().setType('VEC3').setArray(positions).setBuffer(buffer),
      )
      .setIndices(document.createAccessor().setType('SCALAR').setArray(indices).setBuffer(buffer));
    const mesh = document
      .createMesh(part.id)
      .addPrimitive(primitive)
      .setExtras({ ratio: part.ratio });
    scene.addChild(document.createNode(part.id).setMesh(mesh));
  }

  step('Simplifying and compressing');
  await document.transform(weld());
  // Only the dense parts are simplified (the scapula alone is half of all triangles).
  for (const mesh of document.getRoot().listMeshes()) {
    const { ratio } = mesh.getExtras();
    if (ratio >= 1) continue;
    for (const primitive of mesh.listPrimitives()) {
      simplifyPrimitive(primitive, { simplifier: MeshoptSimplifier, ratio, error: 0.002 });
    }
  }
  // No normals in the file: the viewer computes smooth ones on load, which keeps it smaller.
  await document.transform(prune());
  document.createExtension(KHRMeshQuantization).setRequired(true);
  document.createExtension(EXTMeshoptCompression).setRequired(true);
  await document.transform(meshopt({ encoder: MeshoptEncoder, level: 'medium' }));

  const triangles = document
    .getRoot()
    .listMeshes()
    .flatMap((mesh) => mesh.listPrimitives())
    .reduce((total, primitive) => total + (primitive.getIndices()?.getCount() ?? 0) / 3, 0);

  const io = new NodeIO()
    .registerExtensions([KHRMeshQuantization, EXTMeshoptCompression])
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
  await io.write(output, document);

  const bytes = statSync(output).size;
  console.log(`  ${triangles} triangles, ${(bytes / 1024).toFixed(0)} KB -> ${output}`);
  if (triangles > MAX_TRIANGLES) fail(`Over the ${MAX_TRIANGLES} triangle budget`);
  if (bytes > MAX_BYTES) fail('Over the 1.5 MB download budget');
}

if (process.argv[1]?.endsWith('build-upper-limb.mjs')) await main();
