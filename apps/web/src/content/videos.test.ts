import { describe, expect, it } from 'vitest';

import { TOPICS } from './topics';
import { videoMinutes, VIDEOS, videosOf } from './videos';

describe('videos', () => {
  it('belong to real topics, with well-formed ids and lengths', () => {
    const slugs = new Set(TOPICS.map((topic) => topic.slug));
    for (const [slug, videos] of Object.entries(VIDEOS)) {
      expect(slugs).toContain(slug);
      for (const video of videos) {
        expect(video.id).toMatch(/^[\w-]{11}$/);
        expect(video.seconds).toBeGreaterThan(0);
      }
    }
  });

  it('gives every topic a lecture, and rounds lengths up to whole minutes', () => {
    for (const topic of TOPICS) expect(videosOf(topic.slug).length).toBeGreaterThan(0);
    expect(videoMinutes({ id: 'hrKesc_XSzo', title: '', channel: '', seconds: 513 })).toBe(9);
    expect(videosOf('no-such-topic')).toEqual([]);
  });
});
