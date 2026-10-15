import type { CameraStop, ModelPart, ModelTrace } from '@medlearn/schemas';

import { LOWER_LIMB_BONES, lowerLimbParts } from './lower-limb-3d';

// The bones of the whole right lower limb with the capsules, ligaments and menisci of its joints,
// shared by the joint topics. Coordinates are the BodyParts3D frame: millimetres, X towards the
// right side (negative), Y towards the back (positive), Z up.

// Model files are cached forever by URL (public/sw.js): bump the version when the model changes.
export const LOWER_LIMB_JOINTS_MODEL_SRC = '/models/lower-limb-joints.glb?v=1';

/** Credit for the model, shown wherever it is. */
export const LOWER_LIMB_JOINTS_MODEL_CREDIT =
  'Bones: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Capsules, ligaments and menisci: Z-Anatomy, CC BY-SA 4.0; it has no patellar ligament (drawn as an outline here) and no anterior tibiotalar part of the deltoid ligament.';

/**
 * Every joint mesh in the model file (built by scripts/models/build-models.mjs), by part id, with
 * what a student sees on picking it. Facts in our own words; not yet medically reviewed.
 */
const JOINT_PARTS = {
  'hip-capsule': {
    name: 'Capsule of the hip joint',
    kind: 'capsule',
    about:
      'From the rim of the acetabulum to the intertrochanteric line in front, but only halfway down the neck behind. Thick in front and above, thin below and behind; its fibres turn up the neck as retinacula carrying the vessels of the head.',
  },
  'iliofemoral-ligament': {
    name: 'Iliofemoral ligament',
    kind: 'ligament',
    about:
      'The inverted Y in front of the hip, from the anterior inferior iliac spine to the intertrochanteric line: one of the strongest ligaments in the body. It stops the trunk falling backwards when standing.',
  },
  'pubofemoral-ligament': {
    name: 'Pubofemoral ligament',
    kind: 'ligament',
    about: 'Below and in front, from the pubis to the capsule: it limits abduction.',
  },
  'ischiofemoral-ligament': {
    name: 'Ischiofemoral ligament',
    kind: 'ligament',
    about: 'Behind the hip, the weakest of the three, its fibres twisting up from the ischium.',
  },
  'ligament-of-head-of-femur': {
    name: 'Ligament of the head of the femur',
    kind: 'ligament',
    about:
      'Inside the joint, from the fovea of the head to the acetabular notch. It carries a small artery to the head from the obturator artery, important in children.',
  },
  'acetabular-labrum': {
    name: 'Acetabular labrum',
    kind: 'cartilage',
    about:
      'A rim of fibrocartilage on the edge of the acetabulum: it deepens the socket and narrows its mouth to grip the head of the femur.',
  },
  'transverse-acetabular-ligament': {
    name: 'Transverse acetabular ligament',
    kind: 'ligament',
    about: 'Bridges the acetabular notch, turning it into a foramen for the vessels of the joint.',
  },
  'knee-capsule': {
    name: 'Capsule of the knee joint',
    kind: 'capsule',
    about:
      'Thin, and missing in front, where quadriceps, the patella and the patellar ligament take its place. It has openings for the suprapatellar bursa and the tendon of popliteus.',
  },
  'anterior-cruciate-ligament': {
    name: 'Anterior cruciate ligament',
    kind: 'ligament',
    about:
      'From the front of the intercondylar area of the tibia, up, back and laterally to the lateral condyle of the femur. It stops the tibia sliding forwards and is taut in extension.',
  },
  'posterior-cruciate-ligament': {
    name: 'Posterior cruciate ligament',
    kind: 'ligament',
    about:
      'From the back of the intercondylar area of the tibia, up, forwards and medially to the medial condyle of the femur. It stops the tibia sliding backwards and is taut in flexion.',
  },
  'medial-meniscus': {
    name: 'Medial meniscus',
    kind: 'cartilage',
    about:
      'C-shaped, wider behind, and fixed to the deep part of the tibial collateral ligament: less mobile, so torn more often than the lateral.',
  },
  'lateral-meniscus': {
    name: 'Lateral meniscus',
    kind: 'cartilage',
    about:
      'Nearly circular and more mobile; popliteus pulls its back end out of the way as the knee bends, so it is torn less often.',
  },
  'coronary-ligaments': {
    name: 'Coronary ligaments',
    kind: 'ligament',
    about: 'The parts of the capsule tying the edges of the menisci down to the tibia.',
  },
  'transverse-ligament-of-knee': {
    name: 'Transverse ligament of the knee',
    kind: 'ligament',
    about: 'Joins the front ends of the two menisci.',
  },
  'tibial-collateral-ligament': {
    name: 'Tibial (medial) collateral ligament',
    kind: 'ligament',
    about:
      'A broad, strong band from the medial epicondyle of the femur to the tibia. Its deep part is fixed to the medial meniscus, so injuries to the two often go together.',
  },
  'fibular-collateral-ligament': {
    name: 'Fibular (lateral) collateral ligament',
    kind: 'ligament',
    about:
      'A round cord from the lateral epicondyle to the head of the fibula, free of the capsule, with the tendon of popliteus passing between it and the lateral meniscus.',
  },
  'oblique-popliteal-ligament': {
    name: 'Oblique popliteal ligament',
    kind: 'ligament',
    about:
      'An expansion of the tendon of semimembranosus across the back of the capsule, close to the popliteal artery.',
  },
  'arcuate-popliteal-ligament': {
    name: 'Arcuate popliteal ligament',
    kind: 'ligament',
    about:
      'From the head of the fibula, arching over the tendon of popliteus at the back of the knee.',
  },
  'superior-tibiofibular-joint': {
    name: 'Superior tibiofibular joint',
    kind: 'ligament',
    about:
      'A small plane synovial joint between the head of the fibula and the lateral condyle of the tibia, with its capsule and ligaments.',
  },
  'interosseous-membrane-of-leg': {
    name: 'Interosseous membrane of the leg',
    kind: 'ligament',
    about:
      'Joins the shafts of the tibia and fibula (the middle tibiofibular joint) and separates the front of the leg from the back.',
  },
  'inferior-tibiofibular-ligaments': {
    name: 'Inferior tibiofibular ligaments',
    kind: 'ligament',
    about:
      'The anterior and posterior ligaments of the inferior tibiofibular joint, a fibrous joint that holds the malleoli together as the socket of the ankle.',
  },
  'deltoid-ligament': {
    name: 'Deltoid (medial) ligament',
    kind: 'ligament',
    about:
      'A strong triangle from the medial malleolus fanning out to the navicular, the sustentaculum tali of the calcaneus and the talus. It is so strong that the malleolus breaks before it tears.',
  },
  'anterior-talofibular-ligament': {
    name: 'Anterior talofibular ligament',
    kind: 'ligament',
    about:
      'From the front of the lateral malleolus to the neck of the talus: the weakest ankle ligament and the first torn in an inversion sprain.',
  },
  'posterior-talofibular-ligament': {
    name: 'Posterior talofibular ligament',
    kind: 'ligament',
    about: 'From the lateral malleolus back to the posterior process of the talus.',
  },
  'calcaneofibular-ligament': {
    name: 'Calcaneofibular ligament',
    kind: 'ligament',
    about: 'A cord from the tip of the lateral malleolus down and back to the calcaneus.',
  },
  'interosseous-talocalcanean-ligament': {
    name: 'Interosseous talocalcanean ligament',
    kind: 'ligament',
    about:
      'In the sinus tarsi between the talus and calcaneus: the strongest bond between them, separating the subtalar joint from the talocalcaneonavicular.',
  },
  'talocalcanean-ligaments': {
    name: 'Talocalcanean ligaments',
    kind: 'ligament',
    about: 'Small bands round the subtalar joint: anterior, lateral, medial and posterior.',
  },
  'spring-ligament': {
    name: 'Spring ligament (plantar calcaneonavicular)',
    kind: 'ligament',
    about:
      'From the sustentaculum tali to the navicular, holding up the head of the talus from below: part of the socket of the talocalcaneonavicular joint and a key tie of the medial arch.',
  },
  'bifurcate-ligament': {
    name: 'Bifurcate ligament',
    kind: 'ligament',
    about:
      'A Y on the dorsum from the calcaneus to the navicular and the cuboid, across the transverse tarsal joint.',
  },
  'talonavicular-ligament': {
    name: 'Dorsal talonavicular ligament',
    kind: 'ligament',
    about: 'Over the top of the talonavicular joint, from the neck of the talus to the navicular.',
  },
  'long-plantar-ligament': {
    name: 'Long plantar ligament',
    kind: 'ligament',
    about:
      'The longest ligament of the sole, from the calcaneus to the cuboid and the bases of the lateral metatarsals, roofing the groove for the peroneus longus tendon.',
  },
  'short-plantar-ligament': {
    name: 'Short plantar ligament (plantar calcaneocuboid)',
    kind: 'ligament',
    about:
      'Deep to the long plantar ligament, from the calcaneus to the cuboid: a tie of the lateral arch.',
  },
} satisfies Record<string, Omit<ModelPart, 'id'>>;

