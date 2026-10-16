import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { TOPICS } from './topics';

// Reviewers approve a topic version, so content must never change under the same version. This
// file records a fingerprint of every topic (everything but its version and reviewed flag:
// text, questions, diagram, model parts and labels, the model file's address). `pnpm
// content:versions` rewrites it after versions are bumped.
const MANIFEST = new URL('./content-versions.json', import.meta.url);

type Recorded = Record<string, { version: string; digest: string }>;

const digestOf = (topic: (typeof TOPICS)[number]) =>
  createHash('sha256')
    .update(JSON.stringify({ ...topic, version: undefined, reviewed: undefined }))
    .digest('hex')
    .slice(0, 16);

describe('topic versions', () => {
  const current: Recorded = Object.fromEntries(
    TOPICS.map((topic) => [topic.slug, { version: topic.version, digest: digestOf(topic) }]),
  );
  if (process.env.UPDATE_CONTENT_VERSIONS === '1') {
    writeFileSync(MANIFEST, `${JSON.stringify(current, null, 2)}\n`);
  }
  const recorded = JSON.parse(readFileSync(MANIFEST, 'utf8')) as Recorded;

  it('gives changed content a new version, so an approval never covers what was not checked', () => {
    const changedInPlace = TOPICS.filter((topic) => {
      const before = recorded[topic.slug];
      return before?.version === topic.version && before.digest !== current[topic.slug]?.digest;
    }).map((topic) => topic.slug);
    expect(changedInPlace, 'Bump these topics’ versions, then run pnpm content:versions').toEqual(
      [],
    );
  });

  it('has every topic’s version and fingerprint recorded', () => {
    expect(recorded, 'Run pnpm content:versions to record new topics and versions').toEqual(
      current,
    );
  });
});
