'use client';

import { NOTE_MAX_LENGTH } from '@medlearn/schemas/limits';
import { Button, Card, TextArea } from '@medlearn/ui';
import { Clock } from '@medlearn/ui/icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import { saveNote, useProgress } from '@/features/progress/store';

// Saving rewrites the whole progress record, so it waits for a pause in typing.
const SAVE_DELAY_MS = 600;

/** 83 seconds as "1:23", for a time mark in the notes. */
export function clockTime(seconds: number): string {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}

/**
 * The student's own notes on a topic, kept with their progress (and in their account). During a
 * lecture, `time` reads the video's position, and a button marks it in the note: "[4:05] ".
 */
export function TopicNotes({
  topicSlug,
  title = 'My notes',
  rows = 5,
  time,
}: Readonly<{
  topicSlug: string;
  title?: string;
  rows?: number;
  /** Seconds into the lecture playing now, or null before it reports any. */
  time?: () => number | null;
}>) {
  const saved = useProgress().notes[topicSlug]?.text ?? '';
  const [draft, setDraft] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const field = useRef<HTMLTextAreaElement>(null);

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    if (pending.current === null) return;
    saveNote(topicSlug, pending.current);
    pending.current = null;
  }, [topicSlug]);

  // Whatever is still unsaved is saved when the student leaves the page.
  useEffect(() => flush, [flush]);

  const change = (text: string) => {
    setDraft(text);
    pending.current = text;
    clearTimeout(timer.current);
    timer.current = setTimeout(flush, SAVE_DELAY_MS);
  };

  /** Starts a line with the lecture's time where the cursor is, and leaves the cursor after it. */
  const markTime = () => {
    const seconds = time?.();
    if (seconds === null || seconds === undefined) return;
    const text = draft ?? saved;
    const at = field.current?.selectionStart ?? text.length;
    const before = text.slice(0, at);
    const mark = `${before && !before.endsWith('\n') ? '\n' : ''}[${clockTime(seconds)}] `;
    change(before + mark + text.slice(at));
    const caret = at + mark.length;
    requestAnimationFrame(() => {
      field.current?.focus();
      field.current?.setSelectionRange(caret, caret);
    });
  };

  return (
    <Card tone="glass" as="section" aria-labelledby="notes-title" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="notes-title" className="font-semibold text-ink">
          {title}
        </h2>
        {time ? (
          <Button size="sm" variant="secondary" iconStart={Clock} onClick={markTime}>
            Mark the time
          </Button>
        ) : null}
      </div>
      <TextArea
        ref={field}
        label="Your notes on this topic"
        hint="Saved on this device as you type, and to your account when you are signed in."
        rows={rows}
        maxLength={NOTE_MAX_LENGTH}
        value={draft ?? saved}
        onChange={(event) => change(event.target.value)}
        onBlur={flush}
      />
    </Card>
  );
}
