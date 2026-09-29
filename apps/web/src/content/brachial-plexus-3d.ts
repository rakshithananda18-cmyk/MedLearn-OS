import type { Model3D, ModelTrace, Point3 } from '@medlearn/schemas';

import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// 3D view of the brachial plexus (M4c spike). Coordinates are the BodyParts3D frame: millimetres,
// X towards the right side (negative), Y towards the back (positive), Z up.
//
// Bones and arteries come from BodyParts3D. BodyParts3D has no plexus nerves, so the nerve paths
// below are a MedLearn schematic placed on the model's landmarks (vertebral levels, the
// subclavian and axillary arteries, the humerus). Sample content: not yet medically reviewed.

// Intervertebral foramina, where each root leaves the spine.
const F5: Point3 = [-28, -62, 1414];
const F6: Point3 = [-30, -60, 1400];
const F7: Point3 = [-32, -58, 1386];
const F8: Point3 = [-33, -56, 1370];
const F1: Point3 = [-34, -54, 1355];
// Where the roots join into trunks, above and behind the subclavian artery.
const U0: Point3 = [-60, -80, 1390];
const M0: Point3 = [-60, -82, 1376];
const L0: Point3 = [-57, -85, 1360];
// Where each trunk splits into divisions, behind the clavicle.
const U1: Point3 = [-80, -84, 1368];
const M1: Point3 = [-80, -86, 1358];
const L1: Point3 = [-76, -89, 1348];
// Below the clavicle the cords follow the axillary artery, named by their position around it.
const LC0: Point3 = [-102, -94, 1330];
const PC0: Point3 = [-104, -82, 1328];
const MC0: Point3 = [-100, -92, 1320];
const LC1: Point3 = [-136, -96, 1310];
const PC1: Point3 = [-138, -79, 1300];
const MC1: Point3 = [-130, -90, 1294];
// The median nerve forms in front of the artery from lateral and medial roots.
const MEDIAN_JOIN: Point3 = [-146, -92, 1284];

/** Nerve paths of the plexus, by 2D diagram node id. */
const NERVES: Array<{ id: string; paths: Point3[][] }> = [
  { id: 'c5', paths: [[F5, [-45, -72, 1402], U0]] },
  { id: 'c6', paths: [[F6, [-46, -72, 1392], U0]] },
  { id: 'c7', paths: [[F7, [-47, -74, 1380], M0]] },
  { id: 'c8', paths: [[F8, [-46, -76, 1366], L0]] },
  { id: 't1', paths: [[F1, [-45, -79, 1356], L0]] },
  { id: 'upper', paths: [[U0, U1]] },
  { id: 'middle', paths: [[M0, M1]] },
  { id: 'lower', paths: [[L0, L1]] },
  { id: 'upper-ant', paths: [[U1, [-88, -82, 1346], LC0]] },
  { id: 'upper-post', paths: [[U1, [-90, -78, 1348], PC0]] },
  { id: 'middle-ant', paths: [[M1, [-88, -84, 1340], LC0]] },
  { id: 'middle-post', paths: [[M1, [-90, -79, 1342], PC0]] },
  { id: 'lower-ant', paths: [[L1, [-86, -86, 1332], MC0]] },
  { id: 'lower-post', paths: [[L1, [-88, -80, 1338], PC0]] },
  { id: 'lateral', paths: [[LC0, [-120, -97, 1322], LC1]] },
  { id: 'posterior', paths: [[PC0, [-122, -83, 1316], PC1]] },
  { id: 'medial', paths: [[MC0, [-116, -92, 1308], MC1]] },
  {
    id: 'musculocutaneous',
    paths: [[LC1, [-158, -96, 1290], [-178, -90, 1235], [-194, -88, 1165], [-205, -90, 1095]]],
  },
  {
    id: 'median',
    paths: [
      [
        LC1,
        MEDIAN_JOIN,
        [-158, -88, 1236],
        [-176, -84, 1166],
        [-191, -92, 1096],
        [-202, -93, 1040],
      ],
      [MC1, MEDIAN_JOIN],
    ],
  },
  {
    id: 'ulnar',
    paths: [[MC1, [-148, -80, 1262], [-165, -72, 1200], [-178, -64, 1130], [-183, -58, 1062]]],
  },
  {
    // Behind the brachial artery, through the lower triangular space with the profunda brachii,
    // round the back of the humerus in the radial groove, then forwards in front of the lateral
    // epicondyle between brachialis and brachioradialis. Placed along the measured profunda
    // brachii and radial collateral arteries.
    id: 'radial',
    paths: [
      [
        PC1,
        [-146, -78, 1285],
        [-152, -75, 1265],
        [-162, -71, 1240],
        [-172, -70, 1205],
        [-179, -65, 1180],
        [-186, -59, 1160],
        [-193, -56, 1144],
        [-200, -54, 1128],
        [-207, -52, 1113],
        [-217, -52, 1094],
        [-226, -56, 1076],
        [-231, -66, 1056],
        [-232, -78, 1036],
        [-234, -88, 1015],
      ],
    ],
  },
  {
    // Through the quadrangular space just above the posterior circumflex humeral artery, round
    // the surgical neck under deltoid, with its branch to teres minor.
    id: 'axillary',
    paths: [
      [
        PC1,
        [-150, -78, 1294],
        [-160, -69, 1292],
        [-170, -63, 1292],
        [-180, -63, 1293],
        [-190, -70, 1298],
        [-197, -82, 1300],
        [-194, -95, 1302],
      ],
      [
        [-163, -66, 1292],
        [-152, -52, 1292],
      ],
    ],
  },
];

