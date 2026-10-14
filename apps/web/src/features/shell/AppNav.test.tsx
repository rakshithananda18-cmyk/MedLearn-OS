import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { resetProgress, saveProfile } from '@/features/progress/store';

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

  it("leads to the student's profile from their initials", () => {
    pathname.current = '/profile';
    act(() =>
      saveProfile({
        year: 1,
        examDate: null,
        dailyMinutes: 20,
        adult: false,
        name: 'Rakshith Ananda',
      }),
    );
    render(<AppNav />);
    // The rail's mark from tablet width, the last tab on phones.
    const links = screen.getAllByRole('link', { name: /profile/i });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/profile');
      expect(link).toHaveAttribute('aria-current', 'page');
    }
    expect(screen.getAllByText('RA')).toHaveLength(2);
    act(() => resetProgress());
  });
});
