import { z } from 'zod';

/** Email and password for creating an account or signing in. */
export const AccountCredentials = z.object({
  email: z.email().max(254),
  // 72 is bcrypt's limit; longer passwords would be silently cut.
  password: z.string().min(8, 'Use at least 8 characters').max(72),
});
export type AccountCredentials = z.infer<typeof AccountCredentials>;

/** Who is signed in on this phone. An anonymous account has no email yet. */
export const AccountStatus = z.object({
  email: z.email().nullable(),
  anonymous: z.boolean(),
});
export type AccountStatus = z.infer<typeof AccountStatus>;
