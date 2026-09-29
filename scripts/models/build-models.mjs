// Builds the app's 3D models in apps/web/public/models from BodyParts3D meshes:
//  - upper-limb.glb: bones, muscles, arteries and veins of the right upper limb and chest, shared
//    by the upper limb topics (each topic shows its own parts)
//  - body.glb: the whole body surface, for picking a region to study
//
// Source: BodyParts3D 4.0 by the Database Center for Life Science (DBCLS),
// https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html, file isa_BP3D_4.0_obj_99.zip.
// The licence page says CC BY 4.0; the 2013 OBJ headers still say CC BY-SA 2.1 Japan, so the
// models built here are shared under CC BY-SA to be safe (logged for legal review).
//
// Usage: node scripts/models/build-models.mjs <folder with the extracted FJ*.obj files>
//          <isa_element_parts.txt, the index from the same download page>
// Coordinates stay in the source frame (millimetres, Z up); the viewer turns them into its scene.
// Model files are cached forever by URL, so a rebuilt model with new parts needs a new address
// (the version in SHOULDER_MODEL_SRC, apps/web/src/content/shoulder-3d.ts).
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { meshopt, prune, simplifyPrimitive, weld } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

import { fail, step } from '../lib/cli.mjs';

/**
 * Each part is one mesh named by the id the content uses, merged from BodyParts3D element files
 * (right side, negative X), simplified to `ratio` of its triangles (1 keeps it as it is).
 * `concept` takes every element file of a BodyParts3D concept instead of listing `files`.
 * `clipX` keeps only the triangles whose centre lies in [min, max) along X.
 */
// Pectoralis minor lies in front of the axillary artery from X -137 to -107 (measured from the
// meshes); the artery's first, second and third parts lie medial to, behind and lateral to it.
const PEC_MINOR_X = { lateral: -137, medial: -107 };

