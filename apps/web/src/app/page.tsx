import { Card, Display, Eyebrow, SkyBackdrop, Text, ThemeToggle } from '@medlearn/ui';
import { DissociationCurve } from '@medlearn/visuals';
import Link from 'next/link';

import { StartLink } from '@/features/onboarding/StartLink';

const PREVIEW = { pco2: 55, ph: 7.3, temperature: 39, bpg: 5 };

/** Landing page. The study screens live under /today. */
export default function HomePage() {
  return (
    <>
      <SkyBackdrop />
      <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-8 md:px-8">
        <p className="font-display text-2xl tracking-display text-gold">MedLearn OS</p>
        <div className="grid flex-1 items-center gap-8 py-8 md:py-12 lg:grid-cols-2">
          <div className="flex animate-rise flex-col items-start gap-4">
            <Eyebrow>For first-year MBBS</Eyebrow>
            <Display>
              Learn medicine, <em>visually</em>
            </Display>
            <Text tone="muted" className="max-w-md text-lg">
              One calm plan a day: visual lessons, practice questions and spaced recall, sized to
              the time you have.
            </Text>
            <StartLink />
            <Text size="sm" tone="muted">
              Current teaching preview centres on first-year anatomy. Each topic shows its review
              status and sources.
            </Text>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md">
              <Card>
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
        {/* Theme and sign-in also live on the Account screen. */}
        <footer className="flex flex-wrap items-center gap-3">
          <Text size="sm" tone="muted">
            Theme
          </Text>
          <ThemeToggle />
          <Link
            href="/account"
            className="ml-auto text-sm font-semibold text-primary-strong underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </footer>
      </main>
    </>
  );
}
