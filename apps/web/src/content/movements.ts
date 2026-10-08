import type { Point3 } from '@medlearn/schemas';

export type MovementId =
  'elbow-flexion' | 'forearm-pronation' | 'shoulder-abduction' | 'knee-flexion';

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
}

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
  },
];
