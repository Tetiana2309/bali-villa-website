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

const VIDEO_INSET_Y =
  (CANVAS_HEIGHT - SMALL_VIDEO_HEIGHT) / 2

/*
 * One fixed Gallery screen.
 *
 * All three villas animate inside it.
 */
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

    const scene =
      sceneRef.current

    const header =
      headerRef.current

    const line =
      lineRef.current

    const frames =
      frameRefs.current

    const titles =
      titleRefs.current

    const locations =
      locationRefs.current

    const specs =
      specsRefs.current

    const descriptions =
      descriptionRefs.current

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
       * CLIP
       * ==========================================
       */

      const applyCenteredClip = (
        frame: HTMLDivElement,
        x: number,
        y: number,
      ) => {
        const clipPathValue =
          `inset(${y}px ${x}px ${y}px ${x}px)`

        frame.style.setProperty(
          '-webkit-clip-path',
          clipPathValue,
        )

        frame.style.setProperty(
          'clip-path',
          clipPathValue,
        )
      }

      /*
       * ==========================================
       * INITIAL STATE FOR ALL 3 VILLAS
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
           * Every video starts SMALL.
           */

          applyCenteredClip(
            frame,
            VIDEO_INSET_X,
            VIDEO_INSET_Y,
          )

          /*
           * Only first villa is visible
           * at the beginning.
           */

          gsap.set(frame, {
            opacity:
              index === 0 ? 1 : 0,
          })

          /*
           * Title:
           *
           * base top = 614
           * +120 transform
           * = visual top 734
           */

          gsap.set(title, {
            x: VIDEO_INSET_X,
            y: 120,

            opacity:
              index === 0 ? 1 : 0,
          })

          /*
           * Extra information hidden
           * while villa is small.
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
       *
       * 1.6px
       * opacity .7
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

            applyCenteredClip(
              frame,
              0,
              0,
            )

            gsap.set(frame, {
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
       * ONE MASTER TIMELINE
       *
       * ONE SCREEN
       * ONE PIN
       * THREE VILLAS
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

          const reveal = {
            x: VIDEO_INSET_X,
            y: VIDEO_INSET_Y,
          }

          /*
           * ======================================
           * TRANSITION:
           *
           * PREVIOUS BIG VILLA
           * →
           * NEXT SMALL VILLA
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
             * PREPARE NEXT SMALL VILLA
             * ====================================
             *
             * The villa is already clipped
             * to 1482 × 862.
             *
             * It stays invisible until
             * the dissolve begins.
             */

            applyCenteredClip(
              frame,
              VIDEO_INSET_X,
              VIDEO_INSET_Y,
            )

            timeline.set(frame, {
              opacity: 0,
              zIndex: 20,
            })

            timeline.set(
              previousFrame,
              {
                zIndex: 10,
              },
            )

            /*
             * Prepare next title:
             *
             * visual top = 734px
             */

            timeline.set(title, {
              x: VIDEO_INSET_X,
              y: 120,
              opacity: 0,
            })

            /*
             * Next villa info stays hidden
             * until it expands.
             */

            timeline.set(
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

            /*
             * ====================================
             * SMOOTH DISSOLVE
             * ====================================
             *
             * Previous fullscreen villa
             * fades away.
             *
             * Next SMALL villa fades in
             * at the same time.
             */

            timeline.to(
              previousFrame,
              {
                opacity: 0,

                duration: 0.8,

                ease: 'power2.inOut',
              },
            )

            timeline.to(
              frame,
              {
                opacity: 1,

                duration: 0.8,

                ease: 'power2.inOut',
              },
              '<',
            )

            /*
             * Previous content dissolves
             * together with the villa.
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

                ease: 'power1.inOut',
              },
              '<',
            )

            /*
             * ====================================
             * NEXT TITLE APPEARS
             * ====================================
             */

            timeline.to(
              title,
              {
                opacity: 1,

                duration: 0.6,

                ease: 'power1.inOut',
              },
              '<+=0.12',
            )

            /*
             * ====================================
             * HEADER RETURNS TO SMALL STATE
             * ====================================
             *
             * ice → espresso
             */

            timeline.to(
              header,
              {
                y: 40,
                color: ESPRESSO,

                duration: 0.6,

                ease: 'power1.inOut',
              },
              '<',
            )

            /*
             * ====================================
             * LINE RETURNS
             * ====================================
             *
             * 0 → 0.7
             */

            timeline.to(
              line,
              {
                opacity: 0.7,

                duration: 0.6,

                ease: 'power1.inOut',
              },
              '<',
            )

            /*
             * ====================================
             * SMALL VILLA HOLD
             *
             * Now the user clearly sees
             * the new villa in small state
             * before it starts expanding.
             * ====================================
             */

            timeline.to({}, {
              duration: 0.32,
            })
          } else {
            /*
             * First villa starts small.
             */

            timeline.to({}, {
              duration: 0.28,
            })
          }

          /*
           * ======================================
           * SMALL → FULLSCREEN
           * ======================================
           */

          timeline.to(reveal, {
            x: 0,
            y: 0,

            duration: 1.45,

            ease: 'none',

            onUpdate: () => {
              applyCenteredClip(
                frame,
                reveal.x,
                reveal.y,
              )
            },
          })

          /*
           * ======================================
           * HEADER
           *
           * stays 40px from top
           *
           * espresso → ice
           * ======================================
           */

          timeline.to(
            header,
            {
              y: 40,
              color: ICE,

              duration: 0.5,

              ease: 'power1.inOut',
            },
            '-=0.5',
          )

          /*
           * ======================================
           * LINE
           *
           * .7 → 0
           * ======================================
           */

          timeline.to(
            line,
            {
              opacity: 0,

              duration: 0.2,

              ease: 'none',
            },
            '-=0.55',
          )

          /*
           * ======================================
           * TITLE
           *
           * SMALL:
           * top = 734
           *
           * FULLSCREEN:
           * top = 614
           * ======================================
           */

          timeline.to(
            title,
            {
              x: 0,
              y: 0,

              duration: 0.55,

              ease: 'power1.inOut',
            },
            '-=0.32',
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

              duration: 0.35,

              ease: 'power1.out',
            },
            '-=0.18',
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

              duration: 0.35,

              ease: 'power1.out',
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

              duration: 0.35,

              ease: 'power1.out',
            },
            '<+=0.04',
          )

          /*
           * ======================================
           * FULLSCREEN HOLD
           * ======================================
           */

          timeline.to({}, {
            duration:
              index ===
              GALLERY_STATES.length - 1
                ? 0.65
                : 0.45,
          })
        },
      )

      /*
       * ==========================================
       * ONE SCROLLTRIGGER
       *
       * THE ENTIRE GALLERY SCREEN
       * STAYS FIXED
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

        scrub: true,

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
      {/* =========================================
          ONE FIXED SCREEN

          1920 × 1080
      ========================================= */}

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
        {/* =======================================
            ALL THREE VIDEOS
            INSIDE ONE FIXED SCREEN
        ======================================= */}

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
                inset-0
                z-10
                overflow-hidden
              "
              style={{
                clipPath:
                  `inset(${VIDEO_INSET_Y}px ${VIDEO_INSET_X}px ${VIDEO_INSET_Y}px ${VIDEO_INSET_X}px)`,

                WebkitClipPath:
                  `inset(${VIDEO_INSET_Y}px ${VIDEO_INSET_X}px ${VIDEO_INSET_Y}px ${VIDEO_INSET_X}px)`,

                opacity:
                  index === 0 ? 1 : 0,

                willChange:
                  'clip-path, opacity',

                transform:
                  'translateZ(0)',

                backfaceVisibility:
                  'hidden',
              }}
            >
              <video
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
                src={state.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  transform:
                    'translateZ(0)',

                  backfaceVisibility:
                    'hidden',
                }}
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-black/25
                "
              />
            </div>
          ),
        )}

        {/* =======================================
            SHARED HEADER
        ======================================= */}

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

        {/* =======================================
            SHARED LINE

            SMALL:
            1.6px
            opacity 0.7

            FULLSCREEN:
            hidden
        ======================================= */}

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

        {/* =======================================
            TITLES
        ======================================= */}

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

        {/* =======================================
            LOCATIONS
        ======================================= */}

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

        {/* =======================================
            SPECS
        ======================================= */}

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

        {/* =======================================
            DESCRIPTIONS
        ======================================= */}

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