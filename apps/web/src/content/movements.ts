import type { Point3 } from '@medlearn/schemas';

export type MovementId =
  | 'elbow-flexion'
  | 'forearm-pronation'
  | 'shoulder-abduction'
  | 'knee-flexion'
  | 'hip-flexion'
  | 'ankle-plantarflexion'
  | 'foot-inversion';

/**
 * A turn about the moving bone's own long axis over the first part of a movement: the knee
 * unlocking as it starts to bend. Degrees.
 */
export interface Twist {
  pivot: Point3;
  axis: Point3;
  degrees: number;
  over: number;
}

/**
 * A joint movement on the one body: which structures turn, about which axis, and how far. The
 * bones turn as rigid parts (BodyParts3D has no rig), so muscles crossing the joint stay put.
 */
export interface Movement {
  id: MovementId;
  name: string;
  joint: string;
  /** A point on the axis, in BodyParts3D millimetres, measured on the skeleton. */
  pivot: Point3;
  /** The axis's direction; turning by a positive angle performs the movement. */
  axis: Point3;
  /** The full range of the movement, in degrees. */
  range: number;
  /** Whether a structure, by its id and centre, turns with the movement. */
  moves: (id: string, centre: Point3) => boolean;
  twist?: Twist;
}

// Unlocking: over the first 30 degrees of bending, the tibia turns inwards on the femur (the
// femur outwards on the tibia), about an upright axis through the medial condyle.
const KNEE_UNLOCKING: Twist = { pivot: [-60, -74, 390], axis: [0, 0, 1], degrees: 10, over: 30 };

// The right arm hangs out beside the body; nothing of the trunk or legs lies this far out.
const rightArm = (centre: Point3) => centre[0] <= -150;

/** Movements of the right limbs, measured on the body's skeleton. */
export const MOVEMENTS: Movement[] = [
  {
    id: 'elbow-flexion',
    name: 'Elbow flexion',
    joint: 'Right elbow',
    // Through the lower end of the humerus, where it meets the radius and ulna.
    pivot: [-215, -70, 1040],
    axis: [-1, 0, 0],
    range: 145,
    moves: (_, centre) => rightArm(centre) && centre[2] < 1030,
  },
  {
    id: 'forearm-pronation',
    name: 'Pronation',
    joint: 'Right forearm',
    // From the head of the radius down to the head of the ulna: the radius turns over the ulna,
    // carrying the hand.
    pivot: [-236, -78, 1034],
    axis: [0, 34, 226],
    range: 160,
    moves: (id, centre) => id === 'skeleton/right-radius' || (rightArm(centre) && centre[2] < 830),
  },
  {
    id: 'shoulder-abduction',
    name: 'Shoulder abduction',
    joint: 'Right shoulder',
    // Through the head of the humerus, front to back.
    pivot: [-165, -77, 1305],
    axis: [0, 1, 0],
    range: 90,
    moves: (_, centre) => rightArm(centre) && centre[2] < 1320,
  },
  {
    id: 'knee-flexion',
    name: 'Knee flexion',
    joint: 'Right knee',
    // Through the femoral condyles, side to side.
    pivot: [-68, -80, 390],
    axis: [1, 0, 0],
    range: 135,
    moves: (_, centre) => centre[0] < 0 && centre[0] > -150 && centre[2] < 380,
    twist: KNEE_UNLOCKING,
  },
];

/** What a joint is doing at an angle of its movement, up to and including `upTo` degrees. */
export interface MovementPhase {
  upTo: number;
  text: string;
}

/**
 * A movement in a joint topic's own model, where the ligaments are: the parts that turn, those
 * that cross the joint and stretch with it, and which ligaments are taut at either end.
 */
export interface JointMovement extends Omit<Movement, 'moves'> {
  turns: string[];
  stretches: string[];
  taut: { start: string[]; end: string[] };
  /** The joint at the start and the end of the movement, as in "taut when straight". */
  ends: [string, string];
  /** In order of angle; the last reaches the end of the range. */
  phases: MovementPhase[];
  /** The guided view it is best watched from, which choosing it turns the camera to. */
  stop: string;
}

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

/** What the joint is doing at this angle. */
export function phaseAt(movement: { phases: MovementPhase[] }, angle: number): string {
  const phase = movement.phases.find((item) => angle <= item.upTo) ?? movement.phases.at(-1);
  return phase?.text ?? '';
}
