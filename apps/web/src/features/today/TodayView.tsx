'use client';

import { buildTodayPlan, type TodayItem } from '@medlearn/core';
import { buttonClasses, EmptyState, Heading, Icon, type IconGlyph, Text } from '@medlearn/ui';
import { BookOpen, ChevronRight, CircleCheck, ClipboardCheck, RotateCcw } from '@medlearn/ui/icons';
import Link from 'next/link';

import { PLANNABLE_TOPICS } from '@/content/topics';
import { useProgress } from '@/features/progress/store';

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
  }
}

/** The Today screen: the next few things to study, in order. */
export function TodayView() {
  const progress = useProgress();
  const plan = buildTodayPlan(PLANNABLE_TOPICS, progress, new Date());

  return (
    <>
      <div className="flex flex-col gap-1">
        <Heading level={1}>Today</Heading>
        <Text tone="muted">Your next steps, in order. Each one takes a few minutes.</Text>
      </div>
      {plan.length === 0 ? (
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
      ) : (
        <ol className="flex flex-col gap-3" aria-label="Today's plan">
          {plan.map((item) => {
            const { title, meta, href, icon } = describe(item);
            return (
              <li key={`${item.kind}-${href}`}>
                <Link
                  href={href}
                  className="flex items-center gap-4 rounded-md border border-border bg-surface p-4 shadow-raised transition-colors duration-150 hover:border-primary"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-strong">
                    <Icon icon={icon} />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-semibold text-ink">{title}</span>
                    <span className="text-sm text-fg-muted">{meta}</span>
                  </span>
                  <Icon icon={ChevronRight} className="text-fg-muted" />
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
