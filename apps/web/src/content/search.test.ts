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
    expect(results.map((result) => result.topicTitle)).toContain('Brachial plexus');
    for (const result of results) {
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

  it('finds a topic while its name is still being typed, or with one letter wrong', () => {
    expect(searchTopics('brach')[0]).toMatchObject({ kind: 'Topic', topicSlug: 'brachial-plexus' });
    expect(searchTopics('brachal plexus')[0]).toMatchObject({
      kind: 'Topic',
      topicSlug: 'brachial-plexus',
    });
    // Short words must be right: a two-letter slip would match almost anything.
    expect(searchTopics('arn')[0]?.kind).not.toBe('Topic');
  });

  it('finds structures from the diagrams and 3D models, leading into the studio', () => {
    const structures = searchTopics('serratus anterior').filter(
      (result) => result.kind === 'Structure',
    );
    expect(structures[0]).toMatchObject({
      excerpt: 'Serratus anterior',
      href: expect.stringMatching(/^\/studio\?topic=/),
    });
  });
});
