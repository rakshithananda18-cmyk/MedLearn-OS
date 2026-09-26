import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

// Real-browser checks of the design system, including colour contrast (jsdom cannot check it).
async function seriousViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  return violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes: ${v.nodes[0]?.target.join(' ')})`);
}

test.describe('light is the primary theme', () => {
  test.use({ colorScheme: 'dark' });

  test('a new visitor sees light even on a dark device, until choosing System', async ({
    page,
  }) => {
    await page.goto('/design');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    // Click the option as a person does: its label.
    await page.getByRole('group', { name: 'Theme' }).getByText('System').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`design gallery, ${colorScheme} theme`, () => {
    test.use({ colorScheme });
    // Dark is opt-in: here the student chose "System" on a dark device.
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(
        (choice) => localStorage.setItem('ml-theme', choice),
        colorScheme === 'dark' ? 'system' : 'light',
      );
    });

    test('applies the theme and passes accessibility checks, including contrast', async ({
      page,
    }) => {
      await page.goto('/design');
      await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
      await expect(page.getByRole('heading', { level: 1, name: 'Design system' })).toBeVisible();
      expect(await seriousViolations(page)).toEqual([]);
    });

    test('an open dialog passes accessibility checks', async ({ page }) => {
      await page.goto('/design');
      await page.getByRole('button', { name: 'Open bottom sheet' }).click();
      await expect(page.getByRole('dialog', { name: 'Source' })).toBeVisible();
      expect(await seriousViolations(page)).toEqual([]);
    });
  });
}

test('the theme toggle switches and remembers the theme', async ({ page }) => {
  await page.goto('/design');
  // Click the option as a person does: its label.
  await page.getByRole('group', { name: 'Theme' }).getByText('Dark').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('radio', { name: 'Dark' })).toBeChecked();
});

test('design tokens reach the page: primary buttons use the brand colour', async ({ page }) => {
  await page.goto('/design');
  const background = await page
    .getByRole('button', { name: 'Start lesson' })
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(background).toBe('rgb(14, 124, 134)');
});
