'use client';

import { buildTodayPlan, dayKey, type TodayItem, type TodayPlan } from '@medlearn/core';
import {
  ActionBar,
  Button,
  buttonClasses,
  Card,
  Display,
  EmptyState,
  Eyebrow,
  Heading,
  Icon,
  type IconGlyph,
  Medallion,
  Pill,
  Text,
} from '@medlearn/ui';
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Hourglass,
  PenLine,
  RotateCcw,
  Sunrise,
} from '@medlearn/ui/icons';
import Link from 'next/link';

import type { TopicSummary } from '@/content/topics';
import { acceptCatchUp, useProgress } from '@/features/progress/store';
import { LinkCard } from '@/features/shell/LinkCard';

function describe(item: TodayItem): { title: string; meta: string; href: string; icon: IconGlyph } {
  switch (item.kind) {
    case 'review':
      return {
        title: `Review ${item.count} ${item.count === 1 ? 'card' : 'cards'}`,
        meta: `${item.minutes} min · spaced recall`,
        href: '/revise',
        icon: RotateCcw,
      };
    case 'learn':
      return {
        title: `Learn: ${item.title}`,
        meta: `${item.minutes} min · visual lesson`,
        href: `/learn/${item.topicSlug}`,
        icon: BookOpen,
      };
    case 'practice':
      return {
        title: `Practice: ${item.title}`,
        meta: `${item.count} ${item.count === 1 ? 'question' : 'questions'} · ${item.minutes} min`,
        href: '/practice',
        icon: ClipboardCheck,
      };
    case 'drill':
      return {
        title: `Draw: ${item.title}`,
        meta: `${item.minutes} min · exam diagram`,
        href: `/learn/${item.topicSlug}/draw`,
        icon: PenLine,
      };
  }
}

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

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

function examLabel(days: number): string {
  if (days === 0) return 'Exam today';
  if (days === 1) return 'Exam tomorrow';
  return `Exam in ${days} days`;
}

function CatchUpCard({ plan, accepted }: { plan: TodayPlan; accepted: boolean }) {
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

/** The Today screen: the next few things to study, sized to the student's day. */
export function TodayView({ topics }: Readonly<{ topics: TopicSummary[] }>) {
  const progress = useProgress();
  const now = new Date();
  const plan = buildTodayPlan(topics, progress, now);
  const planned = plan.items.reduce((total, item) => total + item.minutes, 0);
  const first = plan.items[0];
  const date = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now);

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
      <div className="flex flex-col gap-4 lg:sticky lg:top-12 lg:col-span-2 lg:self-start">
        {/* The server renders in its own time zone; the browser's date wins. */}
        <Eyebrow suppressHydrationWarning>{date}</Eyebrow>
        <Display>{HEADLINE[plan.mode]}</Display>
        <div className="flex flex-wrap gap-2">
          <Pill icon={Clock}>
            {planned} of {plan.dailyMinutes} min
          </Pill>
          {plan.examInDays !== null ? (
            <Pill icon={Hourglass}>{examLabel(plan.examInDays)}</Pill>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-3">
        {progress.profile ? null : (
          <Card tone="glass" as="section" aria-labelledby="setup-title" className="flex gap-4">
            <Medallion icon={GraduationCap} />
            <div className="flex flex-1 flex-col gap-2">
              <h2 id="setup-title" className="font-semibold text-ink">
                Make this plan yours
              </h2>
              <Text size="sm" tone="muted">
                Tell us your age, year, next exam and daily time. Four quick questions.
              </Text>
              <div>
                <Link
                  href="/welcome"
                  className={buttonClasses({ variant: 'secondary', size: 'sm' })}
                >
                  Set up my plan
                </Link>
              </div>
            </div>
          </Card>
        )}

        {plan.mode === 'catch-up' ? (
          <CatchUpCard plan={plan} accepted={progress.catchUpAcceptedOn === dayKey(now)} />
        ) : null}

        {first ? (
          <>
            <Heading level={2} className="sr-only">
              Today’s plan
            </Heading>
            <ol className="flex flex-col gap-3" aria-label="Today's plan">
              {plan.items.map((item, index) => {
                const { title, meta, href, icon } = describe(item);
                return (
                  <li key={`${item.kind}-${href}`}>
                    <LinkCard
                      href={href}
                      icon={icon}
                      title={title}
                      meta={meta}
                      style={{ animationDelay: `${index * 60}ms` }}
                    />
                  </li>
                );
              })}
            </ol>
            <ActionBar floating className="md:hidden">
              <span className="flex min-w-0 flex-col pl-2">
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
                  Up next
                </span>
                <span className="truncate text-sm text-fg">{describe(first).title}</span>
              </span>
              <Link href={describe(first).href} className={buttonClasses()}>
                Start now
                <Icon icon={ArrowRight} />
              </Link>
            </ActionBar>
          </>
        ) : (
          <Card tone="glass">
            <EmptyState
              icon={CircleCheck}
              title="All done for today"
              description="New reviews appear here when it is time to recall them."
              action={
                <Link href="/subjects" className={buttonClasses({ variant: 'secondary' })}>
                  Browse subjects
                </Link>
              }
            />
          </Card>
        )}
      </div>
    </div>
  );
}
