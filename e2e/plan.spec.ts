import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

test('a student makes a plan from choices, adjusts its calendar, and Today follows it', async ({
  page,
}) => {
  await page.goto('/plan/new');
  await page.getByText('Learn new topics').click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await page.getByRole('button', { name: 'All of Upper limb' }).click();
  await expectAccessible(page);
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  await page.getByRole('button', { name: '1 month' }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Check and add' })).toBeVisible();
  await page.getByRole('button', { name: 'Add plan' }).click();

  const card = page.getByRole('article', { name: 'Upper limb' });
  await expect(card.getByText('0 / 30')).toBeVisible();
  await expectAccessible(page);

  await card.getByRole('link', { name: 'Open calendar' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Upper limb' })).toBeVisible();
  await page
    .getByRole('button', { name: /^Take off / })
    .first()
    .click();
  await expect(page.getByRole('button', { name: /^Study on / })).toBeVisible();
  await expectAccessible(page);

  // A topic opens in the library.
  await page
    .getByRole('link', { name: /Axilla: walls/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/learn\/axilla$/);

  await page.goto('/today');
  await expect(page.getByText('Upper limb').first()).toBeVisible();
});
