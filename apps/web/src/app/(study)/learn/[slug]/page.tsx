import { Badge, buttonClasses, Card, Heading, Stack, Text } from '@medlearn/ui';
import { Clock } from '@medlearn/ui/icons';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getTopic, TOPICS } from '@/content/topics';
import { SampleContentBanner } from '@/features/content/SampleContentBanner';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return { title: topic ? `${topic.title} | MedLearn OS` : 'Topic | MedLearn OS' };
}

/** Topic hub: one entry point to learn, practise and revise a topic. */
export default async function TopicPage({ params }: Props) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();

  return (
    <>
      <SampleContentBanner reviewed={topic.reviewed} />
      <Stack gap={2}>
        <Heading level={1}>{topic.title}</Heading>
        <Text tone="muted">{topic.summary}</Text>
        <div>
          <Badge tone="primary" icon={Clock}>
            {topic.estimatedMinutes} min
          </Badge>
        </div>
      </Stack>
      <Card>
        <Stack gap={3}>
          <Link href={`/learn/${topic.slug}/lesson`} className={buttonClasses({ fullWidth: true })}>
            Start lesson
          </Link>
          <Link
            href="/practice"
            className={buttonClasses({ variant: 'secondary', fullWidth: true })}
          >
            Practice questions
          </Link>
          <Link href="/revise" className={buttonClasses({ variant: 'secondary', fullWidth: true })}>
            Revise recall cards
          </Link>
        </Stack>
      </Card>
      <Text size="sm" tone="muted">
        {topic.lesson.length} lesson steps · {topic.questions.length} questions ·{' '}
        {topic.cards.length} recall cards
      </Text>
    </>
  );
}
