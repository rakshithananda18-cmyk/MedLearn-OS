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
        <Display size="lg">
          This page needs a <em>connection</em>
        </Display>
        <Text tone="muted">
          This page has not been opened on this device yet. Previously opened pages may still be
          available. Your locally saved study progress remains on this device.
        </Text>
      </div>
      <div>
        <Link href="/today" className={buttonClasses()}>
          Go to Today
        </Link>
      </div>
    </Screen>
  );
}
