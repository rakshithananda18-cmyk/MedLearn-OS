import type { Metadata } from 'next';

import { ReviseView } from '@/features/revise/ReviseView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Revise | MedLearn OS' };

export default function RevisePage() {
  return (
    <Screen>
      <ReviseView />
    </Screen>
  );
}
