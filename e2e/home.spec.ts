import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

test.describe('landing and subjects', () => {
  test('the landing page starts new students on the setup questions', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Learn medicine, visually' }),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Start in 4 steps' }).click();
    await expect(page).toHaveURL(/\/welcome$/);
  });

  test('subjects come from the database', async ({ page }) => {
    await page.goto('/subjects');
    const subjects = page.getByRole('list', { name: 'Subjects' });
    await expect(subjects.getByRole('heading', { level: 2 })).toHaveText([
      'Anatomy',
      'Physiology',
      'Biochemistry',
    ]);
  });

  test('stamps responses with a request id', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.headers()['x-request-id']).toMatch(/^[A-Za-z0-9-]{8,64}$/);
  });

  test('has no serious accessibility violations', async ({ page }) => {
    // Three full accessibility scans.
    test.slow();
    for (const path of ['/', '/subjects', '/welcome']) {
      await page.goto(path);
      await expectAccessible(page);
    }
  });
});

test.describe('API', () => {
  test('health check reports ok', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ data: { status: 'ok' } });
  });
});
