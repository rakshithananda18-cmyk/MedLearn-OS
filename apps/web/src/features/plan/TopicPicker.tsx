'use client';

import { Button, cx, Icon } from '@medlearn/ui';
import { Check, ChevronDown } from '@medlearn/ui/icons';
import { useState } from 'react';

import { type LibraryNode, type LibraryTopic, topicsUnder } from '@/content/library';

/**
 * Topics chosen from the library, the way the library is laid out: body region, then book
 * section, then topic, each with a way to choose it all. Topics that cannot be chosen (not learnt
 * yet, for a revisit) are shown but locked.
 */
export function TopicPicker({
  tree,
  chosen,
  onChange,
  can = () => true,
  learnt,
}: Readonly<{
  tree: LibraryNode[];
  chosen: string[];
  onChange: (slugs: string[]) => void;
  can?: (slug: string) => boolean;
  /** Topics already learnt, marked with a tick. */
  learnt: readonly string[];
}>) {
  const [opened, setOpened] = useState<string[]>([]);
  const order = tree.flatMap((node) => topicsUnder(node).map((topic) => topic.slug));
  const set = (slugs: string[], on: boolean) => {
    const open = slugs.filter(can);
    onChange(order.filter((slug) => (open.includes(slug) ? on : chosen.includes(slug))));
  };
  // Regions hold sections; topics outside the book sit together at the end.
  const regions = tree.filter((node) => node.kind === 'branch');
  const loose = tree.filter((node): node is LibraryTopic => node.kind === 'topic');
  const groups = [
    ...regions.map((region) => ({
      id: region.id,
      label: region.label,
      sections: region.children.map((child) => ({
        id: child.kind === 'branch' ? child.id : child.slug,
        label: child.kind === 'branch' ? child.label : child.title,
        topics: topicsUnder(child),
      })),
    })),
    ...(loose.length > 0
      ? [
          {
            id: 'more',
            label: 'More subjects',
            sections: [{ id: 'more', label: '', topics: loose }],
          },
        ]
      : []),
  ];

  const chooser = (label: string, slugs: string[]) => {
    const open = slugs.filter(can);
    const all = open.length > 0 && open.every((slug) => chosen.includes(slug));
    return (
      <Button
        size="sm"
        variant="ghost"
        disabled={open.length === 0}
        aria-label={`${all ? 'None of' : 'All of'} ${label}`}
        onClick={() => set(slugs, !all)}
      >
        {all ? 'None' : 'All'}
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => {
        const slugs = group.sections.flatMap((section) =>
          section.topics.map((topic) => topic.slug),
        );
        const picked = slugs.filter((slug) => chosen.includes(slug)).length;
        const open = opened.includes(group.id);
        return (
          <section
            key={group.id}
            aria-label={group.label}
            className="rounded-lg border border-border bg-surface"
          >
            <div className="flex items-center gap-2 px-2">
              <button
                type="button"
                aria-expanded={open}
                onClick={() =>
                  setOpened(open ? opened.filter((id) => id !== group.id) : [...opened, group.id])
                }
                className="flex min-h-12 flex-1 items-center gap-2 rounded-md px-2 text-left hover:bg-surface-muted"
              >
                <Icon
                  icon={ChevronDown}
                  size="sm"
                  className={cx('transition-transform', !open && '-rotate-90')}
                />
                <span className="flex-1 font-semibold text-ink">{group.label}</span>
                <span className="text-xs text-fg-muted">
                  {picked} of {slugs.length}
                </span>
              </button>
              {chooser(group.label, slugs)}
            </div>
            <div hidden={!open} className="flex flex-col gap-3 border-t border-border px-4 py-3">
              {group.sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-2">
                  {section.label ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-fg">{section.label}</span>
                      {chooser(
                        section.label,
                        section.topics.map((topic) => topic.slug),
                      )}
                    </div>
                  ) : null}
                  <ul className="flex flex-wrap gap-2">
                    {section.topics.map((topic) => {
                      const on = chosen.includes(topic.slug);
                      const locked = !can(topic.slug);
                      return (
                        <li key={topic.slug}>
                          <button
                            type="button"
                            aria-pressed={on}
                            disabled={locked}
                            onClick={() => set([topic.slug], !on)}
                            className={cx(
                              'flex min-h-8 items-center gap-1 rounded-full px-3 py-1 text-sm',
                              on
                                ? 'bg-ink font-semibold text-canvas'
                                : 'border border-border-strong text-ink hover:bg-surface-muted',
                              locked && 'cursor-not-allowed opacity-40',
                            )}
                          >
                            {learnt.includes(topic.slug) ? (
                              <Icon icon={Check} size="sm" label="learnt" />
                            ) : null}
                            {topic.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
