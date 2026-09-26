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

/** Bottom tab bar on phones (thumb reach); a top bar from tablet width. */
export function AppNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === '/subjects' && pathname.startsWith('/learn'));

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface md:static md:border-t-0 md:border-b"
    >
      <ul className="mx-auto flex max-w-2xl">
        {ITEMS.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'flex min-h-12 flex-col items-center justify-center gap-1 py-2 text-xs md:flex-row md:gap-2 md:text-sm',
                  active ? 'font-semibold text-primary-strong' : 'text-fg-muted hover:text-fg',
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
