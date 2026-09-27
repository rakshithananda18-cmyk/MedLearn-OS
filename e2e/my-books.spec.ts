import { expect, test } from '@playwright/test';

import { expectAccessible, seedProgress } from './support';

test('a student picks the books they follow from Today, and the choice sticks', async ({
  page,
}) => {
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 20, adult: false },
  });
  await page.goto('/today');
  await page.getByRole('link', { name: 'Choose my books' }).click();
  await expect(page).toHaveURL(/\/books$/);
  await expect(page.getByRole('group', { name: 'Physiology books' })).toBeVisible();
  await expectAccessible(page);

  // Tick a card as a person does: by its label.
  await page.getByText('Guyton and Hall', { exact: true }).click();
  await expect(page.getByRole('checkbox', { name: /Guyton and Hall/ })).toBeChecked();
  await page.reload();
  await expect(page.getByRole('checkbox', { name: /Guyton and Hall/ })).toBeChecked();

  // Today no longer asks, and each topic has its reading card.
  await page.goto('/today');
  await expect(page.getByRole('heading', { name: 'Small steps, every day' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Choose my books' })).toHaveCount(0);
  await page.goto('/learn/brachial-plexus');
  await expect(page.getByRole('heading', { name: 'Where to read this' })).toBeVisible();
});
