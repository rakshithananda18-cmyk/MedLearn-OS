'use client';

import {
  dayKey,
  daysBetween,
  goalDone,
  goalSchedule,
  goalToday,
  type PlanDay,
  planDays,
  planStart,
  planStatus,
  planWeekOf,
  planWeekStart,
} from '@medlearn/core';
import {
  Button,
  buttonClasses,
  cx,
  Dialog,
  Heading,
  Icon,
  ModalClose,
  Text,
  TextField,
  ToggleChip,
} from '@medlearn/ui';
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Hourglass,
  ListChecks,
  Trash2,
} from '@medlearn/ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { LibraryNode } from '@/content/library';
import type { TopicSummary } from '@/content/topics';
import { removeGoal, updateGoal, useProgress } from '@/features/progress/store';

import { GLASS, LABEL } from './PlanCard';
import { TopicPicker } from './TopicPicker';
import {
  dateName,
  dayName,
  KIND_NAME,
  minutesText,
  topicHref,
  topicMinutes,
  WEEKDAYS,
} from './words';

type Tab = 'now' | 'coming' | 'done';

const STATE_WORD: Record<PlanDay['state'], string> = {
  done: 'Studied',
  missed: 'Missed',
  today: 'Today',
  ahead: '',
  rest: 'Day off',
  outside: '',
};

const STATE_TONE: Record<PlanDay['state'], string> = {
  done: 'bg-primary-subtle text-primary-strong',
  missed: 'bg-warning-subtle text-warning',
  today: 'bg-primary text-on-primary',
  ahead: '',
  rest: 'bg-surface-muted text-fg-muted',
  outside: '',
};

/** A figure in the plan's stats row. */
function Stat({
  icon,
  label,
  value,
  of,
}: Readonly<{ icon: typeof CalendarDays; label: string; value: string; of?: string }>) {
  return (
    <div className="flex items-center gap-3 px-2 py-1">
      <Icon icon={icon} className="shrink-0 text-fg-muted" />
      <div className="flex flex-col">
        <span className="text-xs text-fg-muted">{label}</span>
        <span className="font-semibold text-ink" suppressHydrationWarning>
          {value}
        </span>
        {of ? <span className="text-xs text-fg-muted">of {of}</span> : null}
      </div>
    </div>
  );
}

/**
 * One plan, week by week and day by day, to change as life happens: each day's topics (each
 * opens its library page), a day taken off, the study weekdays, the dates and the topics. Today
 * re-paces the plan as soon as anything changes.
 */
