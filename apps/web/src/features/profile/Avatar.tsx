import { cx, Icon } from '@medlearn/ui';
import { User } from '@medlearn/ui/icons';

/**
 * The student's initials from the name they gave: the first letter of their first and last words
 * (Rakshith Ananda → RA, Priya → P), in capitals, in any script. None until they give a name.
 */
export function initialsOf(name: string | undefined): string | null {
  const letters = (name ?? '')
    .trim()
    .split(/\s+/u)
    .flatMap((word) => word.match(/\p{L}/u) ?? []);
  const [first] = letters;
  if (!first) return null;
  const last = letters.length > 1 ? letters.at(-1) : '';
  return `${first}${last}`.toLocaleUpperCase();
}

const SIZE = {
  sm: 'size-8 text-sm',
  md: 'size-12 text-xl',
  lg: 'size-24 text-4xl',
} as const;

/** The student as a gold ring with their initials, or a person's outline before they give a name. */
export function Avatar({
  name,
  size = 'md',
}: Readonly<{ name: string | undefined; size?: keyof typeof SIZE }>) {
  const initials = initialsOf(name);
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex shrink-0 items-center justify-center rounded-full border border-gold bg-gloss font-display text-gold-ink shadow-glass',
        SIZE[size],
      )}
    >
      {initials ?? <Icon icon={User} size={size === 'lg' ? 'lg' : 'sm'} />}
    </span>
  );
}
