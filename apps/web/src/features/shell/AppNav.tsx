'use client';

import { cx, Icon, type IconGlyph } from '@medlearn/ui';
import { BookOpen, Box, ClipboardCheck, House } from '@medlearn/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/features/profile/Avatar';
import { useProgress } from '@/features/progress/store';

// ponytail: four destinations; recall is reached from Today (its tile and its plan), progress
// lives in the library, and the profile is the student's own mark at the top of the rail.
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

const PROFILE = '/profile';
const TAB =
  'flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors duration-150 md:rounded-lg md:py-2 short:min-h-12 short:py-1';
const tabState = (active: boolean) =>
  active ? 'font-semibold text-primary-strong md:bg-primary-subtle' : 'text-fg-muted hover:text-fg';

/**
 * Bottom tab bar on phones (thumb reach), the student's profile last; from tablet width, a
 * floating glass rail with the student's initials at the top (their profile) and the sections
 * centred down its height. Every section looks the same, the current one in a tinted pill.
 */
export function AppNav() {
  const pathname = usePathname();
  const name = useProgress().profile?.name;
  const onProfile = within(pathname, PROFILE) || within(pathname, '/account');

  // Nearly solid on phones, so its labels stay readable over whatever scrolls behind it; from
  // tablet width a rounded glass panel floating beside the page, like the cards.
  return (
    <nav
      aria-label="Main"
      // Named so route transitions leave the navigation still.
      style={{ viewTransitionName: 'app-nav' }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-glass-border bg-surface/95 pb-safe backdrop-blur-md md:inset-y-3 md:left-3 md:right-auto md:flex md:w-20 md:flex-col md:items-center md:gap-6 md:rounded-xl md:border md:bg-glass md:pt-6 md:pb-12 md:shadow-glass short:gap-0 short:pt-2 short:pb-2"
    >
      <Link
        href={PROFILE}
        aria-label="Your profile"
        aria-current={onProfile ? 'page' : undefined}
        title="Your profile"
        className={cx(
          'hidden rounded-full transition-transform duration-150 hover:-translate-y-px md:block',
          onProfile && 'ring-2 ring-primary ring-offset-2 ring-offset-surface',
        )}
      >
        <Avatar name={name} />
      </Link>
      <ul className="mx-auto flex max-w-2xl md:my-auto md:w-full md:flex-col md:gap-2 md:px-2">
        {ITEMS.map(({ href, label, icon, also = [] }) => {
          const active = [href, ...also].some((path) => within(pathname, path));
          return (
            <li key={href} className="flex-1 md:flex-none">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cx(TAB, tabState(active))}
              >
                <Icon icon={icon} />
                {label}
              </Link>
            </li>
          );
        })}
        {/* Phones have no rail top: the profile is the last tab. */}
        <li className="flex-1 md:hidden">
          <Link
            href={PROFILE}
            aria-current={onProfile ? 'page' : undefined}
            className={cx(TAB, tabState(onProfile))}
          >
            <Avatar name={name} size="sm" />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
