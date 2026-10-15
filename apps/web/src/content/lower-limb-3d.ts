import type { CameraStop, ModelPart } from '@medlearn/schemas';

import { hipThighParts } from './hip-thigh-3d';
import { legFootParts } from './leg-foot-3d';

// The whole right lower limb without its muscles, shared by the topics that follow a structure
// from the groin to the toes: surface marking and pulses, nerve injuries, development.
// Coordinates are the BodyParts3D frame: millimetres, X towards the right side (negative), Y
// towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const LOWER_LIMB_MODEL_SRC = '/models/lower-limb.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const LOWER_LIMB_MODEL_CREDIT =
  'Bones and vessels: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP); it has no profunda femoris, gluteal or peroneal arteries, so their veins show their paths. Nerves: Z-Anatomy, CC BY-SA 4.0.';

// Each part is described as in the half-limb models: the hip and thigh model's words above the
// knee, the leg and foot model's below it.
const ABOVE_KNEE = [
  'hip-bone',
  'sacrum',
  'femur',
  'patella',
  'external-iliac-artery',
  'femoral-artery',
  'lateral-circumflex-femoral-artery',
  'descending-genicular-artery',
  'femoral-vein',
  'deep-femoral-vein',
  'superior-gluteal-vein',
  'inferior-gluteal-vein',
  'femoral-nerve',
  'lateral-cutaneous-nerve-of-thigh',
  'obturator-nerve',
  'superior-gluteal-nerve',
  'sciatic-nerve',
  'posterior-cutaneous-nerve-of-thigh',
] as const;
const BELOW_KNEE = [
  'tibia',
  'fibula',
  'talus',
  'calcaneus',
  'navicular',
  'cuboid',
  'cuneiforms',
  'metatarsals',
  'phalanges',
  'popliteal-artery',
  'anterior-tibial-artery',
  'dorsalis-pedis-artery',
  'posterior-tibial-artery',
  'medial-plantar-artery',
  'lateral-plantar-artery',
  'plantar-arch',
  'popliteal-vein',
  'peroneal-vein',
  'great-saphenous-vein',
  'small-saphenous-vein',
  'dorsal-venous-arch',
  'tibial-nerve',
  'common-peroneal-nerve',
  'superficial-peroneal-nerve',
  'deep-peroneal-nerve',
  'sural-nerve',
  'saphenous-nerve',
  'medial-plantar-nerve',
  'lateral-plantar-nerve',
] as const;

export type LowerLimbPartId = (typeof ABOVE_KNEE)[number] | (typeof BELOW_KNEE)[number];

const PARTS = new Map(
  [...hipThighParts([...ABOVE_KNEE]), ...legFootParts([...BELOW_KNEE])].map((part) => [
    part.id,
    part,
  ]),
);

/** The model's parts with these ids, in this order. */
export function lowerLimbParts(ids: LowerLimbPartId[]): ModelPart[] {
  return ids.flatMap((id) => PARTS.get(id) ?? []);
}

export const LOWER_LIMB_BONES: LowerLimbPartId[] = [
  'hip-bone',
  'sacrum',
  'femur',
  'patella',
  'tibia',
  'fibula',
  'talus',
  'calcaneus',
  'navicular',
  'cuboid',
  'cuneiforms',
  'metatarsals',
  'phalanges',
];

/** The arterial trunk from the groin to the sole. */
export const LOWER_LIMB_ARTERIES: LowerLimbPartId[] = [
  'external-iliac-artery',
  'femoral-artery',
  'lateral-circumflex-femoral-artery',
  'descending-genicular-artery',
  'popliteal-artery',
  'anterior-tibial-artery',
  'dorsalis-pedis-artery',
  'posterior-tibial-artery',
  'medial-plantar-artery',
  'lateral-plantar-artery',
  'plantar-arch',
];

/** The nerves of the limb, from their roots to the toes. */
export const LOWER_LIMB_NERVES: LowerLimbPartId[] = [
  'femoral-nerve',
  'saphenous-nerve',
  'lateral-cutaneous-nerve-of-thigh',
  'obturator-nerve',
  'superior-gluteal-nerve',
  'sciatic-nerve',
  'posterior-cutaneous-nerve-of-thigh',
  'tibial-nerve',
  'common-peroneal-nerve',
  'superficial-peroneal-nerve',
  'deep-peroneal-nerve',
  'sural-nerve',
  'medial-plantar-nerve',
  'lateral-plantar-nerve',
];

/** The whole limb from the front, as far back as the camera goes. */
export const LIMB_FRONT: CameraStop = {
  id: 'limb',
  title: 'The whole limb from the front',
  description:
    'From the groin to the ankle: the bones, the arterial trunk down the front of the thigh and the nerves beside it.',
  target: [-85, -100, 450],
  position: [-150, -1540, 500],
};

/** The groin and femoral triangle from the front. */
export const GROIN_FRONT: CameraStop = {
  id: 'groin',
  title: 'The groin',
  description:
    'Below the inguinal ligament: the femoral nerve, artery and vein side by side, lateral to medial, as they enter the thigh.',
  target: [-55, -115, 770],
  position: [-95, -760, 810],
};

/** The gluteal region from behind. */
export const BUTTOCK_BACK: CameraStop = {
  id: 'buttock',
  title: 'The buttock from behind',
  description:
    'The sciatic nerve leaving the pelvis below piriformis and running down between the ischial tuberosity and the greater trochanter; the gluteal veins mark where the gluteal arteries come out.',
  target: [-60, -40, 840],
  position: [-120, 640, 890],
};

/** The back of the knee. */
export const KNEE_BACK: CameraStop = {
  id: 'knee-back',
  title: 'The back of the knee',
  description:
    'The popliteal vessels deep in the fossa, the tibial nerve over them, and the common peroneal nerve heading for the fibula.',
  target: [-80, -60, 400],
  position: [-110, 640, 440],
};

/** The lateral side of the knee, where the common peroneal nerve winds round the fibula. */
export const KNEE_LATERAL: CameraStop = {
  id: 'knee-lateral',
  title: 'The neck of the fibula',
  description:
    'From the lateral side: the common peroneal nerve winds round the neck of the fibula just under the skin, then divides into its superficial and deep branches.',
  target: [-100, -60, 330],
  position: [-760, -40, 380],
};

/** The medial side of the ankle. */
export const ANKLE_MEDIAL: CameraStop = {
  id: 'ankle-medial',
  title: 'Behind the medial malleolus',
  description:
    'The posterior tibial vessels and the tibial nerve passing behind the medial malleolus into the sole.',
  target: [-60, -60, 10],
  position: [520, -150, 80],
};

/** The dorsum of the foot from in front and above. */
export const DORSUM_ABOVE: CameraStop = {
  id: 'dorsum',
  title: 'The dorsum of the foot',
  description:
    'The anterior tibial artery coming down between the malleoli and running on as dorsalis pedis to the first space between the metatarsals.',
  target: [-80, -120, -10],
  position: [-90, -560, 380],
};
