'use client';

import {
  bestStreak,
  buildTodayPlan,
  currentStreak,
  dayKey,
  dayOf,
  type ExamPhase,
  goalToday,
  lastDays,
  type LearnerProgress,
  type TodayPlan,
} from '@medlearn/core';
import {
  Button,
  buttonClasses,
  Card,
  Display,
  EmptyState,
  Eyebrow,
  Medallion,
  Pill,
  Text,
} from '@medlearn/ui';
import { CircleCheck, GraduationCap, Hourglass, Library, Sunrise } from '@medlearn/ui/icons';
import Link from 'next/link';

import type { TopicSummary } from '@/content/topics';
import { acceptCatchUp, useProgress } from '@/features/progress/store';
import { LiveSearch } from '@/features/search/LiveSearch';

import { GoalsCard, PlanCard, StreakCard, StreakPill, TimeRing, UpNext, WeakSpots } from './parts';

const HEADLINE = {
  normal: (
    <>
      Small steps, <em>every day</em>
    </>
  ),
  'catch-up': (
    <>
      Welcome back, <em>gently</em>
    </>
  ),
  exam: (
    <>
      Exam ahead, <em>stay steady</em>
    </>
  ),
} as const;

/** What each stretch before the exam is for, as Today orders it. */
const PHASE_TIP: Record<ExamPhase, string> = {
  cover: 'A month out: exam diagrams first, then keep covering new topics.',
  consolidate: 'Two weeks out: diagrams, revisits and recall before anything new.',
  sharpen: 'The last week: diagrams and practice only, no new topics.',
  light: 'Light recall only. Rest well for the exam.',
};

