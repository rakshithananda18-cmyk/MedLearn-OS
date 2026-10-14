import { dayKey } from '@medlearn/core';
import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PLANNABLE_TOPICS } from '@/content/topics';
import { resetProgress, saveProfile } from '@/features/progress/store';

import { initialsOf } from './Avatar';
import { ProfileView } from './ProfileView';

const BOOKS = { 'bd-chaurasia': 'BD Chaurasia', 'grays-anatomy': "Gray's Anatomy" };
const renderProfile = () => render(<ProfileView topics={PLANNABLE_TOPICS} books={BOOKS} />);

beforeEach(() => {
  // No one signed in.
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => Response.json({ data: null })),
  );
});
afterEach(() => {
  act(() => resetProgress());
  vi.unstubAllGlobals();
});

describe('initialsOf', () => {
  it('takes the first letters of the first and last names, in any script', () => {
    expect(initialsOf('Rakshith Ananda')).toBe('RA');
    expect(initialsOf('  priya ')).toBe('P');
    expect(initialsOf('Anjali Devi Rao')).toBe('AR');
    expect(initialsOf("d'Souza")).toBe('D');
    expect(initialsOf('ಅನನ್ಯ ರಾವ್')).toBe('ಅರ');
    expect(initialsOf('')).toBeNull();
    expect(initialsOf(undefined)).toBeNull();
  });
});

describe('ProfileView', () => {
  it('asks for the plan to be set up first', () => {
    renderProfile();
    expect(screen.getByRole('link', { name: 'Set up my plan' })).toHaveAttribute(
      'href',
      '/welcome',
    );
  });

  it('keeps the name, and changes the plan as the student changes it', async () => {
    act(() => saveProfile({ year: 1, examDate: null, dailyMinutes: 20, adult: true }));
    const { container } = renderProfile();
    expect(screen.getByRole('heading', { level: 1, name: 'Your profile' })).toBeInTheDocument();

    await userEvent.type(screen.getByRole('textbox', { name: 'Your name' }), 'Rakshith Ananda');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Hello, Rakshith' })).toBeInTheDocument();
    expect(screen.getByText('RA')).toBeInTheDocument();
    expect(screen.getByText('Name saved.')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Second year', pressed: false }));
    expect(screen.getByText('Second year · MBBS')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: '30 minutes', pressed: false }));
    expect(screen.getByRole('button', { name: '30 minutes' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    const inTenDays = dayKey(new Date(Date.now() + 10 * 86_400_000));
    fireEvent.change(screen.getByLabelText('Exam date'), { target: { value: inTenDays } });
    expect(screen.getByText('10 days to go.')).toBeInTheDocument();
    expect(screen.getByText('Exam date saved.')).toBeInTheDocument();

    // How things are going, and the books still to choose.
    expect(screen.getByText(`0 of ${PLANNABLE_TOPICS.length}`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Choose' })).toHaveAttribute('href', '/books');
    expect(await screen.findByRole('link', { name: 'Create or sign in' })).toHaveAttribute(
      'href',
      '/account',
    );
    await expectNoA11yViolations(container);
  });

  it('lists the books chosen, and keeps an under-18 student’s account on the phone', () => {
    act(() =>
      saveProfile({
        year: 1,
        examDate: null,
        dailyMinutes: 20,
        adult: false,
        books: ['bd-chaurasia'],
        name: 'Priya',
      }),
    );
    renderProfile();
    expect(screen.getByText('BD Chaurasia')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Change' })).toHaveAttribute('href', '/books');
    expect(screen.getByText(/Under 18: your progress and name stay on this phone/)).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Create or sign in' })).not.toBeInTheDocument();
  });
});
