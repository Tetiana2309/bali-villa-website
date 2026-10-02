import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { HOW_WE_WORK_STEPS } from '../data/howWeWork'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL = import.meta.env.BASE_URL

const STEP_TOP_OFFSETS = [0, 264, 528, 792]
const STEP_HEIGHT = 184

const STEP_IMAGES = [
  `${BASE_URL}images/how-we-work-inquiry.webp`,
  `${BASE_URL}images/how-we-work-selection.webp`,
  `${BASE_URL}images/how-we-work-showing.webp`,
  `${BASE_URL}images/how-we-work-closing.webp`,
]

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)

  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
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
       * HOW WE WORK STEPS
       * ==========================================
       */

      HOW_WE_WORK_STEPS.forEach((_, index) => {
        const step = stepRefs.current[index]
        const image = imageRefs.current[index]
        const content = contentRefs.current[index]
        const dot = dotRefs.current[index]

        if (!step || !image || !content || !dot) return

        /*
         * ==========================================
         * INITIAL STATE
         * ==========================================
         *
         * No translate.
         * No scale.
         * Only opacity.
         */

        gsap.set(image, {
          opacity: 0,
        })

        gsap.set(content, {
          opacity: 0,
        })

        gsap.set(dot, {
          opacity: 0.25,
        })

        /*
         * ==========================================
         * ACTIVE STATE
         * ==========================================
         */

        const activateStep = () => {
          gsap.to(image, {
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(content, {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(dot, {
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        /*
         * ==========================================
         * INACTIVE STATE
         * ==========================================
         */

        const deactivateStep = () => {
          gsap.to(image, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(content, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(dot, {
            opacity: 0.25,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        /*
         * ==========================================
         * SCROLL TRIGGER
         * ==========================================
         *
         * No scrub.
         * Animation fires only when the row
         * enters / leaves the reading area.
         */

        ScrollTrigger.create({
          trigger: step,
          start: 'top 72%',
          end: 'bottom 32%',

          onEnter: activateStep,
          onEnterBack: activateStep,

          onLeave: deactivateStep,
          onLeaveBack: deactivateStep,
        })
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
          },
          {
            opacity: 0.9,
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
          },
          {
            opacity: 1,
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
       * ==========================================
       * CTA LINE
       * ==========================================
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
            ease: 'power3.inOut',
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
            {/* Large title */}
            <span className="text-wordmark absolute top-0 left-10 opacity-40">
              {step.title}
            </span>

            {/* Villa image */}
            <div
              ref={(element) => {
                imageRefs.current[i] = element
              }}
              className="absolute top-[60px] left-[870px] h-[164px] w-[324px] overflow-hidden rounded-[1px]"
            >
              <img
                src={STEP_IMAGES[i]}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="block h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/30" />
            </div>

            {/* Right content */}
            <div
              ref={(element) => {
                contentRefs.current[i] = element
              }}
              className="absolute top-0 right-[173px] w-[335px]"
            >
              <p className="text-heading-two">
                {step.subtitle}
              </p>

              <p className="text-body-copy mt-[10px] text-espresso/70">
                {step.description}
              </p>
            </div>

            {/* Dot */}
            <span
              ref={(element) => {
                dotRefs.current[i] = element
              }}
              className="absolute top-0 right-10 h-4 w-4 rounded-full bg-[#7B978A]"
            />

            {/* Divider */}
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