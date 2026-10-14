import type { CameraStop, ModelPart } from '@medlearn/schemas';

// The right hip and thigh model shared by the gluteal and thigh topics. Coordinates are the
// BodyParts3D frame: millimetres, X towards the right side (negative), Y towards the back
// (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const HIP_THIGH_MODEL_SRC = '/models/hip-thigh.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const HIP_THIGH_MODEL_CREDIT =
  'Bones, muscles and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP); it has no profunda femoris, gluteal or obturator arteries, so their veins show their paths. Nerves: Z-Anatomy, CC BY-SA 4.0.';

/**
 * Every mesh in the model file (built by scripts/models/build-models.mjs), by part id, with what
 * a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const PARTS = {
  'hip-bone': {
    name: 'Hip bone',
    kind: 'bone',
    about:
      'Ilium, ischium and pubis fused at the acetabulum. Its iliac crest, spines, ischial tuberosity and pubic tubercle are the landmarks of the hip and groin.',
  },
  sacrum: {
    name: 'Sacrum',
    kind: 'bone',
    about:
      'The back of the pelvis between the hip bones; gluteus maximus and piriformis arise from it.',
  },
  femur: {
    name: 'Femur',
    kind: 'bone',
    about:
      'The thigh bone. Gluteal muscles insert on its greater trochanter, iliopsoas on the lesser trochanter, the adductors along the linea aspera at the back.',
  },
  patella: {
    name: 'Patella',
    kind: 'bone',
    about:
      'The largest sesamoid bone, in the tendon of quadriceps femoris; vastus medialis reaches lower on its medial border and holds it in place.',
  },
  tibia: {
    name: 'Tibia (upper end)',
    kind: 'bone',
    about:
      'Quadriceps acts through the ligamentum patellae on the tibial tuberosity; sartorius, gracilis and semitendinosus insert on its upper medial surface.',
  },
  fibula: {
    name: 'Fibula (upper end)',
    kind: 'bone',
    about: 'Biceps femoris inserts on its head, at the lateral side of the knee.',
  },
  'gluteus-maximus': {
    name: 'Gluteus maximus',
    kind: 'muscle',
    about:
      'The bulky antigravity muscle of the buttock: the chief extensor of the hip, used to rise from sitting and climb stairs. Inferior gluteal nerve.',
  },
  'gluteus-medius': {
    name: 'Gluteus medius',
    kind: 'muscle',
    about:
      'Fan-shaped abductor on the side of the ilium. With gluteus minimus it holds the pelvis level when the other foot is off the ground. Superior gluteal nerve.',
  },
  'gluteus-minimus': {
    name: 'Gluteus minimus',
    kind: 'muscle',
    about:
      'Deep to gluteus medius, an abductor and medial rotator of the hip. Superior gluteal nerve.',
  },
  piriformis: {
    name: 'Piriformis',
    kind: 'muscle',
    about:
      'The key muscle of the gluteal region: it fills the greater sciatic foramen, with the superior gluteal vessels and nerve above it and everything else below.',
  },
  'obturator-internus': {
    name: 'Obturator internus',
    kind: 'muscle',
    about:
      'Arises inside the pelvis and turns round the lesser sciatic notch to the greater trochanter. A lateral rotator of the hip.',
  },
  gemelli: {
    name: 'Gemelli',
    kind: 'muscle',
    about:
      'Superior and inferior gemellus, small slips along the upper and lower borders of the obturator internus tendon; lateral rotators.',
  },
  'quadratus-femoris': {
    name: 'Quadratus femoris',
    kind: 'muscle',
    about:
      'A flat lateral rotator from the ischial tuberosity to the quadrate tubercle of the femur.',
  },
  'obturator-externus': {
    name: 'Obturator externus',
    kind: 'muscle',
    about:
      'From the outer surface of the obturator membrane to the trochanteric fossa; a lateral rotator supplied by the posterior division of the obturator nerve.',
  },
  'tensor-fasciae-latae': {
    name: 'Tensor fasciae latae',
    kind: 'muscle',
    about:
      'Between the gluteal region and the front of the thigh, inserting into the iliotibial tract; it steadies the knee and helps abduct the hip. Superior gluteal nerve.',
  },
  'iliotibial-tract': {
    name: 'Iliotibial tract',
    kind: 'muscle',
    about:
      'The thickened lateral band of the fascia lata to the lateral condyle of the tibia; gluteus maximus and tensor fasciae latae insert into it and it steadies the knee.',
  },
  sartorius: {
    name: 'Sartorius',
    kind: 'muscle',
    about:
      'The longest muscle of the body, crossing the front of the thigh from the anterior superior iliac spine to the upper medial tibia. Its medial border is the lateral side of the femoral triangle.',
  },
  'rectus-femoris': {
    name: 'Rectus femoris',
    kind: 'muscle',
    about:
      'The part of quadriceps that crosses the hip, flexing it as well as extending the knee: the kicking muscle.',
  },
  'vastus-lateralis': {
    name: 'Vastus lateralis',
    kind: 'muscle',
    about:
      'The largest part of quadriceps, on the outer side of the femur; a site for intramuscular injections in children.',
  },
  'vastus-medialis': {
    name: 'Vastus medialis',
    kind: 'muscle',
    about:
      'Reaches lower on the patella than vastus lateralis and stops it slipping laterally. It forms the outer wall of the adductor canal.',
  },
  'vastus-intermedius': {
    name: 'Vastus intermedius',
    kind: 'muscle',
    about: 'The deepest part of quadriceps, on the front and side of the femoral shaft.',
  },
  iliacus: {
    name: 'Iliacus',
    kind: 'muscle',
    about:
      'From the iliac fossa to the lesser trochanter with psoas: the chief flexor of the hip. It forms part of the floor of the femoral triangle.',
  },
  'psoas-major': {
    name: 'Psoas major',
    kind: 'muscle',
    about:
      'From the lumbar vertebrae to the lesser trochanter; pus from a tuberculous spine can track down its sheath into the thigh.',
  },
  pectineus: {
    name: 'Pectineus',
    kind: 'muscle',
    about:
      'A flat muscle in the floor of the femoral triangle with a double nerve supply, femoral and obturator.',
  },
  'adductor-longus': {
    name: 'Adductor longus',
    kind: 'muscle',
    about:
      'Its medial border is the medial side of the femoral triangle; the profunda femoris vessels pass behind it.',
  },
  'adductor-brevis': {
    name: 'Adductor brevis',
    kind: 'muscle',
    about:
      'Between the two divisions of the obturator nerve: the anterior in front of it, the posterior behind.',
  },
  'adductor-magnus': {
    name: 'Adductor magnus',
    kind: 'muscle',
    about:
      'A hybrid muscle: its adductor part by the obturator nerve, its hamstring part by the sciatic. The femoral vessels pass through the opening in it to the back of the knee.',
  },
  gracilis: {
    name: 'Gracilis',
    kind: 'muscle',
    about:
      'The most medial and superficial adductor, often borrowed by surgeons to replace a damaged muscle.',
  },
  'biceps-femoris': {
    name: 'Biceps femoris',
    kind: 'muscle',
    about:
      'A hamstring with a long head from the ischial tuberosity, under gluteus maximus, and a short head from the linea aspera; it inserts on the head of the fibula.',
  },
  semitendinosus: {
    name: 'Semitendinosus',
    kind: 'muscle',
    about: 'A hamstring from the ischial tuberosity to the upper medial tibia, behind gracilis.',
  },
  semimembranosus: {
    name: 'Semimembranosus',
    kind: 'muscle',
    about: 'A hamstring from the ischial tuberosity to the back of the medial tibial condyle.',
  },
  'external-iliac-artery': {
    name: 'External iliac artery',
    kind: 'artery',
    about:
      'Becomes the femoral artery as it passes behind the inguinal ligament at the midinguinal point.',
  },
  'femoral-artery': {
    name: 'Femoral artery',
    kind: 'artery',
    about:
      'The chief artery of the lower limb, from the midinguinal point through the femoral triangle and adductor canal to the opening in adductor magnus. Its pulse is felt at the midinguinal point.',
  },
  'superficial-epigastric-artery': {
    name: 'Superficial epigastric artery',
    kind: 'artery',
    about:
      'One of the three superficial branches of the femoral artery, piercing the cribriform fascia towards the umbilicus.',
  },
  'lateral-circumflex-femoral-artery': {
    name: 'Lateral circumflex femoral artery',
    kind: 'artery',
    about:
      'From the profunda femoris, between the divisions of the femoral nerve, with ascending, transverse and descending branches round the hip and down vastus lateralis.',
  },
  'perforating-arteries': {
    name: 'Perforating arteries',
    kind: 'artery',
    about:
      'Branches of the profunda femoris that pierce the adductors to supply the back of the thigh.',
  },
  'descending-genicular-artery': {
    name: 'Descending genicular artery',
    kind: 'artery',
    about: 'The last branch of the femoral artery, in the adductor canal, to the knee.',
  },
  'popliteal-artery': {
    name: 'Popliteal artery',
    kind: 'artery',
    about:
      'The continuation of the femoral artery behind the knee, after it passes through the opening in adductor magnus.',
  },
  'external-iliac-vein': {
    name: 'External iliac vein',
    kind: 'vein',
    about: 'Continues the femoral vein into the pelvis behind the inguinal ligament.',
  },
  'femoral-vein': {
    name: 'Femoral vein',
    kind: 'vein',
    about:
      'Medial to the artery below the inguinal ligament, then behind it at the apex of the femoral triangle and lateral to it in the adductor canal. It receives the great saphenous vein.',
  },
  'deep-femoral-vein': {
    name: 'Deep femoral vein',
    kind: 'vein',
    about:
      'Runs with the profunda femoris artery, behind the femoral vessels and behind adductor longus. The model has no profunda artery: this vein shows its course.',
  },
  'great-saphenous-vein': {
    name: 'Great saphenous vein',
    kind: 'vein',
    about:
      'The longest superficial vein, up the medial side of the leg and thigh to pierce the cribriform fascia at the saphenous opening and join the femoral vein.',
  },
  'superficial-epigastric-vein': {
    name: 'Superficial epigastric vein',
    kind: 'vein',
    about:
      'A tributary of the great saphenous vein near its end, beside the artery of the same name.',
  },
  'medial-circumflex-femoral-vein': {
    name: 'Medial circumflex femoral vein',
    kind: 'vein',
    about:
      'With the medial circumflex femoral artery, which passes back between pectineus and psoas and helps supply the head of the femur.',
  },
  'lateral-circumflex-femoral-vein': {
    name: 'Lateral circumflex femoral vein',
    kind: 'vein',
    about: 'With the lateral circumflex femoral artery round the front of the hip.',
  },
  'superior-gluteal-vein': {
    name: 'Superior gluteal vein',
    kind: 'vein',
    about:
      'With the superior gluteal artery and nerve, above piriformis in the greater sciatic foramen.',
  },
  'inferior-gluteal-vein': {
    name: 'Inferior gluteal vein',
    kind: 'vein',
    about: 'With the inferior gluteal artery and nerve, below piriformis, under gluteus maximus.',
  },
  'obturator-vein': {
    name: 'Obturator vein',
    kind: 'vein',
    about: 'With the obturator artery and nerve through the obturator canal.',
  },
  'popliteal-vein': {
    name: 'Popliteal vein',
    kind: 'vein',
    about:
      'Behind the knee, continuing up as the femoral vein through the opening in adductor magnus.',
  },
  'femoral-nerve': {
    name: 'Femoral nerve',
    kind: 'nerve',
    about:
      'L2–L4 (dorsal divisions), lateral to the femoral artery outside the femoral sheath. Supplies quadriceps, sartorius and the skin of the front of the thigh.',
  },
  'saphenous-nerve': {
    name: 'Saphenous nerve',
    kind: 'nerve',
    about:
      'The longest cutaneous nerve, from the posterior division of the femoral nerve, through the adductor canal to the medial side of the leg and foot.',
  },
  'lateral-cutaneous-nerve-of-thigh': {
    name: 'Lateral cutaneous nerve of thigh',
    kind: 'nerve',
    about:
      'L2, L3, from behind the lateral end of the inguinal ligament to the outer thigh; trapped there it causes meralgia paraesthetica.',
  },
  'genitofemoral-nerve': {
    name: 'Genitofemoral nerve',
    kind: 'nerve',
    about:
      'Its femoral branch runs in the lateral compartment of the femoral sheath and supplies the skin over the femoral triangle.',
  },
  'obturator-nerve': {
    name: 'Obturator nerve',
    kind: 'nerve',
    about:
      'L2–L4 (ventral divisions), through the obturator canal; its anterior and posterior divisions supply the adductors and both the hip and the knee.',
  },
  'sciatic-nerve': {
    name: 'Sciatic nerve',
    kind: 'nerve',
    about:
      'The thickest nerve in the body, below piriformis, between the greater trochanter and ischial tuberosity; it gives no branches in the gluteal region.',
  },
  'posterior-cutaneous-nerve-of-thigh': {
    name: 'Posterior cutaneous nerve of thigh',
    kind: 'nerve',
    about:
      'S1–S3, below piriformis beside the sciatic nerve, to the skin of the back of the thigh and the lower buttock.',
  },
  'superior-gluteal-nerve': {
    name: 'Superior gluteal nerve',
    kind: 'nerve',
    about:
      'L4–S1, above piriformis, between gluteus medius and minimus; supplies both and tensor fasciae latae.',
  },
  'pudendal-nerve': {
    name: 'Pudendal nerve',
    kind: 'nerve',
    about:
      'Appears briefly below piriformis, crosses the sacrospinous ligament and leaves through the lesser sciatic foramen for the perineum.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type HipThighPartId = keyof typeof PARTS;

/** Every part id, for checking the catalogue against the model build. */
export const HIP_THIGH_PART_IDS = Object.keys(PARTS) as HipThighPartId[];

