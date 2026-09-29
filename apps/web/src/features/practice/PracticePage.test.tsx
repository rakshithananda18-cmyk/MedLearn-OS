import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import PracticePage from '@/app/(study)/practice/page';
import { brachialPlexus } from '@/content/brachial-plexus';
import { oxygenCurve } from '@/content/oxygen-curve';
import { completeLesson, resetProgress } from '@/features/progress/store';

afterEach(() => act(() => resetProgress()));

describe('topic practice navigation', () => {
  it('keeps a chosen topic separate even when both lessons are complete', async () => {
    act(() => {
      completeLesson(brachialPlexus.slug);
      completeLesson(oxygenCurve.slug);
    });
    render(await PracticePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(screen.getByText(oxygenCurve.questions[0]?.prompt ?? '')).toBeInTheDocument();
    expect(screen.queryByText(brachialPlexus.questions[0]?.prompt ?? '')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Back to ${oxygenCurve.title}` })).toHaveAttribute(
      'href',
      `/learn/${oxygenCurve.slug}`,
    );
  });

  it('shows the chosen lesson as locked even if another lesson is complete', async () => {
    act(() => completeLesson(brachialPlexus.slug));
    render(await PracticePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(screen.getByText('Nothing to practise yet')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start this lesson' })).toHaveAttribute(
      'href',
      `/learn/${oxygenCurve.slug}/lesson`,
    );
  });

  it('keeps the unfiltered practice queue', async () => {
    act(() => {
      completeLesson(brachialPlexus.slug);
      completeLesson(oxygenCurve.slug);
    });
    render(await PracticePage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByText(brachialPlexus.questions[0]?.prompt ?? '')).toBeInTheDocument();
  });

  it.each(['not-a-topic', '', ['brachial-plexus', 'oxygen-haemoglobin-curve']])(
    'returns not found for an invalid requested topic: %s',
    async (topic) => {
      await expect(PracticePage({ searchParams: Promise.resolve({ topic }) })).rejects.toThrow(
        'NEXT_HTTP_ERROR_FALLBACK;404',
      );
    },
  );

  it('resets the answered question when navigation changes the topic filter', async () => {
    act(() => {
      completeLesson(brachialPlexus.slug);
      completeLesson(oxygenCurve.slug);
    });
    const { rerender } = render(
      await PracticePage({ searchParams: Promise.resolve({ topic: brachialPlexus.slug }) }),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Medial cord' }));
    expect(screen.getByRole('button', { name: 'Next question' })).toBeInTheDocument();

    rerender(await PracticePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(screen.getByText(oxygenCurve.questions[0]?.prompt ?? '')).toBeInTheDocument();
    expect(screen.queryByText(brachialPlexus.questions[0]?.prompt ?? '')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next question' })).not.toBeInTheDocument();
  });
});
