import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { BOOKS } from '@/content/books';
import { chooseBooks, readProgress, resetProgress, saveProfile } from '@/features/progress/store';

import { BookChooser } from './BookChooser';
import { WhereToRead } from './WhereToRead';

const shelves = [
  { subjectName: 'Anatomy', books: BOOKS.filter((book) => book.subjectSlug === 'anatomy') },
  { subjectName: 'Physiology', books: BOOKS.filter((book) => book.subjectSlug === 'physiology') },
];
const plan = () => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true });

afterEach(() => act(() => resetProgress()));

describe('BookChooser', () => {
  it('saves the books ticked in each subject, keeping the other subjects’ choices', async () => {
    act(plan);
    const { container } = render(<BookChooser shelves={shelves} />);
    await userEvent.click(screen.getByRole('checkbox', { name: /Guyton and Hall/ }));
    await userEvent.click(screen.getByRole('checkbox', { name: /BD Chaurasia/ }));
    expect(readProgress().profile?.books).toEqual(['guyton-hall', 'bd-chaurasia']);

    await userEvent.click(screen.getByRole('checkbox', { name: /BD Chaurasia/ }));
    expect(readProgress().profile?.books).toEqual(['guyton-hall']);
    expect(screen.getByRole('group', { name: 'Physiology books' })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('asks for the study plan first when there is none', () => {
    render(<BookChooser shelves={shelves} />);
    expect(screen.getByRole('link', { name: 'Set up my plan' })).toHaveAttribute(
      'href',
      '/welcome',
    );
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});

const readings = [
  {
    bookId: 'vishram-singh',
    shortTitle: 'Vishram Singh',
    title: 'Textbook of Anatomy',
    chapter: 'Chapter 5 Axilla',
  },
  {
    bookId: 'bd-chaurasia',
    shortTitle: 'BD Chaurasia',
    title: "BD Chaurasia's Human Anatomy",
    chapter: 'Chapter 4 Axilla',
    pages: '60–64',
  },
];

describe('WhereToRead', () => {
  it('puts the student’s own books first and marks them', async () => {
    act(plan);
    act(() => chooseBooks(['bd-chaurasia']));
    render(<WhereToRead readings={readings} />);
    await userEvent.click(screen.getByRole('button', { name: 'Where to read this' }));
    const sheet = screen.getByRole('dialog', { name: 'Where to read this' });
    const items = within(sheet).getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('BD Chaurasia');
    expect(items[0]).toHaveTextContent('Your book');
    expect(items[0]).toHaveTextContent('Chapter 4 Axilla, pages 60–64');
    expect(items[1]).not.toHaveTextContent('Your book');
    await expectNoA11yViolations(document.body);
  });

  it('invites a student who has not chosen books, and says when references are still coming', async () => {
    act(plan);
    const { unmount } = render(<WhereToRead readings={readings} />);
    await userEvent.click(screen.getByRole('button', { name: 'Where to read this' }));
    expect(screen.getByRole('link', { name: 'Choose your books' })).toHaveAttribute(
      'href',
      '/books',
    );
    unmount();
    render(<WhereToRead readings={[]} />);
    await userEvent.click(screen.getByRole('button', { name: 'Where to read this' }));
    expect(screen.getByText(/on their way from the standard books/)).toBeInTheDocument();
  });
});
