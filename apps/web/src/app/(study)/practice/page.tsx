import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { studyTopic } from '@/content/study-selection';
import { PLANNABLE_TOPICS, practiceQuestions } from '@/content/topics';
import { PracticeView } from '@/features/practice/PracticeView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Practice | MedLearn OS' };

interface Props {
  readonly searchParams: Promise<{ topic?: string | string[] }>;
}

export default async function PracticePage({ searchParams }: Props) {
  const topic = studyTopic((await searchParams).topic);
  if (topic === null) notFound();
  const topics = topic
    ? PLANNABLE_TOPICS.filter((item) => item.slug === topic.slug)
    : PLANNABLE_TOPICS;
  const questions = practiceQuestions().filter((item) => !topic || item.topic.slug === topic.slug);

  return (
    <Screen width="wide">
      <PracticeView
        key={topic?.slug ?? 'all'}
        topics={topics}
        questions={questions}
        topic={topic ? { slug: topic.slug, title: topic.title } : undefined}
      />
    </Screen>
  );
}
