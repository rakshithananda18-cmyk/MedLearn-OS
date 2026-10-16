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
export function reviewState(
  version: string,
  latest: ReviewStatus | undefined,
  digest?: string,
): ReviewState {
  if (!latest) return 'not-reviewed';
  if (
    latest.contentVersion !== version ||
    !latest.contentDigest ||
    (digest ? latest.contentDigest !== digest : latest.currentContent !== true)
  )
    return 'needs-recheck';
  return latest.decision === 'approved' ? 'approved' : 'changes-requested';
}

export const STATUS_TTL_MS = 30_000;

/** Validate this small public response without starting the schema library on every lesson. */
function isStatus(value: unknown): value is ReviewStatus {
  if (!value || typeof value !== 'object') return false;
  const status = value as Partial<ReviewStatus>;
  return (
    typeof status.topicSlug === 'string' &&
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(status.topicSlug) &&
    typeof status.contentVersion === 'string' &&
    /^\d+\.\d+\.\d+$/.test(status.contentVersion) &&
    (status.contentDigest === null ||
      (typeof status.contentDigest === 'string' && /^[a-f0-9]{64}$/.test(status.contentDigest))) &&
    (status.currentContent === undefined || typeof status.currentContent === 'boolean') &&
    (status.decision === 'approved' || status.decision === 'changes-requested') &&
    typeof status.decidedAt === 'string'
  );
}
let cache = new Map<string, ReviewStatus>();
let expiresAt = 0;
let pending: Promise<Map<string, ReviewStatus>> | null = null;
let generation = 0;
const listeners = new Set<(statuses: Map<string, ReviewStatus>) => void>();

export function subscribeStatuses(listener: (statuses: Map<string, ReviewStatus>) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function publish(statuses: Map<string, ReviewStatus>) {
  cache = statuses;
  for (const listener of listeners) listener(cache);
}

/**
 * Short-lived status cache shared by screens. Failures remove approvals and are never cached.
 */
export function loadStatuses(force = false): Promise<Map<string, ReviewStatus>> {
  if (pending) return pending;
  if (!force && Date.now() < expiresAt) return Promise.resolve(cache);
  const requestGeneration = generation;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  pending = fetch('/api/reviews', { cache: 'no-store', signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error('Review status unavailable');
      return response.json();
    })
    .then((body: unknown) => {
      const list = (body as { data?: { statuses?: unknown } } | null)?.data?.statuses;
      if (!Array.isArray(list) || !list.every(isStatus)) throw new Error('Invalid review status');
      const statuses = new Map(list.map((status) => [status.topicSlug, status]));
      if (generation === requestGeneration) {
        expiresAt = Date.now() + STATUS_TTL_MS;
        publish(statuses);
      }
      return generation === requestGeneration ? statuses : cache;
    })
    .catch(() => {
      // An unreachable service cannot confirm a medical decision. Retry the next request rather
      // than permanently remembering the failure or retaining an old approval.
      const empty = new Map<string, ReviewStatus>();
      if (generation === requestGeneration) {
        expiresAt = 0;
        publish(empty);
      }
      return empty;
    })
    .finally(() => {
      clearTimeout(timeout);
      if (generation === requestGeneration) pending = null;
    });
  return pending;
}

/** Drop a saved decision immediately, including any older request still in flight. */
export function invalidateStatuses() {
  forgetStatuses();
  publish(new Map());
  void loadStatuses(true);
}

/** For tests and invalidation: forget what was loaded. */
export function forgetStatuses() {
  generation += 1;
  pending = null;
  expiresAt = 0;
  cache = new Map();
}
