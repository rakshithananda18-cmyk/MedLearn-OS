import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { reviewLimit, studyTopic } from '@/content/study-selection';
import { PLANNABLE_TOPICS, recallDeck } from '@/content/topics';
import { ReviseView } from '@/features/revise/ReviseView';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Revise | MedLearn OS' };

interface Props {
  readonly searchParams: Promise<{ topic?: string | string[]; limit?: string | string[] }>;
}

export default async function RevisePage({ searchParams }: Props) {
  const query = await searchParams;
  const topic = studyTopic(query.topic);
  if (topic === null) notFound();
  const limit = reviewLimit(query.limit);
  const topics = topic
    ? PLANNABLE_TOPICS.filter((item) => item.slug === topic.slug)
    : PLANNABLE_TOPICS;
  const cards = recallDeck().filter((item) => !topic || item.topic.slug === topic.slug);

  return (
    <Screen width="wide">
      <ReviseView
        key={`${topic?.slug ?? 'all'}-${limit ?? 'all'}`}
        topics={topics}
        cards={cards}
        topic={topic ? { slug: topic.slug, title: topic.title } : undefined}
        limit={limit}
      />
    </Screen>
  );
}
