import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTopic, TOPICS } from '@/content/topics';
import { LessonView } from '@/features/lesson/LessonView';
import { Screen } from '@/features/shell/Screen';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return { title: topic ? `Lesson: ${topic.title} | MedLearn OS` : 'Lesson | MedLearn OS' };
}

export default async function LessonPage({ params }: Props) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();

  return (
    <Screen width="wide">
      <LessonView topic={topic} />
    </Screen>
  );
}
