'use client';

import { addDays, DEFAULT_DAILY_MINUTES } from '@medlearn/core';
import { PLAN_REQUEST_MAX, type PlanProposal } from '@medlearn/schemas';
import { Banner, Button, Checkbox, Spinner, Text, TextArea, TextField } from '@medlearn/ui';
import { Sparkles } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import type { TopicSummary } from '@/content/topics';
import { addGoal, saveProfile, useProgress } from '@/features/progress/store';

import { GoalDraft } from './GoalDraft';
import { dayName, KIND_NAME } from './words';

type Failure = { title: string; message: string; byHand: boolean };
type Phase =
  | { kind: 'asking' }
  | { kind: 'thinking' }
  | { kind: 'proposed'; plan: PlanProposal; minutes: boolean; exam: boolean }
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
      message:
        'Choose the topics and dates yourself instead: go back and pick another kind of plan.',
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

/** The request the AI is sent: made from the student's choices, so nothing has to be typed. */
export function aiRequest(examDate: string, details: string): string {
  const base = `Plan every topic I have not learnt yet so I finish about two weeks before my exam on ${examDate}, then revisit them before the exam.`;
  return details.trim() ? `${base} Also: ${details.trim()}` : base;
}

/**
 * A plan suggested by the AI from the exam date and what is learnt: one tap to ask, then the
 * goals to change and add like any plan. Details can be added in words, but need not be.
 */
export function AiPlan({
  topics,
  today,
  onAdded,
}: Readonly<{ topics: Map<string, TopicSummary>; today: string; onAdded: () => void }>) {
  const progress = useProgress();
  const [examDate, setExamDate] = useState(progress.profile?.examDate ?? '');
  const [details, setDetails] = useState('');
  const [phase, setPhase] = useState<Phase>({ kind: 'asking' });
  const dailyMinutes = progress.profile?.dailyMinutes ?? DEFAULT_DAILY_MINUTES;
  const ready = examDate > addDays(today, 7);

  const ask = async () => {
    setPhase({ kind: 'thinking' });
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          request: aiRequest(examDate, details).slice(0, PLAN_REQUEST_MAX),
          today,
          learnt: progress.completedLessons,
          dailyMinutes,
          examDate,
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
    const minutes = proposed.minutes && plan.dailyMinutes;
    const exam = proposed.exam ? (plan.examDate ?? examDate) : null;
    if (profile && (minutes || (exam && exam !== profile.examDate))) {
      saveProfile({
        ...profile,
        ...(minutes ? { dailyMinutes: minutes } : {}),
        ...(exam ? { examDate: exam } : {}),
      });
    }
    onAdded();
  };

  if (phase.kind === 'proposed') {
    const { plan } = phase;
    return (
      <section aria-label="Suggested plan" className="flex flex-col gap-4">
        <Text weight="semibold">{plan.reply}</Text>
        <ul className="flex flex-col gap-3">
          {plan.goals.map((goal, index) => (
            <GoalDraft
              // The plan's goals keep their places while it is changed.
              key={index}
              goal={goal}
              today={today}
              topics={topics}
              dailyMinutes={dailyMinutes}
              onChange={(next) =>
                setPhase({
                  ...phase,
                  plan: {
                    ...plan,
                    goals: plan.goals.map((item, at) => (at === index ? next : item)),
                  },
                })
              }
              onDrop={() =>
                setPhase({
                  ...phase,
                  plan: { ...plan, goals: plan.goals.filter((_, at) => at !== index) },
                })
              }
            />
          ))}
        </ul>
        {plan.dailyMinutes && progress.profile ? (
          <Checkbox
            label={`Change my daily study time to ${plan.dailyMinutes} minutes`}
            checked={phase.minutes}
            onCheckedChange={(minutes) => setPhase({ ...phase, minutes })}
          />
        ) : null}
        {progress.profile && examDate !== progress.profile.examDate ? (
          <Checkbox
            label={`Set my exam date to ${dayName(plan.examDate ?? examDate)}`}
            checked={phase.exam}
            onCheckedChange={(exam) => setPhase({ ...phase, exam })}
          />
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button disabled={plan.goals.length === 0} onClick={() => accept(phase)}>
            Add to my plans
          </Button>
          <Button variant="ghost" onClick={() => setPhase({ kind: 'asking' })}>
            Ask again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text size="sm" tone="muted">
        The AI looks at your exam date and the topics you have learnt, and plans the rest region by
        region, with time at the end to revisit. You can change everything before it is added.
      </Text>
      <TextField
        label="Exam date"
        type="date"
        min={addDays(today, 8)}
        value={examDate}
        onChange={(event) => setExamDate(event.target.value)}
        hint={ready || !examDate ? undefined : 'Choose a date more than a week away.'}
      />
      <details>
        <summary className="cursor-pointer text-sm font-semibold text-primary-strong">
          Anything else? (optional)
        </summary>
        <div className="pt-3">
          <TextArea
            label="Add details in your own words"
            hint="For example: weekends off, or the thorax first."
            rows={2}
            maxLength={200}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
      </details>
      <div>
        <Button
          iconStart={Sparkles}
          disabled={!ready}
          loading={phase.kind === 'thinking'}
          onClick={ask}
        >
          Suggest a plan
        </Button>
      </div>
      {phase.kind === 'thinking' ? (
        <div role="status" className="flex items-center gap-3">
          <Spinner />
          <Text>Making your plan</Text>
        </div>
      ) : null}
      {phase.kind === 'failed' ? (
        <Banner tone="warning" title={phase.failure.title}>
          {phase.failure.message}
        </Banner>
      ) : null}
      <Text size="xs" tone="muted">
        Your exam date and a short summary of your study (topics done, daily minutes) go to Groq,
        which runs the AI. Your name and email are not sent.{' '}
        <Link
          href="https://groq.com/privacy-policy"
          target="_blank"
          rel="noreferrer"
          className={LINK}
        >
          Groq&apos;s privacy policy
        </Link>
      </Text>
    </div>
  );
}
