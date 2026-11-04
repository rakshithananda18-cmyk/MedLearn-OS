import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

test('subject names reflow on a narrow phone with enlarged text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.addInitScript(() => {
    localStorage.setItem(
      'ml-progress-v1',
      JSON.stringify({
        profile: {
          year: 1,
          dailyMinutes: 20,
          examDate: null,
          adult: true,
          books: ['bd-chaurasia'],
        },
        completedLessons: ['brachial-plexus'],
      }),
    );
  });
  await page.goto('/subjects');
  await expect(page.getByRole('heading', { name: 'Your library' })).toBeVisible();
  await page.locator('html').evaluate((element) => {
    element.style.fontSize = '200%';
  });
  const subject = page.getByRole('button', { name: /Biochemistry/ });
  await expect(subject).toBeVisible();
  expect(await subject.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
    true,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('the library previews a topic, and the topic page leads back to that preview', async ({
  page,
}) => {
  await page.goto('/subjects');
  // The library opens folded to the regions: one, then a book section in it.
  await page.getByRole('button', { name: /^Upper limb/, expanded: false }).click();
  await page.getByRole('button', { name: /^Axilla/, expanded: false }).click();
  await page.getByRole('button', { name: /Brachial plexus/ }).click();
  await expect(page).toHaveURL(/\/subjects\?topic=brachial-plexus$/);

  // Beside the list on laptops, in a drawer on phones and tablets: the same preview either way.
  const heading = page.getByRole('heading', { level: 2, name: 'Brachial plexus' });
  await expect(heading).toBeVisible();
  await expectAccessible(page);

  await page.getByRole('link', { name: 'Open topic' }).click();
  await expect(page.getByRole('heading', { level: 1, name: /Brachial plexus/ })).toBeVisible();
  await page.getByRole('link', { name: 'Back to the library' }).click();
  await expect(page).toHaveURL(/\/subjects\?topic=brachial-plexus$/);
  await expect(heading).toBeVisible();
});
