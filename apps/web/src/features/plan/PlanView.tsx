'use client';

import { dayKey, DEFAULT_DAILY_MINUTES, goalDone, goalToday, type StudyGoal } from '@medlearn/core';
import { PLAN_REQUEST_MAX, type PlanProposal } from '@medlearn/schemas';
import {
  Banner,
  Button,
  Checkbox,
  Heading,
  IconButton,
  Spinner,
  Text,
  TextArea,
  ToggleChip,
} from '@medlearn/ui';
import { Sparkles, Trash2 } from '@medlearn/ui/icons';
import Link from 'next/link';
import { type FormEvent, useMemo, useState } from 'react';

import type { TopicSummary } from '@/content/topics';
import { addGoal, removeGoal, saveProfile, useProgress } from '@/features/progress/store';

import { dayName, GoalDraft, KIND_NAME } from './GoalDraft';

const EXAMPLES = [
  'Class test on the brachial plexus on Friday',
  'The whole upper limb in three weeks, then the thorax',
  'Revisit the thorax by Sunday',
  'My exam is on 10 March: plan all of first-year anatomy',
];

type Failure = { title: string; message: string; byHand: boolean };
type Phase =
  | { kind: 'asking' }
  | { kind: 'thinking' }
  | { kind: 'proposed'; plan: PlanProposal; minutes: boolean; exam: boolean }
  | { kind: 'added'; count: number }
  | { kind: 'failed'; failure: Failure };

const LINK = 'font-semibold text-primary-strong underline-offset-4 hover:underline';

/** What to say when the server could not make a plan. */
async function failureOf(response: Response): Promise<Failure> {
  const body = (await response.json().catch(() => null)) as {
    error?: { code?: string; message?: string };
  } | null;
  const code = body?.error?.code;
  if (code === 'UNAVAILABLE') {
    return {
      title: 'The AI planner is not available right now',
      message: 'You can still plan a class test or a revisit by hand in Practice.',
      byHand: true,
    };
  }
  if (code === 'UNAUTHORIZED') {
    return {
      title: 'Sign in to plan with AI',
      message: 'Plans are made for your account, so sign in first.',
      byHand: false,
    };
  }
  return {
    title: 'No plan this time',
    message:
      code === 'RATE_LIMITED' || code === 'VALIDATION_FAILED'
        ? (body?.error?.message ?? 'Try again.')
        : 'Something went wrong. Check your connection and try again.',
    byHand: code === 'RATE_LIMITED',
  };
}

/**
 * The Plan Maker: the student asks in their own words, the AI proposes goals, the student changes
 * what they like and adds them. Today then paces them day by day, and keeps re-pacing them as
 * lessons are done or days are missed, without asking the AI again.
 */
