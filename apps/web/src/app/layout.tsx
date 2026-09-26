import './globals.css';

import { themeScript } from '@medlearn/ui';
import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Noto_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import { ServiceWorker } from '@/features/offline/Offline';
import { ProgressSync } from '@/features/sync/ProgressSync';

// Body text: 'optional' so a font arriving after the first paint never re-lays out every line (a
// long task on slow phones). The fallback's metrics are matched to Noto, and later visits use the
// cached font. Titles keep 'swap' below, so the display serif always shows.
const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'optional',
});
// Display serif for page titles only; latin subset keeps it small.
const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MedLearn OS',
  description: 'The daily learning system for MBBS students.',
};

// viewport-fit=cover lets the bars pad themselves around notches and home indicators.
export const viewport: Viewport = { viewportFit: 'cover' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-theme is set by the inline script before hydration, so React must not compare it.
    <html
      lang="en"
      className={`${notoSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ProgressSync />
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
