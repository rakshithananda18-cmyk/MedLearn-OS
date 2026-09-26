import type { Metadata } from 'next';

import { Screen } from '@/features/shell/Screen';
import { TodayView } from '@/features/today/TodayView';

export const metadata: Metadata = { title: 'Today | MedLearn OS' };

export default function TodayPage() {
  return (
    <Screen width="wide">
      <TodayView />
    </Screen>
  );
}
