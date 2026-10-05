import {
  Children,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { SliderControlContext } from '../hooks/useSliderControl'

interface MobileSliderProps {
  label: string
  index: number
  onIndexChange: (index: number) => void
  className?: string
  /** Rendered inside the slider context, after the track (e.g. shared pagination). */
  after?: ReactNode
  children: ReactNode
}

/*
 * Native horizontal slider: CSS scroll-snap does the swiping, so touch
 * gestures stay fully native and Lenis never sees them.
 */
export function MobileSlider({
  label,
  index,
  onIndexChange,
  className = '',
  after,
  children,
}: MobileSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const indexRef = useRef(index)
  const onChangeRef = useRef(onIndexChange)

  const slides = Children.toArray(children)
  const count = slides.length

  useEffect(() => {
    indexRef.current = index
    onChangeRef.current = onIndexChange
  })

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current

      if (!track) {
        return
      }

      const next = Math.max(0, Math.min(count - 1, target))
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      track.scrollTo({
        left: next * track.clientWidth,
        behavior: reduced ? 'auto' : 'smooth',
      })
    },
    [count],
  )

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current)

    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current

      if (!track || !track.clientWidth) {
        return
      }

      const next = Math.max(
        0,
        Math.min(count - 1, Math.round(track.scrollLeft / track.clientWidth)),
      )

      if (next !== indexRef.current) {
        indexRef.current = next
        onChangeRef.current(next)
      }
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(indexRef.current + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(indexRef.current - 1)
    }
  }

  /* Keep the active slide aligned when the viewport width changes. */
  useEffect(() => {
    const realign = () => {
      const track = trackRef.current

      if (track) {
        track.scrollLeft = indexRef.current * track.clientWidth
      }
    }

    window.addEventListener('resize', realign)

    return () => {
      window.removeEventListener('resize', realign)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const control = useMemo(() => ({ goTo }), [goTo])

  return (
    <SliderControlContext.Provider value={control}>
      <div
        ref={trackRef}
        className={`m-slider ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className="m-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${count}`}
            inert={slideIndex !== index}
          >
            {slide}
          </div>
        ))}
      </div>

      {after}
    </SliderControlContext.Provider>
  )
}
