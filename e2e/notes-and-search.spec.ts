import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

test('search from Subjects finds material inside a topic and opens it', async ({ page }) => {
  await page.goto('/subjects');
  await page.getByLabel('Search topics, facts and questions').fill('klumpke');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page).toHaveURL(/\/search\?q=klumpke$/);
  const results = page.getByRole('list', { name: /Results for/ });
  await expect(results.getByRole('link').first()).toBeVisible();
  await expectAccessible(page);

  await results.getByRole('link').first().click();
  await expect(page).toHaveURL(/\/learn\/brachial-plexus/);
});

test('a search with no match says so', async ({ page }) => {
  await page.goto('/search?q=zzqx');
  await expect(page.getByText(/Nothing found for/)).toBeVisible();
});

test('a note on a topic is still there after a reload', async ({ page }) => {
  await page.goto('/learn/brachial-plexus');
  const notes = page.getByLabel(/^Your notes on this topic/);
  await notes.fill('Erb: upper trunk, waiter’s tip');
  await notes.blur();
  await page.reload();
  await expect(page.getByLabel(/^Your notes on this topic/)).toHaveValue(
    'Erb: upper trunk, waiter’s tip',
  );
  await expectAccessible(page);
});
