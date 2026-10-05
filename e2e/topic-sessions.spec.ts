import { expect, test } from '@playwright/test';

import { expectAccessible, seedProgress } from './support';

test('topic practice and recall retain the selected topic through navigation', async ({ page }) => {
  await seedProgress(page, {
    completedLessons: ['brachial-plexus', 'oxygen-haemoglobin-curve'],
  });
  await page.goto('/learn/oxygen-haemoglobin-curve');
  await page.getByRole('link', { name: /^Practice / }).click();
  await expect(page).toHaveURL(/\/practice\?topic=oxygen-haemoglobin-curve$/);
  // Only this topic's four questions, though another lesson is complete too.
  await expect(
    page.getByRole('region', { name: 'Oxygen–haemoglobin curve' }).filter({ hasText: '1 of 4' }),
  ).toBeVisible();
  await expectAccessible(page);
  await page.goBack();
  await page.getByRole('link', { name: /^Recall / }).click();
  await expect(page).toHaveURL(/\/revise\?topic=oxygen-haemoglobin-curve$/);
  await expect(page.getByText('Why is the oxygen–haemoglobin curve S-shaped?')).toBeVisible();
});

test('Today finishes its bounded review session and leaves the rest available', async ({
  page,
}) => {
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 5, adult: true },
    completedLessons: ['brachial-plexus', 'oxygen-haemoglobin-curve'],
    lastActiveAt: new Date(Date.now() - 5 * 86_400_000).toISOString(),
  });
  await page.goto('/today');
  await page.getByRole('link', { name: /Review 5 cards/ }).click();
  await expect(page).toHaveURL(/\/revise\?limit=5$/);
  for (let index = 0; index < 5; index += 1) {
    await page.getByRole('button', { name: 'Show answer' }).click();
    await page.getByRole('button', { name: 'Easy: Instant' }).click();
  }
  await expect(page.getByText('Review session complete')).toBeVisible();
  await expect(page.getByText(/Your remaining reviews are saved/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show answer' })).toHaveCount(0);
  await expectAccessible(page);
  await page.getByRole('link', { name: 'Back to Today' }).last().click();
  // The other three wait as the plan's next step.
  await page.getByRole('link', { name: 'Start recall' }).click();
  await expect(page).toHaveURL(/\/revise\?limit=3$/);
  await expect(
    page.getByText('3 cards left in this session. Answer in your head, then check.'),
  ).toBeVisible();
});

test('unknown topic filters return not found instead of another topic', async ({ page }) => {
  for (const route of ['practice', 'revise']) {
    const response = await page.goto(`/${route}?topic=unknown-topic`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  }
});
