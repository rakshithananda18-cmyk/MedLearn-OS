'use client';

import { Switch as SwitchPrimitive } from 'radix-ui';
import { useId } from 'react';

export interface SwitchProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
}

/** An on/off setting that takes effect immediately (use a Checkbox inside forms). */
export function Switch({ label, id, ...props }: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? autoId;

  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={switchId} className="text-base text-fg">
        {label}
      </label>
      <SwitchPrimitive.Root
        id={switchId}
        className="flex h-8 w-12 shrink-0 items-center justify-start rounded-full bg-border-strong p-1 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:justify-end aria-checked:bg-primary"
        {...props}
      >
        <SwitchPrimitive.Thumb className="block size-6 rounded-full bg-surface shadow-raised" />
      </SwitchPrimitive.Root>
    </div>
  );
}
