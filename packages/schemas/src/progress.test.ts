import { describe, expect, it } from 'vitest';

import { ContentReportInput, LearnerProgressInput } from './progress';

const progress = {
  profile: { year: 1, examDate: '2026-12-01', dailyMinutes: 20, adult: true },
  completedLessons: ['brachial-plexus'],
  completedDrills: [],
  correctAnswers: ['bp-q1'],
  mistakes: ['bp-q2'],
  reviews: {
    'bp-card-1': {
      due: '2026-09-26T11:14:12.668Z',
      stability: 2.3,
      difficulty: 2.1,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: 1,
      lapses: 0,
      learning_steps: 1,
      state: 1,
      last_review: '2026-09-26T11:04:12.668Z',
    },
  },
  lastActiveAt: '2026-09-26T11:04:12.668Z',
  catchUpAcceptedOn: null,
  updatedAt: '2026-09-26T11:04:12.668Z',
};

describe('LearnerProgressInput', () => {
  it('accepts progress as the app stores it', () => {
    expect(LearnerProgressInput.safeParse(progress).success).toBe(true);
  });

  it('rejects malformed or oversized progress', () => {
    expect(LearnerProgressInput.safeParse({ ...progress, completedLessons: 'all' }).success).toBe(
      false,
    );
    const huge = Array.from({ length: 5001 }, (_, index) => `q${index}`);
    expect(LearnerProgressInput.safeParse({ ...progress, mistakes: huge }).success).toBe(false);
    const badProfile = { ...progress, profile: { ...progress.profile, year: 7 } };
    expect(LearnerProgressInput.safeParse(badProfile).success).toBe(false);
  });
});

describe('ContentReportInput', () => {
  it('accepts a report and trims the note', () => {
    const report = ContentReportInput.parse({
      topicSlug: 'brachial-plexus',
      contentVersion: '0.1.0',
      kind: 'unclear',
      note: '  Step 3 is confusing  ',
    });
    expect(report.note).toBe('Step 3 is confusing');
  });

  it('rejects unknown kinds and long notes', () => {
    const base = { topicSlug: 'brachial-plexus', contentVersion: '0.1.0' };
    expect(ContentReportInput.safeParse({ ...base, kind: 'rant' }).success).toBe(false);
    expect(
      ContentReportInput.safeParse({ ...base, kind: 'other', note: 'x'.repeat(1001) }).success,
    ).toBe(false);
  });
});
