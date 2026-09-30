'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { BookOpen, Box, ClipboardCheck, House } from '@medlearn/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ponytail: four destinations; recall is reached from Today (its tile and its plan), progress
// lives in the library, and "Me" (profile and settings) arrives with phone sign-in.
const ITEMS: Array<{ href: string; label: string; icon: IconGlyph; also?: string[] }> = [
  { href: '/today', label: 'Today', icon: House, also: ['/revise'] },
  {
    href: '/subjects',
    label: 'Library',
    icon: BookOpen,
    also: ['/learn', '/books', '/search', '/progress'],
  },
  { href: '/studio', label: '3D', icon: Box },
  { href: '/practice', label: 'Practice', icon: ClipboardCheck },
];

const within = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/**
 * Bottom tab bar on phones (thumb reach); from tablet width, a floating glass rail with the gold
 * mark at the top and the sections centred down its height. Every section looks the same, the current one in
 * a tinted pill.
 */
export function AppNav() {
  const pathname = usePathname();

  // Nearly solid on phones, so its labels stay readable over whatever scrolls behind it; from
  // tablet width a rounded glass panel floating beside the page, like the cards.
  return (
    <nav
      aria-label="Main"
      // Named so route transitions leave the navigation still.
      style={{ viewTransitionName: 'app-nav' }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-glass-border bg-surface/95 pb-safe backdrop-blur-md md:inset-y-3 md:left-3 md:right-auto md:flex md:w-20 md:flex-col md:items-center md:gap-6 md:rounded-xl md:border md:bg-glass md:pt-6 md:pb-12 md:shadow-glass short:gap-0 short:pt-2 short:pb-2"
    >
      <span
        aria-hidden="true"
        className="text-gold hidden font-display text-3xl md:block short:hidden"
      >
        M
      </span>
      <ul className="mx-auto flex max-w-2xl md:my-auto md:w-full md:flex-col md:gap-2 md:px-2">
        {ITEMS.map(({ href, label, icon, also = [] }) => {
          const active = [href, ...also].some((path) => within(pathname, path));
          return (
            <li key={href} className="flex-1 md:flex-none">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors duration-150 md:rounded-lg md:py-2 short:min-h-12 short:py-1',
                  active
                    ? 'font-semibold text-primary-strong md:bg-primary-subtle'
                    : 'text-fg-muted hover:text-fg',
                )}
              >
                <Icon icon={icon} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
