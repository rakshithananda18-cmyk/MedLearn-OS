import type { TodayItem } from '@medlearn/core';
import { buttonClasses, cx, Eyebrow, Icon, Text } from '@medlearn/ui';
import { ArrowRight, Check, Rotate3d } from '@medlearn/ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { describe } from './describe';

const GLASS = 'rounded-xl border border-glass-border bg-glass shadow-glass';
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

/** The next thing to do, as the hero of the day: its 3D model on a pedestal when it has one. */
export function UpNext({ item, poster }: Readonly<{ item: TodayItem; poster: string | null }>) {
  const { title, meta, href, kind, icon: Glyph } = describe(item);
  const heading = item.kind === 'learn' ? item.title : title;
  return (
    <section
      aria-labelledby="up-next-title"
      className={cx(GLASS, 'relative flex animate-rise flex-col gap-6 overflow-hidden p-6 md:p-8')}
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
            fetchPriority="high"
            className="pointer-events-none absolute -top-4 -right-6 h-full w-1/2 object-contain md:w-2/5"
          />
        </>
      ) : (
        // Without a model to show, the kind of study stands in, in a gold ring.
        <span
          aria-hidden="true"
          className="absolute top-6 right-6 flex size-24 items-center justify-center rounded-full border-2 border-gold text-gold-ink"
        >
          <Glyph size={40} strokeWidth={1.5} aria-hidden="true" />
        </span>
      )}
      <div className="relative flex w-3/5 flex-col gap-2">
        <Eyebrow>Up next · {kind}</Eyebrow>
        <h2
          id="up-next-title"
          className="font-display text-4xl tracking-display text-ink text-balance md:text-5xl"
        >
          {titled(heading)}
        </h2>
        <Text size="sm" tone="muted">
          {meta}
        </Text>
      </div>
      <div className="relative flex flex-wrap gap-2">
        <Link href={href} className={buttonClasses()}>
          Start now
          <Icon icon={ArrowRight} />
        </Link>
        {item.kind === 'learn' && poster ? (
          <Link href={`/studio?topic=${item.topicSlug}`} className={GLOSS_LINK}>
            <Icon icon={Rotate3d} className="text-gold-ink" />
            Turn it in 3D
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
export function Tallies({ tallies }: Readonly<{ tallies: Tally[] }>) {
  return (
    <ul aria-label="Waiting for you" className="grid grid-cols-3 gap-3">
      {tallies.map((tally) => (
        <li key={tally.label}>
          <Link
            href={tally.href}
            className={cx(GLASS, 'flex h-full flex-col p-3 transition-colors hover:border-gold')}
          >
            <span className="text-gold font-display text-4xl">{tally.count}</span>
            <span className="text-sm font-semibold text-ink">{tally.label}</span>
            <span className="text-xs text-fg-muted">{tally.detail}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Today's plan: what is done, ticked off, then what is left, each a link in. */
export function PlanCard({
  done,
  items,
  planned,
  goal,
}: Readonly<{ done: string[]; items: TodayItem[]; planned: number; goal: number }>) {
  const row = 'flex min-h-12 items-center gap-3 border-t border-border py-2';
  return (
    <section aria-labelledby="plan-title" className={cx(GLASS, 'flex flex-col px-4 pt-4 pb-2')}>
      <div className="flex items-center justify-between gap-3 pb-2">
        <h2
          id="plan-title"
          className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
        >
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
          const { title, meta, href } = describe(item);
          return (
            <li key={`${item.kind}-${href}`}>
              <Link href={href} className={cx(row, 'group')}>
                <span
                  aria-hidden="true"
                  className={cx(
                    'size-6 rounded-full border-2',
                    index === 0 ? 'border-gold bg-surface' : 'border-border-strong',
                  )}
                />
                <span className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-ink group-hover:underline">
                    {title}
                  </span>
                  <span className="text-xs text-fg-muted">{meta}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Streak and the week: a gold day count and a bar for each of the last seven days. */
export function StreakCard({
  streak,
  best,
  week,
}: Readonly<{ streak: number; best: number; week: Array<{ day: string; minutes: number }> }>) {
  const most = Math.max(...week.map((day) => day.minutes), 1);
  const letter = (day: string) =>
    new Date(`${day}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'narrow' });
  return (
    <section aria-labelledby="streak-title" className={cx(GLASS, 'flex flex-col gap-4 p-4 md:p-6')}>
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
            <span className="text-xs text-fg-muted" suppressHydrationWarning>
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
export function TimeRing({ minutes, goal }: Readonly<{ minutes: number; goal: number }>) {
  const done = Math.round(minutes);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const share = Math.min(1, done / Math.max(goal, 1));
  const message =
    done >= goal
      ? 'Today’s goal is done. Anything more is a bonus.'
      : `${goal - done} more ${goal - done === 1 ? 'minute' : 'minutes'} to today’s goal.`;
  return (
    <section
      aria-labelledby="time-title"
      className={cx(GLASS, 'flex items-center gap-4 p-4 md:p-6')}
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
export function WeakSpots({ spots }: Readonly<{ spots: Array<{ title: string; count: number }> }>) {
  if (spots.length === 0) return null;
  return (
    <section aria-labelledby="weak-title" className={cx(GLASS, 'flex flex-col gap-3 p-4 md:p-6')}>
      <h2
        id="weak-title"
        className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
      >
        Weak spots
      </h2>
      <ul className="flex flex-col gap-2">
        {spots.map((spot) => (
          <li key={spot.title}>
            <Link
              href="/revise"
              className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2 hover:bg-surface-muted"
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

/** The way into the 3D body: pick a region and see what is left to learn there. */
export function BodyCard({ learnt, total }: Readonly<{ learnt: number; total: number }>) {
  return (
    <Link
      href="/studio"
      className="relative flex min-h-24 flex-col justify-between gap-3 overflow-hidden rounded-xl bg-ink p-4 text-canvas md:p-6 shadow-glass"
    >
      <Image
        src="/posters/body.webp"
        alt=""
        width={560}
        height={600}
        unoptimized
        className="pointer-events-none absolute -top-2 right-0 h-full w-2/5 object-contain"
      />
      <span className="relative text-xs font-semibold uppercase tracking-eyebrow">
        Pick from the body
      </span>
      <span className="relative w-3/5 font-display text-2xl" suppressHydrationWarning>
        {learnt} of {total} <em>topics learnt</em>
      </span>
    </Link>
  );
}
