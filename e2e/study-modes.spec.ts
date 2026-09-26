import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

const DAY_MS = 86_400_000;

async function expectAccessible(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(blocking.map((v) => `${page.url()} ${v.id}: ${v.help}`)).toEqual([]);
}

/** Local calendar date (YYYY-MM-DD) a number of days from now. */
function localDate(daysFromNow: number): string {
  const date = new Date(Date.now() + daysFromNow * DAY_MS);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Puts saved progress on the device, as if the student had used the app before. */
async function seedProgress(page: Page, progress: object) {
  await page.goto('/');
  await page.evaluate(
    (value) => localStorage.setItem('ml-progress-v1', JSON.stringify(value)),
    progress,
  );
}

test('onboarding sizes the plan and switches on exam mode', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Start in 3 steps' }).click();

  await expect(page.getByRole('img', { name: 'Step 1 of 3' })).toBeVisible();
  await expectAccessible(page);
  await page.getByText('First year', { exact: true }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByLabel('Exam date').fill(localDate(12));
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByText('30 minutes', { exact: true }).click();
  await page.getByRole('button', { name: 'Create my plan' }).click();

  await expect(page).toHaveURL(/\/today$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Exam ahead, stay steady' }),
  ).toBeVisible();
  await expect(page.getByText('Exam in 12 days')).toBeVisible();
  await expect(page.getByText('15 of 30 min')).toBeVisible();
  await expectAccessible(page);
});

test('a student back after missed days gets a capped catch-up plan', async ({ page }) => {
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 20 },
    completedLessons: ['brachial-plexus'],
    lastActiveAt: new Date(Date.now() - 5 * DAY_MS).toISOString(),
  });
  await page.goto('/today');

  await expect(page.getByRole('heading', { level: 1, name: 'Welcome back, gently' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'You were away for 4 days' })).toBeVisible();
  await expectAccessible(page);
  await page.getByRole('button', { name: 'Accept plan' }).click();
  await expect(page.getByText('Plan accepted. Start with the first step below.')).toBeVisible();
  // Protect what was learned first: reviews lead the plan.
  await expect(
    page.getByRole('list', { name: "Today's plan" }).getByRole('link').first(),
  ).toHaveText(/Review 4 cards/);
});

test('the diagram trainer builds the brachial plexus layer by layer', async ({ page }) => {
  await seedProgress(page, {
    profile: { year: 1, examDate: localDate(10), dailyMinutes: 20 },
    completedLessons: ['brachial-plexus'],
    lastActiveAt: new Date().toISOString(),
  });
  await page.goto('/today');
  await page.getByRole('link', { name: /Draw: Brachial plexus/ }).click();

  await expect(page.getByRole('heading', { level: 2, name: 'Roots' })).toBeVisible();
  await expectAccessible(page);
  const labels = page.getByRole('group', { name: 'Labels' });

  // One wrong label first: it is refused with a hint, and nothing is placed.
  await labels.getByRole('button', { name: 'T1' }).click();
  await expect(page.getByText(/Not T1\./)).toBeVisible();

  const layers: Array<[string[], string | null]> = [
    [['C5', 'C6', 'C7', 'C8', 'T1'], 'Next: Trunks'],
    [['Upper', 'Middle', 'Lower'], 'Next: Divisions'],
    [['A', 'P', 'A', 'P', 'A', 'P'], 'Next: Cords'],
    [['Lateral', 'Posterior', 'Medial'], 'Next: Terminal branches'],
    [['Musculocutaneous', 'Axillary', 'Radial', 'Median', 'Ulnar'], null],
  ];
  for (const [names, next] of layers) {
    for (const name of names) {
      await labels.getByRole('button', { name, exact: true }).click();
    }
    if (next) await page.getByRole('button', { name: next }).click();
  }

  await expect(page.getByRole('heading', { name: 'Diagram built' })).toBeVisible();
  await expect(page.getByText(/Built with 1 correction/)).toBeVisible();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page).toHaveURL(/\/today$/);
  await expect(page.getByRole('link', { name: /Draw: Brachial plexus/ })).toHaveCount(0);
});

test('the oxygen curve lesson ends with sliders to explore', async ({ page }) => {
  await page.goto('/learn/oxygen-haemoglobin-curve/lesson');
  await expect(page.getByText('P50 26.8 mmHg, the normal curve', { exact: false })).toBeVisible();
  for (let step = 1; step < 6; step += 1) {
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Try it yourself' })).toBeVisible();
  await page.getByRole('button', { name: 'High altitude' }).click();
  await expect(page.getByText(/shifted right: haemoglobin lets go of oxygen/)).toBeVisible();
  await page.getByRole('slider', { name: /Temperature/ }).fill('34');
  await expect(page.getByRole('button', { name: 'High altitude' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await expectAccessible(page);
});
