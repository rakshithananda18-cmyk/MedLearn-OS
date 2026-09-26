import { buttonClasses, Display, Eyebrow, Text } from '@medlearn/ui';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = {
  title: 'Offline | MedLearn OS',
  robots: { index: false },
};

/** Shown by the service worker, while offline, for a page this phone has not opened yet. */
export default function OfflinePage() {
  return (
    <Screen>
      <div className="flex flex-col gap-3">
        <Eyebrow>Offline</Eyebrow>
        <Display>
          This page needs a <em>connection</em>
        </Display>
        <Text tone="muted">
          It has not been opened on this phone yet. Pages you have opened before still work, and
          your progress is kept on this phone.
        </Text>
      </div>
      <div>
        <Link href="/today" className={buttonClasses({ variant: 'secondary' })}>
          Go to Today
        </Link>
      </div>
    </Screen>
  );
}
