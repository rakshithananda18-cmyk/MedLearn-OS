import type * as Schemas from '@medlearn/schemas';
import type { ReviewStatus } from '@medlearn/schemas';
import type { BadgeTone } from '@medlearn/ui';

/** Where a topic stands with the review team. */
export type ReviewState = 'not-reviewed' | 'approved' | 'changes-requested' | 'needs-recheck';

/** How each state is labelled for the review team. */
export const STATE: Record<ReviewState, { label: string; tone: BadgeTone }> = {
  'not-reviewed': { label: 'Not reviewed', tone: 'neutral' },
  'needs-recheck': { label: 'Changed, check again', tone: 'warning' },
  'changes-requested': { label: 'Changes asked for', tone: 'danger' },
  approved: { label: 'Approved', tone: 'success' },
};

/**
 * A topic's state from its latest review: a decision counts only for the version students see
 * now, so changing the content after an approval sends it back for a fresh check.
 */
export function reviewState(version: string, latest: ReviewStatus | undefined): ReviewState {
  if (!latest) return 'not-reviewed';
  if (latest.contentVersion !== version) return 'needs-recheck';
  return latest.decision === 'approved' ? 'approved' : 'changes-requested';
}

let statuses: Promise<Map<string, ReviewStatus>> | null = null;

/**
 * Every topic's latest outcome, asked of the server once per page load (and refreshed on the
 * next). Offline or without a database it is empty, and the bundled flag stands.
 */
export function loadStatuses(): Promise<Map<string, ReviewStatus>> {
  statuses ??= Promise.all([
    fetch('/api/reviews').then((response) => (response.ok ? response.json() : null)),
    // Loaded here rather than with the page, so the schema library is not in every download.
    import('@medlearn/schemas'),
  ])
    .then(([body, schemas]: [unknown, typeof Schemas]) => {
      const list = schemas.ReviewStatus.array().safeParse(
        (body as { data?: { statuses?: unknown } } | null)?.data?.statuses,
      );
      return new Map((list.success ? list.data : []).map((status) => [status.topicSlug, status]));
    })
    .catch(() => new Map<string, ReviewStatus>());
  return statuses;
}

/** For tests: forget what was loaded. */
export function forgetStatuses() {
  statuses = null;
}
