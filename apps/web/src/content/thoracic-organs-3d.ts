import type { CameraStop, ModelPart, ModelTrace } from '@medlearn/schemas';

// The model of the thoracic organs shared by the lungs and mediastinum topics. Coordinates are
// the BodyParts3D frame: millimetres, X towards the right side (negative), Y towards the back
// (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const ORGANS_MODEL_SRC = '/models/thoracic-organs.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const ORGANS_MODEL_CREDIT =
  'Bones, heart and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Lungs, pleurae, airways, oesophagus and vagus nerves: Z-Anatomy, CC BY-SA 4.0.';

/** Credit when a topic adds the phrenic nerves, which neither source has. */
export const PHRENIC_CREDIT =
  'Phrenic nerve paths: MedLearn schematic, not yet medically reviewed.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  ribs: {
    name: 'Ribs',
    kind: 'bone',
    about:
      'The cage around the lungs. The lower border of each lung lies two ribs above the lowest reach of its pleura.',
  },
  'costal-cartilages': {
    name: 'Costal cartilages',
    kind: 'bone',
    about:
      'The front of the cage, behind which the anterior borders of the lungs and the costomediastinal recesses lie.',
  },
  sternum: {
    name: 'Sternum',
    kind: 'bone',
    about:
      'The front boundary of the mediastinum. The sternal angle marks the plane between the superior and inferior mediastinum.',
  },
  'thoracic-vertebrae': {
    name: 'Thoracic vertebrae',
    kind: 'bone',
    about:
      'The back boundary of the mediastinum. The lung roots lie opposite T5 to T7, and the trachea divides at the lower border of T4.',
  },
  clavicles: {
    name: 'Clavicles',
    kind: 'bone',
    about:
      'The apex of each lung and its cervical pleura rise about 2.5 cm above the medial third of the clavicle.',
  },
  diaphragm: {
    name: 'Diaphragm',
    kind: 'muscle',
    about:
      'The floor of the thorax. The base of each lung rests on its dome, and the diaphragmatic pleura covers its upper surface.',
  },
  'right-upper-lobe': {
    name: 'Upper lobe of right lung',
    kind: 'organ',
    about:
      'Above the horizontal and oblique fissures. Three segments: apical, posterior and anterior. Heard on the front of the chest above the fourth rib.',
  },
  'right-middle-lobe': {
    name: 'Middle lobe of right lung',
    kind: 'organ',
    about:
      'The wedge between the horizontal and oblique fissures, at the front. Two segments, lateral and medial; heard between the fourth and sixth ribs on the right.',
  },
  'right-lower-lobe': {
    name: 'Lower lobe of right lung',
    kind: 'organ',
    about:
      'Below the oblique fissure, mostly at the back: best heard from behind. Five segments: superior and four basal.',
  },
  'left-upper-lobe': {
    name: 'Upper lobe of left lung',
    kind: 'organ',
    about:
      'Above the oblique fissure, with the cardiac notch on its front border and the lingula below it, the counterpart of the right middle lobe.',
  },
  'left-lower-lobe': {
    name: 'Lower lobe of left lung',
    kind: 'organ',
    about:
      'Below the oblique fissure, mostly at the back. Its five segments mirror those of the right lower lobe.',
  },
  'right-pleura': {
    name: 'Right pleura',
    kind: 'membrane',
    about:
      'A closed serous sac around the right lung: visceral pleura on the lung, parietal pleura on the wall, mediastinum, diaphragm and neck, and a thin film of fluid between.',
  },
  'left-pleura': {
    name: 'Left pleura',
    kind: 'membrane',
    about:
      'Like the right, but its front edge swings out from the fourth costal cartilage to make room for the heart.',
  },
  trachea: {
    name: 'Trachea',
    kind: 'airway',
    about:
      'Runs down the superior mediastinum and divides at the lower border of T4 into the two principal bronchi; the carina is the ridge inside the fork.',
  },
  'right-main-bronchus': {
    name: 'Right principal bronchus',
    kind: 'airway',
    about:
      'About 2.5 cm long: shorter, wider and more in line with the trachea than the left, at about 25 degrees. Inhaled objects usually go this way.',
  },
  'left-main-bronchus': {
    name: 'Left principal bronchus',
    kind: 'airway',
    about:
      'About 5 cm long: longer, narrower and more oblique than the right, at about 45 degrees, passing below the arch of the aorta.',
  },
  'right-upper-lobar-bronchus': {
    name: 'Right upper lobar bronchus',
    kind: 'airway',
    about:
      'Leaves the right principal bronchus above the pulmonary artery: the eparterial bronchus.',
  },
  'right-middle-lobar-bronchus': {
    name: 'Right middle lobar bronchus',
    kind: 'airway',
    about:
      'From the bronchus below the pulmonary artery (hyparterial), to the lateral and medial segments.',
  },
  'right-lower-lobar-bronchus': {
    name: 'Right lower lobar bronchus',
    kind: 'airway',
    about: 'Continues down and back to the superior segment and the four basal segments.',
  },
  'left-upper-lobar-bronchus': {
    name: 'Left upper lobar bronchus',
    kind: 'airway',
    about:
      'Divides into an upper division (apicoposterior and anterior) and a lower, lingular division (superior and inferior lingular).',
  },
  'left-lower-lobar-bronchus': {
    name: 'Left lower lobar bronchus',
    kind: 'airway',
    about: 'To the superior segment and the basal segments of the left lower lobe.',
  },
  'right-b1': {
    name: 'Apical segmental bronchus, right (B1)',
    kind: 'airway',
    about: 'To the apex of the right upper lobe, rising into the root of the neck.',
  },
  'right-b2': {
    name: 'Posterior segmental bronchus, right (B2)',
    kind: 'airway',
    about: 'To the back of the right upper lobe.',
  },
  'right-b3': {
    name: 'Anterior segmental bronchus, right (B3)',
    kind: 'airway',
    about: 'To the front of the right upper lobe.',
  },
  'right-b4': {
    name: 'Lateral segmental bronchus (B4)',
    kind: 'airway',
    about: 'To the lateral segment of the right middle lobe.',
  },
  'right-b5': {
    name: 'Medial segmental bronchus (B5)',
    kind: 'airway',
    about: 'To the medial segment of the right middle lobe, against the heart.',
  },
  'right-b6': {
    name: 'Superior segmental bronchus, right (B6)',
    kind: 'airway',
    about:
      'The first branch of the lower lobar bronchus, running straight back: in a patient lying on the back, its segment is the lowest, where inhaled material settles.',
  },
  'right-b7': {
    name: 'Medial basal segmental bronchus, right (B7)',
    kind: 'airway',
    about: 'To the medial basal (cardiac) segment of the right lower lobe.',
  },
  'right-b8': {
    name: 'Anterior basal segmental bronchus, right (B8)',
    kind: 'airway',
    about: 'To the front of the base of the right lower lobe.',
  },
  'right-b9': {
    name: 'Lateral basal segmental bronchus, right (B9)',
    kind: 'airway',
    about: 'To the side of the base of the right lower lobe.',
  },
  'right-b10': {
    name: 'Posterior basal segmental bronchus, right (B10)',
    kind: 'airway',
    about:
      'The lowest and most direct continuation of the right bronchial tree: an inhaled coin usually ends here.',
  },
  'left-b1-2': {
    name: 'Apicoposterior segmental bronchus, left (B1+2)',
    kind: 'airway',
    about:
      'One stem to the apical and posterior segments of the left upper lobe, which BD counts as two.',
  },
  'left-b3': {
    name: 'Anterior segmental bronchus, left (B3)',
    kind: 'airway',
    about: 'To the front of the left upper lobe.',
  },
  'left-b4': {
    name: 'Superior lingular segmental bronchus (B4)',
    kind: 'airway',
    about: 'To the upper part of the lingula.',
  },
  'left-b5': {
    name: 'Inferior lingular segmental bronchus (B5)',
    kind: 'airway',
    about: 'To the lower part of the lingula, below the cardiac notch.',
  },
  'left-b6': {
    name: 'Superior segmental bronchus, left (B6)',
    kind: 'airway',
    about: 'To the top of the left lower lobe, the most dependent segment when lying on the back.',
  },
  'left-b7': {
    name: 'Medial basal segmental bronchus, left (B7)',
    kind: 'airway',
    about:
      'Often shares a stem with the anterior basal bronchus on the left (the anteromedial basal).',
  },
  'left-b8': {
    name: 'Anterior basal segmental bronchus, left (B8)',
    kind: 'airway',
    about: 'To the front of the base of the left lower lobe.',
  },
  'left-b9': {
    name: 'Lateral basal segmental bronchus, left (B9)',
    kind: 'airway',
    about: 'To the side of the base of the left lower lobe.',
  },
  'left-b10': {
    name: 'Posterior basal segmental bronchus, left (B10)',
    kind: 'airway',
    about: 'To the back of the base of the left lower lobe.',
  },
  ventricles: {
    name: 'Ventricles',
    kind: 'organ',
    about:
      'Most of the heart in the middle mediastinum. The left ventricle hollows the cardiac impression of the left lung; a little of the right ventricle touches the right lung.',
  },
  'right-atrium': {
    name: 'Right atrium',
    kind: 'organ',
    about:
      'Makes the right border of the heart and the cardiac impression on the right lung, in front of its root.',
  },
  'left-atrium': {
    name: 'Left atrium',
    kind: 'organ',
    about:
      'The back of the heart, receiving the four pulmonary veins; the oesophagus lies right behind it.',
  },
  'ascending-aorta': {
    name: 'Ascending aorta',
    kind: 'artery',
    about:
      'In the middle mediastinum, inside the pericardium; it leaves an impression on the left lung.',
  },
  'arch-of-aorta': {
    name: 'Arch of aorta',
    kind: 'artery',
    about:
      'In the superior mediastinum, arching over the root of the left lung from the sternal angle back to T4.',
  },
  'descending-aorta': {
    name: 'Descending thoracic aorta',
    kind: 'artery',
    about:
      'In the posterior mediastinum, behind the root of the left lung. It gives the left bronchial arteries.',
  },
  'brachiocephalic-trunk': {
    name: 'Brachiocephalic trunk',
    kind: 'artery',
    about:
      'The first branch of the arch, in the superior mediastinum, dividing behind the right sternoclavicular joint.',
  },
  'left-common-carotid': {
    name: 'Left common carotid artery',
    kind: 'artery',
    about: 'The second branch of the arch, rising through the superior mediastinum into the neck.',
  },
  'left-subclavian-artery': {
    name: 'Left subclavian artery',
    kind: 'artery',
    about:
      'The third branch of the arch; it grooves the mediastinal surface and apex of the left lung.',
  },
  'pulmonary-trunk': {
    name: 'Pulmonary trunk',
    kind: 'artery',
    about:
      'Carries deoxygenated blood from the right ventricle and divides under the arch of the aorta into the two pulmonary arteries.',
  },
  'right-pulmonary-artery': {
    name: 'Right pulmonary artery',
    kind: 'artery',
    about:
      'Passes under the arch and behind the superior vena cava to the right lung root, between the eparterial and hyparterial bronchi.',
  },
  'left-pulmonary-artery': {
    name: 'Left pulmonary artery',
    kind: 'artery',
    about:
      'Lies above the bronchus in the root of the left lung. Branches of the pulmonary arteries follow the bronchi, one to each segment.',
  },
  'right-pulmonary-veins': {
    name: 'Right pulmonary veins',
    kind: 'vein',
    about:
      'Superior and inferior, the most anterior and lowest structures in the right lung root, carrying oxygenated blood to the left atrium.',
  },
  'left-pulmonary-veins': {
    name: 'Left pulmonary veins',
    kind: 'vein',
    about:
      'Superior and inferior, in front of and below the bronchus in the left lung root. Inside the lung they run between segments, not with the bronchi.',
  },
  'superior-vena-cava': {
    name: 'Superior vena cava',
    kind: 'vein',
    about:
      'Its upper half is in the superior mediastinum and its lower half in the middle. It lies in front of the right lung root.',
  },
  'brachiocephalic-veins': {
    name: 'Brachiocephalic veins',
    kind: 'vein',
    about:
      'Join behind the right first costal cartilage to make the superior vena cava; the left one crosses behind the upper manubrium.',
  },
  'inferior-vena-cava': {
    name: 'Inferior vena cava',
    kind: 'vein',
    about:
      'A short thoracic part between the diaphragm and the right atrium, marking the lower right lung.',
  },
  'azygos-vein': {
    name: 'Azygos vein',
    kind: 'vein',
    about:
      'Arches over the root of the right lung at T4 to join the superior vena cava; it receives the right bronchial veins.',
  },
  thymus: {
    name: 'Thymus',
    kind: 'organ',
    about:
      'Behind the manubrium in the superior mediastinum, its lowest part in the anterior mediastinum. Large in children, it shrinks after puberty.',
  },
  oesophagus: {
    name: 'Oesophagus',
    kind: 'organ',
    about:
      'Behind the trachea in the superior mediastinum and behind the left atrium in the posterior mediastinum; it leaves impressions on both lungs.',
  },
  'right-vagus': {
    name: 'Right vagus nerve',
    kind: 'nerve',
    about:
      'Crosses the trachea and passes behind the root of the right lung to the posterior pulmonary plexus and the oesophagus.',
  },
  'left-vagus': {
    name: 'Left vagus nerve',
    kind: 'nerve',
    about:
      'Crosses the left side of the arch of the aorta, gives the left recurrent laryngeal nerve below the arch, and passes behind the root of the left lung.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type OrgansPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const ORGANS_PART_IDS = Object.keys(PARTS) as OrgansPartId[];

/** The parts a topic shows, in the order given. */
export function organsParts(ids: OrgansPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

/** The coarse cage and diaphragm, for orientation. */
export const FRAME: OrgansPartId[] = [
  'ribs',
  'costal-cartilages',
  'sternum',
  'thoracic-vertebrae',
  'clavicles',
  'diaphragm',
];

/** The frame without the ribs and cartilages, for topics where the lungs must show. */
export const OPEN_FRAME: OrgansPartId[] = [
  'sternum',
  'thoracic-vertebrae',
  'clavicles',
  'diaphragm',
];

/** Only the spine, clavicles and diaphragm, for mediastinal topics where the sternum would hide the vessels. */
export const SPINE_FRAME: OrgansPartId[] = ['thoracic-vertebrae', 'clavicles', 'diaphragm'];

export const LOBES: OrgansPartId[] = [
  'right-upper-lobe',
  'right-middle-lobe',
  'right-lower-lobe',
  'left-upper-lobe',
  'left-lower-lobe',
];

export const HEART: OrgansPartId[] = ['ventricles', 'right-atrium', 'left-atrium'];

/** The two lungs seen whole from the front. */
export const LUNGS_FRONT: CameraStop = {
  id: 'front',
  title: 'Lungs from the front',
  description:
    'Two cone-shaped lungs fill the chest, the heart between them in the mediastinum, the left lung hollowed more by it.',
  target: [0, -110, 1230],
  position: [0, -1060, 1290],
};

/**
 * The phrenic nerves (C3–C5), which neither model source has, drawn along the mediastinum: the
 * right on the brachiocephalic vein, superior vena cava and right atrium to the diaphragm; the
 * left across the arch of the aorta and over the left ventricle. Both pass in front of the lung
 * roots. The ids are diagram nodes in each topic that shows them.
 */
export const PHRENIC_PATHS: Record<'right' | 'left', ModelTrace['paths']> = {
  right: [
    [
      [-34, -118, 1360],
      [-31, -122, 1330],
      [-30, -124, 1300],
      [-36, -132, 1270],
      [-42, -138, 1240],
      [-42, -136, 1210],
      [-32, -126, 1186],
    ],
  ],
  left: [
    [
      [30, -110, 1365],
      [34, -112, 1335],
      [38, -114, 1305],
      [46, -120, 1280],
      [63, -128, 1255],
      [81, -132, 1228],
      [84, -136, 1200],
      [76, -146, 1180],
    ],
  ],
};

/** Credit when a topic adds the thoracic duct or recurrent laryngeal nerve, which neither source has. */
export const DUCT_NERVE_CREDIT =
  'Thoracic duct and left recurrent laryngeal nerve: MedLearn schematic, not yet medically reviewed.';

/**
 * The thoracic duct, drawn schematically: up from the aortic opening between the aorta and the
 * azygos vein, behind the oesophagus, across to the left at T5, up the left edge of the
 * oesophagus into the neck, and arching down into the angle of the left subclavian and internal
 * jugular veins.
 */
export const THORACIC_DUCT_PATHS: ModelTrace['paths'] = [
  [
    [2, -78, 1065],
    [0, -80, 1120],
    [-2, -82, 1180],
    [0, -84, 1235],
    [8, -86, 1262],
    [16, -86, 1300],
    [20, -88, 1340],
    [24, -92, 1375],
    [34, -100, 1392],
    [40, -110, 1382],
    [32, -116, 1356],
  ],
];

/** The left recurrent laryngeal nerve: from the vagus, round the ligamentum arteriosum and under the arch, up the groove between the trachea and oesophagus. */
export const RECURRENT_LARYNGEAL_PATHS: ModelTrace['paths'] = [
  [
    [34, -90, 1305],
    [32, -98, 1284],
    [22, -92, 1276],
    [13, -84, 1292],
    [11, -82, 1330],
    [10, -82, 1390],
  ],
];
