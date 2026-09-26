import { AppError } from '@medlearn/core';
import { AccountCredentials } from '@medlearn/schemas';

import { toAuthError } from '@/server/auth-errors';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/**
 * Creates an email account. A student who already has an anonymous session keeps the same
 * account id, so progress saved so far stays with them. The email is never logged.
 */
export const POST = withRoute('POST /api/account/sign-up', async (request, { log }) => {
  const { email, password } = await parseJson(request, AccountCredentials);
  const db = await getSessionDb();
  const { data } = await db.auth.getUser();

  if (data.user && !data.user.is_anonymous) {
    throw new AppError('CONFLICT', 'Already signed in. Sign out first to create another account.');
  }

  if (data.user) {
    const { error } = await db.auth.updateUser({ email, password });
    if (error) throw toAuthError(error);
    log.info('anonymous account upgraded to email');
    return ok({ email, confirmEmail: false }, { status: 201 });
  }

  const { data: created, error } = await db.auth.signUp({ email, password });
  if (error) throw toAuthError(error);
  log.info('email account created');
  // With email confirmation switched on (production), there is no session until the link is used.
  return ok({ email, confirmEmail: created.session === null }, { status: 201 });
});
