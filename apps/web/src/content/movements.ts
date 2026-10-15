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
export const KNEE_UNLOCKING: Twist = {
  pivot: [-60, -74, 390],
  axis: [0, 0, 1],
  degrees: 10,
  over: 30,
};

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

/** What the joint is doing at this angle. */
export function phaseAt(movement: { phases: MovementPhase[] }, angle: number): string {
  const phase = movement.phases.find((item) => angle <= item.upTo) ?? movement.phases.at(-1);
  return phase?.text ?? '';
}
