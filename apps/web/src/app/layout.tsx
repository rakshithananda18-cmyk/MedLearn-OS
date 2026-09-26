import './globals.css';

import { themeScript } from '@medlearn/ui';
import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Noto_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import { ProgressSync } from '@/features/sync/ProgressSync';

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto-sans', display: 'swap' });
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
        {children}
      </body>
    </html>
  );
}
