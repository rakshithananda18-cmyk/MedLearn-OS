import { expect, test } from '@playwright/test';

import { expectAccessible } from './support';

// The core learning loop a first-time student walks through, on phone, tablet and desktop.
test('Today → lesson → practice → revise, then the next topic', async ({ page }) => {
  // The whole first-day journey with five accessibility scans; longer than a single-screen test.
  test.slow();
  // Today: a new student is offered the first lesson.
  await page.goto('/today');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Small steps, every day' }),
  ).toBeVisible();
  await expectAccessible(page);
  await page.getByRole('link', { name: /Learn: Pectoral region and breast/ }).click();

  // Topic hub.
  await expect(
    page.getByRole('heading', { level: 1, name: 'Pectoral region and breast' }),
  ).toBeVisible();
  await expect(page.getByText('Sample content, not medically reviewed')).toBeVisible();
  await page.getByRole('link', { name: 'Start lesson' }).click();

  // Visual lesson: step through, then trace the lymph and show a spread pattern.
  await expect(
    page.getByRole('heading', { level: 2, name: 'Where the breast lies' }),
  ).toBeVisible();
  await expectAccessible(page);
  for (let step = 0; step < 7; step += 1) {
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Trace it yourself' })).toBeVisible();

  await page.getByRole('button', { name: 'Central axillary nodes' }).click();
  await expect(
    page.getByText(/Central axillary nodes\. Path: Breast, Pectoral \(anterior\) axillary nodes/),
  ).toBeVisible();

  await page.getByRole('button', { name: /Cancer spread to the axilla/ }).click();
  await expect(
    page.getByText(/Affected by the lesion: Pectoral \(anterior\) axillary nodes, Central/),
  ).toBeVisible();
  await expectAccessible(page);

  await page.getByRole('button', { name: 'Finish lesson' }).click();

  // Wrap-up: key facts, then two check questions.
  await expect(page.getByRole('heading', { level: 2, name: 'Lesson complete' })).toBeVisible();
  await page.getByRole('button', { name: 'Axillary nodes', exact: true }).click();
  await page.getByRole('button', { name: 'Medial pectoral nerve', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Correct' })).toHaveCount(2);
  await expectAccessible(page);
  await page.getByRole('button', { name: 'Continue to Today' }).click();

  // Today now has reviews and practice for the finished topic.
  await expect(page).toHaveURL(/\/today$/);
  await expect(page.getByRole('link', { name: /Review 5 cards/ })).toBeVisible();
  const practice = page.getByRole('link', { name: /Practice: Pectoral region and breast/ });
  await expect(practice).toBeVisible();

  // Practice: the two questions not already answered in the wrap-up.
  await practice.click();
  const answers = ['Blocked skin lymphatics', 'Lateral lip of the intertubercular groove'];
  for (const [index, answer] of answers.entries()) {
    await page.getByRole('button', { name: answer, exact: true }).click();
    await expect(page.getByRole('status').filter({ hasText: 'Correct' })).toBeVisible();
    if (index === 0) await expectAccessible(page);
    await page.getByRole('button', { name: 'Next question' }).click();
  }
  await expect(page.getByText('All questions done')).toBeVisible();

  // Revise: recall and rate all five cards.
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Revise' })
    .click();
  for (let card = 0; card < 5; card += 1) {
    await page.getByRole('button', { name: 'Show answer' }).click();
    if (card === 0) await expectAccessible(page);
    await page.getByRole('button', { name: 'Good: Recalled' }).click();
  }
  await expect(page.getByText('No reviews due')).toBeVisible();

  // Today moves on to the next topic, and progress survives a reload.
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Today' }).click();
  const next = page.getByRole('link', { name: /Learn: Axilla: walls and contents/ });
  await expect(next).toBeVisible();
  await page.reload();
  await expect(next).toBeVisible();
  await expect(page.getByRole('link', { name: /Review/ })).toHaveCount(0);
});
