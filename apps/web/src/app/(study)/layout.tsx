import type { ReactNode } from 'react';

import { AppNav } from '@/features/shell/AppNav';

export default function StudyLayout({ children }: { children: ReactNode }) {
  return (
    // Bottom padding keeps content clear of the phone tab bar.
    <div className="min-h-dvh pb-16 md:pb-0">
      <AppNav />
      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6">{children}</main>
    </div>
  );
}
