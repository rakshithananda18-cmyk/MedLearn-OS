import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

async function expectAccessible(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(blocking.map((v) => `${page.url()} ${v.id}: ${v.help}`)).toEqual([]);
}

// The core learning loop a first-time student walks through, on phone, tablet and desktop.
test('Today → lesson → practice → revise, then the next topic', async ({ page }) => {
  // Today: a new student is offered the first lesson.
  await page.goto('/today');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Small steps, every day' }),
  ).toBeVisible();
  await expectAccessible(page);
  await page.getByRole('link', { name: /Learn: Brachial plexus/ }).click();

  // Topic hub.
  await expect(page.getByRole('heading', { level: 1, name: 'Brachial plexus' })).toBeVisible();
  await expect(page.getByText('Sample content, not medically reviewed')).toBeVisible();
  await page.getByRole('link', { name: 'Start lesson' }).click();

  // Visual lesson: step through, then trace a nerve and show a lesion.
  await expect(page.getByRole('heading', { level: 2, name: 'Five roots' })).toBeVisible();
  await expectAccessible(page);
  for (let step = 0; step < 5; step += 1) {
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await expect(page.getByRole('heading', { level: 2, name: 'Trace it yourself' })).toBeVisible();

  await page.getByRole('button', { name: 'Ulnar nerve' }).click();
  await expect(page.getByText(/Ulnar nerve\. Path: C8 root, T1 root, Lower trunk/)).toBeVisible();

  await page.getByRole('button', { name: /Erb's palsy/ }).click();
  await expect(
    page.getByText(/Affected by the lesion: C5 root, C6 root, Upper trunk/),
  ).toBeVisible();
  await expectAccessible(page);

  await page.getByRole('button', { name: 'Finish lesson' }).click();

  // Today now has reviews and practice for the finished topic.
  await expect(page).toHaveURL(/\/today$/);
  await expect(page.getByRole('link', { name: /Review 4 cards/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Practice: Brachial plexus/ })).toBeVisible();

  // Practice: answer every question correctly.
  await page.getByRole('link', { name: /Practice: Brachial plexus/ }).click();
  const answers = ['Medial cord', 'C5 and C6', 'Posterior cord', 'Median nerve'];
  for (const [index, answer] of answers.entries()) {
    await page.getByRole('button', { name: answer, exact: true }).click();
    await expect(page.getByRole('status').filter({ hasText: 'Correct' })).toBeVisible();
    if (index === 0) await expectAccessible(page);
    await page.getByRole('button', { name: 'Next question' }).click();
  }
  await expect(page.getByText('All questions done')).toBeVisible();

  // Revise: recall and rate all four cards.
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Revise' })
    .click();
  for (let card = 0; card < 4; card += 1) {
    await page.getByRole('button', { name: 'Show answer' }).click();
    if (card === 0) await expectAccessible(page);
    await page.getByRole('button', { name: 'Good: Recalled' }).click();
  }
  await expect(page.getByText('No reviews due')).toBeVisible();

  // Today moves on to the next topic, and progress survives a reload.
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Today' }).click();
  const next = page.getByRole('link', { name: /Learn: Oxygen–haemoglobin curve/ });
  await expect(next).toBeVisible();
  await page.reload();
  await expect(next).toBeVisible();
  await expect(page.getByRole('link', { name: /Review/ })).toHaveCount(0);
});
