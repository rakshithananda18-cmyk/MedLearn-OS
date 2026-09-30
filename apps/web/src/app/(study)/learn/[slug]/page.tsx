import { Display, Eyebrow, Text } from '@medlearn/ui';
import { BookOpen, ClipboardCheck, PenLine, Rotate3d, RotateCcw } from '@medlearn/ui/icons';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBook } from '@/content/books';
import {
  DRILL_MINUTES,
  getTopic,
  hasDrill,
  PLANNABLE_TOPICS,
  posterOf,
  TOPICS,
} from '@/content/topics';
import { videosOf } from '@/content/videos';
import { WhereToRead } from '@/features/books/WhereToRead';
import { ContentTrust } from '@/features/content/ContentTrust';
import { MasteryCard } from '@/features/progress/MasteryCard';
import { BackLink } from '@/features/shell/BackLink';
import { Screen } from '@/features/shell/Screen';
import { ModeTile, type ModeTileProps } from '@/features/topic/TopicParts';
import { TopicStudy } from '@/features/topic/TopicStudy';

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

/** Topic hub: one entry point to every mode of a topic (learn, practise, revise, exam). */
export default async function TopicPage({ params }: Props) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();

  const summary = PLANNABLE_TOPICS.find((item) => item.slug === topic.slug);
  const modes: Array<Omit<ModeTileProps, 'wide'>> = [
    {
      href: `/learn/${topic.slug}/lesson`,
      icon: BookOpen,
      title: 'Start lesson',
      meta: `${topic.lesson.length} steps · ${topic.estimatedMinutes} min`,
      primary: true,
    },
    {
      href: `/practice?topic=${topic.slug}`,
      icon: ClipboardCheck,
      title: 'Practice',
      meta: `${topic.questions.length} questions`,
    },
    {
      href: `/revise?topic=${topic.slug}`,
      icon: RotateCcw,
      title: 'Recall',
      meta: `${topic.cards.length} cards, spaced`,
    },
    ...(topic.visual.kind === 'path' && topic.visual.model3d
      ? [
          {
            href: `/studio?topic=${topic.slug}`,
            icon: Rotate3d,
            title: 'Explore in 3D',
            meta: 'Layers, draw, Find it',
          },
        ]
      : []),
    ...(hasDrill(topic)
      ? [
          {
            href: `/learn/${topic.slug}/draw`,
            icon: PenLine,
            title: 'Draw it',
            meta: `Exam diagram · ${DRILL_MINUTES} min`,
          },
        ]
      : []),
  ];
  const poster = posterOf(topic);
  const readings = topic.readIn.flatMap((ref) => {
    const book = getBook(ref.bookId);
    return book ? [{ ...ref, shortTitle: book.shortTitle, title: book.title }] : [];
  });

  return (
    <Screen width="wide">
      <TopicStudy
        slug={topic.slug}
        title={topic.title}
        poster={poster}
        videos={videosOf(topic.slug)}
        // Back up to the library, with this topic still picked there.
        back={
          <BackLink
            href={`/subjects?topic=${topic.slug}`}
            label="Back to the library"
            text="Library"
          />
        }
        intro={
          <div className="flex flex-col gap-2">
            <Eyebrow>
              {topic.subjectSlug} · {topic.estimatedMinutes} min
            </Eyebrow>
            <Display size="lg">{topic.title}</Display>
            <Text tone="muted">{topic.summary}</Text>
            <ContentTrust topic={topic}>
              <WhereToRead readings={readings} />
            </ContentTrust>
          </div>
        }
        study={
          <>
            <ul aria-label="Ways to study this topic" className="grid grid-cols-2 gap-3">
              {modes.map((mode, index) => (
                <ModeTile
                  key={mode.href}
                  {...mode}
                  wide={modes.length % 2 === 1 && index === modes.length - 1}
                />
              ))}
            </ul>
            {summary ? <MasteryCard topic={summary} /> : null}
          </>
        }
        keyFacts={topic.keyFacts.slice(0, 5)}
      />
    </Screen>
  );
}
