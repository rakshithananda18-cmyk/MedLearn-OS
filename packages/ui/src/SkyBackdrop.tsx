/**
 * The calm sky behind study screens: fixed, decorative and hidden from assistive technology.
 * Drawn with CSS gradients only, so it costs no download and never repaints on scroll.
 */
export function SkyBackdrop() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-sky" />;
}
