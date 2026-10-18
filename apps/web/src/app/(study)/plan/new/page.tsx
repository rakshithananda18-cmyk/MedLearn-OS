import type { Metadata } from 'next';

import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import { PlanBuilder } from '@/features/plan/PlanBuilder';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'New plan | MedLearn OS' };

export default function NewPlanPage() {
  return (
    <Screen>
      <PlanBuilder topics={PLANNABLE_TOPICS} tree={libraryTree(TOPICS)} />
    </Screen>
  );
}
