import { getTopic } from './topics';

type QueryValue = string | string[] | undefined;

/** Undefined means all topics; invalid filters must never silently widen the session. */
export function studyTopic(raw: QueryValue) {
  if (raw === undefined) return undefined;
  return typeof raw === 'string' ? (getTopic(raw) ?? null) : null;
}

/** A Today session is bounded; malformed limits use the ordinary review queue. */
export function reviewLimit(raw: QueryValue): number | undefined {
  if (typeof raw !== 'string' || !/^[1-9]\d{0,2}$/.test(raw)) return undefined;
  return Number(raw);
}
