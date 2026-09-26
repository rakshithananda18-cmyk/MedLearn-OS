export const REDACTED = '[redacted]';

/** Keys whose values never reach the logs (matched case-insensitively, at any depth). */
export const SENSITIVE_KEYS = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'otp',
  'email',
  'phone',
  'name',
  'fullName',
  'displayName',
  'authorization',
  'cookie',
] as const;

const SENSITIVE = new Set(SENSITIVE_KEYS.map((key) => key.toLowerCase()));
const MAX_DEPTH = 6;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function redactValue(value: unknown, depth: number): unknown {
  if (depth > MAX_DEPTH) return value;
  if (Array.isArray(value)) return value.map((item) => redactValue(item, depth + 1));
  if (!isPlainObject(value)) return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, inner]) => [
      key,
      SENSITIVE.has(key.toLowerCase()) ? REDACTED : redactValue(inner, depth + 1),
    ]),
  );
}

/** Returns a copy of `object` with sensitive values replaced. Errors and class instances are kept. */
export function redact(object: Record<string, unknown>): Record<string, unknown> {
  return redactValue(object, 0) as Record<string, unknown>;
}
