import { AccountEmail } from '@medlearn/schemas';

import { toAuthError } from '@/server/auth-errors';
import { noContent, parseJson, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/**
 * Emails a 6-digit password reset code. The answer is the same whether or not an account uses
 * the email, so nobody can find out who studies here. The email is never logged.
 */
export const POST = withRoute('POST /api/account/reset', async (request, { log }) => {
  const { email } = await parseJson(request, AccountEmail);
  const { error } = await (await getSessionDb()).auth.resetPasswordForEmail(email);
  if (error) throw toAuthError(error);
  log.info('password reset code requested');
  return noContent();
});
