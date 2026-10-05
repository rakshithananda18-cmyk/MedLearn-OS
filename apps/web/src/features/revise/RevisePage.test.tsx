import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import RevisePage from '@/app/(study)/revise/page';
import { brachialPlexus } from '@/content/brachial-plexus';
import { oxygenCurve } from '@/content/oxygen-curve';
import { completeLesson, resetProgress } from '@/features/progress/store';

afterEach(() => act(() => resetProgress()));

describe('topic recall navigation', () => {
  it('limits recall to the chosen topic and keeps its return link', async () => {
    act(() => {
      completeLesson(brachialPlexus.slug);
      completeLesson(oxygenCurve.slug);
    });
    render(await RevisePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(screen.getByText(oxygenCurve.cards[0]?.front ?? '')).toBeInTheDocument();
    expect(screen.queryByText(brachialPlexus.cards[0]?.front ?? '')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Back to ${oxygenCurve.title}` })).toHaveAttribute(
      'href',
      `/learn/${oxygenCurve.slug}`,
    );
  });

  it('keeps an unfinished topic locked and offers its lesson', async () => {
    act(() => completeLesson(brachialPlexus.slug));
    render(await RevisePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(screen.getByText('No reviews due')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start this lesson' })).toHaveAttribute(
      'href',
      `/learn/${oxygenCurve.slug}/lesson`,
    );
  });

  it('passes the planned limit through to the session', async () => {
    act(() => completeLesson(brachialPlexus.slug));
    render(await RevisePage({ searchParams: Promise.resolve({ limit: '2' }) }));
    expect(
      screen.getByText('2 cards left in this session. Answer in your head, then check.'),
    ).toBeInTheDocument();
  });

  it('keeps direct recall global and treats invalid limits as an ordinary queue', async () => {
    act(() => {
      completeLesson(brachialPlexus.slug);
      completeLesson(oxygenCurve.slug);
    });
    render(await RevisePage({ searchParams: Promise.resolve({ limit: '-1' }) }));
    expect(screen.getByText('8 cards due. Answer in your head, then check.')).toBeInTheDocument();
  });

  it.each(['not-a-topic', '', ['brachial-plexus', 'oxygen-haemoglobin-curve']])(
    'returns not found for an invalid requested topic: %s',
    async (topic) => {
      await expect(RevisePage({ searchParams: Promise.resolve({ topic }) })).rejects.toThrow(
        'NEXT_HTTP_ERROR_FALLBACK;404',
      );
    },
  );
});
