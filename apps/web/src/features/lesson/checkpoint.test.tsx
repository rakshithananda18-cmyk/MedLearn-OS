import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { completeLesson, resetProgress } from '@/features/progress/store';
import { LessonModeTile } from '@/features/topic/LessonModeTile';

import {
  clearLessonStep,
  lessonAction,
  lessonStepOf,
  MAX_CHECKPOINTS,
  saveLessonStep,
} from './checkpoint';

const KEY = 'ml-lesson-steps-v1';
const saved = () => JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, unknown>;

afterEach(() => {
  act(() => resetProgress());
  localStorage.removeItem(KEY);
});

describe('lesson checkpoints', () => {
  it('keeps a step past the first, and forgets it on the first step or when cleared', () => {
    saveLessonStep('axilla', 3);
    expect(lessonStepOf(saved() as never, 'axilla')).toBe(3);
    saveLessonStep('axilla', 0);
    expect(saved()).not.toHaveProperty('axilla');
    saveLessonStep('axilla', 2);
    clearLessonStep('axilla');
    expect(saved()).not.toHaveProperty('axilla');
  });

  it(`remembers at most ${MAX_CHECKPOINTS} lessons, forgetting the oldest`, () => {
    for (let index = 0; index <= MAX_CHECKPOINTS; index += 1) {
      saveLessonStep(`topic-${index}`, 1, index);
    }
    expect(Object.keys(saved())).toHaveLength(MAX_CHECKPOINTS);
    expect(saved()).not.toHaveProperty('topic-0');
    expect(saved()).toHaveProperty(`topic-${MAX_CHECKPOINTS}`);
  });

  it('words the lesson action from progress', () => {
    expect(lessonAction(false, null)).toBe('Start lesson');
    expect(lessonAction(false, 2)).toBe('Continue lesson');
    expect(lessonAction(true, null)).toBe('Go over the lesson');
    expect(lessonAction(true, 2)).toBe('Continue lesson');
  });

  it('gives the topic page a lesson tile that follows the student', () => {
    render(
      <ul>
        <LessonModeTile slug="pectoral-region" steps={8} minutes={15} />
      </ul>,
    );
    expect(screen.getByRole('link', { name: /Start lesson\s*8 steps · 15 min/ })).toHaveAttribute(
      'href',
      '/learn/pectoral-region/lesson',
    );
    act(() => saveLessonStep('pectoral-region', 2));
    expect(
      screen.getByRole('link', { name: /Continue lesson\s*Step 3 of 8 · 15 min/ }),
    ).toBeVisible();
    act(() => {
      clearLessonStep('pectoral-region');
      completeLesson('pectoral-region', 15);
    });
    expect(screen.getByRole('link', { name: /Go over the lesson/ })).toBeVisible();
  });
});
