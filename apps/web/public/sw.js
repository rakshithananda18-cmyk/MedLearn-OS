// MedLearn OS service worker: pages a student has opened keep working offline.
// Pages: network first, so students see the newest version when online. Build files, models and
// icons: cache first (their names change when their content does). The API is never cached.
// ponytail: caches are never trimmed across deploys (old build files linger, a few hundred KB
// each); stamp the build id into this file, or move to Serwist precaching, when that matters.
const PAGES = 'pages-v1';
const FILES = 'files-v1';
const OFFLINE_PAGE = '/offline';

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
  if (response.ok) await cache.put(request, response.clone());
  return response;
}
