import type { TodayItem } from '@medlearn/core';
import { buttonClasses, cx, Eyebrow, Icon, Text } from '@medlearn/ui';
import { Box, Check, ChevronRight, Flame, Play } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { describe } from './describe';

const GLASS = 'rounded-xl border border-glass-border bg-glass shadow-glass';
const LABEL = 'text-xs font-semibold uppercase tracking-eyebrow text-gold-ink';
const GLOSS_LINK =
  'inline-flex h-12 items-center gap-2 rounded-full bg-gloss px-4 text-sm font-semibold text-ink shadow-glass transition-transform duration-150 hover:-translate-y-px';

/** "Axilla: walls and contents" with the part after the colon in italics, as the headlines are. */
export function titled(title: string): ReactNode {
  const [lead, ...rest] = title.split(': ');
  return rest.length > 0 ? (
    <>
      {lead}: <em>{rest.join(': ')}</em>
    </>
  ) : (
    title
  );
}

/** The streak as a glossy pill beside the headline: the count on phones, in words from tablets. */
export function StreakPill({
  streak,
  className,
}: Readonly<{ streak: number; className?: string }>) {
  return (
    <p
      className={cx(
        'inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gloss px-4 text-sm font-semibold text-gold-ink shadow-glass',
        className,
      )}
      suppressHydrationWarning
    >
      <Icon icon={Flame} size="sm" />
      <span>
        {streak}
        <span className="sr-only md:not-sr-only">-day streak</span>
      </span>
    </p>
  );
}

