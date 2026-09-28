'use client';

import {
  bestStreak,
  buildTodayPlan,
  currentStreak,
  dayKey,
  dayOf,
  dueCardIds,
  lastDays,
  type LearnerProgress,
  openQuestionIds,
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

import {
  BodyCard,
  PlanCard,
  StreakCard,
  Tallies,
  type Tally,
  TimeRing,
  UpNext,
  WeakSpots,
} from './parts';

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
            ? `Today has ${reviews.count} of ${reviews.count + plan.heldBackReviews} reviews. The other ${plan.heldBackReviews} are spread over the next ${plural(plan.catchUpDays, 'day')}.`
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

function talliesFor(progress: LearnerProgress, topics: TopicSummary[], now: Date): Tally[] {
  const questions = topics.reduce(
    (total, topic) => total + openQuestionIds(topic, progress).length,
    0,
  );
  const drills = topics.filter(
    (topic) =>
      topic.drillMinutes !== null &&
      progress.completedLessons.includes(topic.slug) &&
      !progress.completedDrills.includes(topic.slug),
  );
  return [
    {
      label: 'Recall',
      detail: 'cards due',
      count: dueCardIds(topics, progress, now).length,
      href: '/revise',
    },
    { label: 'Practice', detail: 'questions', count: questions, href: '/practice' },
    {
      label: 'Draw',
      detail: 'exam diagrams',
      count: drills.length,
      href: drills[0] ? `/learn/${drills[0].slug}/draw` : '/subjects',
    },
  ];
}

/** Topics with missed questions, most first. */
function weakSpots(progress: LearnerProgress, topics: TopicSummary[]) {
  return topics
    .map((topic) => ({
      title: topic.title,
      count: topic.questionIds.filter((id) => progress.mistakes.includes(id)).length,
    }))
    .filter((spot) => spot.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

/**
 * The Today screen: the next thing to do as the hero, today's plan ticking itself off, and the
 * streak and time that keep a student coming back. One column on phones, a sidebar on laptops.
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
  const date = longDate(now);

  return (
    <div className="@container flex flex-col gap-6 xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="flex min-w-0 flex-col gap-4 xl:col-span-2">
        <div className="flex flex-col gap-3">
          {/* The server renders in its own time zone; the browser's date wins. */}
          <Eyebrow suppressHydrationWarning>{date}</Eyebrow>
          <Display>{HEADLINE[plan.mode]}</Display>
          {plan.examInDays === null ? null : (
            <div>
              <Pill icon={Hourglass}>{examLabel(plan.examInDays)}</Pill>
            </div>
          )}
        </div>

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

        {first ? (
          <UpNext item={first} poster={firstTopic?.poster ?? null} />
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

        <div className="grid gap-4 @2xl:grid-cols-2">
          {first || done.length > 0 ? (
            <PlanCard done={done} items={plan.items} planned={planned} goal={plan.dailyMinutes} />
          ) : null}
          <div className="flex flex-col gap-4">
            <Tallies tallies={talliesFor(progress, topics, now)} />
            <BodyCard
              learnt={
                topics.filter((topic) => progress.completedLessons.includes(topic.slug)).length
              }
              total={topics.length}
            />
          </div>
        </div>

        {/* After the plan: the day's tasks come first. */}
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
      </div>

      <aside aria-label="Your momentum" className="grid gap-4 @2xl:grid-cols-2 xl:flex xl:flex-col">
        <StreakCard
          streak={currentStreak(progress.activity, now)}
          best={bestStreak(progress.activity)}
          week={lastDays(progress.activity, now)}
        />
        <TimeRing minutes={dayOf(progress.activity, now).minutes} goal={plan.dailyMinutes} />
        <WeakSpots spots={weakSpots(progress, topics)} />
      </aside>
    </div>
  );
}
