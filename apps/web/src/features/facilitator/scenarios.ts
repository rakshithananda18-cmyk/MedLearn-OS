import { dayKey, EMPTY_PROGRESS, type LearnerProgress } from '@medlearn/core';

const DAY_MS = 86_400_000;

export interface Scenario {
  id: string;
  title: string;
  description: string;
  /** Usability task this state prepares (Usability Round 1 Kit, section 5). */
  task: string;
  build: (now: Date) => LearnerProgress;
}

const FIRST_LESSON_DONE = ['brachial-plexus'];

/** Device states a facilitator sets up between usability tasks. */
export const SCENARIOS: Scenario[] = [
  {
    id: 'new-student',
    title: 'New student',
    description: 'Clears everything on this device: no plan, no progress.',
    task: 'Tasks 1–4',
    build: () => EMPTY_PROGRESS,
  },
  {
    id: 'missed-days',
    title: 'Back after missed days',
    description: 'First lesson done, then four days away. Today shows the catch-up plan.',
    task: 'Task 5',
    build: (now) => ({
      ...EMPTY_PROGRESS,
      profile: { year: 1, examDate: null, dailyMinutes: 20 },
      completedLessons: FIRST_LESSON_DONE,
      lastActiveAt: new Date(now.getTime() - 5 * DAY_MS).toISOString(),
    }),
  },
  {
    id: 'exam-close',
    title: 'Exam in 12 days',
    description: 'First lesson done and an exam close by. Today leads with the diagram drill.',
    task: 'Task 6',
    build: (now) => ({
      ...EMPTY_PROGRESS,
      profile: {
        year: 1,
        examDate: dayKey(new Date(now.getTime() + 12 * DAY_MS)),
        dailyMinutes: 20,
      },
      completedLessons: FIRST_LESSON_DONE,
      lastActiveAt: now.toISOString(),
    }),
  },
];
