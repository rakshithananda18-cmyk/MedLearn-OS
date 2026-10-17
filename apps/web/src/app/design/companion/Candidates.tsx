'use client';

import { Button, Card, Heading, Stack, Text, ThemeToggle, ToggleChip } from '@medlearn/ui';
import { Play } from '@medlearn/ui/icons';
import { useEffect, useState } from 'react';

import { Mascot, type Mood, MOODS, type Species } from '@/features/companion/Mascot';

const CANDIDATES: readonly { species: Species; names: string; idea: string }[] = [
  {
    species: 'atlas',
    names: 'Atlas, or Verty',
    idea: 'A vertebra seen from the front: articular processes for ears, transverse processes for arms, standing on its disc. Anatomy at first glance, and the first vertebra holds up the head.',
  },
  {
    species: 'neura',
    names: 'Neura, or Axo',
    idea: 'A neuron: dendrites for hair and arms, an axon with myelin and end bulbs for a tail. Thinking and firing come naturally, and it carries on into physiology.',
  },
  {
    species: 'pulse',
    names: 'Pulse, or Cardi',
    idea: 'A heart with its aortic arch, three branches and pulmonary trunk on top. Warm and easy to remember; its beat makes an easy sign of life.',
  },
];

/** A short scene, to see the moods change into one another. */
const SCENE: readonly Mood[] = ['curious', 'thinking', 'encouraging', 'happy', 'proud', 'calm'];

function Candidate({ species, names, idea }: (typeof CANDIDATES)[number]) {
  const [picked, setPicked] = useState<Mood>('calm');
  const [scene, setScene] = useState<number | null>(null);
  const mood = scene === null ? picked : (SCENE[scene] ?? picked);

  useEffect(() => {
    if (scene === null) return;
    const next = window.setTimeout(
      () => setScene(scene + 1 < SCENE.length ? scene + 1 : null),
      1600,
    );
    return () => window.clearTimeout(next);
  }, [scene]);

  const name = names.split(',')[0] ?? names;
  return (
    <section aria-label={name}>
      <Card>
        <Stack gap={4}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-ink">
              <Mascot species={species} mood={mood} size={200} name={name} />
            </div>
            <Stack gap={2} className="min-w-0 flex-1 basis-64">
              <Heading level={2}>{names}</Heading>
              <Text size="sm" tone="muted">
                {idea}
              </Text>
              <div>
                <Button
                  variant="secondary"
                  iconStart={Play}
                  disabled={scene !== null}
                  onClick={() => setScene(0)}
                >
                  Play a moment
                </Button>
              </div>
            </Stack>
          </div>
          <div role="group" aria-label={`${name}'s mood`} className="flex flex-wrap gap-2">
            {MOODS.map((item) => (
              <ToggleChip
                key={item.id}
                pressed={mood === item.id}
                onClick={() => {
                  setScene(null);
                  setPicked(item.id);
                }}
              >
                {item.label}
              </ToggleChip>
            ))}
          </div>
          <ul className="grid grid-cols-3 gap-2 text-ink sm:grid-cols-5 lg:grid-cols-9">
            {MOODS.map((item) => (
              <li key={item.id} className="flex flex-col items-center gap-1">
                <Mascot species={species} mood={item.id} size={88} name={name} />
                <Text size="xs" tone="muted">
                  {item.label}
                </Text>
              </li>
            ))}
          </ul>
        </Stack>
      </Card>
    </section>
  );
}

/** The companion's three candidate looks, each in every mood, for the founder to choose from. */
export function Candidates() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
      <Stack direction="row" justify="between" align="center" wrap gap={4}>
        <div className="flex flex-col gap-1">
          <Heading level={1}>Study companion: three looks</Heading>
          <Text tone="muted">
            One face and nine moods, shared by every look. Choose a look and a name; the others go.
          </Text>
        </div>
        <ThemeToggle />
      </Stack>
      <Card>
        <Stack gap={2}>
          <Heading level={2}>When each mood shows</Heading>
          <ul className="grid gap-1 text-sm sm:grid-cols-3">
            {MOODS.map((item) => (
              <li key={item.id}>
                <span className="font-semibold text-ink">{item.label}:</span>{' '}
                <span className="text-fg-muted">{item.when}</span>
              </li>
            ))}
          </ul>
        </Stack>
      </Card>
      {CANDIDATES.map((candidate) => (
        <Candidate key={candidate.species} {...candidate} />
      ))}
    </main>
  );
}
