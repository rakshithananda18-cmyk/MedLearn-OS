// Builds the app's 3D models in apps/web/public/models from BodyParts3D meshes:
//  - upper-limb.glb: bones, muscles, arteries and veins of the right upper limb and chest, shared
//    by the upper limb topics (each topic shows its own parts)
//  - thorax.glb: the thoracic cage, its walls and the great vessels and veins behind them, both
//    sides, shared by the thorax topics
//  - thoracic-organs.glb: the lungs, pleurae, airways, heart, great vessels and mediastinum,
//    shared by the lungs and mediastinum topics
//  - heart.glb: the heart's walls, chambers, valves and coronary vessels, shared by the heart topics
//  - hip-thigh.glb: the right hip and thigh, shared by the gluteal and thigh topics
//  - body.glb: the whole body surface, for picking a region to study
//
// Source: BodyParts3D 4.0 by the Database Center for Life Science (DBCLS),
// https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html, file isa_BP3D_4.0_obj_99.zip.
// The licence page says CC BY 4.0; the 2013 OBJ headers still say CC BY-SA 2.1 Japan, so the
// models built here are shared under CC BY-SA to be safe (logged for legal review).
//
// Usage: node scripts/models/build-models.mjs <folder with the extracted FJ*.obj files>
//          <isa_element_parts.txt, the index from the same download page> [--only=<model>]
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
import { structuresOf as zAnatomyStructures } from './z-anatomy.mjs';

/**
 * Each part is one mesh named by the id the content uses, merged from BodyParts3D element files
 * (right side, negative X), simplified to `ratio` of its triangles (1 keeps it as it is).
 * `concept` takes every element file of a BodyParts3D concept instead of listing `files`, and
 * `concepts` those of several. `zAnatomy` takes named structures from a Z-Anatomy FBX instead
 * (CC BY-SA 4.0; see build-z-anatomy.mjs), for what BodyParts3D lacks, such as the thoracic nerves.
 * `clipX` and `clipZ` keep only the triangles whose centre lies in [min, max) along that axis.
 */
// Pectoralis minor lies in front of the axillary artery from X -137 to -107 (measured from the
// meshes); the artery's first, second and third parts lie medial to, behind and lateral to it.
const PEC_MINOR_X = { lateral: -137, medial: -107 };

/** Parts from a Z-Anatomy file, from rows of [part id, Z-Anatomy names, ratio, extras]. */
const zParts = (file, rows) =>
  rows.map(([id, names, ratio, extras]) => ({
    id,
    zAnatomy: { file, names: [names].flat() },
    ratio,
    ...extras,
  }));
