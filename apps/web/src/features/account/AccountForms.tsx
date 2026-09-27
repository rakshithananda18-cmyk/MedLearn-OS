'use client';

import { Banner, Button, Card, Text, TextField } from '@medlearn/ui';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import { adoptAccountProgress } from '@/features/sync/sync';

export type Mode = 'create' | 'sign-in' | 'reset';

interface SendResult {
  ok: boolean;
  data: unknown;
  message: string;
}

export async function send(path: string, body?: unknown): Promise<SendResult> {
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

/** A form's request: busy while it runs; on failure the server's message, and null. */
function useRequest() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async (path: string, body: unknown): Promise<SendResult | null> => {
    setBusy(true);
    setError(null);
    const result = await send(path, body);
    setBusy(false);
    if (result.ok) return result;
    setError(result.message || 'Something went wrong. Please try again.');
    return null;
  };
  return { busy, error, run };
}

/** A short confirmation, announced by screen readers (an <output> is a live status region). */
export function Notice({ children }: Readonly<{ children: string | null }>) {
  if (!children) return null;
  return <output className="block text-sm font-semibold text-fg">{children}</output>;
}

function FormError({ children }: Readonly<{ children: string | null }>) {
  if (!children) return null;
  return (
    <Banner tone="danger" title="Not done">
      {children}
    </Banner>
  );
}

function CodeField({
  value,
  onChange,
}: Readonly<{ value: string; onChange: (code: string) => void }>) {
  return (
    <TextField
      label="Code from the email"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{6}"
      maxLength={6}
      required
      value={value}
      onChange={(event) => onChange(event.target.value.trim())}
    />
  );
}

interface ConfirmEmailProps {
  email: string;
  onConfirmed: () => Promise<void>;
}

/** The second step of a new account: the 6-digit code emailed to the student. */
function ConfirmEmail({ email, onConfirmed }: Readonly<ConfirmEmailProps>) {
  const [code, setCode] = useState('');
  const { busy, error, run } = useRequest();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (await run('/api/account/confirm', { email, code })) await onConfirmed();
  };

  return (
    <Card tone="glass">
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Text>
          We sent a 6-digit code to <strong>{email}</strong>. Enter it to finish. It works for an
          hour.
        </Text>
        <CodeField value={code} onChange={setCode} />
        <FormError>{error}</FormError>
        <div>
          <Button type="submit" loading={busy}>
            Confirm email
          </Button>
        </div>
      </form>
    </Card>
  );
}

interface AccountFormProps {
  mode: 'create' | 'sign-in';
  /** Called after an account is created, with the message to show. */
  onCreated: (notice: string) => void;
  /** Opens the password reset, carrying over the email typed so far. */
  onForgot: (email: string) => void;
}

export function AccountForm({ mode, onCreated, onForgot }: Readonly<AccountFormProps>) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirming, setConfirming] = useState(false);
  const { busy, error, run } = useRequest();
  const creating = mode === 'create';

  const finish = async () => {
    // Someone signing in for the first time has no study plan yet: the setup questions come first.
    const hasPlan = await adoptAccountProgress();
    if (!hasPlan) router.push('/welcome');
    else if (creating) onCreated('Account created. Your progress is now saved to it.');
    else router.push('/today');
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const path = creating ? '/api/account/sign-up' : '/api/account/sign-in';
    const result = await run(path, { email, password });
    if (!result) return;
    if ((result.data as { confirmEmail?: boolean }).confirmEmail === true) setConfirming(true);
    else await finish();
  };

  if (confirming) return <ConfirmEmail email={email} onConfirmed={finish} />;

  return (
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
          autoComplete={creating ? 'new-password' : 'current-password'}
          hint={creating ? 'At least 8 characters.' : undefined}
          required
          minLength={8}
          maxLength={72}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormError>{error}</FormError>
        <Text size="xs" tone="muted">
          We use your email only to sign you in.
        </Text>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" loading={busy}>
            {creating ? 'Create account' : 'Sign in'}
          </Button>
          {creating ? null : (
            <Button type="button" variant="ghost" size="sm" onClick={() => onForgot(email)}>
              Forgot your password?
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

/** A forgotten password: an emailed 6-digit code, then a new password, then signed in. */
export function ResetPassword({ initialEmail }: Readonly<{ initialEmail: string }>) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const { busy, error, run } = useRequest();

  const sendCode = async (event: FormEvent) => {
    event.preventDefault();
    if (await run('/api/account/reset', { email })) setCodeSent(true);
  };

  const setNewPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!(await run('/api/account/new-password', { email, code, password }))) return;
    router.push((await adoptAccountProgress()) ? '/today' : '/welcome');
  };

  if (!codeSent) {
    return (
      <Card tone="glass">
        <form onSubmit={sendCode} className="flex flex-col gap-4">
          <Text>Enter your account’s email and we will send you a 6-digit code.</Text>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormError>{error}</FormError>
          <div>
            <Button type="submit" loading={busy}>
              Send code
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card tone="glass">
      <form onSubmit={setNewPassword} className="flex flex-col gap-4">
        <Notice>{`If an account uses ${email}, a 6-digit code is on its way.`}</Notice>
        <CodeField value={code} onChange={setCode} />
        <TextField
          label="New password"
          type="password"
          autoComplete="new-password"
          hint="At least 8 characters."
          required
          minLength={8}
          maxLength={72}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormError>{error}</FormError>
        <div>
          <Button type="submit" loading={busy}>
            Set new password
          </Button>
        </div>
      </form>
    </Card>
  );
}
