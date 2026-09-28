import { describe, expect, it } from 'vitest';

import {
  type Activity,
  ACTIVITY_DAYS,
  bestStreak,
  currentStreak,
  dayOf,
  lastDays,
  logActivity,
  mergeActivity,
} from './activity';

// Midday local time, so the local date is the one written.
const at = (day: string) => new Date(`${day}T12:00:00`);
const studyDay = (minutes: number) => ({
  minutes,
  lessons: [],
  drills: [],
  answered: 0,
  reviewed: 0,
});

describe('logActivity', () => {
  it('adds up the day: lesson and drill lengths, a minute a question, half a minute a card', () => {
    let activity: Activity = {};
    const now = at('2026-09-28');
    activity = logActivity(activity, { kind: 'lesson', topicSlug: 'axilla', minutes: 12 }, now);
    activity = logActivity(activity, { kind: 'lesson', topicSlug: 'axilla', minutes: 12 }, now);
    activity = logActivity(activity, { kind: 'drill', topicSlug: 'axilla', minutes: 10 }, now);
    activity = logActivity(activity, { kind: 'answer' }, now);
    activity = logActivity(activity, { kind: 'review' }, now);
    expect(dayOf(activity, now)).toEqual({
      minutes: 35.5,
      lessons: ['axilla'],
      drills: ['axilla'],
      answered: 1,
      reviewed: 1,
    });
    expect(dayOf(activity, at('2026-09-29')).minutes).toBe(0);
  });

  it('forgets days older than the window', () => {
    const old = { '2026-07-01': studyDay(20) };
    const later = logActivity(old, { kind: 'answer' }, at('2026-09-28'));
    expect(Object.keys(later)).toEqual(['2026-09-28']);
    expect(ACTIVITY_DAYS).toBeGreaterThan(30);
  });
});

describe('streaks', () => {
  const activity: Activity = {
    '2026-09-20': studyDay(10),
    '2026-09-21': studyDay(10),
    '2026-09-22': studyDay(10),
    '2026-09-26': studyDay(5),
    '2026-09-27': studyDay(5),
  };

  it('counts days in a row up to today, not broken by a day not yet studied', () => {
    expect(currentStreak(activity, at('2026-09-28'))).toBe(2);
    expect(currentStreak({ ...activity, '2026-09-28': studyDay(3) }, at('2026-09-28'))).toBe(3);
    expect(currentStreak(activity, at('2026-09-29'))).toBe(0);
  });

  it('keeps the best run on record', () => {
    expect(bestStreak(activity)).toBe(3);
    expect(bestStreak({})).toBe(0);
  });

  it('lists the last seven days oldest first, ending today', () => {
    const week = lastDays(activity, at('2026-09-28'));
    expect(week.map((day) => day.day)).toEqual([
      '2026-09-22',
      '2026-09-23',
      '2026-09-24',
      '2026-09-25',
      '2026-09-26',
      '2026-09-27',
      '2026-09-28',
    ]);
    expect(week.map((day) => day.minutes)).toEqual([10, 0, 0, 0, 5, 5, 0]);
  });
});

describe('mergeActivity', () => {
  it('keeps the most of each count and every item from both devices', () => {
    const phone: Activity = {
      '2026-09-28': { minutes: 12, lessons: ['axilla'], drills: [], answered: 2, reviewed: 0 },
    };
    const account: Activity = {
      '2026-09-27': studyDay(5),
      '2026-09-28': {
        minutes: 8,
        lessons: ['brachial-plexus'],
        drills: [],
        answered: 4,
        reviewed: 6,
      },
    };
    expect(mergeActivity(phone, account)).toEqual({
      '2026-09-27': studyDay(5),
      '2026-09-28': {
        minutes: 12,
        lessons: ['axilla', 'brachial-plexus'],
        drills: [],
        answered: 4,
        reviewed: 6,
      },
    });
  });
});
