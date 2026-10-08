import type { Point3 } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import { type Movement, MOVEMENTS } from './movements';

// Centres from the body index (BodyParts3D millimetres).
const CENTRES: Record<string, Point3> = {
  'skeleton/right-humerus': [-190, -76, 1183],
  'skeleton/right-radius': [-250, -94, 920],
  'skeleton/right-ulna': [-222, -84, 929],
  'skeleton/right-first-metacarpal-bone': [-291, -139, 779],
  'skeleton/right-third-metacarpal-bone': [-262, -128, 753],
  'skeleton/left-radius': [250, -94, 920],
  'skeleton/right-femur': [-91, -81, 601],
  'skeleton/right-tibia': [-72, -84, 184],
  'skeleton/left-tibia': [72, -84, 184],
  'skeleton/right-scapula': [-112, -49, 1267],
};

const movement = (id: Movement['id']) => {
  const found = MOVEMENTS.find((item) => item.id === id);
  if (!found) throw new Error(id);
  return found;
};

/** A point turned about the movement's axis by an angle in degrees, right-handed (as three.js). */
function turned({ pivot, axis }: Movement, point: Point3, degrees: number): Point3 {
  const length = Math.hypot(...axis);
  const [ux, uy, uz] = axis.map((value) => value / length) as Point3;
  const [x, y, z] = point.map((value, at) => value - (pivot[at] ?? 0)) as Point3;
  const angle = (degrees * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dot = ux * x + uy * y + uz * z;
  const cross: Point3 = [uy * z - uz * y, uz * x - ux * z, ux * y - uy * x];
  return [x, y, z].map(
    (value, at) =>
      value * cos +
      (cross[at] ?? 0) * sin +
      ([ux, uy, uz][at] ?? 0) * dot * (1 - cos) +
      (pivot[at] ?? 0),
  ) as Point3;
}

const moving = (item: Movement) =>
  Object.entries(CENTRES)
    .filter(([id, centre]) => item.moves(id, centre))
    .map(([id]) => id);

describe('joint movements', () => {
  it('bends the elbow forward and up, carrying the forearm and hand', () => {
    const elbow = movement('elbow-flexion');
    expect(moving(elbow)).toEqual([
      'skeleton/right-radius',
      'skeleton/right-ulna',
      'skeleton/right-first-metacarpal-bone',
      'skeleton/right-third-metacarpal-bone',
    ]);
    const [, y, z] = turned(elbow, CENTRES['skeleton/right-radius'] as Point3, 90);
    expect(y).toBeLessThan(-150); // in front of the body
    expect(z).toBeGreaterThan(1000); // up near the elbow's level
  });

  it('turns the radius over the ulna, the thumb going forward and then inward', () => {
    const pronation = movement('forearm-pronation');
    expect(moving(pronation)).toEqual([
      'skeleton/right-radius',
      'skeleton/right-first-metacarpal-bone',
      'skeleton/right-third-metacarpal-bone',
    ]);
    const thumb = CENTRES['skeleton/right-first-metacarpal-bone'] as Point3;
    expect(turned(pronation, thumb, 45)[1]).toBeLessThan(thumb[1]);
    // Fully over, the thumb is on the inner side of the forearm's axis.
    expect(turned(pronation, thumb, 160)[0]).toBeGreaterThan(-236);
  });

  it('lifts the arm out to the side, and bends the knee backward', () => {
    const shoulder = movement('shoulder-abduction');
    expect(moving(shoulder)).toContain('skeleton/right-humerus');
    expect(moving(shoulder)).not.toContain('skeleton/right-scapula');
    const [x, , z] = turned(shoulder, CENTRES['skeleton/right-humerus'] as Point3, 90);
    expect(x).toBeLessThan(-250);
    expect(z).toBeGreaterThan(1280);

    const knee = movement('knee-flexion');
    expect(moving(knee)).toEqual(['skeleton/right-tibia']);
    expect(turned(knee, CENTRES['skeleton/right-tibia'] as Point3, 90)[1]).toBeGreaterThan(50);
  });
});
