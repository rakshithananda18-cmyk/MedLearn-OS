'use client';

import { dayKey, dueCardIds, goalToday, type StudyGoal } from '@medlearn/core';
import { cx, Display, Eyebrow, Icon, IconButton, type IconGlyph, Text } from '@medlearn/ui';
import { Dumbbell, Play, RotateCcw, Shuffle, Target, Timer, Trash2 } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import type { LibraryNode } from '@/content/library';
import type { PracticeQuestion, TopicSummary } from '@/content/topics';
import { markGoalTopic, removeGoal, useProgress } from '@/features/progress/store';
import { useHydrated } from '@/features/shell/media';

import { GoalPlanner } from './GoalPlanner';
import { PracticeSession } from './PracticeSession';
import {
  buildSession,
  SECONDS_PER_TIMED_QUESTION,
  type SectionStrength,
  sectionStrengths,
  type SessionKind,
  type Strength,
} from './sessions';

/** A session under way: its name, its questions, and a goal it counts towards. */
interface Running {
  title: string;
  ids: string[];
  seconds: number | null;
  goal?: { id: string; topic: string };
}

const STRENGTH: Record<Strength, { label: string; tone: string; bar: string }> = {
  strong: { label: 'Strong', tone: 'bg-success-subtle text-success', bar: 'bg-success' },
  building: { label: 'Building', tone: 'bg-primary-subtle text-primary-strong', bar: 'bg-primary' },
  weak: { label: 'Weak spot', tone: 'bg-danger-subtle text-danger', bar: 'bg-danger' },
  new: { label: 'Not started', tone: 'bg-surface-muted text-fg-muted', bar: 'bg-border' },
};

/** A way into practice, as a tile: what it is, how much, and the button that starts it. */
function Mode({
  icon,
  title,
  detail,
  primary = false,
  onStart,
  href,
}: Readonly<{
  icon: IconGlyph;
  title: string;
  detail: string;
  primary?: boolean;
  onStart?: () => void;
  href?: string;
}>) {
  const className = cx(
    'group flex h-full items-center gap-3 rounded-xl border p-4 text-left transition-colors duration-150',
    primary
      ? 'border-primary bg-primary text-on-primary hover:bg-primary-hover'
      : 'border-glass-border bg-glass text-ink shadow-glass hover:border-gold',
  );
  const body = (
    <>
      <span
        className={cx(
          'flex size-12 shrink-0 items-center justify-center rounded-full',
          primary ? 'bg-on-primary/15' : 'bg-surface-muted text-gold-ink',
        )}
      >
        <Icon icon={icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold">{title}</span>
        <span className={cx('text-sm', !primary && 'text-fg-muted')}>{detail}</span>
      </span>
      <Icon
        icon={Play}
        size="sm"
        className="shrink-0 transition-transform duration-150 group-hover:translate-x-1"
      />
    </>
  );
  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <button type="button" onClick={onStart} className={className}>
      {body}
    </button>
  );
}

