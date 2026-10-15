import { describe, expect, it } from 'vitest';

import { libraryTree, toggledTrail, topicsUnder, topicTrails, trailTo } from './library';
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
    // The thorax reuses chapter 12 for its own first section.
    const thorax = tree[1];
    expect(thorax).toMatchObject({ kind: 'branch', label: 'Thorax' });
    if (thorax?.kind !== 'branch') throw new Error('no thorax');
    expect(thorax.children.map((section) => section.kind === 'branch' && section.label)).toEqual([
      'Landmarks, inlet and outlet',
      'Bones and joints',
      'Walls',
      'Pleura',
      'Lungs',
      'Mediastinum',
      'Heart',
      'Great vessels',
      'Trachea, oesophagus and thoracic duct',
      'Surface marking and X-rays',
    ]);
    // Volume 2 restarts the chapter numbers for the lower limb.
    const lowerLimb = tree[2];
    expect(lowerLimb).toMatchObject({ kind: 'branch', label: 'Lower limb' });
    if (lowerLimb?.kind !== 'branch') throw new Error('no lower limb');
    expect(lowerLimb.children.map((section) => section.kind === 'branch' && section.label)).toEqual(
      [
        'Introduction and development',
        'Front of thigh',
        'Medial side of thigh',
        'Gluteal region',
        'Popliteal fossa',
        'Back of thigh',
        'Front and sides of leg',
        'Back of leg',
        'Sole of foot',
        'Drainage and innervation',
        'Joints',
        'Arches of foot',
        'Surface marking and X-rays',
        'Nerves, arteries and clinical terms',
      ],
    );
    const all = tree.flatMap(topicsUnder).map((topic) => topic.slug);
    expect(new Set(all)).toEqual(new Set(bySubject('anatomy').map((topic) => topic.slug)));
    expect(all).toHaveLength(bySubject('anatomy').length);
  });

  it('lists topics with no BD chapter straight under the subject', () => {
    const tree = libraryTree(bySubject('physiology'));
    expect(tree.every((node) => node.kind === 'topic')).toBe(true);
    expect(tree).toHaveLength(bySubject('physiology').length);
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

describe('folding the tree', () => {
  it('finds the branches leading to a topic, by id', () => {
    const tree = libraryTree(bySubject('anatomy'));
    const [region, section] = trailTo(tree, 'brachial-plexus');
    expect(tree.find((node) => node.kind === 'branch' && node.id === region)).toMatchObject({
      label: 'Upper limb',
    });
    expect(section).toBeDefined();
    expect(trailTo(tree, null)).toEqual([]);
  });

  it('keeps one branch open per level', () => {
    // Opening a region, then a section in it.
    expect(toggledTrail([], 0, 'arm')).toEqual(['arm']);
    expect(toggledTrail(['arm'], 1, 'axilla')).toEqual(['arm', 'axilla']);
    // Another section folds the first; another region folds the region and its section.
    expect(toggledTrail(['arm', 'axilla'], 1, 'back')).toEqual(['arm', 'back']);
    expect(toggledTrail(['arm', 'axilla'], 0, 'thorax')).toEqual(['thorax']);
    // The open one folds shut, and with it what was open inside.
    expect(toggledTrail(['arm', 'axilla'], 1, 'axilla')).toEqual(['arm']);
    expect(toggledTrail(['arm', 'axilla'], 0, 'arm')).toEqual([]);
  });
});
