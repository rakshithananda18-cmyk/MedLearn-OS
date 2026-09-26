import type { Metadata } from 'next';

import { PLANNABLE_TOPICS, recallDeck } from '@/content/topics';
import { ReviseView } from '@/features/revise/ReviseView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Revise | MedLearn OS' };

export default function RevisePage() {
  return (
    <Screen>
      <ReviseView topics={PLANNABLE_TOPICS} cards={recallDeck()} />
    </Screen>
  );
}
