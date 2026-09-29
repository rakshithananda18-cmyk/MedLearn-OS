import { describe, expect, it } from 'vitest';

import { libraryTree, topicsUnder, topicTrails } from './library';
import { TOPICS } from './topics';

const bySubject = (slug: string) => TOPICS.filter((topic) => topic.subjectSlug === slug);

describe('libraryTree', () => {
  it('groups anatomy by region, then book section, keeping every topic once in order', () => {
    const tree = libraryTree(bySubject('anatomy'));
    const [upperLimb] = tree;
    expect(upperLimb).toMatchObject({ kind: 'branch', label: 'Upper limb' });
    if (upperLimb?.kind !== 'branch') throw new Error('no region');
    expect(upperLimb.children.map((section) => section.kind === 'branch' && section.label)).toEqual(
      [
        'Pectoral region',
        'Axilla',
        'Back',
        'Scapular region',
        'Skin nerves, veins and lymph',
        'Arm',
        'Forearm and hand',
        'Joints',
        'Surface marking and X-rays',
        'Nerves, arteries and development',
      ],
    );
    const axilla = upperLimb.children[1];
    expect(axilla && topicsUnder(axilla).map((topic) => topic.slug)).toEqual([
      'axilla',
      'axillary-vessels',
      'axillary-lymph-nodes',
      'brachial-plexus',
    ]);
    const all = tree.flatMap(topicsUnder).map((topic) => topic.slug);
    expect(new Set(all)).toEqual(new Set(bySubject('anatomy').map((topic) => topic.slug)));
    expect(all).toHaveLength(bySubject('anatomy').length);
  });

  it('lists topics with no BD chapter straight under the subject', () => {
    const tree = libraryTree(bySubject('physiology'));
    expect(tree.every((node) => node.kind === 'topic')).toBe(true);
    expect(tree.length).toBe(bySubject('physiology').length);
    expect(libraryTree([])).toEqual([]);
  });

  it('traces each topic back to its region and section', () => {
    const trails = topicTrails(libraryTree(bySubject('anatomy')));
    expect(trails['brachial-plexus']).toEqual(['Upper limb', 'Axilla']);
    expect(topicTrails(libraryTree(bySubject('physiology')))['oxygen-haemoglobin-curve']).toEqual(
      [],
    );
  });
});
