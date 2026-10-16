import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

for (const viewport of [
  { width: 360, height: 640 },
  { width: 640, height: 360 },
]) {
  test(`Studio tools remain reachable at ${viewport.width}×${viewport.height}`, async ({
    page,
  }) => {
    test.slow();
    await page.setViewportSize(viewport);
    await page.goto('/studio?topic=knee-joint');
    const toolbar = page.getByRole('toolbar', { name: 'View' });
    const settings = toolbar.getByRole('button', { name: 'Settings', exact: true });
    // When the column overflows, a labelled cue says so and brings the rest into view.
    const more = toolbar.getByRole('button', { name: 'More tools' });
    if (await more.isVisible()) {
      await more.click();
      await expect(more).toHaveCount(0);
    }
    await settings.scrollIntoViewIfNeeded();
    await expect(settings).toBeInViewport();
    const target = await settings.boundingBox();
    expect(target?.width).toBeGreaterThanOrEqual(48);
    expect(target?.height).toBeGreaterThanOrEqual(48);
    await settings.click();
    const dialog = page.getByRole('dialog', { name: 'Settings', exact: true });
    await expect(dialog).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(settings).toBeFocused();
  });
}

test('Library lesson actions fit a narrow phone and grow with larger text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.addInitScript(() => {
    localStorage.setItem(
      'ml-progress-v1',
      JSON.stringify({ completedLessons: ['brachial-plexus'] }),
    );
  });
  await page.goto('/subjects?topic=brachial-plexus');
  const preview = page.getByRole('dialog', { name: 'Brachial plexus', exact: true });
  const lesson = preview.getByRole('link', { name: 'Go over the lesson' });
  await expect(lesson).toBeVisible();
  await expect(lesson).toHaveAttribute('href', '/learn/brachial-plexus/lesson');
  for (const scale of ['100%', '200%']) {
    await page.locator('html').evaluate((element, size) => {
      element.style.fontSize = size;
    }, scale);
    await lesson.scrollIntoViewIfNeeded();
    expect(await lesson.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
      true,
    );
    const box = await lesson.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(320);
  }
});
