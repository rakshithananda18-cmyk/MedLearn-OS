import type { TodayItem } from '@medlearn/core';
import { buttonClasses, cx, Eyebrow, Icon, Text } from '@medlearn/ui';
import { Box, Check, Flame, Play } from '@medlearn/ui/icons';
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
        'relative flex animate-rise flex-col justify-between gap-6 overflow-hidden p-4 md:p-8',
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
          className="font-display text-3xl tracking-display text-ink text-balance md:text-5xl"
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

export interface Tally {
  label: string;
  detail: string;
  count: number;
  href: string;
}

/** Counts of what is waiting, each a way in: cards to recall, questions, exam diagrams. */
export function Tallies({
  tallies,
  className,
}: Readonly<{ tallies: Tally[]; className?: string }>) {
  return (
    <ul aria-label="Waiting for you" className={cx('grid grid-cols-3 gap-3', className)}>
      {tallies.map((tally) => (
        <li key={tally.label}>
          <Link
            href={tally.href}
            className="flex h-full flex-col rounded-lg border border-glass-border bg-glass p-3 shadow-glass transition-colors hover:border-gold @5xl:flex-row @5xl:items-center @5xl:gap-4 @5xl:p-4"
          >
            <span className="text-gold font-display text-4xl @5xl:text-5xl">{tally.count}</span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-ink">{tally.label}</span>
              <span className="text-xs text-fg-muted">{tally.detail}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Today's plan: what is done, ticked off, then what is left, each a link in with its minutes. */
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
  const row = 'flex min-h-12 items-center gap-3 border-t border-border py-2';
  return (
    <section
      aria-labelledby="plan-title"
      className={cx(GLASS, 'flex flex-col self-start px-4 pt-3 pb-1', className)}
    >
      <div className="flex items-center justify-between gap-3 pb-2">
        <h2 id="plan-title" className={LABEL}>
          Today’s plan
        </h2>
        <span className="text-sm font-semibold text-primary-strong">
          {planned} of {goal} min
        </span>
      </div>
      <ol aria-label="Today's plan">
        {done.map((text) => (
          <li key={text} className={row}>
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-on-primary">
              <Icon icon={Check} size="sm" />
            </span>
            <span className="flex-1 text-sm text-fg-muted line-through">{text}</span>
            <span className="sr-only">Done</span>
          </li>
        ))}
        {items.map((item, index) => {
          const { title, href } = describe(item);
          return (
            <li key={`${item.kind}-${href}`}>
              <Link href={href} className={cx(row, 'group')}>
                <span
                  aria-hidden="true"
                  className={cx(
                    'size-6 shrink-0 rounded-full',
                    index === 0
                      ? 'border-4 border-gold bg-surface'
                      : 'border-2 border-border-strong',
                  )}
                />
                <span className="flex-1 text-sm font-semibold text-ink group-hover:underline">
                  {title}
                </span>
                <span
                  className={cx(
                    'shrink-0 text-xs',
                    index === 0 ? 'font-semibold text-gold-ink' : 'text-fg-muted',
                  )}
                >
                  {item.minutes} min
                </span>
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

function hoursAndMinutes(minutes: number): string {
  const whole = Math.round(minutes);
  const hours = Math.floor(whole / 60);
  return hours > 0 ? `${hours} h ${whole % 60} min` : `${whole} min`;
}

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
      className={cx(GLASS, 'flex flex-col gap-4 p-4 @5xl:p-6', className)}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-gold font-display text-5xl" suppressHydrationWarning>
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

/** This week's study time: the total, and a bar for each day, today in the accent colour. */
export function WeekCard({ week, className }: Readonly<{ week: Week; className?: string }>) {
  const most = Math.max(...week.map((day) => day.minutes), 1);
  const total = week.reduce((sum, day) => sum + day.minutes, 0);
  return (
    <section
      aria-labelledby="week-title"
      className={cx(GLASS, 'flex flex-col gap-4 p-4', className)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="week-title" className={LABEL}>
          This week
        </h2>
        <span className="text-sm font-semibold text-ink" suppressHydrationWarning>
          {hoursAndMinutes(total)}
        </span>
      </div>
      <ol aria-label="Minutes studied this week" className="grid h-24 grid-cols-7 items-end gap-2">
        {week.map((day, index) => (
          <li key={day.day} className="flex h-full flex-col items-center justify-end gap-1">
            <span
              className={cx(
                'w-full rounded-sm',
                index === week.length - 1 ? 'bg-primary' : 'bg-gold',
                day.minutes === 0 && 'bg-border',
              )}
              style={{ height: `${Math.max(6, (day.minutes / most) * 100)}%` }}
            />
            <span
              className={cx(
                'text-xs',
                index === week.length - 1 ? 'font-semibold text-primary-strong' : 'text-fg-muted',
              )}
              suppressHydrationWarning
            >
              {letter(day.day)}
            </span>
            <span className="sr-only" suppressHydrationWarning>
              {Math.round(day.minutes)} minutes
            </span>
          </li>
        ))}
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
      className={cx(GLASS, 'flex items-center gap-4 p-4 @5xl:p-6', className)}
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
}: Readonly<{ spots: Array<{ title: string; count: number }>; className?: string }>) {
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
              href="/revise"
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
