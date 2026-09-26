import { EmailCode } from '@medlearn/schemas';

import { toAuthError } from '@/server/auth-errors';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/**
 * Confirms a new account's email with the emailed 6-digit code and signs the student in. A student
 * who turned their anonymous account into an email account confirms the new address on that same
 * account, so their progress stays. The email is never logged.
 */
export const POST = withRoute('POST /api/account/confirm', async (request, { log }) => {
  const { email, code } = await parseJson(request, EmailCode);
  const db = await getSessionDb();
  const { data } = await db.auth.getUser();
  const upgrading = data.user?.is_anonymous === true && data.user.new_email === email;
  const { error } = await db.auth.verifyOtp({
    email,
    token: code,
    type: upgrading ? 'email_change' : 'email',
  });
  if (error) throw toAuthError(error);
  log.info('email confirmed');
  return ok({ email });
});
