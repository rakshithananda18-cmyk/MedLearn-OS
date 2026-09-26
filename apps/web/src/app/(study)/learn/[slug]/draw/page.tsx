import { Display, Eyebrow } from '@medlearn/ui';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTopic, hasDrill, TOPICS } from '@/content/topics';
import { ContentTrust } from '@/features/content/ContentTrust';
import { DrillView } from '@/features/drill/DrillView';
import { Screen } from '@/features/shell/Screen';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOPICS.filter(hasDrill).map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return { title: topic ? `Draw: ${topic.title} | MedLearn OS` : 'Draw | MedLearn OS' };
}

export default async function DrawPage({ params }: Props) {
  const topic = getTopic((await params).slug);
  if (!topic || topic.visual.kind !== 'path' || topic.visual.drill.length === 0) notFound();

  return (
    <Screen width="wide">
      <ContentTrust topic={topic} />
      <div className="flex flex-col gap-3">
        <Eyebrow>Exam diagram · {topic.title}</Eyebrow>
        <Display size="lg">
          Draw it <em>layer by layer</em>
        </Display>
      </div>
      <DrillView
        topicSlug={topic.slug}
        title={topic.title}
        diagram={topic.visual.diagram}
        steps={topic.visual.drill}
      />
    </Screen>
  );
}
