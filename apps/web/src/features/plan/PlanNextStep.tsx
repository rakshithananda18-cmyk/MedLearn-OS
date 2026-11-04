import type { PlanStatus, StudyGoal } from '@medlearn/core';
import { buttonClasses, cx, Text } from '@medlearn/ui';
import { ChevronRight } from '@medlearn/ui/icons';
import Link from 'next/link';

import { dayName, topicHref } from './words';

/** The next action is separate from coverage, and an elapsed deadline is never completion. */
export function PlanNextStep({
  goal,
  status,
  next,
  coming,
  titleOf,
  adjustHref,
}: Readonly<{
  goal: StudyGoal;
  status: PlanStatus;
  next: string | undefined;
  coming: string | undefined;
  titleOf: (slug: string) => string;
  adjustHref: string;
}>) {
  const remaining = status.total - status.done;
  return (
    <section aria-label="Next step" className="flex min-w-0 flex-col items-start gap-2">
      {status.state === 'completed' ? (
        <Text weight="semibold">Plan complete. Every topic is done.</Text>
      ) : status.state === 'ended' ? (
        <>
          <Text weight="semibold">
            Deadline passed · {remaining} {remaining === 1 ? 'topic' : 'topics'} left
          </Text>
          <Text size="sm" tone="muted">
            Your completed work is saved. Change the finish date to continue the remaining topics.
          </Text>
          <Link href={adjustHref} className={buttonClasses({ variant: 'secondary' })}>
            Adjust dates
          </Link>
        </>
      ) : next ? (
        <Link
          href={topicHref(goal, next)}
          className={cx(buttonClasses({ fullWidth: true }), 'h-auto min-h-12 justify-between py-3')}
        >
          <span className="min-w-0 text-left">Continue: {titleOf(next)}</span>
          <ChevronRight size={18} aria-hidden="true" className="shrink-0" />
        </Link>
      ) : coming ? (
        <Text size="sm" tone="muted" suppressHydrationWarning>
          Nothing from this plan today. Next on {dayName(coming)}.
        </Text>
      ) : (
        <>
          <Text weight="semibold">No study days left before the deadline</Text>
          <Text size="sm" tone="muted">
            {remaining} topics are still to do. Choose another study day or a later finish date.
          </Text>
          <Link href={adjustHref} className={buttonClasses({ variant: 'secondary' })}>
            Adjust dates
          </Link>
        </>
      )}
    </section>
  );
}
