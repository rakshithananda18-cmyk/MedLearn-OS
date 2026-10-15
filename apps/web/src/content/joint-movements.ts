import { type JointMovement, KNEE_UNLOCKING, type MovementId } from './movements';

// The joint topics' movements, in their own models: content the server hands to the 3D studio
// with each topic (content/studio.ts), so it stays out of the studio's JavaScript.

const FOOT_BONES = [
  'talus',
  'calcaneus',
  'navicular',
  'cuboid',
  'cuneiforms',
  'metatarsals',
  'phalanges',
];
const FOOT_LIGAMENTS = [
  'interosseous-talocalcanean-ligament',
  'talocalcanean-ligaments',
  'spring-ligament',
  'bifurcate-ligament',
  'talonavicular-ligament',
  'long-plantar-ligament',
  'short-plantar-ligament',
];
const ANKLE_LIGAMENTS = [
  'deltoid-ligament',
  'anterior-talofibular-ligament',
  'posterior-talofibular-ligament',
  'calcaneofibular-ligament',
];
const LEG = [
  'tibia',
  'fibula',
  'superior-tibiofibular-joint',
  'interosseous-membrane-of-leg',
  'inferior-tibiofibular-ligaments',
  ...FOOT_BONES,
  ...ANKLE_LIGAMENTS,
  ...FOOT_LIGAMENTS,
];
const KNEE_SPANNING = [
  'knee-capsule',
  'anterior-cruciate-ligament',
  'posterior-cruciate-ligament',
  'tibial-collateral-ligament',
  'fibular-collateral-ligament',
  'oblique-popliteal-ligament',
  'arcuate-popliteal-ligament',
];
// The menisci ride on the tibia, held by the coronary ligaments; the patella keeps its place on
// the tibia through the patellar ligament, so it rolls round the femoral condyles with the leg.
const KNEE_DOWN = [
  'patella',
  'patellar-ligament',
  'medial-meniscus',
  'lateral-meniscus',
  'coronary-ligaments',
  'transverse-ligament-of-knee',
  ...LEG,
];

