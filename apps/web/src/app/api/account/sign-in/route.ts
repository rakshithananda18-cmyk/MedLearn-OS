import { AccountCredentials } from '@medlearn/schemas';

import { toAuthError } from '@/server/auth-errors';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** Signs in with email and password; the session is kept in cookies. The email is never logged. */
export const POST = withRoute('POST /api/account/sign-in', async (request, { log }) => {
  const { email, password } = await parseJson(request, AccountCredentials);
  const db = await getSessionDb();
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error?.code === 'email_not_confirmed') {
    // Never confirmed: send a fresh code and ask for it, just as after creating the account. If a
    // code went out moments ago, no new one is sent and that one still works.
    const resent = await db.auth.resend({ type: 'signup', email });
    if (resent.error && resent.error.code !== 'over_email_send_rate_limit') {
      throw toAuthError(resent.error);
    }
    log.info('sign-in waiting for email confirmation');
    return ok({ email, confirmEmail: true });
  }
  if (error) throw toAuthError(error);
  log.info('signed in');
  return ok({ email });
});
