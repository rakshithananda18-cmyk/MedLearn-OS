'use client';

import { useId, useState } from 'react';

import { cx } from './cx';
import { Icon } from './Icon';
import { CircleAlert, CircleCheck } from './icons';

export interface QuestionCardProps {
  prompt: string;
  options: Array<{ id: string; text: string }>;
  answerId: string;
  explanation: string;
  onAnswered?: (correct: boolean) => void;
}

/** A multiple-choice question: pick once, then see whether it was right and why. */
export function QuestionCard({
  prompt,
  options,
  answerId,
  explanation,
  onAnswered,
}: QuestionCardProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  const promptId = useId();
  const answered = chosen !== null;
  const correct = chosen === answerId;

  const choose = (id: string) => {
    if (answered) return;
    setChosen(id);
    onAnswered?.(id === answerId);
  };

  return (
    <section aria-labelledby={promptId} className="flex flex-col gap-4">
      <p id={promptId} className="text-lg font-semibold text-ink">
        {prompt}
      </p>
      <ul className="flex flex-col gap-2">
        {options.map((option) => {
          const isAnswer = answered && option.id === answerId;
          const isWrongChoice = answered && option.id === chosen && !correct;
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => choose(option.id)}
                disabled={answered}
                aria-pressed={option.id === chosen}
                className={cx(
                  'flex min-h-12 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-base transition-colors duration-150',
                  !answered && 'border-border-strong bg-surface text-fg hover:bg-surface-muted',
                  answered &&
                    !isAnswer &&
                    !isWrongChoice &&
                    'border-border bg-surface text-fg-muted',
                  isAnswer && 'border-success bg-success-subtle text-success',
                  isWrongChoice && 'border-danger bg-danger-subtle text-danger',
                )}
              >
                <span>{option.text}</span>
                {isAnswer ? <Icon icon={CircleCheck} label="Correct answer" /> : null}
                {isWrongChoice ? <Icon icon={CircleAlert} label="Your answer" /> : null}
              </button>
            </li>
          );
        })}
      </ul>
      <div role="status">
        {answered ? (
          <div className="flex flex-col gap-1 rounded-md bg-surface-muted p-4">
            <p className={cx('font-semibold', correct ? 'text-success' : 'text-danger')}>
              {correct ? 'Correct' : 'Not quite'}
            </p>
            <p className="text-base text-fg">{explanation}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
