import { SkyBackdrop } from '@medlearn/ui';
import type { ReactNode } from 'react';

import { OfflineBanner } from '@/features/offline/Offline';
import { AppNav } from '@/features/shell/AppNav';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    // Phones keep content clear of the bottom tab bar; tablets and up clear the side rail.
    <div className="min-h-dvh pb-tabbar md:pb-0 md:pl-20">
      <SkyBackdrop />
      <AppNav />
      <main className="px-4 pt-8 pb-8 md:px-8 md:pt-12 md:pb-12">
        <div className="mx-auto mb-6 max-w-2xl empty:hidden">
          <OfflineBanner />
        </div>
        {children}
      </main>
    </div>
  );
}
