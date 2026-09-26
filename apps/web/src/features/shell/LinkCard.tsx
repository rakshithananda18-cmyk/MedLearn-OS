import { Icon, type IconGlyph, Medallion } from '@medlearn/ui';
import { ChevronRight } from '@medlearn/ui/icons';
import Link from 'next/link';
import type { CSSProperties } from 'react';

export interface LinkCardProps {
  href: string;
  icon: IconGlyph;
  title: string;
  meta: string;
  /** Carries the delay for staggered entrances in lists. */
  style?: CSSProperties | undefined;
}

/** A tappable glass card that opens a step, a mode or a topic. */
export function LinkCard({ href, icon, title, meta, style }: LinkCardProps) {
  return (
    <Link
      href={href}
      style={style}
      className="group flex animate-rise items-center gap-4 rounded-xl border border-glass-border bg-glass p-4 shadow-glass transition-colors duration-150 hover:border-gold"
    >
      <Medallion icon={icon} />
      <span className="flex flex-1 flex-col">
        <span className="font-semibold text-ink">{title}</span>
        <span className="text-sm text-fg-muted">{meta}</span>
      </span>
      <Icon
        icon={ChevronRight}
        className="text-fg-muted transition-transform duration-150 group-hover:translate-x-1"
      />
    </Link>
  );
}
