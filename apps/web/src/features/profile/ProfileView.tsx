'use client';

import { dayKey, type MbbsYear, type StudyProfile, topicMastery } from '@medlearn/core';
import { NAME_MAX_LENGTH } from '@medlearn/schemas/limits';
import {
  Button,
  buttonClasses,
  Card,
  Display,
  Eyebrow,
  Skeleton,
  Text,
  TextField,
  ThemeToggle,
  ToggleChip,
} from '@medlearn/ui';
import Link from 'next/link';
import { type ReactNode, useId, useState } from 'react';

import type { TopicSummary } from '@/content/topics';
import { useAccount } from '@/features/account/useAccount';
import { MINUTES, YEARS } from '@/features/onboarding/OnboardingView';
import { saveProfile, useProgress } from '@/features/progress/store';
import { useHydrated } from '@/features/shell/media';

import { Avatar } from './Avatar';

const DAY_MS = 86_400_000;
/** How many recent days "days studied" looks back over. */
const RECENT_DAYS = 30;

/** Whole days from one local date (YYYY-MM-DD) to another; negative when it has passed. */
const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);

function countdown(examDate: string | null, today: string): string {
  if (!examDate) return 'When your next university or internal exam is, if you know.';
  const days = daysBetween(today, examDate);
  if (days > 1) return `${days} days to go.`;
  if (days === 1) return 'Tomorrow. You have prepared for this.';
  if (days === 0) return 'Today. Good luck.';
  return 'That date has passed: set your next exam.';
}

/** One part of the profile, as a glass card with its title and, if any, a link beside it. */
function Section({
  title,
  action,
  children,
}: Readonly<{ title: string; action?: ReactNode; children: ReactNode }>) {
  const id = useId();
  return (
    <Card tone="glass" as="section" aria-labelledby={id} className="flex flex-col gap-4">
      <div className="flex min-h-8 items-center justify-between gap-3">
        <h2 id={id} className="font-semibold text-ink">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </Card>
  );
}

/** The student's name, saved when they say so; their initials come from it. */
function NameForm({
  name,
  onSave,
}: Readonly<{ name: string | undefined; onSave: (name: string) => void }>) {
  const [draft, setDraft] = useState(name ?? '');
  const changed = draft.trim() !== (name ?? '');
  return (
    <form
      className="flex flex-wrap items-end gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft.trim());
      }}
    >
      <TextField
        label="Your name"
        hint="Only you see it: your initials and greeting come from it."
        value={draft}
        maxLength={NAME_MAX_LENGTH}
        autoComplete="name"
        onChange={(event) => setDraft(event.target.value)}
        className="min-w-0 flex-1"
      />
      <Button type="submit" variant="secondary" disabled={!changed}>
        Save
      </Button>
    </form>
  );
}

