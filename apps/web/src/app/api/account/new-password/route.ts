import { NewPassword } from '@medlearn/schemas';

import { toAuthError } from '@/server/auth-errors';
import { ok, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** Sets a new password with the emailed reset code; the student is then signed in on this phone. */
export const POST = withRoute('POST /api/account/new-password', async (request, { log }) => {
  const { email, code, password } = await parseJson(request, NewPassword);
  const db = await getSessionDb();
  const verified = await db.auth.verifyOtp({ email, token: code, type: 'recovery' });
  if (verified.error) throw toAuthError(verified.error);
  const { error } = await db.auth.updateUser({ password });
  // Choosing the old password again is fine: the student knows it now and is signed in.
  if (error && error.code !== 'same_password') throw toAuthError(error);
  log.info('password reset');
  return ok({ email });
});