export const MODELS = [
  {
    name: 'upper-limb',
    // Shoulder, back, arm, forearm and hand (upper limb batches 1 to 5): one file every upper limb
    // topic shares.
    maxTriangles: 150_000,
    error: 0.002,
    parts: [
      // Bones.
      { id: 'clavicle', files: ['FJ3362'], ratio: 1 },
      { id: 'scapula', files: ['FJ3384'], ratio: 0.3 },
      { id: 'humerus', files: ['FJ3368'], ratio: 1 },
      { id: 'first-rib', files: ['FJ3334', 'FJ3333'], ratio: 0.5 },
      {
        // Ribs 2 to 6 with their costal cartilages.
        id: 'upper-ribs',
        files: ['FJ3336', 'FJ3338', 'FJ3340', 'FJ3342', 'FJ3344'].concat([
          'FJ3335',
          'FJ3337',
          'FJ3339',
          'FJ3341',
          'FJ3343',
        ]),
        ratio: 0.12,
      },
      { id: 'sternum', files: ['FJ3290', 'FJ3178', 'FJ3153'], ratio: 0.3 },
      { id: 'vertebra-c5', files: ['FJ3167'], ratio: 1 },
      { id: 'vertebra-c6', files: ['FJ3170'], ratio: 1 },
      { id: 'vertebra-c7', files: ['FJ3172'], ratio: 1 },
      { id: 'vertebra-t1', files: ['FJ3158'], ratio: 1 },
      {
        id: 'thoracic-vertebrae',
        files: [
          'FJ3160',
          'FJ3163',
          'FJ3166',
          'FJ3169',
          'FJ3171',
          'FJ3173',
          'FJ3174',
          'FJ3175',
          'FJ3154',
          'FJ3155',
          'FJ3156',
        ],
        ratio: 0.15,
      },
      {
        // Ribs 7 to 12, with the seventh costal cartilage.
        id: 'lower-ribs',
        files: ['FJ3346', 'FJ3347', 'FJ3348', 'FJ3330', 'FJ3331', 'FJ3332', 'FJ3345'],
        ratio: 0.1,
      },
      { id: 'radius', files: ['FJ3349'], ratio: 0.3 },
      { id: 'ulna', files: ['FJ3391'], ratio: 0.3 },
      // Muscles (BodyParts3D has no latissimus dorsi).
      { id: 'pec-major', files: ['FJ1447', 'FJ1464', 'FJ1446'], ratio: 0.4 },
      { id: 'pec-minor', files: ['FJ1456'], ratio: 0.25 },
      { id: 'subclavius', files: ['FJ1460'], ratio: 1 },
      { id: 'serratus', files: ['FJ1459'], ratio: 0.08 },
      { id: 'subscapularis', files: ['FJ1504'], ratio: 1 },
      { id: 'teres-major', files: ['FJ1507'], ratio: 1 },
      { id: 'coracobrachialis', files: ['FJ1488'], ratio: 1 },
      { id: 'biceps-short', files: ['FJ1512'], ratio: 1 },
      // Back, scapular region and arm (batch 2).
      { id: 'trapezius', files: ['FJ1521', 'FJ1554', 'FJ1520'], ratio: 0.15 },
      { id: 'levator-scapulae', files: ['FJ1532'], ratio: 0.4 },
      { id: 'rhomboid-major', files: ['FJ1536'], ratio: 0.4 },
      { id: 'rhomboid-minor', files: ['FJ1537'], ratio: 0.5 },
      { id: 'deltoid', files: ['FJ1468', 'FJ1467', 'FJ1513'], ratio: 0.2 },
      { id: 'supraspinatus', files: ['FJ1506'], ratio: 0.4 },
      { id: 'infraspinatus', files: ['FJ1500'], ratio: 0.3 },
      { id: 'teres-minor', files: ['FJ1508'], ratio: 0.6 },
      { id: 'biceps-long', files: ['FJ1478'], ratio: 0.5 },
      { id: 'brachialis', files: ['FJ1486'], ratio: 0.4 },
      { id: 'triceps-long', files: ['FJ1479'], ratio: 0.3 },
      { id: 'triceps-lateral', files: ['FJ1477'], ratio: 0.3 },
      { id: 'triceps-medial', files: ['FJ1480'], ratio: 0.3 },
      { id: 'anconeus', files: ['FJ1485'], ratio: 0.6 },
      { id: 'brachioradialis', files: ['FJ1487'], ratio: 0.3 },
      // Arteries. The thoracoacromial trunk is not in the source, only its branches.
      { id: 'subclavian-artery', files: ['FJ3579'], ratio: 1 },
      { id: 'axillary-artery', files: ['FJ2268'], ratio: 1 },
      {
        id: 'axillary-artery-1',
        files: ['FJ2268'],
        ratio: 1,
        clipX: [PEC_MINOR_X.medial, Infinity],
      },
      {
        id: 'axillary-artery-2',
        files: ['FJ2268'],
        ratio: 1,
        clipX: [PEC_MINOR_X.lateral, PEC_MINOR_X.medial],
      },
      {
        id: 'axillary-artery-3',
        files: ['FJ2268'],
        ratio: 1,
        clipX: [-Infinity, PEC_MINOR_X.lateral],
      },
      { id: 'brachial-artery', files: ['FJ2271'], ratio: 0.5 },
      { id: 'thoracoacromial-artery', files: ['FJ2361', 'FJ2263', 'FJ2282'], ratio: 0.5 },
      { id: 'lateral-thoracic-artery', files: ['FJ1938'], ratio: 0.5 },
      { id: 'subscapular-artery', files: ['FJ2298'], ratio: 1 },
      { id: 'circumflex-scapular-artery', files: ['FJ2273'], ratio: 1 },
      { id: 'thoracodorsal-artery', files: ['FJ2305'], ratio: 0.6 },
      { id: 'anterior-circumflex-humeral-artery', files: ['FJ2264'], ratio: 0.5 },
      { id: 'posterior-circumflex-humeral-artery', files: ['FJ2291', 'FJ2292'], ratio: 0.6 },
      { id: 'internal-thoracic-artery', files: ['FJ1937'], ratio: 0.5 },
      { id: 'deep-brachial-artery', files: ['FJ2277'], ratio: 0.5 },
      { id: 'radial-collateral-artery', files: ['FJ2262'], ratio: 1 },
      { id: 'middle-collateral-artery', files: ['FJ2362'], ratio: 1 },
      { id: 'suprascapular-artery', files: ['FJ2303'], ratio: 1 },
      { id: 'dorsal-scapular-artery', files: ['FJ2284'], ratio: 0.3 },
      // Veins.
      { id: 'subclavian-vein', files: ['FJ3587'], ratio: 1 },
      { id: 'axillary-vein', files: ['FJ2269'], ratio: 1 },
      { id: 'cephalic-vein', files: ['FJ2272'], ratio: 0.12 },
      { id: 'basilic-vein', files: ['FJ2270'], ratio: 0.12 },
      // Elbow, front of the forearm and hand (batch 3).
      { id: 'scaphoid', files: ['FJ3383'], ratio: 0.5 },
      { id: 'lunate', files: ['FJ3374'], ratio: 0.5 },
      { id: 'triquetral', files: ['FJ3390'], ratio: 0.5 },
      { id: 'pisiform', files: ['FJ3382'], ratio: 0.5 },
      { id: 'trapezium', files: ['FJ3388'], ratio: 0.5 },
      { id: 'trapezoid', files: ['FJ3389'], ratio: 0.5 },
      { id: 'capitate', files: ['FJ3361'], ratio: 0.5 },
      { id: 'hamate', files: ['FJ3367'], ratio: 0.5 },
      {
        // First to fifth, lateral to medial.
        id: 'metacarpals',
        files: ['FJ3350', 'FJ3352', 'FJ3354', 'FJ3356', 'FJ3358'],
        ratio: 0.4,
      },
      {
        // Proximal, middle and distal phalanges of the thumb and fingers.
        id: 'phalanges',
        files: ['FJ3327', 'FJ3322', 'FJ3325', 'FJ3326', 'FJ3323'].concat(
          ['FJ3303', 'FJ3306', 'FJ3292', 'FJ3304'],
          ['FJ3198', 'FJ3193', 'FJ3196', 'FJ3197', 'FJ3194'],
        ),
        ratio: 0.3,
      },
      { id: 'pronator-teres', files: ['FJ1474', 'FJ1516'], ratio: 0.3 },
      { id: 'flexor-carpi-radialis', files: ['FJ1496'], ratio: 0.5 },
      { id: 'palmaris-longus', files: ['FJ1502'], ratio: 0.12 },
      { id: 'flexor-carpi-ulnaris', files: ['FJ1473', 'FJ1518'], ratio: 0.15 },
      { id: 'flexor-digitorum-superficialis', files: ['FJ1475', 'FJ1499'], ratio: 0.12 },
      { id: 'flexor-digitorum-profundus', files: ['FJ1497'], ratio: 0.2 },
      { id: 'flexor-pollicis-longus', files: ['FJ1498'], ratio: 0.4 },
      { id: 'pronator-quadratus', files: ['FJ1503'], ratio: 0.3 },
      { id: 'supinator', files: ['FJ1505'], ratio: 0.3 },
      { id: 'flexor-retinaculum', files: ['FJ1471'], ratio: 0.4 },
      {
        // Abductor and flexor pollicis brevis, opponens pollicis. BodyParts3D files the right
        // flexor pollicis brevis as FJ1469M, but that mesh lies on the left; FJ1469 is the right.
        id: 'thenar-muscles',
        files: ['FJ1483', 'FJ1469', 'FJ1501'],
        ratio: 0.4,
      },
      { id: 'hypothenar-muscles', files: ['FJ1466', 'FJ1470', 'FJ1482'], ratio: 0.4 },
      { id: 'radial-artery', files: ['FJ2294'], ratio: 0.1 },
      { id: 'ulnar-artery', files: ['FJ2310'], ratio: 0.1 },
      { id: 'radial-recurrent-artery', files: ['FJ2295'], ratio: 0.3 },
      { id: 'ulnar-recurrent-arteries', files: ['FJ2311', 'FJ2293'], ratio: 1 },
      { id: 'common-interosseous-artery', files: ['FJ2275'], ratio: 1 },
      { id: 'anterior-interosseous-artery', files: ['FJ2266'], ratio: 0.3 },
      { id: 'superficial-palmar-arch', files: ['FJ2300'], ratio: 0.2 },
      { id: 'deep-palmar-arch', files: ['FJ2279'], ratio: 0.3 },
      { id: 'median-cubital-vein', files: ['FJ2287'], ratio: 0.2 },
      { id: 'median-antebrachial-vein', files: ['FJ2286'], ratio: 0.1 },
      // Back of the forearm and the hand (batch 4).
      { id: 'extensor-carpi-radialis-longus', files: ['FJ1490'], ratio: 0.25 },
      { id: 'extensor-carpi-radialis-brevis', files: ['FJ1489'], ratio: 0.25 },
      { id: 'extensor-digitorum', files: ['FJ1492'], ratio: 0.2 },
      { id: 'extensor-digiti-minimi', files: ['FJ1491'], ratio: 0.3 },
      { id: 'extensor-carpi-ulnaris', files: ['FJ1472', 'FJ1517'], ratio: 0.25 },
      { id: 'abductor-pollicis-longus', files: ['FJ1484'], ratio: 0.3 },
      { id: 'extensor-pollicis-brevis', files: ['FJ1494'], ratio: 0.4 },
      { id: 'extensor-pollicis-longus', files: ['FJ1495'], ratio: 0.4 },
      { id: 'extensor-indicis', files: ['FJ1493'], ratio: 0.5 },
      { id: 'adductor-pollicis', files: ['FJ1481', 'FJ1515'], ratio: 0.5 },
      { id: 'lumbricals', files: ['FJ1510'], ratio: 0.3 },
      { id: 'dorsal-interossei', files: ['FJ1509'], ratio: 0.3 },
      { id: 'palmar-interossei', files: ['FJ1511'], ratio: 0.4 },
      { id: 'princeps-pollicis-artery', files: ['FJ2371', 'FJ2372'], ratio: 0.3 },
      { id: 'radialis-indicis-artery', files: ['FJ2342', 'FJ2363'], ratio: 0.3 },
      { id: 'palmar-metacarpal-arteries', files: ['FJ2289'], ratio: 0.2 },
      {
        // Common and proper palmar digital arteries from the superficial arch.
        id: 'palmar-digital-arteries',
        files: ['FJ2343', 'FJ2344', 'FJ2345', 'FJ2370'].concat([
          'FJ2364',
          'FJ2365',
          'FJ2366',
          'FJ2367',
          'FJ2368',
          'FJ2369',
        ]),
        ratio: 0.25,
      },
      { id: 'dorsal-carpal-branches', files: ['FJ2283', 'FJ2288'], ratio: 0.4 },
      // FJ2347 and FJ2348 share a name; FJ2347 is the right hand's.
      { id: 'dorsal-metacarpal-arteries', files: ['FJ2347'], ratio: 0.1 },
      { id: 'recurrent-interosseous-artery', files: ['FJ2297'], ratio: 0.3 },
      { id: 'dorsal-venous-network', files: ['FJ2280'], ratio: 0.12 },
      // Joints (batch 5).
      { id: 'interosseous-membrane', files: ['FJ1476'], ratio: 0.3 },
    ],
  },
  {
    name: 'body',
    maxTriangles: 50_000,
    // The body is seen whole, so it tolerates coarser surfaces.
    error: 0.02,
    parts: [
      { id: 'skin', files: ['FJ2810'], ratio: 0.06 },
      { id: 'skeleton', concept: 'bone organ', ratio: 0.04 },
    ],
  },
];

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

