import type { TodayItem } from '@medlearn/core';
import type { IconGlyph } from '@medlearn/ui';
import { BookOpen, ClipboardCheck, PenLine, RotateCcw } from '@medlearn/ui/icons';

/** What a plan item says and where it leads. */
export function describe(item: TodayItem): {
  title: string;
  meta: string;
  href: string;
  icon: IconGlyph;
  /** Short name of the kind of study, for labels such as "Up next · Learn". */
  kind: string;
} {
  switch (item.kind) {
    case 'review':
      return {
        title: `Review ${item.count} ${item.count === 1 ? 'card' : 'cards'}`,
        meta: `${item.minutes} min · spaced recall`,
        href: '/revise',
        icon: RotateCcw,
        kind: 'Recall',
      };
    case 'learn':
      return {
        title: `Learn: ${item.title}`,
        meta: `${item.minutes} min · visual lesson`,
        href: `/learn/${item.topicSlug}`,
        icon: BookOpen,
        kind: 'Learn',
      };
    case 'practice':
      return {
        title: `Practice: ${item.title}`,
        meta: `${item.count} ${item.count === 1 ? 'question' : 'questions'} · ${item.minutes} min`,
        href: '/practice',
        icon: ClipboardCheck,
        kind: 'Practice',
      };
    case 'drill':
      return {
        title: `Draw: ${item.title}`,
        meta: `${item.minutes} min · exam diagram`,
        href: `/learn/${item.topicSlug}/draw`,
        icon: PenLine,
        kind: 'Draw',
      };
  }
}
