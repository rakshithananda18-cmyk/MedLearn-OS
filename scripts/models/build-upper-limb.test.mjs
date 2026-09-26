import { describe, expect, it } from 'vitest';

import { parseObj, PARTS } from './build-upper-limb.mjs';

describe('parseObj', () => {
  it('reads vertices and splits polygons into triangles (BodyParts3D "a//a" faces)', () => {
    const { positions, indices } = parseObj(
      [
        '# BodyParts3D header',
        'v 0 0 0',
        'v 1 0 0',
        'v 1 1 0',
        'v 0 1 0',
        'vn 0 0 1',
        'f 1//1 2//2 3//3 4//4',
        '',
      ].join('\r\n'),
    );
    expect([...positions]).toEqual([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]);
    expect([...indices]).toEqual([0, 1, 2, 0, 2, 3]);
  });
});

describe('PARTS', () => {
  it('names every mesh with a unique part id used by the content', () => {
    const ids = PARTS.map((part) => part.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['clavicle', 'humerus', 'axillary-artery']));
  });
});
