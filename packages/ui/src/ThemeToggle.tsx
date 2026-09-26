'use client';

import { RadioGroup } from 'radix-ui';
import { useSyncExternalStore } from 'react';

import { Icon, type IconGlyph } from './Icon';
import { Monitor, Moon, Sun } from './icons';
import {
  applyThemePreference,
  DEFAULT_THEME_PREFERENCE,
  isThemePreference,
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

/** Light / Dark / System choice, stored on this device. */
export function ThemeToggle() {
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    readThemePreference,
    serverSnapshot,
  );

  return (
    <RadioGroup.Root
      aria-label="Theme"
      value={preference}
      onValueChange={(value) => {
        if (isThemePreference(value)) applyThemePreference(value);
      }}
      orientation="horizontal"
      className="inline-flex gap-1 rounded-md bg-surface-muted p-1"
    >
      {OPTIONS.map(({ value, label, icon }) => (
        <RadioGroup.Item
          key={value}
          value={value}
          className="inline-flex h-8 items-center gap-2 rounded-sm px-3 text-sm text-fg-muted transition-colors duration-150 aria-checked:bg-surface aria-checked:text-fg aria-checked:shadow-raised"
        >
          <Icon icon={icon} size="sm" />
          {label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
