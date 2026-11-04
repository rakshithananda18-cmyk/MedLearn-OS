import type { CameraStop, ModelPart, ModelTrace, Point3 } from '@medlearn/schemas';

// The pelvis and perineum, shared by the pelvis and perineum topics. Coordinates are the
// BodyParts3D frame: millimetres, X towards the right side (negative), Y towards the back
// (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const PELVIS_MODEL_SRC = '/models/pelvis.glb?v=2';

/** Credit for the model, shown wherever it is. */
export const PELVIS_MODEL_CREDIT =
  'Bones, pelvic floor, sphincter, organs and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Pelvic ligaments, pubic symphysis, ductus deferens and the pudendal, sciatic, superior gluteal and obturator nerves: Z-Anatomy, CC BY-SA 4.0. The body is male, and the penis is cut short below its root. Neither set has the superficial perineal muscles, the perineal membrane, the perineal body, the coccyx, the sacral roots or the pelvic autonomic nerves: these are drawn as lines.';

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
  'sciatic-nerves': {
    name: 'Sciatic nerves (L4 to S3)',
    kind: 'nerve',
    about:
      'The largest branch of the sacral plexus: formed on the front of piriformis, it leaves the pelvis through the greater sciatic foramen below piriformis for the back of the thigh.',
  },
  'superior-gluteal-nerves': {
    name: 'Superior gluteal nerves (L4, L5, S1)',
    kind: 'nerve',
    about:
      'From the back of the sacral plexus out through the greater sciatic foramen above piriformis, with the superior gluteal vessels, to gluteus medius, minimus and tensor fasciae latae.',
  },
  'obturator-nerves': {
    name: 'Obturator nerves (L2 to L4)',
    kind: 'nerve',
    about:
      'From the lumbar plexus, down medial to psoas and along the side wall of the pelvis above the obturator vessels, out through the obturator canal to the adductors of the thigh.',
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
  /** The lumbosacral trunk (L4, L5): down over the sacral ala, in front of the sacroiliac joint,
   * to join S1. */
  lumbosacralTrunk: {
    kind: 'nerve',
    paths: both([
      [-36, -72, 960],
      [-38, -62, 935],
      [-35, -52, 915],
    ]),
  },
  /** The ventral rami of S1 to S4, each from its anterior sacral foramen out over piriformis to
   * the plexus that becomes the sciatic nerve. */
  sacralRami: {
    kind: 'nerve',
    paths: [
      ...both([
        [-22, -62, 886],
        [-34, -50, 874],
        [-40, -40, 860],
      ]),
      ...both([
        [-22, -32, 868],
        [-34, -36, 860],
        [-44, -35, 852],
      ]),
      ...both([
        [-20, -23, 852],
        [-34, -28, 848],
        [-48, -32, 844],
      ]),
      ...both([
        [-18, -21, 836],
        [-30, -24, 834],
        [-44, -29, 836],
      ]),
    ],
  },
  /** The pelvic splanchnic nerves from S2, S3 and S4 forwards to the inferior hypogastric plexus
   * beside the rectum. */
  pelvicSplanchnic: {
    kind: 'nerve',
    paths: [
      ...both([
        [-24, -30, 866],
        [-24, -40, 852],
        [-22, -45, 840],
      ]),
      ...both([
        [-22, -23, 851],
        [-23, -36, 845],
        [-22, -45, 840],
      ]),
      ...both([
        [-20, -21, 835],
        [-22, -34, 836],
        [-22, -45, 840],
      ]),
    ],
  },
  /** The hypogastric nerves: from the superior hypogastric plexus in front of L5 and the
   * promontory down beside the rectum to the inferior hypogastric plexus. */
  hypogastricNerves: {
    kind: 'nerve',
    paths: both([
      [0, -102, 940],
      [-12, -90, 905],
      [-20, -68, 875],
      [-22, -45, 840],
    ]),
  },
  /** The inferior hypogastric plexus, a sheet of nerves on each side of the rectum. */
  inferiorHypogastric: {
    kind: 'nerve',
    paths: both([
      [-22, -50, 850],
      [-24, -42, 836],
      [-22, -52, 822],
      [-24, -60, 832],
      [-22, -50, 850],
    ]),
  },
  /** The pelvic sympathetic trunks, down the front of the sacrum medial to the anterior foramina
   * with their sacral ganglia, joining in front of the coccyx at the ganglion impar. */
  sympatheticTrunk: {
    kind: 'nerve',
    paths: both([
      [-17, -82, 912],
      [-14, -76, 893],
      [-14, -52, 876],
      [-13, -27, 860],
      [-12, -22, 842],
      [-10, -20, 825],
      [-7, -16, 805],
      [0, -16, 772],
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

/** The male pelvis from the left, the hip bone see-through. */
export const MALE_PELVIS_SIDE: CameraStop = {
  id: 'male-pelvis-side',
  title: 'From the left',
  description:
    'The bladder behind the pubic symphysis, the prostate below its neck, the seminal vesicles and ductus deferens behind its base, and the rectum behind them all, curving down to the anal canal.',
  target: [0, -80, 800],
  position: [420, -90, 820],
};

/** The base of the bladder from above and behind, the rectum faint. */
export const BLADDER_BASE_BEHIND: CameraStop = {
  id: 'bladder-base-behind',
  title: 'The base from behind',
  description:
    'The ureters reach the back of the bladder; the ductus deferens cross over them and run down medial to the seminal vesicles to meet their ducts at the base of the prostate.',
  target: [0, -75, 805],
  position: [0, 0, 1200],
};

/** The prostate and urethra from the left, in front and below. */
export const PROSTATE_SIDE: CameraStop = {
  id: 'prostate-side',
  title: 'The prostate',
  description:
    'Below the neck of the bladder and on the levator ani, behind the lower pubic symphysis and in front of the rectum; the urethra runs down through it, then through the perineal membrane into the bulb.',
  target: [0, -82, 782],
  position: [300, -220, 700],
};

/** The right side wall of the pelvis from the left, the left hip bone see-through. */
export const PELVIC_WALL_MEDIAL: CameraStop = {
  id: 'pelvic-wall-medial',
  title: 'The side wall from within',
  description:
    'The internal iliac artery dividing at the greater sciatic notch: its branches run on obturator internus and piriformis, with the sacral plexus behind them on piriformis and the obturator nerve along the wall above the obturator vessels.',
  target: [-40, -55, 860],
  position: [430, -170, 910],
};

/** The front of the sacrum and the sacral plexus, from in front and above. */
export const SACRAL_PLEXUS_FRONT: CameraStop = {
  id: 'sacral-plexus-front',
  title: 'The sacral plexus',
  description:
    'The lumbosacral trunk comes down over the ala to join S1; the ventral rami of S1 to S4 leave the anterior sacral foramina and converge on piriformis into the sciatic nerve, with the sympathetic trunks medial to the foramina.',
  target: [0, -45, 865],
  position: [0, -560, 1010],
};

/** The rectum and anal canal from the left, the pelvis see-through. */
export const RECTUM_SIDE: CameraStop = {
  id: 'rectum-side',
  title: 'The rectum from the left',
  description:
    'The rectum follows the hollow of the sacrum and coccyx down to the anorectal junction, where it bends back sharply (the perineal flexure) through the levator ani into the anal canal.',
  target: [0, -40, 815],
  position: [430, -70, 830],
};

/** The pelvic floor from above, looking down into the pelvis. */
export const PELVIC_FLOOR_ABOVE: CameraStop = {
  id: 'pelvic-floor-above',
  title: 'The floor from above',
  description:
    'The levator ani and coccygeus slope down from the side walls to the midline like a gutter: from the back of the pubis, the tendinous arch on obturator internus and the ischial spine, to the perineal body, the anococcygeal ligament and the coccyx.',
  target: [0, -55, 800],
  position: [0, -300, 1260],
};

/** The sacroiliac joints and their ligaments from behind. */
export const SACROILIAC_BEHIND: CameraStop = {
  id: 'sacroiliac-behind',
  title: 'The joints from behind',
  description:
    'The sacrum wedged between the hip bones at the sacroiliac joints; below them the sacrotuberous ligaments run to the ischial tuberosities and the sacrospinous ligaments to the ischial spines, closing the sciatic notches into foramina.',
  target: [0, 0, 870],
  position: [0, 650, 960],
};
