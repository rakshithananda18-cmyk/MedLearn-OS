// MedLearn OS service worker: pages a student has opened keep working offline.
// Pages: network first, so students see the newest version when online. Build files, models and
// icons: cache first (their names change when their content does). Posters, X-rays and read-only
// study content: network first, with the last successful response available when disconnected.
// Learner, account and review APIs are never cached.
// Files are trimmed as new ones arrive: an older version of the same model goes at once, and past
// MAX_FILES the oldest build files go first.
// ponytail: a count cap, not a byte cap; stamp the build id here, or move to Serwist precaching,
// if old builds ever crowd out the models.
const PAGES = 'pages-v1';
const FILES = 'files-v1';
const OFFLINE_PAGE = '/offline';
const MAX_FILES = 400;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.add(OFFLINE_PAGE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== PAGES && key !== FILES).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const isFile = (url) =>
  url.pathname.startsWith('/_next/static/') ||
  url.pathname.startsWith('/models/') ||
  url.pathname.startsWith('/icons/');

const isStudyContent = (url) => {
  if (url.pathname !== '/api/study-content') return false;
  const kinds = url.searchParams.getAll('kind');
  const ids = url.searchParams.getAll('id');
  return (
    [...url.searchParams.keys()].every((key) => key === 'kind' || key === 'id') &&
    kinds.length === 1 &&
    ['practice', 'recall'].includes(kinds[0]) &&
    ids.length > 0 &&
    ids.length <= 20 &&
    ids.every((id) => id.length > 0 && id.length <= 120 && id.trim() === id)
  );
};

const isFreshFile = (url) =>
  url.pathname.startsWith('/posters/') || url.pathname.startsWith('/xrays/') || isStudyContent(url);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/') && !isStudyContent(url)) return;
  if (isFreshFile(url)) event.respondWith(networkFirstFile(request));
  else if (request.mode === 'navigate') event.respondWith(networkFirst(request));
  else if (isFile(url)) event.respondWith(cacheFirst(request));
});

async function networkFirst(request) {
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) ?? (await cache.match(OFFLINE_PAGE)) ?? Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(FILES);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await saveFile(request, response);
  return response;
}

async function networkFirstFile(request) {
  let response;
  try {
    response = await fetch(request);
  } catch {
    try {
      const cache = await caches.open(FILES);
      const cached = await cache.match(request);
      if (cached) return cached;
      const url = new URL(request.url);
      if (isStudyContent(url)) return (await studyContentFromCache(cache, url)) ?? Response.error();
      return Response.error();
    } catch {
      return Response.error();
    }
  }
  // An HTTP error is an online response, not a reason to serve an old successful result.
  if (response.ok) await saveFile(request, response);
  return response;
}

function studyItemId(kind, item) {
  if (!item || typeof item !== 'object' || typeof item.topic?.slug !== 'string') return null;
  if (kind === 'practice') {
    return typeof item.question?.id === 'string' &&
      typeof item.question.prompt === 'string' &&
      Array.isArray(item.question.options)
      ? item.question.id
      : null;
  }
  return typeof item.id === 'string' &&
    typeof item.front === 'string' &&
    typeof item.back === 'string'
    ? item.id
    : null;
}

/** A rated card or a new shuffle changes the batch URL, though its content is already saved. */
async function studyContentFromCache(cache, requested) {
  const kind = requested.searchParams.get('kind');
  const wanted = [...new Set(requested.searchParams.getAll('id'))];
  const found = new Map();
  // Prefer the most recently added batches when more than one contains an item.
  const keys = await cache.keys();
  for (const key of keys.reverse()) {
    const url = new URL(key.url);
    if (
      url.origin !== requested.origin ||
      !isStudyContent(url) ||
      url.searchParams.get('kind') !== kind
    )
      continue;
    const declared = new Set(url.searchParams.getAll('id'));
    if (!wanted.some((id) => !found.has(id) && declared.has(id))) continue;
    try {
      const response = await cache.match(key);
      if (!response?.ok) continue;
      const body = await response.json();
      const items = body?.data?.items;
      if (!Array.isArray(items) || items.length !== declared.size) continue;
      const ids = items.map((item) => studyItemId(kind, item));
      if (new Set(ids).size !== declared.size || ids.some((id) => id === null || !declared.has(id)))
        continue;
      items.forEach((item, index) => {
        const id = ids[index];
        if (wanted.includes(id) && !found.has(id)) found.set(id, item);
      });
      if (found.size === wanted.length) {
        return Response.json(
          { data: { items: wanted.map((id) => found.get(id)) } },
          { headers: { 'Cache-Control': 'private, no-store' } },
        );
      }
    } catch {
      // A malformed batch must not prevent recovery from another valid cached batch.
    }
  }
  return undefined;
}

async function saveFile(request, response) {
  try {
    const cache = await caches.open(FILES);
    await cache.put(request, response.clone());
    const keys = await cache.keys();
    const urls = keys.map((key) => key.url);
    const drop = new Set(toTrim(urls, request.url, MAX_FILES));
    await Promise.all(keys.filter((key) => drop.has(key.url)).map((key) => cache.delete(key)));
  } catch {
    // Full or unavailable storage must not discard a successful network response.
  }
}

/**
 * The cached files to drop after `added` is stored, from `urls` in the order they were cached:
 * other versions of the same file (a model whose ?v= was bumped), then the oldest beyond `max`.
 * Study-content queries identify different batches, so their query strings are not versions.
 */
function toTrim(urls, added, max) {
  const { pathname, search } = new URL(added);
  const stale = urls.filter((url) => {
    const old = new URL(url);
    return pathname !== '/api/study-content' && old.pathname === pathname && old.search !== search;
  });
  const kept = urls.filter((url) => !stale.includes(url) && url !== added);
  return [...stale, ...kept.slice(0, Math.max(0, kept.length - Math.max(0, max - 1)))];
}
