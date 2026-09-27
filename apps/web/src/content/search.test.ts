import { describe, expect, it } from 'vitest';

import { searchTopics } from './search';

describe('searchTopics', () => {
  it('finds a topic by title first, then the material inside it', () => {
    const results = searchTopics('brachial plexus');
    expect(results[0]).toMatchObject({ kind: 'Topic', href: '/learn/brachial-plexus' });
    expect(results.length).toBeGreaterThan(1);
  });

  it('needs every word, ignores case and accents, and links to the right place', () => {
    const results = searchTopics('KLUMPKE hand');
    expect(results.length).toBeGreaterThan(0);
    for (const result of results) {
      expect(result.topicTitle).toBe('Brachial plexus');
      expect(result.excerpt.toLowerCase()).toContain('klumpke');
    }
    expect(searchTopics('klumpke oxygen')).toEqual([]);
    // Accents and case fold away: “ÉRB” finds Erb's palsy.
    expect(searchTopics('ÉRB').length).toBeGreaterThan(0);
  });

  it('ignores searches with no word of two letters or more', () => {
    expect(searchTopics('  a ')).toEqual([]);
  });

  it('shortens long text around the word searched for', () => {
    const [lesson] = searchTopics('bohr effect');
    expect(lesson?.excerpt.length).toBeLessThanOrEqual(162);
    expect(lesson?.excerpt.toLowerCase()).toContain('bohr');
  });
});
