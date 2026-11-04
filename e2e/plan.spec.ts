import { expect, test } from '@playwright/test';

import { expectAccessible, localDate, seedProgress } from './support';

test('a student makes a plan from choices, adjusts its calendar, and Today follows it', async ({
  page,
}) => {
  await page.goto('/plan/new');
  await page.getByText('Learn new topics').click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Which topics?' })).toBeFocused();

  await page.getByRole('button', { name: 'All of Upper limb' }).click();
  await expectAccessible(page);
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'When?' })).toBeFocused();

  await page.getByRole('button', { name: '1 month' }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Check and add' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Check and add' })).toBeFocused();
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

  // The calendar separates the topic overview from its planned lesson.
  await page
    .getByRole('link', { name: /Overview: Axilla: walls/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/learn\/axilla$/);

  await page.goto('/today');
  await expect(page.getByText('Upper limb').first()).toBeVisible();
});

test('an unfinished plan past its deadline can be extended without losing its work', async ({
  page,
}) => {
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 20, adult: false },
    goals: [
      {
        id: 'goal-expired-e2e',
        kind: 'learn',
        title: 'Thorax revision',
        topics: ['pleura', 'lungs'],
        done: [],
        date: localDate(-1),
        createdAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
      },
    ],
  });
  await page.goto('/plan/goal-expired-e2e');
  await expect(page.getByText('Deadline passed · 2 topics left')).toBeVisible();
  await expect(page.getByText(/Every topic is done/)).toHaveCount(0);
  await page.getByRole('link', { name: 'Adjust dates' }).click();
  await page.getByLabel('Done by').fill(localDate(7));
  const next = page.getByRole('link', { name: /^Continue: Pleura/ });
  await expect(next).toHaveAttribute('href', '/learn/pleura/lesson');
  await expect(page.getByText('Deadline passed · 2 topics left')).toHaveCount(0);
  await expectAccessible(page);
});

test('calendar practice keeps the scheduled test goal', async ({ page }) => {
  await seedProgress(page, {
    profile: { year: 1, examDate: null, dailyMinutes: 20, adult: false },
    goals: [
      {
        id: 'goal-knee-e2e',
        kind: 'test',
        title: 'Knee class test',
        topics: ['knee-joint'],
        done: [],
        date: localDate(2),
        createdAt: new Date().toISOString(),
      },
    ],
  });
  await page.goto('/plan/goal-knee-e2e');
  const study = page.getByRole('link', { name: /^Practise: Knee joint/ });
  await expect(study).toHaveAttribute('href', '/practice?goal=goal-knee-e2e&topic=knee-joint');
  await study.click();
  await expect(page).toHaveURL(/\/practice\?goal=goal-knee-e2e&topic=knee-joint$/);
  await expect(
    page.getByRole('region', { name: /Knee joint/ }).filter({ hasText: '1 of 4' }),
  ).toBeVisible();
});
