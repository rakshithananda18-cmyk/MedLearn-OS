import { z } from 'zod';

// The Plan page asks the server for a plan: the student's words and only the progress a plan
// needs (no name, email or account id). The server answers with goals the student can edit and
// accept; Today then paces them day by day.

const Slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .max(120);
const LocalDate = z.iso.date();

export const PLAN_REQUEST_MAX = 500;
/** Plans in one answer at most. */
export const PLAN_GOALS_MAX = 6;

export const PlanRequest = z.object({
  request: z.string().trim().min(3).max(PLAN_REQUEST_MAX),
  /** The student's own date, so "Friday" means their Friday. */
  today: LocalDate,
  /** Topics whose lessons are done. */
  learnt: z.array(Slug).max(5000),
  dailyMinutes: z.number().int().min(5).max(240),
  examDate: LocalDate.nullable(),
});
export type PlanRequest = z.infer<typeof PlanRequest>;

export const ProposedGoal = z.object({
  kind: z.enum(['test', 'revisit', 'learn']),
  title: z.string().trim().min(1).max(80),
  topics: z.array(Slug).min(1).max(200),
  date: LocalDate,
  /** The first day of it, when it waits for an earlier part of the plan. */
  from: LocalDate.nullable(),
  /** About how long each day of it takes, at the pace Today keeps. */
  minutesPerDay: z.number().int().nonnegative(),
});
export type ProposedGoal = z.infer<typeof ProposedGoal>;

export const PlanProposal = z.object({
  /** One or two sentences to the student about the plan. */
  reply: z.string().max(600),
  goals: z.array(ProposedGoal).max(PLAN_GOALS_MAX),
  /** A new daily time, when the student asked to change it. */
  dailyMinutes: z.number().int().min(5).max(240).nullable(),
  /** A new exam date, when the student gave one. */
  examDate: LocalDate.nullable(),
  /** Which kind of model made it: a quick one for simple requests, a larger one for the rest. */
  tier: z.enum(['simple', 'complex']),
});
export type PlanProposal = z.infer<typeof PlanProposal>;
