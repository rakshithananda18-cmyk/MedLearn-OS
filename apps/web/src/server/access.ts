type Env = Record<string, string | undefined>;

/**
 * The emails allowed to use the app, from ACCESS_EMAILS (comma-separated), or null when the app is
 * open to everyone. Development is open without a list; a production server is closed to everyone
 * unless it has a list or ACCESS_OPEN=true says, on purpose, that it is public. So a deploy that
 * forgets the list keeps the textbook notes private instead of publishing them.
 */
export function getAccessList(env: Env = process.env): ReadonlySet<string> | null {
  const emails = (env.ACCESS_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (emails.length > 0) return new Set(emails);
  const open = env.ACCESS_OPEN === 'true' || env.NODE_ENV !== 'production';
  return open ? null : new Set();
}

/** What someone not on the access list is told when they try to sign up or sign in. */
export const NOT_INVITED = 'This app is private. Ask the team to add your email.';

/** Whether this email may use the app; everyone may when there is no access list. */
export function isAllowed(list: ReadonlySet<string> | null, email: string | null | undefined) {
  return list === null || (!!email && list.has(email.toLowerCase()));
}
