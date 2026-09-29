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
  /** The button that starts it. */
  action: string;
} {
  switch (item.kind) {
    case 'review':
      return {
        title: `Review ${item.count} ${item.count === 1 ? 'card' : 'cards'}`,
        meta: `${item.minutes} min · spaced recall`,
        href: `/revise?limit=${item.count}`,
        icon: RotateCcw,
        kind: 'Recall',
        action: 'Start recall',
      };
    case 'learn':
      return {
        title: `Learn: ${item.title}`,
        meta: `${item.minutes} min · visual lesson`,
        href: `/learn/${item.topicSlug}`,
        icon: BookOpen,
        kind: 'Learn',
        action: 'Start lesson',
      };
    case 'practice':
      return {
        title: `Practice: ${item.title}`,
        meta: `${item.count} ${item.count === 1 ? 'question' : 'questions'} · ${item.minutes} min`,
        href: `/practice?topic=${item.topicSlug}`,
        icon: ClipboardCheck,
        kind: 'Practice',
        action: 'Start practice',
      };
    case 'drill':
      return {
        title: `Draw: ${item.title}`,
        meta: `${item.minutes} min · exam diagram`,
        href: `/learn/${item.topicSlug}/draw`,
        icon: PenLine,
        kind: 'Draw',
        action: 'Start drawing',
      };
  }
}
