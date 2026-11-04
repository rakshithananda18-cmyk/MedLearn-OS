'use client';

import { Badge, Button, buttonClasses, Card, Display, Eyebrow, Text } from '@medlearn/ui';
import Link from 'next/link';
import { useState } from 'react';

import { useAccount } from '@/features/account/useAccount';
import { replaceProgress, useProgress } from '@/features/progress/store';

import { beginFixtureMode } from './mode';
import { SCENARIOS } from './scenarios';

/**
 * Prototype-only screen for usability sessions: puts the student's phone into the state a task
 * needs. Not linked from the app; the facilitator types the address.
 */
export function FacilitatorView() {
  const progress = useProgress();
  const [applied, setApplied] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const { state, refresh } = useAccount();
  const canApply =
    state.status === 'ready' &&
    state.verified &&
    (state.account === null || state.account.anonymous) &&
    !checking &&
    !verificationError;

  const apply = async (scenario: (typeof SCENARIOS)[number]) => {
    if (!canApply) return;
    setChecking(true);
    setVerificationError(null);
    try {
      // A different tab may have signed in since this preview opened.
      const response = await fetch('/api/account', { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not verify');
      const body = (await response.json()) as { data?: unknown };
      const { AccountStatus } = await import('@medlearn/schemas');
      const result = AccountStatus.nullable().safeParse(body.data);
      if (!result.success) throw new Error('Could not verify');
      if (result.data !== null && !result.data.anonymous) {
        setVerificationError(
          'An account is now signed in. Sign out through Account before applying a test scenario.',
        );
        refresh();
        return;
      }
      if (!beginFixtureMode()) {
        setVerificationError(
          'Test setup could not be saved on this device. No scenario was applied. Check browser storage and try again.',
        );
        return;
      }
      replaceProgress(scenario.build(new Date()));
      setApplied(scenario.title);
      setPreview(null);
    } catch {
      setVerificationError(
        'Could not verify this device’s account. No scenario was applied. Reconnect and check again.',
      );
    } finally {
      setChecking(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-6 px-4 py-8 md:py-16">
      <div className="flex flex-col gap-3">
        <Eyebrow>Usability sessions · test setup</Eyebrow>
        <Display size="lg">
          Facilitator <em>setup</em>
        </Display>
        <Text tone="muted">
          Choose the state this test device needs before handing it back to the student. Preview the
          replacement before applying it; use a signed-out device reserved for testing.
        </Text>
      </div>

      {!canApply ? (
        <Card className="flex flex-col gap-3">
          <Text size="sm">
            {verificationError ??
              (checking
                ? 'Checking the account before applying this scenario…'
                : state.status === 'loading'
                  ? 'Checking this device’s account before enabling test setup…'
                  : state.signedIn
                    ? 'Sign out through Account before replacing test progress. This prevents the scenario from mixing with an account’s real study data.'
                    : 'Could not verify this device’s account. Reconnect and check again before applying a scenario.')}
          </Text>
          <div className="flex flex-wrap gap-2">
            <Link href="/account" className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
              Open Account
            </Link>
            {state.status === 'ready' && !state.signedIn ? (
              <Button
                size="sm"
                variant="ghost"
                disabled={checking}
                onClick={() => {
                  setVerificationError(null);
                  refresh();
                }}
              >
                Check account again
              </Button>
            ) : null}
          </div>
        </Card>
      ) : null}

      <ul className="flex flex-col gap-3">
        {SCENARIOS.map((scenario) => (
          <li key={scenario.id}>
            <Card className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold text-ink">{scenario.title}</h2>
                <Badge>{scenario.task}</Badge>
              </div>
              <Text size="sm" tone="muted">
                {scenario.description}
              </Text>
              <div>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={!canApply}
                  aria-label={`Preview: ${scenario.title}`}
                  onClick={() => setPreview(scenario.id)}
                >
                  Preview scenario
                </Button>
              </div>
              {preview === scenario.id ? (
                <div
                  className="flex flex-col gap-3 rounded-lg border border-border bg-surface-muted p-3"
                  role="group"
                  aria-label={`Apply ${scenario.title}`}
                >
                  <Text size="sm">
                    Applying <strong>{scenario.title}</strong> replaces all locally saved study
                    progress on this device with this test scenario.
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      disabled={!canApply}
                      loading={checking}
                      onClick={() => void apply(scenario)}
                    >
                      Replace device progress
                    </Button>
                    <Button variant="ghost" onClick={() => setPreview(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>

      <div role="status" className="text-sm font-semibold text-ink">
        {applied ? `${applied} is set. Open /today on this phone.` : ''}
      </div>
      <Link href="/today" className={buttonClasses({ variant: 'secondary' })}>
        Open Today
      </Link>

      <Card as="section" aria-labelledby="device-state" className="flex flex-col gap-1">
        <h2 id="device-state" className="font-semibold text-ink">
          This device now
        </h2>
        <Text size="sm" tone="muted">
          Plan: {progress.profile ? `${progress.profile.dailyMinutes} min a day` : 'not set up'}
          {progress.profile?.examDate ? `, exam on ${progress.profile.examDate}` : ''}
        </Text>
        <Text size="sm" tone="muted">
          Lessons finished: {progress.completedLessons.length} · Drills finished:{' '}
          {progress.completedDrills.length} · Cards reviewed: {Object.keys(progress.reviews).length}
        </Text>
      </Card>
    </main>
  );
}
