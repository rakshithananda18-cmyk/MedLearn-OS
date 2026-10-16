'use client';

import type { ReviewChecks, ReviewDecision } from '@medlearn/schemas';
import { Button, Checkbox, Text, TextArea } from '@medlearn/ui';
import { Check, PenLine } from '@medlearn/ui/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CHECKS: { key: keyof ReviewChecks; label: string }[] = [
  { key: 'pages', label: 'The book chapters and pages match' },
  { key: 'facts', label: 'The key facts, lesson and cases are correct' },
  { key: 'questions', label: 'The questions, answers and cards are correct' },
  { key: 'visuals', label: 'The diagram and the 3D labels and views are right' },
];

const NONE: ReviewChecks = { pages: false, facts: false, questions: false, visuals: false };

/**
 * The reviewer's decision on this version: approve once every check is ticked, or say what needs
 * changing. Saved to the server, after which the page reloads its history.
 */
export function ReviewForm({ slug, version }: Readonly<{ slug: string; version: string }>) {
  const router = useRouter();
  const [checks, setChecks] = useState<ReviewChecks>(NONE);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState<ReviewDecision | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const everyCheck = Object.values(checks).every(Boolean);

  async function decide(decision: ReviewDecision) {
    setSaving(decision);
    setMessage(null);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          topicSlug: slug,
          contentVersion: version,
          decision,
          checks,
          ...(note.trim() ? { note: note.trim() } : {}),
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        setMessage(body?.error?.message ?? 'Not saved. Try again.');
        return;
      }
      setMessage(decision === 'approved' ? 'Approved. Students see it now.' : 'Sent back.');
      setChecks(NONE);
      setNote('');
      router.refresh();
    } catch {
      setMessage('Not saved: check the connection and try again.');
    } finally {
      setSaving(null);
    }
  }

  return (
    <section
      aria-label="Your review"
      className="flex flex-col gap-3 rounded-xl border border-gold bg-glass p-4 shadow-glass"
    >
      <h2 className="font-semibold text-ink">Your review of version {version}</h2>
      <div className="flex flex-col gap-2">
        {CHECKS.map(({ key, label }) => (
          <Checkbox
            key={key}
            label={label}
            checked={checks[key]}
            onCheckedChange={(checked) => setChecks({ ...checks, [key]: checked })}
          />
        ))}
      </div>
      <TextArea
        label="Notes"
        hint="Needed to ask for changes: say what is wrong and where."
        value={note}
        maxLength={2000}
        rows={4}
        onChange={(event) => setNote(event.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          iconStart={Check}
          disabled={!everyCheck || saving !== null}
          loading={saving === 'approved'}
          onClick={() => void decide('approved')}
        >
          Approve
        </Button>
        <Button
          variant="secondary"
          iconStart={PenLine}
          disabled={!note.trim() || saving !== null}
          loading={saving === 'changes-requested'}
          onClick={() => void decide('changes-requested')}
        >
          Ask for changes
        </Button>
      </div>
      {message ? (
        <Text size="sm" role="status">
          {message}
        </Text>
      ) : null}
    </section>
  );
}
