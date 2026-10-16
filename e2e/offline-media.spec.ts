import { expect, test } from '@playwright/test';

test('posters and X-rays refresh online and recover the latest image offline', async ({
  page,
  context,
}) => {
  await page.goto('/today');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.controller !== null))
    .toBe(true);

  const paths = ['/posters/brachial-plexus.webp', '/xrays/wrist-pa.webp'];
  await page.evaluate(async (urls) => {
    const cache = await caches.open('files-v1');
    for (const url of urls) await cache.put(url, new Response('outdated image'));
  }, paths);

  const readImages = async () =>
    page.evaluate(async (urls) => {
      return Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url, { cache: 'no-store' });
          const body = await response.arrayBuffer();
          const digest = await crypto.subtle.digest('SHA-256', body);
          return {
            url,
            status: response.status,
            type: response.headers.get('content-type'),
            size: body.byteLength,
            digest: Array.from(new Uint8Array(digest), (byte) =>
              byte.toString(16).padStart(2, '0'),
            ).join(''),
          };
        }),
      );
    }, paths);

  const online = await readImages();
  for (const image of online) {
    expect(image.status).toBe(200);
    expect(image.type).toContain('image/webp');
    expect(image.size).toBeGreaterThan(100);
  }

  await context.setOffline(true);
  expect(await readImages()).toEqual(online);
});
