import { AccountCredentials } from '@medlearn/schemas';

import { toAuthError } from '@/server/auth-errors';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** Signs in with email and password; the session is kept in cookies. The email is never logged. */
export const POST = withRoute('POST /api/account/sign-in', async (request, { log }) => {
  const { email, password } = await parseJson(request, AccountCredentials);
  const { error } = await (await getSessionDb()).auth.signInWithPassword({ email, password });
  if (error) throw toAuthError(error);
  log.info('signed in');
  return ok({ email });
});
