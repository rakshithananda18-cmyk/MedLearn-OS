import { cx } from './cx';
import { Icon } from './Icon';
import { Check } from './icons';

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

export interface ChoiceGroupProps<T extends string> {
  /** Question the choices answer; read by screen readers as the group name. */
  legend: string;
  name: string;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
}

/** Large tappable answer cards backed by native radio buttons (arrow keys move between them). */
export function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: ChoiceGroupProps<T>) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={cx(
                'flex min-h-16 cursor-pointer items-center gap-4 rounded-xl border bg-glass p-4 shadow-glass transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus',
                checked ? 'border-gold' : 'border-glass-border hover:border-border-strong',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="flex flex-1 flex-col">
                <span className="font-semibold text-ink">{option.label}</span>
                {option.description ? (
                  <span className="text-sm text-fg-muted">{option.description}</span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className={cx(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border',
                  checked ? 'border-gold-ink bg-gold-ink text-on-primary' : 'border-border-strong',
                )}
              >
                {checked ? <Icon icon={Check} size="sm" /> : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
