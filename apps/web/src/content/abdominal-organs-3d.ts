import type { CameraStop, ModelPart } from '@medlearn/schemas';

// The abdominal viscera in place, with their peritoneal folds and the great vessels of the gut,
// shared by the peritoneum and gut topics. Coordinates are the BodyParts3D frame: millimetres,
// X towards the right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const ABDOMINAL_ORGANS_MODEL_SRC = '/models/abdominal-organs.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const ABDOMINAL_ORGANS_MODEL_CREDIT =
  'Organs, vessels, mesentery and bones: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Liver, greater and lesser omentum, transverse mesocolon and sigmoid colon: Z-Anatomy, CC BY-SA 4.0. The parietal peritoneum and the small folds and recesses are not modelled.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what a
 * student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'lumbar-spine': {
    name: 'Lumbar vertebrae',
    kind: 'bone',
    about:
      'The posterior abdominal wall’s spine: L1 at the transpyloric plane, L3 behind the umbilicus.',
  },
  sacrum: {
    name: 'Sacrum',
    kind: 'bone',
    about: 'The back of the pelvis; the sigmoid mesocolon’s root ends in front of its third piece.',
  },
  'hip-bones': {
    name: 'Hip bones',
    kind: 'bone',
    about: 'The iliac fossae hold the caecum on the right and the sigmoid colon on the left.',
  },
  'lower-ribs': {
    name: 'Seventh to twelfth ribs',
    kind: 'bone',
    about: 'The lower ribs shelter the liver, spleen, stomach and the upper poles of the kidneys.',
  },
  'costal-cartilages': {
    name: 'Costal cartilages',
    kind: 'bone',
    about: 'The costal margin, under which the liver and stomach lie.',
  },
  diaphragm: {
    name: 'Diaphragm',
    kind: 'muscle',
    about:
      'The roof of the abdominal cavity. Its undersurface is lined by parietal peritoneum; between it and the liver lie the subphrenic spaces.',
  },
  liver: {
    name: 'Liver',
    kind: 'organ',
    about:
      'Fills the right hypochondrium. Its peritoneal reflections, the falciform, coronary and triangular ligaments and the lesser omentum, come from the ventral mesogastrium; its bare area has no peritoneum.',
  },
  gallbladder: {
    name: 'Gallbladder',
    kind: 'organ',
    about:
      'Under the right lobe of the liver, its fundus at the tip of the ninth costal cartilage.',
  },
  stomach: {
    name: 'Stomach',
    kind: 'organ',
    about:
      'Intraperitoneal: the lesser omentum hangs from its lesser curvature, the greater omentum from its greater curvature.',
  },
  spleen: {
    name: 'Spleen',
    kind: 'organ',
    about:
      'In the left hypochondrium, held by the gastrosplenic and lienorenal ligaments, both from the dorsal mesogastrium.',
  },
  pancreas: {
    name: 'Pancreas',
    kind: 'organ',
    about:
      'Retroperitoneal across the posterior wall; the transverse mesocolon is attached along its head and the anterior border of its body.',
  },
  duodenum: {
    name: 'Duodenum',
    kind: 'organ',
    about:
      'Retroperitoneal except its first 2.5 cm, which the hepatoduodenal ligament (lesser omentum) reaches; the root of the mesentery crosses its third part.',
  },
  jejunum: {
    name: 'Jejunum',
    kind: 'organ',
    about:
      'Intraperitoneal coils in the upper left of the infracolic compartment, on the mesentery.',
  },
  ileum: {
    name: 'Ileum',
    kind: 'organ',
    about:
      'Intraperitoneal coils lower and to the right, ending at the caecum; also on the mesentery.',
  },
  'ascending-colon': {
    name: 'Caecum and ascending colon',
    kind: 'organ',
    about:
      'Covered by peritoneum in front and at the sides only: its mesentery is lost in development. The right paracolic gutter runs along its lateral side.',
  },
  appendix: {
    name: 'Vermiform appendix',
    kind: 'organ',
    about: 'Hung by the mesoappendix from the back of the lower end of the mesentery.',
  },
  'transverse-colon': {
    name: 'Transverse colon',
    kind: 'organ',
    about:
      'Intraperitoneal, hung on the transverse mesocolon, which divides the greater sac into supracolic and infracolic compartments.',
  },
  'descending-colon': {
    name: 'Descending colon',
    kind: 'organ',
    about:
      'Partly covered by peritoneum, its mesentery lost; the left paracolic gutter runs along its lateral side down into the pelvis.',
  },
  'sigmoid-colon': {
    name: 'Sigmoid colon',
    kind: 'organ',
    about:
      'Intraperitoneal on the sigmoid mesocolon, whose root is an inverted V over the left common iliac artery and the left ureter.',
  },
  rectum: {
    name: 'Rectum',
    kind: 'organ',
    about:
      'Peritoneum covers its upper parts in front and at the sides; below, it turns forward onto the bladder or uterus, making the deepest pouch of the cavity.',
  },
  kidneys: {
    name: 'Kidneys',
    kind: 'organ',
    about:
      'Retroperitoneal on the posterior wall; the hepatorenal pouch lies in front of the upper part of the right one.',
  },
  'suprarenal-glands': {
    name: 'Suprarenal glands',
    kind: 'organ',
    about:
      'Retroperitoneal on the upper poles of the kidneys; the right lies behind the epiploic foramen.',
  },
  ureters: {
    name: 'Ureters',
    kind: 'organ',
    about:
      'Retroperitoneal; the root of the mesentery crosses the right, the sigmoid mesocolon the left.',
  },
  'urinary-bladder': {
    name: 'Urinary bladder',
    kind: 'organ',
    about:
      'Subperitoneal: peritoneum covers only its upper surface, then passes back onto the rectum (rectovesical pouch).',
  },
  'greater-omentum': {
    name: 'Greater omentum',
    kind: 'membrane',
    about:
      'An apron of four fused layers from the greater curvature of the stomach, folded back up to the transverse colon and pancreas. Fat, macrophages (milky spots) and a habit of sealing off infection: the policeman of the abdomen.',
  },
  'lesser-omentum': {
    name: 'Lesser omentum',
    kind: 'membrane',
    about:
      'From the lesser curvature and the first 2 cm of the duodenum to the liver (fissure for the ligamentum venosum and porta hepatis). Its free right margin holds the portal vein, hepatic artery and bile duct, in front of the epiploic foramen.',
  },
  'transverse-mesocolon': {
    name: 'Transverse mesocolon',
    kind: 'membrane',
    about:
      'Suspends the transverse colon from the head and anterior border of the body of the pancreas; it carries the middle colic vessels.',
  },
  mesentery: {
    name: 'Mesentery of the small intestine',
    kind: 'membrane',
    about:
      'A fan with a 15 cm root, from the duodenojejunal flexure left of L2 to the right sacroiliac joint, and a 6 m pleated border on the jejunum and ileum.',
  },
  mesoappendix: {
    name: 'Mesoappendix',
    kind: 'membrane',
    about:
      'A small triangle from the back of the lower end of the mesentery, carrying the appendicular artery.',
  },
  'abdominal-aorta': {
    name: 'Abdominal aorta',
    kind: 'artery',
    about:
      'Retroperitoneal; its three ventral branches supply the three parts of the gut: coeliac trunk (foregut), superior mesenteric (midgut), inferior mesenteric (hindgut).',
  },
  'inferior-vena-cava': {
    name: 'Inferior vena cava',
    kind: 'vein',
    about:
      'Retroperitoneal, to the right of the aorta; it forms the back wall of the epiploic foramen.',
  },
  'coeliac-trunk': {
    name: 'Coeliac trunk',
    kind: 'artery',
    about:
      'The artery of the foregut, at the transpyloric plane: left gastric, common hepatic and splenic.',
  },
  'splenic-artery': {
    name: 'Splenic artery',
    kind: 'artery',
    about: 'Along the upper border of the pancreas to the spleen through the lienorenal ligament.',
  },
  'superior-mesenteric-artery': {
    name: 'Superior mesenteric artery',
    kind: 'artery',
    about: 'The artery of the midgut, running down in the root of the mesentery.',
  },
  'inferior-mesenteric-artery': {
    name: 'Inferior mesenteric artery',
    kind: 'artery',
    about: 'The artery of the hindgut, behind the peritoneum of the left infracolic compartment.',
  },
  'portal-vein': {
    name: 'Portal vein',
    kind: 'vein',
    about: 'In the free margin of the lesser omentum, behind the bile duct and hepatic artery.',
  },
  'splenic-vein': {
    name: 'Splenic vein',
    kind: 'vein',
    about: 'Behind the pancreas, joining the superior mesenteric vein to form the portal vein.',
  },
  'superior-mesenteric-vein': {
    name: 'Superior mesenteric vein',
    kind: 'vein',
    about: 'To the right of its artery in the root of the mesentery.',
  },
  'inferior-mesenteric-vein': {
    name: 'Inferior mesenteric vein',
    kind: 'vein',
    about: 'Up behind the peritoneum; it lies in the fold beside the paraduodenal recess.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type AbdominalOrgansPartId = keyof typeof PARTS;

// The viscera are all of kind organ: each gets its own colour, solid, so they read apart; the
// peritoneal folds a see-through fatty yellow. The X-ray tool still sees through all of them.
const solid = (colour: string) => ({ colour: `--color-viscus-${colour}`, opacity: 1 });
const fold = (opacity: number) => ({ colour: '--color-viscus-omentum', opacity });
const LOOK: Partial<Record<AbdominalOrgansPartId, Pick<ModelPart, 'colour' | 'opacity'>>> = {
  liver: solid('liver'),
  gallbladder: solid('gallbladder'),
  stomach: solid('stomach'),
  spleen: solid('spleen'),
  pancreas: solid('pancreas'),
  duodenum: solid('small-bowel'),
  jejunum: solid('small-bowel'),
  ileum: solid('small-bowel'),
  'ascending-colon': solid('colon'),
  appendix: solid('colon'),
  'transverse-colon': solid('colon'),
  'descending-colon': solid('colon'),
  'sigmoid-colon': solid('colon'),
  rectum: solid('colon'),
  kidneys: solid('kidney'),
  'suprarenal-glands': solid('suprarenal'),
  ureters: solid('ureter'),
  'urinary-bladder': solid('bladder'),
  'greater-omentum': fold(0.45),
  'lesser-omentum': fold(0.5),
  'transverse-mesocolon': fold(0.5),
  mesentery: fold(0.4),
  mesoappendix: fold(0.5),
};

/** The model's parts with these ids, in this order. */
export function abdominalOrgansParts(ids: AbdominalOrgansPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id], ...LOOK[id] }));
}

