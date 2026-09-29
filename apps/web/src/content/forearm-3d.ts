import type { Point3 } from '@medlearn/schemas';

import { plexusNerve } from './brachial-plexus-3d';
import { LYMPH_GROUPS } from './shoulder-3d';

// Nerves of the elbow, front of the forearm and hand, and the superficial lymph of the limb, for
// the upper limb batch 3 topics. Coordinates are the BodyParts3D frame: millimetres, X towards
// the right side (negative), Y towards the back (positive), Z up.
//
// BodyParts3D has no nerves or lymph nodes, so these are a MedLearn schematic: each nerve starts
// where its path in the arm ends (brachial-plexus-3d.ts) and follows the muscles, arteries and
// veins it runs with, measured from the model's meshes (scripts/models/build-models.mjs).
// Not yet medically reviewed.

/** The last point of a nerve's path in the arm, where its forearm path carries on. */
function armEnd(id: string): Point3 {
  const path = plexusNerve(id).at(0);
  const end = path?.at(-1);
  if (!end) throw new Error(`No arm path for "${id}"`);
  return end;
}

const MEDIAN_ELBOW = armEnd('median');
const ULNAR_ELBOW = armEnd('ulnar');
const RADIAL_ELBOW = armEnd('radial');
const MUSCULOCUTANEOUS_END = armEnd('musculocutaneous');
// Where the median nerve gives off the anterior interosseous nerve, between the heads of
// pronator teres.
const MEDIAN_AIN: Point3 = [-212, -93, 1000];
// At the lower border of the flexor retinaculum, where the median nerve leaves the carpal tunnel.
const MEDIAN_PALM: Point3 = [-256, -132, 778];
// Lateral to the pisiform, superficial to the retinaculum, where the ulnar nerve divides.
const ULNAR_WRIST: Point3 = [-242, -141, 792];

/**
 * Median nerve: medial to the brachial artery in the cubital fossa, between the two heads of
 * pronator teres, down the middle of the forearm on the deep surface of flexor digitorum
 * superficialis, lateral to its tendons above the wrist, then through the carpal tunnel just
 * under the retinaculum. In the palm: digital branches to the thumb, index and middle fingers.
 */
export const MEDIAN_FOREARM: Point3[][] = [
  [
    [-191, -92, 1096],
    MEDIAN_ELBOW,
    MEDIAN_AIN,
    [-219, -97, 970],
    [-226, -103, 930],
    [-234, -110, 888],
    [-243, -121, 848],
    [-250, -129, 818],
    [-254, -131, 800],
    MEDIAN_PALM,
  ],
  // Digital branches.
  [MEDIAN_PALM, [-270, -146, 760], [-292, -156, 745]],
  [MEDIAN_PALM, [-262, -145, 750], [-268, -152, 720]],
  [MEDIAN_PALM, [-255, -144, 750], [-255, -152, 718]],
];

/** Recurrent (thenar) branch of the median nerve, curling back round the retinaculum's edge. */
export const MEDIAN_RECURRENT_BRANCH: Point3[][] = [
  [MEDIAN_PALM, [-266, -141, 780], [-276, -145, 786], [-284, -144, 790]],
];

/**
 * Anterior interosseous nerve: from the median nerve between the heads of pronator teres, down
 * the front of the interosseous membrane beside its artery, between flexor digitorum profundus
 * and flexor pollicis longus, ending in pronator quadratus.
 */
export const ANTERIOR_INTEROSSEOUS_NERVE: Point3[][] = [
  [
    MEDIAN_AIN,
    [-222, -84, 982],
    [-228, -87, 958],
    [-236, -92, 930],
    [-240, -101, 900],
    [-244, -106, 872],
    [-247, -110, 852],
    [-250, -113, 840],
  ],
];

/**
 * Ulnar nerve: behind the medial epicondyle, into the forearm between the two heads of flexor
 * carpi ulnaris, down on flexor digitorum profundus under that muscle with the ulnar artery on
 * its lateral side, then in front of the retinaculum lateral to the pisiform (Guyon's canal).
 * There it splits: the superficial branch to the little and ring fingers, the deep branch round
 * the hook of the hamate and across the palm with the deep palmar arch.
 */
