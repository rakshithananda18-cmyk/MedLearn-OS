export const REQUEST_ID_HEADER = 'x-request-id';

const WELL_FORMED = /^[A-Za-z0-9-]{8,64}$/;

/** Reuses a well-formed incoming id (e.g. set by `proxy.ts`); otherwise creates a new one. */
export function resolveRequestId(incoming: string | null | undefined): string {
  return incoming && WELL_FORMED.test(incoming) ? incoming : crypto.randomUUID();
}
