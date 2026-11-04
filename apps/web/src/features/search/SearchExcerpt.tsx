/** Mark literal query words; React escapes the result, including any HTML in personal text. */
export function SearchExcerpt({ text, query }: Readonly<{ text: string; query: string }>) {
  const terms = query.match(/[\p{L}\p{N}]{2,}/gu) ?? [];
  if (!terms.length) return text;
  const expression = new RegExp(`(${terms.join('|')})`, 'giu');
  return text.split(expression).map((part, index) =>
    index % 2 ? (
      <mark key={index} className="bg-primary-subtle font-medium text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
