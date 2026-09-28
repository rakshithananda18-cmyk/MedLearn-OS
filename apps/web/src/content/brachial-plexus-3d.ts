import type { Model3D, Point3 } from '@medlearn/schemas';

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

/** Credit for the shoulder model's bones and arteries, shown wherever the model is. */
export const SHOULDER_MODEL_CREDIT =
  'Bones and arteries: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).';

export const brachialPlexus3d: Model3D = {
  src: '/models/upper-limb.glb',
  credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
  parts: [
    { id: 'clavicle', name: 'Clavicle', kind: 'bone' },
    { id: 'scapula', name: 'Scapula', kind: 'bone' },
    { id: 'humerus', name: 'Humerus', kind: 'bone' },
    { id: 'first-rib', name: 'First rib', kind: 'bone' },
    { id: 'vertebra-c5', name: 'C5 vertebra', kind: 'bone' },
    { id: 'vertebra-c6', name: 'C6 vertebra', kind: 'bone' },
    { id: 'vertebra-c7', name: 'C7 vertebra', kind: 'bone' },
    { id: 'vertebra-t1', name: 'T1 vertebra', kind: 'bone' },
    { id: 'subclavian-artery', name: 'Subclavian artery', kind: 'artery' },
    { id: 'axillary-artery', name: 'Axillary artery', kind: 'artery' },
    { id: 'brachial-artery', name: 'Brachial artery', kind: 'artery' },
  ],
  nerves: [
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
      id: 'radial',
      paths: [
        [
          PC1,
          [-154, -72, 1272],
          [-180, -58, 1225],
          [-202, -55, 1160],
          [-218, -64, 1105],
          [-226, -80, 1066],
        ],
      ],
    },
    {
      id: 'axillary',
      paths: [[PC1, [-156, -72, 1292], [-172, -60, 1287], [-190, -64, 1284], [-194, -78, 1292]]],
    },
  ],
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
