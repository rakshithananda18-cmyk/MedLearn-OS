import { Icon } from '@medlearn/ui';
import { Search } from '@medlearn/ui/icons';

/** A search pill: the browser sends it to /search, so it works before any script loads. */
export function SearchPill({ className }: Readonly<{ className?: string }>) {
  return (
    <form action="/search" role="search" className={className}>
      <label className="flex h-12 items-center gap-2 rounded-full bg-gloss px-4 text-fg-muted shadow-glass focus-within:ring-2 focus-within:ring-focus">
        <Icon icon={Search} size="sm" />
        <span className="sr-only">Search topics, facts and questions</span>
        <input
          type="search"
          name="q"
          maxLength={100}
          placeholder="Search topics, structures, notes"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-fg-muted"
        />
      </label>
    </form>
  );
}
