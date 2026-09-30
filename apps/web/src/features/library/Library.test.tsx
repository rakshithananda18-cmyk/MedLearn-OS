import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { libraryTree } from '@/content/library';
import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';

import { Library } from './Library';
import type { TopicPreviewData } from './TopicPreview';

const SUBJECTS = [
  { slug: 'anatomy', name: 'Anatomy' },
  { slug: 'physiology', name: 'Physiology' },
  { slug: 'biochemistry', name: 'Biochemistry' },
].map((subject) => ({
  ...subject,
  nodes: libraryTree(TOPICS.filter((topic) => topic.subjectSlug === subject.slug)),
}));

const PREVIEWS: Record<string, TopicPreviewData> = Object.fromEntries(
  PLANNABLE_TOPICS.map((topic) => [
    topic.slug,
    {
      topic,
      subject: topic.subjectSlug,
      keyFacts: ['A key fact.'],
      lessonSteps: 5,
      hasModel: topic.poster !== null,
      readings: [],
    },
  ]),
);

const BOOKS = { 'bd-chaurasia': 'BD Chaurasia', 'grays-anatomy': "Gray's" };

/** A laptop or a tablet held sideways, where the preview sits beside the list. */
function screenWidth(wide: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: wide && query === '(min-width: 64rem)',
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

const renderLibrary = (initialTopic: string | null = null) =>
  render(
    <Library subjects={SUBJECTS} previews={PREVIEWS} books={BOOKS} initialTopic={initialTopic} />,
  );

const previewPanel = () => screen.queryByRole('complementary', { name: 'Topic preview' });

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState(null, '', '/subjects');
});
afterEach(() => vi.unstubAllGlobals());

describe('Library', () => {
  it('opens across the whole page, with the section of the next topic unfolded and no preview', async () => {
    screenWidth(true);
    const { container } = renderLibrary();
    expect(screen.getByRole('button', { name: /Anatomy/, pressed: true })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /^Upper limb/ })).toBeInTheDocument();
    // Sections are the buttons that fold: the next topic's is open, the others folded.
    expect(
      screen.getByRole('button', { name: /^Pectoral region.*Up next/, expanded: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Axilla/, expanded: false })).toBeInTheDocument();
    expect(previewPanel()).not.toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('slides in a preview of the picked topic, keeps it in the address, and closes it', async () => {
    screenWidth(true);
    renderLibrary();
    await userEvent.click(screen.getByRole('button', { name: /^Axilla/, expanded: false }));
    const plexus = screen.getByRole('button', { name: /Brachial plexus/ });
    await userEvent.click(plexus);
    expect(plexus).toHaveAttribute('aria-pressed', 'true');
    expect(window.location.search).toBe('?topic=brachial-plexus');

    const preview = previewPanel();
    if (!preview) throw new Error('no preview');
    expect(within(preview).getByRole('heading', { name: 'Brachial plexus' })).toBeVisible();
    expect(within(preview).getByText(/^Axilla · \d+ min$/)).toBeInTheDocument();
    expect(within(preview).getByRole('link', { name: /Start lesson/ })).toHaveAttribute(
      'href',
      '/learn/brachial-plexus/lesson',
    );
    expect(within(preview).getByRole('link', { name: /Turn it in 3D/ })).toHaveAttribute(
      'href',
      '/studio?topic=brachial-plexus',
    );

    await userEvent.click(within(preview).getByRole('button', { name: 'Close the preview' }));
    expect(previewPanel()).not.toBeInTheDocument();
    expect(window.location.search).toBe('');
  });

  it('comes back to the topic it was showing, and folds the region away', async () => {
    screenWidth(true);
    renderLibrary('brachial-plexus');
    expect(previewPanel()).toHaveTextContent('Brachial plexus');
    expect(screen.getByRole('button', { name: /Brachial plexus/, pressed: true })).toBeVisible();

    const region = screen.getByRole('button', { name: /^Upper limb/, expanded: true });
    await userEvent.click(region);
    expect(region).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches subjects, and shows what is learnt and which books are chosen', async () => {
    screenWidth(true);
    localStorage.setItem(
      'ml-progress-v1',
      JSON.stringify({
        completedLessons: ['pectoral-region'],
        profile: { year: 1, examDate: null, dailyMinutes: 20, books: ['bd-chaurasia'] },
      }),
    );
    renderLibrary();
    expect(screen.getByText('1 of 30 learnt')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Your books.*BD Chaurasia/ })).toHaveAttribute(
      'href',
      '/books',
    );
    // The next topic moved on to the axilla, whose section now opens by itself.
    expect(
      screen.getByRole('button', { name: /^Axilla.*Up next/, expanded: true }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Physiology/ }));
    expect(screen.getByRole('button', { name: /Oxygen–haemoglobin curve/ })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Biochemistry/ }));
    expect(screen.getByText('Biochemistry topics are coming soon.')).toBeInTheDocument();
  });

  it('previews a topic in a drawer on a phone, and closes it again', async () => {
    screenWidth(false);
    renderLibrary();
    expect(screen.queryByRole('complementary', { name: 'Topic preview' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Pectoral region and breast/ }));
    const drawer = screen.getByRole('dialog', { name: 'Pectoral region and breast' });
    expect(within(drawer).getByRole('link', { name: /Start lesson/ })).toHaveAttribute(
      'href',
      '/learn/pectoral-region/lesson',
    );
    expect(window.location.search).toBe('?topic=pectoral-region');

    await userEvent.click(within(drawer).getByRole('button', { name: 'Close the preview' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(window.location.search).toBe('');
  });

  it('shows how each topic is going in its Progress view, kept in the address', async () => {
    screenWidth(true);
    renderLibrary();
    await userEvent.click(screen.getByRole('button', { name: 'Progress', pressed: false }));
    expect(window.location.search).toBe('?view=progress');
    expect(
      screen.getByRole('progressbar', { name: 'Brachial plexus mastery' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^0 of \d+ lessons$/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Topics', pressed: false }));
    expect(window.location.search).toBe('');
    expect(screen.getByRole('heading', { level: 2, name: /^Upper limb/ })).toBeInTheDocument();
  });
});
