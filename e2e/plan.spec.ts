import { expect, test } from '@playwright/test';

import { expectAccessible, localDate } from './support';

// The AI is never called from end-to-end tests: the plan the server would send is stood in for.
test('a student asks for a plan, changes it, adds it, and Today follows it', async ({ page }) => {
  await page.route('**/api/plan', (route) =>
    route.fulfill({
      json: {
        data: {
          reply: 'The brachial plexus and the axilla before your test on Friday.',
          goals: [
            {
              kind: 'test',
              title: 'Upper limb class test',
              topics: ['brachial-plexus', 'axilla'],
              date: localDate(4),
              from: null,
              minutesPerDay: 9,
            },
          ],
          dailyMinutes: null,
          examDate: null,
          tier: 'simple',
        },
      },
    }),
  );
  await page.goto('/plan');
  await page.getByRole('button', { name: 'Class test on the brachial plexus on Friday' }).click();
  await page.getByRole('button', { name: 'Make a plan' }).click();

  const plan = page.getByRole('region', { name: 'Proposed plan' });
  await expect(plan.getByText('before your test on Friday')).toBeVisible();
  await expectAccessible(page);
  await plan.getByRole('button', { name: 'Leave out Axilla' }).click();
  await page.getByRole('button', { name: 'Add to my plan' }).click();
  await expect(page.getByText('Added to your plan')).toBeVisible();

  await page.getByRole('link', { name: 'Go to Today' }).click();
  await expect(page.getByText('Upper limb class test').first()).toBeVisible();
});
