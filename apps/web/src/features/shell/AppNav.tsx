'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { BookOpen, Box, ChartLine, ClipboardCheck, House } from '@medlearn/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ponytail: five destinations; recall is reached from Today (its tile and its plan), and "Me"
// (profile and settings) arrives with phone sign-in.
const ITEMS: Array<{ href: string; label: string; icon: IconGlyph; also?: string[] }> = [
  { href: '/today', label: 'Today', icon: House, also: ['/revise'] },
  { href: '/subjects', label: 'Library', icon: BookOpen, also: ['/learn', '/books', '/search'] },
  { href: '/studio', label: '3D', icon: Box },
  { href: '/practice', label: 'Practice', icon: ClipboardCheck },
  { href: '/progress', label: 'Progress', icon: ChartLine },
];

/** An item not showing: muted, except the 3D tile's label, which stays ink like its tile. */
const tone = (featured: boolean) => (featured ? 'text-ink' : 'text-fg-muted hover:text-fg');

const within = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/**
 * Bottom tab bar on phones (thumb reach), with 3D raised in the middle; from tablet width, a side
 * rail under the gold mark, the current section in a tinted pill.
 */
export function AppNav() {
  const pathname = usePathname();

  // Nearly solid, so its labels stay readable over whatever scrolls behind it.
  return (
    <nav
      aria-label="Main"
      // Named so route transitions leave the navigation still.
      style={{ viewTransitionName: 'app-nav' }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-glass-border bg-surface/95 pb-safe backdrop-blur-md md:inset-y-0 md:right-auto md:flex md:w-20 md:flex-col md:items-center md:gap-6 md:border-t-0 md:border-r md:pt-8 md:pb-0 short:gap-0 short:pt-2"
    >
      <span
        aria-hidden="true"
        className="text-gold hidden font-display text-3xl md:block short:hidden"
      >
        M
      </span>
      <ul className="mx-auto flex max-w-2xl md:w-full md:flex-col md:gap-2 md:px-2">
        {ITEMS.map(({ href, label, icon, also = [] }) => {
          const active = [href, ...also].some((path) => within(pathname, path));
          const featured = href === '/studio';
          return (
            <li key={href} className="flex-1 md:flex-none">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors duration-150 md:rounded-lg md:py-2 short:min-h-12 short:py-1',
                  active && !featured
                    ? 'font-semibold text-primary-strong md:bg-primary-subtle'
                    : tone(featured),
                  active && featured && 'font-semibold',
                )}
              >
                {featured ? (
                  // The 3D studio stands out: a raised ink tile with a gold cube, lifted above
                  // the phone bar.
                  <span className="flex size-12 items-center justify-center rounded-lg bg-ink shadow-float max-md:-mt-6 dark:bg-gold">
                    <Icon icon={icon} className="stroke-gold dark:stroke-canvas" />
                  </span>
                ) : (
                  <Icon icon={icon} />
                )}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
