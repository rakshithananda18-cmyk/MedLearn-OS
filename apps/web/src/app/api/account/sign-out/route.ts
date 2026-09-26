import { toAuthError } from '@/server/auth-errors';
import { noContent, withRoute } from '@/server/route';
import { getSessionDb } from '@/server/session';

/** Ends the session on this phone only; other phones stay signed in. */
export const POST = withRoute('POST /api/account/sign-out', async () => {
  const { error } = await (await getSessionDb()).auth.signOut({ scope: 'local' });
  if (error) throw toAuthError(error);
  return noContent();
});
