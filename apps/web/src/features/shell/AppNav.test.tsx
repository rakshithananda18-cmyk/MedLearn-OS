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
    expect(screen.getByRole('link', { name: 'Revise' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Progress' })).toHaveAttribute('href', '/progress');
    await expectNoA11yViolations(container);
  });

  it('keeps Subjects active inside a topic', () => {
    pathname.current = '/learn/brachial-plexus/lesson';
    render(<AppNav />);
    expect(screen.getByRole('link', { name: 'Subjects' })).toHaveAttribute('aria-current', 'page');
  });
});
