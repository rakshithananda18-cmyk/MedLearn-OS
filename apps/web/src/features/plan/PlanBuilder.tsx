'use client';

import {
  addDays,
  dayKey,
  DEFAULT_DAILY_MINUTES,
  goalLoad,
  goalSchedule,
  mondayOf,
  type StudyGoal,
} from '@medlearn/core';
import {
  Button,
  ChoiceGroup,
  cx,
  Heading,
  Icon,
  StepDots,
  Text,
  TextField,
  ToggleChip,
} from '@medlearn/ui';
import { ArrowLeft, ArrowRight } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { type LibraryNode, topicsUnder } from '@/content/library';
import type { TopicSummary } from '@/content/topics';
import { addGoal, useProgress } from '@/features/progress/store';

import { AiPlan } from './AiPlan';
import { GLASS } from './PlanCard';
import { TopicPicker } from './TopicPicker';
import { dateName, dayName, KIND_NAME, minutesText, topicMinutes, WEEKDAYS } from './words';

type Kind = StudyGoal['kind'] | 'ai';

const KINDS: Array<{ value: Kind; label: string; description: string }> = [
  {
    value: 'learn',
    label: 'Learn new topics',
    description: 'Lessons you have not done yet, spread over the days to a date.',
  },
  {
    value: 'test',
    label: 'Prepare for a class test',
    description: 'Go over the topics on the days before the test.',
  },
  {
    value: 'revisit',
    label: 'Revisit what I have learnt',
    description: 'Questions and cards on learnt topics, by a date.',
  },
  {
    value: 'ai',
    label: 'Let AI suggest a plan',
    description: 'From your exam date and what you have learnt; change it before it is added.',
  },
];

const STEPS = ['What', 'Topics', 'When', 'Check'] as const;

/** The finish dates offered as one tap, in days from the start. */
const SPANS = [
  { days: 7, label: '1 week' },
  { days: 14, label: '2 weeks' },
  { days: 30, label: '1 month' },
  { days: 90, label: '3 months' },
];

/**
 * A new plan from choices, no typing needed: what kind, which topics (from the library), when
 * and on which days, then a check of how it falls week by week before it is added.
 */
