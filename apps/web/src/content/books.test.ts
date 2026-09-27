import { Book } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import { BOOKS, getBook } from './books';
import { TOPICS } from './topics';

describe('standard books', () => {
  it('match the Book schema, with unique ids', () => {
    for (const book of BOOKS) expect(Book.parse(book)).toEqual(book);
    expect(new Set(BOOKS.map((book) => book.id)).size).toBe(BOOKS.length);
  });

  it('cover every first-year subject', () => {
    expect(new Set(BOOKS.map((book) => book.subjectSlug))).toEqual(
      new Set(['anatomy', 'physiology', 'biochemistry']),
    );
  });

  it('are the only books topics refer to, each from the topic’s own subject', () => {
    for (const topic of TOPICS) {
      for (const ref of topic.readIn) {
        expect(getBook(ref.bookId)?.subjectSlug, `${topic.slug} → ${ref.bookId}`).toBe(
          topic.subjectSlug,
        );
      }
    }
  });
});
