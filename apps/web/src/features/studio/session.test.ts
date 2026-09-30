import type { PartKind } from '@medlearn/schemas';
import { describe, expect, it } from 'vitest';

import { studioTopics } from '@/content/studio';

import { structuresOf } from './knowledge';
import {
  changeModeIn,
  hiddenIn,
  litIn,
  openTopicIn,
  pickIn,
  startSession,
  toggled,
} from './session';

const topics = studioTopics();
const vessels = topics.find((topic) => topic.slug === 'axillary-vessels') ?? null;
const context = {
  topic: vessels,
  regions: [{ id: 'upper-limb' as const }, { id: 'thorax' as const }],
  pool: vessels ? structuresOf(vessels).map((structure) => structure.id) : [],
};

describe('studio session', () => {
  it('starts on the whole body with the topics open, or on a topic with them closed', () => {
    expect(startSession(null, 'thorax', 'ink', [])).toMatchObject({
      topicSlug: null,
      region: 'thorax',
      panel: 'topics',
    });
    expect(startSession(vessels, 'thorax', 'ink', [])).toMatchObject({
      topicSlug: 'axillary-vessels',
      region: 'upper-limb',
      panel: null,
    });
  });

  it('picks a region on the body, a structure on a topic, and ignores taps on nothing', () => {
    const body = startSession(null, 'upper-limb', 'ink', []);
    const bodyContext = { ...context, topic: null };
    expect(pickIn(body, 'thorax', bodyContext)).toMatchObject({ region: 'thorax' });
    // A structure of one of the body's systems is picked; the skin picks nothing.
    const humerus = pickIn(body, 'skeleton/left-humerus', bodyContext);
    expect(humerus).toMatchObject({ region: 'upper-limb', selected: 'skeleton/left-humerus' });
    expect(pickIn(humerus, 'skin', bodyContext)).toMatchObject({ selected: null });

    const open = startSession(vessels, 'upper-limb', 'ink', []);
    expect(pickIn(open, 'subscapular-artery', context).selected).toBe('subscapular-artery');
  });

  it('lights an artery from the subclavian on, and hides the rest when isolating', () => {
    const open = pickIn(
      startSession(vessels, 'upper-limb', 'ink', []),
      'subscapular-artery',
      context,
    );
    const lit = litIn(open, vessels);
    expect(lit.has('subclavian-artery')).toBe(true);
    expect(lit.has('lateral-thoracic-artery')).toBe(false);
    expect(hiddenIn(open, lit, context.pool).size).toBe(0);
    expect(
      hiddenIn({ ...open, isolate: true }, lit, context.pool).has('lateral-thoracic-artery'),
    ).toBe(true);
  });

  it('plays "Find it" without hints, and switching again goes back to exploring', () => {
    const open = startSession(vessels, 'upper-limb', 'ink', []);
    const playing = changeModeIn(open, 'quiz', context, 4);
    expect(playing.quiz?.best).toBe(4);
    expect(litIn({ ...playing, selected: 'subscapular-artery' }, vessels).size).toBe(0);
    const answered = pickIn(playing, playing.quiz?.targetId ?? '', context);
    expect(answered.quiz?.score).toBe(1);
    expect(changeModeIn(answered, 'quiz', context, 4)).toMatchObject({
      mode: 'explore',
      quiz: null,
    });
  });

  it('opens another topic fresh but keeps the pen, x-ray and layers', () => {
    const busy = {
      ...startSession(vessels, 'upper-limb', 'violet', []),
      selected: 'subscapular-artery',
      xray: true,
      hiddenKinds: toggled(new Set<PartKind>(), 'muscle'),
    };
    const next = openTopicIn(busy, null, []);
    expect(next).toMatchObject({ topicSlug: null, selected: null, pen: 'violet', xray: true });
    expect(next.hiddenKinds.has('muscle')).toBe(true);
    expect(toggled(next.hiddenKinds, 'muscle').has('muscle')).toBe(false);
  });
});