/** Each book section with how it is going, and a button to practise just that section. */
function Strengths({
  sections,
  onPractise,
}: Readonly<{ sections: SectionStrength[]; onPractise: (section: SectionStrength) => void }>) {
  const counts = (['strong', 'building', 'weak', 'new'] as const).map((strength) => ({
    strength,
    count: sections.filter((section) => section.strength === strength).length,
  }));
  return (
    <section
      aria-labelledby="strengths-title"
      className="flex flex-col gap-3 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="strengths-title" className="font-semibold text-ink">
          Where you are strong, and where to work
        </h2>
        <ul aria-label="Sections by strength" className="flex flex-wrap gap-1">
          {counts.map(({ strength, count }) => (
            <li
              key={strength}
              className={cx(
                'rounded-full px-2 py-1 text-xs font-semibold',
                STRENGTH[strength].tone,
              )}
            >
              {STRENGTH[strength].label} {count}
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-col">
        {sections.map((section) => (
          <li
            key={section.id}
            className="flex items-center gap-3 border-t border-border py-2 first:border-t-0"
          >
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold text-ink">{section.label}</span>
              <span className="text-xs text-fg-muted" suppressHydrationWarning>
                {section.answered > 0
                  ? `${section.correct} of ${section.answered} right · ${section.percent}% mastery`
                  : `${section.slugs.length} ${section.slugs.length === 1 ? 'topic' : 'topics'}`}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-2 w-1/5 overflow-hidden rounded-full bg-border md:block"
            >
              <span
                className={cx('block h-full rounded-full', STRENGTH[section.strength].bar)}
                style={{ width: `${Math.max(section.percent, 4)}%` }}
              />
            </span>
            <span
              className={cx(
                'w-24 shrink-0 rounded-full px-2 py-1 text-center text-xs font-semibold',
                STRENGTH[section.strength].tone,
              )}
              suppressHydrationWarning
            >
              {STRENGTH[section.strength].label}
            </span>
            <IconButton
              icon={Play}
              label={`Practise ${section.label}`}
              title={`Practise ${section.label}`}
              size="sm"
              variant="secondary"
              onClick={() => onPractise(section)}
            />
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

/** The class tests and revisits planned, each with its countdown and today's topics. */
function Goals({
  goals,
  sections,
  titles,
  onRevise,
}: Readonly<{
  goals: StudyGoal[];
  sections: SectionStrength[];
  titles: Record<string, string>;
  onRevise: (goal: StudyGoal, slug: string) => void;
}>) {
  const today = dayKey(new Date());
  const upcoming = goals.filter((goal) => goalToday(goal, today).daysLeft >= 0);
  return (
    <section
      aria-labelledby="goals-title"
      className="flex flex-col gap-3 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
    >
      <h2 id="goals-title" className="font-semibold text-ink">
        Class tests and revisits
      </h2>
      {upcoming.length === 0 ? (
        <Text size="sm" tone="muted">
          A test coming up, or topics to go over again? Plan it here and Today fits it in.
        </Text>
      ) : (
        <ul className="flex flex-col gap-3">
          {upcoming.map((goal) => {
            const { daysLeft, topics } = goalToday(goal, today);
            return (
              <li key={goal.id} className="flex flex-col gap-2 rounded-lg bg-surface p-3">
                <div className="flex items-start gap-2">
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-semibold text-ink">{goal.title}</span>
                    <span className="text-xs text-fg-muted" suppressHydrationWarning>
                      {goal.kind === 'test' ? 'Test' : 'Revisit by'} {daysWord(daysLeft)} ·{' '}
                      {goal.done.length} of {goal.topics.length} topics gone over
                    </span>
                  </span>
                  <IconButton
                    icon={Trash2}
                    label={`Remove ${goal.title}`}
                    size="sm"
                    onClick={() => removeGoal(goal.id)}
                  />
                </div>
                <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full rounded-full bg-gold"
                    style={{ width: `${(100 * goal.done.length) / goal.topics.length}%` }}
                  />
                </span>
                {topics.length > 0 ? (
                  <ul aria-label={`Today for ${goal.title}`} className="flex flex-wrap gap-1">
                    {topics.map((slug) => (
                      <li key={slug}>
                        <button
                          type="button"
                          onClick={() => onRevise(goal, slug)}
                          className="flex min-h-8 items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-canvas"
                        >
                          <Icon icon={Play} size="sm" />
                          {titles[slug] ?? slug}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text size="xs" tone="muted">
                    All gone over. Good luck!
                  </Text>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <GoalPlanner sections={sections} titles={titles} />
    </section>
  );
}

export interface PracticeStart {
  topic?: string;
  goal?: string;
}

/**
 * Practice: a hub of ways in (a quick mix, weak spots, a timed test, recall), how each book
 * section is going, and the class tests and revisits the student has planned. A session takes
 * over the page until it ends with its score. Opened with a topic (from Today's plan), it goes
 * straight into that topic's questions, counting towards the goal it came from.
 */
export function PracticeView({
  topics,
  questions,
  tree,
  start,
}: Readonly<{
  topics: TopicSummary[];
  questions: PracticeQuestion[];
  tree: LibraryNode[];
  start?: PracticeStart;
}>) {
  const progress = useProgress();
  const now = new Date();
  const titles = Object.fromEntries(topics.map((topic) => [topic.slug, topic.title]));
  const sections = sectionStrengths(tree, topics, progress, now);
  const byId = new Map(questions.map((question) => [question.question.id, question]));

  const session = (kind: SessionKind, slugs?: string[]) =>
    buildSession(kind, topics, progress, slugs ? { slugs, now } : { now });
  const [running, setRunning] = useState<Running | null>(null);
  // Opened from Today's plan: straight into that topic, once this device's progress is known
  // (the server draws the hub without it). A practice step holds the questions still to get
  // right, as the plan counted them; a goal's step goes over the whole topic.
  const hydrated = useHydrated();
  const [opened, setOpened] = useState(false);
  if (hydrated && !opened) {
    setOpened(true);
    const slug = start?.topic;
    if (slug && titles[slug]) {
      const all = session('topics', [slug]);
      const open = all.filter((id) => !progress.correctAnswers.includes(id));
      setRunning({
        title: titles[slug],
        ids: start.goal || open.length === 0 ? all : open,
        seconds: null,
        ...(start.goal ? { goal: { id: start.goal, topic: slug } } : {}),
      });
    }
  }
  const run = (next: Running) => {
    setRunning(next);
    window.scrollTo({ top: 0 });
  };
  const exit = () => {
    setRunning(null);
    window.history.replaceState(null, '', '/practice');
  };

  if (running) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <PracticeSession
          key={running.ids.join()}
          title={running.title}
          questions={running.ids.flatMap((id) => byId.get(id) ?? [])}
          seconds={running.seconds}
          onFinish={() => {
            if (running.goal) markGoalTopic(running.goal.id, running.goal.topic);
          }}
          onExit={exit}
        />
      </div>
    );
  }

  const learnt = progress.completedLessons.length > 0;
  const answered = new Set([...progress.correctAnswers, ...progress.mistakes]).size;
  const accuracy =
    answered === 0 ? null : Math.round((100 * progress.correctAnswers.length) / answered);
  const missed = progress.mistakes.filter((id) => !progress.correctAnswers.includes(id)).length;
  const due = dueCardIds(topics, progress, now).length;

  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:items-start">
      <div className="flex flex-col gap-4 xl:col-span-2">
        <header className="flex flex-col gap-1">
          <Eyebrow>Practice</Eyebrow>
          <Display size="lg">
            Test <em>yourself</em>
          </Display>
          <Text tone="muted" suppressHydrationWarning>
            {accuracy === null
              ? 'Start anywhere: every answer shapes your weak spots and your recall cards.'
              : `${answered} questions answered · ${accuracy}% right · ${missed} to put right`}
          </Text>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          <Mode
            icon={Shuffle}
            title="Quick mix"
            detail={`10 questions from ${learnt ? 'the lessons you have done' : 'every topic'}`}
            primary
            onStart={() => run({ title: 'Quick mix', ids: session('mix'), seconds: null })}
          />
          <Mode
            icon={Target}
            title="Weak spots"
            detail={
              missed > 0
                ? `${missed} missed to put right, then your least sure topics`
                : 'Your least sure topics first'
            }
            onStart={() => run({ title: 'Weak spots', ids: session('weak'), seconds: null })}
          />
          <Mode
            icon={Timer}
            title="Timed test"
            detail="20 questions, a minute each, like a paper"
            onStart={() => {
              const ids = session('timed');
              run({ title: 'Timed test', ids, seconds: ids.length * SECONDS_PER_TIMED_QUESTION });
            }}
          />
          <Mode
            icon={RotateCcw}
            title="Recall cards"
            detail={due > 0 ? `${due} due now` : 'None due; they come back when needed'}
            href="/revise"
          />
        </div>
        <Strengths
          sections={sections}
          onPractise={(section) =>
            run({ title: section.label, ids: session('topics', section.slugs), seconds: null })
          }
        />
      </div>
      <aside aria-label="Plans" className="flex flex-col gap-4 xl:sticky xl:top-8">
        <Goals
          goals={progress.goals}
          sections={sections}
          titles={titles}
          onRevise={(goal, slug) =>
            run({
              title: titles[slug] ?? slug,
              ids: session('topics', [slug]),
              seconds: null,
              goal: { id: goal.id, topic: slug },
            })
          }
        />
        <section className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass p-4 shadow-glass">
          <Icon icon={Dumbbell} className="shrink-0 text-gold-ink" />
          <Text size="sm" tone="muted">
            Every miss becomes a recall card, and due cards lead Today&apos;s plan until you know
            them.
          </Text>
        </section>
      </aside>
    </div>
  );
}
