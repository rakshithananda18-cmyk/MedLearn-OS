'use client';

import { Card, Pill, Text } from '@medlearn/ui';
import { BookOpen } from '@medlearn/ui/icons';
import Link from 'next/link';

import { useProgress } from '@/features/progress/store';

export interface Reading {
  bookId: string;
  shortTitle: string;
  title: string;
  chapter: string;
  pages?: string;
}

/** Where each standard book covers this topic, the student's own books first. */
export function WhereToRead({ readings }: Readonly<{ readings: Reading[] }>) {
  const { profile } = useProgress();
  const mine = new Set(profile?.books ?? []);
  const ordered = [...readings].sort(
    (a, b) => Number(mine.has(b.bookId)) - Number(mine.has(a.bookId)),
  );

  return (
    <Card tone="glass" as="section" aria-labelledby="read-title" className="flex flex-col gap-3">
      <h2 id="read-title" className="font-semibold text-ink">
        Where to read this
      </h2>
      {ordered.length === 0 ? (
        <Text size="sm" tone="muted">
          Chapter and page references for this topic are on their way from the standard books.
        </Text>
      ) : (
        <ul className="flex flex-col gap-3">
          {ordered.map((reading) => (
            <li key={reading.bookId} className="flex flex-col gap-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink">{reading.shortTitle}</span>
                {mine.has(reading.bookId) ? <Pill icon={BookOpen}>Your book</Pill> : null}
              </span>
              <Text size="sm" tone="muted">
                {[reading.chapter, reading.pages && `pages ${reading.pages}`]
                  .filter(Boolean)
                  .join(', ')}{' '}
                · {reading.title}
              </Text>
            </li>
          ))}
        </ul>
      )}
      {profile && !profile.books ? (
        <Text size="sm">
          <Link
            href="/books"
            className="font-semibold text-primary-strong underline-offset-4 hover:underline"
          >
            Choose your books
          </Link>{' '}
          to see yours first.
        </Text>
      ) : null}
    </Card>
  );
}
