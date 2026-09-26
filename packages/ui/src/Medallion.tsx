import { cx } from './cx';
import { Icon, type IconGlyph } from './Icon';

export interface MedallionProps {
  icon: IconGlyph;
  size?: 'md' | 'lg';
}

/** A round icon holder with a thin gold ring, for plan cards and completion moments. */
export function Medallion({ icon, size = 'md' }: MedallionProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex shrink-0 items-center justify-center rounded-full border border-gold bg-glass text-gold-ink shadow-glass',
        size === 'md' ? 'size-12' : 'size-20',
      )}
    >
      <Icon icon={icon} size="lg" />
    </span>
  );
}
