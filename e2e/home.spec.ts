import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('home page', () => {
  test('shows the subjects from the database', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'MedLearn OS' })).toBeVisible();
    await expect(page.getByRole('list', { name: 'Subjects' }).getByRole('listitem')).toHaveText([
      'Anatomy',
      'Physiology',
      'Biochemistry',
    ]);
  });

  test('stamps responses with a request id', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.headers()['x-request-id']).toMatch(/^[A-Za-z0-9-]{8,64}$/);
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('/');
    const { violations } = await new AxeBuilder({ page }).analyze();
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});

test.describe('API', () => {
  test('health check reports ok', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ data: { status: 'ok' } });
  });
});
