import { Display, EmptyState, Eyebrow, type IconGlyph } from '@medlearn/ui';
import { BookOpen, ClipboardCheck, Layers, RotateCcw, Search, Target } from '@medlearn/ui/icons';
import type { Metadata } from 'next';

import { type SearchKind, searchTopics } from '@/content/search';
import { SearchForm } from '@/features/search/SearchForm';
import { LinkCard } from '@/features/shell/LinkCard';
import { Screen } from '@/features/shell/Screen';

export const metadata: Metadata = { title: 'Search | MedLearn OS' };

const ICONS: Record<SearchKind, IconGlyph> = {
  Topic: BookOpen,
  'Key fact': Target,
  Lesson: Layers,
  Question: ClipboardCheck,
  'Recall card': RotateCcw,
};

interface Props {
  readonly searchParams: Promise<{ q?: string | string[] }>;
}

/** Results are found on the server; the page needs no script to search. */
export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? '';
  const results = query ? searchTopics(query) : [];

  return (
    <Screen>
      <div className="flex flex-col gap-3">
        <Eyebrow>Search</Eyebrow>
        <Display>
          Find it <em>fast</em>
        </Display>
      </div>
      <SearchForm defaultValue={query} />
      {query && results.length === 0 ? (
        <EmptyState
          icon={Search}
          title={`Nothing found for “${query}”`}
          description="Try fewer or different words, such as a nerve, a curve or a sign."
        />
      ) : null}
      {results.length > 0 ? (
        <ul aria-label={`Results for “${query}”`} className="flex flex-col gap-3">
          {results.map((result) => (
            <li key={`${result.href}-${result.kind}-${result.excerpt}`}>
              <LinkCard
                href={result.href}
                icon={ICONS[result.kind]}
                title={result.excerpt}
                meta={`${result.kind} · ${result.topicTitle}`}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </Screen>
  );
}
