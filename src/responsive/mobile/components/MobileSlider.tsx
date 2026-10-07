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
  after?: ReactNode
  children: ReactNode
}

export function MobileSlider({
  label,
  index,
  onIndexChange,
  className = '',
  after,
  children,
}: MobileSliderProps) {
  const trackRef =
    useRef<HTMLDivElement>(null)

  const frameRef =
    useRef<number>(0)

  const indexRef =
    useRef(index)

  const onChangeRef =
    useRef(onIndexChange)

  const slides =
    Children.toArray(children)

  const count =
    slides.length

  /*
   * ==========================================
   * KEEP LATEST VALUES
   * ==========================================
   */

  useEffect(() => {
    indexRef.current =
      index

    onChangeRef.current =
      onIndexChange
  }, [
    index,
    onIndexChange,
  ])

  /*
   * ==========================================
   * UPDATE ACTIVE SLIDE
   * ==========================================
   *
   * IMPORTANT FOR IOS:
   *
   * We do NOT transform:
   *
   * - video
   * - img
   * - slide wrapper
   * - slider-inner
   *
   * Safari can have rendering / playback
   * problems when video is inside transformed
   * + clipped elements.
   * ==========================================
   */

  const updateIndex =
    useCallback(() => {
      const track =
        trackRef.current

      if (
        !track ||
        !track.clientWidth
      ) {
        return
      }

      const width =
        track.clientWidth

      const next =
        Math.max(
          0,
          Math.min(
            count - 1,
            Math.round(
              track.scrollLeft /
                width,
            ),
          ),
        )

      if (
        next ===
        indexRef.current
      ) {
        return
      }

      indexRef.current =
        next

      onChangeRef.current(
        next,
      )
    }, [count])

  /*
   * ==========================================
   * SCROLL
   * ==========================================
   */

  const handleScroll =
    useCallback(() => {
      cancelAnimationFrame(
        frameRef.current,
      )

      frameRef.current =
        requestAnimationFrame(
          () => {
            updateIndex()
          },
        )
    }, [updateIndex])

  /*
   * ==========================================
   * GO TO SLIDE
   * ==========================================
   */

  const goTo =
    useCallback(
      (
        target: number,
      ) => {
        const track =
          trackRef.current

        if (!track) {
          return
        }

        const next =
          Math.max(
            0,
            Math.min(
              count - 1,
              target,
            ),
          )

        const reduced =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches

        track.scrollTo({
          left:
            next *
            track.clientWidth,

          behavior:
            reduced
              ? 'auto'
              : 'smooth',
        })
      },
      [count],
    )

  /*
   * ==========================================
   * KEYBOARD
   * ==========================================
   */

  const handleKeyDown =
    (
      event:
        KeyboardEvent<HTMLDivElement>,
    ) => {
      if (
        event.key ===
        'ArrowRight'
      ) {
        event.preventDefault()

        goTo(
          indexRef.current +
            1,
        )

        return
      }

      if (
        event.key ===
        'ArrowLeft'
      ) {
        event.preventDefault()

        goTo(
          indexRef.current -
            1,
        )
      }
    }

  /*
   * ==========================================
   * REALIGN
   * ==========================================
   *
   * Keeps the active slide aligned after:
   *
   * - initial mount
   * - viewport resize
   * - Safari orientation change
   * ==========================================
   */

  useEffect(() => {
    const realign =
      () => {
        const track =
          trackRef.current

        if (
          !track ||
          !track.clientWidth
        ) {
          return
        }

        track.scrollLeft =
          indexRef.current *
          track.clientWidth
      }

    const initialFrame =
      requestAnimationFrame(
        realign,
      )

    window.addEventListener(
      'resize',
      realign,
    )

    window.addEventListener(
      'orientationchange',
      realign,
    )

    return () => {
      cancelAnimationFrame(
        initialFrame,
      )

      cancelAnimationFrame(
        frameRef.current,
      )

      window.removeEventListener(
        'resize',
        realign,
      )

      window.removeEventListener(
        'orientationchange',
        realign,
      )
    }
  }, [])

  /*
   * ==========================================
   * EXTERNAL INDEX CHANGE
   * ==========================================
   *
   * If Pagination changes index from outside,
   * keep the physical slider synchronized.
   * ==========================================
   */

  useEffect(() => {
    const track =
      trackRef.current

    if (
      !track ||
      !track.clientWidth
    ) {
      return
    }

    const expectedLeft =
      index *
      track.clientWidth

    const difference =
      Math.abs(
        track.scrollLeft -
          expectedLeft,
      )

    /*
     * Ignore tiny Safari sub-pixel
     * differences.
     */

    if (difference < 2) {
      return
    }

    track.scrollTo({
      left:
        expectedLeft,

      behavior:
        'smooth',
    })
  }, [index])

  /*
   * ==========================================
   * SLIDER CONTROL CONTEXT
   * ==========================================
   */

  const control =
    useMemo(
      () => ({
        goTo,
      }),
      [goTo],
    )

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <SliderControlContext.Provider
      value={control}
    >
      <div
        ref={trackRef}
        className={`m-slider ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onScroll={
          handleScroll
        }
        onKeyDown={
          handleKeyDown
        }
        style={{
          WebkitOverflowScrolling:
            'touch',

          overscrollBehaviorX:
            'contain',
        }}
      >
        {slides.map(
          (
            slide,
            slideIndex,
          ) => {
            const isActive =
              slideIndex ===
              index

            return (
              <div
                key={
                  slideIndex
                }
                className="m-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${count}`}
                inert={
                  !isActive
                }
                style={{
                  overflow:
                    'hidden',

                  /*
                   * Do not use transform
                   * or clip-path here.
                   *
                   * Important for iOS
                   * video playback.
                   */

                  transform:
                    'none',

                  clipPath:
                    'none',

                  WebkitClipPath:
                    'none',
                }}
              >
                <div
                  data-slider-inner
                  style={{
                    width:
                      '100%',

                    minWidth:
                      0,

                    /*
                     * Safari-safe:
                     * video parent stays
                     * completely static.
                     */

                    transform:
                      'none',

                    clipPath:
                      'none',

                    WebkitClipPath:
                      'none',

                    backfaceVisibility:
                      'visible',

                    WebkitBackfaceVisibility:
                      'visible',
                  }}
                >
                  {slide}
                </div>
              </div>
            )
          },
        )}
      </div>

      {after}
    </SliderControlContext.Provider>
  )
}