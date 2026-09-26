'use client';

import { useId, useSyncExternalStore } from 'react';

import { Icon, type IconGlyph } from './Icon';
import { Monitor, Moon, Sun } from './icons';
import {
  applyThemePreference,
  DEFAULT_THEME_PREFERENCE,
  readThemePreference,
  subscribeToThemePreference,
  type ThemePreference,
} from './theme';

const OPTIONS: Array<{ value: ThemePreference; label: string; icon: IconGlyph }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

// The server cannot see the stored choice, so it renders the default; the client then syncs.
const serverSnapshot = (): ThemePreference => DEFAULT_THEME_PREFERENCE;

/**
 * Light / Dark / System choice, stored on this device. Native radio buttons: arrow keys and screen
 * readers work without script, and nothing has to run when the page loads (a scripted radio group
 * cost a slow phone over 100 ms on the landing page).
 */
export function ThemeToggle() {
  const name = useId();
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    readThemePreference,
    serverSnapshot,
  );

  return (
    <fieldset className="inline-flex gap-1 rounded-md bg-surface-muted p-1">
      <legend className="sr-only">Theme</legend>
      {OPTIONS.map(({ value, label, icon }) => (
        <label
          key={value}
          className="relative inline-flex h-8 cursor-pointer items-center gap-2 rounded-sm px-3 text-sm text-fg-muted transition-colors duration-150 has-checked:bg-surface has-checked:text-fg has-checked:shadow-raised has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
        >
          <input
            type="radio"
            name={name}
            value={value}
            checked={preference === value}
            onChange={() => applyThemePreference(value)}
            className="sr-only"
          />
          <Icon icon={icon} size="sm" />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
