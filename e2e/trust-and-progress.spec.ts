import { expect, test } from '@playwright/test';

import { expectAccessible, seedProgress } from './support';

test('a student reports an issue from the topic hub', async ({ page }) => {
  await page.goto('/learn/brachial-plexus');
  await page.getByRole('button', { name: 'Sources and report' }).click();
  const drawer = page.getByRole('dialog', { name: 'Sources' });
  await expect(
    drawer.getByRole('link', { name: /OpenStax Anatomy and Physiology 2e/ }),
  ).toBeVisible();
  await expect(drawer).toContainText('Not yet reviewed by a medical reviewer');
  await expectAccessible(page);

  await drawer.getByText('Hard to understand').click();
  await drawer.getByLabel('Details (optional)').fill('Step 3 is hard to follow');
  await drawer.getByRole('button', { name: 'Send report' }).click();
  await expect(drawer.getByText('Thank you')).toBeVisible();
});

test('Progress shows mastery and turns a missed question into a weak spot', async ({ page }) => {
  const now = new Date().toISOString();
  await seedProgress(page, {
    completedLessons: ['brachial-plexus'],
    mistakes: ['erb-roots'],
    lastActiveAt: now,
    updatedAt: now,
  });
  // The old address lands on the library's Progress view.
  await page.goto('/progress');
  await expect(page).toHaveURL(/\/subjects\?view=progress$/);
  // One lesson done, however many topics there are.
  await expect(page.getByText(/^1 of \d+ lessons$/)).toBeVisible();
  await expect(page.getByText('Brachial plexus: 1 missed question to recall')).toBeVisible();
  await expectAccessible(page);

  await page.getByRole('link', { name: 'Revise them' }).click();
  await expect(page.getByText('5 cards due. Answer in your head, then check.')).toBeVisible();
});

test("an adult learner's progress is saved to the server and restored", async ({ page }) => {
  const now = new Date().toISOString();
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 20, adult: true },
    completedLessons: ['brachial-plexus'],
    lastActiveAt: now,
    updatedAt: now,
  });
  const saved = page.waitForResponse(
    (response) =>
      response.url().endsWith('/api/progress') &&
      response.request().method() === 'PUT' &&
      response.ok(),
  );
  await page.goto('/today');
  await saved;

  // The phone loses its local copy but keeps the session: progress comes back from the server.
  await page.evaluate(() => localStorage.removeItem('ml-progress-v1'));
  await page.reload();
  await expect(page.getByRole('link', { name: /Review 4 cards/ })).toBeVisible();
});
