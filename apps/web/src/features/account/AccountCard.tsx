'use client';

import { buttonClasses, Card, Medallion, Text } from '@medlearn/ui';
import { User } from '@medlearn/ui/icons';
import Link from 'next/link';

import { useProgress } from '@/features/progress/store';

import { useAccount } from './useAccount';

/** A gentle nudge on Progress to keep it safe in an account; a quiet line once signed in. */
export function AccountCard() {
  const { state } = useAccount();
  const progress = useProgress();
  if (state.status === 'loading') return null;

  if (state.signedIn) {
    return (
      <Text size="sm" tone="muted">
        Signed in as {state.account?.email} ·{' '}
        <Link
          href="/account"
          className="font-semibold text-primary-strong underline-offset-4 hover:underline"
        >
          Account
        </Link>
      </Text>
    );
  }
  if (progress.profile?.adult === false) return null;

  return (
    <Card tone="glass" as="section" aria-labelledby="keep-progress" className="flex gap-4">
      <Medallion icon={User} />
      <div className="flex flex-1 flex-col gap-2">
        <h2 id="keep-progress" className="font-semibold text-ink">
          Keep your progress safe
        </h2>
        <Text size="sm" tone="muted">
          Create an account so your progress follows you to a new phone.
        </Text>
        <div>
          <Link href="/account" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
            Create account or sign in
          </Link>
        </div>
      </div>
    </Card>
  );
}
