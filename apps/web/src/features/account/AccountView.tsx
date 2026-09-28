'use client';

import {
  Button,
  buttonClasses,
  Card,
  Display,
  Eyebrow,
  Medallion,
  Skeleton,
  Text,
  ThemeToggle,
  ToggleChip,
} from '@medlearn/ui';
import { User } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { resetProgress, useProgress } from '@/features/progress/store';

import { AccountForm, type Mode, Notice, ResetPassword, send } from './AccountForms';
import { useAccount } from './useAccount';

function ThemeCard() {
  return (
    <Card tone="glass" as="section" aria-labelledby="theme-title" className="flex flex-col gap-3">
      <h2 id="theme-title" className="font-semibold text-ink">
        Theme
      </h2>
      <div>
        <ThemeToggle />
      </div>
    </Card>
  );
}

function SignedIn({ email, notice }: Readonly<{ email: string; notice: string | null }>) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    await send('/api/account/sign-out');
    // The progress belongs to the account; nothing of it stays on a shared phone, nor do the
    // pages kept for offline use.
    resetProgress();
    if ('caches' in globalThis) {
      await Promise.all((await caches.keys()).map((key) => caches.delete(key)));
    }
    router.push('/');
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow>Account</Eyebrow>
        <Display>
          Your <em>account</em>
        </Display>
      </div>
      <Card tone="glass" className="flex gap-4">
        <Medallion icon={User} />
        <div className="flex flex-1 flex-col gap-2">
          <Text weight="semibold">Signed in as {email}</Text>
          <Text size="sm" tone="muted">
            Your progress is saved to this account. Sign in on any phone to carry on.
          </Text>
          <Notice>{notice}</Notice>
          <Text size="sm" tone="muted">
            Signing out removes your progress from this phone; it stays in your account.
          </Text>
          <div>
            <Button variant="secondary" size="sm" loading={busy} onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

function ModeSwitch({ mode, onChange }: Readonly<{ mode: Mode; onChange: (mode: Mode) => void }>) {
  return (
    <fieldset className="flex gap-2">
      <legend className="sr-only">Account</legend>
      {(['create', 'sign-in'] as const).map((value) => (
        <ToggleChip key={value} pressed={mode === value} onClick={() => onChange(value)}>
          {value === 'create' ? 'New account' : 'Existing account'}
        </ToggleChip>
      ))}
    </fieldset>
  );
}

/** Shown instead of the form when this student may not create an account yet. */
function NotYet({ hasProfile }: Readonly<{ hasProfile: boolean }>) {
  return (
    <Card tone="glass" className="flex flex-col gap-3">
      {hasProfile ? (
        <Text>
          Accounts for students under 18 need a parent’s agreement. That arrives soon; until then,
          your progress stays on this phone.
        </Text>
      ) : (
        <>
          <Text>Answer the setup questions first. Accounts are for students aged 18 or older.</Text>
          <div>
            <Link href="/welcome" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              Set up my plan
            </Link>
          </div>
        </>
      )}
    </Card>
  );
}

interface AccountViewProps {
  /** The app is private (an access list is set): only invited emails can sign up or sign in. */
  inviteOnly?: boolean;
}

/**
 * Email and password accounts (Google and phone sign-in come later). Only adults create
 * accounts until parental consent exists; signing in keeps everything learned on either side.
 */
export function AccountView({ inviteOnly = false }: Readonly<AccountViewProps>) {
  const progress = useProgress();
  const { state, refresh } = useAccount();
  // Invited people mostly come back to sign in; the setup questions follow the first sign-in.
  const [mode, setMode] = useState<Mode>(inviteOnly ? 'sign-in' : 'create');
  const [resetEmail, setResetEmail] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col gap-3" aria-busy="true">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (state.signedIn) {
    return (
      <>
        <SignedIn email={state.account?.email ?? ''} notice={notice} />
        <ThemeCard />
      </>
    );
  }

  let form = (
    <AccountForm
      key={mode}
      mode={mode === 'create' ? 'create' : 'sign-in'}
      onCreated={(message) => {
        setNotice(message);
        refresh();
      }}
      onForgot={(email) => {
        setResetEmail(email);
        setMode('reset');
      }}
    />
  );
  if (mode === 'reset') form = <ResetPassword initialEmail={resetEmail} />;
  else if (mode === 'create' && !inviteOnly && progress.profile?.adult !== true) {
    form = <NotYet hasProfile={progress.profile !== null} />;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow>Account</Eyebrow>
        <Display>
          Keep your progress <em>safe</em>
        </Display>
        <Text tone="muted">
          {inviteOnly
            ? 'MedLearn OS is private for now. Sign in, or create your account with the email the team added.'
            : 'An account keeps your progress if you change or lose your phone. Google and phone sign-in are coming later.'}
        </Text>
      </div>
      <ModeSwitch mode={mode} onChange={setMode} />
      {form}
      <ThemeCard />
    </>
  );
}
