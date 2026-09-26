import { buildTodayPlan, EMPTY_PROGRESS } from '@medlearn/core';
import { describe, expect, it } from 'vitest';

import { PLANNABLE_TOPICS } from '@/content/topics';

import { SCENARIOS } from './scenarios';

const NOW = new Date('2026-09-26T09:00:00.000Z');
const plan = (id: string) => {
  const scenario = SCENARIOS.find((item) => item.id === id);
  if (!scenario) throw new Error(`No scenario ${id}`);
  return buildTodayPlan(PLANNABLE_TOPICS, scenario.build(NOW), NOW);
};

describe('facilitator scenarios', () => {
  it('put Today into the state each usability task needs', () => {
    expect(SCENARIOS[0]?.build(NOW)).toBe(EMPTY_PROGRESS);
    expect(plan('new-student').items[0]).toMatchObject({ kind: 'learn' });
    expect(plan('missed-days')).toMatchObject({ mode: 'catch-up', missedDays: 4 });
    expect(plan('exam-close')).toMatchObject({ mode: 'exam', examInDays: 12 });
    expect(plan('exam-close').items[0]).toMatchObject({ kind: 'drill' });
  });
});
