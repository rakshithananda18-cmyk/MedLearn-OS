'use client';

import { Badge, Button, Card, Display, Eyebrow, Text } from '@medlearn/ui';
import { useState } from 'react';

import { replaceProgress, useProgress } from '@/features/progress/store';

import { SCENARIOS } from './scenarios';

/**
 * Prototype-only screen for usability sessions: puts the student's phone into the state a task
 * needs. Not linked from the app; the facilitator types the address.
 */
export function FacilitatorView() {
  const progress = useProgress();
  const [applied, setApplied] = useState<string | null>(null);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-6 px-4 py-8 md:py-16">
      <div className="flex flex-col gap-3">
        <Eyebrow>Usability sessions</Eyebrow>
        <Display size="lg">
          Facilitator <em>setup</em>
        </Display>
        <Text tone="muted">
          Choose the state this phone needs before handing it back to the student. Only data on this
          device changes.
        </Text>
      </div>

      <ul className="flex flex-col gap-3">
        {SCENARIOS.map((scenario) => (
          <li key={scenario.id}>
            <Card tone="glass" className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
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
                  aria-label={`Apply: ${scenario.title}`}
                  onClick={() => {
                    replaceProgress(scenario.build(new Date()));
                    setApplied(scenario.title);
                  }}
                >
                  Apply
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <div role="status" className="text-sm font-semibold text-ink">
        {applied ? `${applied} is set. Open /today on this phone.` : ''}
      </div>

      <Card
        tone="glass"
        as="section"
        aria-labelledby="device-state"
        className="flex flex-col gap-1"
      >
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
