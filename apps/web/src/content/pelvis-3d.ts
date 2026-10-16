import type { CameraStop, ModelPart, ModelTrace, Point3 } from '@medlearn/schemas';

// The pelvis and perineum, shared by the pelvis and perineum topics. Coordinates are the
// BodyParts3D frame: millimetres, X towards the right side (negative), Y towards the back
// (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const PELVIS_MODEL_SRC = '/models/pelvis.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const PELVIS_MODEL_CREDIT =
  'Bones, pelvic floor, sphincter, organs and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Pelvic ligaments, pubic symphysis, ductus deferens and pudendal nerves: Z-Anatomy, CC BY-SA 4.0. The body is male, and the penis is cut short below its root. Neither set has the superficial perineal muscles, the perineal membrane, the perineal body or the coccyx: these are drawn as lines.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what a
 * student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'hip-bones': {
    name: 'Hip bones',
    kind: 'bone',
    about:
      'Each the ilium, ischium and pubis fused at the acetabulum; with the sacrum they ring the pelvis. The ischiopubic rami form the sides of the pubic arch.',
  },
  sacrum: {
    name: 'Sacrum',
    kind: 'bone',
    about:
      'The back wall of the pelvis. Its promontory marks the back of the pelvic inlet; the coccyx below it (not modelled) marks the back of the outlet.',
  },
  'lumbar-spine': {
    name: 'Lower lumbar vertebrae',
    kind: 'bone',
    about: 'L5 sits on the sacrum at the lumbosacral joint, above the promontory.',
  },
  femurs: {
    name: 'Upper femurs',
    kind: 'bone',
    about: 'The perineum lies between the upper thighs.',
  },
  'pubic-symphysis': {
    name: 'Pubic symphysis',
    kind: 'cartilage',
    about:
      'The two pubic bones joined by a fibrocartilage disc; its lower edge, rounded off by the inferior (arcuate) pubic ligament, is the front of the pelvic outlet.',
  },
  'sacrotuberous-ligaments': {
    name: 'Sacrotuberous ligaments',
    kind: 'ligament',
    about:
      'From the sacrum and coccyx to the ischial tuberosity: the back of the outlet’s sides; gluteus maximus arises from it.',
  },
  'sacrospinous-ligaments': {
    name: 'Sacrospinous ligaments',
    kind: 'ligament',
    about:
      'From the sacrum and coccyx to the ischial spine; with the sacrotuberous it turns the sciatic notches into the greater and lesser sciatic foramina.',
  },
  'obturator-membranes': {
    name: 'Obturator membranes',
    kind: 'membrane',
    about:
      'Close most of the obturator foramen, leaving the obturator canal above for the obturator nerve and vessels.',
  },
  'obturator-internus': {
    name: 'Obturator internus',
    kind: 'muscle',
    about:
      'Lines the side wall of the pelvis and leaves through the lesser sciatic foramen. Below the levator ani its fascia is the lateral wall of the ischioanal fossa, and splits round the pudendal canal.',
  },
  piriformis: {
    name: 'Piriformis',
    kind: 'muscle',
    about:
      'From the front of the sacrum out through the greater sciatic foramen; the sacral plexus lies on it, and the pudendal nerve leaves below it.',
  },
  'gluteus-maximus': {
    name: 'Gluteus maximus',
    kind: 'muscle',
    about:
      'Its lower border, with the sacrotuberous ligament, is the back of the ischioanal fossa.',
  },
  'levator-ani': {
    name: 'Levator ani',
    kind: 'muscle',
    about:
      'Pubococcygeus, puborectalis and iliococcygeus: the hammock of the pelvic floor, from the back of the pubis, the tendinous arch on obturator fascia and the ischial spine, to the perineal body, anococcygeal ligament and coccyx. The roof of the ischioanal fossa slopes down along it.',
  },
  coccygeus: {
    name: 'Coccygeus',
    kind: 'muscle',
    about:
      'From the ischial spine to the side of the coccyx and lower sacrum, on the sacrospinous ligament: the back of the pelvic diaphragm.',
  },
  'external-anal-sphincter': {
    name: 'External anal sphincter',
    kind: 'muscle',
    about:
      'Voluntary muscle round the whole anal canal, supplied by the inferior rectal nerve and the perineal branch of S4; its fibres join the perineal body in front.',
  },
  rectum: {
    name: 'Rectum and anal canal',
    kind: 'organ',
    about:
      'Close to the sacrum and coccyx at the back of the pelvis; the anal canal ends at the anus in the middle of the anal triangle.',
  },
  'urinary-bladder': {
    name: 'Urinary bladder',
    kind: 'organ',
    about:
      'Behind the pubic symphysis at the front of the pelvis; the prostate lies below its neck.',
  },
  ureters: {
    name: 'Ureters (pelvic part)',
    kind: 'organ',
    about:
      'Cross the pelvic brim over the end of the common iliac artery, then run down the side wall and forwards to the bladder.',
  },
  prostate: {
    name: 'Prostate',
    kind: 'organ',
    about:
      'Below the bladder neck, round the first part of the urethra, on the levator ani; its apex rests on the deep perineal space.',
  },
  'seminal-vesicles': {
    name: 'Seminal vesicles',
    kind: 'organ',
    about: 'Behind the bladder, in the genital septum between bladder and rectum.',
  },
  'ductus-deferens': {
    name: 'Ductus deferens',
    kind: 'organ',
    about:
      'From the deep inguinal ring over the pelvic brim, round the side wall and behind the bladder to the seminal vesicle.',
  },
  urethra: {
    name: 'Urethra',
    kind: 'organ',
    about:
      'Through the prostate, then its membranous part, the narrowest and least stretchy, through the deep perineal space and perineal membrane into the bulb of the penis.',
  },
  'corpora-cavernosa': {
    name: 'Corpora cavernosa (crura)',
    kind: 'organ',
    about:
      'Each crus is fixed to an ischiopubic ramus and the perineal membrane and covered by ischiocavernosus; the two join to form the body of the penis.',
  },
  'corpus-spongiosum': {
    name: 'Corpus spongiosum (bulb)',
    kind: 'organ',
    about:
      'Its bulb lies on the perineal membrane in the midline, covered by bulbospongiosus; the urethra enters it from above.',
  },
  'iliac-arteries': {
    name: 'Iliac arteries',
    kind: 'artery',
    about:
      'The common iliac divides at the sacroiliac joint; the internal iliac goes into the pelvis, and its anterior division gives the internal pudendal artery.',
  },
  'iliac-veins': {
    name: 'Iliac veins',
    kind: 'vein',
    about:
      'Behind and medial to the arteries; the internal iliac vein takes the internal pudendal vein.',
  },
  'internal-pudendal-vessels': {
    name: 'Internal pudendal vessels',
    kind: 'vein',
    about:
      'The internal pudendal vein, which runs with the artery: out below piriformis, round the ischial spine, in through the lesser sciatic foramen and forward in the pudendal canal (the artery is not modelled).',
  },
  'dorsal-arteries': {
    name: 'Dorsal arteries of the penis',
    kind: 'artery',
    about:
      'The end of the artery of the penis, the continuation of the internal pudendal artery: through the gap below the pubic symphysis onto the back of the penis.',
  },
  'pudendal-nerves': {
    name: 'Pudendal nerves (S2 to S4)',
    kind: 'nerve',
    about:
      'From the sacral plexus out below piriformis, across the sacrospinous ligament beside the ischial spine, in through the lesser sciatic foramen to the pudendal canal; the nerve of the perineum.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type PelvisPartId = keyof typeof PARTS;

const solid = (colour: string) => ({ colour: `--color-viscus-${colour}`, opacity: 1 });
const LOOK: Partial<Record<PelvisPartId, Pick<ModelPart, 'colour' | 'opacity'>>> = {
  rectum: solid('colon'),
  'urinary-bladder': solid('bladder'),
  ureters: solid('ureter'),
  prostate: solid('pancreas'),
  'seminal-vesicles': solid('suprarenal'),
  'ductus-deferens': solid('ureter'),
  urethra: solid('gallbladder'),
  'corpora-cavernosa': solid('stomach'),
  'corpus-spongiosum': solid('small-bowel'),
};

/**
 * The model's parts with these ids, in this order; those in `faint` see-through, so what lies
 * behind them shows.
 */
export function pelvisParts(ids: PelvisPartId[], faint: PelvisPartId[] = []): ModelPart[] {
  return ids.map((id) => ({
    id,
    ...PARTS[id],
    ...LOOK[id],
    ...(faint.includes(id) && { opacity: 0.3 }),
  }));
}

/** The bony pelvis with its joints and ligaments. */
export const PELVIS_SKELETON: PelvisPartId[] = [
  'hip-bones',
  'sacrum',
  'lumbar-spine',
  'pubic-symphysis',
  'sacrotuberous-ligaments',
  'sacrospinous-ligaments',
];

/** The pelvic floor and the muscles round the outlet. */
export const PELVIC_FLOOR: PelvisPartId[] = [
  'obturator-internus',
  'levator-ani',
  'coccygeus',
  'external-anal-sphincter',
];

const mirror = (points: readonly (readonly [number, number, number])[]): Point3[] =>
  points.map(([x, y, z]) => [-x, y, z]);
const both = (right: readonly (readonly [number, number, number])[]): Point3[][] => [
  right.map(([x, y, z]) => [x, y, z]),
  mirror(right),
];

/** The pelvic brim: promontory, ala, arcuate line, pecten and crest of the pubis, symphysis. */
const BRIM_RIGHT = [
  [0, -80, 903],
  [-30, -63, 899],
  [-52, -52, 885],
  [-60, -72, 866],
  [-60, -100, 846],
  [-42, -124, 820],
  [-20, -131, 806],
  [0, -128, 801],
] as const;

/** The pelvic outlet: arcuate pubic ligament, ischiopubic ramus, tuberosity, sacrotuberous
 * ligament, coccyx (approximate, the coccyx is not modelled). */
const OUTLET_RIGHT = [
  [0, -104, 776],
  [-22, -86, 768],
  [-42, -61, 758],
  [-52, -42, 755],
  [-47, -20, 763],
  [-26, -10, 784],
  [0, -14, 778],
] as const;

/** The perineal membrane: a triangle across the front of the outlet, its back edge at the
 * perineal body. */
const PERINEAL_MEMBRANE: Point3[] = [
  [0, -104, 775],
  [-22, -86, 767],
  [-42, -61, 757],
  [0, -63, 754],
  [42, -61, 757],
  [22, -86, 767],
  [0, -104, 775],
];

/** The perineal body, in the midline between the bulb and the anal canal. */
const PERINEAL_BODY: Point3[] = [
  [0, -52, 753],
  [5, -56, 753],
  [0, -60, 753],
  [-5, -56, 753],
  [0, -52, 753],
];

export const TRACES = {
  pelvicInlet: { kind: 'outline', paths: both(BRIM_RIGHT) },
  pelvicOutlet: { kind: 'outline', paths: both(OUTLET_RIGHT) },
  perinealMembrane: { kind: 'outline', paths: [PERINEAL_MEMBRANE] },
  perinealBody: { kind: 'outline', paths: [PERINEAL_BODY] },
  /** Ischiocavernosus along each crus, from the ischial ramus forwards. */
  ischiocavernosus: {
    kind: 'outline',
    paths: both([
      [-40, -63, 757],
      [-31, -80, 762],
      [-21, -97, 770],
    ]),
  },
  /** Bulbospongiosus round each side of the bulb, from the perineal body forwards. */
  bulbospongiosus: {
    kind: 'outline',
    paths: both([
      [0, -60, 750],
      [-11, -72, 747],
      [-13, -90, 751],
      [-8, -106, 760],
    ]),
  },
  /** Superficial transverse perinei, from each ischial tuberosity to the perineal body. */
  superficialTransversePerinei: {
    kind: 'outline',
    paths: both([
      [-46, -52, 757],
      [-24, -55, 754],
      [-5, -56, 753],
    ]),
  },
  /** The ischioanal fossa in a coronal section through the anal canal: apex where levator ani
   * leaves the obturator fascia, lateral wall on obturator internus and the tuberosity, medial
   * wall on levator ani and the sphincter, base at the skin. */
  ischioanalFossa: {
    kind: 'outline',
    paths: both([
      [-45, -38, 796],
      [-52, -38, 757],
      [-16, -38, 752],
      [-45, -38, 796],
    ]),
  },
} satisfies Record<string, Omit<ModelTrace, 'id'>>;

/** The perineum from below, the thighs apart. */
export const PERINEUM_BELOW: CameraStop = {
  id: 'perineum-below',
  title: 'From below',
  description:
    'The diamond of the outlet: the pubic arch in front, the ischial tuberosities at the sides, the coccyx behind. A line between the tuberosities divides it into the urogenital triangle in front and the anal triangle behind.',
  target: [0, -62, 768],
  position: [0, -95, 420],
};

/** The urogenital triangle from below and in front, closer. */
export const UROGENITAL_BELOW: CameraStop = {
  id: 'urogenital-below',
  title: 'The urogenital triangle',
  description:
    'The root of the penis on the perineal membrane: a crus on each ischiopubic ramus under ischiocavernosus, the bulb in the midline under bulbospongiosus, the superficial transverse perinei at the back.',
  target: [0, -78, 764],
  position: [0, -30, 470],
};

/** The anal triangle and ischioanal fossae from behind and below. */
export const ANAL_TRIANGLE_BEHIND: CameraStop = {
  id: 'anal-triangle-behind',
  title: 'The anal triangle',
  description:
    'The anal canal in the midline with its sphincter; an ischioanal fossa on each side, between levator ani sloping down to the sphincter and obturator internus on the side wall.',
  target: [0, -40, 775],
  position: [0, 300, 560],
};

/** The pudendal nerve and vessels from behind and the right. */
export const PUDENDAL_ROUTE: CameraStop = {
  id: 'pudendal-route',
  title: 'The pudendal route',
  description:
    'Out of the pelvis below piriformis, round the sacrospinous ligament and ischial spine, back in through the lesser sciatic foramen, and forwards on the side wall of the ischioanal fossa in the pudendal canal.',
  target: [-35, -40, 790],
  position: [-430, 260, 660],
};

/** The pelvis from the front. */
export const PELVIS_FRONT: CameraStop = {
  id: 'pelvis-front',
  title: 'The pelvis',
  description:
    'The greater pelvis between the iliac blades above the brim; the lesser pelvis below it, with the bladder in front, the rectum behind and the genital organs between.',
  target: [0, -80, 850],
  position: [0, -780, 900],
};

/** The pelvic inlet from above and in front. */
export const PELVIC_INLET_ABOVE: CameraStop = {
  id: 'pelvic-inlet-above',
  title: 'The pelvic inlet',
  description:
    'The brim from the promontory along the sacral ala, arcuate line, pecten and crest of the pubis to the top of the symphysis; the ureters, iliac vessels and ductus deferens cross it.',
  target: [0, -90, 860],
  position: [0, -480, 1230],
};
