import { z } from 'zod';

export const ERROR_CODES = [
  'VALIDATION_FAILED',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'RATE_LIMITED',
  'INTERNAL',
] as const;

export const ErrorCode = z.enum(ERROR_CODES);
export type ErrorCode = z.infer<typeof ErrorCode>;

/** Body of every failed API response: `{ error: { code, message, requestId } }`. */
export const ApiErrorBody = z.object({
  error: z.object({
    code: ErrorCode,
    message: z.string(),
    requestId: z.string().optional(),
  }),
});
export type ApiErrorBody = z.infer<typeof ApiErrorBody>;

/** Body of every successful API response: `{ data }`. */
export function apiDataBody<T extends z.ZodType>(data: T) {
  return z.object({ data });
}
