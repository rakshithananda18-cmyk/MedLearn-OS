import { addDays, daysBetween, goalLoad, type StudyGoal } from '@medlearn/core';
import type { Logger } from '@medlearn/logger/server';
import {
  PLAN_GOALS_MAX,
  type PlanProposal,
  type PlanRequest,
  type ProposedGoal,
} from '@medlearn/schemas';
import { z } from 'zod';

import { askJson, type Tier } from './groq';

// The Plan Maker: a student's words in, study goals out. The model only chooses topics and dates
// from what we give it; our code checks every slug and date, orders topics as the book does and
// works out the daily load, so a plan the app cannot keep never reaches the student.

/** A topic as the planner sees it, in the book's order. */
export interface CatalogueTopic {
  slug: string;
  title: string;
  /** The part of the course it belongs to: a body region, or a subject. */
  group: string;
  /** Minutes for its lesson. */
  learnMinutes: number;
  /** Minutes to go over it again (questions and cards). */
  reviseMinutes: number;
}

/** Days written out for the model, which is poor at counting weekdays on its own. */
const CALENDAR_DAYS = 28;
/** The furthest a plan may reach: a little over a year, the length of an MBBS phase. */
const MAX_DAYS_AHEAD = 400;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekday = (day: string) => WEEKDAYS[new Date(`${day}T12:00:00Z`).getUTCDay()] ?? '';

/**
 * Which model a request needs. A single test, a catch-up or a lighter day is simple; a course,
 * an exam, or anything over weeks or months is worth the larger model's reasoning.
 */
export function pickTier(request: string): Tier {
  const broad =
    /\b(course|syllabus|whole|entire|all|every|year|semester|term|exam|exams|month|months|weeks|finish|complete|by (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))/i;
  return request.length > 160 || broad.test(request) ? 'complex' : 'simple';
}

const SYSTEM = `You plan study for an MBBS student in the MedLearn OS app. Turn the student's request into study goals; the app paces each goal day by day and shows it on their Today page.

Kinds of goal:
- learn: new topics whose lessons must be done by the date (a course, or part of one).
- test: a class test or exam on the date; its topics are revised on the days before it.
- revisit: topics already learnt, to go over again by the date.

Rules:
- Make one goal for each part of the request, dated by when that part must be done: for example one learn goal with every upper limb topic by its date, and another with every thorax topic by its own date. Never split a goal into days or weeks; the app spreads each goal's topics over the days itself.
- Use only topic slugs from the list, exactly as written. Pick every topic that matches what the student names (a region, a chapter, a structure).
- Never put a topic the student has already learnt in a learn goal, and only learnt topics in a revisit goal.
- Dates are YYYY-MM-DD, today or later. Read weekdays from the calendar given; never work them out.
- For a whole course or exam, make learn goals that finish well before the exam (about two weeks before) and leave those weeks for a revisit goal.
- Set dailyMinutes only when the student asks to change their daily time, and examDate only when they give a new exam date; otherwise null.
- reply: one or two plain sentences to the student about the plan. No markdown, no emojis.
- After missed days the app already eases the load and brings back what was due. For a catch-up or a lighter day, make no goal unless the student names topics, and say so in reply.
- If the request is not about planning study, return no goals and say in reply what you can plan.`;

/** The answer's shape, held to strictly by the model. */
export const PLAN_SCHEMA = {
  name: 'study_plan',
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['reply', 'goals', 'dailyMinutes', 'examDate'],
    properties: {
      reply: { type: 'string' },
      goals: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['kind', 'title', 'topics', 'date'],
          properties: {
            kind: { type: 'string', enum: ['learn', 'test', 'revisit'] },
            title: { type: 'string' },
            topics: { type: 'array', items: { type: 'string' } },
            date: { type: 'string' },
          },
        },
      },
      dailyMinutes: { type: ['integer', 'null'] },
      examDate: { type: ['string', 'null'] },
    },
  },
};

/** What the model is told: the request, the calendar, the student's numbers and the topics. */
export function planPrompt(input: PlanRequest, catalogue: CatalogueTopic[]): string {
  const days = Array.from({ length: CALENDAR_DAYS }, (_, index) => addDays(input.today, index + 1));
  const groups = new Map<string, string[]>();
  for (const topic of catalogue) {
    groups.set(topic.group, [...(groups.get(topic.group) ?? []), topic.slug]);
  }
  const exam = input.examDate
    ? `${input.examDate} (${daysBetween(input.today, input.examDate)} days away)`
    : 'none set';
  return [
    `Request: ${JSON.stringify(input.request)}`,
    `Today: ${weekday(input.today)} ${input.today}`,
    `Calendar: ${days.map((day) => `${weekday(day)} ${day}`).join(', ')}`,
    `Daily study time: ${input.dailyMinutes} minutes`,
    `Exam date: ${exam}`,
    `Already learnt (${input.learnt.length}): ${input.learnt.join(', ') || 'none'}`,
    'Topics in the book order, by part:',
    ...[...groups].map(([group, slugs]) => `${group}: ${slugs.join(', ')}`),
  ].join('\n');
}

