'use client';

import type { ReportKind } from '@medlearn/schemas';
import { Banner, Button, ChoiceGroup, type ChoiceOption, Text, TextArea } from '@medlearn/ui';
import { type FormEvent, useState } from 'react';

const KINDS: ChoiceOption<ReportKind>[] = [
  { value: 'factual-error', label: 'A fact looks wrong' },
  { value: 'unclear', label: 'Hard to understand' },
  { value: 'typo', label: 'Spelling or wording' },
  { value: 'visual', label: 'The diagram or chart' },
  { value: 'other', label: 'Something else' },
];

export interface ReportIssueFormProps {
  topicSlug: string;
  contentVersion: string;
}

type State = 'idle' | 'sending' | 'sent' | 'failed';

/** Sends a content problem to the review team, with the topic and the version the student saw. */
export function ReportIssueForm({ topicSlug, contentVersion }: ReportIssueFormProps) {
  const [kind, setKind] = useState<ReportKind | null>(null);
  const [note, setNote] = useState('');
  const [state, setState] = useState<State>('idle');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!kind) return;
    setState('sending');
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ topicSlug, contentVersion, kind, note: note || undefined }),
      });
      setState(response.ok ? 'sent' : 'failed');
    } catch {
      setState('failed');
    }
  };

  if (state === 'sent') {
    return (
      <Banner tone="success" title="Thank you">
        The content team will check this topic.
      </Banner>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Text weight="semibold">Report an issue</Text>
      <ChoiceGroup
        legend="What is the problem?"
        name="report-kind"
        options={KINDS}
        value={kind}
        onChange={setKind}
      />
      <TextArea
        label="Details (optional)"
        hint="Which step, and what you expected. Please do not include personal details."
        maxLength={1000}
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      {state === 'failed' ? (
        <Banner tone="danger" title="Not sent">
          Check your connection and try again.
        </Banner>
      ) : null}
      <div>
        <Button type="submit" disabled={!kind} loading={state === 'sending'}>
          Send report
        </Button>
      </div>
    </form>
  );
}
