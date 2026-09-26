import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

// Reduced motion: camera moves jump instead of animating. Software WebGL in headless Chromium is
// CPU-heavy, and this also covers the reduced-motion path.
test.use({ reducedMotion: 'reduce' });

test('the topic hub opens a 3D view where a nerve lights its whole path', async ({ page }) => {
  test.slow();
  await page.goto('/learn/brachial-plexus');
  await page.getByRole('link', { name: /Explore in 3D/ }).click();
  await expect(page).toHaveURL(/\/learn\/brachial-plexus\/3d$/);

  // WebGL renders in the browser (SwiftShader in CI), so the real canvas appears.
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/The plexus runs from the neck/)).toBeVisible();
  await expectAccessible(page);

  await page.getByRole('button', { name: 'Divisions and cords' }).click();
  await expect(page.getByText(/Behind the clavicle the trunks split/)).toBeVisible();

  await page.getByRole('button', { name: 'Median nerve' }).click();
  await expect(page.getByText(/^Median nerve\. Path: C5 root/)).toBeVisible();
  await expect(page.getByText(/BodyParts3D/).first()).toBeVisible();
});
