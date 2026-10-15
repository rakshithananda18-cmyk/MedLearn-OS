import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { TOPICS } from './topics';
import { filmsFor, XRAYS } from './xrays';

const PUBLIC = join(__dirname, '..', '..', 'public');

describe('X-ray films', () => {
  it('each has its file, marks inside the film, and something to look for', () => {
    for (const film of XRAYS) {
      expect(existsSync(join(PUBLIC, 'xrays', `${film.id}.webp`))).toBe(true);
      expect(film.lookFor.length).toBeGreaterThan(0);
      for (const mark of film.marks) {
        expect(mark.x).toBeGreaterThan(0);
        expect(mark.x).toBeLessThan(1);
        expect(mark.y).toBeGreaterThan(0);
        expect(mark.y).toBeLessThan(1);
      }
      expect(film.source).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      // Only the CC0 films share the default credit; any other licence names its own.
      if (film.credit) expect(film.credit).toMatch(/CC BY/);
    }
  });

  it('go with the topics of their part of the limb', () => {
    expect(filmsFor('elbow-joint').map((film) => film.id)).toEqual([
      'elbow-ap',
      'elbow-lateral',
      'elbow-external-oblique',
      'elbow-internal-oblique',
    ]);
    expect(filmsFor('upper-limb-xrays')).toHaveLength(11);
    expect(filmsFor('lower-limb-xrays').map((film) => film.id)).toEqual([
      'hip-ap',
      'ankle-ap',
      'ankle-lateral',
      'ankle-oblique',
    ]);
    expect(filmsFor('upper-limb-xrays').length + filmsFor('lower-limb-xrays').length).toBe(
      XRAYS.length,
    );
    expect(filmsFor('brachial-plexus')).toEqual([]);
    const slugs = new Set(TOPICS.map((topic) => topic.slug));
    for (const topic of [
      'shoulder-joint',
      'carpal-tunnel',
      'hand-muscles',
      'hip-joint',
      'foot-joints',
    ]) {
      expect(slugs).toContain(topic);
      expect(filmsFor(topic).length).toBeGreaterThan(0);
    }
  });
});