export const ULNAR_FOREARM: Point3[][] = [
  [
    ULNAR_ELBOW,
    [-180, -64, 1044],
    [-187, -73, 1022],
    [-192, -79, 998],
    [-199, -87, 964],
    [-207, -95, 930],
    [-214, -101, 900],
    [-223, -109, 866],
    [-231, -119, 836],
    [-238, -131, 810],
    ULNAR_WRIST,
  ],
  // Superficial branch.
  [ULNAR_WRIST, [-239, -146, 770], [-236, -150, 740]],
  // Deep branch, with the deep palmar arch.
  [ULNAR_WRIST, [-248, -134, 786], [-258, -128, 782], [-270, -127, 783], [-278, -126, 786]],
];

/**
 * Superficial branch of the radial nerve: down under brachioradialis on the lateral side of the
 * radial artery, then back round the radius above the wrist to the back of the hand.
 */
export const SUPERFICIAL_RADIAL_NERVE: Point3[][] = [
  [
    RADIAL_ELBOW,
    [-246, -92, 990],
    [-257, -95, 955],
    [-264, -97, 920],
    [-268, -100, 890],
    [-273, -104, 866],
    [-277, -100, 846],
    [-276, -93, 826],
    [-272, -100, 800],
    [-280, -110, 772],
  ],
];

/** Deep branch of the radial nerve (posterior interosseous): back through supinator. */
export const DEEP_RADIAL_NERVE: Point3[][] = [
  [RADIAL_ELBOW, [-240, -80, 1000], [-246, -72, 982], [-247, -64, 962], [-248, -68, 930]],
];

/**
 * Lateral cutaneous nerve of the forearm: the musculocutaneous nerve's end, piercing the deep
 * fascia lateral to the biceps tendon and running down the lateral forearm beside the cephalic
 * vein.
 */
export const LATERAL_CUTANEOUS_FOREARM: Point3[][] = [
  [
    MUSCULOCUTANEOUS_END,
    [-222, -97, 1060],
    [-237, -102, 1010],
    [-252, -106, 950],
    [-264, -101, 880],
    [-272, -107, 820],
  ],
];

/**
 * Medial cutaneous nerve of the forearm: from the medial cord, down the arm beside the basilic
 * vein, through the deep fascia with it at mid-arm, then down the medial forearm.
 */
export const MEDIAL_CUTANEOUS_FOREARM: Point3[][] = [
  [
    [-130, -90, 1294],
    [-150, -90, 1250],
    [-165, -76, 1180],
    [-177, -70, 1120],
    [-180, -71, 1060],
    [-179, -79, 995],
    [-192, -90, 940],
    [-212, -104, 875],
    [-227, -111, 820],
  ],
];

/**
 * Posterior cutaneous nerve of the forearm: from the radial nerve in the radial groove, piercing
 * the lateral head of triceps and running down the back of the forearm.
 */
export const POSTERIOR_CUTANEOUS_FOREARM: Point3[][] = [
  [
    [-217, -52, 1094],
    [-230, -47, 1050],
    [-237, -51, 1000],
    [-243, -59, 950],
    [-250, -72, 900],
    [-256, -86, 850],
  ],
];

/** The parts of paths between two heights, for topics that show only a stretch of a nerve. */
export function between(paths: Point3[][], low: number, high: number): Point3[][] {
  return paths
    .map((path) => path.filter(([, , z]) => z >= low && z <= high))
    .filter((path) => path.length >= 2);
}

// Superficial lymph: vessels follow the veins. Lymph from the medial side runs with the basilic
// vein through the supratrochlear (cubital) nodes, above the medial epicondyle, to the lateral
// axillary nodes; lymph from the lateral side runs with the cephalic vein, some to the
// deltopectoral nodes.
export const LYMPH_FOREARM = {
  supratrochlear: [
    [-180, -69, 1082],
    [-182, -66, 1096],
  ],
  lateralAxillary: LYMPH_GROUPS.lateral,
  deltopectoral: LYMPH_GROUPS.deltopectoral,
} satisfies Record<string, Point3[]>;
