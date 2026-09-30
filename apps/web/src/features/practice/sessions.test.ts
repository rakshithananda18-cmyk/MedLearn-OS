import { EMPTY_PROGRESS, type LearnerProgress, type PlannableTopic } from '@medlearn/core';
import { describe, expect, it } from 'vitest';

import type { LibraryNode } from '@/content/library';

import { buildSession, sectionStrengths } from './sessions';

const NOW = new Date('2026-09-29T09:00:00.000Z');
const topic = (slug: string, count: number): PlannableTopic => ({
  slug,
  title: slug,
  estimatedMinutes: 10,
  questionIds: Array.from({ length: count }, (_, index) => `${slug}-q${index + 1}`),
  cardIds: [],
  drillMinutes: null,
});
const TOPICS = [topic('plexus', 8), topic('axilla', 8), topic('arm', 8)];
const after = (change: Partial<LearnerProgress>): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  ...change,
});
// No shuffling, so the order shows the rules.
const inOrder = () => 0.999;

describe('buildSession', () => {
  it('mixes ten from the lessons done, questions still to get right first', () => {
    const progress = after({
      completedLessons: ['plexus', 'axilla'],
      correctAnswers: ['plexus-q1', 'plexus-q2'],
    });
    const ids = buildSession('mix', TOPICS, progress, { random: inOrder });
    expect(ids).toHaveLength(10);
    expect(ids.some((id) => id.startsWith('arm'))).toBe(false);
    expect(ids).not.toContain('plexus-q1');
  });

  it('draws on every topic before any lesson is done', () => {
    const ids = buildSession('timed', TOPICS, EMPTY_PROGRESS, { random: inOrder });
    expect(ids).toHaveLength(20);
    expect(new Set(ids.map((id) => id.split('-')[0]))).toEqual(
      new Set(['plexus', 'axilla', 'arm']),
    );
  });

  it('starts weak spots with the questions missed and not yet put right', () => {
    const progress = after({
      completedLessons: ['plexus', 'axilla'],
      mistakes: ['axilla-q3', 'plexus-q1'],
      correctAnswers: ['plexus-q1'],
    });
    const ids = buildSession('weak', TOPICS, progress, { random: inOrder, now: NOW });
    expect(ids[0]).toBe('axilla-q3');
    expect(ids.filter((id) => id === 'axilla-q3')).toHaveLength(1);
    expect(ids).toHaveLength(10);
  });

  it('keeps chosen topics to those topics', () => {
    const ids = buildSession('topics', TOPICS, EMPTY_PROGRESS, { slugs: ['arm'] });
    expect(ids.every((id) => id.startsWith('arm'))).toBe(true);
    expect(ids).toHaveLength(8);
  });
});

describe('sectionStrengths', () => {
  const tree: LibraryNode[] = [
    {
      kind: 'branch',
      id: 'upper-limb',
      label: 'Upper limb',
      children: [
        {
          kind: 'branch',
          id: 'axilla',
          label: 'Axilla',
          children: [
            { kind: 'topic', slug: 'plexus', title: 'Plexus', minutes: 10 },
            { kind: 'topic', slug: 'axilla', title: 'Axilla', minutes: 10 },
          ],
        },
        {
          kind: 'branch',
          id: 'arm',
          label: 'Arm',
          children: [{ kind: 'topic', slug: 'arm', title: 'Arm', minutes: 10 }],
        },
      ],
    },
  ];

  it('marks sections new, weak or strong from mastery and answers', () => {
    const plexus = TOPICS[0]?.questionIds ?? [];
    const progress = after({
      completedLessons: ['arm'],
      correctAnswers: TOPICS[2]?.questionIds ?? [],
      mistakes: plexus.slice(0, 5),
    });
    const strengths = sectionStrengths(tree, TOPICS, progress, NOW);
    expect(strengths.map((section) => [section.label, section.strength])).toEqual([
      ['Axilla', 'weak'],
      ['Arm', 'strong'],
    ]);
    expect(strengths[1]).toMatchObject({ answered: 8, correct: 8, slugs: ['arm'] });
    expect(sectionStrengths(tree, TOPICS, EMPTY_PROGRESS, NOW)[0]?.strength).toBe('new');
  });
});
