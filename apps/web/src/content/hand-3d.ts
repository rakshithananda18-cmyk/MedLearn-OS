import type { Point3 } from '@medlearn/schemas';

// Soft tissue of the wrist and hand that BodyParts3D has no meshes for: the palmar aponeurosis,
// the fascial spaces and synovial sheaths of the palm, the extensor retinaculum and the
// anatomical snuffbox. A MedLearn schematic drawn as outlines on landmarks measured from the
// model's bones, tendons and vessels (scripts/models/build-models.mjs). Coordinates are the
// BodyParts3D frame: millimetres, X towards the right side (negative), Y towards the back
// (positive), Z up. Not yet medically reviewed.

// Where palmaris longus meets the aponeurosis, at the distal edge of the flexor retinaculum.
const APONEUROSIS_APEX: Point3 = [-252, -143, 786];
// Its base, level with the heads of the second to fifth metacarpals.
const APONEUROSIS_BASE: Point3[] = [
  [-284, -152, 735],
  [-266, -153, 730],
  [-248, -152, 732],
  [-232, -150, 740],
];

/** Palmar aponeurosis: a triangle from the retinaculum to the knuckles, with a slip to each finger. */
export const PALMAR_APONEUROSIS: Point3[][] = [
  [APONEUROSIS_APEX, ...APONEUROSIS_BASE, APONEUROSIS_APEX],
  ...APONEUROSIS_BASE.map(([x, y, z]): Point3[] => [
    [x, y, z],
    [x - 2, y - 4, z - 22],
  ]),
];

/** Thenar space: deep to the index flexor tendons, in front of adductor pollicis. */
export const THENAR_SPACE: Point3[][] = [
  [
    [-289, -143, 780],
    [-268, -142, 782],
    [-267, -142, 745],
    [-284, -144, 742],
    [-289, -143, 780],
  ],
];

/**
 * Midpalmar space: deep to the flexor tendons of the middle, ring and little fingers, in front
 * of the interossei; a septum to the third metacarpal separates it from the thenar space.
 */
export const MIDPALMAR_SPACE: Point3[][] = [
  [
    [-263, -142, 782],
    [-236, -143, 780],
    [-232, -144, 745],
    [-262, -142, 742],
    [-263, -142, 782],
  ],
];

/**
 * Ulnar bursa: the common sheath of the superficialis and profundus tendons, from above the
 * retinaculum into the palm, continuous with the sheath of the little finger.
 */
export const ULNAR_BURSA: Point3[][] = [
  [
    [-246, -133, 832],
    [-248, -135, 805],
    [-248, -139, 780],
    [-246, -143, 758],
    [-240, -146, 745],
    [-232, -152, 730],
    [-226, -165, 705],
    [-223, -176, 684],
  ],
];

/** Radial bursa: the sheath of flexor pollicis longus, from above the wrist to the thumb tip. */
export const RADIAL_BURSA: Point3[][] = [
  [
    [-259, -128, 835],
    [-263, -131, 803],
    [-284, -139, 781],
    [-300, -152, 760],
    [-311, -163, 739],
    [-317, -167, 731],
  ],
];

/** Pulp space of the index fingertip, where a whitlow forms. */
export const PULP_SPACE: Point3[][] = [
  [
    [-303, -186, 677],
    [-311, -186, 676],
    [-312, -187, 663],
    [-304, -188, 662],
    [-303, -186, 677],
  ],
];

/** Extensor retinaculum: a band across the back of the wrist, from the radius to the carpus. */
export const EXTENSOR_RETINACULUM: Point3[][] = [
  [
    [-282, -104, 834],
    [-270, -96, 834],
    [-256, -92, 834],
    [-243, -93, 834],
    [-233, -99, 832],
    [-234, -110, 806],
    [-244, -103, 808],
    [-258, -101, 808],
    [-272, -104, 808],
    [-286, -112, 810],
    [-282, -104, 834],
  ],
];

/**
 * Anatomical snuffbox: the hollow between the tendons of extensor pollicis brevis (with
 * abductor pollicis longus) in front and extensor pollicis longus behind, from the radial
 * styloid to the base of the first metacarpal.
 */
export const SNUFFBOX: Point3[][] = [
  [
    [-282, -117, 806],
    [-294, -129, 777],
    [-272, -108, 806],
    [-282, -117, 806],
  ],
];