// "Monday, 28 September" from two lists: building an Intl date formatter blocks a phone for tens
// of milliseconds, the largest single cost of opening Today.
// ponytail: English only; use Intl again (created after first paint) when the Hindi toggle lands.
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const longDate = (date: Date) =>
  `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

function examLabel(days: number): string {
  if (days === 0) return 'Exam today';
  if (days === 1) return 'Exam tomorrow';
  return `Exam in ${days} days`;
}

function CatchUpCard({ plan, accepted }: Readonly<{ plan: TodayPlan; accepted: boolean }>) {
  const reviews = plan.items.find((item) => item.kind === 'review');
  return (
    <Card tone="glass" as="section" aria-labelledby="catch-up-title" className="flex gap-4">
      <Medallion icon={Sunrise} />
      <div className="flex flex-1 flex-col gap-2">
        <h2 id="catch-up-title" className="font-semibold text-ink">
          You were away for {plural(plan.missedDays, 'day')}
        </h2>
        <Text size="sm" tone="muted">
          {plan.heldBackReviews > 0 && reviews?.kind === 'review'
            ? `Start with ${reviews.count} of ${reviews.count + plan.heldBackReviews} reviews. The other ${plan.heldBackReviews} stay saved for a later session.`
            : 'Today’s plan is short so you can ease back in. What you learned comes first.'}
        </Text>
        <div role="status">
          {accepted ? (
            <Text size="sm" weight="semibold">
              Plan accepted. Start with the first step below.
            </Text>
          ) : null}
        </div>
        {accepted ? null : (
          <div>
            <Button size="sm" variant="secondary" onClick={() => acceptCatchUp()}>
              Accept plan
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

/** A prompt card: an icon, a question and one way to answer it. */
function Prompt({
  id,
  icon,
  title,
  text,
  href,
  action,
}: Readonly<{
  id: string;
  icon: typeof GraduationCap;
  title: string;
  text: string;
  href: string;
  action: string;
}>) {
  return (
    <Card tone="glass" as="section" aria-labelledby={id} className="flex gap-4">
      <Medallion icon={icon} />
      <div className="flex flex-1 flex-col gap-2">
        <h2 id={id} className="font-semibold text-ink">
          {title}
        </h2>
        <Text size="sm" tone="muted">
          {text}
        </Text>
        <div>
          <Link href={href} className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
            {action}
          </Link>
        </div>
      </div>
    </Card>
  );
}

/** What is already done today, as the plan's ticked lines. */
function doneToday(progress: LearnerProgress, topics: TopicSummary[], now: Date): string[] {
  const day = dayOf(progress.activity, now);
  const title = (slug: string) => topics.find((topic) => topic.slug === slug)?.title ?? slug;
  return [
    ...day.lessons.map((slug) => `Learned: ${title(slug)}`),
    ...day.drills.map((slug) => `Drew: ${title(slug)}`),
    ...(day.reviewed > 0 ? [`Recalled ${plural(day.reviewed, 'card')}`] : []),
    ...(day.answered > 0 ? [`Answered ${plural(day.answered, 'question')}`] : []),
  ];
}

/** Topics with missed questions, most first. */
function weakSpots(progress: LearnerProgress, topics: TopicSummary[]) {
  return topics
    .map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      count: topic.questionIds.filter((id) => progress.mistakes.includes(id)).length,
    }))
    .filter((spot) => spot.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

/** The planned tests and revisits still ahead, soonest first. */
function upcomingGoals(progress: LearnerProgress, now: Date) {
  const today = dayKey(now);
  return progress.goals
    .map((goal) => ({
      id: goal.id,
      title: goal.title,
      kind: goal.kind,
      daysLeft: goalToday(goal, today).daysLeft,
      done: goal.done.length,
      total: goal.topics.length,
    }))
    .filter((goal) => goal.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

/**
 * The Today screen, built for focus: the next step and the day's plan fill the main column; the
 * streak, the minutes, planned tests and weak spots sit to the side on wide screens and follow
 * below on phones. Prompts to set up (the plan, the books) or to ease back in come first.
 */
export function TodayView({ topics }: Readonly<{ topics: TopicSummary[] }>) {
  const progress = useProgress();
  const now = new Date();
  const plan = buildTodayPlan(topics, progress, now);
  const planned = plan.items.reduce((total, item) => total + item.minutes, 0);
  const first = plan.items[0];
  const firstTopic =
    first && first.kind !== 'review'
      ? topics.find((topic) => topic.slug === first.topicSlug)
      : null;
  const done = doneToday(progress, topics, now);
  const week = lastDays(progress.activity, now);
  const streak = currentStreak(progress.activity, now);

  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:items-start">
      <header className="flex flex-wrap items-end justify-between gap-3 xl:col-span-3">
        <div className="flex flex-col gap-1">
          {/* The server renders in its own time zone; the browser's date wins. */}
          <Eyebrow suppressHydrationWarning>{longDate(now)}</Eyebrow>
          <Display size="lg">{HEADLINE[plan.mode]}</Display>
          {plan.examPhase ? (
            <Text size="sm" tone="muted">
              {PHASE_TIP[plan.examPhase]}
            </Text>
          ) : null}
        </div>
        <div className="relative flex items-center gap-2 max-md:w-full">
          {plan.examInDays === null ? null : (
            <Pill icon={Hourglass}>{examLabel(plan.examInDays)}</Pill>
          )}
          <StreakPill streak={streak} className="xl:hidden" />
          <LiveSearch topics={topics} className="min-w-0 flex-1 md:w-sm md:flex-none" />
        </div>
      </header>

      <div className="flex min-w-0 flex-col gap-4 xl:col-span-2">
        {progress.profile ? null : (
          <Prompt
            id="setup-title"
            icon={GraduationCap}
            title="Make this plan yours"
            text="Tell us your age, year, next exam and daily time. Four quick questions."
            href="/welcome"
            action="Set up my plan"
          />
        )}
        {plan.mode === 'catch-up' ? (
          <CatchUpCard plan={plan} accepted={progress.catchUpAcceptedOn === dayKey(now)} />
        ) : null}
        {progress.profile && !progress.profile.books ? (
          <Prompt
            id="books-title"
            icon={Library}
            title="Which books do you follow?"
            text="Pick them once. Every topic then shows where to read it in your books."
            href="/books"
            action="Choose my books"
          />
        ) : null}
        {first ? (
          <UpNext
            item={first}
            poster={firstTopic?.poster ?? null}
            summary={firstTopic?.summary ?? null}
          />
        ) : (
          <Card tone="glass">
            <EmptyState
              icon={CircleCheck}
              title="All done for today"
              description="New reviews appear here when it is time to recall them."
              action={
                <Link href="/subjects" className={buttonClasses({ variant: 'secondary' })}>
                  Browse the library
                </Link>
              }
            />
          </Card>
        )}
        {first || done.length > 0 ? (
          <PlanCard done={done} items={plan.items} planned={planned} goal={plan.dailyMinutes} />
        ) : null}
      </div>

      <aside aria-label="Your progress" className="flex min-w-0 flex-col gap-4 xl:sticky xl:top-8">
        <StreakCard streak={streak} best={bestStreak(progress.activity)} week={week} />
        <TimeRing minutes={dayOf(progress.activity, now).minutes} goal={plan.dailyMinutes} />
        <GoalsCard goals={upcomingGoals(progress, now)} />
        <WeakSpots spots={weakSpots(progress, topics)} />
      </aside>
    </div>
  );
}
