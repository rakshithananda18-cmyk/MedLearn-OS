import { Heading } from '@medlearn/ui';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTopic, TOPICS } from '@/content/topics';
import { SampleContentBanner } from '@/features/content/SampleContentBanner';
import { LessonView } from '@/features/lesson/LessonView';

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
    <>
      <SampleContentBanner reviewed={topic.reviewed} />
      <Heading level={1}>{topic.title}</Heading>
      <LessonView topic={topic} />
    </>
  );
}
