import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { THEME_STORAGE_KEY } from './theme';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('starts on Light, the primary theme, when nothing is stored', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('radio', { name: 'Light' })).toBeChecked();
  });

  it('shows the stored choice', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(<ThemeToggle />);
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
  });

  it('applies and remembers a new choice', async () => {
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('radio', { name: 'Dark' }));

    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ThemeToggle />);
    await expectNoA11yViolations(container);
  });
});
