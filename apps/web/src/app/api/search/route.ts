import { searchTopics } from '@/content/search';
import { ok, withRoute } from '@/server/route';

// Enough for a dropdown grouped by kind; the full list is the /search page.
const LIVE_LIMIT = 40;

/** Search as the student types: `GET /api/search?q=axil` → `{ data: { results } }`. */
export const GET = withRoute('GET /api/search', async (request) => {
  const query = new URL(request.url).searchParams.get('q')?.slice(0, 100) ?? '';
  return ok(
    { results: searchTopics(query, undefined, LIVE_LIMIT) },
    // The same words give the same results until the content changes with a new build.
    { headers: { 'Cache-Control': 'public, max-age=300' } },
  );
});
