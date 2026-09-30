import type { Metadata } from 'next';
import { connection } from 'next/server';

import { BOOKS, getBook } from '@/content/books';
import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, posterOf, TOPICS } from '@/content/topics';
import { Library } from '@/features/library/Library';
import type { TopicPreviewData } from '@/features/library/TopicPreview';
import { Screen } from '@/features/shell/Screen';
import { getSubjectsRepository } from '@/server/db';

export const metadata: Metadata = { title: 'Library | MedLearn OS' };

/** How many key facts the preview shows. */
const PREVIEW_FACTS = 3;

interface Props {
  readonly searchParams: Promise<{ topic?: string | string[]; view?: string | string[] }>;
}

export default async function SubjectsPage({ searchParams }: Props) {
  await connection();
  const { topic: asked, view } = await searchParams;
  const subjects = await getSubjectsRepository().list();
  const subjectName = (slug: string) =>
    subjects.find((subject) => subject.slug === slug)?.name ?? slug;
  const previews = Object.fromEntries(
    TOPICS.flatMap((topic): Array<[string, TopicPreviewData]> => {
      const summary = PLANNABLE_TOPICS.find((item) => item.slug === topic.slug);
      if (!summary) return [];
      return [
        [
          topic.slug,
          {
            topic: summary,
            subject: subjectName(topic.subjectSlug),
            keyFacts: topic.keyFacts.slice(0, PREVIEW_FACTS),
            lessonSteps: topic.lesson.length,
            hasModel: posterOf(topic) !== null,
            readings: topic.readIn.flatMap((ref) => {
              const book = getBook(ref.bookId);
              return book ? [{ ...ref, shortTitle: book.shortTitle, title: book.title }] : [];
            }),
          },
        ],
      ];
    }),
  );

  return (
    <Screen width="wide">
      <Library
        subjects={subjects.map((subject) => ({
          slug: subject.slug,
          name: subject.name,
          nodes: libraryTree(TOPICS.filter((topic) => topic.subjectSlug === subject.slug)),
        }))}
        previews={previews}
        books={Object.fromEntries(BOOKS.map((book) => [book.id, book.shortTitle]))}
        initialTopic={typeof asked === 'string' && asked in previews ? asked : null}
        initialView={view === 'progress' ? 'progress' : 'topics'}
      />
    </Screen>
  );
}
