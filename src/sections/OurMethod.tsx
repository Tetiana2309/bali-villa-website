import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { ArrowIcon } from '../components/ArrowIcon'
import { OUR_METHOD_STATES } from '../data/ourMethod'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL = import.meta.env.BASE_URL

const WIDE_IMAGES = [
  `${BASE_URL}images/our-method-image-1-wide.webp`,
  `${BASE_URL}images/our-method-image-2-wide.webp`,
  `${BASE_URL}images/our-method-image-3-wide.webp`,
]

const ICE = '#DDE4EE'
const ESPRESSO = '#392919'
const SAGE = '#7B978A'
const GRAY_LIGHT = '#999999'
const BODY_COLOR = 'rgba(57, 41, 25, 0.7)'

export function OurMethod() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const smallImageRefs = useRef<(HTMLDivElement | null)[]>([])
  const fullImageRefs = useRef<(HTMLDivElement | null)[]>([])

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const statRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const supportRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (
      !sectionRef.current ||
      !sceneRef.current ||
      !headerRef.current ||
      !ctaRef.current
    ) {
      return
    }

    const scene = sceneRef.current
    const header = headerRef.current
    const cta = ctaRef.current

    const small1 = smallImageRefs.current[0]
    const small2 = smallImageRefs.current[1]
    const small3 = smallImageRefs.current[2]

    const full1 = fullImageRefs.current[0]
    const full2 = fullImageRefs.current[1]
    const full3 = fullImageRefs.current[2]

    const title1 = titleRefs.current[0]
    const title2 = titleRefs.current[1]
    const title3 = titleRefs.current[2]

    const stat1 = statRefs.current[0]
    const stat2 = statRefs.current[1]
    const stat3 = statRefs.current[2]

    const subtitle1 = subtitleRefs.current[0]
    const subtitle2 = subtitleRefs.current[1]
    const subtitle3 = subtitleRefs.current[2]

    const description1 = descriptionRefs.current[0]
    const description2 = descriptionRefs.current[1]
    const description3 = descriptionRefs.current[2]

    const support1 = supportRefs.current[0]
    const support2 = supportRefs.current[1]
    const support3 = supportRefs.current[2]

    if (
      !small1 ||
      !small2 ||
      !small3 ||
      !full1 ||
      !full2 ||
      !full3 ||
      !title1 ||
      !title2 ||
      !title3 ||
      !stat1 ||
      !stat2 ||
      !stat3 ||
      !subtitle1 ||
      !subtitle2 ||
      !subtitle3 ||
      !description1 ||
      !description2 ||
      !description3 ||
      !support1 ||
      !support2 ||
      !support3
    ) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * INITIAL SMALL IMAGES
       * ==========================================
       */

      gsap.set(small1, {
        opacity: 1,
        x: 0,
        y: 0,
      })

      gsap.set([small2, small3], {
        opacity: 0,
        x: 90,
        y: 90,
      })

      /*
       * ==========================================
       * FULLSCREEN IMAGES
       * hidden in bottom-right
       * ==========================================
       */

      gsap.set([full1, full2, full3], {
        clipPath: 'inset(100% 0% 0% 100%)',
        WebkitClipPath: 'inset(100% 0% 0% 100%)',
        opacity: 1,
      })

      /*
       * ==========================================
       * STATE 1 TEXT
       * ==========================================
       */

      gsap.set(title1, {
        opacity: 0.4,
        color: SAGE,
      })

      gsap.set(stat1, {
        opacity: 1,
        color: SAGE,
      })

      gsap.set(subtitle1, {
        opacity: 1,
        color: ESPRESSO,
      })

      gsap.set(description1, {
        opacity: 1,
        color: BODY_COLOR,
      })

      gsap.set(support1, {
        opacity: 0.9,
        color: GRAY_LIGHT,
      })

      /*
       * STATES 2 + 3 hidden
       */

      gsap.set(
        [
          title2,
          title3,
          stat2,
          stat3,
          subtitle2,
          subtitle3,
          description2,
          description3,
          support2,
          support3,
        ],
        {
          opacity: 0,
        },
      )

      gsap.set(header, {
        color: ESPRESSO,
      })

      gsap.set(cta, {
        color: ESPRESSO,
      })

      const timeline = gsap.timeline()

      /*
       * ==========================================
       * SMALL 1 HOLD
       * ==========================================
       */

      timeline.to({}, { duration: 0.9 })

      /*
       * ==========================================
       * SMALL 1 → BIG 1
       * smooth bottom-right reveal
       * ==========================================
       */

      timeline.to(small1, {
        opacity: 0,
        x: 45,
        y: 45,
        duration: 0.8,
        ease: 'sine.inOut',
      })

      timeline.to(
        full1,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          WebkitClipPath: 'inset(0% 0% 0% 0%)',
          duration: 2.2,
          ease: 'sine.inOut',
        },
        '-=0.55',
      )

      /*
       * Text disappears gently
       * while fullscreen is already opening.
       */

      timeline.to(
        [title1, stat1, subtitle1, description1, support1],
        {
          opacity: 0,
          duration: 0.45,
          ease: 'sine.inOut',
        },
        '-=1.75',
      )

      timeline.set(
        [title1, stat1, subtitle1, description1, support1],
        {
          color: ICE,
        },
      )

      timeline.to(
        [header, cta],
        {
          color: ICE,
          duration: 0.8,
          ease: 'sine.inOut',
        },
        '-=1.25',
      )

      /*
       * Text returns only when image
       * is already substantially open.
       */

      timeline.to(
        title1,
        {
          opacity: 0.4,
          duration: 0.7,
          ease: 'sine.out',
        },
        '-=0.8',
      )

      timeline.to(
        [stat1, subtitle1, description1],
        {
          opacity: 1,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      timeline.to(
        support1,
        {
          opacity: 0.9,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      /*
       * BIG 1 HOLD
       */

      timeline.to({}, { duration: 1 })

      /*
       * ==========================================
       * BIG 1 → SMALL 2
       * ==========================================
       */

      timeline.to(
        [title1, stat1, subtitle1, description1, support1],
        {
          opacity: 0,
          duration: 0.55,
          ease: 'sine.inOut',
        },
      )

      timeline.to(
        full1,
        {
          clipPath: 'inset(100% 0% 0% 100%)',
          WebkitClipPath: 'inset(100% 0% 0% 100%)',
          duration: 1.8,
          ease: 'sine.inOut',
        },
        '-=0.25',
      )

      /*
       * Prepare state 2
       */

      timeline.set(title2, {
        color: SAGE,
      })

      timeline.set(stat2, {
        color: SAGE,
      })

      timeline.set(subtitle2, {
        color: ESPRESSO,
      })

      timeline.set(description2, {
        color: BODY_COLOR,
      })

      timeline.set(support2, {
        color: GRAY_LIGHT,
      })

      /*
       * Small 2 enters smoothly
       * from bottom-right.
       */

      timeline.to(
        small2,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.05,
          ease: 'sine.out',
        },
        '-=0.55',
      )

      timeline.to(
        [header, cta],
        {
          color: ESPRESSO,
          duration: 0.75,
          ease: 'sine.inOut',
        },
        '<',
      )

      timeline.to(
        title2,
        {
          opacity: 0.4,
          duration: 0.7,
          ease: 'sine.out',
        },
        '-=0.65',
      )

      timeline.to(
        [stat2, subtitle2, description2],
        {
          opacity: 1,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      timeline.to(
        support2,
        {
          opacity: 0.9,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      /*
       * SMALL 2 HOLD
       */

      timeline.to({}, { duration: 0.9 })

      /*
       * ==========================================
       * SMALL 2 → BIG 2
       * same smooth bottom-right reveal
       * ==========================================
       */

      timeline.to(small2, {
        opacity: 0,
        x: 45,
        y: 45,
        duration: 0.8,
        ease: 'sine.inOut',
      })

      timeline.to(
        full2,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          WebkitClipPath: 'inset(0% 0% 0% 0%)',
          duration: 2.2,
          ease: 'sine.inOut',
        },
        '-=0.55',
      )

      timeline.to(
        [title2, stat2, subtitle2, description2, support2],
        {
          opacity: 0,
          duration: 0.45,
          ease: 'sine.inOut',
        },
        '-=1.75',
      )

      timeline.set(
        [title2, stat2, subtitle2, description2, support2],
        {
          color: ICE,
        },
      )

      timeline.to(
        [header, cta],
        {
          color: ICE,
          duration: 0.8,
          ease: 'sine.inOut',
        },
        '-=1.25',
      )

      timeline.to(
        title2,
        {
          opacity: 0.4,
          duration: 0.7,
          ease: 'sine.out',
        },
        '-=0.8',
      )

      timeline.to(
        [stat2, subtitle2, description2],
        {
          opacity: 1,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      timeline.to(
        support2,
        {
          opacity: 0.9,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      /*
       * BIG 2 HOLD
       */

      timeline.to({}, { duration: 1 })

      /*
       * ==========================================
       * BIG 2 → SMALL 3
       * ==========================================
       */

      timeline.to(
        [title2, stat2, subtitle2, description2, support2],
        {
          opacity: 0,
          duration: 0.55,
          ease: 'sine.inOut',
        },
      )

      timeline.to(
        full2,
        {
          clipPath: 'inset(100% 0% 0% 100%)',
          WebkitClipPath: 'inset(100% 0% 0% 100%)',
          duration: 1.8,
          ease: 'sine.inOut',
        },
        '-=0.25',
      )

      /*
       * Prepare state 3
       */

      timeline.set(title3, {
        color: SAGE,
      })

      timeline.set(stat3, {
        color: SAGE,
      })

      timeline.set(subtitle3, {
        color: ESPRESSO,
      })

      timeline.set(description3, {
        color: BODY_COLOR,
      })

      timeline.set(support3, {
        color: GRAY_LIGHT,
      })

      timeline.to(
        small3,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.05,
          ease: 'sine.out',
        },
        '-=0.55',
      )

      timeline.to(
        [header, cta],
        {
          color: ESPRESSO,
          duration: 0.75,
          ease: 'sine.inOut',
        },
        '<',
      )

      timeline.to(
        title3,
        {
          opacity: 0.4,
          duration: 0.7,
          ease: 'sine.out',
        },
        '-=0.65',
      )

      timeline.to(
        [stat3, subtitle3, description3],
        {
          opacity: 1,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      timeline.to(
        support3,
        {
          opacity: 0.9,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      /*
       * SMALL 3 HOLD
       */

      timeline.to({}, { duration: 0.9 })

      /*
       * ==========================================
       * SMALL 3 → BIG 3
       * smooth bottom-right reveal
       * ==========================================
       */

      timeline.to(small3, {
        opacity: 0,
        x: 45,
        y: 45,
        duration: 0.8,
        ease: 'sine.inOut',
      })

      timeline.to(
        full3,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          WebkitClipPath: 'inset(0% 0% 0% 0%)',
          duration: 2.2,
          ease: 'sine.inOut',
        },
        '-=0.55',
      )

      timeline.to(
        [title3, stat3, subtitle3, description3, support3],
        {
          opacity: 0,
          duration: 0.45,
          ease: 'sine.inOut',
        },
        '-=1.75',
      )

      timeline.set(
        [title3, stat3, subtitle3, description3, support3],
        {
          color: ICE,
        },
      )

      timeline.to(
        [header, cta],
        {
          color: ICE,
          duration: 0.8,
          ease: 'sine.inOut',
        },
        '-=1.25',
      )

      timeline.to(
        title3,
        {
          opacity: 0.4,
          duration: 0.7,
          ease: 'sine.out',
        },
        '-=0.8',
      )

      timeline.to(
        [stat3, subtitle3, description3],
        {
          opacity: 1,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      timeline.to(
        support3,
        {
          opacity: 0.9,
          duration: 0.7,
          ease: 'sine.out',
        },
        '<',
      )

      /*
       * FINAL BIG 3 HOLD
       */

      timeline.to({}, { duration: 1.2 })

      /*
       * ==========================================
       * SCROLLTRIGGER
       * ==========================================
       */

      ScrollTrigger.create({
        trigger: sectionRef.current,

        start: 'top top',

        end: () => {
          const sectionHeight =
            sectionRef.current?.getBoundingClientRect().height ?? 0

          const sceneHeight =
            sceneRef.current?.getBoundingClientRect().height ?? 0

          return `+=${sectionHeight - sceneHeight}`
        },

        pin: scene,
        pinSpacing: false,
        anticipatePin: 1,

        animation: timeline,

        scrub: 2.3,

        invalidateOnRefresh: true,
      })
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="our-method"
      aria-label="Our Method"
      className="relative mt-[220px] h-[4320px] w-[1920px] bg-[#DDE4EE]"
    >
      <div
        ref={sceneRef}
        className="relative h-[1080px] w-[1920px] overflow-hidden bg-[#DDE4EE]"
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="absolute top-10 left-0 z-[100] w-[1920px] opacity-70"
        >
          <span className="text-heading-two absolute top-0 left-10">
            Facts That Speak For Us
          </span>

          <span className="text-heading-two absolute top-0 left-[1413px]">
            About Us
          </span>

          <span className="text-heading-two absolute top-0 right-10">
            We Do Not Promise, We Deliver
          </span>

          <span
            className="absolute top-[31.6px] left-0 h-[1.6px] w-full"
            style={{
              backgroundColor: 'currentColor',
            }}
          />
        </div>

        {/* Fullscreen images */}
        {OUR_METHOD_STATES.map((state, stateIndex) => (
          <div
            key={`full-${state.title}`}
            ref={(element) => {
              fullImageRefs.current[stateIndex] = element
            }}
            className="absolute inset-0 z-20 h-[1080px] w-[1920px] overflow-hidden"
            style={{
              clipPath: 'inset(100% 0% 0% 100%)',
              WebkitClipPath: 'inset(100% 0% 0% 100%)',
              willChange: 'clip-path',
            }}
          >
            <img
              src={WIDE_IMAGES[stateIndex]}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/25" />
          </div>
        ))}

        {/* Large headings */}
        {OUR_METHOD_STATES.map((state, stateIndex) => (
          <h2
            key={`title-${state.title}`}
            ref={(element) => {
              titleRefs.current[stateIndex] = element
            }}
            className="text-card-heading absolute top-[153px] left-10 z-40 m-0 w-[544px]"
            style={{
              opacity: stateIndex === 0 ? 0.4 : 0,
              color: SAGE,
            }}
          >
            {state.title}
          </h2>
        ))}

        {/* Supporting copy */}
        {OUR_METHOD_STATES.map((state, stateIndex) => (
          <p
            key={`support-${state.title}`}
            ref={(element) => {
              supportRefs.current[stateIndex] = element
            }}
            className="text-footnote absolute top-[867px] left-10 z-40 w-[216px]"
            style={{
              opacity: stateIndex === 0 ? 0.9 : 0,
              color: GRAY_LIGHT,
            }}
          >
            {state.supportingText[0]}
            <br />
            {state.supportingText[1]}
          </p>
        ))}

        {/* Info */}
        {OUR_METHOD_STATES.map((state, stateIndex) => (
          <div
            key={`info-${state.title}`}
            className="absolute top-[153px] left-[822px] z-40 w-[290px]"
          >
            <span
              ref={(element) => {
                statRefs.current[stateIndex] = element
              }}
              className="text-stat-accent block"
              style={{
                opacity: stateIndex === 0 ? 1 : 0,
                color: SAGE,
              }}
            >
              {state.stat}
            </span>

            <p
              ref={(element) => {
                subtitleRefs.current[stateIndex] = element
              }}
              className="text-heading-two mt-[10px]"
              style={{
                opacity: stateIndex === 0 ? 1 : 0,
                color: ESPRESSO,
              }}
            >
              {state.subtitle}
            </p>

            <p
              ref={(element) => {
                descriptionRefs.current[stateIndex] = element
              }}
              className="text-body-copy mt-[10px]"
              style={{
                opacity: stateIndex === 0 ? 1 : 0,
                color: BODY_COLOR,
              }}
            >
              {state.description}
            </p>
          </div>
        ))}

        {/* Small images */}
        {OUR_METHOD_STATES.map((state, stateIndex) => (
          <div
            key={`small-${state.title}`}
            ref={(element) => {
              smallImageRefs.current[stateIndex] = element
            }}
            className="absolute top-[79px] left-[1415px] z-30 h-[873px] w-[505px] overflow-hidden"
            style={{
              opacity: stateIndex === 0 ? 1 : 0,
              transform:
                stateIndex === 0
                  ? 'translate(0px, 0px)'
                  : 'translate(90px, 90px)',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={WIDE_IMAGES[stateIndex]}
              alt={`${state.title} — ${state.stat}`}
              className="h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/25" />
          </div>
        ))}

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#contact-form"
          className="group absolute top-[872px] left-[828px] z-[100] flex w-[290px] flex-col gap-1.5 text-left"
        >
          <span
            className="h-[2px] w-full"
            style={{
              backgroundColor: 'currentColor',
            }}
          />

          <span className="flex items-center justify-between">
            <span className="text-button-label">Get Advice</span>

            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  )
}