/** The triangles whose centre lies in [min, max) along X; vertices stay as they are. */
export function clipTrianglesX({ positions, indices }, [min, max]) {
  const kept = [];
  for (let t = 0; t < indices.length; t += 3) {
    const corners = [indices[t], indices[t + 1], indices[t + 2]];
    const x = corners.reduce((sum, index) => sum + positions[index * 3], 0) / 3;
    if (x >= min && x < max) kept.push(...corners);
  }
  return { positions, indices: new Uint32Array(kept) };
}

/** Element file ids by concept name, from BodyParts3D's isa_element_parts.txt. */
export function readConcepts(text) {
  const concepts = new Map();
  for (const line of text.split('\n').slice(1)) {
    const [, name, file] = line.trim().split('\t');
    if (!name || !file) continue;
    concepts.set(name, [...(concepts.get(name) ?? []), file]);
  }
  return concepts;
}

/** Several meshes as one: positions end to end, indices shifted to match. */
export function mergeMeshes(meshes) {
  const positions = new Float32Array(meshes.reduce((n, mesh) => n + mesh.positions.length, 0));
  const indices = new Uint32Array(meshes.reduce((n, mesh) => n + mesh.indices.length, 0));
  let vertexOffset = 0;
  let positionAt = 0;
  let indexAt = 0;
  for (const mesh of meshes) {
    positions.set(mesh.positions, positionAt);
    indices.set(
      mesh.indices.map((index) => index + vertexOffset),
      indexAt,
    );
    positionAt += mesh.positions.length;
    indexAt += mesh.indices.length;
    vertexOffset += mesh.positions.length / 3;
  }
  return { positions, indices };
}

