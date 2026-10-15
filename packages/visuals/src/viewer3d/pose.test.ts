import type { Point3 } from '@medlearn/schemas';
import { Matrix4, Vector3 } from 'three';
import { describe, expect, it } from 'vitest';

import { poseMatrix, type PoseTwist, stretchWeights, tension } from './pose';

const at = (matrix: Matrix4, point: [number, number, number]) =>
  new Vector3(...point)
    .applyMatrix4(matrix)
    .toArray()
    .map((value) => Math.round(value));

describe('poseMatrix', () => {
  it('turns about the axis through the pivot', () => {
    const matrix = poseMatrix({ pivot: [0, 0, 100], axis: [1, 0, 0] }, Math.PI / 2, new Matrix4());
    // A point 100 below the pivot swings round to 100 behind it.
    expect(at(matrix, [0, 0, 0])).toEqual([0, 100, 100]);
    expect(at(matrix, [0, 0, 100])).toEqual([0, 0, 100]);
  });

  it('builds the twist up over its first part, then holds it', () => {
    const pose = {
      pivot: [0, 0, 0] satisfies Point3,
      axis: [1, 0, 0] satisfies Point3,
      twist: {
        pivot: [0, 0, 0],
        axis: [0, 0, 1],
        angle: Math.PI / 2,
        over: 0.5,
      } satisfies PoseTwist,
    };
    const moved = (angle: number) => at(poseMatrix(pose, angle, new Matrix4()), [100, 0, 0]);
    // No twist at rest; at 0.25 half of it (45 degrees), then the small turn about x.
    expect(moved(0)).toEqual([100, 0, 0]);
    expect(moved(0.25)).toEqual([71, 69, 17]);
    // Past `over` the whole quarter turn: x to y, then 1 radian about x.
    expect(moved(1)).toEqual([0, 54, 84]);
  });
});

describe('stretchWeights', () => {
  it('holds each end to its own bone and blends along the middle', () => {
    // A ligament from z 0 (on the fixed bone) to z 30 (on the moving one).
    const ligament = [0, 0, 0, 0, 0, 15, 0, 0, 30];
    const fixed = [0, 0, -2, 5, 0, -2];
    const moving = [0, 0, 32, 5, 0, 32];
    const [bottom, middle, top] = stretchWeights(ligament, moving, fixed);
    expect(bottom).toBeLessThan(0.05);
    expect(middle).toBeCloseTo(0.5, 1);
    expect(top).toBeGreaterThan(0.95);
  });

  it('follows the only bone in reach', () => {
    expect([...stretchWeights([0, 0, 0], [0, 0, 10], [500, 0, 0])][0]).toBeGreaterThan(0.9);
  });
});

describe('tension', () => {
  it('slackens a ligament taut at the start and tightens one taut at the end', () => {
    expect(tension(0, 2, true)).toBe(1);
    expect(tension(2, 2, true)).toBe(0);
    expect(tension(1, 2, false)).toBe(0.5);
    expect(tension(5, 2, false)).toBe(1);
  });
});
