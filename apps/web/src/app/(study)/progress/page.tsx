import type { Metadata } from 'next';

import { PLANNABLE_TOPICS } from '@/content/topics';
import { ProgressView } from '@/features/progress/ProgressView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Progress | MedLearn OS' };

export default function ProgressPage() {
  return (
    <Screen width="wide">
      <ProgressView topics={PLANNABLE_TOPICS} />
    </Screen>
  );
}
