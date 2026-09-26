import type { ApiErrorBody, ErrorCode } from '@medlearn/schemas';

const HTTP_STATUS: Record<ErrorCode, number> = {
  VALIDATION_FAILED: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};

// Messages for 5xx errors are replaced before reaching the client so internals never leak.
const PUBLIC_INTERNAL_MESSAGE = 'Something went wrong on our side. Please try again.';

/** The one error type used across the codebase. */
export class AppError extends Error {
  override readonly name = 'AppError';
  readonly code: ErrorCode;
  readonly status: number;
  readonly details: Readonly<Record<string, unknown>> | undefined;

  constructor(
    code: ErrorCode,
    message: string,
    options: { cause?: unknown; details?: Record<string, unknown> } = {},
  ) {
    super(message, { cause: options.cause });
    this.code = code;
    this.status = HTTP_STATUS[code];
    this.details = options.details;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  toBody(requestId?: string): ApiErrorBody {
    const message = this.isServerError ? PUBLIC_INTERNAL_MESSAGE : this.message;
    return { error: { code: this.code, message, ...(requestId ? { requestId } : {}) } };
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/** Wraps anything thrown into an AppError, keeping the original as `cause`. */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) return error;
  const message = error instanceof Error ? error.message : 'Unknown error';
  return new AppError('INTERNAL', message, { cause: error });
}
