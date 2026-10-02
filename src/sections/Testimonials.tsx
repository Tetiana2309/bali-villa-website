import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { TESTIMONIAL_STATES } from '../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

const SECTION_HEIGHT = 899

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const activeIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current

    const card1 = cardRefs.current[0]
    const card2 = cardRefs.current[1]
    const card3 = cardRefs.current[2]

    if (!card1 || !card2 || !card3) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * INITIAL STATES
       * ==========================================
       */

      gsap.set(card1, {
        yPercent: 0,
      })

      gsap.set(card2, {
        yPercent: 100,
      })

      gsap.set(card3, {
        yPercent: 100,
      })

      activeIndexRef.current = 0
      isAnimatingRef.current = false

      if (prefersReducedMotion) return

      /*
       * ==========================================
       * REVIEW 1 → REVIEW 2
       * SCROLL DOWN
       * ==========================================
       */

      const showSecondReview = () => {
        if (isAnimatingRef.current) return
        if (activeIndexRef.current !== 0) return

        isAnimatingRef.current = true
        activeIndexRef.current = 1

        gsap.killTweensOf(card2)

        gsap.set(card2, {
          yPercent: 100,
        })

        gsap.to(card2, {
          yPercent: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          overwrite: 'auto',

          onComplete: () => {
            isAnimatingRef.current = false
          },
        })
      }

      /*
       * ==========================================
       * REVIEW 2 → REVIEW 3
       * SCROLL DOWN
       * ==========================================
       */

      const showThirdReview = () => {
        if (isAnimatingRef.current) return
        if (activeIndexRef.current !== 1) return

        isAnimatingRef.current = true
        activeIndexRef.current = 2

        gsap.killTweensOf(card3)

        gsap.set(card3, {
          yPercent: 100,
        })

        gsap.to(card3, {
          yPercent: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          overwrite: 'auto',

          onComplete: () => {
            isAnimatingRef.current = false
          },
        })
      }

      /*
       * ==========================================
       * REVIEW 3 → REVIEW 2
       * SCROLL UP
       * ==========================================
       */

      const hideThirdReviewUp = () => {
        if (isAnimatingRef.current) return
        if (activeIndexRef.current !== 2) return

        isAnimatingRef.current = true
        activeIndexRef.current = 1

        gsap.killTweensOf(card3)

        gsap.to(card3, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power2.inOut',
          overwrite: 'auto',

          onComplete: () => {
            gsap.set(card3, {
              yPercent: 100,
            })

            isAnimatingRef.current = false
          },
        })
      }

      /*
       * ==========================================
       * REVIEW 2 → REVIEW 1
       * SCROLL UP
       * ==========================================
       */

      const hideSecondReviewUp = () => {
        if (isAnimatingRef.current) return
        if (activeIndexRef.current !== 1) return

        isAnimatingRef.current = true
        activeIndexRef.current = 0

        gsap.killTweensOf(card2)

        gsap.to(card2, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power2.inOut',
          overwrite: 'auto',

          onComplete: () => {
            gsap.set(card2, {
              yPercent: 100,
            })

            isAnimatingRef.current = false
          },
        })
      }

      /*
       * ==========================================
       * SCROLLTRIGGER
       * ==========================================
       *
       * Testimonials stops at the top.
       *
       * pinSpacing: true keeps the following
       * section in the correct document flow.
       *
       * This prevents FAQ from disappearing
       * underneath Testimonials.
       * ==========================================
       */

      ScrollTrigger.create({
        trigger: section,

        start: 'top top',

        end: `+=${SECTION_HEIGHT}`,

        pin: section,
        pinSpacing: true,
        anticipatePin: 1,

        onUpdate: (self) => {
          if (isAnimatingRef.current) return

          const progress = self.progress
          const direction = self.direction
          const activeIndex = activeIndexRef.current

          /*
           * ======================================
           * SCROLL DOWN
           * ======================================
           */

          if (direction === 1) {
            /*
             * REVIEW 1 → REVIEW 2
             */

            if (progress >= 0.33 && activeIndex === 0) {
              showSecondReview()
              return
            }

            /*
             * REVIEW 2 → REVIEW 3
             */

            if (progress >= 0.66 && activeIndex === 1) {
              showThirdReview()
            }
          }

          /*
           * ======================================
           * SCROLL UP
           * ======================================
           */

          if (direction === -1) {
            /*
             * REVIEW 3 → REVIEW 2
             */

            if (progress < 0.66 && activeIndex === 2) {
              hideThirdReviewUp()
              return
            }

            /*
             * REVIEW 2 → REVIEW 1
             */

            if (progress < 0.33 && activeIndex === 1) {
              hideSecondReviewUp()
            }
          }
        },

        invalidateOnRefresh: true,
      })
    }, section)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Testimonials"
      className="relative z-20 h-[899px] w-[1920px] overflow-hidden bg-ice"
    >
      {/*
       * ==========================================
       * CONTENT AREA
       * ==========================================
       *
       * 220px top spacing
       * 459px content
       * 220px bottom spacing
       *
       * 220 + 459 + 220 = 899
       * ==========================================
       */}

      <div className="absolute top-[220px] left-0 h-[459px] w-[1920px]">
        {/*
         * ========================================
         * SECTION HEADER
         * ========================================
         */}

        <SectionHeader
          className="top-0 opacity-70"
          left="Words From Those Who Found Their Villa"
          center="Feedback"
          right="A Place They Now Call Home."
        />

        {/*
         * ========================================
         * STATIC TITLE
         * ========================================
         */}

        <h2 className="text-wordmark absolute top-[52px] left-10 z-40 m-0 w-[379px] opacity-40">
          Review
        </h2>

        {/*
         * ========================================
         * STATIC SUPPORTING COPY
         * ========================================
         */}

        <p className="text-footnote absolute top-[411px] left-10 z-40 w-[172px] text-[#999999]/90">
          they found their place.
          <br />
          now it's your turn.
        </p>

        {/*
         * ========================================
         * TESTIMONIAL WINDOW
         * ========================================
         */}

        <div className="absolute top-[52px] left-[724px] h-[403px] w-[1156px] overflow-hidden">
          {TESTIMONIAL_STATES.map((state, index) => (
            <div
              key={state.reviewerName}
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className="absolute inset-0 h-[403px] w-[1156px] bg-ice"
              style={{
                zIndex: 10 + index * 10,
              }}
            >
              {/*
               * ==================================
               * VIDEO
               * ==================================
               */}

              <video
                className="absolute top-0 left-0 h-[403px] w-[560px] object-cover"
                src={state.video}
                autoPlay
                muted
                loop
                playsInline
              />

              {/*
               * ==================================
               * REVIEWER INFORMATION
               * ==================================
               */}

              <div className="absolute top-0 left-[689px] w-[340px]">
                <p className="text-heading-two text-[24px] font-medium">
                  {state.reviewerName}
                </p>

                <p className="text-footnote mt-[8px] text-[#666666]">
                  {state.reviewerRole}
                </p>

                <p className="text-body-copy mt-[18px] text-[#666666]">
                  {state.reviewText}
                </p>
              </div>

              {/*
               * ==================================
               * VILLA LOCATION
               * ==================================
               */}

              <p className="text-body-copy absolute top-[197px] left-[689px] w-[340px] text-espresso/85">
                {state.villaLocation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}