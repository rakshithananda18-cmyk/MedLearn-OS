import type { Metadata } from 'next';

import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import { PlanCalendar } from '@/features/plan/PlanCalendar';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Plan | MedLearn OS' };

interface Props {
  readonly params: Promise<{ id: string }>;
}

/** One plan's calendar; the plan itself lives in the student's progress on the device. */
export default async function PlanCalendarPage({ params }: Props) {
  const { id } = await params;
  return (
    <Screen width="wide">
      <PlanCalendar id={id} topics={PLANNABLE_TOPICS} tree={libraryTree(TOPICS)} />
    </Screen>
  );
}
