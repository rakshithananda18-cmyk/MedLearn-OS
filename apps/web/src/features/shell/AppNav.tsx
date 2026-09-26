'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { BookOpen, ClipboardCheck, House, RotateCcw } from '@medlearn/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ponytail: four destinations for now; "Me" (profile) arrives with accounts in M4.
const ITEMS: Array<{ href: string; label: string; icon: IconGlyph }> = [
  { href: '/today', label: 'Today', icon: House },
  { href: '/subjects', label: 'Subjects', icon: BookOpen },
  { href: '/practice', label: 'Practice', icon: ClipboardCheck },
  { href: '/revise', label: 'Revise', icon: RotateCcw },
];

/** Bottom tab bar on phones (thumb reach); a side rail from tablet width. */
export function AppNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === '/subjects' && pathname.startsWith('/learn'));

  return (
    <nav
      aria-label="Main"
      // Named so route transitions leave the navigation still.
      style={{ viewTransitionName: 'app-nav' }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-glass-border bg-glass pb-safe backdrop-blur-md md:inset-y-0 md:right-auto md:w-20 md:border-t-0 md:border-r md:pb-0"
    >
      <ul className="mx-auto flex max-w-2xl md:h-full md:flex-col md:justify-center md:gap-2">
        {ITEMS.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1 md:flex-none">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors duration-150',
                  active ? 'font-semibold text-ink' : 'text-fg-muted hover:text-fg',
                )}
              >
                <span
                  className={cx(
                    'flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-150',
                    active && 'bg-primary-subtle text-primary-strong',
                  )}
                >
                  <Icon icon={icon} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
