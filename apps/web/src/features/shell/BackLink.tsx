import { cx, Icon } from '@medlearn/ui';
import { ArrowLeft } from '@medlearn/ui/icons';
import Link from 'next/link';

/**
 * The way back up to where a page was opened from: a round arrow, with the place named beside
 * it when there is room for words.
 */
export function BackLink({
  href,
  label,
  text,
  className,
}: Readonly<{
  href: string;
  /** What screen readers hear, such as "Back to the topic". */
  label: string;
  /** Visible words beside the arrow, such as "Library". */
  text?: string;
  className?: string;
}>) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cx(
        'flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface text-sm font-semibold text-ink shadow-glass transition-colors duration-150 hover:bg-surface-muted',
        text ? 'self-start pr-4 pl-3' : 'w-12',
        className,
      )}
    >
      <Icon icon={ArrowLeft} />
      {text}
    </Link>
  );
}
