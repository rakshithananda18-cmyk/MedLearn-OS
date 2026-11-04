'use client';

import { addDays, DEFAULT_DAILY_MINUTES, goalSchedule } from '@medlearn/core';
import { PLAN_REQUEST_MAX, type PlanProposal } from '@medlearn/schemas';
import { Banner, Button, Checkbox, Spinner, Text, TextArea, TextField } from '@medlearn/ui';
import { Sparkles } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useState } from 'react';

import type { TopicSummary } from '@/content/topics';
import { addGoal, saveProfile, useProgress } from '@/features/progress/store';

import { GoalDraft } from './GoalDraft';
import { dayName, KIND_NAME, minutesText, topicMinutes } from './words';

type Failure = { title: string; message: string; signIn?: boolean };
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
      message: 'You can still choose your own topics and dates. Your study progress is saved.',
    };
  }
  if (code === 'UNAUTHORIZED') {
    return {
      title: 'Sign in to plan with AI',
      message: 'Plans are made for your account, so sign in first.',
      signIn: true,
    };
  }
  return {
    title: 'No plan this time',
    message:
      code === 'RATE_LIMITED' || code === 'VALIDATION_FAILED'
        ? (body?.error?.message ?? 'Try again.')
        : 'Something went wrong. Check your connection and try again.',
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
  onManual,
}: Readonly<{
  topics: Map<string, TopicSummary>;
  today: string;
  onAdded: () => void;
  onManual: () => void;
}>) {
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
      const body = (await response.json()) as { data: unknown };
      const { PlanProposal } = await import('@medlearn/schemas');
      const plan = PlanProposal.parse(body.data);
      setPhase({ kind: 'proposed', plan, minutes: true, exam: true });
    } catch {
      setPhase({
        kind: 'failed',
        failure: {
          title: 'No plan this time',
          message: 'Check your connection and try again.',
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
    const proposedExam = plan.examDate ?? examDate;
    const acceptedMinutes =
      progress.profile && phase.minutes && plan.dailyMinutes ? plan.dailyMinutes : dailyMinutes;
    // Inspect the combined work before saving, including plans the student already has.
    const loadByDay = new Map<string, number>();
    const drafts = plan.goals.map((goal, index) => ({
      ...goal,
      from: goal.from ?? undefined,
      id: `draft-${index}`,
      done: [],
      createdAt: `${today}T12:00:00.000Z`,
    }));
    for (const goal of [...progress.goals, ...drafts]) {
      for (const day of goalSchedule(goal, today, progress.completedLessons)) {
        const minutes = day.topics.reduce(
          (sum, slug) => sum + topicMinutes(goal, topics.get(slug)),
          0,
        );
        loadByDay.set(day.date, (loadByDay.get(day.date) ?? 0) + minutes);
      }
    }
    const busiest = Math.max(0, ...loadByDay.values());
    return (
      <section aria-label="Suggested plan" className="flex min-w-0 flex-col gap-4">
        <Text weight="semibold">Review your draft · not saved yet</Text>
        <Text weight="semibold">{plan.reply}</Text>
        <Text size="sm" tone="muted">
          These drafts use every day. After adding them, choose study weekdays or days off in each
          plan&apos;s calendar.
        </Text>
        {plan.goals.length === 0 ? (
          <Text>No plans to add. Change the request or choose your own topics.</Text>
        ) : (
          <Text size="sm" tone="muted">
            Including your saved plans, about {minutesText(busiest)} on the busiest day, against
            your {acceptedMinutes} minutes a day.
          </Text>
        )}
        {busiest > acceptedMinutes ? (
          <Banner tone="warning" title="Some days look heavy">
            Give the plans later dates or leave out topics before adding them.
          </Banner>
        ) : null}
        <ul className="flex flex-col gap-3">
          {plan.goals.map((goal, index) => (
            <GoalDraft
              // The plan's goals keep their places while it is changed.
              key={index}
              goal={goal}
              today={today}
              topics={topics}
              dailyMinutes={acceptedMinutes}
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
        {plan.dailyMinutes && plan.dailyMinutes !== dailyMinutes && progress.profile ? (
          <Checkbox
            label={`Change my daily study time to ${plan.dailyMinutes} minutes`}
            checked={phase.minutes}
            onCheckedChange={(minutes) => setPhase({ ...phase, minutes })}
          />
        ) : null}
        {progress.profile && proposedExam !== progress.profile.examDate ? (
          <Checkbox
            label={`Set my exam date to ${dayName(proposedExam)}`}
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
          <Button variant="ghost" onClick={onManual}>
            Choose topics myself
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Text size="sm" tone="muted">
        The AI looks at your exam date and the topics you have learnt, and plans the rest region by
        region, with time at the end to revisit. Review the dates and topics before adding it.
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
            hint="For example: the thorax first, or only the upper limb. Choose study weekdays in the calendar after adding the plan."
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
        <div className="flex flex-col items-start gap-3">
          <Banner tone="warning" title={phase.failure.title}>
            {phase.failure.message}
          </Banner>
          {phase.failure.signIn ? (
            <Link href="/account" className={LINK}>
              Go to sign in
            </Link>
          ) : null}
          <Button variant="secondary" onClick={onManual}>
            Choose topics myself
          </Button>
        </div>
      ) : null}
      <Text size="xs" tone="muted">
        Your exam date, the details you enter and a short summary of your study (topics done, daily
        minutes) go to Groq, which runs the AI. Your name and email are not sent.{' '}
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