export type LowerLimbJointPartId = keyof typeof JOINT_PARTS;

/** The bones and these joint parts, in this order. */
export function lowerLimbJointParts(ids: LowerLimbJointPartId[]): ModelPart[] {
  return [...lowerLimbParts(LOWER_LIMB_BONES), ...ids.map((id) => ({ id, ...JOINT_PARTS[id] }))];
}

export const HIP_LIGAMENTS: LowerLimbJointPartId[] = [
  'hip-capsule',
  'iliofemoral-ligament',
  'pubofemoral-ligament',
  'ischiofemoral-ligament',
  'ligament-of-head-of-femur',
  'acetabular-labrum',
  'transverse-acetabular-ligament',
];

export const KNEE_LIGAMENTS: LowerLimbJointPartId[] = [
  'knee-capsule',
  'anterior-cruciate-ligament',
  'posterior-cruciate-ligament',
  'medial-meniscus',
  'lateral-meniscus',
  'coronary-ligaments',
  'transverse-ligament-of-knee',
  'tibial-collateral-ligament',
  'fibular-collateral-ligament',
  'oblique-popliteal-ligament',
  'arcuate-popliteal-ligament',
];

export const ANKLE_LIGAMENTS: LowerLimbJointPartId[] = [
  'deltoid-ligament',
  'anterior-talofibular-ligament',
  'posterior-talofibular-ligament',
  'calcaneofibular-ligament',
  'inferior-tibiofibular-ligaments',
];

