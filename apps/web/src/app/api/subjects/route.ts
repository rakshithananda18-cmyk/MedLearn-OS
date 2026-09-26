import { getSubjectsRepository } from '@/server/db';
import { ok, withRoute } from '@/server/route';

export const GET = withRoute('GET /api/subjects', async () => {
  return ok(await getSubjectsRepository().list());
});
