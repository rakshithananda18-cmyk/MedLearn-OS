'use client';

import type { Book } from '@medlearn/schemas';
import { buttonClasses, Card, MultiChoiceGroup, Text } from '@medlearn/ui';
import Link from 'next/link';

import { chooseBooks, useProgress } from '@/features/progress/store';

export interface BookShelf {
  subjectName: string;
  books: Book[];
}

/** Each subject's standard books; the student ticks the ones they follow. Saved as they tap. */
export function BookChooser({ shelves }: Readonly<{ shelves: BookShelf[] }>) {
  const { profile } = useProgress();
  if (!profile) {
    return (
      <Card tone="glass" className="flex flex-col gap-3">
        <Text>Set up your study plan first; your books are saved with it.</Text>
        <div>
          <Link href="/welcome" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
            Set up my plan
          </Link>
        </div>
      </Card>
    );
  }

  const chosen = profile.books ?? [];
  return (
    <div className="flex flex-col gap-8">
      {shelves.map(({ subjectName, books }) => {
        const ids = new Set(books.map((book) => book.id));
        return (
          <section key={subjectName} className="flex flex-col gap-3">
            <h2 className="font-display text-2xl tracking-display text-ink">{subjectName}</h2>
            <MultiChoiceGroup
              legend={`${subjectName} books`}
              name={`books-${subjectName}`}
              options={books.map((book) => ({
                value: book.id,
                label: book.shortTitle,
                description: book.edition ? `${book.title}, ${book.edition}` : book.title,
              }))}
              value={chosen.filter((id) => ids.has(id))}
              // Other subjects' choices stay as they are.
              onChange={(picked) =>
                chooseBooks([...chosen.filter((id) => !ids.has(id)), ...picked])
              }
            />
          </section>
        );
      })}
    </div>
  );
}
