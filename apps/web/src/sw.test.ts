import { readFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

// The service worker is a plain script; its trimming rule is read out of it with a stand-in `self`.
const source = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
const toTrim = new Function('self', `${source}; return toTrim;`)({
  addEventListener: () => undefined,
}) as (urls: string[], added: string, max: number) => string[];

const at = (path: string) => `https://medlearn.test${path}`;

type FetchEvent = {
  request: Request;
  respondWith: (response: Promise<Response>) => void;
};

function createCache() {
  const entries = new Map<string, Response>();
  return {
    entries,
    match: vi.fn(async (request: Request | string) =>
      entries.get(typeof request === 'string' ? at(request) : request.url)?.clone(),
    ),
    put: vi.fn(async (request: Request, response: Response) => {
      entries.set(request.url, response.clone());
    }),
    keys: vi.fn(async () => [...entries.keys()].map((url) => new Request(url))),
    delete: vi.fn(async (request: Request) => entries.delete(request.url)),
  };
}

function createWorker() {
  const files = createCache();
  const pages = createCache();
  const fetch = vi.fn(async (_request: Request) => new Response('latest'));
  const caches = { open: vi.fn(async (name: string) => (name === 'files-v1' ? files : pages)) };
  let onFetch: ((event: FetchEvent) => void) | undefined;
  new Function('self', 'caches', 'fetch', source)(
    {
      location: { origin: at('') },
      addEventListener: (name: string, listener: (event: FetchEvent) => void) => {
        if (name === 'fetch') onFetch = listener;
      },
    },
    caches,
    fetch,
  );
  return {
    files,
    pages,
    fetch,
    request(path: string, init?: RequestInit) {
      let result: Promise<Response> | undefined;
      onFetch?.({
        request: new Request(path.startsWith('https:') ? path : at(path), init),
        respondWith: (response) => {
          result = response;
        },
      });
      return result;
    },
  };
}

describe('service worker cache trimming', () => {
  it('drops an older version of a model once the new one is stored', () => {
    const urls = [at('/models/heart.glb?v=1'), at('/icons/a.png'), at('/models/heart.glb?v=2')];
    expect(toTrim(urls, at('/models/heart.glb?v=2'), 400)).toEqual([at('/models/heart.glb?v=1')]);
  });

  it('drops the oldest files beyond the cap, never the one just stored', () => {
    const urls = ['/a.js', '/b.js', '/c.js', '/d.js'].map((path) => at(`/_next/static${path}`));
    expect(toTrim(urls, urls[3] ?? '', 2)).toEqual(urls.slice(0, 2));
    expect(toTrim(urls, urls[3] ?? '', 10)).toEqual([]);
  });

  it('retains a refreshed file even if it was the oldest cache key', () => {
    const urls = ['/posters/a.webp', '/xrays/b.webp', '/icons/c.png'].map(at);
    expect(toTrim(urls, urls[0] ?? '', 2)).toEqual([urls[1]]);
  });

  it('keeps separate study batches and applies the same file count cap', () => {
    const urls = [
      '/api/study-content?kind=practice&id=brachial-plexus',
      '/api/study-content?kind=recall&id=brachial-plexus',
      '/api/study-content?kind=practice&id=carpal-tunnel',
    ].map(at);
    expect(toTrim(urls, urls[2] ?? '', 400)).toEqual([]);
    expect(toTrim(urls, urls[2] ?? '', 2)).toEqual([urls[0]]);
  });
});

describe('service worker offline study content', () => {
  it.each([
    '/posters/brachial-plexus.webp',
    '/xrays/wrist-pa.webp',
    '/api/study-content?kind=practice&id=brachial-plexus&id=carpal-tunnel',
    '/api/study-content?kind=recall&id=brachial-plexus',
  ])('refreshes %s online and returns the latest successful response offline', async (path) => {
    const worker = createWorker();
    worker.fetch
      .mockResolvedValueOnce(new Response('first'))
      .mockResolvedValueOnce(new Response('new'));
    expect(await (await worker.request(path))?.text()).toBe('first');
    expect(await (await worker.request(path))?.text()).toBe('new');
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    expect(await (await worker.request(path))?.text()).toBe('new');
    expect(worker.fetch).toHaveBeenCalledTimes(3);
    expect(worker.files.entries.size).toBe(1);
    expect(worker.pages.entries.size).toBe(0);
  });

  it.each([401, 404, 500])(
    'returns an online %s instead of stale successful content',
    async (status) => {
      const worker = createWorker();
      const path = '/api/study-content?kind=practice&id=brachial-plexus';
      await worker.request(path);
      worker.fetch.mockResolvedValueOnce(new Response('error', { status }));
      const response = await worker.request(path);
      expect(response?.status).toBe(status);
      expect(await response?.text()).toBe('error');
      worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
      expect(await (await worker.request(path))?.text()).toBe('latest');
    },
  );

  it('returns a network failure for content that has never been saved', async () => {
    const worker = createWorker();
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    expect((await worker.request('/xrays/wrist-pa.webp'))?.type).toBe('error');
    expect(worker.files.entries.size).toBe(0);
  });

  it('still returns the successful response when cache storage is full', async () => {
    const worker = createWorker();
    worker.files.put.mockRejectedValueOnce(new Error('Quota exceeded'));
    expect(await (await worker.request('/posters/brachial-plexus.webp'))?.text()).toBe('latest');
  });

  it('trims media, build files and study batches to one shared limit', async () => {
    const worker = createWorker();
    for (let index = 0; index < 399; index += 1) {
      worker.files.entries.set(at(`/_next/static/${index}.js`), new Response('build'));
    }
    await worker.request('/xrays/wrist-pa.webp');
    await worker.request('/api/study-content?kind=practice&id=brachial-plexus');
    expect(worker.files.entries.size).toBe(400);
    expect(worker.files.entries.has(at('/_next/static/0.js'))).toBe(false);
    expect(worker.files.entries.has(at('/xrays/wrist-pa.webp'))).toBe(true);
  });

  it('removes old poster versions when a new one is fetched', async () => {
    const worker = createWorker();
    await worker.request('/posters/brachial-plexus.webp?v=1');
    await worker.request('/posters/brachial-plexus.webp?v=2');
    expect([...worker.files.entries.keys()]).toEqual([at('/posters/brachial-plexus.webp?v=2')]);
  });

  it.each([
    '/api/progress',
    '/api/account',
    '/api/reviews',
    '/api/study-content',
    '/api/study-content?kind=practice',
    '/api/study-content?kind=account&id=one',
    '/api/study-content?kind=practice&kind=recall&id=one',
    '/api/study-content?kind=practice&id=',
    '/api/study-content?kind=practice&id=%20',
    `/api/study-content?kind=practice&id=${'a'.repeat(121)}`,
    `/api/study-content?kind=practice&${Array.from({ length: 21 }, (_, i) => `id=${i}`).join('&')}`,
    '/api/study-content?kind=practice&id=one&account=learner',
    '/api/study-content/private?kind=practice&id=one',
    'https://other.test/posters/a.webp',
  ])('leaves excluded requests to the browser: %s', (path) => {
    const worker = createWorker();
    expect(worker.request(path)).toBeUndefined();
    expect(worker.fetch).not.toHaveBeenCalled();
    expect(worker.files.entries.size).toBe(0);
  });

  it('does not intercept API or media writes', () => {
    const worker = createWorker();
    expect(
      worker.request('/api/study-content?kind=practice&id=one', { method: 'POST' }),
    ).toBeUndefined();
    expect(worker.request('/posters/a.webp', { method: 'POST' })).toBeUndefined();
    expect(worker.fetch).not.toHaveBeenCalled();
  });
});

const recall = (id: string) => ({
  id,
  topic: { slug: 'one' },
  front: `Question ${id}`,
  back: `Answer ${id}`,
});

const practice = (id: string) => ({
  topic: { slug: 'one' },
  question: { id, prompt: `Question ${id}`, options: [] },
});

describe('service worker recovery across study batches', () => {
  it('recovers the remaining cards after rating one and reloading offline', async () => {
    const worker = createWorker();
    worker.fetch.mockResolvedValueOnce(
      Response.json({ data: { items: [recall('c1'), recall('c2'), recall('c3')] } }),
    );
    await worker.request('/api/study-content?kind=recall&id=c1&id=c2&id=c3');
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    const response = await worker.request('/api/study-content?kind=recall&id=c2&id=c3');
    expect(await response?.json()).toEqual({ data: { items: [recall('c2'), recall('c3')] } });
    // Recovering a subset does not fill the bounded cache with new combinations.
    expect(worker.files.entries.size).toBe(1);
  });

  it('assembles a shuffled practice subset across multiple saved batches in request order', async () => {
    const worker = createWorker();
    worker.fetch
      .mockResolvedValueOnce(Response.json({ data: { items: [practice('q1'), practice('q2')] } }))
      .mockResolvedValueOnce(Response.json({ data: { items: [practice('q3'), practice('q4')] } }));
    await worker.request('/api/study-content?kind=practice&id=q1&id=q2');
    await worker.request('/api/study-content?kind=practice&id=q3&id=q4');
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    const response = await worker.request('/api/study-content?kind=practice&id=q4&id=q1&id=q3');
    expect(await response?.json()).toEqual({
      data: { items: [practice('q4'), practice('q1'), practice('q3')] },
    });
    expect(worker.files.entries.size).toBe(2);
  });

  it('requires complete coverage instead of returning a partial session', async () => {
    const worker = createWorker();
    worker.files.entries.set(
      at('/api/study-content?kind=recall&id=c1'),
      Response.json({ data: { items: [recall('c1')] } }),
    );
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    expect((await worker.request('/api/study-content?kind=recall&id=c1&id=c2'))?.type).toBe(
      'error',
    );
  });

  it('never reconstructs a cached subset after an online HTTP error', async () => {
    const worker = createWorker();
    worker.files.entries.set(
      at('/api/study-content?kind=recall&id=c1&id=c2'),
      Response.json({ data: { items: [recall('c1'), recall('c2')] } }),
    );
    worker.fetch.mockResolvedValueOnce(new Response('unavailable', { status: 500 }));
    expect((await worker.request('/api/study-content?kind=recall&id=c2'))?.status).toBe(500);
    expect(worker.files.keys).not.toHaveBeenCalled();
  });

  it('excludes other content kinds, account APIs and foreign cache entries', async () => {
    const worker = createWorker();
    for (const url of [
      at('/api/study-content?kind=practice&id=c1'),
      at('/api/account?kind=recall&id=c1'),
      at('/api/study-content?kind=recall&id=c1&account=learner'),
      'https://other.test/api/study-content?kind=recall&id=c1',
    ]) {
      worker.files.entries.set(url, Response.json({ data: { items: [recall('c1')] } }));
    }
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    expect((await worker.request('/api/study-content?kind=recall&id=c1&id=c1'))?.type).toBe(
      'error',
    );
  });

  it.each([
    { label: 'duplicate IDs', items: [recall('c1'), recall('c1')] },
    { label: 'missing declared IDs', items: [recall('c1')] },
    { label: 'undeclared IDs', items: [recall('c1'), recall('c3')] },
    { label: 'invalid item shapes', items: [recall('c1'), { id: 'c2' }] },
    { label: 'null items', items: [recall('c1'), null] },
    { label: 'another content kind', items: [practice('c1'), practice('c2')] },
  ])('rejects a saved batch with $label', async ({ items }) => {
    const worker = createWorker();
    worker.files.entries.set(
      at('/api/study-content?kind=recall&id=c1&id=c2'),
      Response.json({ data: { items } }),
    );
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    expect((await worker.request('/api/study-content?kind=recall&id=c1'))?.type).toBe('error');
  });

  it('ignores malformed newer batches and still recovers from a valid saved batch', async () => {
    const worker = createWorker();
    worker.files.entries.set(
      at('/api/study-content?kind=recall&id=c1&id=c2'),
      Response.json({ data: { items: [recall('c1'), recall('c2')] } }),
    );
    worker.files.entries.set(
      at('/api/study-content?kind=recall&id=c1&id=c3'),
      new Response('invalid json'),
    );
    worker.fetch.mockRejectedValueOnce(new TypeError('Network unavailable'));
    const response = await worker.request('/api/study-content?kind=recall&id=c1');
    expect(await response?.json()).toEqual({ data: { items: [recall('c1')] } });
  });
});
