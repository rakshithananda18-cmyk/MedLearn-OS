import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Mascot, MOODS, type Species } from './Mascot';

describe('Mascot', () => {
  it('draws every look in every mood, each with its own face', () => {
    const looks: Species[] = ['atlas', 'neura', 'pulse'];
    for (const species of looks) {
      const faces = new Set<string>();
      for (const { id, label } of MOODS) {
        const { unmount } = render(<Mascot species={species} mood={id} name="Atlas" />);
        const drawn = screen.getByRole('img', { name: new RegExp(`${label.toLowerCase()}$`) });
        faces.add(drawn.innerHTML);
        unmount();
      }
      expect(faces.size).toBe(MOODS.length);
    }
  });

  it('says what it is and how it feels', () => {
    render(<Mascot species="neura" mood="sleepy" name="Neura" />);
    expect(screen.getByRole('img', { name: 'Neura, a neuron, sleepy' })).toBeInTheDocument();
  });
});
