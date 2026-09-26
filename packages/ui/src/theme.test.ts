// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

import { isThemePreference, resolveTheme, THEME_STORAGE_KEY, themeScript } from './theme';

describe('resolveTheme', () => {
  it.each([
    ['light', false, 'light'],
    ['light', true, 'light'],
    ['dark', false, 'dark'],
    ['system', false, 'light'],
    ['system', true, 'dark'],
  ] as const)('%s with system dark=%s resolves to %s', (preference, systemDark, expected) => {
    expect(resolveTheme(preference, systemDark)).toBe(expected);
  });
});

describe('isThemePreference', () => {
  it('accepts only the three choices', () => {
    expect(isThemePreference('dark')).toBe(true);
    expect(isThemePreference('sepia')).toBe(false);
    expect(isThemePreference(null)).toBe(false);
  });
});

describe('themeScript', () => {
  const runScript = (systemDark: boolean) => {
    const media = { matches: systemDark, addEventListener: vi.fn() };
    const matchMedia = vi.fn(() => media);
    new Function('matchMedia', 'localStorage', 'document', themeScript)(
      matchMedia,
      globalThis.localStorage,
      document,
    );
    return media;
  };

  afterEach(() => localStorage.clear());

  it('starts in light when no choice is stored, even if the system is dark', () => {
    runScript(true);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('follows the system setting once "System" is chosen', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'system');
    runScript(true);
    expect(document.documentElement.dataset.theme).toBe('dark');
    runScript(false);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('prefers the stored choice over the system setting', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    runScript(true);
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('keeps listening for system changes', () => {
    const media = runScript(false);
    expect(media.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
