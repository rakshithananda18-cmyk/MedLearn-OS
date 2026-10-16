import { describe, expect, it } from 'vitest';

import { practiceQuestions, recallDeck } from '@/content/topics';

import { GET } from './route';

function request(kind: string, ids: string[]) {
  const query = new URLSearchParams({ kind });
  ids.forEach((id) => query.append('id', id));
  return GET(new Request(`http://localhost/api/study-content?${query}`));
}

describe('bounded study content', () => {
  it('returns exactly the requested questions, without sending the rest of the bank', async () => {
    const ids = practiceQuestions()
      .slice(0, 3)
      .map((item) => item.question.id);
    const response = await request('practice', ids);
    expect(response.status).toBe(200);
    expect(
      (await response.json()).data.items.map(
        (item: { question: { id: string } }) => item.question.id,
      ),
    ).toEqual(ids);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });
  it('returns requested recall and missed-question cards', async () => {
    const deck = recallDeck();
    const ids = [deck[0]?.id ?? '', deck.find((card) => card.fromMistake)?.id ?? ''];
    const response = await request('recall', ids);
    expect(response.status).toBe(200);
    expect((await response.json()).data.items.map((item: { id: string }) => item.id)).toEqual(ids);
  });
  it.each([
    ['bad', ['q']],
    ['practice', []],
    ['recall', ['']],
    ['practice', ['x'.repeat(121)]],
    ['practice', Array.from({ length: 21 }, (_, index) => `q${index}`)],
  ])('rejects invalid or oversized sessions', async (kind, ids) => {
    expect((await request(kind as string, ids as string[])).status).toBe(400);
  });
  it('does not silently drop unknown questions', async () => {
    expect(
      (await request('practice', [practiceQuestions()[0]?.question.id ?? '', 'unknown-question']))
        .status,
    ).toBe(404);
  });
});