async function build(model, sourceDir, concepts, io) {
  const output = `apps/web/public/models/${model.name}.glb`;
  const document = new Document();
  const buffer = document.createBuffer();
  const scene = document.createScene(model.name);
  const material = document.createMaterial('part');

  step(`${model.name}: reading BodyParts3D meshes`);
  for (const part of model.parts) {
    const files = part.files ?? concepts.get(part.concept) ?? [];
    if (files.length === 0) fail(`No BodyParts3D files for ${part.id}`);
    const merged = mergeMeshes(
      files.map((file) => parseObj(readFileSync(join(sourceDir, `${file}.obj`), 'utf8'))),
    );
    // prune() later drops the vertices a clip leaves unused.
    const { positions, indices } = part.clipX ? clipTrianglesX(merged, part.clipX) : merged;
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

  step(`${model.name}: simplifying and compressing`);
  await document.transform(weld());
  // Only the dense parts are simplified.
  for (const mesh of document.getRoot().listMeshes()) {
    const { ratio } = mesh.getExtras();
    if (ratio >= 1) continue;
    for (const primitive of mesh.listPrimitives()) {
      simplifyPrimitive(primitive, { simplifier: MeshoptSimplifier, ratio, error: model.error });
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
  await io.write(output, document);

  const bytes = statSync(output).size;
  console.log(`  ${triangles} triangles, ${(bytes / 1024).toFixed(0)} KB -> ${output}`);
  if (triangles > model.maxTriangles) fail(`Over the ${model.maxTriangles} triangle budget`);
  if (bytes > MAX_BYTES) fail('Over the 1.5 MB download budget');
}

async function main() {
  const [sourceDir, index] = process.argv.slice(2);
  if (!sourceDir || !index) {
    fail(
      'Usage: node scripts/models/build-models.mjs <extracted OBJ folder> <isa_element_parts.txt>',
    );
  }
  const concepts = readConcepts(readFileSync(index, 'utf8'));

  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;
  const io = new NodeIO()
    .registerExtensions([KHRMeshQuantization, EXTMeshoptCompression])
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
  for (const model of MODELS) await build(model, sourceDir, concepts, io);
}

if (process.argv[1]?.endsWith('build-models.mjs')) await main();