export const ORGANS_SKELETON: AbdominalOrgansPartId[] = [
  'lumbar-spine',
  'sacrum',
  'hip-bones',
  'lower-ribs',
  'costal-cartilages',
];

export const VISCERA: AbdominalOrgansPartId[] = [
  'liver',
  'gallbladder',
  'stomach',
  'spleen',
  'pancreas',
  'duodenum',
  'jejunum',
  'ileum',
  'ascending-colon',
  'appendix',
  'transverse-colon',
  'descending-colon',
  'sigmoid-colon',
  'rectum',
  'kidneys',
  'suprarenal-glands',
  'ureters',
  'urinary-bladder',
];

export const PERITONEAL_FOLDS: AbdominalOrgansPartId[] = [
  'greater-omentum',
  'lesser-omentum',
  'transverse-mesocolon',
  'mesentery',
  'mesoappendix',
];

export const GUT_VESSELS: AbdominalOrgansPartId[] = [
  'abdominal-aorta',
  'inferior-vena-cava',
  'coeliac-trunk',
  'splenic-artery',
  'superior-mesenteric-artery',
  'inferior-mesenteric-artery',
  'portal-vein',
  'splenic-vein',
  'superior-mesenteric-vein',
  'inferior-mesenteric-vein',
];

/** The viscera from the front. */
export const ORGANS_FRONT: CameraStop = {
  id: 'organs-front',
  title: 'The abdomen opened from the front',
  description:
    'The liver and stomach above, the greater omentum hanging from the stomach over the coils of intestine, the colon framing them.',
  target: [0, -140, 975],
  position: [0, -1150, 1010],
};

