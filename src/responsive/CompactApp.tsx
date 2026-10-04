import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

const BACKGROUND = '#DDE4EE'

function readFrameMetrics() {
  const scale = window.innerWidth / DESIGN_WIDTH

  return {
    scale,
    /*
     * The frame is a real 1920px-wide viewport, tall enough
     * that after scaling it covers the whole window.
     */
    height: Math.ceil(window.innerHeight / scale),
  }
}

/*
 * ==========================================
 * COMPACT DESKTOP (768 - 1599px)
 * ==========================================
 *
 * The approved 1920 site is rendered, unchanged, inside a
 * 1920px-wide iframe that is scaled down with a transform.
 *
 * Inside the frame the page sees a genuine 1920px viewport, so
 * every GSAP timeline, ScrollTrigger pin distance, Lenis setting
 * and navigation transition runs with exactly the same numbers
 * as on a 1920x1080 screen.
 *
 * (CSS `zoom` cannot be used here: ScrollTrigger measures pins in
 * screen pixels but writes them back as CSS pixels, so any zoom
 * other than 1 scales pinned elements and spacers twice.)
 * ==========================================
 */
export default function CompactApp() {
  const [metrics, setMetrics] = useState(readFrameMetrics)

  useEffect(() => {
    const root = document.documentElement
    const previousOverflow = root.style.overflow

    root.style.overflow = 'hidden'

    const onResize = () => setMetrics(readFrameMetrics())

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      root.style.overflow = previousOverflow
    }
  }, [])

  const src = `${window.location.pathname}${window.location.search}`

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: BACKGROUND,
      }}
    >
      <iframe
        title="Bali Villa"
        src={src}
        onLoad={(event) => event.currentTarget.contentWindow?.focus()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: DESIGN_WIDTH,
          height: metrics.height,
          border: 0,
          display: 'block',
          backgroundColor: BACKGROUND,
          transform: `scale(${metrics.scale})`,
          transformOrigin: '0 0',
        }}
      />
    </div>
  )
}
