import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppNav } from './AppNav';

const pathname = vi.hoisted(() => ({ current: '/today' }));
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }));

describe('AppNav', () => {
  it('marks the current section for screen readers', async () => {
    pathname.current = '/today';
    const { container } = render(<AppNav />);
    expect(screen.getByRole('link', { name: 'Today' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Practice' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: '3D' })).toHaveAttribute('href', '/studio');
    // Progress lives in the library now.
    expect(screen.queryByRole('link', { name: 'Progress' })).not.toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it('keeps Library active inside a topic, and Today while recalling cards', () => {
    pathname.current = '/learn/brachial-plexus/lesson';
    const { unmount } = render(<AppNav />);
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('aria-current', 'page');
    unmount();
    pathname.current = '/progress';
    const again = render(<AppNav />);
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('aria-current', 'page');
    again.unmount();
    pathname.current = '/revise';
    render(<AppNav />);
    expect(screen.getByRole('link', { name: 'Today' })).toHaveAttribute('aria-current', 'page');
  });
});
