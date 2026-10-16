import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { searchTopics } from '@/content/search';
import { PLANNABLE_TOPICS } from '@/content/topics';
import { recordAnswer, resetProgress, saveNote } from '@/features/progress/store';

import { LiveSearch } from './LiveSearch';

beforeEach(() => {
  // The server's answer, straight from the real search.
  vi.stubGlobal('fetch', async (url: string) => {
    const query = new URL(url, 'http://localhost').searchParams.get('q') ?? '';
    return Response.json({ data: { results: searchTopics(query, undefined, 40) } });
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  act(() => resetProgress());
});

const renderSearch = () => render(<LiveSearch topics={PLANNABLE_TOPICS} />);

describe('LiveSearch', () => {
  it.each(['network', 'http', 'invalid'])(
    'offers a retry instead of empty results after a %s failure',
    async (failure) => {
      const request = vi
        .fn()
        .mockImplementationOnce(() => {
          if (failure === 'network') return Promise.reject(new Error('offline'));
          if (failure === 'http')
            return Promise.resolve(Response.json({ error: {} }, { status: 503 }));
          return Promise.resolve(Response.json({ data: { results: [null] } }));
        })
        .mockResolvedValue(Response.json({ data: { results: searchTopics('axilla') } }));
      vi.stubGlobal('fetch', request);
      renderSearch();
      await userEvent.type(screen.getByRole('combobox'), 'axilla');
      const retry = await screen.findByRole('button', { name: 'Retry search' });
      expect(screen.getByText(/Search is unavailable/)).toBeInTheDocument();
      expect(screen.queryByText('Searching…')).not.toBeInTheDocument();
      expect(screen.queryByText(/Nothing matches/)).not.toBeInTheDocument();
      await userEvent.click(retry);
      expect(await screen.findByRole('group', { name: 'Topics' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Retry search' })).not.toBeInTheDocument();
    },
  );

  it('ignores an old response even when the transport does not honor cancellation', async () => {
    let finishOld: (value: Response) => void = () => undefined;
    const request = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            finishOld = resolve;
          }),
      )
      .mockImplementation(() =>
        Promise.resolve(Response.json({ data: { results: searchTopics('axilla') } })),
      );
    vi.stubGlobal('fetch', request);
    renderSearch();
    const box = screen.getByRole('combobox');
    await userEvent.type(box, 'brachial');
    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    await userEvent.clear(box);
    await userEvent.type(box, 'axilla');
    const topics = await screen.findByRole('group', { name: 'Topics' });
    const before = topics.textContent;
    await act(async () =>
      finishOld(Response.json({ data: { results: searchTopics('brachial') } })),
    );
    expect(topics.textContent).toBe(before);
  });

  it('suggests the next topic, weak spots, recent notes and common searches when empty', async () => {
    act(() => {
      recordAnswer(PLANNABLE_TOPICS[1]?.questionIds[0] ?? '', false);
      saveNote('brachial-plexus', 'Roots C5 to T1');
    });
    const { container } = renderSearch();
    await userEvent.click(screen.getByRole('combobox', { name: /Search topics/ }));
    const list = screen.getByRole('listbox', { name: 'Suggestions' });
    const suggested = within(list).getByRole('group', { name: 'Suggested for you' });
    expect(
      within(suggested)
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual([
      expect.stringMatching(/^Pectoral region and breast.*Up next/),
      expect.stringMatching(/Axilla.*Weak spot/),
      expect.stringMatching(/^Brachial plexus.*latest notes/),
    ]);
    await expectNoA11yViolations(container);

    await userEvent.click(screen.getByRole('button', { name: 'Carpal tunnel' }));
    expect(screen.getByRole('combobox')).toHaveValue('Carpal tunnel');
    const topics = await screen.findByRole('group', { name: 'Topics' });
    expect(within(topics).getAllByRole('option')[0]).toHaveTextContent(
      'Wrist: flexor retinaculum and carpal tunnel',
    );
  });

  it('shows results as you type, a letter wrong, with your notes, and opens one from the keyboard', async () => {
    act(() => saveNote('brachial-plexus', 'Erb: upper trunk, waiter’s tip'));
    renderSearch();
    const box = screen.getByRole('combobox', { name: /Search topics/ });
    await userEvent.type(box, 'brachal');
    const topics = await screen.findByRole('group', { name: 'Topics' });
    expect(within(topics).getAllByRole('option')[0]).toHaveTextContent('Brachial plexus');

    await userEvent.clear(box);
    await userEvent.type(box, 'waiter');
    const notes = await screen.findByRole('group', { name: 'Your notes' });
    expect(within(notes).getByRole('option')).toHaveTextContent(
      /Erb: upper trunk.*Brachial plexus/,
    );

    await userEvent.clear(box);
    await userEvent.type(box, 'serratus');
    const structures = await screen.findByRole('group', { name: 'Structures' });
    expect(within(structures).getAllByRole('option')[0]).toHaveTextContent('Serratus anterior');
    await userEvent.keyboard('{ArrowDown}');
    const highlighted = document.getElementById(box.getAttribute('aria-activedescendant') ?? '');
    expect(highlighted).toHaveTextContent('Serratus anterior');
    // Enter opens it just as a click on its link does.
    const opened = vi.fn((event: Event) => event.preventDefault());
    highlighted?.addEventListener('click', opened);
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(opened).toHaveBeenCalledTimes(1));
    expect(highlighted).toHaveAttribute('href', expect.stringMatching(/^\/(studio|learn)/));
  });

  it('says so when search cannot answer, and asks again when the connection returns', async () => {
    let answer = false;
    let asked = 0;
    vi.stubGlobal('fetch', async (url: string) => {
      asked += 1;
      if (!answer) return new Response('Busy', { status: 503 });
      const query = new URL(url, 'http://localhost').searchParams.get('q') ?? '';
      return Response.json({ data: { results: searchTopics(query, undefined, 40) } });
    });
    renderSearch();
    await userEvent.type(screen.getByRole('combobox', { name: /Search topics/ }), 'axilla');
    expect(await screen.findByText(/Search is unavailable/)).toBeInTheDocument();
    expect(screen.queryByText('Searching…')).toBeNull();

    answer = true;
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    await waitFor(() => expect(screen.queryByText(/Search is unavailable/)).toBeNull());
    await waitFor(() => expect(asked).toBe(2));
  });
});