/** The parts a topic shows, in the order given. */
export function hipThighParts(ids: HipThighPartId[]): ModelPart[] {
  return ids.map((id) => ({ id, ...PARTS[id] }));
}

export const HIP_THIGH_BONES: HipThighPartId[] = [
  'hip-bone',
  'sacrum',
  'femur',
  'patella',
  'tibia',
  'fibula',
];

export const GLUTEAL_MUSCLES: HipThighPartId[] = [
  'gluteus-maximus',
  'gluteus-medius',
  'gluteus-minimus',
  'piriformis',
  'obturator-internus',
  'gemelli',
  'quadratus-femoris',
  'tensor-fasciae-latae',
];

export const FRONT_MUSCLES: HipThighPartId[] = [
  'sartorius',
  'rectus-femoris',
  'vastus-lateralis',
  'vastus-medialis',
  'vastus-intermedius',
  'iliacus',
  'psoas-major',
];

export const ADDUCTORS: HipThighPartId[] = [
  'pectineus',
  'adductor-longus',
  'adductor-brevis',
  'adductor-magnus',
  'gracilis',
  'obturator-externus',
];

export const HAMSTRINGS: HipThighPartId[] = ['biceps-femoris', 'semitendinosus', 'semimembranosus'];

/** The right thigh from the front. */
export const THIGH_FRONT: CameraStop = {
  id: 'front',
  title: 'The thigh from the front',
  description:
    'From the iliac crest to the knee: quadriceps on the front, sartorius crossing it obliquely, the adductors on the medial side.',
  target: [-80, -110, 650],
  position: [-156, -1356, 711],
};

/** The right gluteal region from behind. */
export const GLUTEAL_BACK: CameraStop = {
  id: 'back',
  title: 'The gluteal region from behind',
  description:
    'Gluteus maximus covers the buttock, from the back of the pelvis down and out to the iliotibial tract and the femur.',
  target: [-75, -40, 820],
  position: [-192, 1002, 875],
};
