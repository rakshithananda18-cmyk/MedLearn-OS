'use client';

import {
  addDays,
  goalSchedule,
  goalToday,
  type LearnerProgress,
  type PlanDay,
  planStart,
  planStatus,
  planWeek,
  type StudyGoal,
} from '@medlearn/core';
import { Button, buttonClasses, cx, Icon, IconButton, ringFill } from '@medlearn/ui';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Hourglass,
  ListChecks,
} from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import type { TopicSummary } from '@/content/topics';
import { updateGoal } from '@/features/progress/store';

import { dateName, dayName, KIND_NAME, minutesText, topicHref, topicMinutes } from './words';

export const GLASS = 'rounded-xl border border-glass-border bg-glass shadow-glass';
export const LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';
const PANEL = 'flex flex-col gap-3 rounded-lg bg-surface p-4';

const DAY_WORD: Record<PlanDay['state'], string> = {
  done: 'studied',
  missed: 'missed',
  today: 'today',
  ahead: 'coming up',
  rest: 'a day off',
  outside: 'not in the plan',
};

/** One day of the week strip: a tick when studied, a gap when missed, the topics still to come. */
function DayDot({ day, today }: Readonly<{ day: PlanDay; today: string }>) {
  const count = day.topics.length;
  const dot = cx(
    'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
    day.state === 'done' && 'bg-primary text-on-primary',
    day.state === 'missed' && 'border-2 border-dashed border-warning text-warning',
    day.state === 'today' && 'border-4 border-primary text-primary-strong',
    day.state === 'ahead' && 'border border-border-strong text-ink',
    day.state === 'rest' && 'bg-surface-muted text-fg-muted',
    day.state === 'outside' && 'text-fg-muted opacity-40',
  );
  let mark: React.ReactNode = count > 0 ? count : '';
  if (day.state === 'done') mark = <Icon icon={Check} size="sm" />;
  else if (day.state === 'rest') mark = '–';
  return (
    <li className="flex flex-col items-center gap-1">
      <span aria-hidden="true" className={dot}>
        {mark}
      </span>
      <span
        className={cx('text-xs', day.date === today ? 'font-semibold text-ink' : 'text-fg-muted')}
      >
        {dayName(day.date).split(',')[0]} {Number(day.date.slice(8))}
      </span>
      <span className="sr-only">
        {dayName(day.date)}: {DAY_WORD[day.state]}
        {count > 0 && day.state !== 'done' ? `, ${count} ${count === 1 ? 'topic' : 'topics'}` : ''}
      </span>
    </li>
  );
}

/**
 * A plan at a glance: how far through it is, the week day by day (with earlier and later weeks a
 * tap away), what was missed, when it finishes at today's pace, and the way to carry on.
 */