export function PlanCalendar({
  id,
  topics,
  tree,
}: Readonly<{ id: string; topics: TopicSummary[]; tree: LibraryNode[] }>) {
  const router = useRouter();
  const progress = useProgress();
  const [tab, setTab] = useState<Tab>('now');
  const [opened, setOpened] = useState<number[]>([]);
  const [picking, setPicking] = useState(false);
  const bySlug = useMemo(() => new Map(topics.map((topic) => [topic.slug, topic])), [topics]);
  const today = dayKey(new Date());
  const goal = progress.goals.find((item) => item.id === id);

  if (!goal) {
    return (
      <div className="flex flex-col items-start gap-3">
        <Heading level={1}>Plan not found</Heading>
        <Text tone="muted">It may have been removed on another device.</Text>
        <Link href="/plan" className={buttonClasses({ variant: 'secondary' })}>
          Back to plans
        </Link>
      </div>
    );
  }

  const start = planStart(goal);
  const minutesOf = (slug: string) => topicMinutes(goal, bySlug.get(slug));
  const status = planStatus(goal, progress, today, minutesOf);
  const done = goalDone(goal, progress.completedLessons);
  const days = planDays(goal, progress, today, start, goal.date);
  const studyDaysAll = days.filter((day) => day.state !== 'rest' && day.state !== 'outside');
  const daysDone = studyDaysAll.filter((day) => day.state === 'done').length;
  const studyDays = goal.days ?? [0, 1, 2, 3, 4, 5, 6];
  const next = goalToday(goal, today, progress.completedLessons).topics[0];
  const coming = goalSchedule(goal, today, progress.completedLessons)[0]?.date;
  const titleOf = (slug: string) => bySlug.get(slug)?.title ?? slug;
  const thisWeek = today < start ? 1 : status.week;

  const allWeeks = Array.from({ length: status.weeks }, (_, index) => index + 1);
  const weeks = allWeeks.filter((week) =>
    tab === 'now' ? week === thisWeek : tab === 'coming' ? week > thisWeek : week < thisWeek,
  );
  const isOpen = (week: number) => (tab === 'now' ? true : opened.includes(week));

  const toggleOff = (date: string) => {
    const off = goal.off ?? [];
    updateGoal(goal.id, {
      off: off.includes(date) ? off.filter((day) => day !== date) : [...off, date],
    });
  };

  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:items-start">
      <header className="flex flex-col gap-1 xl:col-span-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-fg-muted">
          <Link href="/plan" className="hover:text-ink hover:underline">
            Plan
          </Link>
          <Icon icon={ChevronRight} size="sm" />
          <span className="font-semibold text-ink">{goal.title}</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <Heading level={1}>{goal.title}</Heading>
          <span className={cx(LABEL, 'rounded-full bg-surface px-3 py-1')}>
            {KIND_NAME[goal.kind]}
          </span>
        </div>
      </header>

      <div className="flex min-w-0 flex-col gap-4 xl:col-span-2">
        <section
          aria-label="Plan in figures"
          className={cx(GLASS, 'grid grid-cols-2 gap-2 p-3 md:grid-cols-4')}
        >
          <Stat icon={CalendarDays} label="Week" value={`${thisWeek} / ${status.weeks}`} />
          <Stat
            icon={Hourglass}
            label="Time spent"
            value={minutesText(status.minutesDone)}
            of={minutesText(status.minutesTotal)}
          />
          <Stat icon={CalendarDays} label="Started on" value={dateName(start)} />
          <Stat
            icon={ListChecks}
            label="Finishes"
            value={status.finishOn ? dateName(status.finishOn) : 'Done'}
          />
        </section>

        {picking ? (
          <section aria-labelledby="topics-title" className={cx(GLASS, 'flex flex-col gap-3 p-4')}>
            <div className="flex items-center gap-3">
              <Heading level={2} id="topics-title" className="flex-1">
                Topics in this plan
              </Heading>
              <Button size="sm" onClick={() => setPicking(false)}>
                Done
              </Button>
            </div>
            <TopicPicker
              tree={tree}
              chosen={goal.topics}
              onChange={(chosen) => {
                if (chosen.length > 0) updateGoal(goal.id, { topics: chosen });
              }}
              can={(slug) =>
                goal.kind === 'learn'
                  ? !progress.completedLessons.includes(slug) || goal.topics.includes(slug)
                  : goal.kind === 'revisit'
                    ? progress.completedLessons.includes(slug)
                    : true
              }
              learnt={progress.completedLessons}
            />
          </section>
        ) : null}

        <div role="group" aria-label="Which weeks" className="flex flex-wrap gap-2">
          <ToggleChip pressed={tab === 'now'} onClick={() => setTab('now')}>
            This week
          </ToggleChip>
          <ToggleChip pressed={tab === 'coming'} onClick={() => setTab('coming')}>
            Coming up
          </ToggleChip>
          <ToggleChip pressed={tab === 'done'} onClick={() => setTab('done')}>
            Gone by
          </ToggleChip>
        </div>

        {weeks.length === 0 ? (
          <Text size="sm" tone="muted">
            {tab === 'coming' ? 'This is the last week of the plan.' : 'No weeks gone by yet.'}
          </Text>
        ) : null}

        {weeks.map((week) => {
          const inWeek = days.filter(
            (day) => planWeekOf(goal, day.date) === week && day.state !== 'outside',
          );
          const study = inWeek.filter((day) => day.state !== 'rest');
          const open = isOpen(week);
          return (
            <section
              key={week}
              aria-label={`Week ${week}`}
              className={cx(GLASS, 'flex flex-col gap-2 p-3')}
            >
              <button
                type="button"
                aria-expanded={open}
                disabled={tab === 'now'}
                onClick={() =>
                  setOpened(open ? opened.filter((item) => item !== week) : [...opened, week])
                }
                className="flex min-h-12 items-center gap-3 rounded-md px-2 text-left enabled:hover:bg-surface-muted"
              >
                <span className="font-semibold text-ink">Week {week}</span>
                <span className="flex-1 text-sm text-fg-muted">
                  {study.filter((day) => day.state === 'done').length}/{study.length} days studied ·
                  from {dateName(planWeekStart(goal, week))}
                </span>
                {tab === 'now' ? null : (
                  <Icon
                    icon={ChevronDown}
                    size="sm"
                    className={cx('transition-transform', !open && '-rotate-90')}
                  />
                )}
              </button>
              {open ? (
                <ol className="flex flex-col gap-2">
                  {inWeek.map((day) => {
                    const single = goal.off?.includes(day.date) ?? false;
                    const changeable = day.date >= today && (day.state !== 'rest' || single);
                    const minutes = day.topics.reduce((sum, slug) => sum + minutesOf(slug), 0);
                    return (
                      <li
                        key={day.date}
                        className={cx(
                          'flex flex-col rounded-lg bg-surface',
                          day.state === 'today' && 'ring-2 ring-primary',
                        )}
                      >
                        <div className="flex min-h-12 flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2">
                          <Icon icon={CalendarDays} size="sm" className="text-fg-muted" />
                          <span className="font-semibold text-ink">
                            Day {daysBetween(start, day.date) + 1}
                          </span>
                          <span className="text-sm text-fg-muted">
                            {dayName(day.date)}
                            {day.topics.length > 0
                              ? ` · ${day.topics.length} ${day.topics.length === 1 ? 'topic' : 'topics'}`
                              : ''}
                          </span>
                          <span className="flex-1" />
                          {STATE_WORD[day.state] ? (
                            <span
                              className={cx(
                                'rounded-full px-2 py-1 text-xs font-semibold',
                                STATE_TONE[day.state],
                              )}
                            >
                              {STATE_WORD[day.state]}
                            </span>
                          ) : null}
                          {minutes > 0 && day.state !== 'done' ? (
                            <span className="text-xs text-fg-muted">{minutesText(minutes)}</span>
                          ) : null}
                          {changeable ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              aria-label={`${single ? 'Study on' : 'Take off'} ${dayName(day.date)}`}
                              onClick={() => toggleOff(day.date)}
                            >
                              {single ? 'Study this day' : 'Take this day off'}
                            </Button>
                          ) : null}
                        </div>
                        {day.topics.length > 0 ? (
                          <ul className="border-t border-border">
                            {day.topics.map((slug, index) => (
                              <li
                                key={slug}
                                className="flex min-h-12 items-center gap-3 border-b border-border px-3 last:border-b-0"
                              >
                                <span
                                  aria-hidden="true"
                                  className={cx(
                                    'flex size-6 shrink-0 items-center justify-center rounded-full',
                                    done.includes(slug)
                                      ? 'bg-primary text-on-primary'
                                      : 'border border-border-strong',
                                  )}
                                >
                                  {done.includes(slug) ? <Icon icon={Check} size="sm" /> : null}
                                </span>
                                <Link
                                  href={`/learn/${slug}`}
                                  className="min-w-0 flex-1 text-sm text-ink hover:text-primary-strong hover:underline"
                                >
                                  {index + 1}. {titleOf(slug)}
                                  {done.includes(slug) ? (
                                    <span className="sr-only"> (done)</span>
                                  ) : null}
                                </Link>
                                <span className="text-xs text-fg-muted">
                                  {minutesText(minutesOf(slug))}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </section>
          );
        })}
      </div>

      <aside className="flex min-w-0 flex-col gap-4 xl:sticky xl:top-8">
        <section aria-label="Today in this plan" className={cx(GLASS, 'flex flex-col gap-3 p-4')}>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-fg-muted" suppressHydrationWarning>
              Today: {dayName(today)}
            </span>
            <span className={LABEL}>Week {thisWeek}</span>
          </div>
          <p className="text-lg text-ink">
            <span className="font-semibold">
              {Math.round((100 * status.done) / Math.max(1, status.total))}%
            </span>{' '}
            <span className="text-fg-muted">
              · {daysDone} / {studyDaysAll.length} days studied
            </span>
          </p>
          <Text size="sm">
            {status.done} / {status.total} topics done
          </Text>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col rounded-lg bg-surface p-3">
              <span className="text-xs text-fg-muted">Missed days</span>
              <span className="font-semibold text-ink">{status.missedDays}</span>
            </div>
            <div className="flex flex-col rounded-lg bg-surface p-3">
              <span className="text-xs text-fg-muted">Finishes</span>
              <span className="font-semibold text-ink" suppressHydrationWarning>
                {status.finishOn ? dateName(status.finishOn) : 'Done'}
              </span>
            </div>
          </div>
          {next ? (
            <Link href={topicHref(goal, next)} className={buttonClasses({ fullWidth: true })}>
              Continue: {titleOf(next)}
              <Icon icon={ChevronRight} size="sm" />
            </Link>
          ) : (
            <Text size="sm" tone="muted" suppressHydrationWarning>
              {coming ? `Nothing today. Next on ${dayName(coming)}.` : 'Every topic is done.'}
            </Text>
          )}
        </section>

        <section aria-labelledby="adjust-title" className={cx(GLASS, 'flex flex-col gap-3 p-4')}>
          <h2 id="adjust-title" className="font-semibold text-ink">
            Adjust the plan
          </h2>
          <TextField
            label="Name"
            maxLength={80}
            defaultValue={goal.title}
            onBlur={(event) => {
              const title = event.target.value.trim();
              if (title && title !== goal.title) updateGoal(goal.id, { title });
            }}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextField
              label="Start"
              type="date"
              min={today}
              disabled={start <= today}
              value={start}
              onChange={(event) => {
                const from = event.target.value;
                if (from >= today && from <= goal.date) updateGoal(goal.id, { from });
              }}
            />
            <TextField
              label={goal.kind === 'test' ? 'Test date' : 'Done by'}
              type="date"
              min={start > today ? start : today}
              value={goal.date}
              onChange={(event) => {
                const date = event.target.value;
                if (date >= today && date >= start) updateGoal(goal.id, { date });
              }}
            />
          </div>
          <fieldset className="flex flex-col gap-2">
            <legend className="pb-2 text-sm font-medium text-fg">Study on</legend>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map(({ day, short }) => {
                const on = studyDays.includes(day);
                return (
                  <ToggleChip
                    key={day}
                    pressed={on}
                    // At least one day a week stays.
                    disabled={on && studyDays.length === 1}
                    onClick={() => {
                      const chosen = on
                        ? studyDays.filter((item) => item !== day)
                        : [...studyDays, day];
                      updateGoal(goal.id, { days: chosen.length === 7 ? undefined : chosen });
                    }}
                  >
                    {short}
                  </ToggleChip>
                );
              })}
            </div>
          </fieldset>
          <Button variant="secondary" onClick={() => setPicking(!picking)}>
            {picking ? 'Close the topic list' : 'Change topics'}
          </Button>
          <Dialog
            title="Remove this plan?"
            description="Its topics stay in the library, and what you have done stays done."
            trigger={
              <Button variant="ghost" iconStart={Trash2}>
                Remove this plan
              </Button>
            }
            footer={
              <>
                <ModalClose asChild>
                  <Button variant="ghost">Keep it</Button>
                </ModalClose>
                <Button
                  variant="danger"
                  onClick={() => {
                    removeGoal(goal.id);
                    router.push('/plan');
                  }}
                >
                  Remove
                </Button>
              </>
            }
          />
        </section>
      </aside>
    </div>
  );
}
