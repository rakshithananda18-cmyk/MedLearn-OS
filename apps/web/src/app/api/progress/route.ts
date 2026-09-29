import { AppError } from '@medlearn/core';
import { createProgressRepository } from '@medlearn/db';
import { LearnerProgressInput } from '@medlearn/schemas';
import { z } from 'zod';

import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb, requireUserId } from '@/server/session';

const SaveBody = z.object({
  progress: LearnerProgressInput,
  // Omitted by older installed clients; null explicitly means no row was loaded.
  expectedUpdatedAt: z.iso.datetime({ offset: true }).nullable().optional(),
});

/** The learner's saved progress, or null when nothing is saved yet. */
export const GET = withRoute('GET /api/progress', async () => {
  const db = await getSessionDb();
  const userId = await requireUserId(db);
  return ok(await createProgressRepository(db).load(userId));
});

/** Saves progress; 409 when another device changed the version this client loaded. */
export const PUT = withRoute('PUT /api/progress', async (request) => {
  const { progress, expectedUpdatedAt } = await parseJson(request, SaveBody);
  // Privacy rule: an under-18 student's learning data stays on the phone until a parent agrees.
  if (!progress.profile?.adult) {
    throw new AppError('FORBIDDEN', 'Progress stays on this phone for students under 18');
  }
  const db = await getSessionDb();
  const userId = await requireUserId(db);
  const result = await createProgressRepository(db).save(userId, progress, expectedUpdatedAt);
  if (result === 'stale') throw new AppError('CONFLICT', 'A newer copy is saved already');
  return ok({ saved: true });
});
