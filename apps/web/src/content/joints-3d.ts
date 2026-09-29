import type { Point3 } from '@medlearn/schemas';

// Capsules, ligaments, discs and bursae of the upper limb joints, which BodyParts3D has no meshes
// for: a MedLearn schematic of outlines placed on landmarks measured from the model's bones
// (scripts/models/build-models.mjs). Coordinates are the BodyParts3D frame: millimetres, X
// towards the right side (negative), Y towards the back (positive), Z up. Not yet medically
// reviewed.

/** A closed ring of `sides` points round `centre`, in the plane of two axes. */
function ring(
  centre: Point3,
  [radiusA, radiusB]: [number, number],
  plane: 'yz' | 'xy',
  sides = 10,
): Point3[] {
  const [x, y, z] = centre;
  return Array.from({ length: sides + 1 }, (_, index) => {
    const angle = (2 * Math.PI * index) / sides;
    const a = Math.round(radiusA * Math.cos(angle));
    const b = Math.round(radiusB * Math.sin(angle));
    return plane === 'yz' ? [x, y + a, z + b] : [x + a, y + b, z];
  });
}

/** Articular disc of the sternoclavicular joint, between the clavicle and the manubrium. */
export const STERNOCLAVICULAR_DISC: Point3[][] = [ring([-9, -133, 1318], [7, 7], 'yz', 8)];

/** Costoclavicular ligament: from the underside of the clavicle to the first costal cartilage. */
export const COSTOCLAVICULAR_LIGAMENT: Point3[][] = [
  [
    [-24, -140, 1310],
    [-25, -146, 1302],
  ],
];

/** Acromioclavicular joint, between the lateral end of the clavicle and the acromion. */
export const ACROMIOCLAVICULAR_JOINT: Point3[][] = [ring([-148, -68, 1350], [5, 6], 'yz', 8)];

/** Coracoclavicular ligament: conoid (medial) and trapezoid (lateral) parts. */
export const CORACOCLAVICULAR_LIGAMENT: Point3[][] = [
  [
    [-125, -78, 1333],
    [-125, -67, 1342],
  ],
  [
    [-132, -88, 1330],
    [-136, -69, 1342],
  ],
];

/** Glenoid labrum: the fibrocartilage rim that deepens the glenoid cavity. */
export const GLENOID_LABRUM: Point3[][] = [ring([-146, -78, 1316], [12, 18], 'yz', 12)];

/** Coracoacromial arch: the ligament from the coracoid to the acromion, over the humeral head. */
export const CORACOACROMIAL_ARCH: Point3[][] = [
  [
    [-136, -98, 1332],
    [-148, -88, 1344],
    [-158, -74, 1348],
    [-165, -62, 1345],
  ],
];

/** Subacromial bursa, between the arch and the supraspinatus tendon. */
export const SUBACROMIAL_BURSA: Point3[][] = [ring([-157, -76, 1340], [9, 9], 'xy', 8)];

/** Annular ligament: the ring that holds the radial head against the ulna. */
export const ANNULAR_LIGAMENT: Point3[][] = [ring([-231, -73, 1027], [11, 11], 'xy')];

/**
 * Ulnar collateral ligament: anterior band to the coronoid, posterior band to the olecranon,
 * and the oblique band between them.
 */
export const ULNAR_COLLATERAL_LIGAMENT: Point3[][] = [
  [
    [-180, -70, 1046],
    [-200, -80, 1030],
  ],
  [
    [-180, -66, 1046],
    [-196, -56, 1040],
  ],
  [
    [-200, -80, 1030],
    [-196, -56, 1040],
  ],
];

/** Radial collateral ligament: from the lateral epicondyle to the annular ligament. */
export const RADIAL_COLLATERAL_LIGAMENT: Point3[][] = [
  [
    [-241, -62, 1052],
    [-238, -66, 1034],
  ],
];

/** Articular disc of the inferior radioulnar joint, from the radius to the ulnar styloid. */
export const RADIOULNAR_DISC: Point3[][] = [
  [
    [-249, -111, 806],
    [-249, -120, 806],
    [-237, -115, 803],
    [-249, -111, 806],
  ],
];

/** Wrist (radiocarpal) joint line, over the scaphoid, lunate and triquetral. */
export const WRIST_JOINT_LINE: Point3[][] = [
  [
    [-277, -118, 808],
    [-268, -117, 812],
    [-258, -116, 813],
    [-248, -115, 812],
    [-238, -114, 806],
  ],
];

/** Carpometacarpal joint of the thumb, between the trapezium and the first metacarpal. */
export const THUMB_CMC_JOINT: Point3[][] = [ring([-277, -128, 791], [6, 6], 'xy', 8)];
