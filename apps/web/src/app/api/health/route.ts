import { checkDatabase } from '@medlearn/db';

import { getDb } from '@/server/db';
import { ok, withRoute } from '@/server/route';

export const GET = withRoute('GET /api/health', async () => {
  await checkDatabase(getDb());
  return ok({ status: 'ok' });
});
