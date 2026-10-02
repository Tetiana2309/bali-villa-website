import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { SectionHeader } from '../components/SectionHeader'
import { gsap } from '../lib/gsap'
import { GALLERY_STATES } from '../data/gallery'

gsap.registerPlugin(ScrollTrigger)

const ICE = '#DDE4EE'
const ESPRESSO = '#392919'

const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 1080

const SMALL_VIDEO_WIDTH = 1482
const SMALL_VIDEO_HEIGHT = 862

const VIDEO_INSET_X =
  (CANVAS_WIDTH - SMALL_VIDEO_WIDTH) / 2

const PIN_DISTANCE = 5200

export function Gallery() {
  const sectionRef =
    useRef<HTMLElement>(null)

  const sceneRef =
    useRef<HTMLDivElement>(null)

  const headerRef =
    useRef<HTMLDivElement>(null)

  const lineRef =
    useRef<HTMLDivElement>(null)

  const frameRefs =
    useRef<(HTMLDivElement | null)[]>([])

  const titleRefs =
    useRef<(HTMLHeadingElement | null)[]>([])

  const locationRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  const specsRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  const descriptionRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (
      !sectionRef.current ||
      !sceneRef.current ||
      !headerRef.current ||
      !lineRef.current
    ) {
      return
    }

    const scene = sceneRef.current
    const header = headerRef.current
    const line = lineRef.current

    const frames = frameRefs.current
    const titles = titleRefs.current
    const locations = locationRefs.current
    const specs = specsRefs.current
    const descriptions = descriptionRefs.current

    if (
      frames.some((item) => !item) ||
      titles.some((item) => !item) ||
      locations.some((item) => !item) ||
      specs.some((item) => !item) ||
      descriptions.some((item) => !item)
    ) {
      return
    }

    const reduceMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * INITIAL VIDEO STATES
       * ==========================================
       *
       * Every video WINDOW is physically centered.
       *
       * No clip-path.
       * No scale.
       * No transform-origin problems.
       *
       * The window itself starts:
       *
       * 1482 × 862
       *
       * and later becomes:
       *
       * 1920 × 1080
       * ==========================================
       */

      GALLERY_STATES.forEach(
        (_, index) => {
          const frame =
            frames[index]!

          const title =
            titles[index]!

          const location =
            locations[index]!

          const spec =
            specs[index]!

          const description =
            descriptions[index]!

          /*
           * ======================================
           * FRAME
           * ======================================
           */

          gsap.set(frame, {
            width:
              SMALL_VIDEO_WIDTH,

            height:
              SMALL_VIDEO_HEIGHT,

            opacity:
              index === 0 ? 1 : 0,
          })

          /*
           * ======================================
           * TITLE
           * ======================================
           */

          gsap.set(title, {
            x: VIDEO_INSET_X,
            y: 120,

            opacity:
              index === 0 ? 1 : 0,
          })

          /*
           * ======================================
           * EXTRA INFO
           * ======================================
           */

          gsap.set(
            [
              location,
              spec,
              description,
            ],
            {
              opacity: 0,
              y: 18,
            },
          )
        },
      )

      /*
       * ==========================================
       * HEADER INITIAL STATE
       * ==========================================
       */

      gsap.set(header, {
        y: 40,
        color: ESPRESSO,
      })

      /*
       * ==========================================
       * LINE INITIAL STATE
       * ==========================================
       */

      gsap.set(line, {
        opacity: 0.7,
      })

      /*
       * ==========================================
       * REDUCED MOTION
       * ==========================================
       */

      if (reduceMotion) {
        const lastIndex =
          GALLERY_STATES.length - 1

        GALLERY_STATES.forEach(
          (_, index) => {
            const frame =
              frames[index]!

            const title =
              titles[index]!

            const location =
              locations[index]!

            const spec =
              specs[index]!

            const description =
              descriptions[index]!

            gsap.set(frame, {
              width:
                CANVAS_WIDTH,

              height:
                CANVAS_HEIGHT,

              opacity:
                index === lastIndex
                  ? 1
                  : 0,
            })

            gsap.set(title, {
              x: 0,
              y: 0,

              opacity:
                index === lastIndex
                  ? 1
                  : 0,
            })

            gsap.set(
              [
                location,
                spec,
                description,
              ],
              {
                opacity:
                  index === lastIndex
                    ? 0.7
                    : 0,

                y: 0,
              },
            )
          },
        )

        gsap.set(header, {
          y: 40,
          color: ICE,
        })

        gsap.set(line, {
          opacity: 0,
        })

        return
      }

      /*
       * ==========================================
       * MASTER TIMELINE
       * ==========================================
       */

      const timeline =
        gsap.timeline({
          defaults: {
            ease: 'none',
          },
        })

      GALLERY_STATES.forEach(
        (_, index) => {
          const frame =
            frames[index]!

          const title =
            titles[index]!

          const location =
            locations[index]!

          const spec =
            specs[index]!

          const description =
            descriptions[index]!

          /*
           * ======================================
           * NEXT VILLA
           * ======================================
           */

          if (index > 0) {
            const previousFrame =
              frames[index - 1]!

            const previousTitle =
              titles[index - 1]!

            const previousLocation =
              locations[index - 1]!

            const previousSpecs =
              specs[index - 1]!

            const previousDescription =
              descriptions[index - 1]!

            /*
             * ====================================
             * OLD FULLSCREEN VILLA FADES
             * ====================================
             */

            timeline.to(
              previousFrame,
              {
                opacity: 0,

                duration: 0.85,

                ease:
                  'power2.inOut',
              },
            )

            /*
             * ====================================
             * NEXT SMALL CENTERED VILLA
             * ====================================
             *
             * Important:
             *
             * width and height are already
             * centered by CSS.
             *
             * So it cannot appear from a corner.
             * ====================================
             */

            timeline.fromTo(
              frame,
              {
                width:
                  SMALL_VIDEO_WIDTH,

                height:
                  SMALL_VIDEO_HEIGHT,

                opacity: 0,
              },
              {
                width:
                  SMALL_VIDEO_WIDTH,

                height:
                  SMALL_VIDEO_HEIGHT,

                opacity: 1,

                duration: 0.85,

                ease:
                  'power2.inOut',

                immediateRender:
                  false,
              },
              '<',
            )

            /*
             * ====================================
             * OLD CONTENT FADES
             * ====================================
             */

            timeline.to(
              [
                previousTitle,
                previousLocation,
                previousSpecs,
                previousDescription,
              ],
              {
                opacity: 0,

                duration: 0.55,

                ease:
                  'power1.inOut',
              },
              '<',
            )

            /*
             * ====================================
             * NEXT TITLE
             * ====================================
             */

            timeline.fromTo(
              title,
              {
                x:
                  VIDEO_INSET_X,

                y: 120,

                opacity: 0,
              },
              {
                x:
                  VIDEO_INSET_X,

                y: 120,

                opacity: 1,

                duration: 0.65,

                ease:
                  'power1.inOut',

                immediateRender:
                  false,
              },
              '<+=0.12',
            )

            /*
             * ====================================
             * HEADER BACK TO SMALL STATE
             * ====================================
             */

            timeline.to(
              header,
              {
                y: 40,
                color:
                  ESPRESSO,

                duration: 0.65,

                ease:
                  'power1.inOut',
              },
              '<',
            )

            /*
             * ====================================
             * LINE BACK
             * ====================================
             */

            timeline.to(
              line,
              {
                opacity: 0.7,

                duration: 0.65,

                ease:
                  'power1.inOut',
              },
              '<',
            )

            /*
             * ====================================
             * SMALL HOLD
             * ====================================
             */

            timeline.to(
              {},
              {
                duration: 0.34,
              },
            )
          } else {
            /*
             * ====================================
             * FIRST SMALL HOLD
             * ====================================
             */

            timeline.to(
              {},
              {
                duration: 0.3,
              },
            )
          }

          /*
           * ======================================
           * CENTER EXPANSION
           * ======================================
           *
           * THIS is the main fix.
           *
           * The window grows:
           *
           * 1482 × 862
           *
           * →
           *
           * 1920 × 1080
           *
           * while its center NEVER moves.
           *
           * No scale.
           * No x.
           * No y.
           * No clip-path.
           * ======================================
           */

          timeline.to(
            frame,
            {
              width:
                CANVAS_WIDTH,

              height:
                CANVAS_HEIGHT,

              duration: 1.55,

              ease: 'none',
            },
          )

          /*
           * ======================================
           * HEADER
           * ======================================
           */

          timeline.to(
            header,
            {
              y: 40,

              color: ICE,

              duration: 0.55,

              ease:
                'power1.inOut',
            },
            '-=0.58',
          )

          /*
           * ======================================
           * LINE
           * ======================================
           */

          timeline.to(
            line,
            {
              opacity: 0,

              duration: 0.28,

              ease: 'none',
            },
            '-=0.6',
          )

          /*
           * ======================================
           * TITLE
           * ======================================
           */

          timeline.to(
            title,
            {
              x: 0,
              y: 0,

              duration: 0.62,

              ease:
                'power1.inOut',
            },
            '-=0.36',
          )

          /*
           * ======================================
           * LOCATION
           * ======================================
           */

          timeline.to(
            location,
            {
              opacity: 0.7,
              y: 0,

              duration: 0.4,

              ease:
                'power1.out',
            },
            '-=0.2',
          )

          /*
           * ======================================
           * SPECS
           * ======================================
           */

          timeline.to(
            spec,
            {
              opacity: 0.7,
              y: 0,

              duration: 0.4,

              ease:
                'power1.out',
            },
            '<+=0.04',
          )

          /*
           * ======================================
           * DESCRIPTION
           * ======================================
           */

          timeline.to(
            description,
            {
              opacity: 0.7,
              y: 0,

              duration: 0.4,

              ease:
                'power1.out',
            },
            '<+=0.04',
          )

          /*
           * ======================================
           * FULLSCREEN HOLD
           * ======================================
           */

          timeline.to(
            {},
            {
              duration:
                index ===
                GALLERY_STATES.length - 1
                  ? 0.7
                  : 0.48,
            },
          )
        },
      )

      /*
       * ==========================================
       * ONE SCROLLTRIGGER
       * ==========================================
       */

      ScrollTrigger.create({
        trigger: scene,

        start: 'top top',

        end: `+=${PIN_DISTANCE}`,

        pin: true,

        pinSpacing: true,

        anticipatePin: 1,

        animation: timeline,

        scrub: 1,

        invalidateOnRefresh: true,
      })
    }, sectionRef)

    const refreshFrame =
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })

    return () => {
      cancelAnimationFrame(
        refreshFrame,
      )

      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Gallery"
      className="
        relative
        mt-[220px]
        w-[1920px]
        bg-[#DDE4EE]
      "
    >
      {/*
       * ==========================================
       * FIXED SCENE
       * ==========================================
       */}

      <div
        ref={sceneRef}
        className="
          relative
          h-[1080px]
          w-[1920px]
          overflow-hidden
          bg-[#DDE4EE]
        "
      >
        {/*
         * ========================================
         * VIDEO WINDOWS
         * ========================================
         *
         * Each frame is centered using:
         *
         * left: 50%
         * top: 50%
         * translate(-50%, -50%)
         *
         * Width / height animate.
         *
         * Position never changes.
         * ========================================
         */}

        {GALLERY_STATES.map(
          (state, index) => (
            <div
              key={state.title}
              ref={(element) => {
                frameRefs.current[index] =
                  element
              }}
              className="
                pointer-events-none
                absolute
                top-1/2
                left-1/2
                overflow-hidden
              "
              style={{
                width:
                  `${SMALL_VIDEO_WIDTH}px`,

                height:
                  `${SMALL_VIDEO_HEIGHT}px`,

                transform:
                  'translate3d(-50%, -50%, 0)',

                opacity:
                  index === 0 ? 1 : 0,

                zIndex:
                  10 + index,

                willChange:
                  'width, height, opacity',

                backfaceVisibility:
                  'hidden',
              }}
            >
              {/*
               * ==================================
               * VIDEO
               * ==================================
               *
               * IMPORTANT:
               *
               * Video itself is ALWAYS
               * 1920 × 1080.
               *
               * It does NOT grow.
               *
               * The centered window around it
               * simply reveals more of it.
               * ==================================
               */}

              <video
                src={state.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="
                  absolute
                  top-1/2
                  left-1/2
                  h-[1080px]
                  w-[1920px]
                  max-w-none
                  object-cover
                "
                style={{
                  transform:
                    'translate3d(-50%, -50%, 0)',

                  backfaceVisibility:
                    'hidden',
                }}
              />

              {/*
               * ==================================
               * OVERLAY
               * ==================================
               *
               * Also fixed at 1920 × 1080
               * and centered with the video.
               * ==================================
               */}

              <div
                className="
                  pointer-events-none
                  absolute
                  top-1/2
                  left-1/2
                  h-[1080px]
                  w-[1920px]
                  max-w-none
                  bg-black/25
                "
                style={{
                  transform:
                    'translate3d(-50%, -50%, 0)',
                }}
              />
            </div>
          ),
        )}

        {/*
         * ========================================
         * SHARED HEADER
         * ========================================
         */}

        <div
          ref={headerRef}
          className="
            absolute
            top-0
            left-0
            z-30
            w-[1920px]
          "
          style={{
            color: ESPRESSO,

            transform:
              'translate3d(0,40px,0)',

            willChange:
              'color',
          }}
        >
          <SectionHeader
            className="top-0 opacity-70"
            left="They Live Differently Here"
            center="Gallery"
            right='Just One Feeling: "My Home"'
            showDivider={false}
          />
        </div>

        {/*
         * ========================================
         * SHARED LINE
         * ========================================
         */}

        <div
          ref={lineRef}
          className="
            pointer-events-none
            absolute
            top-[74px]
            left-0
            z-30
            h-[1.6px]
            w-[1920px]
          "
          style={{
            backgroundColor:
              ESPRESSO,

            opacity: 0.7,

            willChange:
              'opacity',
          }}
        />

        {/*
         * ========================================
         * TITLES
         * ========================================
         */}

        {GALLERY_STATES.map(
          (state, index) => (
            <h3
              key={`${state.title}-title`}
              ref={(element) => {
                titleRefs.current[index] =
                  element
              }}
              className="
                absolute
                top-[614px]
                left-[40px]
                z-30
                m-0
                w-[1200px]
                whitespace-nowrap
                text-[120px]
                font-medium
                leading-[0.9]
                text-[#DDE4EE]
              "
              style={{
                opacity:
                  index === 0 ? 1 : 0,

                transform:
                  `translate3d(${VIDEO_INSET_X}px, 120px, 0)`,

                willChange:
                  'opacity, transform',
              }}
            >
              {state.title}
            </h3>
          ),
        )}

        {/*
         * ========================================
         * LOCATIONS
         * ========================================
         */}

        {GALLERY_STATES.map(
          (state, index) => (
            <p
              key={`${state.title}-location`}
              ref={(element) => {
                locationRefs.current[index] =
                  element
              }}
              className="
                text-footnote
                absolute
                top-[734px]
                left-[40px]
                z-30
                w-[340px]
                text-[#DDE4EE]
              "
              style={{
                opacity: 0,

                transform:
                  'translate3d(0,18px,0)',

                willChange:
                  'opacity, transform',
              }}
            >
              {state.location}
            </p>
          ),
        )}

        {/*
         * ========================================
         * SPECS
         * ========================================
         */}

        {GALLERY_STATES.map(
          (state, index) => (
            <p
              key={`${state.title}-specs`}
              ref={(element) => {
                specsRefs.current[index] =
                  element
              }}
              className="
                text-body-copy
                absolute
                top-[734px]
                left-[448px]
                z-30
                w-[316px]
                text-[#DDE4EE]
              "
              style={{
                opacity: 0,

                transform:
                  'translate3d(0,18px,0)',

                willChange:
                  'opacity, transform',
              }}
            >
              {state.specs}
            </p>
          ),
        )}

        {/*
         * ========================================
         * DESCRIPTIONS
         * ========================================
         */}

        {GALLERY_STATES.map(
          (state, index) => (
            <p
              key={`${state.title}-description`}
              ref={(element) => {
                descriptionRefs.current[index] =
                  element
              }}
              className="
                text-body-copy
                absolute
                top-[826px]
                left-[448px]
                z-30
                w-[316px]
                text-[#DDE4EE]
              "
              style={{
                opacity: 0,

                transform:
                  'translate3d(0,18px,0)',

                willChange:
                  'opacity, transform',
              }}
            >
              {state.description}
            </p>
          ),
        )}
      </div>
    </section>
  )
}