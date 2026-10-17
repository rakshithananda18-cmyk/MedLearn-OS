import type { Metadata } from 'next';

import { PLANNABLE_TOPICS } from '@/content/topics';
import { PlanView } from '@/features/plan/PlanView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Plan | MedLearn OS' };

export default function PlanPage() {
  return (
    <Screen>
      <PlanView topics={PLANNABLE_TOPICS} />
    </Screen>
  );
}
