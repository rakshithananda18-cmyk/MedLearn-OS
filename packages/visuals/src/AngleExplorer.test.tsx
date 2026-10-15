import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AngleExplorer } from './AngleExplorer';
import { ANGLES, boneEnd, zoneAt } from './angles';

describe('angles', () => {
  it('names the zone an angle falls in, each spec covering its whole range', () => {
    const femur = ANGLES['neck-shaft'];
    expect(zoneAt(femur, 110).name).toBe('Coxa vara');
    expect(zoneAt(femur, 125).normal).toBe(true);
    expect(zoneAt(femur, 140).normal).toBe(false);
    for (const spec of Object.values(ANGLES)) {
      expect(spec.zones.at(-1)?.upTo).toBe(spec.max);
      expect(zoneAt(spec, spec.start).normal).toBe(true);
    }
  });

  it('draws a bone turned from straight down, towards the midline or away', () => {
    expect(boneEnd([0, 0], 10, 0).map(Math.round)).toEqual([0, 10]);
    expect(boneEnd([0, 0], 10, 90).map(Math.round)).toEqual([-10, 0]);
    expect(boneEnd([0, 0], 10, 90, -1).map(Math.round)).toEqual([10, 0]);
  });
});

describe('AngleExplorer', () => {
  it('starts at the usual adult angle and says what each angle means', async () => {
    const { container } = render(<AngleExplorer spec={ANGLES.carrying} />);
    expect(
      screen.getByRole('img', { name: 'Carrying angle of the elbow: 13 degrees, Normal' }),
    ).toBeInTheDocument();
    await expectNoA11yViolations(container);

    fireEvent.change(screen.getByRole('slider', { name: /Carrying angle/ }), {
      target: { value: '28' },
    });
    expect(screen.getByText('Cubitus valgus')).toBeInTheDocument();
    expect(screen.getByText(/ulnar nerve/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('slider', { name: /Carrying angle/ }), {
      target: { value: '-10' },
    });
    expect(screen.getByText('Cubitus varus')).toBeInTheDocument();
    expect(screen.getByText('−10°')).toBeInTheDocument();
  });
});
