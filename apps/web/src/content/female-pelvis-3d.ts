import type { CameraStop, ModelPart, ModelTrace, Point3 } from '@medlearn/schemas';

// The female pelvis, shared by the female pelvis topics. Stanford's model, fitted on the BodyParts3D
// frame (scripts/models/build-models.mjs): millimetres, X towards the right side (negative), Y
// towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const FEMALE_PELVIS_MODEL_SRC = '/models/female-pelvis.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const FEMALE_PELVIS_CREDIT =
  'Female pelvis, organs, ligaments and perineal muscles: “Female Reproductive System” by Stanford Medicine EdTech, CC BY 4.0 (sketchfab.com/3d-models/c4d5e725198d4a1997c641d548bb20ce). It has no vessels, nerves or ureters: the uterine artery, the ureter, the cardinal and uterosacral ligaments and the perineal body are drawn as lines.';

/**
 * Every mesh in the model file, by part id, with what a student sees on picking it. Facts in our
 * own words; not yet medically reviewed.
 */
const PARTS = {
  'hip-bones': {
    name: 'Hip bones',
    kind: 'bone',
    about:
      'Ilium, ischium and pubis on each side, joined in front at the pubic symphysis; the female pelvis is wider and shallower than the male, with a rounder inlet and a wider pubic arch.',
  },
  sacrum: {
    name: 'Sacrum and coccyx',
    kind: 'bone',
    about:
      'The back wall of the pelvis; the uterosacral ligaments run back from the cervix to its front, round the rectum.',
  },
  'urinary-bladder': {
    name: 'Urinary bladder',
    kind: 'organ',
    about:
      'Behind the pubic symphysis; the body of the uterus rests on its superior surface, and the cervix and vagina lie behind its base.',
  },
  rectum: {
    name: 'Rectum and anal canal',
    kind: 'organ',
    about:
      'Behind the uterus and vagina; the rectouterine pouch lies between them above, the perineal body below.',
  },
  'uterus-vagina': {
    name: 'Uterus and vagina',
    kind: 'organ',
    about:
      'The uterus, tilted forwards on the vagina and bent forwards at the cervix, between the bladder and rectum; the vagina runs up and back from the vestibule to the cervix.',
  },
  'uterus-section': {
    name: 'Uterus and vagina, cut open',
    kind: 'organ',
    about:
      'The right half of the uterus and vagina in the median plane: the triangular cavity of the body, the narrow cervical canal and the vaginal fornices round the cervix.',
  },
  ovaries: {
    name: 'Ovaries',
    kind: 'organ',
    about:
      'Each in the ovarian fossa on the side wall, below the external iliac vessels and in front of the ureter, hung from the back of the broad ligament by the mesovarium.',
  },
  'uterine-tubes': {
    name: 'Uterine tubes',
    kind: 'organ',
    about:
      'In the free upper border of the broad ligament, from the upper corner of the uterus out to the side wall, the ampulla arching over the ovary and the fimbriated infundibulum opening beside it.',
  },
  'broad-ligaments': {
    name: 'Broad ligaments',
    kind: 'membrane',
    about:
      'Double folds of peritoneum from the sides of the uterus to the side walls and floor of the pelvis, holding the tube in their upper border; they give little support.',
  },
  'round-ligaments': {
    name: 'Round ligaments of the uterus',
    kind: 'ligament',
    about:
      'From the uterus just below and in front of the tube, through the deep inguinal ring and inguinal canal to the labium majus; they pull the fundus forward.',
  },
  'tendinous-arch': {
    name: 'Tendinous arch of levator ani',
    kind: 'ligament',
    about:
      'A thickening of the obturator fascia on the side wall from the pubis to the ischial spine, from which part of levator ani arises.',
  },
  pubococcygeus: {
    name: 'Pubococcygeus',
    kind: 'muscle',
    about:
      'The front part of levator ani, from the back of the pubis and the tendinous arch: its fibres sling round the vagina into the perineal body, supporting the vagina and so the uterus.',
  },
  iliococcygeus: {
    name: 'Iliococcygeus',
    kind: 'muscle',
    about:
      'The back part of levator ani, from the tendinous arch and the ischial spine to the anococcygeal ligament and coccyx.',
  },
  puborectalis: {
    name: 'Puborectalis',
    kind: 'muscle',
    about:
      'Fibres of levator ani that loop behind the anorectal junction from the pubis, pulling it forward; thinner in front in women.',
  },
  ischiocavernosus: {
    name: 'Ischiocavernosus',
    kind: 'muscle',
    about: 'Covers each crus of the clitoris along the ischiopubic ramus.',
  },
  'deep-transverse-perinei': {
    name: 'Deep transverse perinei',
    kind: 'muscle',
    about:
      'Across the back of the deep perineal space, from the ischial rami to the perineal body.',
  },
  'superficial-transverse-perinei': {
    name: 'Superficial transverse perinei',
    kind: 'muscle',
    about: 'From each ischial tuberosity to the perineal body, in the superficial space.',
  },
  'clitoris-crura': {
    name: 'Crura and body of the clitoris',
    kind: 'organ',
    about:
      'Each crus fixed to an ischiopubic ramus; the two join in front as the body of the clitoris. There is no corpus spongiosum.',
  },
  'vestibular-bulbs': {
    name: 'Bulbs of the vestibule',
    kind: 'organ',
    about:
      'Erectile tissue on each side of the vaginal opening, covered by bulbospongiosus, joined in front to the glans of the clitoris.',
  },
  'greater-vestibular-glands': {
    name: 'Greater vestibular glands',
    kind: 'organ',
    about:
      'Bartholin’s glands, behind the bulbs, opening into the vestibule beside the vaginal opening; they moisten it.',
  },
  'labia-minora': {
    name: 'Labia minora and vestibule',
    kind: 'skin',
    about:
      'Thin folds bounding the vestibule, into which the urethra opens in front and the vagina behind.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type FemalePelvisPartId = keyof typeof PARTS;

const solid = (colour: string) => ({ colour: `--color-viscus-${colour}`, opacity: 1 });
const LOOK: Partial<Record<FemalePelvisPartId, Pick<ModelPart, 'colour' | 'opacity'>>> = {
  rectum: solid('colon'),
  'urinary-bladder': solid('bladder'),
  'uterus-vagina': solid('stomach'),
  'uterus-section': solid('stomach'),
  ovaries: solid('suprarenal'),
  'uterine-tubes': solid('gallbladder'),
  'clitoris-crura': solid('small-bowel'),
  'vestibular-bulbs': solid('small-bowel'),
  'greater-vestibular-glands': solid('pancreas'),
};

/**
 * The model's parts with these ids, in this order; those in `faint` see-through, so what lies
 * behind them shows.
 */
export function femalePelvisParts(
  ids: FemalePelvisPartId[],
  faint: FemalePelvisPartId[] = [],
): ModelPart[] {
  return ids.map((id) => ({
    id,
    ...PARTS[id],
    ...LOOK[id],
    ...(faint.includes(id) && { opacity: 0.3 }),
  }));
}

/** The bony pelvis. */
export const FEMALE_SKELETON: FemalePelvisPartId[] = ['hip-bones', 'sacrum'];

/** Levator ani and the arch it arises from. */
export const FEMALE_FLOOR: FemalePelvisPartId[] = [
  'tendinous-arch',
  'pubococcygeus',
  'iliococcygeus',
  'puborectalis',
];

/** The uterus with its tubes, ovaries and ligaments. */
export const FEMALE_ORGANS: FemalePelvisPartId[] = [
  'uterus-vagina',
  'ovaries',
  'uterine-tubes',
  'broad-ligaments',
  'round-ligaments',
];

const both = (right: readonly (readonly [number, number, number])[]): Point3[][] => [
  right.map(([x, y, z]) => [x, y, z]),
  right.map(([x, y, z]) => [-x, y, z]),
];

// What the model lacks, drawn as lines placed on its organs: the cervix lies at about
// [0, -78, 830], the fundus rises to Z 888 above the bladder, the side walls are at X ±55.
export const FEMALE_TRACES = {
  /** The transverse cervical (cardinal) ligament, from the cervix out to the side wall. */
  cardinalLigaments: {
    kind: 'outline',
    paths: both([
      [-14, -78, 830],
      [-35, -76, 824],
      [-55, -74, 816],
    ]),
  },
  /** The uterosacral ligament, from the cervix back beside the rectum to the sacrum. */
  uterosacralLigaments: {
    kind: 'outline',
    paths: both([
      [-12, -68, 834],
      [-27, -56, 842],
      [-30, -40, 856],
      [-24, -30, 872],
    ]),
  },
  /** The uterine artery: down the side wall, in over the ureter beside the cervix, up the uterus. */
  uterineArteries: {
    kind: 'artery',
    paths: both([
      [-55, -58, 858],
      [-42, -70, 838],
      [-28, -78, 832],
      [-17, -82, 836],
      [-22, -92, 856],
      [-26, -100, 872],
    ]),
  },
  /** The ureter: over the brim, down the side wall behind the ovary, forward under the uterine
   * artery beside the cervix, to the bladder. */
  ureters: {
    kind: 'organ',
    paths: both([
      [-46, -48, 905],
      [-54, -56, 872],
      [-50, -64, 846],
      [-38, -76, 826],
      [-22, -84, 822],
      [-12, -100, 812],
    ]),
  },
  /** The perineal membrane: a triangle across the front of the outlet, from below the pubic
   * symphysis back to the perineal body, the vagina and urethra passing through it. */
  perinealMembrane: {
    kind: 'outline',
    paths: [
      [
        [0, -130, 790],
        [-40, -100, 768],
        [0, -96, 764],
        [40, -100, 768],
        [0, -130, 790],
      ],
    ],
  },
  /** The perineal body, between the vaginal opening and the anal canal. */
  perinealBody: {
    kind: 'outline',
    paths: [
      [
        [0, -93, 762],
        [5, -97, 762],
        [0, -101, 762],
        [-5, -97, 762],
        [0, -93, 762],
      ],
    ],
  },
} satisfies Record<string, Omit<ModelTrace, 'id'>>;

/** The female organs from above and in front. */
export const FEMALE_ORGANS_ABOVE: CameraStop = {
  id: 'female-organs-above',
  title: 'From above',
  description:
    'The uterus rising above the bladder; from its upper corners the tubes run out in the broad ligaments to the side walls and arch over the ovaries; the round ligaments run forwards to the deep inguinal rings.',
  target: [0, -82, 860],
  position: [0, -190, 1180],
};

/** The female organs from the left. */
export const FEMALE_ORGANS_SIDE: CameraStop = {
  id: 'female-organs-side',
  title: 'From the left',
  description:
    'The vagina runs up and back from the vestibule, between the bladder in front and the rectum behind; the cervix enters its upper front wall and the body of the uterus leans forward over the bladder.',
  target: [0, -88, 835],
  position: [380, -100, 850],
};

/** The uterus cut open in the median plane, from the left. */
export const UTERUS_SECTION_SIDE: CameraStop = {
  id: 'uterus-section-side',
  title: 'Cut open',
  description:
    'The right half in the median plane: the slit-like cavity of the body, the internal os, the cervical canal and the external os opening into the vault, ringed by the fornices.',
  target: [0, -85, 840],
  position: [300, -110, 860],
};

/** The right ovary on the side wall, from the left and above. */
export const OVARY_WALL: CameraStop = {
  id: 'ovary-wall',
  title: 'The ovarian fossa',
  description:
    'The right ovary on the side wall near the brim, hung from the back of the broad ligament; the tube arches over it and its fimbriae open beside it.',
  target: [-70, -68, 876],
  position: [180, -260, 1050],
};

/** The vagina and vulva from the left, in front and below. */
export const VAGINA_OBLIQUE: CameraStop = {
  id: 'vagina-oblique',
  title: 'The vagina',
  description:
    'The vagina runs up and back from the vestibule, behind the bladder and in front of the rectum; at its lower end lie the bulbs of the vestibule and the greater vestibular glands, with the perineal body behind.',
  target: [0, -100, 800],
  position: [330, -330, 700],
};

/** The vulva and perineum from below, the thighs apart. */
export const FEMALE_PERINEUM_BELOW: CameraStop = {
  id: 'female-perineum-below',
  title: 'From below',
  description:
    'The vestibule between the labia minora, the urethral opening in front of the vaginal opening; the bulbs of the vestibule and the crura of the clitoris under their muscles, the greater vestibular glands behind the bulbs, and the transverse perinei running to the perineal body.',
  target: [0, -105, 775],
  position: [0, -150, 420],
};
