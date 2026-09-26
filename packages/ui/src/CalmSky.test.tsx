import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { ActionBar } from './ActionBar';
import { ChoiceGroup } from './ChoiceGroup';
import { Clock } from './icons';
import { Medallion } from './Medallion';
import { Pill } from './Pill';
import { SkyBackdrop } from './SkyBackdrop';
import { StepDots } from './StepDots';

// The Calm Sky pieces are small and presentational, so they share one test file.

describe('SkyBackdrop', () => {
  it('is decorative and never catches taps', () => {
    const { container } = render(<SkyBackdrop />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstChild).toHaveClass('bg-sky', 'pointer-events-none', 'fixed');
  });
});

describe('Pill and Medallion', () => {
  it('show text with a decorative icon', () => {
    const { container } = render(
      <>
        <Pill icon={Clock}>15 min</Pill>
        <Medallion icon={Clock} size="lg" />
      </>,
    );
    expect(screen.getByText('15 min')).toHaveClass('rounded-full', 'bg-glass');
    expect(container.querySelector('[aria-hidden="true"].size-20')).toBeInTheDocument();
  });
});

describe('StepDots', () => {
  it('announces the step and rings the current dot', () => {
    const { container } = render(<StepDots count={3} current={1} />);
    expect(screen.getByRole('img', { name: 'Step 2 of 3' })).toBeInTheDocument();
    const dots = container.querySelectorAll('span');
    expect(dots[1]).toHaveClass('ring-2');
    expect(dots[0]).toHaveClass('bg-gold-ink');
    expect(dots[2]).toHaveClass('bg-border-strong');
  });
});

describe('ActionBar', () => {
  it('sits in the flow by default and floats above the tab bar on request', () => {
    const { container, rerender } = render(<ActionBar>Next</ActionBar>);
    expect(container.firstChild).toHaveClass('sticky', 'bottom-tabbar');
    rerender(
      <ActionBar floating placement="edge">
        Next
      </ActionBar>,
    );
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Next').parentElement).toHaveClass('fixed', 'bottom-safe');
  });
});

function Choices() {
  const [value, setValue] = useState<'10' | '20' | null>(null);
  return (
    <ChoiceGroup
      legend="Daily time"
      name="minutes"
      value={value}
      onChange={setValue}
      options={[
        { value: '10', label: '10 minutes', description: 'Short' },
        { value: '20', label: '20 minutes' },
      ]}
    />
  );
}

describe('ChoiceGroup', () => {
  it('is a labelled radio group operable by tap and arrow keys', async () => {
    const { container } = render(<Choices />);
    expect(screen.getByRole('group', { name: 'Daily time' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('radio', { name: /10 minutes/ }));
    expect(screen.getByRole('radio', { name: /10 minutes/ })).toBeChecked();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: /20 minutes/ })).toBeChecked();
    await expectNoA11yViolations(container);
  });
});