/** The upper abdomen from below and to the right: the lesser omentum and its free margin. */
export const LESSER_OMENTUM_VIEW: CameraStop = {
  id: 'lesser-omentum',
  title: 'The lesser omentum',
  description:
    'Lift the liver in the mind’s eye: the lesser omentum runs from the lesser curvature up to the liver, its free right margin holding the portal vein, with the epiploic foramen behind it.',
  target: [-15, -135, 1080],
  position: [-170, -470, 690],
};

/** From the left side, to see front-to-back layering. */
export const ORGANS_SIDE: CameraStop = {
  id: 'organs-side',
  title: 'From the side',
  description:
    'Front to back: the greater omentum and intestines, then the mesentery and the retroperitoneal kidneys, aorta and inferior vena cava on the posterior wall.',
  target: [0, -110, 960],
  position: [950, -110, 980],
};

/** The posterior abdominal wall and the root of the mesentery. */
export const MESENTERY_VIEW: CameraStop = {
  id: 'mesentery-root',
  title: 'The root of the mesentery',
  description:
    'From the duodenojejunal flexure, left of L2, down and to the right to the right sacroiliac joint, crossing the duodenum, aorta, inferior vena cava, right ureter and psoas.',
  target: [0, -130, 930],
  position: [180, -820, 1150],
};

/** The pelvis from the side: the pouches behind and in front of the rectum. */
export const PELVIC_POUCHES: CameraStop = {
  id: 'pelvic-pouches',
  title: 'The pelvis from the side',
  description:
    'The rectum against the sacrum and the bladder behind the pubis: the peritoneum dips between them as the rectovesical pouch, the lowest part of the cavity in a man sitting up.',
  target: [0, -70, 815],
  position: [-650, -90, 860],
};
