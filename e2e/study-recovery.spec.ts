import { expect, type Page, test } from '@playwright/test';

import { seedProgress } from './support';

async function openControlledApp(page: Page) {
  // All four questions/cards fit one batch; their canonical query survives a new shuffle.
  await seedProgress(page, { completedLessons: ['oxygen-haemoglobin-curve'] });
  await page.goto('/today');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.controller !== null))
    .toBe(true);
}

test('a practice batch exposes online failures, retries, and recovers offline after a reload', async ({
  page,
  context,
}) => {
  test.slow();
  await openControlledApp(page);
  await page.goto('/practice');
  const initialResponse = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return url.pathname === '/api/study-content' && url.searchParams.get('kind') === 'practice';
  });
  await page.getByRole('button', { name: /^Quick mix/ }).click();
  const online = await initialResponse;
  expect(online.status()).toBe(200);
  expect(online.fromServiceWorker()).toBe(true);
  const batchUrl = online.url();
  const ids = new URL(batchUrl).searchParams.getAll('id');
  expect(ids).toHaveLength(4);
  expect(ids).toEqual([...ids].sort((a, b) => a.localeCompare(b)));
  const batch: unknown = await online.json();
  await expect(page.getByRole('region', { name: 'Quick mix' })).toContainText('1 of 4');
  expect(
    await page.evaluate(async (url) => {
      const cache = await caches.open('files-v1');
      return (await cache.match(url)) !== undefined;
    }, batchUrl),
  ).toBe(true);

  await page.getByRole('button', { name: 'End the session' }).click();
  let fail = true;
  let failures = 0;
  // Context routing reaches the worker's own network fetch. Page routing would miss it.
  await context.route('**/api/study-content?**', async (route) => {
    if (route.request().serviceWorker() && fail) {
      failures += 1;
      await route.fulfill({ status: 500, json: { error: { message: 'Temporarily unavailable' } } });
    } else await route.continue();
  });
  const failedResponse = page.waitForResponse(
    (response) => response.url() === batchUrl && response.status() === 500,
  );
  await page.getByRole('button', { name: /^Quick mix/ }).click();
  expect((await failedResponse).fromServiceWorker()).toBe(true);
  await expect(
    page.getByText('This session could not be loaded. Check your connection and try again.'),
  ).toBeVisible();
  await expect(page.getByRole('region', { name: 'Quick mix' })).toHaveCount(0);
  expect(failures).toBe(1);

  fail = false;
  await page.getByRole('button', { name: 'Retry session' }).click();
  await expect(page.getByRole('region', { name: 'Quick mix' })).toContainText('1 of 4');
  await expect(page.getByRole('button', { name: 'Retry session' })).toHaveCount(0);
  await context.unroute('**/api/study-content?**');

  await context.setOffline(true);
  await page.reload();
  const offlineResponse = page.waitForResponse((response) => response.url() === batchUrl);
  await page.getByRole('button', { name: /^Quick mix/ }).click();
  const offline = await offlineResponse;
  expect(offline.status()).toBe(200);
  expect(offline.fromServiceWorker()).toBe(true);
  expect(await offline.json()).toEqual(batch);
  await expect(page.getByRole('region', { name: 'Quick mix' })).toContainText('1 of 4');
});

test('an opened recall batch is available offline after a reload', async ({ page, context }) => {
  await openControlledApp(page);
  const initialResponse = page.waitForResponse((response) => {
    const url = new URL(response.url());
    return url.pathname === '/api/study-content' && url.searchParams.get('kind') === 'recall';
  });
  await page.goto('/revise');
  const online = await initialResponse;
  expect(online.status()).toBe(200);
  expect(online.fromServiceWorker()).toBe(true);
  const count = new URL(online.url()).searchParams.getAll('id').length;
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(20);
  const batch: unknown = await online.json();
  await expect(page.getByRole('button', { name: 'Show answer' })).toBeVisible();

  await context.setOffline(true);
  const offlineResponse = page.waitForResponse((response) => response.url() === online.url());
  await page.reload();
  const offline = await offlineResponse;
  expect(offline.status()).toBe(200);
  expect(offline.fromServiceWorker()).toBe(true);
  expect(await offline.json()).toEqual(batch);
  await expect(page.getByRole('button', { name: 'Show answer' })).toBeVisible();
  await page.getByRole('button', { name: 'Show answer' }).click();
  await expect(page.getByRole('button', { name: 'Easy: Instant' })).toBeVisible();
});

test('live search leaves its loading state after an error and retries successfully', async ({
  page,
  context,
}) => {
  await openControlledApp(page);
  await page.goto('/subjects');
  let fail = true;
  await context.route('**/api/search?**', async (route) => {
    if (fail)
      await route.fulfill({ status: 500, json: { error: { message: 'Temporarily unavailable' } } });
    else await route.continue();
  });
  await page.getByRole('combobox', { name: 'Search topics, structures and notes' }).fill('axilla');
  await expect(
    page.getByText('Search is unavailable. Check your connection and try again.'),
  ).toBeVisible();
  await expect(page.getByText('Searching…')).toHaveCount(0);
  await expect(page.getByText(/Nothing matches yet/)).toHaveCount(0);

  fail = false;
  await page.getByRole('button', { name: 'Retry search' }).click();
  const topics = page.getByRole('group', { name: 'Topics', exact: true });
  await expect(topics.getByRole('option').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry search' })).toHaveCount(0);
  await expect(
    page.getByText('Search is unavailable. Check your connection and try again.'),
  ).toHaveCount(0);
});
