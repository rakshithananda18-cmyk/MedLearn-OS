import { Display, Eyebrow, Text } from '@medlearn/ui';
import Link from 'next/link';

/** What anyone not on the review team sees at /review. */
export function ReviewersOnly() {
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow>Review</Eyebrow>
      <Display size="md">For the review team</Display>
      <Text tone="muted">
        Sign in with the email the team added as a reviewer to check topics here.
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
