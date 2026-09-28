import type { ModelPart, Point3 } from '@medlearn/schemas';

// The shoulder and chest model shared by the upper limb topics. Coordinates are the BodyParts3D
// frame: millimetres, X towards the right side (negative), Y towards the back (positive), Z up.

export const SHOULDER_MODEL_SRC = '/models/shoulder-chest.glb';

/** Credit for the model's bones, muscles and vessels, shown wherever the model is. */
export const SHOULDER_MODEL_CREDIT =
  'Bones, muscles and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  clavicle: {
    name: 'Clavicle',
    kind: 'bone',
    about:
      'S-shaped strut from the sternum to the acromion that holds the upper limb away from the trunk. It forms the front of the apex of the axilla.',
  },
  scapula: {
    name: 'Scapula',
    kind: 'bone',
    about:
      'Flat triangular bone on the back of the chest wall. Subscapularis on its front forms the posterior wall of the axilla; its superior border bounds the apex.',
  },
  humerus: {
    name: 'Humerus',
    kind: 'bone',
    about:
      'Bone of the arm. Its intertubercular groove forms the narrow lateral wall of the axilla, and the axillary nerve winds round its surgical neck.',
  },
  'first-rib': {
    name: 'First rib',
    kind: 'bone',
    about:
      'The subclavian artery and vein become axillary at its outer border. With the clavicle and scapula it bounds the apex of the axilla.',
  },
  'upper-ribs': {
    name: 'Ribs 2 to 6',
    kind: 'bone',
    about:
      'With their costal cartilages and intercostal muscles, and covered by serratus anterior, they form the medial wall of the axilla. The breast lies over ribs 2 to 6.',
  },
  sternum: {
    name: 'Sternum',
    kind: 'bone',
    about:
      'Breastbone: manubrium, body and xiphoid process. The internal thoracic artery runs just lateral to its edge.',
  },
  'vertebra-c5': {
    name: 'C5 vertebra',
    kind: 'bone',
    about:
      'Fifth cervical vertebra. The C5 root of the brachial plexus leaves the spine just above it.',
  },
  'vertebra-c6': {
    name: 'C6 vertebra',
    kind: 'bone',
    about:
      'Sixth cervical vertebra. The C6 root of the brachial plexus leaves the spine just above it.',
  },
  'vertebra-c7': {
    name: 'C7 vertebra',
    kind: 'bone',
    about:
      'Seventh cervical vertebra. The C7 root leaves the spine just above it and the C8 root just below it.',
  },
  'vertebra-t1': {
    name: 'T1 vertebra',
    kind: 'bone',
    about:
      'First thoracic vertebra. The T1 root of the brachial plexus leaves the spine just below it.',
  },
  'pec-major': {
    name: 'Pectoralis major',
    kind: 'muscle',
    about:
      'Fan-shaped muscle from the clavicle, sternum and upper costal cartilages to the lateral lip of the intertubercular groove. Adducts and medially rotates the arm and forms the anterior axillary fold. Lateral and medial pectoral nerves.',
  },
  'pec-minor': {
    name: 'Pectoralis minor',
    kind: 'muscle',
    about:
      'From ribs 3 to 5 to the coracoid process; steadies the scapula. The key landmark of the axilla: it divides the axillary artery into three parts and the axillary nodes into three levels. Medial pectoral nerve.',
  },
  subclavius: {
    name: 'Subclavius',
    kind: 'muscle',
    about:
      'Small muscle from the first rib to the underside of the clavicle, enclosed by the clavipectoral fascia. Steadies the clavicle. Nerve to subclavius.',
  },
  serratus: {
    name: 'Serratus anterior',
    kind: 'muscle',
    about:
      'From the upper eight ribs to the medial border of the scapula. Holds the scapula to the chest and rotates it to raise the arm overhead. Long thoracic nerve: injury wings the scapula. Forms the medial wall of the axilla.',
  },
  subscapularis: {
    name: 'Subscapularis',
    kind: 'muscle',
    about:
      'Fills the front of the scapula and inserts into the lesser tubercle. A rotator cuff muscle and medial rotator of the arm. Upper and lower subscapular nerves. Posterior wall of the axilla.',
  },
  'teres-major': {
    name: 'Teres major',
    kind: 'muscle',
    about:
      'From the inferior angle of the scapula to the medial lip of the intertubercular groove; adducts and medially rotates the arm. At its lower border the axillary artery becomes the brachial artery.',
  },
  coracobrachialis: {
    name: 'Coracobrachialis',
    kind: 'muscle',
    about:
      'From the coracoid process to the middle of the humerus; flexes and adducts the arm. The musculocutaneous nerve pierces it. Part of the lateral wall of the axilla.',
  },
  'biceps-short': {
    name: 'Short head of biceps',
    kind: 'muscle',
    about:
      'Arises from the coracoid process with coracobrachialis and lies in the lateral wall of the axilla. Musculocutaneous nerve.',
  },
  'subclavian-artery': {
    name: 'Subclavian artery',
    kind: 'artery',
    about:
      'Arches over the first rib behind scalenus anterior and becomes the axillary artery at the outer border of the rib.',
  },
  'axillary-artery': {
    name: 'Axillary artery',
    kind: 'artery',
    about:
      'From the outer border of the first rib to the lower border of teres major. Pectoralis minor divides it into three parts, with one, two and three branches.',
  },
  // The same artery split where pectoralis minor crosses it.
  'axillary-artery-1': {
    name: 'First part of the axillary artery',
    kind: 'artery',
    about: 'Above pectoralis minor. One branch: the superior thoracic artery.',
  },
  'axillary-artery-2': {
    name: 'Second part of the axillary artery',
    kind: 'artery',
    about:
      'Behind pectoralis minor. Two branches: thoracoacromial and lateral thoracic. The cords of the brachial plexus are named by their position around it.',
  },
  'axillary-artery-3': {
    name: 'Third part of the axillary artery',
    kind: 'artery',
    about:
      'Below pectoralis minor. Three branches: subscapular, anterior and posterior circumflex humeral.',
  },
  'brachial-artery': {
    name: 'Brachial artery',
    kind: 'artery',
    about: 'Continues the axillary artery from the lower border of teres major down the arm.',
  },
  'thoracoacromial-artery': {
    name: 'Thoracoacromial artery',
    kind: 'artery',
    about:
      'Short trunk from the second part that pierces the clavipectoral fascia and splits into pectoral, deltoid, acromial and clavicular branches (the model shows the branches).',
  },
  'lateral-thoracic-artery': {
    name: 'Lateral thoracic artery',
    kind: 'artery',
    about:
      'From the second part, along the lower border of pectoralis minor; helps supply the breast. The pectoral lymph nodes lie along it.',
  },
  'subscapular-artery': {
    name: 'Subscapular artery',
    kind: 'artery',
    about:
      'The largest branch, from the third part along the lower border of subscapularis. Divides into the circumflex scapular and thoracodorsal arteries.',
  },
  'circumflex-scapular-artery': {
    name: 'Circumflex scapular artery',
    kind: 'artery',
    about:
      'Winds round the lateral border of the scapula to its back and joins the scapular anastomosis.',
  },
  'thoracodorsal-artery': {
    name: 'Thoracodorsal artery',
    kind: 'artery',
    about: 'Runs with the thoracodorsal nerve to latissimus dorsi.',
  },
  'anterior-circumflex-humeral-artery': {
    name: 'Anterior circumflex humeral artery',
    kind: 'artery',
    about:
      'Small branch of the third part that winds in front of the surgical neck of the humerus.',
  },
  'posterior-circumflex-humeral-artery': {
    name: 'Posterior circumflex humeral artery',
    kind: 'artery',
    about:
      'Passes with the axillary nerve through the quadrangular space and round the surgical neck, where a fracture can injure both.',
  },
  'internal-thoracic-artery': {
    name: 'Internal thoracic artery',
    kind: 'artery',
    about:
      'From the subclavian artery, down behind the costal cartilages about a finger’s breadth from the sternum. Its perforating branches supply the medial breast; the parasternal nodes lie along it.',
  },
  'subclavian-vein': {
    name: 'Subclavian vein',
    kind: 'vein',
    about:
      'Continues the axillary vein from the outer border of the first rib and joins the internal jugular vein to form the brachiocephalic vein.',
  },
  'axillary-vein': {
    name: 'Axillary vein',
    kind: 'vein',
    about:
      'Formed at the lower border of teres major by the basilic and brachial veins. Lies medial to the artery and receives the cephalic vein.',
  },
  'cephalic-vein': {
    name: 'Cephalic vein',
    kind: 'vein',
    about:
      'Superficial vein on the lateral side of the arm. Runs in the deltopectoral groove and pierces the clavipectoral fascia to join the axillary vein.',
  },
  'basilic-vein': {
    name: 'Basilic vein',
    kind: 'vein',
    about:
      'Superficial vein on the medial side of the arm. Pierces the deep fascia and joins the brachial veins to form the axillary vein.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type ShoulderPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const SHOULDER_PART_IDS = Object.keys(PARTS) as ShoulderPartId[];

/** The parts a topic shows, in the order given. */
export function shoulderParts(ids: ShoulderPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

/** The bones around the axilla, shown by every upper limb topic for orientation. */
export const AXILLA_BONES: ShoulderPartId[] = [
  'clavicle',
  'scapula',
  'humerus',
  'first-rib',
  'upper-ribs',
];

// Lymph node groups have no meshes in BodyParts3D: they are a MedLearn schematic, each a short
// chain placed along the vessels it lies beside in the model. Not yet medically reviewed.
export const LYMPH_GROUPS = {
  // Medial wall, along the lateral thoracic artery at the lower border of pectoralis minor.
  pectoral: [
    [-124, -132, 1228],
    [-122, -124, 1244],
    [-118, -116, 1260],
  ],
  // Lateral wall, behind the distal axillary vein.
  lateral: [
    [-150, -92, 1262],
    [-146, -95, 1276],
    [-141, -98, 1290],
  ],
  // Posterior wall, along the subscapular and thoracodorsal vessels.
  subscapular: [
    [-135, -70, 1240],
    [-135, -75, 1254],
    [-136, -81, 1268],
  ],
  // Deep to pectoralis minor, below the second part of the axillary artery.
  central: [
    [-112, -96, 1296],
    [-120, -94, 1290],
    [-128, -92, 1286],
  ],
  // At the apex, beside the first part of the axillary artery and vein.
  apical: [
    [-100, -112, 1336],
    [-90, -114, 1339],
    [-80, -116, 1342],
  ],
  // In the infraclavicular fossa, on the cephalic vein.
  deltopectoral: [
    [-158, -116, 1294],
    [-150, -119, 1302],
  ],
  // From the apical nodes along the subclavian vein towards the root of the neck.
  trunk: [
    [-80, -116, 1342],
    [-60, -118, 1346],
    [-40, -118, 1350],
    [-28, -120, 1350],
  ],
  // Beside the sternum, along the internal thoracic artery.
  parasternal: [
    [-22, -190, 1215],
    [-22, -180, 1240],
    [-22, -168, 1265],
  ],
} satisfies Record<string, Point3[]>;
