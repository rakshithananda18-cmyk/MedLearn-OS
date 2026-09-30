'use client';

import { Button, buttonClasses, cx, Eyebrow, Icon, IconButton, QuestionCard } from '@medlearn/ui';
import { ArrowRight, Flame, RotateCcw, Timer, X } from '@medlearn/ui/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { PracticeQuestion } from '@/content/topics';
import { recordAnswer } from '@/features/progress/store';

import { SECONDS_PER_TIMED_QUESTION } from './sessions';

/** What a finished session hands back: each question with whether it was got right. */
export type SessionResults = Array<{ question: PracticeQuestion; correct: boolean | null }>;

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/** The end of a session: the score, each topic's share, and ways on. */
function Results({
  title,
  results,
  onAgain,
  onDone,
}: Readonly<{
  title: string;
  results: SessionResults;
  onAgain: (questions: PracticeQuestion[]) => void;
  onDone: () => void;
}>) {
  const right = results.filter((result) => result.correct === true).length;
  const missed = results.filter((result) => result.correct !== true);
  const percent = Math.round((100 * right) / Math.max(1, results.length));
  const topics = [...new Set(results.map((result) => result.question.topic.title))].map((topic) => {
    const inTopic = results.filter((result) => result.question.topic.title === topic);
    return {
      topic,
      right: inTopic.filter((result) => result.correct === true).length,
      total: inTopic.length,
    };
  });
  let verdict = 'Keep going: every miss is now a recall card.';
  if (percent >= 80) verdict = 'Strong work. These are sticking.';
  else if (percent >= 60) verdict = 'Getting there. Go over the misses once more.';
  return (
    <section
      aria-labelledby="results-title"
      className="flex animate-rise flex-col gap-4 rounded-xl border border-glass-border bg-glass p-6 shadow-glass"
    >
      <Eyebrow>{title} · done</Eyebrow>
      <div className="flex items-baseline gap-3">
        <h2 id="results-title" className="text-gold font-display text-5xl">
          {right}/{results.length}
        </h2>
        <span className="text-lg font-semibold text-ink">{percent}% right</span>
      </div>
      <p className="text-fg">{verdict}</p>
      <ul aria-label="By topic" className="flex flex-col gap-2">
        {topics.map((row) => (
          <li key={row.topic} className="flex items-center gap-3 text-sm">
            <span className="min-w-0 flex-1 truncate text-ink">{row.topic}</span>
            <span aria-hidden="true" className="h-2 w-1/3 overflow-hidden rounded-full bg-border">
              <span
                className={cx(
                  'block h-full rounded-full',
                  row.right === row.total ? 'bg-success' : 'bg-primary',
                )}
                style={{ width: `${(100 * row.right) / Math.max(1, row.total)}%` }}
              />
            </span>
            <span className="w-12 shrink-0 text-right font-semibold text-fg-muted">
              {row.right}/{row.total}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {missed.length > 0 ? (
          <Button
            iconStart={RotateCcw}
            onClick={() => onAgain(missed.map((result) => result.question))}
          >
            Try the {missed.length} missed again
          </Button>
        ) : null}
        <Link href="/revise" className={buttonClasses({ variant: 'secondary' })}>
          Recall cards
        </Link>
        <Button variant="ghost" onClick={onDone}>
          Back to practice
        </Button>
      </div>
    </section>
  );
}

/**
 * One practice session, a question at a time: a bar for how far along, a flame for answers right
 * in a row, and a countdown when timed (the session ends when it runs out). Every answer counts
 * towards mastery; a miss comes back as a recall card.
 */
export function PracticeSession({
  title,
  questions: first,
  seconds = null,
  onFinish,
  onExit,
}: Readonly<{
  title: string;
  questions: PracticeQuestion[];
  /** Time allowed for a timed test, or null. */
  seconds?: number | null;
  /** Called once, when the last question is answered or time runs out. */
  onFinish?: (results: SessionResults) => void;
  onExit: () => void;
}>) {
  const [questions, setQuestions] = useState(first);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  // A timed test runs to a deadline on the clock, so time keeps passing even while the tab is in
  // the background (where the browser slows timers down).
  const [deadline, setDeadline] = useState(() =>
    seconds === null ? null : Date.now() + seconds * 1000,
  );
  const [now, setNow] = useState(() => Date.now());
  const [finished, setFinished] = useState(false);
  const left = deadline === null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
  const showing = questions[index];
  const answered = showing ? answers[showing.question.id] : undefined;
  let streak = 0;
  for (const question of questions.slice(0, index + 1).reverse()) {
    if (answers[question.question.id] !== true) break;
    streak += 1;
  }

  const results: SessionResults = questions.map((question) => ({
    question,
    correct: answers[question.question.id] ?? null,
  }));
  const finish = () => {
    setFinished(true);
    onFinish?.(results);
  };

  // The countdown redraws each second and ends the test when the deadline passes.
  useEffect(() => {
    if (deadline === null || finished) return;
    const tick = setTimeout(() => {
      const time = Date.now();
      setNow(time);
      if (time >= deadline) finish();
    }, 1000);
    return () => clearTimeout(tick);
  });

  if (finished || !showing) {
    return (
      <Results
        title={title}
        results={results}
        onAgain={(again) => {
          setQuestions(again);
          setIndex(0);
          setAnswers({});
          setNow(Date.now());
          setDeadline(
            seconds === null ? null : Date.now() + again.length * SECONDS_PER_TIMED_QUESTION * 1000,
          );
          setFinished(false);
        }}
        onDone={onExit}
      />
    );
  }

  const last = index === questions.length - 1;
  return (
    <section aria-label={title} className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <IconButton icon={X} label="End the session" variant="secondary" onClick={onExit} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="truncate font-semibold text-ink">{title}</span>
            <span className="shrink-0 text-fg-muted">
              {index + 1} of {questions.length}
            </span>
          </div>
          <progress
            aria-label="Questions answered"
            value={Object.keys(answers).length}
            max={questions.length}
            className="progress-bar"
          />
        </div>
        {streak >= 2 ? (
          <span className="flex shrink-0 animate-rise items-center gap-1 rounded-full bg-gloss px-3 py-1 text-sm font-semibold text-gold-ink shadow-glass">
            <Icon icon={Flame} size="sm" />
            {streak} in a row
          </span>
        ) : null}
        {left === null ? null : (
          <span
            role="timer"
            aria-label="Time left"
            className={cx(
              'flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold tabular-nums',
              left <= 60 ? 'bg-danger-subtle text-danger' : 'bg-surface-muted text-ink',
            )}
          >
            <Icon icon={Timer} size="sm" />
            {clock(left)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-glass-border bg-glass p-6 shadow-glass">
        <Eyebrow>{showing.topic.title}</Eyebrow>
        <QuestionCard
          key={showing.question.id}
          prompt={showing.question.prompt}
          options={showing.question.options}
          answerId={showing.question.answerId}
          explanation={showing.question.explanation}
          onAnswered={(correct) => {
            setAnswers({ ...answers, [showing.question.id]: correct });
            recordAnswer(showing.question.id, correct);
          }}
        />
      </div>
      {answered === undefined ? null : (
        <Button
          iconEnd={ArrowRight}
          className="self-end"
          onClick={() => (last ? finish() : setIndex(index + 1))}
        >
          {last ? 'See how you did' : 'Next question'}
        </Button>
      )}
    </section>
  );
}
