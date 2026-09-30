import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import PracticePage from '@/app/(study)/practice/page';
import { brachialPlexus } from '@/content/brachial-plexus';
import { oxygenCurve } from '@/content/oxygen-curve';
import { completeLesson, resetProgress } from '@/features/progress/store';

afterEach(() => act(() => resetProgress()));

const showing = (topic: { questions: Array<{ prompt: string }> }) =>
  topic.questions.some((question) => screen.queryByText(question.prompt));

describe('topic practice navigation', () => {
  it('keeps a chosen topic separate even when both lessons are complete', async () => {
    act(() => {
      completeLesson(brachialPlexus.slug);
      completeLesson(oxygenCurve.slug);
    });
    render(await PracticePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(screen.getByRole('region', { name: oxygenCurve.title })).toBeInTheDocument();
    expect(showing(oxygenCurve)).toBe(true);
    expect(showing(brachialPlexus)).toBe(false);
  });

  it('opens the hub of ways in when no topic is chosen', async () => {
    render(await PracticePage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole('button', { name: /Quick mix/ })).toBeInTheDocument();
    expect(showing(oxygenCurve)).toBe(false);
  });

  it.each(['not-a-topic', '', ['brachial-plexus', 'oxygen-haemoglobin-curve']])(
    'returns not found for an invalid requested topic: %s',
    async (topic) => {
      await expect(PracticePage({ searchParams: Promise.resolve({ topic }) })).rejects.toThrow(
        'NEXT_HTTP_ERROR_FALLBACK;404',
      );
    },
  );

  it('returns not found for a revisit of an unknown topic', async () => {
    await expect(
      PracticePage({ searchParams: Promise.resolve({ revisit: 'not-a-topic' }) }),
    ).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });

  it('starts afresh when navigation changes the topic', async () => {
    const { rerender } = render(
      await PracticePage({ searchParams: Promise.resolve({ topic: brachialPlexus.slug }) }),
    );
    expect(showing(brachialPlexus)).toBe(true);
    rerender(await PracticePage({ searchParams: Promise.resolve({ topic: oxygenCurve.slug }) }));
    expect(showing(oxygenCurve)).toBe(true);
    expect(showing(brachialPlexus)).toBe(false);
  });
});
