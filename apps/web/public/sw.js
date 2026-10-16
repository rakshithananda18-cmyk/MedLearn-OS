// MedLearn OS service worker: pages a student has opened keep working offline.
// Pages: network first, so students see the newest version when online. Build files, models and
// icons: cache first (their names change when their content does). The API is never cached.
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

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  if (request.mode === 'navigate') event.respondWith(networkFirst(request));
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
  if (response.ok) {
    await cache.put(request, response.clone());
    const keys = await cache.keys();
    const urls = keys.map((key) => key.url);
    const drop = new Set(toTrim(urls, request.url, MAX_FILES));
    await Promise.all(keys.filter((key) => drop.has(key.url)).map((key) => cache.delete(key)));
  }
  return response;
}

/**
 * The cached files to drop after `added` is stored, from `urls` in the order they were cached:
 * other versions of the same file (a model whose ?v= was bumped), then the oldest beyond `max`.
 */
function toTrim(urls, added, max) {
  const { pathname, search } = new URL(added);
  const stale = urls.filter((url) => {
    const old = new URL(url);
    return old.pathname === pathname && old.search !== search;
  });
  const kept = urls.filter((url) => !stale.includes(url));
  return [...stale, ...kept.slice(0, Math.max(0, kept.length - max))];
}