/** One nerve's paths, for other topics that show it on the same model. */
export function plexusNerve(id: string): Point3[][] {
  const nerve = NERVES.find((item) => item.id === id);
  if (!nerve) throw new Error(`No nerve "${id}" in the plexus model`);
  return nerve.paths;
}

/** Where the posterior cord ends and its branches begin. */
export const POSTERIOR_CORD_END = PC1;
/** Where the upper trunk divides, behind the clavicle. */
export const UPPER_TRUNK_END = U1;
/** Where the C5 root leaves the spine. */
export const C5_FORAMEN = F5;

/** The three cords as one trace, for topics that show the plexus only as a content of the axilla. */
export const CORD_PATHS: Point3[][] = NERVES.filter((nerve) =>
  ['lateral', 'posterior', 'medial'].includes(nerve.id),
).flatMap((nerve) => nerve.paths);

export const brachialPlexus3d: Model3D = {
  src: SHOULDER_MODEL_SRC,
  credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
  parts: shoulderParts([
    'clavicle',
    'scapula',
    'humerus',
    'first-rib',
    'vertebra-c5',
    'vertebra-c6',
    'vertebra-c7',
    'vertebra-t1',
    'subclavian-artery',
    'axillary-artery',
    'brachial-artery',
  ]),
  traces: NERVES.map((nerve): ModelTrace => ({ ...nerve, kind: 'nerve' })),
  stops: [
    {
      id: 'overview',
      title: 'Overview',
      description:
        'The plexus runs from the neck, behind the clavicle, through the armpit into the arm.',
      target: [-120, -80, 1250],
      position: [-300, -620, 1380],
    },
    {
      id: 'roots-trunks',
      title: 'Roots and trunks',
      description: 'C5 to T1 leave the spine and join into three trunks above the first rib.',
      target: [-55, -80, 1380],
      position: [-150, -330, 1450],
    },
    {
      id: 'divisions-cords',
      title: 'Divisions and cords',
      description:
        'Behind the clavicle the trunks split; the cords then wrap around the axillary artery.',
      target: [-110, -88, 1325],
      position: [-220, -360, 1370],
    },
    {
      id: 'branches',
      title: 'Terminal branches',
      description:
        'Five nerves continue into the arm alongside the humerus and the brachial artery.',
      target: [-175, -80, 1190],
      position: [-360, -430, 1240],
    },
  ],
};
