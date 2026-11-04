import { Icon, type IconGlyph, Medallion } from '@medlearn/ui';
import { ChevronRight } from '@medlearn/ui/icons';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

export interface LinkCardProps {
  href: string;
  icon: IconGlyph;
  title: string;
  meta: string;
  description?: ReactNode;
  /** Carries the delay for staggered entrances in lists. */
  style?: CSSProperties | undefined;
}

/** A tappable glass card that opens a step, a mode or a topic. */
export function LinkCard({ href, icon, title, meta, description, style }: LinkCardProps) {
  return (
    <Link
      href={href}
      style={style}
      className="group flex min-w-0 flex-1 animate-rise items-center gap-4 rounded-xl border border-glass-border bg-glass p-4 shadow-glass transition-colors duration-150 hover:border-gold"
    >
      <Medallion icon={icon} />
      <span className="flex min-w-0 flex-1 flex-col gap-1 wrap-break-word">
        <span className="font-semibold text-ink">{title}</span>
        <span className="text-sm text-fg-muted">{meta}</span>
        {description ? <span className="text-sm text-fg-muted">{description}</span> : null}
      </span>
      <Icon
        icon={ChevronRight}
        className="text-fg-muted transition-transform duration-150 group-hover:translate-x-1"
      />
    </Link>
  );
}
