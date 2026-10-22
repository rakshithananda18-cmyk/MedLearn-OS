'use client';

import {
  dayKey,
  DEFAULT_DAILY_MINUTES,
  goalToday,
  planStatus,
  type TodayItem,
} from '@medlearn/core';
import { Banner, buttonClasses, cx, Heading, Icon, Text, ToggleChip } from '@medlearn/ui';
import { ChevronRight, Plus } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { TopicSummary } from '@/content/topics';
import { useProgress } from '@/features/progress/store';
import { Panes } from '@/features/shell/Panes';
import { describe } from '@/features/today/describe';

import { GLASS, PlanCard } from './PlanCard';
import { minutesText, topicMinutes } from './words';

/**
 * The Plan page: the student's plans, each with its progress and its week, and today's share of
 * them, the same steps Today shows. New plans are made from choices on /plan/new; each plan's
 * calendar, on /plan/[id], changes its days and topics.
 */
export function PlanView({ topics }: Readonly<{ topics: TopicSummary[] }>) {
  const progress = useProgress();
  const [tab, setTab] = useState<'active' | 'finished'>('active');
  const bySlug = useMemo(() => new Map(topics.map((topic) => [topic.slug, topic])), [topics]);
  const today = dayKey(new Date());
  const dailyMinutes = progress.profile?.dailyMinutes ?? DEFAULT_DAILY_MINUTES;

  const plans = progress.goals.map((goal) => ({
    goal,
    state: planStatus(goal, progress, today, (slug) => topicMinutes(goal, bySlug.get(slug))).state,
  }));
  const active = plans.filter((plan) => plan.state === 'active').map((plan) => plan.goal);
  const finished = plans.filter((plan) => plan.state !== 'active').map((plan) => plan.goal);
  const shown = tab === 'active' ? active : finished;

  // Today's share of every plan, as Today lists it.
  const steps: TodayItem[] = active.flatMap((goal) =>
    goalToday(goal, today, progress.completedLessons).topics.flatMap((slug) => {
      const topic = bySlug.get(slug);
      return topic
        ? [
            {
              kind: 'goal' as const,
              goalId: goal.id,
              goalKind: goal.kind,
              goalTitle: goal.title,
              topicSlug: slug,
              title: topic.title,
              minutes: topicMinutes(goal, topic),
            },
          ]
        : [];
    }),
  );
  const minutes = steps.reduce((sum, step) => sum + step.minutes, 0);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Heading level={1}>Plan</Heading>
          <Text tone="muted">
            Your plans, day by day. Today brings each day&apos;s share into your study.
          </Text>
        </div>
        <Link href="/plan/new" className={buttonClasses({})}>
          <Icon icon={Plus} size="sm" />
          New plan
        </Link>
      </header>

      <Panes
        id="plan"
        label="Today"
        asideFirst
        main={
          <>
            <div role="group" aria-label="Which plans" className="flex gap-2">
              <ToggleChip pressed={tab === 'active'} onClick={() => setTab('active')}>
                Active ({active.length})
              </ToggleChip>
              <ToggleChip pressed={tab === 'finished'} onClick={() => setTab('finished')}>
                Finished ({finished.length})
              </ToggleChip>
            </div>

            {shown.length === 0 ? (
              <div className={cx(GLASS, 'flex flex-col items-start gap-3 p-6')}>
                <Text weight="semibold">
                  {tab === 'active' ? 'No plans yet' : 'No finished plans yet'}
                </Text>
                <Text size="sm" tone="muted">
                  {tab === 'active'
                    ? 'Choose what to learn or revise and by when; Today spreads it over your days.'
                    : 'Plans you finish, or whose date has passed, move here.'}
                </Text>
                {tab === 'active' ? (
                  <Link href="/plan/new" className={buttonClasses({ variant: 'secondary' })}>
                    <Icon icon={Plus} size="sm" />
                    Make a plan
                  </Link>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {shown.map((goal) => (
                  <PlanCard
                    key={goal.id}
                    goal={goal}
                    progress={progress}
                    today={today}
                    topics={bySlug}
                  />
                ))}
              </div>
            )}
          </>
        }
        aside={
          <>
            {minutes > dailyMinutes ? (
              <Banner tone="warning" title="Today looks heavy">
                Your plans need about {minutesText(minutes)} today, more than your {dailyMinutes}{' '}
                minutes a day. Open a plan&apos;s calendar to take a day off or give it a later
                date.
              </Banner>
            ) : null}

            <section aria-labelledby="plan-today" className={cx(GLASS, 'flex flex-col p-4')}>
              <div className="flex items-center justify-between gap-3 pb-2">
                <h2 id="plan-today" className="font-semibold text-ink">
                  Today from your plans
                </h2>
                <span className="text-sm text-fg-muted">
                  {steps.length > 0 ? `About ${minutesText(minutes)}` : ''}
                </span>
              </div>
              {steps.length === 0 ? (
                <Text size="sm" tone="muted">
                  Nothing from your plans today.
                </Text>
              ) : (
                <ol>
                  {steps.map((step) => {
                    const { title, meta, href, icon: Glyph } = describe(step);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group flex min-h-12 items-center gap-3 rounded-md border-t border-border px-2 py-2 transition-colors hover:bg-surface-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-gold-ink"
                          >
                            <Glyph size={16} strokeWidth={2} aria-hidden="true" />
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-sm font-semibold text-pretty text-ink">
                              {title}
                            </span>
                            <span className="truncate text-xs text-fg-muted">{meta}</span>
                          </span>
                          <Icon
                            icon={ChevronRight}
                            size="sm"
                            className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>
          </>
        }
      />
    </div>
  );
}
