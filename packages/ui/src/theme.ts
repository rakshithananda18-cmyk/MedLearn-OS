export type ThemePreference = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ml-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): Theme {
  if (preference === 'system') return systemPrefersDark ? 'dark' : 'light';
  return preference;
}

export function readThemePreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

const listeners = new Set<() => void>();

/** Subscribes to preference changes from this tab and from other tabs (the storage event). */
export function subscribeToThemePreference(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

/** Stores the preference, applies it to <html data-theme> and notifies subscribers. */
export function applyThemePreference(preference: ThemePreference): Theme {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Private browsing can block storage; the theme still applies for this page.
  }
  const theme = resolveTheme(preference, matchMedia(DARK_QUERY).matches);
  document.documentElement.dataset.theme = theme;
  for (const listener of listeners) listener();
  return theme;
}

/**
 * Inline script for <head>: sets data-theme before first paint (no flash of the wrong theme)
 * and follows the system setting while the preference is "system".
 */
export const themeScript = `(function () {
  var key = '${THEME_STORAGE_KEY}';
  var media = matchMedia('${DARK_QUERY}');
  function apply() {
    var preference = 'system';
    try { preference = localStorage.getItem(key) || 'system'; } catch (e) {}
    var dark = preference === 'dark' || (preference !== 'light' && media.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }
  apply();
  media.addEventListener('change', apply);
})();`;
