import { Display, Eyebrow, Text } from '@medlearn/ui';
import type { Metadata } from 'next';
import { connection } from 'next/server';

import { BOOKS } from '@/content/books';
import { BookChooser } from '@/features/books/BookChooser';
import { Screen } from '@/features/shell/Screen';
import { listSubjects } from '@/server/db';

export const metadata: Metadata = { title: 'My books | MedLearn OS' };

/** The student picks the standard books they follow; every topic then points to them first. */
export default async function BooksPage() {
  await connection();
  const subjects = await listSubjects();
  const shelves = subjects
    .map((subject) => ({
      subjectName: subject.name,
      books: BOOKS.filter((book) => book.subjectSlug === subject.slug),
    }))
    .filter((shelf) => shelf.books.length > 0);

  return (
    <Screen>
      <div className="flex flex-col gap-3">
        <Eyebrow>My books</Eyebrow>
        <Display>
          Your books, <em>one place</em>
        </Display>
        <Text tone="muted">
          Tick the books you follow. Every topic then shows where to read it in your books first,
          with the others alongside.
        </Text>
      </div>
      <BookChooser shelves={shelves} />
    </Screen>
  );
}
