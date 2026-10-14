import type { TopicMastery } from '@medlearn/core';
import { Icon, type IconGlyph, Pill } from '@medlearn/ui';
import { ChevronRight, RotateCcw, Target } from '@medlearn/ui/icons';
import Link from 'next/link';
import type { ReactNode } from 'react';

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

/** A pill that leads to Revise. */
function ReviseLink({ icon, children }: Readonly<{ icon: IconGlyph; children: ReactNode }>) {
  return (
    <Link
      href="/revise"
      className="inline-flex h-8 items-center gap-2 rounded-full border border-glass-border bg-glass px-3 text-sm font-semibold text-ink shadow-glass transition-colors duration-150 hover:border-gold"
    >
      <Icon icon={icon} size="sm" className="text-gold-ink" />
      {children}
      <Icon icon={ChevronRight} size="sm" className="text-fg-muted" />
    </Link>
  );
}

/**
 * What to revise, beside the subjects: the reviews due and the weak spots (missed questions still
 * to recall), each leading to Revise. How each topic is going sits on its own row and preview.
 */
export function ProgressStrip({ mastery }: Readonly<{ mastery: TopicMastery[] }>) {
  const due = mastery.reduce((total, item) => total + item.dueCards, 0);
  const weak = mastery.reduce((total, item) => total + item.weakSpots, 0);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {due > 0 ? (
        <ReviseLink icon={RotateCcw}>{plural(due, 'review')} due</ReviseLink>
      ) : (
        <Pill icon={RotateCcw}>No reviews due</Pill>
      )}
      {weak > 0 ? <ReviseLink icon={Target}>{plural(weak, 'weak spot')}</ReviseLink> : null}
    </div>
  );
}
