// Shared geometry for the rounded node labels drawn in pathway diagrams.
export const LINE_HEIGHT = 14;
export const HIT_HEIGHT = 44;
const CHAR_WIDTH = 6.5;
const PADDING = 12;

export function pillSize(label: string) {
  const lines = label.split('\n');
  const longest = Math.max(...lines.map((line) => line.length));
  return {
    lines,
    width: Math.max(28, longest * CHAR_WIDTH + PADDING),
    height: lines.length * LINE_HEIGHT + 10,
  };
}