const visceral = (rows) => zParts('VisceralSystem100.fbx', rows);
const PLEURA = { file: 'VisceralSystem100.fbx', names: ['Pleura'] };
// Nerves of the right hip and thigh, from Z-Anatomy: BodyParts3D has almost no limb nerves. Those
// that go on into the leg are cut below the knee, where the hip and thigh model ends.
const KNEE_DOWN = { clipZ: [250, Infinity] };
const HIP_THIGH_NERVES = zParts('NervousSystem100.fbx', [
  [
    'femoral-nerve',
    ['Right femoral nerve', 'Right anterior cutaneous branches of femoral nerve'],
    0.35,
  ],
  ['saphenous-nerve', 'Right saphenous nerve', 0.25, KNEE_DOWN],
  ['lateral-cutaneous-nerve-of-thigh', 'Right lateral femoral cutaneous nerve', 0.25],
  [
    'genitofemoral-nerve',
    [
      'Right genitofemoral nerve',
      'Right femoral branch of genitofemoral nerve',
      'Right genital branch of genitofemoral nerve',
    ],
    0.3,
  ],
  [
    'obturator-nerve',
    [
      'Right obturator nerve',
      'Right anterior branch of obturator nerve',
      'Right posterior branch of obturator nerve',
    ],
    0.35,
  ],
  ['sciatic-nerve', 'Right sciatic nerve', 0.35],
  [
    'posterior-cutaneous-nerve-of-thigh',
    [
      'Right posterior femoral cutaneous nerve',
      'Right posterior root of posterior femoral cutaneous nerve',
      'Right anterior root of posterior femoral cutaneous nerve',
    ],
    0.3,
  ],
  ['superior-gluteal-nerve', 'Right superior gluteal nerve', 0.35],
  ['pudendal-nerve', 'Right pudendal nerve', 0.3],
  ['tibial-nerve', 'Right tibial nerve', 0.4, KNEE_DOWN],
  [
    'common-peroneal-nerve',
    ['Right common fibular nerve', 'Right superficial fibular nerve', 'Right deep fibular nerve'],
    0.4,
    KNEE_DOWN,
  ],
  ['medial-sural-cutaneous-nerve', 'Right medial sural cutaneous nerve', 0.5],
  ['sural-communicating-nerve', 'Right sural communicating branch of common fibular nerve', 0.5],
]);
const LOBES = visceral([
  ['right-upper-lobe', 'Superior lobe of right lung', 0.8],
  ['right-middle-lobe', 'Middle lobe of right lung', 0.8],
  ['right-lower-lobe', 'Inferior lobe of right lung', 0.8],
  ['left-upper-lobe', 'Superior lobe of left lung', 0.8],
  ['left-lower-lobe', 'Inferior lobe of left lung', 0.8],
]);
// The trachea, principal and lobar bronchi, and one segmental bronchus per bronchopulmonary
// segment (Z-Anatomy joins the left 1 and 2).
const AIRWAYS = visceral([
  ['trachea', 'Trachea', 0.6],
  ['right-main-bronchus', ['Right main bronchus', 'Intermediate bronchusr'], 1],
  ['left-main-bronchus', 'Left main bronchus', 1],
  ['right-upper-lobar-bronchus', 'Right superior lobar bronchus', 1],
  ['right-middle-lobar-bronchus', 'Middle lobar bronchusr', 1],
  ['right-lower-lobar-bronchus', 'Right inferior lobar bronchus', 1],
  ['left-upper-lobar-bronchus', 'Left superior lobar bronchus', 1],
  ['left-lower-lobar-bronchus', 'Left inferior lobar bronchus', 1],
  ['right-b1', 'Apical segmental bronchus of right lung (BI)', 0.15],
  ['right-b2', 'Posterior segmental bronchus of right lung (BII)', 0.15],
  ['right-b3', 'Anterior segmental bronchus of right lung (BIII)', 0.15],
  ['right-b4', 'Lateral segmental bronchus of right lung (BIV)', 0.15],
  ['right-b5', 'Medial segmental bronchus of right lung (BV)', 0.15],
  ['right-b6', 'Superior segmental bronchus of right lung (BVI)', 0.15],
  ['right-b7', 'Medial basal segmental bronchus of right lung (BVII)', 0.15],
  ['right-b8', 'Anterior basal segmental bronchus of right lung (BVIII)', 0.15],
  ['right-b9', 'Lateral basal segmental bronchus of right lung (BIX)', 0.15],
  ['right-b10', 'Posterior basal segmental bronchus of right lung (BX)', 0.15],
  ['left-b1-2', 'Apicoposterior segmental bronchus of left lung (BI+BII)', 0.15],
  ['left-b3', 'Anterior segmental bronchus of left lung (BIII)', 0.15],
  ['left-b4', 'Superior lingular segmental bronchus of left lung (BIV)', 0.15],
  ['left-b5', 'Inferior lingular segmental bronchus of left lung (BV)', 0.15],
  ['left-b6', 'Superior segmental bronchus of left lung (BVI)', 0.15],
  ['left-b7', 'Medial basal segmental bronchus of left lung (BVII)', 0.15],
  ['left-b8', 'Anterior basal segmental bronchus of left lung (BVIII)', 0.15],
  ['left-b9', 'Lateral basal segmental bronchus of left lung (BIX)', 0.15],
  ['left-b10', 'Posterior basal segmental bronchus of left lung (BX)', 0.15],
]);

