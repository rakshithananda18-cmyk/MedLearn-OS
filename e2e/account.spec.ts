import { expect, test } from '@playwright/test';

import { expectAccessible, seedProgress } from './support';

// Each account step makes several round trips to the auth service, whose password hashing is slow
// on purpose; with many parallel tests on one laptop a step can take several seconds.
const AUTH_WAIT = 30_000;

test('an adult saves progress to an account, signs out, and gets it back by signing in', async ({
  page,
}, testInfo) => {
  test.slow();
  const email = `e2e-${testInfo.project.name}-${Date.now()}@example.com`;
  const password = 'correct-horse-9';
  const now = new Date().toISOString();
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 20, adult: true },
    completedLessons: ['brachial-plexus'],
    lastActiveAt: now,
    updatedAt: now,
  });

  // Create the account from the Progress nudge.
  await page.goto('/progress');
  await page.getByRole('link', { name: 'Create account or sign in' }).click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Keep your progress safe' }),
  ).toBeVisible();
  await expectAccessible(page);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByText(`Signed in as ${email}`)).toBeVisible({ timeout: AUTH_WAIT });

  // Sign out: this phone forgets the progress.
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/today');
  await expect(page.getByRole('link', { name: /Learn: Brachial plexus/ })).toBeVisible();

  // Sign in again: the progress comes back.
  await page.goto('/account');
  await page.getByRole('button', { name: 'Existing account' }).click();
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/\/today$/, { timeout: AUTH_WAIT });
  await expect(page.getByRole('link', { name: /Review 4 cards/ })).toBeVisible();
});

test('a wrong password gets a clear message', async ({ page }) => {
  await page.goto('/account');
  await page.getByRole('button', { name: 'Existing account' }).click();
  await page.getByLabel('Email').fill('nobody@example.com');
  await page.getByLabel('Password').fill('wrong-pass-9');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText('Email or password is wrong.')).toBeVisible({ timeout: AUTH_WAIT });
});
