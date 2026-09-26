import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

const DAY_MS = 86_400_000;

/** Fails on serious or critical accessibility violations on the current page. */
export async function expectAccessible(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(blocking.map((v) => `${page.url()} ${v.id}: ${v.help}`)).toEqual([]);
}

/** Local calendar date (YYYY-MM-DD) a number of days from now. */
export function localDate(daysFromNow: number): string {
  const date = new Date(Date.now() + daysFromNow * DAY_MS);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Puts saved progress on the device, as if the student had used the app before. */
export async function seedProgress(page: Page, progress: object) {
  await page.goto('/');
  await page.evaluate(
    (value) => localStorage.setItem('ml-progress-v1', JSON.stringify(value)),
    progress,
  );
}
