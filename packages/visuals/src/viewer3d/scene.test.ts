import { describe, expect, it } from 'vitest';

import { MODEL_GROUP, MODEL_ORIGIN, supports3D, toScene } from './scene';

describe('toScene', () => {
  it('centres the model, turns millimetres into metres and Z-up into Y-up', () => {
    expect(toScene(MODEL_ORIGIN)).toEqual([0, 0, -0]);
    const [x, y, z] = toScene([MODEL_ORIGIN[0] - 100, MODEL_ORIGIN[1] - 50, MODEL_ORIGIN[2] + 20]);
    expect(x).toBeCloseTo(-0.1);
    expect(y).toBeCloseTo(0.02);
    expect(z).toBeCloseTo(0.05);
  });

  it('matches the group transform used for meshes', () => {
    // position + R_x(-90°) * scale * point, written out for one point.
    const [x, y, z] = [-150, -90, 1300];
    const [px, py, pz] = MODEL_GROUP.position;
    const s = MODEL_GROUP.scale;
    expect([px + s * x, py + s * z, pz - s * y].map((v) => v.toFixed(6))).toEqual(
      toScene([x, y, z]).map((v) => v.toFixed(6)),
    );
  });
});

describe('supports3D', () => {
  const withWebGL2 = { getContext: () => ({}) };
  const withoutWebGL2 = { getContext: () => null };

  it('needs WebGL2 and more than 2 GB of memory', () => {
    expect(supports3D(withWebGL2, 4)).toBe(true);
    expect(supports3D(withWebGL2, undefined)).toBe(true);
    expect(supports3D(withWebGL2, 2)).toBe(false);
    expect(supports3D(withoutWebGL2, 8)).toBe(false);
    expect(
      supports3D(
        {
          getContext: () => {
            throw new Error('blocked');
          },
        },
        8,
      ),
    ).toBe(false);
  });
});
