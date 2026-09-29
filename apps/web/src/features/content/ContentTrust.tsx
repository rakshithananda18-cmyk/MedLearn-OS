'use client';

import { BottomSheet, Button, Icon, Text } from '@medlearn/ui';
import { BookMarked, ExternalLink } from '@medlearn/ui/icons';
import type { ReactNode } from 'react';

import type { TopicTrust } from '@/content/topics';

import { ReportIssueForm } from './ReportIssueForm';
import { SampleContentBanner } from './SampleContentBanner';

/**
 * Trust around every piece of content: the review label, and one tap to the source drawer
 * (sources, review status, version) with "report an issue". Anything passed in (such as where
 * to read it) sits at the end of the same row.
 */
export function ContentTrust({
  topic,
  children,
}: Readonly<{ topic: TopicTrust; children?: ReactNode }>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SampleContentBanner reviewed={topic.reviewed} />
      <div>
        <BottomSheet
          title="Sources"
          description={`${topic.title}, version ${topic.version}. ${
            topic.reviewed
              ? 'Approved by a medical reviewer.'
              : 'Not yet reviewed by a medical reviewer.'
          }`}
          trigger={
            <Button variant="ghost" size="sm" iconStart={BookMarked}>
              Sources and report
            </Button>
          }
        >
          <ul className="flex flex-col gap-3">
            {topic.sources.map((source) => (
              <li key={source.title} className="flex flex-col gap-1">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-primary-strong underline-offset-4 hover:underline"
                  >
                    {source.title}
                    <Icon icon={ExternalLink} size="sm" label="opens in a new tab" />
                  </a>
                ) : (
                  <Text weight="semibold">{source.title}</Text>
                )}
                {source.detail ? (
                  <Text size="sm" tone="muted">
                    {source.detail}
                  </Text>
                ) : null}
                <Text size="xs" tone="muted">
                  {source.licence}
                </Text>
              </li>
            ))}
          </ul>
          <hr className="border-border" />
          <ReportIssueForm topicSlug={topic.slug} contentVersion={topic.version} />
        </BottomSheet>
      </div>
      {children}
    </div>
  );
}
