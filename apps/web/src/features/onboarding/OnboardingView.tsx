'use client';

import { dayKey, DEFAULT_DAILY_MINUTES, type MbbsYear } from '@medlearn/core';
import {
  ActionBar,
  Button,
  ChoiceGroup,
  type ChoiceOption,
  Display,
  Eyebrow,
  IconButton,
  StepDots,
  Text,
  TextField,
} from '@medlearn/ui';
import { ArrowRight, Check, ChevronLeft } from '@medlearn/ui/icons';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';

import { saveProfile } from '@/features/progress/store';

const YEARS: ChoiceOption<`${MbbsYear}`>[] = [
  { value: '1', label: 'First year', description: 'Anatomy, Physiology, Biochemistry' },
  { value: '2', label: 'Second year', description: 'Pathology, Pharmacology, Microbiology' },
  { value: '3', label: 'Third year, part 1', description: 'Community Medicine, ENT, Eye, FMT' },
  { value: '4', label: 'Final year', description: 'Medicine, Surgery, OBG, Paediatrics' },
];

const MINUTES: ChoiceOption<string>[] = [
  { value: '10', label: '10 minutes', description: 'A few reviews and questions' },
  { value: '20', label: '20 minutes', description: 'One lesson or a round of reviews' },
  { value: '30', label: '30 minutes', description: 'A lesson plus practice' },
  { value: '45', label: '45 minutes', description: 'Exam season' },
];

interface Step {
  title: ReactNode;
  help: string;
}

const STEPS: Step[] = [
  {
    title: (
      <>
        Which <em>year</em> are you in?
      </>
    ),
    help: 'Your plan follows your year’s subjects in teaching order.',
  },
  {
    title: (
      <>
        When is your next <em>exam</em>?
      </>
    ),
    help: 'Internal or university. As it gets close, Today shifts towards revision and diagrams.',
  },
  {
    title: (
      <>
        How much time <em>each day</em>?
      </>
    ),
    help: 'Today never plans more than this. You can always do extra.',
  },
];

/** Three quick questions that size the daily plan. Answers stay on this device until M4. */
export function OnboardingView() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [year, setYear] = useState<`${MbbsYear}` | null>(null);
  const [examDate, setExamDate] = useState('');
  const [minutes, setMinutes] = useState<string | null>(String(DEFAULT_DAILY_MINUTES));
  const today = dayKey(new Date());

  const finish = (exam: string | null) => {
    saveProfile({
      year: Number(year ?? '1') as MbbsYear,
      examDate: exam,
      dailyMinutes: Number(minutes ?? DEFAULT_DAILY_MINUTES),
    });
    router.push('/today');
  };

  const canContinue = step === 0 ? year !== null : step === 1 ? examDate !== '' : minutes !== null;
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step] ?? STEPS[0];

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-8 px-4 pt-8 pb-6 md:pt-16">
      <div className="flex h-12 items-center justify-between">
        {step > 0 ? (
          <IconButton
            icon={ChevronLeft}
            label="Previous question"
            variant="ghost"
            onClick={() => setStep(step - 1)}
          />
        ) : (
          <span />
        )}
        <StepDots count={STEPS.length} current={step} />
        <Button variant="ghost" size="sm" onClick={() => finish(null)}>
          Skip
        </Button>
      </div>

      <div key={step} className="flex animate-rise flex-col gap-4">
        <Eyebrow>Set up your plan</Eyebrow>
        <Display>{current?.title}</Display>
        <Text tone="muted">{current?.help}</Text>
      </div>

      <div className="flex-1">
        {step === 0 ? (
          <ChoiceGroup
            legend="Year of MBBS"
            name="year"
            options={YEARS}
            value={year}
            onChange={setYear}
          />
        ) : null}
        {step === 1 ? (
          <div className="flex flex-col gap-4 rounded-xl border border-glass-border bg-glass p-4 shadow-glass">
            <TextField
              label="Exam date"
              type="date"
              min={today}
              value={examDate}
              onChange={(event) => setExamDate(event.target.value)}
            />
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setExamDate('');
                  setStep(2);
                }}
              >
                Not sure yet
              </Button>
            </div>
          </div>
        ) : null}
        {step === 2 ? (
          <ChoiceGroup
            legend="Daily study time"
            name="minutes"
            options={MINUTES}
            value={minutes}
            onChange={setMinutes}
          />
        ) : null}
        {year !== null && year !== '1' && step === 0 ? (
          <Text size="sm" tone="muted" className="pt-4">
            This prototype has first-year topics only; your plan will use them for now.
          </Text>
        ) : null}
      </div>

      <ActionBar placement="edge">
        <Text size="sm" tone="muted" className="pl-2">
          Step {step + 1} of {STEPS.length}
        </Text>
        {isLast ? (
          <Button iconEnd={Check} disabled={!canContinue} onClick={() => finish(examDate || null)}>
            Create my plan
          </Button>
        ) : (
          <Button iconEnd={ArrowRight} disabled={!canContinue} onClick={() => setStep(step + 1)}>
            Continue
          </Button>
        )}
      </ActionBar>
    </main>
  );
}
