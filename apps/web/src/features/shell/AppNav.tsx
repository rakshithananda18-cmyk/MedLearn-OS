'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { BookOpen, ClipboardCheck, House, Rotate3d, Target } from '@medlearn/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ponytail: five destinations; recall is reached from Today (its tile and its plan), and "Me"
// (profile and settings) arrives with phone sign-in.
const ITEMS: Array<{ href: string; label: string; icon: IconGlyph; also?: string[] }> = [
  { href: '/today', label: 'Today', icon: House, also: ['/revise'] },
  { href: '/subjects', label: 'Library', icon: BookOpen, also: ['/learn', '/books', '/search'] },
  { href: '/studio', label: '3D', icon: Rotate3d },
  { href: '/practice', label: 'Practice', icon: ClipboardCheck },
  { href: '/progress', label: 'Progress', icon: Target },
];

const within = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/**
 * Bottom tab bar on phones (thumb reach), with 3D raised in the middle; a side rail from tablet
 * width.
 */
export function AppNav() {
  const pathname = usePathname();

  // Nearly solid, so its labels stay readable over whatever scrolls behind it.
  return (
    <nav
      aria-label="Main"
      // Named so route transitions leave the navigation still.
      style={{ viewTransitionName: 'app-nav' }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-glass-border bg-surface/95 pb-safe backdrop-blur-md md:inset-y-0 md:right-auto md:w-20 md:border-t-0 md:border-r md:pb-0"
    >
      <ul className="mx-auto flex max-w-2xl md:h-full md:flex-col md:justify-center md:gap-2">
        {ITEMS.map(({ href, label, icon, also = [] }) => {
          const active = [href, ...also].some((path) => within(pathname, path));
          const featured = href === '/studio';
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
                    'flex items-center justify-center transition-colors duration-150',
                    featured
                      ? // The 3D studio stands out: a raised tile, lifted above the phone bar.
                        'size-12 rounded-lg bg-ink text-canvas shadow-float max-md:-mt-6'
                      : 'h-8 w-14 rounded-full',
                    !featured && active && 'bg-primary-subtle text-primary-strong',
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
