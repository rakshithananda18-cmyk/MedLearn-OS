import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

// Reduced motion: camera moves jump instead of animating. Software WebGL in headless Chromium is
// CPU-heavy, and this also covers the reduced-motion path.
test.use({ reducedMotion: 'reduce' });

test('the 3D tab opens the body; a region leads to a topic to explore and learn from', async ({
  page,
}) => {
  test.slow();
  await page.goto('/today');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: '3D' }).click();
  await expect(page).toHaveURL(/\/studio$/);
  // WebGL renders in the browser (SwiftShader in CI), so the real canvas appears.
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Whole body' })).toBeVisible();
  await expectAccessible(page);

  const topics = page.getByRole('region', { name: 'Topics' });
  await topics.getByRole('button', { name: /Axilla: walls/ }).click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Axilla: walls and contents' }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/studio\?topic=axilla$/);

  // Layers: peel the muscles away, then pick one structure from the list.
  await page.getByRole('button', { name: 'Layers' }).click();
  const layers = page.getByRole('region', { name: 'Layers' });
  await layers.getByRole('switch', { name: 'Muscles' }).click();
  await expect(layers.getByRole('switch', { name: 'Muscles' })).toHaveAttribute(
    'aria-checked',
    'false',
  );
  // Picking from the list closes the panel to make room for the structure's card.
  await layers.getByRole('button', { name: 'Serratus anterior', exact: true }).click();
  const card = page.getByRole('region', { name: 'Serratus anterior' });
  await expect(card.getByText(/Long thoracic nerve/)).toBeVisible();
  await card.getByRole('button', { name: 'More about it' }).click();
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

  await page.getByRole('button', { name: 'Layers' }).click();
  await page
    .getByRole('region', { name: 'Layers' })
    .getByRole('button', { name: 'Median nerve', exact: true })
    .click();
  await expect(page.getByText(/^Path: C5 root/)).toBeVisible();
  await expect(page.getByText(/BodyParts3D/).first()).toBeVisible();

  await page.getByRole('button', { name: 'Find it' }).click();
  await expect(page.getByText(/^Find:/)).toBeVisible();
  await page.getByRole('button', { name: 'Skip' }).click();
  await page.getByRole('button', { name: 'End' }).click();
  await expect(page.getByText(/^Find:/)).toHaveCount(0);
});
