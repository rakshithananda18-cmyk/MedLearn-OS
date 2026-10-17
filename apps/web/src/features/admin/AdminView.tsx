'use client';

import type { ReviewerRecord, RoleChange } from '@medlearn/schemas';
import { Button, Card, Display, Eyebrow, Text, TextField } from '@medlearn/ui';
import { ArrowRight, Check, PenLine, Plus, Trash2, X } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';

/** How far the topics have got with the review team, for the summary at the top. */
export interface ReviewProgress {
  approved: number;
  changesAsked: number;
  recheck: number;
  notReviewed: number;
}

const DATE = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const when = (iso: string) => DATE.format(new Date(iso));

/** Sends one change to the server; the message to show when it fails, or null. */
async function send(url: string, method: string, body?: unknown): Promise<string | null> {
  try {
    const response = await fetch(url, {
      method,
      headers: body ? { 'content-type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (response.ok) return null;
    const failure = (await response.json().catch(() => null)) as {
      error?: { message?: string; fields?: Record<string, string[]> };
    } | null;
    const field = Object.values(failure?.error?.fields ?? {})[0]?.[0];
    return field ?? failure?.error?.message ?? 'Not saved. Try again.';
  } catch {
    return 'No connection. Try again.';
  }
}

const reviewerUrl = (email: string) => `/api/admin/reviewers/${encodeURIComponent(email)}`;

/** One reviewer: their qualification, editable, and a two-step remove. */
function ReviewerRow({ reviewer }: Readonly<{ reviewer: ReviewerRecord }>) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [qualification, setQualification] = useState(reviewer.qualification);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function act(run: () => Promise<string | null>) {
    setBusy(true);
    setMessage(null);
    const failure = await run();
    setBusy(false);
    if (failure) {
      setMessage(failure);
      return;
    }
    setEditing(false);
    setRemoving(false);
    router.refresh();
  }

  return (
    <li className="flex flex-col gap-2 border-t border-border py-3 first:border-t-0">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col">
          <span className="font-semibold break-all text-ink">{reviewer.email}</span>
          <span className="text-sm text-fg-muted">
            {reviewer.qualification || 'No qualification recorded'}
          </span>
          <span className="text-xs text-fg-muted">
            Added {when(reviewer.addedAt)}
            {reviewer.addedBy ? ` by ${reviewer.addedBy}` : ''}
          </span>
        </div>
        {editing || removing ? null : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconStart={PenLine}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button variant="ghost" size="sm" iconStart={Trash2} onClick={() => setRemoving(true)}>
              Remove
            </Button>
          </div>
        )}
      </div>
      {editing ? (
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void act(() =>
              send(reviewerUrl(reviewer.email), 'PATCH', { qualification: qualification.trim() }),
            );
          }}
        >
          <TextField
            label={`Qualification of ${reviewer.email}`}
            value={qualification}
            maxLength={200}
            onChange={(event) => setQualification(event.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" iconStart={Check} loading={busy}>
              Save
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconStart={X}
              onClick={() => {
                setEditing(false);
                setQualification(reviewer.qualification);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
      {removing ? (
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Confirm removal"
        >
          <Text size="sm">
            Take {reviewer.email} off the team? Their past reviews stay in the history.
          </Text>
          <Button
            variant="secondary"
            size="sm"
            loading={busy}
            onClick={() => void act(() => send(reviewerUrl(reviewer.email), 'DELETE'))}
          >
            Yes, remove
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setRemoving(false)}>
            Keep
          </Button>
        </div>
      ) : null}
      {message ? (
        <Text size="sm" className="text-danger" role="alert">
          {message}
        </Text>
      ) : null}
    </li>
  );
}

/** The form that adds a reviewer with what qualifies them. */
function AddReviewer() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function add(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    const failure = await send('/api/admin/reviewers', 'POST', {
      email: email.trim(),
      qualification: qualification.trim(),
    });
    setBusy(false);
    if (failure) {
      setMessage(failure);
      return;
    }
    setMessage(`${email.trim().toLowerCase()} can now review topics.`);
    setEmail('');
    setQualification('');
    router.refresh();
  }

  return (
    <form onSubmit={(event) => void add(event)} className="flex flex-col gap-3">
      <TextField
        label="Email"
        type="email"
        autoComplete="off"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        hint="They sign in with this email to see the review board."
      />
      <TextField
        label="Qualification"
        required
        minLength={2}
        maxLength={200}
        value={qualification}
        onChange={(event) => setQualification(event.target.value)}
        hint="What qualifies them to check content: degree, year, department."
      />
      <Button type="submit" iconStart={Plus} loading={busy} className="self-start">
        Add reviewer
      </Button>
      {message ? (
        <Text size="sm" role="status">
          {message}
        </Text>
      ) : null}
    </form>
  );
}

const ACTION = { added: 'Added', updated: 'Updated', removed: 'Removed' } as const;

/**
 * The admin page: how far the review has got, who is on the review team and what qualifies them,
 * adding and removing reviewers, and every change to the team.
 */
export function AdminView({
  reviewers,
  changes,
  progress,
}: Readonly<{ reviewers: ReviewerRecord[]; changes: RoleChange[]; progress: ReviewProgress }>) {
  const total = progress.approved + progress.changesAsked + progress.recheck + progress.notReviewed;
  const tallies: Array<[string, number]> = [
    ['Approved', progress.approved],
    ['Changes asked for', progress.changesAsked],
    ['Changed, check again', progress.recheck],
    ['Not reviewed', progress.notReviewed],
  ];
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <Eyebrow>Admin</Eyebrow>
        <Display size="md">Run the review team</Display>
        <Text tone="muted">
          Choose who reviews topics and record what qualifies them. Who is an admin is set in the
          database.
        </Text>
      </header>

      <Card tone="glass" as="section" aria-labelledby="progress-title" className="rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="progress-title" className="font-semibold text-ink">
            Review progress · {total} topics
          </h2>
          <Link
            href="/review"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-strong underline-offset-4 hover:underline"
          >
            Review board <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          {tallies.map(([label, count]) => (
            <li key={label} className="flex flex-col rounded-lg bg-surface-muted px-3 py-2">
              <span className="text-lg font-semibold text-ink">{count}</span>
              <span className="text-xs text-fg-muted">{label}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card tone="glass" as="section" aria-labelledby="team-title" className="rounded-xl">
        <h2 id="team-title" className="font-semibold text-ink">
          Review team · {reviewers.length}
        </h2>
        {reviewers.length === 0 ? (
          <Text size="sm" tone="muted" className="py-2">
            Nobody yet. Add the first reviewer below.
          </Text>
        ) : (
          <ul className="flex flex-col">
            {reviewers.map((reviewer) => (
              <ReviewerRow
                key={`${reviewer.email}-${reviewer.qualification}`}
                reviewer={reviewer}
              />
            ))}
          </ul>
        )}
      </Card>

      <Card tone="glass" as="section" aria-labelledby="add-title" className="rounded-xl">
        <h2 id="add-title" className="mb-3 font-semibold text-ink">
          Add a reviewer
        </h2>
        <AddReviewer />
      </Card>

      <Card tone="glass" as="section" aria-labelledby="log-title" className="rounded-xl">
        <h2 id="log-title" className="font-semibold text-ink">
          Changes to the team
        </h2>
        {changes.length === 0 ? (
          <Text size="sm" tone="muted" className="py-2">
            No changes yet.
          </Text>
        ) : (
          <ol className="flex flex-col">
            {changes.map((change) => (
              <li key={change.id} className="border-t border-border py-2 text-sm first:border-t-0">
                <span className="font-semibold text-ink">{ACTION[change.action]}</span>{' '}
                <span className="break-all">{change.email}</span>
                {change.qualification ? ` (${change.qualification})` : ''}
                <span className="block text-xs text-fg-muted">
                  by {change.changedBy} · {when(change.changedAt)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </div>
  );
}
