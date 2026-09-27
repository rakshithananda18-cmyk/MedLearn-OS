import type { Metadata } from 'next';

import { PLANNABLE_TOPICS } from '@/content/topics';
import { Screen } from '@/features/shell/Screen';
import { TodayView } from '@/features/today/TodayView';

export const metadata: Metadata = { title: 'Today | MedLearn OS' };

export default function TodayPage() {
  return (
    <Screen width="wide">
      <TodayView topics={PLANNABLE_TOPICS} />
    </Screen>
  );
}
