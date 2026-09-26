import type { Metadata } from 'next';

import { ProgressView } from '@/features/progress/ProgressView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Progress | MedLearn OS' };

export default function ProgressPage() {
  return (
    <Screen>
      <ProgressView />
    </Screen>
  );
}
