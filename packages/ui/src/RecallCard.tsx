'use client';

import { useState } from 'react';

import { Button } from './Button';

export type RecallRating = 'again' | 'hard' | 'good' | 'easy';

const RATINGS: Array<{ value: RecallRating; label: string; hint: string }> = [
  { value: 'again', label: 'Again', hint: 'Forgot' },
  { value: 'hard', label: 'Hard', hint: 'Struggled' },
  { value: 'good', label: 'Good', hint: 'Recalled' },
  { value: 'easy', label: 'Easy', hint: 'Instant' },
];

export interface RecallCardProps {
  front: string;
  back: string;
  onRate: (rating: RecallRating) => void;
}

/** Active recall: try to answer, reveal, then rate how well you remembered. */
export function RecallCard({ front, back, onRate }: RecallCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section aria-label="Recall card" className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-ink">{front}</p>
      {revealed ? (
        <>
          <p className="rounded-md bg-surface-muted p-4 text-base text-fg">{back}</p>
          <div
            role="group"
            aria-label="How well did you remember?"
            className="grid grid-cols-2 gap-2 md:grid-cols-4"
          >
            {RATINGS.map(({ value, label, hint }) => (
              <Button
                key={value}
                variant={value === 'good' ? 'primary' : 'secondary'}
                onClick={() => {
                  setRevealed(false);
                  onRate(value);
                }}
                aria-label={`${label}: ${hint}`}
              >
                {label}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Button variant="secondary" onClick={() => setRevealed(true)}>
          Show answer
        </Button>
      )}
    </section>
  );
}
