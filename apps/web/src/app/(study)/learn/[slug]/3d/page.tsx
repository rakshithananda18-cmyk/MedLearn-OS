import { Display, Eyebrow, Text } from '@medlearn/ui';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTopic, TOPICS } from '@/content/topics';
import { ContentTrust } from '@/features/content/ContentTrust';
import { Explore3D } from '@/features/explore3d/Explore3D';
import { Screen } from '@/features/shell/Screen';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOPICS.filter((topic) => topic.visual.kind === 'path' && topic.visual.model3d).map(
    (topic) => ({ slug: topic.slug }),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return { title: topic ? `3D: ${topic.title} | MedLearn OS` : '3D | MedLearn OS' };
}

export default async function Explore3DPage({ params }: Props) {
  const topic = getTopic((await params).slug);
  if (!topic || topic.visual.kind !== 'path' || !topic.visual.model3d) notFound();

  return (
    <Screen width="wide">
      <ContentTrust topic={topic} />
      <div className="flex flex-col gap-3">
        <Eyebrow>Explore in 3D</Eyebrow>
        <Display size="lg">
          {topic.title} <em>in 3D</em>
        </Display>
        <Text tone="muted">Pick a nerve to light its whole path from the spine to the arm.</Text>
      </div>
      <Explore3D
        title={`3D model: ${topic.title}, with the shoulder bones and arteries`}
        model={topic.visual.model3d}
        diagram={topic.visual.diagram}
      />
    </Screen>
  );
}