export const MODELS = [
  {
    name: 'upper-limb',
    // Shoulder, back, arm, forearm and hand (upper limb batches 1 to 6): one file every upper limb
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
      // Anastomosis round the elbow (batch 6).
      { id: 'superior-ulnar-collateral-artery', files: ['FJ2373'], ratio: 0.3 },
      { id: 'inferior-ulnar-collateral-artery', files: ['FJ2267'], ratio: 0.5 },
    ],
  },
  {
    name: 'thorax',
    // The thoracic cage and its walls with the vessels behind them, both sides (thorax batch 1).
    maxTriangles: 150_000,
    error: 0.004,
    parts: [
      // Bones.
      { id: 'first-rib', concept: 'first rib', ratio: 0.5 },
      { id: 'second-rib', concept: 'second rib', ratio: 0.4 },
      {
        id: 'typical-ribs',
        concepts: [
          'third rib',
          'fourth rib',
          'fifth rib',
          'sixth rib',
          'seventh rib',
          'eighth rib',
          'ninth rib',
        ],
        ratio: 0.12,
      },
      { id: 'tenth-rib', concept: 'tenth rib', ratio: 0.3 },
      { id: 'eleventh-rib', concept: 'eleventh rib', ratio: 0.4 },
      { id: 'twelfth-rib', concept: 'twelfth rib', ratio: 0.4 },
      { id: 'costal-cartilages', concept: 'costal cartilage', ratio: 0.25 },
      { id: 'manubrium', concept: 'manubrium', ratio: 0.5 },
      { id: 'body-of-sternum', concept: 'body of sternum', ratio: 0.5 },
      { id: 'xiphoid-process', concept: 'xiphoid process', ratio: 1 },
      { id: 'thoracic-vertebrae', concept: 'thoracic vertebra', ratio: 0.12 },
      { id: 'thoracic-discs', concept: 'intervertebral disk of thoracic vertebra', ratio: 0.3 },
      { id: 'clavicles', concept: 'clavicle', ratio: 0.3 },
      // Muscles of the wall, and the diaphragm closing the outlet.
      { id: 'external-intercostal', concept: 'external intercostal muscle', ratio: 0.04 },
      { id: 'internal-intercostal', concept: 'internal intercostal muscle', ratio: 0.04 },
      { id: 'innermost-intercostal', concept: 'innermost intercostal muscle', ratio: 0.05 },
      { id: 'transversus-thoracis', concept: 'transversus thoracis', ratio: 0.3 },
      { id: 'diaphragm', concept: 'diaphragm', ratio: 0.12 },
      // Arteries.
      { id: 'ascending-aorta', concept: 'ascending aorta', ratio: 0.5 },
      { id: 'arch-of-aorta', concept: 'arch of aorta', ratio: 0.5 },
      { id: 'descending-aorta', concept: 'descending thoracic aorta', ratio: 0.4 },
      {
        id: 'posterior-intercostal-arteries',
        concept: 'posterior intercostal arteries',
        ratio: 0.14,
      },
      { id: 'internal-thoracic-artery', concept: 'internal thoracic artery', ratio: 0.5 },
      { id: 'subcostal-arteries', concept: 'subcostal artery', ratio: 0.5 },
      // Veins.
      { id: 'superior-vena-cava', concept: 'superior vena cava', ratio: 0.5 },
      { id: 'brachiocephalic-veins', concept: 'brachiocephalic vein', ratio: 0.5 },
      { id: 'azygos-vein', concept: 'azygos vein', ratio: 0.5 },
      { id: 'hemiazygos-vein', concept: 'hemiazygos vein', ratio: 0.5 },
      { id: 'accessory-hemiazygos-vein', concept: 'accessory hemiazygos vein', ratio: 0.5 },
      { id: 'internal-thoracic-vein', concept: 'internal thoracic vein', ratio: 0.5 },
      {
        id: 'anterior-intercostal-veins',
        concept: 'set of anterior intercostal veins',
        ratio: 0.14,
      },
      { id: 'subcostal-veins', concept: 'subcostal vein', ratio: 0.5 },
      // Nerves, from Z-Anatomy: BodyParts3D has no intercostal nerves or sympathetic trunks.
      {
        id: 'intercostal-nerves',
        zAnatomy: {
          file: 'NervousSystem100.fbx',
          names: ['Right intercostal nerves', 'Left intercostal nerves'],
        },
        ratio: 0.06,
      },
      {
        id: 'sympathetic-trunks',
        zAnatomy: {
          file: 'NervousSystem100.fbx',
          names: [
            'Right sympathetic trunk',
            'Left sympathetic trunk',
            'Right ganglia of sympathetic trunk',
            'Left ganglia of sympathetic trunk',
          ],
        },
        // Their thoracic parts only, from the first rib to the twelfth.
        clipZ: [1000, 1385],
        ratio: 0.08,
      },
    ],
  },
  {
    name: 'thoracic-organs',
    // The lungs lobe by lobe in their pleurae, the airways down to every segmental bronchus, and
    // the heart, great vessels and nerves between them (thorax batch 2). The cage is coarse here,
    // only to place them.
    maxTriangles: 150_000,
    error: 0.004,
    parts: [
      // Bones and the diaphragm, for orientation.
      { id: 'ribs', concept: 'rib', ratio: 0.05 },
      { id: 'costal-cartilages', concept: 'costal cartilage', ratio: 0.15 },
      { id: 'sternum', concepts: ['manubrium', 'body of sternum', 'xiphoid process'], ratio: 0.3 },
      { id: 'thoracic-vertebrae', concept: 'thoracic vertebra', ratio: 0.06 },
      { id: 'clavicles', concept: 'clavicle', ratio: 0.2 },
      { id: 'diaphragm', concept: 'diaphragm', ratio: 0.1 },
      // Lungs, pleurae and airways, from Z-Anatomy: BodyParts3D has the airways but no lung tissue.
      ...LOBES,
      // One mesh for both pleurae, split at the midline (the right side is negative X).
      { id: 'right-pleura', zAnatomy: PLEURA, clipX: [-Infinity, 0], ratio: 0.12 },
      { id: 'left-pleura', zAnatomy: PLEURA, clipX: [0, Infinity], ratio: 0.12 },
      ...AIRWAYS,
      // Heart and great vessels.
      { id: 'ventricles', files: ['FJ2428'], ratio: 0.12 },
      { id: 'right-atrium', concept: 'wall of right atrium', ratio: 0.2 },
      { id: 'left-atrium', concept: 'wall of left atrium', ratio: 0.3 },
      { id: 'ascending-aorta', concept: 'ascending aorta', ratio: 0.5 },
      { id: 'arch-of-aorta', concept: 'arch of aorta', ratio: 0.5 },
      { id: 'descending-aorta', concept: 'descending thoracic aorta', ratio: 0.4 },
      { id: 'brachiocephalic-trunk', concept: 'brachiocephalic artery', ratio: 0.5 },
      // The arch's other branches up to the root of the neck.
      {
        id: 'left-common-carotid',
        concept: 'left common carotid artery',
        clipZ: [0, 1400],
        ratio: 0.5,
      },
      {
        id: 'left-subclavian-artery',
        concept: 'left subclavian artery',
        clipX: [-Infinity, 60],
        ratio: 0.5,
      },
      { id: 'pulmonary-trunk', concept: 'pulmonary trunk', ratio: 0.5 },
      { id: 'right-pulmonary-artery', concept: 'right pulmonary artery', ratio: 0.5 },
      { id: 'left-pulmonary-artery', concept: 'left pulmonary artery', ratio: 0.5 },
      {
        id: 'right-pulmonary-veins',
        concepts: ['right superior pulmonary vein', 'right inferior pulmonary vein'],
        ratio: 0.4,
      },
      {
        id: 'left-pulmonary-veins',
        concepts: ['left superior pulmonary vein', 'left inferior pulmonary vein'],
        ratio: 0.4,
      },
      { id: 'superior-vena-cava', concept: 'superior vena cava', ratio: 0.5 },
      { id: 'brachiocephalic-veins', concept: 'brachiocephalic vein', ratio: 0.5 },
      {
        id: 'inferior-vena-cava',
        concept: 'inferior vena cava',
        clipZ: [1070, Infinity],
        ratio: 0.5,
      },
      { id: 'azygos-vein', concept: 'azygos vein', ratio: 0.3 },
      // Other contents of the mediastinum.
      { id: 'thymus', concepts: ['right lobe of thymus', 'left lobe of thymus'], ratio: 0.3 },
      { id: 'oesophagus', concept: 'esophagus', clipZ: [1000, 1420], ratio: 1 },
      {
        id: 'right-vagus',
        zAnatomy: { file: 'NervousSystem100.fbx', names: ['Right vagus nerve (X)'] },
        clipZ: [1000, 1400],
        ratio: 0.05,
      },
      {
        id: 'left-vagus',
        zAnatomy: { file: 'NervousSystem100.fbx', names: ['Left vagus nerve (X)'] },
        clipZ: [1000, 1400],
        ratio: 0.08,
      },
    ],
  },
  {
    name: 'heart',
    // The heart in detail: walls, the blood-filled cavity of each chamber, the valves and
    // papillary muscles, the coronary arteries and cardiac veins, and the roots of the great
    // vessels (thorax batch 3).
    maxTriangles: 150_000,
    error: 0.003,
    parts: [
      // Walls, see-through over the chambers.
      { id: 'ventricular-wall', files: ['FJ2428'], ratio: 0.4 },
      { id: 'right-atrial-wall', concept: 'wall of right atrium', ratio: 0.4 },
      { id: 'left-atrial-wall', concept: 'wall of left atrium', ratio: 0.6 },
      // The chambers as casts of the blood they hold.
      { id: 'right-atrium', concept: 'cavity of right atrium', ratio: 1 },
      { id: 'right-ventricle', concept: 'cavity of right ventricle', ratio: 1 },
      { id: 'left-atrium', concept: 'cavity of left atrium', ratio: 1 },
      { id: 'left-ventricle', concept: 'cavity of left ventricle', ratio: 1 },
      // Valves and papillary muscles.
      { id: 'tricuspid-valve', concept: 'leaflet of tricuspid valve', ratio: 0.3 },
      { id: 'mitral-valve', concept: 'leaflet of mitral valve', ratio: 0.35 },
      { id: 'pulmonary-valve', concept: 'cusp of pulmonary valve', ratio: 0.8 },
      { id: 'aortic-valve', concept: 'cusp of aortic valve', ratio: 1 },
      { id: 'right-papillary-muscles', files: ['FJ2419', 'FJ2430', 'FJ2437'], ratio: 0.6 },
      { id: 'left-papillary-muscles', files: ['FJ2418', 'FJ2429'], ratio: 0.6 },
      // Coronary arteries: each trunk with its small branches.
      {
        id: 'right-coronary-artery',
        concepts: [
          'trunk of right coronary artery',
          'right conus artery',
          'first anterior ventricular branch of right coronary artery',
          'posterior ventricular branch of right coronary artery',
        ],
        ratio: 0.5,
      },
      {
        id: 'posterior-interventricular-artery',
        concepts: [
          'posterior interventricular branch of right coronary artery',
          'septal branch of right posterior interventricular artery',
        ],
        ratio: 0.5,
      },
      {
        id: 'right-marginal-artery',
        concept: 'marginal branch of right coronary artery',
        ratio: 0.5,
      },
      { id: 'left-coronary-artery', concept: 'trunk of left coronary artery', ratio: 1 },
      {
        id: 'anterior-interventricular-artery',
        concepts: [
          'trunk of anterior interventricular branch of left coronary artery',
          'right anterior branch of anterior interventricular branch of left coronary artery',
          'conus branch of anterior interventricular branch of left coronary artery',
          'septal branch of anterior interventricular artery',
        ],
        ratio: 0.5,
      },
      { id: 'circumflex-artery', concept: 'circumflex branch of left coronary artery', ratio: 0.5 },
      {
        id: 'diagonal-arteries',
        concept: 'diagonal branch of anterior descending branch of left coronary artery',
        ratio: 0.5,
      },
      // Cardiac veins.
      { id: 'coronary-sinus', concept: 'coronary sinus', ratio: 1 },
      {
        id: 'great-cardiac-vein',
        concepts: ['great cardiac vein', 'anterior interventricular vein', 'left marginal vein'],
        ratio: 0.5,
      },
      { id: 'middle-cardiac-vein', concept: 'middle cardiac vein', ratio: 0.5 },
      {
        id: 'small-cardiac-vein',
        concepts: ['small cardiac vein', 'right marginal vein'],
        ratio: 0.5,
      },
      {
        id: 'posterior-vein-of-left-ventricle',
        concept: 'posterior vein of left ventricle',
        ratio: 0.5,
      },
      { id: 'anterior-cardiac-veins', concept: 'anterior cardiac vein', ratio: 1 },
      // Roots of the great vessels.
      { id: 'ascending-aorta', concept: 'ascending aorta', ratio: 0.6 },
      { id: 'arch-of-aorta', concept: 'arch of aorta', ratio: 0.6 },
      {
        id: 'descending-aorta',
        concept: 'descending thoracic aorta',
        clipZ: [1200, Infinity],
        ratio: 0.5,
      },
      { id: 'pulmonary-trunk', concept: 'pulmonary trunk', ratio: 0.6 },
      { id: 'right-pulmonary-artery', concept: 'right pulmonary artery', ratio: 0.6 },
      { id: 'left-pulmonary-artery', concept: 'left pulmonary artery', ratio: 0.5 },
      {
        id: 'pulmonary-veins',
        concepts: [
          'right superior pulmonary vein',
          'right inferior pulmonary vein',
          'left superior pulmonary vein',
          'left inferior pulmonary vein',
        ],
        ratio: 0.5,
      },
      { id: 'superior-vena-cava', concept: 'superior vena cava', ratio: 0.6 },
      {
        id: 'inferior-vena-cava',
        concept: 'inferior vena cava',
        clipZ: [1150, Infinity],
        ratio: 0.6,
      },
    ],
  },
  {
    name: 'hip-thigh',
    // The right hip and thigh, from the iliac crest to just below the knee: bones, gluteal and
    // thigh muscles, the popliteal fossa, vessels and nerves (lower limb batches 1 and 2). BodyParts3D has no profunda
    // femoris, gluteal or obturator arteries; their veins show where they run.
    maxTriangles: 150_000,
    error: 0.003,
    parts: [
      // Bones.
      { id: 'hip-bone', concept: 'right hip bone', ratio: 1 },
      { id: 'sacrum', concept: 'sacrum', ratio: 0.2 },
      { id: 'femur', concept: 'right femur', ratio: 1 },
      { id: 'patella', concept: 'right patella', ratio: 1 },
      { id: 'tibia', concept: 'right tibia', ratio: 1, ...KNEE_DOWN },
      { id: 'fibula', concept: 'right fibula', ratio: 1, ...KNEE_DOWN },
      // Gluteal muscles.
      { id: 'gluteus-maximus', concept: 'right gluteus maximus', ratio: 0.8 },
      { id: 'gluteus-medius', concept: 'right gluteus medius', ratio: 0.6 },
      { id: 'gluteus-minimus', concept: 'right gluteus minimus', ratio: 0.5 },
      { id: 'piriformis', concept: 'right piriformis', ratio: 1 },
      { id: 'obturator-internus', concept: 'right obturator internus', ratio: 0.6 },
      {
        id: 'gemelli',
        concepts: ['right gemellus superior', 'right gemellus inferior'],
        ratio: 1,
      },
      { id: 'quadratus-femoris', concept: 'right quadratus femoris', ratio: 1 },
      { id: 'obturator-externus', concept: 'right obturator externus', ratio: 1 },
      { id: 'tensor-fasciae-latae', concept: 'right tensor fasciae latae', ratio: 1 },
      { id: 'iliotibial-tract', concept: 'right iliotibial tract', ratio: 0.12 },
      // Front of the thigh.
      { id: 'sartorius', concept: 'right sartorius', ratio: 0.6 },
      { id: 'rectus-femoris', concept: 'right rectus femoris', ratio: 0.45 },
      { id: 'vastus-lateralis', concept: 'right vastus lateralis', ratio: 0.45 },
      { id: 'vastus-medialis', concept: 'right vastus medialis', ratio: 0.5 },
      { id: 'vastus-intermedius', concept: 'right vastus intermedius', ratio: 0.5 },
      { id: 'iliacus', concept: 'right iliacus', ratio: 0.6 },
      { id: 'psoas-major', concept: 'right psoas major', ratio: 0.45 },
      // Medial side of the thigh.
      { id: 'pectineus', concept: 'right pectineus', ratio: 1 },
      { id: 'adductor-longus', concept: 'right adductor longus', ratio: 0.7 },
      { id: 'adductor-brevis', concept: 'right adductor brevis', ratio: 1 },
      {
        id: 'adductor-magnus',
        concepts: ['right adductor magnus', 'right adductor minimus'],
        ratio: 0.45,
      },
      { id: 'gracilis', concept: 'right gracilis', ratio: 0.6 },
      // Back of the thigh (their origins lie under gluteus maximus).
      {
        id: 'biceps-femoris',
        concepts: ['long head of right biceps femoris', 'short head of right biceps femoris'],
        ratio: 0.4,
      },
      { id: 'semitendinosus', concept: 'right semitendinosus', ratio: 0.5 },
      { id: 'semimembranosus', concept: 'right semimembranosus', ratio: 0.4 },
      // The popliteal fossa's lower boundaries and floor, cut below the knee.
      ...[
        ['gastrocnemius-medial-head', 'medial head of right gastrocnemius'],
        ['gastrocnemius-lateral-head', 'lateral head of right gastrocnemius'],
        ['plantaris', 'right plantaris'],
      ].map(([id, concept]) => ({ id, concept, ratio: 0.6, ...KNEE_DOWN })),
      { id: 'popliteus', concept: 'right popliteus', ratio: 1 },
      // Arteries.
      { id: 'external-iliac-artery', concept: 'right external iliac artery', ratio: 1 },
      { id: 'femoral-artery', concept: 'right femoral artery', ratio: 1 },
      {
        id: 'superficial-epigastric-artery',
        concept: 'right superficial epigastric artery',
        ratio: 0.3,
      },
      {
        id: 'lateral-circumflex-femoral-artery',
        concept: 'right lateral circumflex femoral artery',
        ratio: 1,
      },
      { id: 'perforating-arteries', files: ['FJ2127', 'FJ2203'], ratio: 1 },
      {
        id: 'descending-genicular-artery',
        concept: 'right descending genicular artery',
        ratio: 0.2,
      },
      { id: 'popliteal-artery', concept: 'right popliteal artery', ratio: 0.1 },
      // The genicular branches of the popliteal artery round the knee.
      ...[
        ['superior-medial-genicular-artery', 'right medial superior genicular artery'],
        ['superior-lateral-genicular-artery', 'right lateral superior genicular artery'],
        ['middle-genicular-artery', 'right middle genicular artery'],
        ['inferior-medial-genicular-artery', 'right inferior medial genicular artery'],
        ['inferior-lateral-genicular-artery', 'right inferior lateral genicular artery'],
      ].map(([id, concept]) => ({ id, concept, ratio: 0.4 })),
      {
        id: 'anterior-tibial-artery',
        concept: 'right anterior tibial artery',
        ratio: 0.2,
        ...KNEE_DOWN,
      },
      {
        id: 'posterior-tibial-artery',
        concept: 'right posterior tibial artery',
        ratio: 0.3,
        ...KNEE_DOWN,
      },
      // Veins.
      { id: 'external-iliac-vein', concept: 'right external iliac vein', ratio: 1 },
      { id: 'femoral-vein', concept: 'right femoral vein', ratio: 1 },
      { id: 'deep-femoral-vein', concept: 'right deep femoral vein', ratio: 0.3 },
      {
        id: 'great-saphenous-vein',
        concept: 'right great saphenous vein',
        ratio: 0.1,
        ...KNEE_DOWN,
      },
      {
        id: 'superficial-epigastric-vein',
        concept: 'right superficial epigastric vein',
        ratio: 0.5,
      },
      {
        id: 'medial-circumflex-femoral-vein',
        concept: 'right medial circumflex femoral vein',
        ratio: 1,
      },
      {
        id: 'lateral-circumflex-femoral-vein',
        concept: 'right lateral circumflex femoral vein',
        ratio: 0.5,
      },
      { id: 'superior-gluteal-vein', concept: 'right superior gluteal vein', ratio: 1 },
      { id: 'inferior-gluteal-vein', concept: 'right inferior gluteal vein', ratio: 0.15 },
      { id: 'obturator-vein', concept: 'right obturator vein', ratio: 0.3 },
      { id: 'popliteal-vein', concept: 'right popliteal vein', ratio: 0.1 },
      {
        id: 'small-saphenous-vein',
        concept: 'right small saphenous vein',
        ratio: 0.15,
        ...KNEE_DOWN,
      },
      // Nerves.
      ...HIP_THIGH_NERVES,
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

/** The triangles whose centre lies in [min, max) along an axis (0 X, 2 Z); vertices stay. */
export function clipTriangles({ positions, indices }, [min, max], axis = 0) {
  const kept = [];
  for (let t = 0; t < indices.length; t += 3) {
    const corners = [indices[t], indices[t + 1], indices[t + 2]];
    const centre = corners.reduce((sum, index) => sum + positions[index * 3 + axis], 0) / 3;
    if (centre >= min && centre < max) kept.push(...corners);
  }
  return { positions, indices: new Uint32Array(kept) };
}

const Z_ANATOMY_DIR = 'models-src/z-anatomy';
const zAnatomyFiles = new Map();

/** Named structures from a Z-Anatomy FBX, read once per file. */
function zAnatomyMeshes({ file, names }) {
  if (!zAnatomyFiles.has(file)) {
    zAnatomyFiles.set(file, new Map(zAnatomyStructures(join(Z_ANATOMY_DIR, file))));
  }
  const structures = zAnatomyFiles.get(file);
  return names.map((name) => {
    const mesh = structures.get(name);
    if (!mesh) fail(`Not in ${file}: ${name}`);
    return mesh;
  });
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
    let meshes;
    if (part.zAnatomy) {
      meshes = zAnatomyMeshes(part.zAnatomy);
    } else {
      const files =
        part.files ?? (part.concepts ?? [part.concept]).flatMap((name) => concepts.get(name) ?? []);
      if (files.length === 0) fail(`No BodyParts3D files for ${part.id}`);
      meshes = files.map((file) => parseObj(readFileSync(join(sourceDir, `${file}.obj`), 'utf8')));
    }
    // prune() later drops the vertices a clip leaves unused.
    let { positions, indices } = mergeMeshes(meshes);
    if (part.clipX) ({ positions, indices } = clipTriangles({ positions, indices }, part.clipX, 0));
    if (part.clipZ) ({ positions, indices } = clipTriangles({ positions, indices }, part.clipZ, 2));
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
  const [sourceDir, index, ...flags] = process.argv.slice(2);
  if (!sourceDir || !index) {
    fail(
      'Usage: node scripts/models/build-models.mjs <extracted OBJ folder> <isa_element_parts.txt> [--only=<model>]',
    );
  }
  // --only=thorax rebuilds one model and leaves the others' files as they are.
  const only = flags.find((flag) => flag.startsWith('--only='))?.slice('--only='.length);
  const concepts = readConcepts(readFileSync(index, 'utf8'));

  await MeshoptEncoder.ready;
  await MeshoptSimplifier.ready;
  const io = new NodeIO()
    .registerExtensions([KHRMeshQuantization, EXTMeshoptCompression])
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
  for (const model of MODELS) {
    if (!only || model.name === only) await build(model, sourceDir, concepts, io);
  }
}

if (process.argv[1]?.endsWith('build-models.mjs')) await main();
