import { SkyBackdrop } from '@medlearn/ui';
import type { ReactNode } from 'react';

import { OfflineBanner } from '@/features/offline/Offline';
import { AppNav } from '@/features/shell/AppNav';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    // Phones keep content clear of the bottom tab bar; tablets and up clear the floating rail.
    <div className="min-h-dvh pb-tabbar md:pb-0 md:pl-24">
      <SkyBackdrop />
      <AppNav />
      {/* Each screen sets its own gutters, so the 3D studio can fill the window edge to edge. */}
      <main>
        <div className="mx-auto max-w-3xl px-4 pt-4 empty:hidden md:px-6">
          <OfflineBanner />
        </div>
        {children}
      </main>
    </div>
  );
}
