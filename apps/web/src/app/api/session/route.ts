import { AppError } from '@medlearn/core';

import { ok, withRoute } from '@/server/route';
import { getSessionDb, getUserId } from '@/server/session';

/** Starts an anonymous session when there is none, so progress can be saved to the server. */
export const POST = withRoute('POST /api/session', async (_request, { log }) => {
  const db = await getSessionDb();
  if (await getUserId(db)) return ok({ started: false });

  const { error } = await db.auth.signInAnonymously();
  if (error) throw new AppError('INTERNAL', 'Could not start a session', { cause: error });
  log.info('anonymous session started');
  return ok({ started: true }, { status: 201 });
});
