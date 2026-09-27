import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { readProgress, resetProgress, saveNote } from '@/features/progress/store';

import { TopicNotes } from './TopicNotes';

afterEach(() => act(() => resetProgress()));

describe('TopicNotes', () => {
  it('shows the saved note and saves changes when the student leaves the field', async () => {
    act(() => saveNote('brachial-plexus', 'Roots C5 to T1'));
    const { container } = render(<TopicNotes topicSlug="brachial-plexus" />);
    const field = screen.getByLabelText(/^Your notes on this topic/);
    expect(field).toHaveValue('Roots C5 to T1');
    await expectNoA11yViolations(container);

    await userEvent.type(field, '; Erb: upper trunk');
    await userEvent.tab();
    expect(readProgress().notes['brachial-plexus']?.text).toBe('Roots C5 to T1; Erb: upper trunk');
  });

  it('saves what was typed when the page closes before the pause', async () => {
    const { unmount } = render(<TopicNotes topicSlug="oxygen-haemoglobin-curve" />);
    await userEvent.type(screen.getByLabelText(/^Your notes on this topic/), 'P50 about 27');
    unmount();
    expect(readProgress().notes['oxygen-haemoglobin-curve']?.text).toBe('P50 about 27');
  });
});
