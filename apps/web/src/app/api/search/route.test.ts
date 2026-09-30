import { describe, expect, it } from 'vitest';

import { GET } from './route';

describe('GET /api/search', () => {
  it('answers what is typed so far, in the standard data shape', async () => {
    const response = await GET(new Request('http://localhost/api/search?q=brach'));
    const body = (await response.json()) as { data: { results: Array<{ topicSlug: string }> } };
    expect(response.status).toBe(200);
    expect(body.data.results[0]?.topicSlug).toBe('brachial-plexus');
  });

  it('answers nothing for an empty search', async () => {
    const response = await GET(new Request('http://localhost/api/search'));
    expect(await response.json()).toEqual({ data: { results: [] } });
  });
});
