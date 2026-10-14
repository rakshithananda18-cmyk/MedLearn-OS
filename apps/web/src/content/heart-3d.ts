import type { CameraStop, ModelPart, ModelTrace } from '@medlearn/schemas';

// The heart model shared by the heart topics. Coordinates are the BodyParts3D frame:
// millimetres, X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const HEART_MODEL_SRC = '/models/heart.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const HEART_MODEL_CREDIT =
  'Heart and great vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).';

/** Credit when a topic adds the conducting system or fetal shunts, which the source lacks. */
export const SCHEMATIC_CREDIT =
  'Conducting system and fetal shunts: MedLearn schematic, not yet medically reviewed.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. The chambers are casts of the blood they hold, blue on the right
 * and red on the left. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'ventricular-wall': {
    name: 'Ventricular myocardium',
    kind: 'muscle',
    about:
      'The muscle of both ventricles. The left wall is about three times as thick as the right, as it drives blood round the whole body.',
  },
  'right-atrial-wall': {
    name: 'Wall of right atrium',
    kind: 'muscle',
    about:
      'Smooth behind (the sinus venarum), ridged in front by musculi pectinati running from the crista terminalis into the auricle.',
  },
  'left-atrial-wall': {
    name: 'Wall of left atrium',
    kind: 'muscle',
    about:
      'Mostly smooth inside, with musculi pectinati only in the auricle; its back faces the oblique sinus and the oesophagus.',
  },
  'right-atrium': {
    name: 'Right atrium',
    kind: 'vein',
    about:
      'Receives the venae cavae, the coronary sinus and the anterior cardiac veins, and passes blood through the tricuspid orifice. It forms the right border of the heart.',
  },
  'right-ventricle': {
    name: 'Right ventricle',
    kind: 'vein',
    about:
      'Triangular, crescentic in section round the bulging septum. Rough inflow with trabeculae carneae and the moderator band; smooth outflow, the infundibulum, to the pulmonary trunk.',
  },
  'left-atrium': {
    name: 'Left atrium',
    kind: 'artery',
    about:
      'The back of the heart, receiving four pulmonary veins, and passing blood through the mitral orifice. It enlarges in mitral stenosis and can press on the oesophagus.',
  },
  'left-ventricle': {
    name: 'Left ventricle',
    kind: 'artery',
    about:
      'Circular in section, with a rough lower part and a smooth aortic vestibule below the aortic valve. It forms the apex.',
  },
  'tricuspid-valve': {
    name: 'Tricuspid valve',
    kind: 'valve',
    about:
      'Three cusps, anterior, posterior and septal, on a fibrous ring, held by chordae tendineae from three papillary muscles. It admits three fingertips.',
  },
  'mitral-valve': {
    name: 'Mitral valve',
    kind: 'valve',
    about:
      'Two cusps: a large anterior (aortic) cusp between the mitral and aortic orifices, and a small posterior cusp. It admits two fingertips.',
  },
  'pulmonary-valve': {
    name: 'Pulmonary valve',
    kind: 'valve',
    about:
      'Three semilunar cusps with no fibrous ring, closing in diastole as blood falls back into their pockets.',
  },
  'aortic-valve': {
    name: 'Aortic valve',
    kind: 'valve',
    about:
      'Three semilunar cusps. Behind them the wall bulges into the aortic sinuses; the coronary arteries arise from the anterior and left posterior sinuses.',
  },
  'right-papillary-muscles': {
    name: 'Papillary muscles of right ventricle',
    kind: 'muscle',
    about:
      'Anterior (the largest), posterior and septal. Each holds the touching edges of two cusps through chordae tendineae; the moderator band reaches the anterior one.',
  },
  'left-papillary-muscles': {
    name: 'Papillary muscles of left ventricle',
    kind: 'muscle',
    about: 'Two strong muscles, anterior and posterior, each sending chordae to both mitral cusps.',
  },
  'right-coronary-artery': {
    name: 'Right coronary artery',
    kind: 'artery',
    about:
      'From the anterior aortic sinus, between the pulmonary trunk and right auricle, down the right coronary sulcus and round to the back, ending near the crux.',
  },
  'posterior-interventricular-artery': {
    name: 'Posterior interventricular artery',
    kind: 'artery',
    about:
      'In the posterior interventricular groove. It supplies the back third of the septum and the AV node; the artery that gives it is the dominant one, usually the right.',
  },
  'right-marginal-artery': {
    name: 'Right marginal artery',
    kind: 'artery',
    about:
      'Leaves the right coronary artery at the right border and runs along the inferior border towards the apex.',
  },
  'left-coronary-artery': {
    name: 'Left coronary artery',
    kind: 'artery',
    about:
      'A short, wide trunk from the left posterior aortic sinus, between the pulmonary trunk and left auricle, dividing into the anterior interventricular and circumflex arteries.',
  },
  'anterior-interventricular-artery': {
    name: 'Anterior interventricular artery',
    kind: 'artery',
    about:
      'Down the anterior interventricular groove to the apex, supplying the front two-thirds of the septum and the front of both ventricles. Its blockage causes the commonest large infarcts.',
  },
  'circumflex-artery': {
    name: 'Circumflex artery',
    kind: 'artery',
    about:
      'Round the left border in the coronary sulcus to the back, giving the left marginal artery. In about one heart in ten it gives the posterior interventricular artery too.',
  },
  'diagonal-arteries': {
    name: 'Diagonal arteries',
    kind: 'artery',
    about:
      'Branches of the anterior interventricular artery across the front of the left ventricle; the largest is the left diagonal.',
  },
  'coronary-sinus': {
    name: 'Coronary sinus',
    kind: 'vein',
    about:
      'The main vein of the heart, about 3 cm long in the posterior coronary sulcus, opening into the right atrium between the IVC and the tricuspid orifice.',
  },
  'great-cardiac-vein': {
    name: 'Great cardiac vein',
    kind: 'vein',
    about:
      'Up the anterior interventricular groove beside the artery, then round the left in the coronary sulcus into the left end of the coronary sinus; it takes the left marginal vein.',
  },
  'middle-cardiac-vein': {
    name: 'Middle cardiac vein',
    kind: 'vein',
    about: 'In the posterior interventricular groove, joining the middle of the coronary sinus.',
  },
  'small-cardiac-vein': {
    name: 'Small cardiac vein',
    kind: 'vein',
    about:
      'With the right coronary artery in the right coronary sulcus to the right end of the coronary sinus, often taking the right marginal vein.',
  },
  'posterior-vein-of-left-ventricle': {
    name: 'Posterior vein of left ventricle',
    kind: 'vein',
    about: 'On the diaphragmatic surface of the left ventricle, ending in the coronary sinus.',
  },
  'anterior-cardiac-veins': {
    name: 'Anterior cardiac veins',
    kind: 'vein',
    about:
      'Three or four small veins across the front of the right ventricle that open straight into the right atrium.',
  },
  'ascending-aorta': {
    name: 'Ascending aorta',
    kind: 'artery',
    about:
      'Leaves the left ventricle inside the pericardium; its only branches are the two coronary arteries.',
  },
  'arch-of-aorta': {
    name: 'Arch of aorta',
    kind: 'artery',
    about:
      'Joined under its concavity to the left pulmonary artery by the ligamentum arteriosum, the remains of the ductus arteriosus.',
  },
  'descending-aorta': {
    name: 'Descending thoracic aorta',
    kind: 'artery',
    about:
      'Continues the arch behind the heart; in the fetus it carried the mixed blood shunted through the ductus arteriosus.',
  },
  'pulmonary-trunk': {
    name: 'Pulmonary trunk',
    kind: 'artery',
    about:
      'Leaves the infundibulum of the right ventricle in front of the aorta, then divides under the arch.',
  },
  'right-pulmonary-artery': {
    name: 'Right pulmonary artery',
    kind: 'artery',
    about: 'Passes behind the ascending aorta and superior vena cava to the right lung.',
  },
  'left-pulmonary-artery': {
    name: 'Left pulmonary artery',
    kind: 'artery',
    about:
      'Joined to the arch by the ligamentum arteriosum; in the fetus most of its blood went into the aorta through the ductus.',
  },
  'pulmonary-veins': {
    name: 'Pulmonary veins',
    kind: 'vein',
    about:
      'Four veins, two from each lung, bringing oxygenated blood into the back of the left atrium.',
  },
  'superior-vena-cava': {
    name: 'Superior vena cava',
    kind: 'vein',
    about:
      'Opens into the upper end of the right atrium, with the SA node at its junction with the atrium.',
  },
  'inferior-vena-cava': {
    name: 'Inferior vena cava',
    kind: 'vein',
    about:
      'Opens into the lower end of the right atrium, guarded by the rudimentary Eustachian valve, which in the fetus aimed its blood at the foramen ovale.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type HeartPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const HEART_PART_IDS = Object.keys(PARTS) as HeartPartId[];

/** The parts a topic shows, in the order given. */
export function heartParts(ids: HeartPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

export const WALLS: HeartPartId[] = ['ventricular-wall', 'right-atrial-wall', 'left-atrial-wall'];

export const CHAMBERS: HeartPartId[] = [
  'right-atrium',
  'right-ventricle',
  'left-atrium',
  'left-ventricle',
];

export const GREAT_VESSELS: HeartPartId[] = [
  'ascending-aorta',
  'arch-of-aorta',
  'descending-aorta',
  'pulmonary-trunk',
  'right-pulmonary-artery',
  'left-pulmonary-artery',
  'pulmonary-veins',
  'superior-vena-cava',
  'inferior-vena-cava',
];

export const CORONARY_ARTERIES: HeartPartId[] = [
  'right-coronary-artery',
  'posterior-interventricular-artery',
  'right-marginal-artery',
  'left-coronary-artery',
  'anterior-interventricular-artery',
  'circumflex-artery',
  'diagonal-arteries',
];

export const CARDIAC_VEINS: HeartPartId[] = [
  'coronary-sinus',
  'great-cardiac-vein',
  'middle-cardiac-vein',
  'small-cardiac-vein',
  'posterior-vein-of-left-ventricle',
  'anterior-cardiac-veins',
];

/** The heart from the front, as it lies in the chest. */
export const HEART_FRONT: CameraStop = {
  id: 'front',
  title: 'The heart from the front',
  description:
    'Placed obliquely behind the sternum, a third to the right of the midline and two-thirds to the left, its apex down, forwards and to the left.',
  target: [18, -125, 1235],
  position: [18, -620, 1255],
};

/** The heart from below and behind: its base and diaphragmatic surface. */
export const HEART_BACK: CameraStop = {
  id: 'back',
  title: 'Base and diaphragmatic surface',
  description:
    'From behind and below: the left atrium with its four pulmonary veins makes most of the base; the coronary sinus lies in the groove beneath it.',
  target: [20, -115, 1225],
  position: [80, 330, 1050],
};

/**
 * The conducting system, which the model lacks, drawn schematically: the SA node at the junction
 * of the superior vena cava and right atrium, the AV node above the opening of the coronary
 * sinus, the bundle along the membranous septum, and a branch down each side of the septum, the
 * right one through the moderator band. The ids are diagram nodes in the topic that shows them.
 */
export const CONDUCTION_PATHS: Record<
  'sa-node' | 'av-node' | 'av-bundle' | 'right-bundle-branch' | 'left-bundle-branch',
  ModelTrace['paths']
> = {
  'sa-node': [
    [
      [-24, -112, 1276],
      [-22, -116, 1268],
    ],
  ],
  'av-node': [
    [
      [-4, -108, 1210],
      [0, -112, 1213],
    ],
  ],
  'av-bundle': [
    [
      [0, -112, 1213],
      [6, -120, 1215],
      [11, -125, 1213],
    ],
  ],
  'right-bundle-branch': [
    [
      [11, -125, 1213],
      [20, -137, 1204],
      [30, -146, 1194],
      [36, -152, 1190],
      [30, -158, 1200],
    ],
  ],
  'left-bundle-branch': [
    [
      [11, -125, 1213],
      [24, -127, 1203],
      [36, -134, 1193],
      [48, -140, 1188],
    ],
    [
      [36, -134, 1193],
      [50, -130, 1204],
    ],
  ],
};

/** The ductus arteriosus (later the ligamentum arteriosum), from the left pulmonary artery to the arch. */
export const DUCTUS_PATHS: ModelTrace['paths'] = [
  [
    [32, -114, 1286],
    [31, -104, 1292],
    [28, -92, 1296],
  ],
];
