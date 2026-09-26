'use client';

import {
  Banner,
  Button,
  buttonClasses,
  Card,
  cx,
  Display,
  Eyebrow,
  Medallion,
  Skeleton,
  Text,
  TextField,
  ThemeToggle,
} from '@medlearn/ui';
import { User } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { resetProgress, useProgress } from '@/features/progress/store';
import { adoptAccountProgress } from '@/features/sync/sync';

import { useAccount } from './useAccount';

type Mode = 'create' | 'sign-in';

async function send(
  path: string,
  body?: unknown,
): Promise<{ ok: boolean; data: unknown; message: string }> {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: body === undefined ? null : JSON.stringify(body),
    });
    if (response.status === 204) return { ok: true, data: null, message: '' };
    const json = (await response.json()) as { data?: unknown; error?: { message: string } };
    return { ok: response.ok, data: json.data ?? null, message: json.error?.message ?? '' };
  } catch {
    return { ok: false, data: null, message: 'Check your connection and try again.' };
  }
}

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

/**
 * Email and password accounts (Google and phone sign-in come later). Only adults create
 * accounts until parental consent exists; signing in keeps everything learned on either side.
 */
export function AccountView() {
  const router = useRouter();
  const progress = useProgress();
  const { state, refresh } = useAccount();
  const [mode, setMode] = useState<Mode>('create');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col gap-3" aria-busy="true">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const signOut = async () => {
    setBusy(true);
    await send('/api/account/sign-out');
    // The progress belongs to the account; nothing of it stays on a shared phone.
    resetProgress();
    router.push('/');
  };

  if (state.signedIn) {
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
            <Text weight="semibold">Signed in as {state.account?.email}</Text>
            <Text size="sm" tone="muted">
              Your progress is saved to this account. Sign in on any phone to carry on.
            </Text>
            {notice ? (
              <div role="status">
                <Text size="sm" weight="semibold">
                  {notice}
                </Text>
              </div>
            ) : null}
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
        <ThemeCard />
      </>
    );
  }

  const canCreate = progress.profile?.adult === true;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const path = mode === 'create' ? '/api/account/sign-up' : '/api/account/sign-in';
    const result = await send(path, { email, password });
    if (!result.ok) {
      setError(result.message || 'Something went wrong. Please try again.');
      setBusy(false);
      return;
    }
    const confirmEmail = (result.data as { confirmEmail?: boolean }).confirmEmail === true;
    if (confirmEmail) {
      setNotice('Check your email and open the link to finish creating your account.');
      setBusy(false);
      return;
    }
    await adoptAccountProgress();
    if (mode === 'sign-in') {
      router.push('/today');
      return;
    }
    setNotice('Account created. Your progress is now saved to it.');
    setBusy(false);
    refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Eyebrow>Account</Eyebrow>
        <Display>
          Keep your progress <em>safe</em>
        </Display>
        <Text tone="muted">
          An account keeps your progress if you change or lose your phone. Google and phone sign-in
          are coming later.
        </Text>
      </div>

      <div role="group" aria-label="Account" className="flex gap-2">
        {(['create', 'sign-in'] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => {
              setMode(value);
              setError(null);
            }}
            className={cx(
              'min-h-12 rounded-full border px-4 text-sm transition-colors duration-150',
              mode === value
                ? 'border-gold bg-glass font-semibold text-ink'
                : 'border-border-strong bg-surface font-medium text-fg hover:bg-surface-muted',
            )}
          >
            {value === 'create' ? 'New account' : 'Existing account'}
          </button>
        ))}
      </div>

      {mode === 'create' && !canCreate ? (
        <Card tone="glass" className="flex flex-col gap-3">
          {progress.profile ? (
            <Text>
              Accounts for students under 18 need a parent’s agreement. That arrives soon; until
              then, your progress stays on this phone.
            </Text>
          ) : (
            <>
              <Text>
                Answer the setup questions first. Accounts are for students aged 18 or older.
              </Text>
              <div>
                <Link
                  href="/welcome"
                  className={buttonClasses({ variant: 'secondary', size: 'sm' })}
                >
                  Set up my plan
                </Link>
              </div>
            </>
          )}
        </Card>
      ) : (
        <Card tone="glass">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete={mode === 'create' ? 'new-password' : 'current-password'}
              hint={mode === 'create' ? 'At least 8 characters.' : undefined}
              required
              minLength={8}
              maxLength={72}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error ? (
              <Banner tone="danger" title="Not done">
                {error}
              </Banner>
            ) : null}
            {notice ? (
              <div role="status">
                <Text size="sm" weight="semibold">
                  {notice}
                </Text>
              </div>
            ) : null}
            <Text size="xs" tone="muted">
              We use your email only to sign you in.
            </Text>
            <div>
              <Button type="submit" loading={busy}>
                {mode === 'create' ? 'Create account' : 'Sign in'}
              </Button>
            </div>
          </form>
        </Card>
      )}
      <ThemeCard />
    </>
  );
}