export function PlanView({ topics }: Readonly<{ topics: TopicSummary[] }>) {
  const progress = useProgress();
  const [request, setRequest] = useState('');
  const [phase, setPhase] = useState<Phase>({ kind: 'asking' });
  const bySlug = useMemo(() => new Map(topics.map((topic) => [topic.slug, topic])), [topics]);
  const today = dayKey(new Date());
  const dailyMinutes = progress.profile?.dailyMinutes ?? DEFAULT_DAILY_MINUTES;

  const ask = async (event: FormEvent) => {
    event.preventDefault();
    setPhase({ kind: 'thinking' });
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          request: request.trim(),
          today,
          learnt: progress.completedLessons,
          dailyMinutes,
          examDate: progress.profile?.examDate ?? null,
        }),
      });
      if (!response.ok) {
        setPhase({ kind: 'failed', failure: await failureOf(response) });
        return;
      }
      const { data } = (await response.json()) as { data: PlanProposal };
      setPhase({ kind: 'proposed', plan: data, minutes: true, exam: true });
    } catch {
      setPhase({
        kind: 'failed',
        failure: {
          title: 'No plan this time',
          message: 'Check your connection and try again.',
          byHand: false,
        },
      });
    }
  };

  const accept = (proposed: Extract<Phase, { kind: 'proposed' }>) => {
    const { plan } = proposed;
    for (const goal of plan.goals) {
      addGoal({
        kind: goal.kind,
        title: goal.title.trim() || KIND_NAME[goal.kind],
        topics: goal.topics,
        date: goal.date,
        ...(goal.from ? { from: goal.from } : {}),
      });
    }
    const profile = progress.profile;
    if (profile && ((proposed.minutes && plan.dailyMinutes) || (proposed.exam && plan.examDate))) {
      saveProfile({
        ...profile,
        ...(proposed.minutes && plan.dailyMinutes ? { dailyMinutes: plan.dailyMinutes } : {}),
        ...(proposed.exam && plan.examDate ? { examDate: plan.examDate } : {}),
      });
    }
    setRequest('');
    setPhase({ kind: 'added', count: plan.goals.length });
  };

  const upcoming = progress.goals.filter((goal) => goalToday(goal, today).daysLeft >= 0);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Heading level={1}>Plan with AI</Heading>
        <Text tone="muted">
          Ask in your own words: a class test, a few topics, or the whole course before the exam.
          You can change the plan before it is added, and Today keeps it paced day by day.
        </Text>
      </header>

      <form onSubmit={ask} className="flex flex-col gap-3">
        <TextArea
          label="What should the plan cover?"
          rows={3}
          maxLength={PLAN_REQUEST_MAX}
          value={request}
          onChange={(event) => setRequest(event.target.value)}
        />
        <div role="group" aria-label="Examples" className="flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <ToggleChip
              key={example}
              pressed={request === example}
              onClick={() => setRequest(example)}
            >
              {example}
            </ToggleChip>
          ))}
        </div>
        <div>
          <Button
            type="submit"
            iconStart={Sparkles}
            disabled={request.trim().length < 3}
            loading={phase.kind === 'thinking'}
          >
            Make a plan
          </Button>
        </div>
        <Text size="xs" tone="muted">
          Your request and a short summary of your study (topics done, daily minutes, exam date) go
          to Groq, which runs the AI. Your name and email are not sent.{' '}
          <a
            href="https://groq.com/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            Groq&apos;s privacy policy
          </a>
        </Text>
      </form>

      {phase.kind === 'thinking' ? (
        <div role="status" className="flex items-center gap-3">
          <Spinner />
          <Text>Making your plan</Text>
        </div>
      ) : null}

      {phase.kind === 'failed' ? (
        <Banner tone="warning" title={phase.failure.title}>
          {phase.failure.message}{' '}
          {phase.failure.byHand ? (
            <Link href="/practice" className={LINK}>
              Plan by hand
            </Link>
          ) : null}
        </Banner>
      ) : null}

      {phase.kind === 'added' ? (
        <Banner tone="success" title="Added to your plan">
          {phase.count === 1 ? 'Its first steps are' : 'Their first steps are'} on Today.{' '}
          <Link href="/today" className={LINK}>
            Go to Today
          </Link>
        </Banner>
      ) : null}

      {phase.kind === 'proposed' ? (
        <section aria-label="Proposed plan" className="flex flex-col gap-4">
          <Text weight="semibold">{phase.plan.reply}</Text>
          {phase.plan.goals.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {phase.plan.goals.map((goal, index) => (
                <GoalDraft
                  // The plan's goals keep their places while it is changed.
                  key={index}
                  goal={goal}
                  today={today}
                  topics={bySlug}
                  dailyMinutes={dailyMinutes}
                  onChange={(next) =>
                    setPhase({
                      ...phase,
                      plan: {
                        ...phase.plan,
                        goals: phase.plan.goals.map((item, at) => (at === index ? next : item)),
                      },
                    })
                  }
                  onDrop={() =>
                    setPhase({
                      ...phase,
                      plan: {
                        ...phase.plan,
                        goals: phase.plan.goals.filter((_, at) => at !== index),
                      },
                    })
                  }
                />
              ))}
            </ul>
          ) : null}
          {phase.plan.dailyMinutes && progress.profile ? (
            <Checkbox
              label={`Change my daily study time to ${phase.plan.dailyMinutes} minutes`}
              checked={phase.minutes}
              onCheckedChange={(minutes) => setPhase({ ...phase, minutes })}
            />
          ) : null}
          {phase.plan.examDate && progress.profile ? (
            <Checkbox
              label={`Set my exam date to ${dayName(phase.plan.examDate)}`}
              checked={phase.exam}
              onCheckedChange={(exam) => setPhase({ ...phase, exam })}
            />
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={
                phase.plan.goals.length === 0 &&
                !(phase.minutes && phase.plan.dailyMinutes) &&
                !(phase.exam && phase.plan.examDate)
              }
              onClick={() => accept(phase)}
            >
              Add to my plan
            </Button>
            <Button variant="ghost" onClick={() => setPhase({ kind: 'asking' })}>
              Start over
            </Button>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="plans-title" className="flex flex-col gap-3">
        <Heading level={2} id="plans-title">
          Your plans
        </Heading>
        {upcoming.length === 0 ? (
          <Text size="sm" tone="muted">
            Nothing planned yet. Ask above, or plan a class test by hand in{' '}
            <Link href="/practice" className={LINK}>
              Practice
            </Link>
            .
          </Text>
        ) : (
          <ul className="flex flex-col gap-2">
            {upcoming.map((goal: StudyGoal) => (
              <li key={goal.id} className="flex items-center gap-3 rounded-lg bg-surface p-3">
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-ink">{goal.title}</span>
                  <span className="text-xs text-fg-muted" suppressHydrationWarning>
                    {KIND_NAME[goal.kind]}
                    {goal.from && goal.from > today ? `, from ${dayName(goal.from)}` : ''}, by{' '}
                    {dayName(goal.date)} · {goalDone(goal, progress.completedLessons).length} of{' '}
                    {goal.topics.length} topics done
                  </span>
                </span>
                <IconButton
                  icon={Trash2}
                  label={`Remove ${goal.title}`}
                  size="sm"
                  onClick={() => removeGoal(goal.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
