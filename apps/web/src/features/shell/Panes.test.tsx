import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { Panes } from './Panes';

afterEach(() => localStorage.clear());

describe('Panes', () => {
  it('folds the side panel away and back, and remembers it for the page', async () => {
    const { unmount } = render(
      <Panes id="test" label="Your progress" main={<p>Main work</p>} aside={<p>Streak</p>} />,
    );
    const panel = screen.getByRole('complementary', { name: 'Your progress' });
    expect(screen.getByText('Streak')).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Hide your progress' }));
    expect(screen.getByText('Streak')).not.toBeVisible();
    expect(screen.getByText('Main work')).toBeVisible();
    expect(panel).toContainElement(screen.getByRole('button', { name: 'Show your progress' }));
    expect(localStorage.getItem('ml-panel-test')).toBe('folded');
    unmount();

    // The page opens as it was left; the panel's title unfolds it again on phones.
    render(<Panes id="test" label="Your progress" main={<p>Main work</p>} aside={<p>Streak</p>} />);
    expect(screen.getByText('Streak')).not.toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Your progress' }));
    expect(screen.getByText('Streak')).toBeVisible();
  });
});