/** Movements of the right lower limb's joints, measured on the joints model. */
export const JOINT_MOVEMENTS: JointMovement[] = [
  {
    id: 'hip-flexion',
    name: 'Hip flexion',
    joint: 'Right hip',
    // Through the centre of the femoral head, side to side; the thigh swings forward.
    pivot: [-88, -79, 811],
    axis: [-1, 0, 0],
    range: 120,
    turns: ['femur', ...KNEE_SPANNING, ...KNEE_DOWN],
    stretches: [
      'hip-capsule',
      'iliofemoral-ligament',
      'pubofemoral-ligament',
      'ischiofemoral-ligament',
      'ligament-of-head-of-femur',
    ],
    taut: {
      start: ['iliofemoral-ligament', 'pubofemoral-ligament', 'ischiofemoral-ligament'],
      end: [],
    },
    ends: ['straight', 'bent'],
    stop: 'hip-side',
    phases: [
      {
        upTo: 10,
        text: 'Extended: the three ligaments of the capsule are wound tight round the neck, so standing hangs on them with little work from the muscles.',
      },
      {
        upTo: 70,
        text: 'Bending: the ligaments unwind as the thigh comes forward, and slacken.',
      },
      {
        upTo: 120,
        text: 'Flexed: every capsular ligament is slack. A blow along the bent thigh, as against a car’s dashboard, can drive the head out backwards.',
      },
    ],
  },
  {
    id: 'knee-flexion',
    name: 'Knee flexion',
    joint: 'Right knee',
    // Between the centres of the two femoral condyles.
    pivot: [-72, -74, 390],
    axis: [1, 0, 0],
    range: 135,
    twist: KNEE_UNLOCKING,
    turns: KNEE_DOWN,
    stretches: KNEE_SPANNING,
    taut: {
      start: [
        'tibial-collateral-ligament',
        'fibular-collateral-ligament',
        'anterior-cruciate-ligament',
        'oblique-popliteal-ligament',
      ],
      end: ['posterior-cruciate-ligament'],
    },
    ends: ['straight', 'bent'],
    stop: 'knee-medial',
    phases: [
      {
        upTo: 0,
        text: 'Locked: in full extension the femur has turned inwards on the tibia, the collaterals and the anterior cruciate are taut, and the knee stands as one rigid pillar.',
      },
      {
        upTo: 30,
        text: 'Unlocking: popliteus turns the femur outwards on the tibia (here the tibia turns inwards under it), loosening the ligaments so the knee can bend.',
      },
      {
        upTo: 90,
        text: 'Bending: the collaterals slacken, which lets the bent knee rotate; the posterior cruciate is tightening.',
      },
      {
        upTo: 135,
        text: 'Fully bent: the posterior cruciate is taut, holding the femur from sliding forward off the tibia, as when walking downhill.',
      },
    ],
  },
  {
    id: 'ankle-plantarflexion',
    name: 'Plantarflexion',
    joint: 'Right ankle',
    // Through the tips of the two malleoli: the axis runs down and back to the lateral side.
    pivot: [-76, -71, -16],
    axis: [42, -33, 19],
    range: 45,
    turns: [...FOOT_BONES, ...FOOT_LIGAMENTS],
    stretches: ANKLE_LIGAMENTS,
    taut: { start: [], end: ['anterior-talofibular-ligament'] },
    ends: ['in neutral', 'pointed down'],
    stop: 'ankle-lateral',
    phases: [
      {
        upTo: 5,
        text: 'Neutral: the wide front of the talus fills the space between the malleoli, and the ankle is steady.',
      },
      {
        upTo: 45,
        text: 'Pointed down: the narrow back of the talus now sits between the malleoli, so the ankle can rock; the anterior talofibular ligament is taut, and turning the foot in now tears it first.',
      },
    ],
  },
  {
    id: 'foot-inversion',
    name: 'Inversion',
    joint: 'Right foot',
    // The subtalar axis: from the back of the heel, low and lateral, up to the neck of the talus.
    pivot: [-76, -62, -36],
    axis: [28, -67, 48],
    range: 30,
    turns: [
      'calcaneus',
      'navicular',
      'cuboid',
      'cuneiforms',
      'metatarsals',
      'phalanges',
      'spring-ligament',
      'bifurcate-ligament',
      'long-plantar-ligament',
      'short-plantar-ligament',
    ],
    stretches: [
      'interosseous-talocalcanean-ligament',
      'talocalcanean-ligaments',
      'talonavicular-ligament',
      'calcaneofibular-ligament',
      'deltoid-ligament',
    ],
    taut: { start: [], end: ['calcaneofibular-ligament'] },
    ends: ['in neutral', 'turned in'],
    stop: 'heel-back',
    phases: [
      { upTo: 5, text: 'Neutral: the sole faces the ground.' },
      {
        upTo: 30,
        text: 'Inverted: the talus stays with the leg while the calcaneus and the foot in front of it turn under it, at the subtalar and talocalcaneonavicular joints; the sole faces inwards and the calcaneofibular ligament, outside, is stretched.',
      },
    ],
  },
];

/** The joints a topic can move in its own model. */
const MOVEMENTS_BY_TOPIC: Record<string, MovementId[]> = {
  'hip-joint': ['hip-flexion'],
  'knee-joint': ['knee-flexion'],
  'ankle-tibiofibular-joints': ['ankle-plantarflexion'],
  'foot-joints': ['foot-inversion'],
};

export function movementsFor(slug: string): JointMovement[] {
  return (MOVEMENTS_BY_TOPIC[slug] ?? []).flatMap(
    (id) => JOINT_MOVEMENTS.find((movement) => movement.id === id) ?? [],
  );
}
