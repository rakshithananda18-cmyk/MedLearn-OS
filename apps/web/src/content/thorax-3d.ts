import type { CameraStop, ModelPart } from '@medlearn/schemas';

// The thorax model shared by the thorax topics. Coordinates are the BodyParts3D frame: millimetres,
// X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const THORAX_MODEL_SRC = '/models/thorax.glb?v=1';

/** Credit for the model's bones, muscles, vessels and nerves, shown wherever the model is. */
export const THORAX_MODEL_CREDIT =
  'Bones, muscles and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Intercostal nerves and sympathetic trunks: Z-Anatomy, CC BY-SA 4.0.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'first-rib': {
    name: 'First rib',
    kind: 'bone',
    about:
      'The shortest, broadest and most curved rib, flattened from above down, with no costal groove. Its scalene tubercle takes scalenus anterior; the subclavian vein crosses in front of it and the artery and lower trunk of the brachial plexus behind.',
  },
  'second-rib': {
    name: 'Second rib',
    kind: 'bone',
    about:
      'About twice the length of the first, sharply curved, with a rough tubercle near the middle of its outer surface for serratus anterior. Its cartilage meets the sternum at the sternal angle, where counting ribs starts.',
  },
  'typical-ribs': {
    name: 'Ribs 3 to 9',
    kind: 'bone',
    about:
      'The typical ribs: a head with two facets and a crest, a neck, a tubercle, and a shaft bent at the angle with a costal groove under its lower border for the intercostal vein, artery and nerve.',
  },
  'tenth-rib': {
    name: 'Tenth rib',
    kind: 'bone',
    about:
      'Like a typical rib but shorter, with one facet on its head for its own vertebra. It is the lowest point of the costal margin, at the level of the third lumbar vertebra.',
  },
  'eleventh-rib': {
    name: 'Eleventh rib',
    kind: 'bone',
    about:
      'A floating rib: short, with a pointed free end, no neck or tubercle, and only a faint angle and costal groove.',
  },
  'twelfth-rib': {
    name: 'Twelfth rib',
    kind: 'bone',
    about:
      'The shortest floating rib, with no angle or costal groove. Quadratus lumborum inserts on it and the diaphragm takes origin from its front end; the pleura dips below its medial part.',
  },
  'costal-cartilages': {
    name: 'Costal cartilages',
    kind: 'bone',
    about:
      'Hyaline cartilage continuing the ribs forwards, which keeps the chest wall elastic. Cartilages 1 to 7 reach the sternum; 8 to 10 join the cartilage above and form the costal margin; 11 and 12 end free.',
  },
  manubrium: {
    name: 'Manubrium of sternum',
    kind: 'bone',
    about:
      'The thickest part of the sternum, with the suprasternal notch above and a clavicular notch on each side. Its joint with the body forms the sternal angle, level with the second costal cartilage and the T4–T5 disc.',
  },
  'body-of-sternum': {
    name: 'Body of sternum',
    kind: 'bone',
    about:
      'Four fused sternebrae, widest near the fifth costal cartilage. Its sides take the lower part of the second cartilage, cartilages 3 to 6 and the upper half of the seventh, all at synovial joints.',
  },
  'xiphoid-process': {
    name: 'Xiphoid process',
    kind: 'bone',
    about:
      'The small tip of the sternum, cartilage at first and bone by middle age. It lies in the floor of the epigastric fossa, gives origin to the diaphragm behind and takes the linea alba below.',
  },
  'thoracic-vertebrae': {
    name: 'Thoracic vertebrae',
    kind: 'bone',
    about:
      'Twelve vertebrae known by the costal facets for the ribs on their bodies and transverse processes. A typical one has a heart-shaped body, a small round vertebral foramen and a long spine pointing down.',
  },
  'thoracic-discs': {
    name: 'Thoracic intervertebral discs',
    kind: 'bone',
    about:
      'Fibrocartilage discs between the vertebral bodies: a soft nucleus pulposus held in rings of annulus fibrosus. In the thorax they are thin and of even thickness, and the head of a typical rib rests on the disc above its own vertebra.',
  },
  clavicles: {
    name: 'Clavicles',
    kind: 'bone',
    about:
      'Each clavicle meets the clavicular notch of the manubrium and the first costal cartilage at the sternoclavicular joint, above the inlet of the thorax.',
  },
  'external-intercostal': {
    name: 'External intercostal muscles',
    kind: 'muscle',
    about:
      'The outer layer of each space, from the tubercle of the rib to the costochondral junction, then replaced by the external intercostal membrane. Fibres run downwards and forwards; they help raise the ribs in inspiration.',
  },
  'internal-intercostal': {
    name: 'Internal intercostal muscles',
    kind: 'muscle',
    about:
      'The middle layer, from the sternum to the angle of the rib, then replaced by the internal intercostal membrane. Fibres run downwards and backwards, at right angles to the external layer.',
  },
  'innermost-intercostal': {
    name: 'Innermost intercostal muscles',
    kind: 'muscle',
    about:
      'The deepest layer, in the middle of each space only. The intercostal vein, artery and nerve run between it and the internal intercostal.',
  },
  'transversus-thoracis': {
    name: 'Transversus thoracis (sternocostalis)',
    kind: 'muscle',
    about:
      'Slips from the back of the lower sternum and xiphoid to cartilages 2 to 6. It separates the internal thoracic vessels from the pleura below the third cartilage.',
  },
  diaphragm: {
    name: 'Diaphragm',
    kind: 'muscle',
    about:
      'The dome closing the outlet of the thorax. Contracting, it descends about 2 cm and enlarges the thorax vertically: the piston movement of quiet breathing. Main openings at T8 (vena cava), T10 (oesophagus) and T12 (aorta).',
  },
  'ascending-aorta': {
    name: 'Ascending aorta',
    kind: 'artery',
    about:
      'Leaves the left ventricle and ends at the level of the sternal angle, where the arch begins.',
  },
  'arch-of-aorta': {
    name: 'Arch of aorta',
    kind: 'artery',
    about:
      'Begins and ends at the level of the sternal angle, arching behind the lower half of the manubrium.',
  },
  'descending-aorta': {
    name: 'Descending thoracic aorta',
    kind: 'artery',
    about:
      'Continues from the arch at the sternal angle, down the left side of the vertebrae, leaving through the aortic opening at T12. It gives the posterior intercostal arteries of spaces 3 to 11.',
  },
  'posterior-intercostal-arteries': {
    name: 'Posterior intercostal arteries',
    kind: 'artery',
    about:
      'One in each space, supplying most of it. The first two come from the superior intercostal artery; the others from the descending aorta, those on the right longer as the aorta lies left. Each ends at the costochondral junction.',
  },
  'internal-thoracic-artery': {
    name: 'Internal thoracic artery',
    kind: 'artery',
    about:
      'From the first part of the subclavian artery, it runs down about 2 cm from the edge of the sternum and divides in the sixth space into the superior epigastric and musculophrenic arteries. Used for coronary bypass grafts.',
  },
  'subcostal-arteries': {
    name: 'Subcostal arteries',
    kind: 'artery',
    about: 'The last branches of the descending aorta to the wall, running below the twelfth rib.',
  },
  'superior-vena-cava': {
    name: 'Superior vena cava',
    kind: 'vein',
    about:
      'Formed by the two brachiocephalic veins; the azygos vein arches over the root of the right lung to join its back before it enters the pericardium.',
  },
  'brachiocephalic-veins': {
    name: 'Brachiocephalic veins',
    kind: 'vein',
    about:
      'Formed behind each sternoclavicular joint; they receive the first posterior intercostal veins and the internal thoracic veins, and join to form the superior vena cava.',
  },
  'azygos-vein': {
    name: 'Azygos vein',
    kind: 'vein',
    about:
      'Unpaired vein on the right of the vertebral bodies. It enters through the aortic opening, rises to T4, arches over the root of the right lung and joins the superior vena cava, draining most right intercostal spaces.',
  },
  'hemiazygos-vein': {
    name: 'Hemiazygos vein',
    kind: 'vein',
    about:
      'Left counterpart of the lower azygos: it drains left spaces 9 to 11 and crosses behind the aorta, oesophagus and thoracic duct at T8 to join the azygos.',
  },
  'accessory-hemiazygos-vein': {
    name: 'Accessory hemiazygos vein',
    kind: 'vein',
    about:
      'Left counterpart of the upper azygos: it drains left spaces 5 to 8 and crosses at T8 to join the azygos.',
  },
  'internal-thoracic-vein': {
    name: 'Internal thoracic vein',
    kind: 'vein',
    about:
      'Formed by the venae comitantes of the internal thoracic artery; it runs up beside the artery to end in the brachiocephalic vein.',
  },
  'anterior-intercostal-veins': {
    name: 'Anterior intercostal veins',
    kind: 'vein',
    about:
      'Two in each of the upper nine spaces, draining forwards into the internal thoracic and musculophrenic veins.',
  },
  'subcostal-veins': {
    name: 'Subcostal veins',
    kind: 'vein',
    about:
      'Below the twelfth rib; on each side they help form the azygos or hemiazygos vein with the ascending lumbar vein.',
  },
  'intercostal-nerves': {
    name: 'Intercostal nerves',
    kind: 'nerve',
    about:
      'Ventral rami of T1 to T11, each running in the costal groove below its vein and artery (VAN), between the internal and innermost intercostals. Nerves 3 to 6 stay in the chest wall; 7 to 11 go on to the abdominal wall.',
  },
  'sympathetic-trunks': {
    name: 'Thoracic sympathetic trunks',
    kind: 'nerve',
    about:
      'A chain of ganglia on each side, over the heads of the ribs. Each ganglion joins its intercostal nerve by white and grey rami; the lower ganglia give the greater, lesser and least splanchnic nerves to the abdomen.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type ThoraxPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const THORAX_PART_IDS = Object.keys(PARTS) as ThoraxPartId[];

/** The parts a topic shows, in the order given. */
export function thoraxParts(ids: ThoraxPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

/** The thoracic cage: every thorax topic shows it for orientation. */
export const CAGE_BONES: ThoraxPartId[] = [
  'first-rib',
  'second-rib',
  'typical-ribs',
  'tenth-rib',
  'eleventh-rib',
  'twelfth-rib',
  'costal-cartilages',
  'manubrium',
  'body-of-sternum',
  'xiphoid-process',
  'thoracic-vertebrae',
];

/** The cage seen whole from the front, the first guided view of most thorax topics. */
export const FRONT_OF_CAGE: CameraStop = {
  id: 'front',
  title: 'The cage from the front',
  description:
    'Twelve pairs of ribs, the sternum in front and the thoracic vertebrae behind make an elastic cage, narrow at the top and wide at the bottom.',
  target: [0, -110, 1190],
  position: [0, -1104, 1297],
};
