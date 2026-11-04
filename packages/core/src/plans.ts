import type { Activity } from './activity';
import {
  addDays,
  dayKey,
  daysBetween,
  goalDone,
  goalSchedule,
  goalToday,
  type LearnerProgress,
  studyDay,
  type StudyGoal,
} from './today';

// How a plan (a study goal) is going, for its card and its calendar: progress, missed days, the
// week, and when it finishes at the pace Today keeps.

/** A day of a plan: studied, missed, today, still ahead, a day off, or outside the plan. */
export type PlanDayState = 'done' | 'missed' | 'today' | 'ahead' | 'rest' | 'outside';

export interface PlanDay {
  date: string;
  state: PlanDayState;
  /** Topics learnt that day (done), or set for it (today and ahead). */
  topics: string[];
}

export interface PlanStatus {
  done: number;
  total: number;
  /** Minutes of the topics done, and of all of them. */
  minutesDone: number;
  minutesTotal: number;
  /** Study days gone by with no study at all. */
  missedDays: number;
  /** The last day with topics at today's pace, or null once every topic is done. */
  finishOn: string | null;
  /** Which week of the plan this is, and how many it has. */
  week: number;
  weeks: number;
  state: 'active' | 'completed' | 'ended';
}

/** The first day of a plan: its start day, or the day it was made. */
export const planStart = (goal: StudyGoal): string => goal.from ?? dayKey(new Date(goal.createdAt));

/** The Monday on or before a day. */
export function mondayOf(day: string): string {
  const weekday = new Date(`${day}T12:00:00Z`).getUTCDay();
  return addDays(day, -((weekday + 6) % 7));
}

/** Whether the student studied for a plan that day: a lesson of it, or any study for the rest. */
function studiedFor(goal: StudyGoal, day: string, activity: Activity): boolean {
  const studied = activity[day];
  if (!studied) return false;
  return goal.kind === 'learn'
    ? studied.lessons.some((slug) => goal.topics.includes(slug))
    : studied.minutes > 0;
}

/** Each day of a plan from one day to another: what happened, or what is set for it. */
export function planDays(
  goal: StudyGoal,
  progress: LearnerProgress,
  today: string,
  from: string,
  to: string,
): PlanDay[] {
  const start = planStart(goal);
  const ahead = new Map(
    goalSchedule(goal, today, progress.completedLessons).map((day) => [day.date, day.topics]),
  );
  const days: PlanDay[] = [];
  for (let date = from; date <= to; date = addDays(date, 1)) {
    let state: PlanDayState;
    let topics: string[] = [];
    if (date < start || date > goal.date) state = 'outside';
    else if (!studyDay(goal, date)) state = 'rest';
    else if (date < today) {
      state = studiedFor(goal, date, progress.activity) ? 'done' : 'missed';
      if (goal.kind === 'learn') {
        topics = (progress.activity[date]?.lessons ?? []).filter((slug) =>
          goal.topics.includes(slug),
        );
      }
    } else if (date === today) {
      state = 'today';
      topics = goalToday(goal, today, progress.completedLessons).topics;
    } else {
      state = 'ahead';
      topics = ahead.get(date) ?? [];
    }
    days.push({ date, state, topics });
  }
  return days;
}

/** Which week of a plan a day falls in, counting from the plan's first day (week 1). */
export function planWeekOf(goal: StudyGoal, day: string): number {
  return Math.max(1, Math.floor(daysBetween(planStart(goal), day) / 7) + 1);
}

/** The first day of a week of a plan. */
export const planWeekStart = (goal: StudyGoal, week: number): string =>
  addDays(planStart(goal), (week - 1) * 7);

/** A week of a plan, seven days from its first day on: the current one, or `offset` from it. */
export function planWeek(
  goal: StudyGoal,
  progress: LearnerProgress,
  today: string,
  offset = 0,
): PlanDay[] {
  const first = planWeekStart(goal, planWeekOf(goal, today) + offset);
  return planDays(goal, progress, today, first, addDays(first, 6));
}

/** How a plan is going; `minutesOf` gives each of its topics' time. */
export function planStatus(
  goal: StudyGoal,
  progress: LearnerProgress,
  today: string,
  minutesOf: (slug: string) => number,
): PlanStatus {
  const done = goalDone(goal, progress.completedLessons);
  const start = planStart(goal);
  let missedDays = 0;
  for (let day = start; day < today && day <= goal.date; day = addDays(day, 1)) {
    if (studyDay(goal, day) && !studiedFor(goal, day, progress.activity)) missedDays += 1;
  }
  const sum = (slugs: string[]) => slugs.reduce((total, slug) => total + minutesOf(slug), 0);
  let state: PlanStatus['state'] = 'active';
  if (done.length === goal.topics.length) state = 'completed';
  else if (goal.date < today) state = 'ended';
  return {
    done: done.length,
    total: goal.topics.length,
    minutesDone: sum(done),
    minutesTotal: sum(goal.topics),
    missedDays,
    finishOn: goalSchedule(goal, today, progress.completedLessons).at(-1)?.date ?? null,
    week: planWeekOf(goal, today),
    weeks: planWeekOf(goal, goal.date),
    state,
  };
}
