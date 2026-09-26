import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

test('the app can be installed: a manifest with icons that load', async ({ request }) => {
  const response = await request.get('/manifest.webmanifest');
  expect(response.ok()).toBe(true);
  const manifest = (await response.json()) as {
    name: string;
    start_url: string;
    display: string;
    icons: { src: string; purpose: string }[];
  };
  expect(manifest).toMatchObject({
    name: 'MedLearn OS',
    start_url: '/today',
    display: 'standalone',
  });
  expect(manifest.icons.map((icon) => icon.purpose)).toEqual(['any', 'any', 'maskable']);
  for (const icon of manifest.icons) expect((await request.get(icon.src)).ok()).toBe(true);
});

test('pages opened before still work offline, and other pages say they need a connection', async ({
  page,
  context,
}) => {
  test.slow();
  await page.goto('/today');
  // The service worker installs on the first visit and takes over this page.
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.controller !== null))
    .toBe(true);
  await page.goto('/learn/brachial-plexus');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: /Brachial plexus/ })).toBeVisible();
  await expect(page.getByText('You are offline')).toBeVisible();

  await page.goto('/subjects');
  await expect(
    page.getByRole('heading', { level: 1, name: 'This page needs a connection' }),
  ).toBeVisible();
  await expectAccessible(page);

  await context.setOffline(false);
  await page.goto('/subjects');
  await expect(page.getByText('You are offline')).toBeHidden();
});
