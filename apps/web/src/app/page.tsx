import { buttonClasses, Heading, Stack, Text } from '@medlearn/ui';
import Link from 'next/link';

/** Landing page. The study screens live under /today. */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 px-4 py-8">
      <Stack gap={2}>
        <Heading level={1}>MedLearn OS</Heading>
        <Text tone="muted">
          The daily learning system for MBBS students: what to study today, visual lessons, practice
          and spaced recall.
        </Text>
      </Stack>
      <div>
        <Link href="/today" className={buttonClasses()}>
          Open today&apos;s plan
        </Link>
      </div>
    </main>
  );
}
