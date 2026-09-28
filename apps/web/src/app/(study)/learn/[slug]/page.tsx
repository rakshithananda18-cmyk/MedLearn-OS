import { Display, Eyebrow, Text } from '@medlearn/ui';
import { BookOpen, ClipboardCheck, PenLine, Rotate3d, RotateCcw } from '@medlearn/ui/icons';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBook } from '@/content/books';
import { DRILL_MINUTES, getTopic, hasDrill, TOPICS } from '@/content/topics';
import { WhereToRead } from '@/features/books/WhereToRead';
import { ContentTrust } from '@/features/content/ContentTrust';
import { TopicNotes } from '@/features/notes/TopicNotes';
import { LinkCard } from '@/features/shell/LinkCard';
import { Screen } from '@/features/shell/Screen';

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

  const modes = [
    {
      href: `/learn/${topic.slug}/lesson`,
      icon: BookOpen,
      title: 'Start lesson',
      meta: `Visual lesson · ${topic.lesson.length} steps · ${topic.estimatedMinutes} min`,
    },
    {
      href: '/practice',
      icon: ClipboardCheck,
      title: 'Practice questions',
      meta: `${topic.questions.length} questions, unlocked by the lesson`,
    },
    {
      href: '/revise',
      icon: RotateCcw,
      title: 'Revise recall cards',
      meta: `${topic.cards.length} cards, spaced over the coming weeks`,
    },
    ...(topic.visual.kind === 'path' && topic.visual.model3d
      ? [
          {
            href: `/learn/${topic.slug}/3d`,
            icon: Rotate3d,
            title: 'Explore in 3D',
            meta:
              topic.visual.model3d.nerves.length > 0
                ? 'Trace each nerve around the shoulder bones and arteries'
                : 'See it among the shoulder bones and arteries',
          },
        ]
      : []),
    ...(hasDrill(topic)
      ? [
          {
            href: `/learn/${topic.slug}/draw`,
            icon: PenLine,
            title: 'Draw the exam diagram',
            meta: `Build it layer by layer · ${DRILL_MINUTES} min`,
          },
        ]
      : []),
  ];

  return (
    <Screen>
      <ContentTrust topic={topic} />
      <div className="flex flex-col gap-3">
        <Eyebrow>
          {topic.subjectSlug} · {topic.estimatedMinutes} min
        </Eyebrow>
        <Display>{topic.title}</Display>
        <Text tone="muted">{topic.summary}</Text>
      </div>
      <ul aria-label="Ways to study this topic" className="grid gap-3 md:grid-cols-2">
        {modes.map((mode, index) => (
          <li key={mode.href}>
            <LinkCard {...mode} style={{ animationDelay: `${index * 60}ms` }} />
          </li>
        ))}
      </ul>
      <WhereToRead
        readings={topic.readIn.flatMap((ref) => {
          const book = getBook(ref.bookId);
          return book ? [{ ...ref, shortTitle: book.shortTitle, title: book.title }] : [];
        })}
      />
      <TopicNotes topicSlug={topic.slug} />
    </Screen>
  );
}
