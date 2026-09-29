import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

test('the library previews a topic, and the topic page leads back to that preview', async ({
  page,
}) => {
  await page.goto('/subjects');
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