const RawGoal = z.object({
  kind: z.enum(['learn', 'test', 'revisit']),
  title: z.string(),
  topics: z.array(z.string()),
  date: z.iso.date(),
});

const RawPlan = z
  .object({
    reply: z.string().catch(''),
    goals: z.array(z.unknown()).catch([]),
    dailyMinutes: z.number().nullable().catch(null),
    examDate: z.iso.date().nullable().catch(null),
  })
  // An answer that is not even an object is taken as no plan at all.
  .catch({ reply: '', goals: [], dailyMinutes: null, examDate: null });

const DEFAULT_TITLE: Record<StudyGoal['kind'], string> = {
  learn: 'Learn',
  test: 'Class test',
  revisit: 'Revisit',
};

/** The heaviest day of a goal, in minutes, at the pace Today keeps. */
function busiestDay(
  goal: Pick<StudyGoal, 'kind' | 'topics' | 'date' | 'from'>,
  today: string,
  catalogue: CatalogueTopic[],
): number {
  const minutes = new Map(
    catalogue.map((topic) => [
      topic.slug,
      goal.kind === 'learn' ? topic.learnMinutes : topic.reviseMinutes,
    ]),
  );
  return goalLoad(goal, today, (slug) => minutes.get(slug) ?? 0);
}

/**
 * Makes the model's answer safe to show: unknown slugs and learnt topics (for a goal to learn)
 * dropped, topics in the book's order, dates from today to a year ahead, settings only when they
 * change something. Goals left with no topics or no usable date are dropped.
 */
export function checkPlan(
  raw: unknown,
  input: PlanRequest,
  catalogue: CatalogueTopic[],
): Omit<PlanProposal, 'tier'> {
  const plan = RawPlan.parse(raw);
  const order = new Map(catalogue.map((topic, index) => [topic.slug, index]));
  const last = addDays(input.today, MAX_DAYS_AHEAD);
  const checked = plan.goals
    .flatMap((item) => {
      const goal = RawGoal.safeParse(item);
      if (!goal.success || goal.data.date < input.today) return [];
      const topics = [...new Set(goal.data.topics)]
        .filter((slug) => order.has(slug))
        // A goal to learn takes only new topics; a revisit, only learnt ones.
        .filter((slug) => goal.data.kind !== 'learn' || !input.learnt.includes(slug))
        .filter((slug) => goal.data.kind !== 'revisit' || input.learnt.includes(slug))
        .toSorted((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
      if (topics.length === 0) return [];
      const date = goal.data.date > last ? last : goal.data.date;
      const kind = goal.data.kind;
      const title = goal.data.title.trim().slice(0, 80) || DEFAULT_TITLE[kind];
      return [{ kind, title, topics, date }];
    })
    .slice(0, PLAN_GOALS_MAX);
  // Parts of a course follow one another: each goal to learn starts the day after the one before.
  const learning = checked
    .filter((goal) => goal.kind === 'learn')
    .toSorted((a, b) => a.date.localeCompare(b.date));
  const goals: ProposedGoal[] = checked.map((goal) => {
    const before = learning[learning.indexOf(goal) - 1];
    const from = before && before.date < goal.date ? addDays(before.date, 1) : null;
    return {
      ...goal,
      from,
      minutesPerDay: busiestDay({ ...goal, from: from ?? undefined }, input.today, catalogue),
    };
  });
  const minutes =
    plan.dailyMinutes === null ? null : Math.min(240, Math.max(5, Math.round(plan.dailyMinutes)));
  const exam =
    plan.examDate && plan.examDate >= input.today && plan.examDate <= last ? plan.examDate : null;
  return {
    reply: plan.reply.trim().slice(0, 600) || 'Here is a plan for that.',
    goals,
    dailyMinutes: minutes === input.dailyMinutes ? null : minutes,
    examDate: exam === input.examDate ? null : exam,
  };
}

const changesNothing = (plan: Omit<PlanProposal, 'tier'>) =>
  plan.goals.length === 0 && plan.dailyMinutes === null && plan.examDate === null;

/**
 * A plan for the request: the quick model first when the request is simple, the larger one when
 * it is not, or when the quick one came back with nothing usable.
 */
export async function makePlan(
  input: PlanRequest,
  catalogue: CatalogueTopic[],
  log: Logger,
  ask: typeof askJson = askJson,
): Promise<PlanProposal> {
  const user = planPrompt(input, catalogue);
  const attempt = async (tier: Tier) => {
    const { content } = await ask({ tier, system: SYSTEM, user, schema: PLAN_SCHEMA, log });
    return { ...checkPlan(content, input, catalogue), tier };
  };
  const tier = pickTier(input.request);
  const first = await attempt(tier);
  if (tier === 'complex' || !changesNothing(first)) return first;
  log.info({ tier: 'complex' }, 'plan escalated to the larger model');
  return attempt('complex');
}
