import { AppError } from '@medlearn/core';

/** Supabase auth error codes we explain to students; everything else is a server error. */
const KNOWN: Record<string, () => AppError> = {
  user_already_exists: () =>
    new AppError('CONFLICT', 'An account with this email already exists. Sign in instead.'),
  email_exists: () =>
    new AppError('CONFLICT', 'An account with this email already exists. Sign in instead.'),
  invalid_credentials: () => new AppError('UNAUTHORIZED', 'Email or password is wrong.'),
  weak_password: () => new AppError('VALIDATION_FAILED', 'Choose a longer password.'),
  email_address_invalid: () => new AppError('VALIDATION_FAILED', 'Check the email address.'),
  over_request_rate_limit: () =>
    new AppError('RATE_LIMITED', 'Too many attempts. Wait a minute and try again.'),
};

/** Maps a Supabase auth error to the message a student sees, keeping the original as the cause. */
export function toAuthError(error: { code?: string | undefined; message: string }): AppError {
  const known = error.code ? KNOWN[error.code] : undefined;
  if (!known) return new AppError('INTERNAL', 'Account request failed', { cause: error });
  const appError = known();
  return new AppError(appError.code, appError.message, { cause: error });
}
