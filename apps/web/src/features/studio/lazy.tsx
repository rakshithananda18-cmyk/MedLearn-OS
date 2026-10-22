'use client';

import dynamic from 'next/dynamic';

// Opened on request (the flat diagram, the X-ray films), so they load then, not with the studio.
export const PathTracer = dynamic(() => import('@medlearn/visuals').then((m) => m.PathTracer));
export const XrayViewer = dynamic(() => import('./XrayViewer').then((m) => m.XrayViewer));
