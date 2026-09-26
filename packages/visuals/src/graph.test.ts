import { describe, expect, it } from 'vitest';

import { affectedBy, ancestors, descendants, pathThrough } from './graph';

// A small plexus-shaped graph: two roots join a trunk that splits into two nerves.
const edges = [
  { from: 'c5', to: 'upper' },
  { from: 'c6', to: 'upper' },
  { from: 'c7', to: 'middle' },
  { from: 'upper', to: 'lateral' },
  { from: 'middle', to: 'lateral' },
  { from: 'lateral', to: 'musculocutaneous' },
  { from: 'lateral', to: 'median' },
];

describe('graph traversal', () => {
  it('finds everything downstream of a root', () => {
    expect([...descendants(edges, ['c5'])].sort()).toEqual(
      ['lateral', 'median', 'musculocutaneous', 'upper'].sort(),
    );
  });

  it('finds every root that feeds a nerve', () => {
    expect([...ancestors(edges, ['median'])].sort()).toEqual(
      ['c5', 'c6', 'c7', 'lateral', 'middle', 'upper'].sort(),
    );
  });

  it('traces the full path through a node, both directions', () => {
    const path = pathThrough(edges, 'upper');
    expect(path.has('c5') && path.has('median') && path.has('upper')).toBe(true);
    expect(path.has('c7')).toBe(false);
  });

  it('marks lesioned nodes and everything they supply', () => {
    const affected = affectedBy(edges, ['c7']);
    expect([...affected].sort()).toEqual(
      ['c7', 'lateral', 'median', 'middle', 'musculocutaneous'].sort(),
    );
  });
});
