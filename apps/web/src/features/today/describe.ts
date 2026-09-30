import type { TodayItem } from '@medlearn/core';
import type { IconGlyph } from '@medlearn/ui';
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  PenLine,
  RefreshCw,
  RotateCcw,
} from '@medlearn/ui/icons';

/** Which spaced revisit it is, by the gap since the one before. */
const REVISIT_NAME = ['next-day', 'one-week', 'one-month'];

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
        href: '/revise',
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
        // Straight into that topic's questions; each item has its own address (and list key).
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
    case 'revisit':
      return {
        title: `Revisit: ${item.title}`,
        meta: `${item.minutes} min · ${REVISIT_NAME[item.step] ?? 'spaced'} revisit`,
        href: `/practice?revisit=${item.topicSlug}`,
        icon: RefreshCw,
        kind: 'Revisit',
        action: 'Start revisit',
      };
    case 'goal':
      return {
        title: `Revise: ${item.title}`,
        meta: `${item.minutes} min · for ${item.goalTitle}`,
        href: `/practice?goal=${item.goalId}&topic=${item.topicSlug}`,
        icon: CalendarDays,
        kind: 'Revise',
        action: 'Start revising',
      };
  }
}
