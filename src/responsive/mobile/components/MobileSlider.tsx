import {
  Children,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { IS_IOS_WEBKIT } from '../hooks/useSlideVideo'
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
    useRef(0)

  const indexRef =
    useRef(index)

  const onChangeRef =
    useRef(onIndexChange)

  const slides =
    Children.toArray(children)

  const count =
    slides.length

  useEffect(() => {
    indexRef.current = index
    onChangeRef.current = onIndexChange
  }, [
    index,
    onIndexChange,
  ])

  /*
   * ==========================================
   * VISUAL MOTION
   * ==========================================
   */

  const updateMotion =
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

      const scrollLeft =
        track.scrollLeft

      const slideElements =
        Array.from(
          track.querySelectorAll<HTMLElement>(
            '.m-slide',
          ),
        )

      slideElements.forEach(
        (
          slide,
          slideIndex,
        ) => {
          const inner =
            slide.querySelector<HTMLElement>(
              '[data-slider-inner]',
            )

          if (!inner) {
            return
          }

          /*
           * iOS / WebKit only.
           *
           * A <video> inside an ancestor whose transform / clip-path is
           * rewritten on every scroll frame (and a video that is itself
           * transformed) stops being composited correctly in WebKit.
           * Slides that contain a video stay static on iOS: no per-frame
           * transform, clip-path or will-change. Android is unchanged.
           */

          if (
            IS_IOS_WEBKIT &&
            inner.querySelector('video')
          ) {
            if (!inner.dataset.iosVideoSlide) {
              inner.dataset.iosVideoSlide =
                'true'

              inner.style.clipPath =
                'none'

              inner.style.willChange =
                'auto'
            }

            return
          }

          /*
           * 0 = active
           * 1 = one screen right
           * -1 = one screen left
           */

          const distance =
            (
              slideIndex *
                width -
              scrollLeft
            ) /
            width

          const progress =
            Math.max(
              -1,
              Math.min(
                1,
                distance,
              ),
            )

          const abs =
            Math.abs(
              progress,
            )

          /*
           * ======================================
           * MAIN CARD DEPTH
           * ======================================
           */

          const scale =
            1 -
            abs * 0.055

          /*
           * Counter movement.
           *
           * The physical slide moves with
           * native scroll.
           *
           * The content moves slightly against it,
           * which creates a cinematic layered feel.
           */

          const x =
            progress * -34

          /*
           * Very small vertical depth.
           */

          const y =
            abs * 8

          /*
           * Incoming card is slightly masked.
           */

          const mask =
            abs * 9

          let clipPath =
            'inset(0% 0% 0% 0%)'

          if (progress > 0) {
            clipPath =
              `inset(0% ${mask}% 0% 0%)`
          }

          if (progress < 0) {
            clipPath =
              `inset(0% 0% 0% ${mask}%)`
          }

          inner.style.transform =
            `
              translate3d(
                ${x}px,
                ${y}px,
                0
              )
              scale(${scale})
            `

          inner.style.clipPath =
            clipPath

          inner.style.transformOrigin =
            progress > 0
              ? 'left center'
              : 'right center'

          inner.style.willChange =
            'transform, clip-path'

          /*
           * ======================================
           * MEDIA LAYER
           * ======================================
           */

          const media =
            inner.querySelector<HTMLElement>(
              'video, img',
            )

          if (media) {
            /*
             * Media moves independently from
             * the card.
             */

            const mediaX =
              progress * -24

            const mediaScale =
              1.035 +
              abs * 0.025

            media.style.transform =
              `
                translate3d(
                  ${mediaX}px,
                  0,
                  0
                )
                scale(${mediaScale})
              `

            media.style.transformOrigin =
              'center center'

            media.style.willChange =
              'transform'
          }

          /*
           * ======================================
           * LARGE TITLES
           * ======================================
           */

          const titles =
            inner.querySelectorAll<HTMLElement>(
              '.m-big, .m-gal__title',
            )

          titles.forEach(
            (
              title,
            ) => {
              const titleX =
                progress * -18

              const titleY =
                abs * 5

              title.style.transform =
                `
                  translate3d(
                    ${titleX}px,
                    ${titleY}px,
                    0
                  )
                `

              title.style.willChange =
                'transform'
            },
          )
        },
      )
    }, [])

  /*
   * ==========================================
   * GO TO
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
   * SCROLL
   * ==========================================
   */

  const handleScroll =
    () => {
      cancelAnimationFrame(
        frameRef.current,
      )

      frameRef.current =
        requestAnimationFrame(
          () => {
            const track =
              trackRef.current

            if (
              !track ||
              !track.clientWidth
            ) {
              return
            }

            /*
             * Awwwards-style visual motion.
             */

            updateMotion()

            /*
             * Existing index logic.
             */

            const next =
              Math.max(
                0,
                Math.min(
                  count - 1,
                  Math.round(
                    track.scrollLeft /
                      track.clientWidth,
                  ),
                ),
              )

            if (
              next !==
              indexRef.current
            ) {
              indexRef.current =
                next

              onChangeRef.current(
                next,
              )
            }
          },
        )
    }

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
   * INITIAL POSITION + RESIZE
   * ==========================================
   */

  useEffect(() => {
    const realign =
      () => {
        const track =
          trackRef.current

        if (!track) {
          return
        }

        track.scrollLeft =
          indexRef.current *
          track.clientWidth

        updateMotion()
      }

    const initialFrame =
      requestAnimationFrame(
        realign,
      )

    window.addEventListener(
      'resize',
      realign,
    )

    return () => {
      cancelAnimationFrame(
        initialFrame,
      )

      window.removeEventListener(
        'resize',
        realign,
      )

      cancelAnimationFrame(
        frameRef.current,
      )
    }
  }, [updateMotion])

  /*
   * ==========================================
   * CONTROL
   * ==========================================
   */

  const control =
    useMemo(
      () => ({
        goTo,
      }),
      [goTo],
    )

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
      >
        {slides.map(
          (
            slide,
            slideIndex,
          ) => (
            <div
              key={
                slideIndex
              }
              className="m-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${count}`}
              inert={
                slideIndex !==
                index
              }
              style={{
                overflow:
                  'hidden',
              }}
            >
              <div
                data-slider-inner
                style={{
                  width:
                    '100%',

                  minWidth: 0,

                  transform:
                    'translate3d(0,0,0)',

                  clipPath:
                    'inset(0% 0% 0% 0%)',

                  backfaceVisibility:
                    'hidden',
                }}
              >
                {slide}
              </div>
            </div>
          ),
        )}
      </div>

      {after}
    </SliderControlContext.Provider>
  )
}