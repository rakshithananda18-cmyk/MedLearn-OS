import { expect, type Page, test } from '@playwright/test';

import { expectAccessible } from './support';

// Reduced motion: camera moves jump instead of animating. Software WebGL in headless Chromium is
// CPU-heavy, and this also covers the reduced-motion path.
test.use({ reducedMotion: 'reduce' });

/** Clicks a button only where the layout has it (phones open panels; laptops dock them). */
async function clickIfShown(page: Page, name: string) {
  const button = page.getByRole('button', { name, exact: true });
  if (await button.isVisible()) await button.click();
}

/** Finds a structure by name: the search sheet on phones, the docked topics panel on laptops. */
async function findStructure(page: Page, query: string, name: string) {
  await clickIfShown(page, 'Search structures');
  await page.getByRole('searchbox', { name: 'Find a structure' }).fill(query);
  await page.getByRole('button', { name, exact: true }).click();
}

test('the 3D tab opens the body; a region leads to a topic to explore and learn from', async ({
  page,
}) => {
  test.slow();
  await page.goto('/today');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: '3D' }).click();
  await expect(page).toHaveURL(/\/studio$/);
  // WebGL renders in the browser (SwiftShader in CI), so the real canvas appears.
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Whole body' })).toBeAttached();
  await expectAccessible(page);

  await page.getByRole('button', { name: /Axilla: walls/ }).click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Axilla: walls and contents' }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/studio\?topic=axilla$/);

  // Layers: peel the muscles away.
  await clickIfShown(page, 'Layers');
  const layers = page.getByRole('region', { name: 'Layers' });
  await layers.getByRole('button', { name: 'Muscles', exact: true }).click();
  await expect(layers.getByRole('button', { name: 'Muscles', exact: true })).toHaveAttribute(
    'aria-pressed',
    'false',
  );

  // Find one structure by name, and read about it.
  await findStructure(page, 'serratus', 'Serratus anterior');
  const card = page.getByRole('region', { name: 'Serratus anterior' });
  await expect(card.getByText(/Long thoracic nerve/).first()).toBeVisible();
  await clickIfShown(page, 'Clinical note');
  await expect(card.getByText('Long thoracic nerve injury.')).toBeVisible();
  await expectAccessible(page);
});

test('a topic opens the studio at its model, where nerves trace and "Find it" plays', async ({
  page,
}) => {
  test.slow();
  await page.goto('/learn/brachial-plexus');
  await page.getByRole('link', { name: /Explore in 3D/ }).click();
  await expect(page).toHaveURL(/\/studio\?topic=brachial-plexus$/);
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 });

  await findStructure(page, 'median', 'Median nerve');
  await expect(page.getByRole('list', { name: 'Path' })).toContainText('cord');
  await expect(page.getByText(/BodyParts3D/).first()).toBeVisible();

  await page.getByRole('button', { name: 'Find it', exact: true }).click();
  await expect(page.getByText('Find it on the model')).toBeVisible();
  await page.getByRole('button', { name: 'Skip' }).click();
  await expect(page.getByText('Question 2 of 10')).toBeVisible();
  await page.getByRole('button', { name: 'End the game' }).click();
  await expect(page.getByText('Find it on the model')).toHaveCount(0);
});
