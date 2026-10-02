import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { HOW_WE_WORK_STEPS } from '../data/howWeWork'

gsap.registerPlugin(ScrollTrigger)

const STEP_TOP_OFFSETS = [0, 264, 528, 792]
const STEP_HEIGHT = 184

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)

  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  const footerTextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const ctaLineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * STEPS
       * ==========================================
       */

      HOW_WE_WORK_STEPS.forEach((_, index) => {
        const step = stepRefs.current[index]
        const title = titleRefs.current[index]
        const content = contentRefs.current[index]
        const dot = dotRefs.current[index]

        if (!step || !title || !content || !dot) return

        /*
         * Base state
         */

        gsap.set(title, {
          opacity: 0.32,
          x: 0,
        })

        gsap.set(content, {
          opacity: 0.55,
        })

        gsap.set(dot, {
          opacity: 0.25,
          scale: 1,
          transformOrigin: '50% 50%',
        })

        /*
         * ==========================================
         * ACTIVE STEP ANIMATION
         * ==========================================
         */

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            end: 'bottom 35%',
            scrub: 1.8,
          },
        })

        /*
         * BASE → ACTIVE
         */

        timeline.to(
          title,
          {
            opacity: 0.68,
            x: 8,
            duration: 1,
            ease: 'none',
          },
          0,
        )

        timeline.to(
          content,
          {
            opacity: 1,
            duration: 1,
            ease: 'none',
          },
          0,
        )

        timeline.to(
          dot,
          {
            opacity: 1,
            scale: 1.12,
            duration: 1,
            ease: 'none',
          },
          0,
        )

        /*
         * Active hold
         */

        timeline.to({}, { duration: 0.55 })

        /*
         * ACTIVE → BASE
         */

        timeline.to(
          title,
          {
            opacity: 0.32,
            x: 0,
            duration: 1,
            ease: 'none',
          },
        )

        timeline.to(
          content,
          {
            opacity: 0.55,
            duration: 1,
            ease: 'none',
          },
          '<',
        )

        timeline.to(
          dot,
          {
            opacity: 0.25,
            scale: 1,
            duration: 1,
            ease: 'none',
          },
          '<',
        )
      })

      /*
       * ==========================================
       * FOOTER TEXT
       * ==========================================
       */

      if (footerTextRef.current) {
        gsap.fromTo(
          footerTextRef.current,
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 0.9,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerTextRef.current,
              start: 'top 92%',
              once: true,
            },
          },
        )
      }

      /*
       * ==========================================
       * CTA
       * ==========================================
       */

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 92%',
              once: true,
            },
          },
        )
      }

      /*
       * CTA line
       */

      if (ctaLineRef.current) {
        gsap.fromTo(
          ctaLineRef.current,
          {
            scaleX: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 92%',
              once: true,
            },
          },
        )
      }
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How We Work"
      className="relative mt-[220px] h-[1312px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-10 opacity-70"
        left="A Minimum Of Actions On Your Part."
        center="How We Work"
        right="Maximum - From Ours."
      />

      <div className="absolute top-[152px] left-0 h-[976px] w-[1920px]">
        {HOW_WE_WORK_STEPS.map((step, i) => (
          <div
            key={step.title}
            ref={(element) => {
              stepRefs.current[i] = element
            }}
            className="absolute left-0 h-[184px] w-[1920px]"
            style={{
              top: STEP_TOP_OFFSETS[i],
            }}
          >
            <div className="absolute top-0 left-10 h-[124px] w-[1840px]">
              <span
                ref={(element) => {
                  titleRefs.current[i] = element
                }}
                className="text-wordmark absolute top-0 left-0"
              >
                {step.title}
              </span>

              <span
                ref={(element) => {
                  dotRefs.current[i] = element
                }}
                className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#7B978A]"
              />

              <div
                ref={(element) => {
                  contentRefs.current[i] = element
                }}
                className="absolute top-0 right-[133px] w-[335px]"
              >
                <p className="text-heading-two">
                  {step.subtitle}
                </p>

                <p className="text-body-copy mt-[10px] text-espresso/70">
                  {step.description}
                </p>
              </div>
            </div>

            <span
              className="absolute left-0 h-[1.6px] w-full bg-espresso/30"
              style={{
                top: STEP_HEIGHT,
              }}
            />
          </div>
        ))}
      </div>

      <p
        ref={footerTextRef}
        className="text-footnote absolute top-[1228px] left-10 w-[260px] text-gray-light/90"
      >
        from your first request to your key.
        <br />
        we handle everything.
      </p>

      <a
        ref={ctaRef}
        href="#contact-form"
        className="group absolute top-[1234px] left-[1413px] flex w-[467px] flex-col gap-1.5 text-left"
      >
        <span
          ref={ctaLineRef}
          className="h-[2px] w-full bg-espresso"
        />

        <span className="flex items-center justify-between">
          <span className="text-button-label">
            Get Advice
          </span>

          <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>
    </section>
  )
}