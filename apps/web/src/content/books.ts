import type { Book, ContentSource } from '@medlearn/schemas';

// Checked against the Book schema by books.test.ts.
// ponytail: a starter list of widely used first-year books, titles and authors only; the group
// confirms which books and editions it follows, and chapter and page references follow those.
/** Standard textbooks, grouped by subject in teaching order. */
export const BOOKS: Book[] = [
  {
    id: 'bd-chaurasia',
    subjectSlug: 'anatomy',
    title: "BD Chaurasia's Human Anatomy",
    shortTitle: 'BD Chaurasia',
    authors: 'B D Chaurasia',
    edition: '8th',
  },
  {
    id: 'grays-anatomy',
    subjectSlug: 'anatomy',
    title: "Gray's Anatomy for Students",
    shortTitle: "Gray's Anatomy",
    authors: 'Richard L. Drake, A. Wayne Vogl, Adam W. M. Mitchell',
    edition: '4th',
  },
  {
    id: 'vishram-singh',
    subjectSlug: 'anatomy',
    title: 'Textbook of Anatomy',
    shortTitle: 'Vishram Singh',
    authors: 'Vishram Singh',
  },
  {
    id: 'guyton-hall',
    subjectSlug: 'physiology',
    title: 'Guyton and Hall Textbook of Medical Physiology',
    shortTitle: 'Guyton and Hall',
    authors: 'John E. Hall',
  },
  {
    id: 'ak-jain',
    subjectSlug: 'physiology',
    title: 'Textbook of Physiology',
    shortTitle: 'A K Jain',
    authors: 'A K Jain',
  },
  {
    id: 'vasudevan',
    subjectSlug: 'biochemistry',
    title: 'Textbook of Biochemistry for Medical Students',
    shortTitle: 'Vasudevan',
    authors: 'D M Vasudevan, S Sreekumari, Kannan Vaidyanathan',
  },
  {
    id: 'satyanarayana',
    subjectSlug: 'biochemistry',
    title: 'Biochemistry',
    shortTitle: 'Satyanarayana',
    authors: 'U Satyanarayana, U Chakrapani',
  },
];

export function getBook(id: string): Book | undefined {
  return BOOKS.find((book) => book.id === id);
}

/** A standard book cited as a topic source: facts checked against it, nothing copied. */
export function bookSource(bookId: string, detail: string): ContentSource {
  const book = getBook(bookId);
  if (!book) throw new Error(`Unknown book "${bookId}"`);
  return {
    title: book.edition ? `${book.title}, ${book.edition} edition` : book.title,
    detail,
    licence: 'Cited for facts; no text or figures copied',
  };
}
