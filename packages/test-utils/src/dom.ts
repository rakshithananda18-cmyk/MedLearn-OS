import axe from 'axe-core';
import { expect } from 'vitest';

/** Fails the test with a readable list when axe finds serious or critical violations. */
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const { violations } = await axe.run(container, {
    // Colour contrast needs real layout and styles, which jsdom does not compute; E2E covers it.
    rules: { 'color-contrast': { enabled: false } },
  });
  const blocking = violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
}
