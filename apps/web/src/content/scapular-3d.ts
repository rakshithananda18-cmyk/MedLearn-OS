import type { Point3 } from '@medlearn/schemas';

import { C5_FORAMEN, POSTERIOR_CORD_END, UPPER_TRUNK_END } from './brachial-plexus-3d';

// Nerves of the back and scapular region, and latissimus dorsi, for the upper limb batch 2
// topics. Coordinates are the BodyParts3D frame: millimetres, X towards the right side
// (negative), Y towards the back (positive), Z up.
//
// BodyParts3D has no nerves and no latissimus dorsi, so these are a MedLearn schematic: each
// nerve follows the artery it runs with or the muscle it lies on, measured from the model's
// meshes (scripts/models/build-models.mjs). Not yet medically reviewed.

/**
 * Suprascapular nerve: from the upper trunk across the neck to the suprascapular notch, below
 * the ligament the suprascapular artery crosses above, through the supraspinous fossa and round
 * the spinoglenoid notch into the infraspinous fossa.
 */
export const SUPRASCAPULAR_NERVE: Point3[][] = [
  [
    UPPER_TRUNK_END,
    [-90, -80, 1352],
    [-100, -70, 1333],
    [-110, -56, 1321],
    [-126, -50, 1314],
    [-142, -47, 1302],
    [-140, -38, 1290],
    [-130, -30, 1281],
  ],
];

/**
 * Dorsal scapular nerve: from the C5 root, deep to levator scapulae and the rhomboids along the
 * medial border of the scapula, beside the dorsal scapular artery.
 */
export const DORSAL_SCAPULAR_NERVE: Point3[][] = [
  [
    C5_FORAMEN,
    [-38, -66, 1398],
    [-50, -54, 1372],
    [-66, -36, 1342],
    [-60, -14, 1310],
    [-56, -9, 1285],
    [-58, -7, 1260],
    [-62, -4, 1240],
    [-70, -1, 1216],
  ],
];

/**
 * Spinal accessory nerve: across the posterior triangle of the neck, then down on the deep
 * surface of trapezius.
 */
export const SPINAL_ACCESSORY_NERVE: Point3[][] = [
  [
    [-42, -84, 1460],
    [-58, -64, 1414],
    [-66, -46, 1374],
    [-54, -14, 1326],
    [-40, -7, 1286],
    [-28, -3, 1246],
    [-18, -1, 1200],
    [-11, -1, 1155],
  ],
];

/** Thoracodorsal nerve: from the posterior cord down the posterior wall of the axilla. */
export const THORACODORSAL_NERVE: Point3[][] = [
  [POSTERIOR_CORD_END, [-140, -66, 1275], [-142, -50, 1250], [-140, -30, 1225], [-130, -12, 1200]],
];

/**
 * Latissimus dorsi as an outline: its upper border from the spine of T7 across the inferior
 * angle of the scapula, and its lower border from the lower spine, both converging on the
 * humerus. The muscle continues below the model to the iliac crest.
 */
export const LATISSIMUS_OUTLINE: Point3[][] = [
  [
    [-4, 6, 1212],
    [-50, 4, 1212],
    [-95, 0, 1205],
    [-130, -25, 1225],
    [-155, -55, 1250],
    [-166, -76, 1263],
  ],
  [
    [-4, 6, 1212],
    [-3, 6, 1060],
    [-60, 8, 1070],
    [-120, -5, 1120],
    [-150, -35, 1190],
    [-163, -62, 1240],
    [-166, -76, 1263],
  ],
];
