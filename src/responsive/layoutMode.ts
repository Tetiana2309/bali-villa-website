/*
 * Layout mode is decided ONCE, before React renders (see main.tsx).
 *
 *   desktop  >= 1600px  existing 1920 design, untouched code path
 *   compact  768-1599px 1920 design shown through CompactApp
 *   mobile   <  768px   (not built yet - currently falls back to desktop)
 */

export const DESKTOP_MIN_WIDTH = 1600
export const COMPACT_MIN_WIDTH = 768

export type LayoutMode = 'desktop' | 'compact' | 'mobile'

export function getLayoutMode(
  width: number = window.innerWidth,
): LayoutMode {
  /*
   * CompactApp renders the desktop app inside a 1920px iframe.
   * A framed document must never start its own compact shell.
   */
  if (window.self !== window.top) {
    return 'desktop'
  }

  if (width >= DESKTOP_MIN_WIDTH) {
    return 'desktop'
  }

  if (width >= COMPACT_MIN_WIDTH) {
    return 'compact'
  }

  return 'mobile'
}

/*
 * The mode is fixed at load. If the window later crosses a
 * breakpoint, reload so the page boots cleanly in the new mode.
 * Passive: does nothing until a breakpoint is actually crossed.
 */
export function reloadOnLayoutModeChange(initial: LayoutMode) {
  const queries = [
    `(min-width: ${DESKTOP_MIN_WIDTH}px)`,
    `(min-width: ${COMPACT_MIN_WIDTH}px)`,
  ].map((query) => window.matchMedia(query))

  const onChange = () => {
    if (getLayoutMode() !== initial) {
      window.location.reload()
    }
  }

  queries.forEach((query) =>
    query.addEventListener('change', onChange),
  )
}
