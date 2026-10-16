import { AppError } from '@medlearn/core';

import { practiceQuestions, recallDeck } from '@/content/topics';
import { ok, withRoute } from '@/server/route';

const MAX_SESSION_ITEMS = 20;

/** Read-only teaching content for one bounded session, without learner/account data. */
export const GET = withRoute('GET /api/study-content', (request) => {
  const query = new URL(request.url).searchParams;
  const kind = query.get('kind');
  const ids = query.getAll('id');
  if (
    (kind !== 'practice' && kind !== 'recall') ||
    ids.length === 0 ||
    ids.length > MAX_SESSION_ITEMS ||
    ids.some((id) => !id || id.length > 120)
  )
    throw new AppError('VALIDATION_FAILED', 'Choose up to 20 valid questions or cards.');
  const wanted = new Set(ids);
  const items =
    kind === 'practice'
      ? practiceQuestions().filter((item) => wanted.has(item.question.id))
      : recallDeck().filter((item) => wanted.has(item.id));
  if (items.length !== wanted.size)
    throw new AppError('NOT_FOUND', 'This session content is unavailable.');
  return Promise.resolve(ok({ items }, { headers: { 'Cache-Control': 'private, no-store' } }));
});
