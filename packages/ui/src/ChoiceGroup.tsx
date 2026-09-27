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

export interface MultiChoiceGroupProps<T extends string> {
  /** What the choices are; read by screen readers as the group name. */
  legend: string;
  name: string;
  options: ChoiceOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
}

interface ChoiceCardProps<T extends string> {
  type: 'radio' | 'checkbox';
  name: string;
  option: ChoiceOption<T>;
  checked: boolean;
  onChange: () => void;
}

/** One large tappable card around a native input: a round tick for one choice, square for many. */
function ChoiceCard<T extends string>({
  type,
  name,
  option,
  checked,
  onChange,
}: ChoiceCardProps<T>) {
  return (
    <label
      className={cx(
        'relative flex min-h-16 cursor-pointer items-center gap-4 rounded-xl border bg-glass p-4 shadow-glass transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus',
        checked ? 'border-gold' : 'border-glass-border hover:border-border-strong',
      )}
    >
      <input
        type={type}
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
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
          'flex size-6 shrink-0 items-center justify-center border',
          type === 'radio' ? 'rounded-full' : 'rounded-sm',
          checked ? 'border-gold-ink bg-gold-ink text-on-primary' : 'border-border-strong',
        )}
      >
        {checked ? <Icon icon={Check} size="sm" /> : null}
      </span>
    </label>
  );
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
        {options.map((option) => (
          <ChoiceCard
            key={option.value}
            type="radio"
            name={name}
            option={option}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}

/** The same cards when any number can be picked, backed by native checkboxes. */
export function MultiChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: MultiChoiceGroupProps<T>) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const checked = value.includes(option.value);
          return (
            <ChoiceCard
              key={option.value}
              type="checkbox"
              name={name}
              option={option}
              checked={checked}
              onChange={() =>
                onChange(
                  checked
                    ? value.filter((item) => item !== option.value)
                    : [...value, option.value],
                )
              }
            />
          );
        })}
      </div>
    </fieldset>
  );
}
