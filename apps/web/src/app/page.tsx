import { Card, Display, Eyebrow, Pill, SkyBackdrop, Text, ThemeToggle } from '@medlearn/ui';
import { Clock, PenLine, RotateCcw } from '@medlearn/ui/icons';
import { DissociationCurve } from '@medlearn/visuals';

import { StartLink } from '@/features/onboarding/StartLink';

const PREVIEW = { pco2: 55, ph: 7.3, temperature: 39, bpg: 5 };

/** Landing page. The study screens live under /today. */
export default function HomePage() {
  return (
    <>
      <SkyBackdrop />
      <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-8 md:px-8">
        <p className="font-display text-2xl tracking-display text-gold">MedLearn OS</p>
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-2">
          <div className="flex animate-rise flex-col items-start gap-6">
            <Eyebrow>For first-year MBBS</Eyebrow>
            <Display>
              Learn medicine, <em>visually</em>
            </Display>
            <Text tone="muted" className="max-w-md text-lg">
              One calm plan a day: visual lessons, practice questions and spaced recall, sized to
              the time you have.
            </Text>
            <div className="flex flex-wrap gap-2">
              <Pill icon={Clock}>15-minute lessons</Pill>
              <Pill icon={RotateCcw}>Spaced recall</Pill>
              <Pill icon={PenLine}>Exam diagrams</Pill>
            </div>
            <StartLink />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md animate-float">
              <Card tone="glass">
                <DissociationCurve
                  conditions={PREVIEW}
                  title="Preview: the oxygen–haemoglobin curve shifting right in exercising muscle"
                />
              </Card>
            </div>
            {/* The soft shadow the card floats above. */}
            <div
              aria-hidden="true"
              className="h-4 w-2/3 rounded-full bg-scrim opacity-20 blur-md"
            />
          </div>
        </div>
        {/* ponytail: the only theme switch until the "Me" settings screen arrives in M4. */}
        <footer className="flex flex-wrap items-center gap-3">
          <Text size="sm" tone="muted">
            Theme
          </Text>
          <ThemeToggle />
        </footer>
      </main>
    </>
  );
}
