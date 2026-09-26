'use client';

import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { useId } from 'react';

import { Icon } from './Icon';
import { Check } from './icons';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function Checkbox({ label, id, onCheckedChange, ...props }: CheckboxProps) {
  const autoId = useId();
  const boxId = id ?? autoId;

  return (
    <div className="flex items-center gap-3">
      <CheckboxPrimitive.Root
        id={boxId}
        onCheckedChange={(state) => onCheckedChange?.(state === true)}
        className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface text-on-primary transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:border-primary aria-checked:bg-primary"
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <Icon icon={Check} size="sm" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label htmlFor={boxId} className="text-base text-fg">
        {label}
      </label>
    </div>
  );
}
