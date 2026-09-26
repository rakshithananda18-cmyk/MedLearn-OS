import { Icon, type IconSize } from './Icon';
import { LoaderCircle } from './icons';

export interface SpinnerProps {
  /** Announced to screen readers. */
  label?: string;
  size?: IconSize;
}

export function Spinner({ label = 'Loading', size = 'md' }: SpinnerProps) {
  return (
    <span role="status" className="inline-flex text-current">
      <Icon icon={LoaderCircle} size={size} className="animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