/** The next thing to do, as the hero of the day: its 3D model on a pedestal when it has one. */
export function UpNext({
  item,
  poster,
  summary,
  className,
}: Readonly<{
  item: TodayItem;
  poster: string | null;
  summary: string | null;
  className?: string;
}>) {
  const { title, meta, href, kind, action, icon: Glyph } = describe(item);
  const heading = item.kind === 'learn' ? item.title : title;
  return (
    <section
      aria-labelledby="up-next-title"
      className={cx(
        GLASS,
        'relative flex min-h-hero-card animate-rise flex-col justify-between gap-4 overflow-hidden p-4 md:p-6',
        className,
      )}
    >
      {poster ? (
        <>
          <span aria-hidden="true" className="pedestal absolute right-6 bottom-6 h-12 w-2/5" />
          <Image
            src={poster}
            alt=""
            width={560}
            height={600}
            unoptimized
            // The largest thing on Today: fetched from the <head>, not when the layout reaches it.
            preload
            className="pointer-events-none absolute -top-4 -right-6 h-full w-1/2 object-contain md:w-2/5"
          />
        </>
      ) : (
        // Without a model to show, the kind of study stands in, in a gold ring.
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 flex size-20 items-center justify-center rounded-full border-2 border-gold text-gold-ink md:top-8 md:right-8 md:size-24"
        >
          <Glyph size={36} strokeWidth={1.5} aria-hidden="true" />
        </span>
      )}
      <div className="relative flex w-3/5 flex-col gap-2">
        <Eyebrow>Up next · {kind}</Eyebrow>
        <h2
          id="up-next-title"
          className="font-display text-3xl tracking-display text-ink text-balance md:text-4xl"
        >
          {titled(heading)}
        </h2>
        <Text size="sm" tone="muted" weight="semibold">
          {meta}
        </Text>
        {summary ? (
          <Text tone="muted" className="hidden md:block">
            {summary}
          </Text>
        ) : null}
      </div>
      <div className="relative flex flex-wrap gap-2">
        <Link href={href} className={buttonClasses()}>
          <Icon icon={Play} size="sm" />
          {action}
        </Link>
        {item.kind === 'learn' && poster ? (
          <Link href={`/studio?topic=${item.topicSlug}`} className={GLOSS_LINK}>
            <Icon icon={Box} className="text-gold-ink" />
            <span className="sr-only md:not-sr-only">Turn it in</span> 3D
          </Link>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Today's plan, the page's focus: what is done, ticked off, then each step left with its kind,
 * detail and minutes, the next one marked, and a bar for the minutes planned against the goal.
 */
export function PlanCard({
  done,
  items,
  planned,
  goal,
  className,
}: Readonly<{
  done: string[];
  items: TodayItem[];
  planned: number;
  goal: number;
  className?: string;
}>) {
  const row = 'flex min-h-16 items-center gap-3 border-t border-border px-2 py-2';
  return (
    <section aria-labelledby="plan-title" className={cx(GLASS, 'flex flex-col p-4', className)}>
      <div className="flex items-center justify-between gap-3 pb-2">
        <h2 id="plan-title" className="font-semibold text-ink">
          Today’s plan
        </h2>
        <span className="text-sm font-semibold text-primary-strong">
          {planned} of {goal} min
        </span>
      </div>
      <span aria-hidden="true" className="mb-3 h-1 overflow-hidden rounded-full bg-border">
        <span
          className="block h-full rounded-full bg-primary"
          style={{ width: `${Math.min(100, (100 * planned) / Math.max(goal, 1))}%` }}
        />
      </span>
      <ol aria-label="Today's plan">
        {done.map((text) => (
          <li key={text} className={row}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
              <Icon icon={Check} size="sm" />
            </span>
            <span className="flex-1 text-sm text-fg-muted line-through">{text}</span>
            <span className="sr-only">Done</span>
          </li>
        ))}
        {items.map((item, index) => {
          const { title, meta, href, icon: Glyph } = describe(item);
          const first = index === 0;
          return (
            <li key={`${item.kind}-${href}`}>
              <Link
                href={href}
                className={cx(row, 'group rounded-md transition-colors hover:bg-surface-muted')}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'flex size-8 shrink-0 items-center justify-center rounded-full',
                    first ? 'bg-gold text-canvas' : 'bg-surface-muted text-gold-ink',
                  )}
                >
                  <Glyph size={16} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold text-ink">{title}</span>
                  <span className="truncate text-xs text-fg-muted">{meta}</span>
                </span>
                <span
                  className={cx(
                    'shrink-0 text-xs',
                    first ? 'font-semibold text-gold-ink' : 'text-fg-muted',
                  )}
                >
                  {item.minutes} min
                </span>
                <Icon
                  icon={ChevronRight}
                  size="sm"
                  className="shrink-0 text-fg-muted transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

type Week = Array<{ day: string; minutes: number }>;

// A plain lookup: each toLocaleDateString builds a new date formatter, which is slow on phones.
const letter = (day: string) => 'SMTWTFS'.charAt(new Date(`${day}T12:00:00`).getDay());

/** The streak on wide screens: the day count, the best, and a dot for each of the last 7 days. */
export function StreakCard({
  streak,
  best,
  week,
  className,
}: Readonly<{ streak: number; best: number; week: Week; className?: string }>) {
  return (
    <section
      aria-labelledby="streak-title"
      className={cx(GLASS, 'flex flex-col gap-3 p-4', className)}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-gold font-display text-4xl" suppressHydrationWarning>
          {streak}
        </span>
        <span className="flex flex-col">
          <h2 id="streak-title" className="font-semibold text-ink">
            day streak
          </h2>
          <span className="text-xs text-fg-muted" suppressHydrationWarning>
            {best > streak ? `Best ${best} days` : 'Your best yet'}
          </span>
        </span>
      </div>
      <ol aria-label="Days studied this week" className="grid grid-cols-7 gap-1">
        {week.map((day, index) => {
          const today = index === week.length - 1;
          return (
            <li key={day.day} className="flex flex-col items-center gap-1">
              <span
                aria-hidden="true"
                className={cx(
                  'size-6 rounded-full',
                  day.minutes > 0 && (today ? 'bg-primary' : 'bg-gold'),
                  day.minutes === 0 && (today ? 'border-4 border-primary' : 'bg-border'),
                )}
              />
              <span className="text-xs font-semibold text-fg-muted" suppressHydrationWarning>
                {letter(day.day)}
              </span>
              <span className="sr-only" suppressHydrationWarning>
                {day.minutes > 0 ? 'studied' : 'not studied'}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Minutes studied today against the daily goal, as a ring. */
export function TimeRing({
  minutes,
  goal,
  className,
}: Readonly<{ minutes: number; goal: number; className?: string }>) {
  const done = Math.round(minutes);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const share = Math.min(1, done / Math.max(goal, 1));
  const left = goal - done;
  const unit = left === 1 ? 'minute' : 'minutes';
  const message =
    left <= 0
      ? 'Today’s goal is done. Anything more is a bonus.'
      : `${left} more ${unit} to today’s goal.`;
  return (
    <section
      aria-labelledby="time-title"
      className={cx(GLASS, 'flex items-center gap-4 p-4', className)}
    >
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
            strokeDasharray={`${share * circumference} ${circumference}`}
            className="stroke-primary"
          />
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-gold font-display text-3xl" suppressHydrationWarning>
            {done}
          </span>
          <span className="text-xs text-fg-muted">of {goal} min</span>
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h2 id="time-title" className="font-semibold text-ink">
          Studied today
        </h2>
        <Text size="sm" tone="muted" suppressHydrationWarning>
          {message}
        </Text>
      </div>
    </section>
  );
}

/** Topics with missed questions, each waiting as recall cards. */
export function WeakSpots({
  spots,
  className,
}: Readonly<{ spots: Array<{ slug: string; title: string; count: number }>; className?: string }>) {
  if (spots.length === 0) return null;
  return (
    <section
      aria-labelledby="weak-title"
      className={cx(GLASS, 'flex flex-col gap-3 self-start p-4', className)}
    >
      <h2 id="weak-title" className={LABEL}>
        Weak spots
      </h2>
      <ul className="flex flex-col gap-2">
        {spots.map((spot) => (
          <li key={spot.title}>
            <Link
              href={`/revise?topic=${spot.slug}`}
              className="flex min-h-12 items-center gap-3 rounded-md bg-surface px-3 py-2 hover:bg-surface-muted"
            >
              <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
              <span className="flex flex-1 flex-col">
                <span className="text-sm font-semibold text-ink">{spot.title}</span>
                <span className="text-xs text-fg-muted">
                  {spot.count} missed {spot.count === 1 ? 'question' : 'questions'}
                </span>
              </span>
              <span className="text-sm font-semibold text-primary-strong">Recall</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function daysWord(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  return `in ${days} days`;
}

/** Class tests and revisits the student planned, counting down, with the way to plan another. */
export function GoalsCard({
  goals,
  className,
}: Readonly<{
  goals: Array<{
    id: string;
    title: string;
    kind: 'test' | 'revisit';
    daysLeft: number;
    done: number;
    total: number;
  }>;
  className?: string;
}>) {
  return (
    <section
      aria-labelledby="goals-title"
      className={cx(GLASS, 'flex flex-col gap-3 p-4', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="goals-title" className={LABEL}>
          Tests and revisits
        </h2>
        <Link
          href="/practice"
          className="text-sm font-semibold text-primary-strong underline-offset-4 hover:underline"
        >
          {goals.length > 0 ? 'Manage' : 'Plan one'}
        </Link>
      </div>
      {goals.length === 0 ? (
        <Text size="sm" tone="muted">
          A class test coming up? Plan it in Practice and Today fits the revision in.
        </Text>
      ) : (
        <ul className="flex flex-col gap-2">
          {goals.map((goal) => (
            <li key={goal.id} className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-surface text-gold-ink">
                <span className="font-display text-xl leading-none" suppressHydrationWarning>
                  {goal.daysLeft}
                </span>
                <span className="text-xs">{goal.daysLeft === 1 ? 'day' : 'days'}</span>
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold text-ink">{goal.title}</span>
                <span className="text-xs text-fg-muted" suppressHydrationWarning>
                  {goal.kind === 'test' ? 'Test' : 'Revisit by'} {daysWord(goal.daysLeft)} ·{' '}
                  {goal.done} of {goal.total} topics
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
