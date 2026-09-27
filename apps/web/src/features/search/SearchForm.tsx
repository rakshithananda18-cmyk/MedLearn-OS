import { Button, TextField } from '@medlearn/ui';
import { Search } from '@medlearn/ui/icons';

/** A plain search form: the browser sends it to /search, so it works before any script loads. */
export function SearchForm({ defaultValue = '' }: Readonly<{ defaultValue?: string }>) {
  return (
    <form action="/search" role="search" className="flex items-end gap-2">
      <TextField
        label="Search topics, facts and questions"
        name="q"
        type="search"
        defaultValue={defaultValue}
        maxLength={100}
        className="flex-1"
      />
      <Button type="submit" iconStart={Search}>
        Search
      </Button>
    </form>
  );
}
