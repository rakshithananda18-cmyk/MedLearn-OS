'use client';

import { NOTE_MAX_LENGTH } from '@medlearn/schemas/limits';
import { Card, TextArea } from '@medlearn/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

import { saveNote, useProgress } from '@/features/progress/store';

// Saving rewrites the whole progress record, so it waits for a pause in typing.
const SAVE_DELAY_MS = 600;

/** The student's own notes on a topic, kept with their progress (and in their account). */
export function TopicNotes({ topicSlug }: Readonly<{ topicSlug: string }>) {
  const saved = useProgress().notes[topicSlug]?.text ?? '';
  const [draft, setDraft] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    if (pending.current === null) return;
    saveNote(topicSlug, pending.current);
    pending.current = null;
  }, [topicSlug]);

  // Whatever is still unsaved is saved when the student leaves the page.
  useEffect(() => flush, [flush]);

  return (
    <Card tone="glass" as="section" aria-labelledby="notes-title" className="flex flex-col gap-3">
      <h2 id="notes-title" className="font-semibold text-ink">
        My notes
      </h2>
      <TextArea
        label="Your notes on this topic"
        hint="Saved on this phone as you type, and to your account when you are signed in."
        rows={5}
        maxLength={NOTE_MAX_LENGTH}
        value={draft ?? saved}
        onChange={(event) => {
          setDraft(event.target.value);
          pending.current = event.target.value;
          clearTimeout(timer.current);
          timer.current = setTimeout(flush, SAVE_DELAY_MS);
        }}
        onBlur={flush}
      />
    </Card>
  );
}
