import { describe, expect, it } from 'vitest';

import { BODY_MODEL } from '../../apps/web/src/content/body';
import { SHOULDER_PART_IDS } from '../../apps/web/src/content/shoulder-3d';
import { clipTrianglesX, mergeMeshes, MODELS, parseObj, readConcepts } from './build-models.mjs';

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

describe('mergeMeshes', () => {
  it('joins meshes and shifts the second mesh’s indices past the first mesh’s vertices', () => {
    const triangle = {
      positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
      indices: new Uint32Array([0, 1, 2]),
    };
    const { positions, indices } = mergeMeshes([triangle, triangle]);
    expect(positions).toHaveLength(18);
    expect([...indices]).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe('clipTrianglesX', () => {
  it('keeps the triangles whose centre lies in the range', () => {
    const mesh = {
      // One triangle near x = 0, one near x = 10.
      positions: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 10, 0, 0, 11, 0, 0, 10, 1, 0]),
      indices: new Uint32Array([0, 1, 2, 3, 4, 5]),
    };
    expect([...clipTrianglesX(mesh, [5, Infinity]).indices]).toEqual([3, 4, 5]);
    expect([...clipTrianglesX(mesh, [-Infinity, 5]).indices]).toEqual([0, 1, 2]);
  });
});

describe('readConcepts', () => {
  it('lists element files by concept name, skipping the header', () => {
    const concepts = readConcepts(
      [
        'concept id\tname\telement file id',
        'FMA1\tbone organ\tFJ1',
        'FMA1\tbone organ\tFJ2',
        '',
      ].join('\r\n'),
    );
    expect(concepts.get('bone organ')).toEqual(['FJ1', 'FJ2']);
    expect(concepts.has('name')).toBe(false);
  });
});

describe('MODELS', () => {
  it('names every mesh of a model with a unique part id used by the content', () => {
    for (const model of MODELS) {
      const ids = model.parts.map((part) => part.id);
      expect(new Set(ids).size, model.name).toBe(ids.length);
    }
    const [shoulder] = MODELS;
    expect(shoulder?.parts.map((part) => part.id)).toEqual(
      expect.arrayContaining(['clavicle', 'humerus', 'axillary-artery', 'pec-minor']),
    );
  });
});

describe('content and models', () => {
  const meshes = (name) =>
    MODELS.find((model) => model.name === name)?.parts.map((part) => part.id);

  it('has a mesh for every part the content can show', () => {
    expect(meshes('shoulder-chest')).toEqual(expect.arrayContaining(SHOULDER_PART_IDS));
    expect(meshes('body')).toEqual(expect.arrayContaining(BODY_MODEL.parts.map((part) => part.id)));
  });
});
