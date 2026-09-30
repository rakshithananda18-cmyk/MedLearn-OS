import type { Metadata } from 'next';

import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, practiceQuestions, TOPICS } from '@/content/topics';
import { PracticeView } from '@/features/practice/PracticeView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Practice | MedLearn OS' };

interface Props {
  readonly searchParams: Promise<{
    topic?: string | string[];
    goal?: string | string[];
    revisit?: string | string[];
  }>;
}

const one = (value: string | string[] | undefined) =>
  typeof value === 'string' ? value : undefined;

/** Practice: ways in, strengths by section and planned tests; ?topic= starts that topic's questions. */
export default async function PracticePage({ searchParams }: Props) {
  const { topic, goal, revisit } = await searchParams;
  const start = { topic: one(topic), goal: one(goal), revisit: one(revisit) };
  return (
    <Screen width="wide">
      <PracticeView
        // A new address (from Today's plan) starts afresh.
        key={`${start.topic ?? ''}-${start.goal ?? ''}-${start.revisit ?? ''}`}
        topics={PLANNABLE_TOPICS}
        questions={practiceQuestions()}
        tree={libraryTree(TOPICS)}
        start={start}
      />
    </Screen>
  );
}
