import { Display, Eyebrow, Text } from '@medlearn/ui';
import Link from 'next/link';

/** What anyone who is not an admin sees at /admin. */
export function AdminOnly() {
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow>Admin</Eyebrow>
      <Display size="md">For admins</Display>
      <Text tone="muted">
        Sign in with an admin’s email to manage the review team here. Admins are set in the
        database.
      </Text>
      <Link
        href="/account"
        className="self-start font-semibold text-primary-strong underline-offset-4 hover:underline"
      >
        Go to sign in
      </Link>
    </div>
  );
}
