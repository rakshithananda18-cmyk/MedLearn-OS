import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { DissociationCurve } from './DissociationCurve';
import { type BloodConditions, NORMAL_BLOOD } from './oxygen';

function Harness() {
  const [conditions, setConditions] = useState<BloodConditions>(NORMAL_BLOOD);
  return <DissociationCurve conditions={conditions} title="Curve" onChange={setConditions} />;
}

describe('DissociationCurve', () => {
  it('describes the normal curve in text', async () => {
    const { container } = render(<Harness />);
    expect(screen.getByRole('img', { name: 'Curve' })).toBeInTheDocument();
    expect(screen.getByText(/P50 26\.8 mmHg, the normal curve/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Normal' })).toHaveAttribute('aria-pressed', 'true');
    await expectNoA11yViolations(container);
  });

  it('shifts right with a preset and reports more oxygen released', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Exercising muscle' }));
    expect(screen.getByRole('button', { name: 'Exercising muscle' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText(/shifted right: haemoglobin lets go of oxygen/)).toBeInTheDocument();
  });

  it('moves the curve with a slider', () => {
    render(<Harness />);
    fireEvent.change(screen.getByRole('slider', { name: /2,3-BPG/ }), { target: { value: '1.5' } });
    expect(screen.getByText(/shifted left: haemoglobin holds on to oxygen/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stored blood' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('is a static chart without controls when it cannot change', () => {
    render(<DissociationCurve conditions={NORMAL_BLOOD} title="Curve" />);
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });
});
