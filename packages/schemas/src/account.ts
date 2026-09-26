import { z } from 'zod';

const email = z.email().max(254);
// 72 is bcrypt's limit; longer passwords would be silently cut.
const password = z.string().min(8, 'Use at least 8 characters').max(72);
const code = z.string().regex(/^\d{6}$/, 'Enter the 6-digit code from the email');

/** Email and password for creating an account or signing in. */
export const AccountCredentials = z.object({ email, password });
export type AccountCredentials = z.infer<typeof AccountCredentials>;

/** Where to send a password reset code. */
export const AccountEmail = z.object({ email });
export type AccountEmail = z.infer<typeof AccountEmail>;

/** The 6-digit code emailed to confirm a new account's address. */
export const EmailCode = z.object({ email, code });
export type EmailCode = z.infer<typeof EmailCode>;

/** A password reset: the emailed code and the new password. */
export const NewPassword = z.object({ email, code, password });
export type NewPassword = z.infer<typeof NewPassword>;

/** Who is signed in on this phone. An anonymous account has no email yet. */
export const AccountStatus = z.object({
  email: z.email().nullable(),
  anonymous: z.boolean(),
});
export type AccountStatus = z.infer<typeof AccountStatus>;
