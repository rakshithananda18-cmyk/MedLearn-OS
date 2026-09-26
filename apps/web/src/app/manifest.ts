import type { MetadataRoute } from 'next';

/** Lets students install MedLearn OS on their home screen; it opens on Today. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MedLearn OS',
    short_name: 'MedLearn',
    description: 'The daily learning system for MBBS students.',
    id: '/',
    start_url: '/today',
    scope: '/',
    display: 'standalone',
    // The Calm Sky, so the splash screen and status bar match the app.
    background_color: '#edf3f5',
    theme_color: '#cfe2ee',
    categories: ['education', 'medical'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // The mark sits inside the safe zone, so the same image can be masked to any shape.
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
