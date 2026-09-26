type Env = Record<string, string | undefined>;

/**
 * The emails allowed to use the app, from ACCESS_EMAILS (comma-separated), or null when the app is
 * open to everyone (local development and the test suites). Set it wherever the app holds content
 * that must stay private, such as notes drawn from textbooks.
 */
export function getAccessList(env: Env = process.env): ReadonlySet<string> | null {
  const emails = (env.ACCESS_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return emails.length > 0 ? new Set(emails) : null;
}

/** What someone not on the access list is told when they try to sign up or sign in. */
export const NOT_INVITED = 'This app is private. Ask the team to add your email.';

/** Whether this email may use the app; everyone may when there is no access list. */
export function isAllowed(list: ReadonlySet<string> | null, email: string | null | undefined) {
  return list === null || (!!email && list.has(email.toLowerCase()));
}
