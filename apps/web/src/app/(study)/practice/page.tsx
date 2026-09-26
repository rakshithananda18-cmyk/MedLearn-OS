import type { Metadata } from 'next';

import { PLANNABLE_TOPICS, practiceQuestions } from '@/content/topics';
import { PracticeView } from '@/features/practice/PracticeView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Practice | MedLearn OS' };

export default function PracticePage() {
  return (
    <Screen>
      <PracticeView topics={PLANNABLE_TOPICS} questions={practiceQuestions()} />
    </Screen>
  );
}
