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

/** How long a loaded set of outcomes is trusted before it is asked for again. */
export const STATUS_TTL_MS = 60_000;

/**
 * Checks the fields this page reads, by hand: the schema library is heavy to start on a phone and
 * held up the lesson page (total blocking time 267 ms against a budget of 200).
 */
function isStatus(value: unknown): value is ReviewStatus {
  const status = value as Partial<ReviewStatus> | null;
  return (
    typeof status?.topicSlug === 'string' &&
    typeof status.contentVersion === 'string' &&
    (status.decision === 'approved' || status.decision === 'changes-requested')
  );
}

let statuses: Promise<Map<string, ReviewStatus>> | null = null;
let loadedAt = 0;

/**
 * Every topic's latest outcome from the server, shared by everything on the page and asked for
 * again once it is a minute old (or after forgetStatuses), so an app left open catches up with
 * new decisions. Offline or without a database it is empty, and the bundled flag stands.
 */
export function loadStatuses(now = Date.now()): Promise<Map<string, ReviewStatus>> {
  if (statuses && now - loadedAt < STATUS_TTL_MS) return statuses;
  loadedAt = now;
  statuses = fetch('/api/reviews')
    .then((response) => (response.ok ? response.json() : null))
    .then((body: { data?: { statuses?: unknown } } | null) => {
      const list = body?.data?.statuses;
      return new Map(
        (Array.isArray(list)
          ? list.filter((item): item is ReviewStatus => isStatus(item))
          : []
        ).map((status) => [status.topicSlug, status]),
      );
    })
    .catch(() => new Map<string, ReviewStatus>());
  return statuses;
}

/** Forgets what was loaded, so the next look asks the server (after a decision, and in tests). */
export function forgetStatuses() {
  statuses = null;
  loadedAt = 0;
}
