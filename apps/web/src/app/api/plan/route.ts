import { revisitMinutes } from '@medlearn/core';
import { PlanRequest } from '@medlearn/schemas';

import { PLANNABLE_TOPICS, TOPICS } from '@/content/topics';
import { type CatalogueTopic, makePlan } from '@/server/ai/plan';
import { takeAiRequest } from '@/server/ai/quota';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb, requireUserId } from '@/server/session';

/** Every topic in the book's order, grouped by body region (anatomy) or by subject. */
const CATALOGUE: CatalogueTopic[] = PLANNABLE_TOPICS.map((topic) => {
  const full = TOPICS.find((item) => item.slug === topic.slug);
  return {
    slug: topic.slug,
    title: topic.title,
    group: topic.subjectSlug === 'anatomy' ? (full?.regions[0] ?? 'anatomy') : topic.subjectSlug,
    learnMinutes: topic.estimatedMinutes,
    reviseMinutes: revisitMinutes(topic),
  };
});

/** A study plan from the student's words: goals to look over, change and accept on the page. */
export const POST = withRoute('POST /api/plan', async (request, { log }) => {
  const input = await parseJson(request, PlanRequest);
  const db = await getSessionDb();
  const userId = await requireUserId(db);
  takeAiRequest(userId, input.today);
  return ok(await makePlan(input, CATALOGUE, log));
});