export function PlanBuilder({
  topics,
  tree,
}: Readonly<{ topics: TopicSummary[]; tree: LibraryNode[] }>) {
  const router = useRouter();
  const progress = useProgress();
  const today = dayKey(new Date());
  const bySlug = useMemo(() => new Map(topics.map((topic) => [topic.slug, topic])), [topics]);
  const learnt = progress.completedLessons;
  const dailyMinutes = progress.profile?.dailyMinutes ?? DEFAULT_DAILY_MINUTES;
  const examDate = progress.profile?.examDate ?? null;

  const [step, setStep] = useState(0);
  const stepRef = useRef<HTMLElement>(null);
  // Each new step takes the focus to its heading, so a keyboard or screen reader starts there.
  useEffect(() => {
    if (step > 0) stepRef.current?.querySelector<HTMLElement>('h2')?.focus();
  }, [step]);
  const [kind, setKind] = useState<Kind | null>(null);
  const [chosen, setChosen] = useState<string[]>([]);
  const [start, setStart] = useState(today);
  const [finish, setFinish] = useState('');
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [title, setTitle] = useState('');

  const goalKind: StudyGoal['kind'] = kind === 'ai' || kind === null ? 'learn' : kind;
  const can = (slug: string) =>
    goalKind === 'learn'
      ? !learnt.includes(slug)
      : goalKind === 'revisit'
        ? learnt.includes(slug)
        : true;
  const draft = {
    kind: goalKind,
    topics: chosen,
    date: finish || start,
    ...(start > today ? { from: start } : {}),
    ...(days.length < 7 ? { days } : {}),
  };
  const load = goalLoad(draft, today, (slug) => topicMinutes(draft, bySlug.get(slug)));
  const schedule = finish
    ? goalSchedule({ ...draft, id: 'new', title: '', done: [], createdAt: '' }, today)
    : [];
  // The region or section the topics come from names the plan, until the student names it.
  const named = useMemo(() => {
    for (const region of tree) {
      if (region.kind !== 'branch') continue;
      const inRegion = topicsUnder(region).map((topic) => topic.slug);
      if (chosen.length > 0 && chosen.every((slug) => inRegion.includes(slug))) {
        return region.label;
      }
    }
    return KIND_NAME[goalKind];
  }, [tree, chosen, goalKind]);

  const ready = [
    kind !== null,
    chosen.length > 0,
    finish >= start && days.length > 0 && schedule.length > 0,
    true,
  ];

  const add = () => {
    addGoal({
      kind: goalKind,
      title: title.trim() || named,
      topics: chosen,
      date: finish,
      ...(start > today ? { from: start } : {}),
      ...(days.length < 7 ? { days } : {}),
    });
    router.push('/plan');
  };

  // Weeks of the schedule, for the check.
  const weeks = [...new Set(schedule.map((day) => mondayOf(day.date)))];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Link
          href="/plan"
          className="flex w-fit items-center gap-1 text-sm font-semibold text-primary-strong"
        >
          <Icon icon={ArrowLeft} size="sm" />
          Plans
        </Link>
        <Heading level={1}>New plan</Heading>
        <div className="flex items-center gap-3">
          <StepDots
            count={kind === 'ai' ? 2 : STEPS.length}
            current={kind === 'ai' ? Math.min(step, 1) : step}
          />
          <span className="text-sm text-fg-muted">
            {kind === 'ai' && step > 0 ? 'Suggest' : STEPS[step]}
          </span>
        </div>
      </header>

      <section ref={stepRef} className={cx(GLASS, 'flex flex-col gap-4 p-4 md:p-6')}>
        {step === 0 ? (
          <ChoiceGroup
            legend="What do you want to plan?"
            name="plan-kind"
            options={KINDS}
            value={kind}
            onChange={(next) => {
              setKind(next);
              setChosen([]);
            }}
          />
        ) : null}

        {step > 0 && kind === 'ai' ? (
          <AiPlan topics={bySlug} today={today} onAdded={() => router.push('/plan')} />
        ) : null}

        {step === 1 && kind !== 'ai' ? (
          <>
            <div className="flex flex-col gap-1">
              <Heading level={2} tabIndex={-1}>
                Which topics?
              </Heading>
              <Text size="sm" tone="muted">
                {goalKind === 'learn'
                  ? 'Topics you have not learnt yet. Choose a whole region or section, or single topics.'
                  : goalKind === 'revisit'
                    ? 'Topics you have learnt (ticked).'
                    : 'The topics the test covers.'}{' '}
                {chosen.length} chosen.
              </Text>
            </div>
            <TopicPicker
              tree={tree}
              chosen={chosen}
              onChange={setChosen}
              can={can}
              learnt={learnt}
            />
          </>
        ) : null}

        {step === 2 && kind !== 'ai' ? (
          <>
            <Heading level={2} tabIndex={-1}>
              When?
            </Heading>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <TextField
                  label="Start"
                  type="date"
                  min={today}
                  value={start}
                  onChange={(event) => {
                    if (event.target.value >= today) setStart(event.target.value);
                  }}
                />
                <div role="group" aria-label="Start on" className="flex flex-wrap gap-2">
                  <ToggleChip pressed={start === today} onClick={() => setStart(today)}>
                    Today
                  </ToggleChip>
                  <ToggleChip
                    pressed={start === addDays(today, 1)}
                    onClick={() => setStart(addDays(today, 1))}
                  >
                    Tomorrow
                  </ToggleChip>
                  <ToggleChip
                    pressed={start === addDays(mondayOf(today), 7)}
                    onClick={() => setStart(addDays(mondayOf(today), 7))}
                  >
                    Next Monday
                  </ToggleChip>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <TextField
                  label={goalKind === 'test' ? 'Test date' : 'Done by'}
                  type="date"
                  min={start}
                  value={finish}
                  onChange={(event) => setFinish(event.target.value)}
                />
                <div role="group" aria-label="Done in" className="flex flex-wrap gap-2">
                  {SPANS.map((span) => (
                    <ToggleChip
                      key={span.days}
                      pressed={finish === addDays(start, span.days)}
                      onClick={() => setFinish(addDays(start, span.days))}
                    >
                      {span.label}
                    </ToggleChip>
                  ))}
                  {examDate && examDate > start ? (
                    <ToggleChip pressed={finish === examDate} onClick={() => setFinish(examDate)}>
                      My exam, {dateName(examDate)}
                    </ToggleChip>
                  ) : null}
                </div>
              </div>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="pb-2 text-sm font-medium text-fg">Study on</legend>
              <div className="flex flex-wrap gap-2">
                {WEEKDAYS.map(({ day, short }) => (
                  <ToggleChip
                    key={day}
                    pressed={days.includes(day)}
                    onClick={() =>
                      setDays(
                        days.includes(day) ? days.filter((item) => item !== day) : [...days, day],
                      )
                    }
                  >
                    {short}
                  </ToggleChip>
                ))}
              </div>
            </fieldset>
            {finish ? (
              <Text size="sm" className={load > dailyMinutes ? 'text-warning' : 'text-fg-muted'}>
                About {minutesText(load)} on the busiest day; your daily time is {dailyMinutes}{' '}
                minutes.
                {load > dailyMinutes ? ' Give it a later date, more days, or fewer topics.' : ''}
              </Text>
            ) : null}
          </>
        ) : null}

        {step === 3 && kind !== 'ai' ? (
          <>
            <Heading level={2} tabIndex={-1}>
              Check and add
            </Heading>
            <TextField
              label="Name"
              placeholder={named}
              maxLength={80}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Text size="sm" tone="muted">
              {KIND_NAME[goalKind]}: {chosen.length} {chosen.length === 1 ? 'topic' : 'topics'} from{' '}
              {dayName(start)} to {dayName(finish)}, about {minutesText(load)} on the busiest day.
              Today re-paces it if you miss a day.
            </Text>
            <ol className="flex flex-col gap-3">
              {weeks.map((monday) => (
                <li key={monday} className="rounded-lg bg-surface p-3">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
                    Week of {dateName(monday)}
                  </span>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    {schedule
                      .filter((day) => mondayOf(day.date) === monday)
                      .map((day) => (
                        <li key={day.date} className="flex gap-3">
                          <span className="w-24 shrink-0 text-fg-muted">{dayName(day.date)}</span>
                          <span className="text-fg">
                            {day.topics.map((slug) => bySlug.get(slug)?.title ?? slug).join(', ')}
                          </span>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ol>
          </>
        ) : null}
      </section>

      <div className="flex flex-wrap gap-2">
        {step > 0 ? (
          <Button variant="ghost" iconStart={ArrowLeft} onClick={() => setStep(step - 1)}>
            Back
          </Button>
        ) : null}
        <span className="flex-1" />
        {kind === 'ai' && step > 0 ? null : step < STEPS.length - 1 ? (
          <Button iconEnd={ArrowRight} disabled={!ready[step]} onClick={() => setStep(step + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={add}>Add plan</Button>
        )}
      </div>
    </div>
  );
}
