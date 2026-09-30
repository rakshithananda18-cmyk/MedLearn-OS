import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { ATLAS, platesFor } from './atlas';
import { TOPICS } from './topics';

const PUBLIC = join(__dirname, '..', '..', 'public');

describe('body atlas', () => {
  it('has a file, a credit and a source for every plate, and real topics for every system', () => {
    const slugs = new Set(TOPICS.map((topic) => topic.slug));
    for (const system of ATLAS) {
      expect(system.plates.length).toBeGreaterThan(0);
      for (const plate of system.plates) {
        expect(existsSync(join(PUBLIC, 'atlas', `${plate.id}.webp`))).toBe(true);
        expect(plate.credit).toMatch(/public domain|CC BY/);
        expect(plate.source).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      }
      for (const slug of system.topics) expect(slugs).toContain(slug);
    }
  });

  it('shows the plates for the body chosen, or says the other body is still to come', () => {
    const system = (id: string) => ATLAS.find((item) => item.id === id);
    const skeleton = system('skeleton');
    const lymph = system('lymph');
    if (!skeleton || !lymph) throw new Error('missing systems');
    expect(platesFor(skeleton, 'female')).toMatchObject({ missing: false });
    expect(platesFor(skeleton, 'female').plates).toHaveLength(2);
    expect(platesFor(lymph, 'female')).toMatchObject({ missing: false });
    expect(platesFor(lymph, 'male')).toMatchObject({ missing: true });
    expect(platesFor(lymph, 'male').plates[0]?.id).toBe('lymph-female');
  });
});