export function PlanCard({
  goal,
  progress,
  today,
  topics,
}: Readonly<{
  goal: StudyGoal;
  progress: LearnerProgress;
  today: string;
  topics: Map<string, TopicSummary>;
}>) {
  const [offset, setOffset] = useState(0);
  const status = planStatus(goal, progress, today, (slug) => topicMinutes(goal, topics.get(slug)));
  const week = planWeek(goal, progress, today, offset);
  const next = goalToday(goal, today, progress.completedLessons).topics[0];
  // On a day off, the next day with topics.
  const coming = goalSchedule(goal, today, progress.completedLessons)[0]?.date;
  const share = status.done / Math.max(1, status.total);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const titleId = `plan-${goal.id}`;
  const started = planStart(goal);

  return (
    <article aria-labelledby={titleId} className={cx(GLASS, 'flex flex-col gap-4 p-4')}>
      <header className="flex flex-wrap items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className={LABEL}>
            {KIND_NAME[goal.kind]}
            {status.state === 'active' ? ` · week ${status.week} of ${status.weeks}` : ''}
            {status.state === 'ended' ? ` · date passed, ${status.total - status.done} left` : ''}
            {status.state === 'completed' ? ' · every topic done' : ''}
          </span>
          <h2 id={titleId} className="text-xl font-semibold text-ink">
            {goal.title}
          </h2>
          <span className="text-xs text-fg-muted" suppressHydrationWarning>
            {started > today ? 'Starts' : 'Started'} {dayName(started)} · done by{' '}
            {dayName(goal.date)}
          </span>
        </div>
        <Link
          href={`/plan/${goal.id}`}
          className={buttonClasses({ variant: 'secondary', size: 'sm' })}
        >
          <Icon icon={CalendarDays} size="sm" />
          Open calendar
        </Link>
      </header>

      <div className="order-2 grid gap-3 md:grid-cols-2">
        <section aria-label="Overall progress" className={cx(PANEL, 'flex-row items-center gap-4')}>
          <div className="relative size-24 shrink-0">
            <svg viewBox="0 0 88 88" className="size-24 -rotate-90" aria-hidden="true">
              <circle
                cx="44"
                cy="44"
                r={radius}
                fill="none"
                strokeWidth="9"
                className="stroke-border"
              />
              <circle
                cx="44"
                cy="44"
                r={radius}
                fill="none"
                strokeWidth="9"
                strokeLinecap="round"
                style={ringFill(circumference, share)}
                className="ring-fill stroke-primary"
              />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-gold font-display text-2xl">{Math.round(share * 100)}%</span>
              <span className="text-xs text-fg-muted">done</span>
            </span>
          </div>
          <dl className="flex flex-1 flex-col gap-1 text-sm">
            {[
              ['Topics', `${status.done} / ${status.total}`],
              [
                'Estimated work',
                `${minutesText(status.minutesDone)} / ${minutesText(status.minutesTotal)}`,
              ],
              ['Missed days', String(status.missedDays)],
            ].map(([term, value]) => (
              <div key={term} className="flex justify-between gap-3">
                <dt className="text-fg-muted">{term}</dt>
                <dd className="text-right font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-label="Week by day" className={PANEL}>
          <div className="flex items-center gap-2">
            <span className="flex-1 text-sm font-semibold text-ink" suppressHydrationWarning>
              Week {status.week + offset}
              <span className="font-normal text-fg-muted">
                {' · '}
                {dateName(week[0]?.date ?? today)} to {dateName(week.at(-1)?.date ?? today)}
              </span>
            </span>
            <IconButton
              icon={ChevronLeft}
              label="Earlier week"
              size="sm"
              disabled={status.week + offset <= 1}
              onClick={() => setOffset(offset - 1)}
            />
            <IconButton
              icon={ChevronRight}
              label="Later week"
              size="sm"
              disabled={status.week + offset >= status.weeks}
              onClick={() => setOffset(offset + 1)}
            />
          </div>
          <ol className="grid grid-cols-7 gap-1">
            {week.map((day) => (
              <DayDot key={day.date} day={day} today={today} />
            ))}
          </ol>
        </section>
      </div>

      {/* On phones the way to carry on comes before the ring and the week. */}
      <footer className="order-1 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg bg-surface px-4 py-3 text-sm md:order-3">
        <span className="flex items-center gap-2 text-fg-muted">
          <Icon icon={ListChecks} size="sm" />
          Topics left
          <span className="font-semibold text-ink">{status.total - status.done}</span>
        </span>
        <span className="flex items-center gap-2 text-fg-muted" suppressHydrationWarning>
          <Icon icon={Hourglass} size="sm" />
          {status.finishOn ? 'Finishes' : status.state === 'ended' ? 'Date passed' : 'Finished'}
          <span className="font-semibold text-ink">
            {status.finishOn ? dayName(status.finishOn) : null}
            {!status.finishOn && status.state === 'ended' ? dayName(goal.date) : null}
            {!status.finishOn && status.state === 'completed' ? 'every topic' : null}
          </span>
        </span>
        <span className="flex-1" />
        {next ? (
          <Link href={topicHref(goal, next)} className={buttonClasses({ size: 'sm' })}>
            Continue: {topics.get(next)?.title ?? next}
            <Icon icon={ChevronRight} size="sm" />
          </Link>
        ) : status.state === 'ended' ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => updateGoal(goal.id, { date: addDays(today, 7) })}
          >
            Give it another week
          </Button>
        ) : (
          <span className="text-fg-muted" suppressHydrationWarning>
            {status.state === 'active' && coming ? `Next on ${dayName(coming)}` : ''}
          </span>
        )}
      </footer>
    </article>
  );
}
