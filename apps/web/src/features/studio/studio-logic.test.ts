import { afterEach, describe, expect, it, vi } from 'vitest';

import { studioTopics } from '@/content/studio';

import { structureInfo, structuresOf } from './knowledge';
import { answerQuiz, nextTarget, skipQuiz, startQuiz } from './quiz';
import { loadBest, loadStrokes, saveBest, saveStrokes } from './saved';

const topics = studioTopics();
const topic = (slug: string) => {
  const found = topics.find((item) => item.slug === slug);
  if (!found) throw new Error(`No topic ${slug}`);
  return found;
};

describe('structureInfo', () => {
  it('tells what a muscle is, what the lesson says, its lesions and where else it appears', () => {
    const info = structureInfo(topic('axilla'), 'serratus', topics);
    expect(info?.name).toBe('Serratus anterior');
    expect(info?.kind).toBe('muscle');
    expect(info?.about).toMatch(/Long thoracic nerve/);
    // A muscle belongs to a wall; it has no route.
    expect(info?.path).toEqual([]);
    expect(info?.lesson.map((step) => step.title)).toContain('Medial and lateral walls');
    expect(info?.clinical.map((lesion) => lesion.label)).toEqual(['Long thoracic nerve injury']);
    expect(info?.alsoIn.map((other) => other.slug)).toContain('pectoral-region');
  });

  it('traces a nerve from its roots and finds every lesion that reaches it', () => {
    const info = structureInfo(topic('brachial-plexus'), 'ulnar', topics);
    expect(info?.path.slice(0, 2)).toEqual(['C8 root', 'T1 root']);
    expect(info?.clinical.map((lesion) => lesion.label)).toEqual(["Klumpke's palsy (C8–T1)"]);
  });

  it('knows nothing about ids the topic does not show', () => {
    expect(structureInfo(topic('axilla'), 'ghost', topics)).toBeNull();
  });

  it('lists every structure on the model, named as in the diagram', () => {
    const names = structuresOf(topic('axilla')).map((item) => item.name);
    expect(names).toContain('Cords of the brachial plexus');
    expect(names).toContain('Serratus anterior');
  });
});

describe('Find it', () => {
  const pool = ['a', 'b', 'c'];
  const first = () => 0;

  it('never asks for the structure just found when there is a choice', () => {
    expect(nextTarget(pool, 'a', first)).toBe('b');
    expect(nextTarget(['a'], 'a', first)).toBe('a');
  });

  it('scores a right tap, keeps the streak and the best, and moves on', () => {
    const start = startQuiz(pool, 1, first);
    expect(start.targetId).toBe('a');
    const right = answerQuiz(answerQuiz(start, 'a', pool, first), 'b', pool, first);
    expect(right).toMatchObject({ score: 2, streak: 2, best: 2, last: 'right' });
  });

  it('breaks the streak on a wrong tap, names what was tapped and asks again', () => {
    const start = answerQuiz(startQuiz(pool, 5, first), 'a', pool, first);
    const wrong = answerQuiz(start, 'c', pool, first);
    expect(wrong).toMatchObject({ targetId: start.targetId, streak: 0, best: 5, picked: 'c' });
    expect(skipQuiz(wrong, pool, first)).toMatchObject({ score: 1, streak: 0, last: null });
  });
});

describe('saved on this phone', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('keeps drawings and best streaks per model', () => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    });
    const stroke = {
      colour: '#000',
      points: [
        [0, 0, 0],
        [1, 1, 1],
      ] as Array<[number, number, number]>,
    };
    saveStrokes('axilla', [stroke]);
    saveBest('axilla', 4);
    expect(loadStrokes('axilla')).toEqual([stroke]);
    expect(loadStrokes('body')).toEqual([]);
    expect(loadBest('axilla')).toBe(4);
  });

  it('carries on without storage', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    expect(loadStrokes('axilla')).toEqual([]);
    expect(() => saveBest('axilla', 1)).not.toThrow();
  });
});