/** How things are going, in four calm numbers, with the library a tap away. */
function AtAGlance({ topics, today }: Readonly<{ topics: TopicSummary[]; today: string }>) {
  const progress = useProgress();
  const now = new Date();
  const mastery = topics.map((topic) => topicMastery(topic, progress, now));
  const days = Object.keys(progress.activity).filter((day) => {
    const ago = daysBetween(day, today);
    return ago >= 0 && ago < RECENT_DAYS;
  }).length;
  const stats: Array<[string, string]> = [
    ['Topics learnt', `${mastery.filter((item) => item.lessonDone).length} of ${mastery.length}`],
    ['Reviews due', String(mastery.reduce((total, item) => total + item.dueCards, 0))],
    ['Weak spots', String(mastery.reduce((total, item) => total + item.weakSpots, 0))],
    ['Days studied', `${days} of the last ${RECENT_DAYS}`],
  ];
  return (
    <Section
      title="Your progress"
      action={
        <Link href="/subjects" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
          Open the library
        </Link>
      }
    >
      <dl className="grid grid-cols-2 gap-3">
        {stats.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col-reverse gap-1 rounded-md border border-glass-border bg-surface/60 p-3"
          >
            <dt className="text-xs font-semibold text-fg-muted">{label}</dt>
            <dd className="font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/** Whether progress is kept in an account, and the way to the account page. */
function AccountSection({ adult }: Readonly<{ adult: boolean }>) {
  const { state } = useAccount();
  let body: ReactNode;
  if (!adult) {
    body = (
      <Text size="sm" tone="muted">
        Under 18: your progress and name stay on this phone until a parent’s agreement arrives.
      </Text>
    );
  } else if (state.status === 'loading') {
    body = <Skeleton className="h-8 w-full" />;
  } else if (state.signedIn) {
    body = (
      <div className="flex flex-col gap-2">
        <Text size="sm">
          Signed in as {state.account?.email}. Your progress follows you to any phone.
        </Text>
        {state.account?.reviewer ? (
          <Link href="/review" className={buttonClasses({ variant: 'primary', size: 'sm' })}>
            Review topics
          </Link>
        ) : null}
        {state.account?.admin ? (
          <Link href="/admin" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
            Admin: review team
          </Link>
        ) : null}
      </div>
    );
  } else {
    body = (
      <Text size="sm" tone="muted">
        Create an account so your progress and name follow you to a new phone.
      </Text>
    );
  }
  return (
    <Section
      title="Account"
      action={
        adult ? (
          <Link href="/account" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
            {state.status === 'ready' && state.signedIn ? 'Manage' : 'Create or sign in'}
          </Link>
        ) : null
      }
    >
      {body}
    </Section>
  );
}

/**
 * The student's profile: their initials and name, the study plan they can change at any time
 * (year, exam date, time each day), their books, how things are going, their account and the
 * app's look. Changes save as they are made, and Today's plan follows them straight away.
 */
export function ProfileView({
  topics,
  books,
}: Readonly<{
  topics: TopicSummary[];
  /** Short titles of the books in the catalogue, by id. */
  books: Record<string, string>;
}>) {
  const progress = useProgress();
  // The profile is on this phone only: until the page is in the browser, a placeholder.
  const hydrated = useHydrated();
  const [said, setSaid] = useState('');
  const profile = progress.profile;
  const today = dayKey(new Date());

  if (!hydrated) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="flex flex-col gap-6">
        <header className="flex items-center gap-4">
          <Avatar name={undefined} size="lg" />
          <Display size="md">
            Your <em>profile</em>
          </Display>
        </header>
        <Card tone="glass" className="flex flex-col gap-3">
          <Text>Set up your plan first: your year, your exam date and your time each day.</Text>
          <div>
            <Link href="/welcome" className={buttonClasses({ size: 'sm' })}>
              Set up my plan
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const change = (patch: Partial<StudyProfile>, what: string) => {
    saveProfile({ ...profile, ...patch });
    setSaid(`${what} saved.`);
  };
  const [first] = (profile.name ?? '').split(/\s+/u);
  const year = YEARS.find((item) => Number(item.value) === profile.year)?.label ?? 'MBBS';
  const chosen = (profile.books ?? []).flatMap((id) => (books[id] ? [books[id]] : []));

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-4">
        <Avatar name={profile.name} size="lg" />
        <div className="flex flex-col gap-1">
          <Eyebrow>{year} · MBBS</Eyebrow>
          <Display size="md">
            {first ? (
              <>
                Hello, <em>{first}</em>
              </>
            ) : (
              <>
                Your <em>profile</em>
              </>
            )}
          </Display>
          <p aria-live="polite" className="text-sm text-fg-muted empty:hidden">
            {said}
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-4">
          <Section title="About you">
            <NameForm
              name={profile.name}
              onSave={(name) => {
                const next: StudyProfile = { ...profile };
                if (name) next.name = name;
                else delete next.name;
                saveProfile(next);
                setSaid(name ? 'Name saved.' : 'Name removed.');
              }}
            />
          </Section>

          <Section title="Your study plan">
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-medium text-fg">Year</legend>
              <div className="flex flex-wrap gap-2">
                {YEARS.map((item) => (
                  <ToggleChip
                    key={item.value}
                    pressed={profile.year === Number(item.value)}
                    onClick={() => change({ year: Number(item.value) as MbbsYear }, 'Year')}
                  >
                    {item.label}
                  </ToggleChip>
                ))}
              </div>
            </fieldset>
            <TextField
              type="date"
              label="Exam date"
              hint={countdown(profile.examDate, today)}
              value={profile.examDate ?? ''}
              onChange={(event) => change({ examDate: event.target.value || null }, 'Exam date')}
            />
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-medium text-fg">Time each day</legend>
              <div className="flex flex-wrap gap-2">
                {MINUTES.map((item) => (
                  <ToggleChip
                    key={item.value}
                    pressed={profile.dailyMinutes === Number(item.value)}
                    onClick={() => change({ dailyMinutes: Number(item.value) }, 'Time each day')}
                  >
                    {item.label}
                  </ToggleChip>
                ))}
              </div>
            </fieldset>
            <Text size="sm" tone="muted">
              Today’s plan follows these straight away.
            </Text>
          </Section>
        </div>

        <div className="flex flex-col gap-4">
          <AtAGlance topics={topics} today={today} />

          <Section
            title="Your books"
            action={
              <Link href="/books" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                {chosen.length > 0 ? 'Change' : 'Choose'}
              </Link>
            }
          >
            {chosen.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {chosen.map((title) => (
                  <li
                    key={title}
                    className="rounded-full border border-glass-border bg-surface/60 px-3 py-1 text-sm font-semibold text-ink"
                  >
                    {title}
                  </li>
                ))}
              </ul>
            ) : (
              <Text size="sm" tone="muted">
                Pick the books you read, and lessons point to their pages.
              </Text>
            )}
          </Section>

          <AccountSection adult={profile.adult} />

          <Section title="Look">
            <div>
              <ThemeToggle />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