export const FOOT_LIGAMENTS: LowerLimbJointPartId[] = [
  'interosseous-talocalcanean-ligament',
  'talocalcanean-ligaments',
  'spring-ligament',
  'bifurcate-ligament',
  'talonavicular-ligament',
  'long-plantar-ligament',
  'short-plantar-ligament',
];

/** The patellar ligament, which neither source has: from the apex of the patella to the tibial tuberosity. */
export const PATELLAR_LIGAMENT: ModelTrace = {
  id: 'patellar-ligament',
  kind: 'outline',
  paths: [
    [
      [-81, -113, 364],
      [-81, -116, 348],
      [-80, -117, 332],
    ],
  ],
};

/** The hip from the front. */
export const HIP_FRONT: CameraStop = {
  id: 'hip-front',
  title: 'The hip from the front',
  description:
    'The capsule wrapped round the head and neck of the femur, with the iliofemoral ligament over it like an inverted Y.',
  target: [-90, -95, 780],
  position: [-170, -560, 820],
};

/** The hip from behind. */
export const HIP_BACK: CameraStop = {
  id: 'hip-back',
  title: 'The hip from behind',
  description:
    'Behind, the capsule is thin and stops halfway down the neck; the ischiofemoral ligament twists up from the ischium.',
  target: [-95, -80, 780],
  position: [-200, 400, 830],
};

/** The knee from the front. */
export const KNEE_FRONT: CameraStop = {
  id: 'knee-front',
  title: 'The knee from the front',
  description:
    'The patella in front, the collateral ligaments on either side, and through the thin capsule the cruciate ligaments crossing in the middle.',
  target: [-78, -80, 375],
  position: [-110, -520, 410],
};

/** The knee from behind. */
export const KNEE_POSTERIOR: CameraStop = {
  id: 'knee-back',
  title: 'The knee from behind',
  description:
    'The oblique and arcuate popliteal ligaments on the back of the capsule, and the posterior cruciate ligament deep to them.',
  target: [-78, -50, 380],
  position: [-100, 420, 410],
};

/** The medial side of the knee, at the joint line. */
export const KNEE_MENISCI: CameraStop = {
  id: 'knee-medial',
  title: 'The medial side',
  description:
    'At the joint line from the inside: the broad tibial collateral ligament, with the medial meniscus tucked under it and fixed to its deep part. Switch the bones off in Layers to see both menisci and the cruciates on their own.',
  target: [-60, -62, 360],
  position: [420, -110, 380],
};

/** The ankle from the lateral side. */
export const ANKLE_LATERAL: CameraStop = {
  id: 'ankle-lateral',
  title: 'The ankle from the side',
  description:
    'The three lateral ligaments fanning from the lateral malleolus: anterior talofibular, calcaneofibular and posterior talofibular.',
  target: [-92, -55, -8],
  position: [-560, -120, 20],
};

/** The ankle from the medial side. */
export const ANKLE_INSIDE: CameraStop = {
  id: 'ankle-medial',
  title: 'The ankle from the inside',
  description:
    'The deltoid ligament spreading from the medial malleolus to the navicular, the calcaneus and the talus.',
  target: [-60, -60, -5],
  position: [420, -120, 30],
};

/** The foot from below and the medial side. */
export const FOOT_BELOW: CameraStop = {
  id: 'foot-below',
  title: 'The sole from below',
  description:
    'The spring ligament under the head of the talus, and the long and short plantar ligaments running forwards from the calcaneus.',
  target: [-85, -80, -40],
  position: [-95, -260, -520],
};
