import { describe, expect, it } from 'vitest';

import { mergeProgress } from './merge';
import { mondayOf, planStatus, planWeek } from './plans';
import {
  addDays,
  EMPTY_PROGRESS,
  goalSchedule,
  goalToday,
  type LearnerProgress,
  studyDay,
  type StudyGoal,
} from './today';

// Monday 19 October 2026.
const MONDAY = '2026-10-19';

const goal = (change: Partial<StudyGoal> = {}): StudyGoal => ({
  id: 'g1',
  kind: 'learn',
  title: 'Upper limb',
  topics: ['a', 'b', 'c', 'd', 'e', 'f'],
  date: addDays(MONDAY, 6),
  done: [],
  createdAt: `${MONDAY}T06:00:00.000Z`,
  ...change,
});

const after = (change: Partial<LearnerProgress>): LearnerProgress => ({
  ...EMPTY_PROGRESS,
  ...change,
});

describe('study days and days off', () => {
  it('spread a plan over its weekdays only, and skip a day taken off', () => {
    // Weekdays only: Monday to Friday, five days for six topics.
    const weekdays = goal({ days: [1, 2, 3, 4, 5] });
    expect(studyDay(weekdays, addDays(MONDAY, 5))).toBe(false);
    expect(goalToday(weekdays, MONDAY).topics).toEqual(['a', 'b']);
    expect(goalToday(weekdays, addDays(MONDAY, 5)).topics).toEqual([]);
    expect(goalSchedule(weekdays, MONDAY).map((day) => day.date)).toEqual([
      MONDAY,
      addDays(MONDAY, 1),
      addDays(MONDAY, 2),
      addDays(MONDAY, 3),
      addDays(MONDAY, 4),
    ]);
    // Tuesday off: its share moves to the days left.
    const tuesdayOff = goal({ off: [addDays(MONDAY, 1)] });
    expect(goalSchedule(tuesdayOff, MONDAY).some((day) => day.date === addDays(MONDAY, 1))).toBe(
      false,
    );
    expect(goalSchedule(tuesdayOff, MONDAY).flatMap((day) => day.topics)).toHaveLength(6);
  });
});

describe('planWeek and planStatus', () => {
  it('show studied, missed, rest and coming days, and how the plan is going', () => {
    const plan = goal({ days: [1, 2, 3, 4, 5, 6] });
    const thursday = addDays(MONDAY, 3);
    const progress = after({
      completedLessons: ['a', 'b'],
      activity: {
        [MONDAY]: { minutes: 30, lessons: ['a', 'b'], drills: [], answered: 0, reviewed: 0 },
        [addDays(MONDAY, 1)]: { minutes: 10, lessons: ['x'], drills: [], answered: 0, reviewed: 0 },
      },
    });
    const week = planWeek(plan, progress, thursday);
    expect(week.map((day) => day.state)).toEqual([
      'done',
      'missed',
      'missed',
      'today',
      'ahead',
      'ahead',
      'rest',
    ]);
    expect(week[0]?.topics).toEqual(['a', 'b']);
    expect(week[3]?.topics.length).toBeGreaterThan(0);

    const status = planStatus(plan, progress, thursday, () => 10);
    expect(status).toMatchObject({
      done: 2,
      total: 6,
      minutesDone: 20,
      minutesTotal: 60,
      missedDays: 2,
      week: 1,
      weeks: 1,
      state: 'active',
    });
    expect(status.finishOn).toBe(addDays(MONDAY, 5));
    expect(mondayOf(addDays(MONDAY, 6))).toBe(MONDAY);
    expect(
      planStatus(plan, after({ completedLessons: plan.topics }), thursday, () => 10),
    ).toMatchObject({ state: 'completed', finishOn: null });
  });
});

describe('merging plans', () => {
  it('keeps the copy changed last, and every topic gone over on either side', () => {
    const phone = goal({
      date: addDays(MONDAY, 20),
      done: ['a'],
      changedAt: `${MONDAY}T10:00:00Z`,
    });
    const account = goal({ date: addDays(MONDAY, 6), done: ['b'] });
    const merged = mergeProgress(
      after({ goals: [phone] }),
      after({ goals: [account] }),
      new Date(`${MONDAY}T12:00:00Z`),
    );
    expect(merged.goals).toMatchObject([{ date: addDays(MONDAY, 20), done: ['b', 'a'] }]);
  });
});
