import {
  type MouseEvent,
  useEffect,
  useRef,
} from 'react'

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

function AnimatedWords({
  text,
  letterClassName,
}: {
  text: string
  letterClassName: string
}) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {word.split('').map((character, characterIndex) => (
            <span
              key={`${character}-${characterIndex}`}
              className={`${letterClassName} inline-block`}
              aria-hidden="true"
            >
              {character}
            </span>
          ))}

          {wordIndex < words.length - 1 && (
            <span
              className={`${letterClassName} inline-block`}
              aria-hidden="true"
            >
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </>
  )
}

function PremiumTitle({
  text,
}: {
  text: string
}) {
  return (
    <AnimatedWords
      text={text}
      letterClassName="our-method-title-char"
    />
  )
}

interface OurMethodProps {
  onNavigate?: (targetId: string) => void
}

export function OurMethod({
  onNavigate,
}: OurMethodProps) {
  const sectionRef =
    useRef<HTMLElement>(null)

  const sceneRef =
    useRef<HTMLDivElement>(null)

  const headerRef =
    useRef<HTMLDivElement>(null)

  const ctaRef =
    useRef<HTMLAnchorElement>(null)

  const smallImageRefs =
    useRef<(HTMLDivElement | null)[]>([])

  const fullImageRefs =
    useRef<(HTMLDivElement | null)[]>([])

  const fullImageInnerRefs =
    useRef<(HTMLImageElement | null)[]>([])

  const titleRefs =
    useRef<(HTMLHeadingElement | null)[]>([])

  const statRefs =
    useRef<(HTMLSpanElement | null)[]>([])

  const subtitleRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  const descriptionRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  const supportRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  /*
   * ==========================================
   * SAME NAVIGATION SYSTEM AS HERO
   * ==========================================
   */

  const handleCtaClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()

    onNavigate('#contact-form')
  }

  useEffect(() => {
    if (
      !sectionRef.current ||
      !sceneRef.current ||
      !headerRef.current ||
      !ctaRef.current
    ) {
      return
    }

    const scene =
      sceneRef.current

    const header =
      headerRef.current

    const cta =
      ctaRef.current

    const small1 =
      smallImageRefs.current[0]

    const small2 =
      smallImageRefs.current[1]

    const small3 =
      smallImageRefs.current[2]

    const full1 =
      fullImageRefs.current[0]

    const full2 =
      fullImageRefs.current[1]

    const full3 =
      fullImageRefs.current[2]

    const fullImage1 =
      fullImageInnerRefs.current[0]

    const fullImage2 =
      fullImageInnerRefs.current[1]

    const fullImage3 =
      fullImageInnerRefs.current[2]

    const title1 =
      titleRefs.current[0]

    const title2 =
      titleRefs.current[1]

    const title3 =
      titleRefs.current[2]

    const stat1 =
      statRefs.current[0]

    const stat2 =
      statRefs.current[1]

    const stat3 =
      statRefs.current[2]

    const subtitle1 =
      subtitleRefs.current[0]

    const subtitle2 =
      subtitleRefs.current[1]

    const subtitle3 =
      subtitleRefs.current[2]

    const description1 =
      descriptionRefs.current[0]

    const description2 =
      descriptionRefs.current[1]

    const description3 =
      descriptionRefs.current[2]

    const support1 =
      supportRefs.current[0]

    const support2 =
      supportRefs.current[1]

    const support3 =
      supportRefs.current[2]

    if (
      !small1 ||
      !small2 ||
      !small3 ||
      !full1 ||
      !full2 ||
      !full3 ||
      !fullImage1 ||
      !fullImage2 ||
      !fullImage3 ||
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

    const titleChars1 =
      Array.from(
        title1.querySelectorAll<HTMLElement>(
          '.our-method-title-char',
        ),
      )

    const titleChars2 =
      Array.from(
        title2.querySelectorAll<HTMLElement>(
          '.our-method-title-char',
        ),
      )

    const titleChars3 =
      Array.from(
        title3.querySelectorAll<HTMLElement>(
          '.our-method-title-char',
        ),
      )

    /*
     * ==========================================
     * CTA ELEMENTS
     * ==========================================
     */

    const ctaLine =
      cta.querySelector<HTMLElement>(
        '.our-method-cta-line',
      )

    const ctaContent =
      cta.querySelector<HTMLElement>(
        '.our-method-cta-content',
      )

    const ctaLetters =
      Array.from(
        cta.querySelectorAll<HTMLElement>(
          '.our-method-cta-letter',
        ),
      )

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (prefersReducedMotion) {
      gsap.set(
        [
          title1,
          stat1,
          subtitle1,
          description1,
          support1,
        ],
        {
          opacity: 1,
        },
      )

      gsap.set(title1, {
        opacity: 0.4,
      })

      if (ctaLine) {
        gsap.set(ctaLine, {
          scaleX: 1,
        })
      }

      if (ctaContent) {
        gsap.set(ctaContent, {
          x: 0,
        })
      }

      gsap.set(ctaLetters, {
        opacity: 1,
        y: 0,
      })

      return
    }

    const ctx =
      gsap.context(() => {
        /*
         * ==========================================
         * INITIAL IMAGES
         * ==========================================
         */

        gsap.set(small1, {
          opacity: 1,
          x: 0,
          y: 0,
        })

        gsap.set(
          [small2, small3],
          {
            opacity: 0,
            x: 90,
            y: 90,
          },
        )

        gsap.set(
          [full1, full2, full3],
          {
            clipPath:
              'inset(100% 0% 0% 100%)',

            WebkitClipPath:
              'inset(100% 0% 0% 100%)',

            opacity: 1,
          },
        )

        gsap.set(
          [
            fullImage1,
            fullImage2,
            fullImage3,
          ],
          {
            scale: 1.035,

            transformOrigin:
              'center center',
          },
        )

        /*
         * ==========================================
         * COLORS
         * ==========================================
         */

        gsap.set(
          [title1, title2, title3],
          {
            color: SAGE,
          },
        )

        gsap.set(
          [stat1, stat2, stat3],
          {
            color: SAGE,
          },
        )

        gsap.set(
          [
            subtitle1,
            subtitle2,
            subtitle3,
          ],
          {
            color: ESPRESSO,
          },
        )

        gsap.set(
          [
            description1,
            description2,
            description3,
          ],
          {
            color:
              BODY_COLOR,
          },
        )

        gsap.set(
          [
            support1,
            support2,
            support3,
          ],
          {
            color:
              GRAY_LIGHT,
          },
        )

        gsap.set(header, {
          color: ESPRESSO,
        })

        gsap.set(cta, {
          color: ESPRESSO,
        })

        /*
         * ==========================================
         * INITIAL TEXT
         * ==========================================
         */

        gsap.set(
          [title1, title2, title3],
          {
            opacity: 0,
          },
        )

        gsap.set(
          [
            ...titleChars1,
            ...titleChars2,
            ...titleChars3,
          ],
          {
            opacity: 0,
            y: 4,
          },
        )

        gsap.set(
          [
            stat1,
            stat2,
            stat3,
          ],
          {
            opacity: 0,
            y: 8,
          },
        )

        gsap.set(
          [
            subtitle1,
            subtitle2,
            subtitle3,
          ],
          {
            opacity: 0,
            y: 7,
          },
        )

        gsap.set(
          [
            description1,
            description2,
            description3,
          ],
          {
            opacity: 0,
            y: 9,
          },
        )

        gsap.set(
          [
            support1,
            support2,
            support3,
          ],
          {
            opacity: 0,
            y: 14,
          },
        )

        /*
         * ==========================================
         * CTA INITIAL STATE
         * ==========================================
         */

        if (ctaLine) {
          gsap.set(
            ctaLine,
            {
              scaleX: 0,

              transformOrigin:
                'left center',
            },
          )
        }

        if (ctaContent) {
          gsap.set(
            ctaContent,
            {
              x: 14,
            },
          )
        }

        gsap.set(
          ctaLetters,
          {
            opacity: 0,
            y: 5,
          },
        )

        /*
         * ==========================================
         * TEXT HELPERS
         * ==========================================
         */

        const resetText = (
          timeline:
            gsap.core.Timeline,

          label:
            string,

          title:
            HTMLHeadingElement,

          chars:
            HTMLElement[],

          stat:
            HTMLSpanElement,

          subtitle:
            HTMLParagraphElement,

          description:
            HTMLParagraphElement,

          support:
            HTMLParagraphElement,
        ) => {
          timeline.set(
            title,
            {
              opacity: 0,
            },
            label,
          )

          timeline.set(
            chars,
            {
              opacity: 0,
              y: 4,
            },
            label,
          )

          timeline.set(
            stat,
            {
              opacity: 0,
              y: 8,
            },
            label,
          )

          timeline.set(
            subtitle,
            {
              opacity: 0,
              y: 7,
            },
            label,
          )

          timeline.set(
            description,
            {
              opacity: 0,
              y: 9,
            },
            label,
          )

          timeline.set(
            support,
            {
              opacity: 0,
              y: 14,
            },
            label,
          )
        }

        const revealText = (
          timeline:
            gsap.core.Timeline,

          label:
            string,

          title:
            HTMLHeadingElement,

          chars:
            HTMLElement[],

          stat:
            HTMLSpanElement,

          subtitle:
            HTMLParagraphElement,

          description:
            HTMLParagraphElement,

          support:
            HTMLParagraphElement,
        ) => {
          timeline.set(
            title,
            {
              opacity: 0.4,
            },
            `${label}+=0.01`,
          )

          timeline.to(
            chars,
            {
              opacity: 1,
              y: 0,

              duration: 0.42,

              stagger: {
                each: 0.03,
                from: 'start',
              },

              ease:
                'power3.out',
            },
            `${label}+=0.01`,
          )

          timeline.to(
            stat,
            {
              opacity: 1,
              y: 0,

              duration: 0.46,

              ease:
                'power3.out',
            },
            `${label}+=0.12`,
          )

          timeline.to(
            subtitle,
            {
              opacity: 1,
              y: 0,

              duration: 0.5,

              ease:
                'power3.out',
            },
            `${label}+=0.21`,
          )

          timeline.to(
            description,
            {
              opacity: 1,
              y: 0,

              duration: 0.66,

              ease:
                'power2.out',
            },
            `${label}+=0.31`,
          )

          timeline.to(
            support,
            {
              opacity: 0.9,
              y: 0,

              duration: 0.76,

              ease:
                'power3.out',
            },
            `${label}+=0.44`,
          )
        }

        const hideText = (
          timeline:
            gsap.core.Timeline,

          title:
            HTMLHeadingElement,

          stat:
            HTMLSpanElement,

          subtitle:
            HTMLParagraphElement,

          description:
            HTMLParagraphElement,

          support:
            HTMLParagraphElement,

          position:
            gsap.Position,
        ) => {
          timeline.to(
            [
              title,
              stat,
              subtitle,
              description,
              support,
            ],
            {
              opacity: 0,

              duration: 0.6,

              ease:
                'power2.inOut',
            },
            position,
          )
        }

        /*
         * ==========================================
         * MASTER TIMELINE
         * ==========================================
         */

        const timeline =
          gsap.timeline()

        /*
         * ==========================================
         * STATE 1 INTRO
         * ==========================================
         */

        timeline.addLabel(
          'small1Text',
          0,
        )

        resetText(
          timeline,
          'small1Text',
          title1,
          titleChars1,
          stat1,
          subtitle1,
          description1,
          support1,
        )

        revealText(
          timeline,
          'small1Text',
          title1,
          titleChars1,
          stat1,
          subtitle1,
          description1,
          support1,
        )

        /*
         * ==========================================
         * CTA INTRO — SAME AS HERO
         * ==========================================
         */

        if (ctaLine) {
          timeline.to(
            ctaLine,
            {
              scaleX: 1,

              duration: 1,

              ease:
                'power3.inOut',
            },
            0.18,
          )
        }

        if (ctaContent) {
          timeline.to(
            ctaContent,
            {
              x: 0,

              duration: 0.8,

              ease:
                'power3.out',
            },
            0.5,
          )
        }

        if (
          ctaLetters.length >
          0
        ) {
          timeline.to(
            ctaLetters,
            {
              opacity: 1,
              y: 0,

              duration: 0.32,

              stagger: {
                each: 0.025,
                from: 'start',
              },

              ease:
                'power2.out',
            },
            0.5,
          )
        }

        /*
         * ==========================================
         * SMALL 1 HOLD
         * ==========================================
         */

        timeline.to(
          {},
          {
            duration: 0.78,
          },
        )

        /*
         * ==========================================
         * SMALL 1 → FULL 1
         * ==========================================
         */

        timeline.to(small1, {
          opacity: 0,
          x: 45,
          y: 45,

          duration: 0.8,

          ease:
            'sine.inOut',
        })

        timeline.to(
          full1,
          {
            clipPath:
              'inset(0% 0% 0% 0%)',

            WebkitClipPath:
              'inset(0% 0% 0% 0%)',

            duration: 2.2,

            ease:
              'sine.inOut',
          },
          '-=0.55',
        )

        timeline.to(
          fullImage1,
          {
            scale: 1,

            duration: 2.6,

            ease:
              'power2.out',
          },
          '<',
        )

        hideText(
          timeline,
          title1,
          stat1,
          subtitle1,
          description1,
          support1,
          '-=1.72',
        )

        timeline.set(
          [
            title1,
            stat1,
            subtitle1,
            description1,
            support1,
          ],
          {
            color: ICE,
          },
        )

        timeline.to(
          [header, cta],
          {
            color: ICE,

            duration: 0.9,

            ease:
              'sine.inOut',
          },
          '-=1.25',
        )

        /*
         * ==========================================
         * FULL 1 TEXT
         * ==========================================
         */

        timeline.addLabel(
          'full1Text',
          '>',
        )

        resetText(
          timeline,
          'full1Text',
          title1,
          titleChars1,
          stat1,
          subtitle1,
          description1,
          support1,
        )

        revealText(
          timeline,
          'full1Text',
          title1,
          titleChars1,
          stat1,
          subtitle1,
          description1,
          support1,
        )

        timeline.to(
          {},
          {
            duration: 1,
          },
        )

        /*
         * ==========================================
         * FULL 1 → SMALL 2
         * ==========================================
         */

        hideText(
          timeline,
          title1,
          stat1,
          subtitle1,
          description1,
          support1,
          '>',
        )

        timeline.to(
          full1,
          {
            clipPath:
              'inset(100% 0% 0% 100%)',

            WebkitClipPath:
              'inset(100% 0% 0% 100%)',

            duration: 1.8,

            ease:
              'sine.inOut',
          },
          '-=0.25',
        )

        timeline.set(
          fullImage1,
          {
            scale: 1.035,
          },
          '>',
        )

        /*
         * ==========================================
         * STATE 2 COLORS
         * ==========================================
         */

        timeline.set(
          title2,
          {
            color: SAGE,
          },
        )

        timeline.set(
          stat2,
          {
            color: SAGE,
          },
        )

        timeline.set(
          subtitle2,
          {
            color: ESPRESSO,
          },
        )

        timeline.set(
          description2,
          {
            color:
              BODY_COLOR,
          },
        )

        timeline.set(
          support2,
          {
            color:
              GRAY_LIGHT,
          },
        )

        timeline.to(
          small2,
          {
            opacity: 1,
            x: 0,
            y: 0,

            duration: 1.05,

            ease:
              'sine.out',
          },
          '-=0.55',
        )

        timeline.to(
          [header, cta],
          {
            color:
              ESPRESSO,

            duration: 0.8,

            ease:
              'sine.inOut',
          },
          '<',
        )

        /*
         * ==========================================
         * SMALL 2 TEXT
         * ==========================================
         */

        timeline.addLabel(
          'small2Text',
          '>',
        )

        resetText(
          timeline,
          'small2Text',
          title2,
          titleChars2,
          stat2,
          subtitle2,
          description2,
          support2,
        )

        revealText(
          timeline,
          'small2Text',
          title2,
          titleChars2,
          stat2,
          subtitle2,
          description2,
          support2,
        )

        timeline.to(
          {},
          {
            duration: 0.82,
          },
        )

        /*
         * ==========================================
         * SMALL 2 → FULL 2
         * ==========================================
         */

        timeline.to(small2, {
          opacity: 0,
          x: 45,
          y: 45,

          duration: 0.8,

          ease:
            'sine.inOut',
        })

        timeline.to(
          full2,
          {
            clipPath:
              'inset(0% 0% 0% 0%)',

            WebkitClipPath:
              'inset(0% 0% 0% 0%)',

            duration: 2.2,

            ease:
              'sine.inOut',
          },
          '-=0.55',
        )

        timeline.to(
          fullImage2,
          {
            scale: 1,

            duration: 2.6,

            ease:
              'power2.out',
          },
          '<',
        )

        hideText(
          timeline,
          title2,
          stat2,
          subtitle2,
          description2,
          support2,
          '-=1.72',
        )

        timeline.set(
          [
            title2,
            stat2,
            subtitle2,
            description2,
            support2,
          ],
          {
            color: ICE,
          },
        )

        timeline.to(
          [header, cta],
          {
            color: ICE,

            duration: 0.9,

            ease:
              'sine.inOut',
          },
          '-=1.25',
        )

        /*
         * ==========================================
         * FULL 2 TEXT
         * ==========================================
         */

        timeline.addLabel(
          'full2Text',
          '>',
        )

        resetText(
          timeline,
          'full2Text',
          title2,
          titleChars2,
          stat2,
          subtitle2,
          description2,
          support2,
        )

        revealText(
          timeline,
          'full2Text',
          title2,
          titleChars2,
          stat2,
          subtitle2,
          description2,
          support2,
        )

        timeline.to(
          {},
          {
            duration: 1,
          },
        )

        /*
         * ==========================================
         * FULL 2 → SMALL 3
         * ==========================================
         */

        hideText(
          timeline,
          title2,
          stat2,
          subtitle2,
          description2,
          support2,
          '>',
        )

        timeline.to(
          full2,
          {
            clipPath:
              'inset(100% 0% 0% 100%)',

            WebkitClipPath:
              'inset(100% 0% 0% 100%)',

            duration: 1.8,

            ease:
              'sine.inOut',
          },
          '-=0.25',
        )

        timeline.set(
          fullImage2,
          {
            scale: 1.035,
          },
          '>',
        )

        /*
         * ==========================================
         * STATE 3 COLORS
         * ==========================================
         */

        timeline.set(
          title3,
          {
            color: SAGE,
          },
        )

        timeline.set(
          stat3,
          {
            color: SAGE,
          },
        )

        timeline.set(
          subtitle3,
          {
            color: ESPRESSO,
          },
        )

        timeline.set(
          description3,
          {
            color:
              BODY_COLOR,
          },
        )

        timeline.set(
          support3,
          {
            color:
              GRAY_LIGHT,
          },
        )

        timeline.to(
          small3,
          {
            opacity: 1,
            x: 0,
            y: 0,

            duration: 1.05,

            ease:
              'sine.out',
          },
          '-=0.55',
        )

        timeline.to(
          [header, cta],
          {
            color:
              ESPRESSO,

            duration: 0.8,

            ease:
              'sine.inOut',
          },
          '<',
        )

        /*
         * ==========================================
         * SMALL 3 TEXT
         * ==========================================
         */

        timeline.addLabel(
          'small3Text',
          '>',
        )

        resetText(
          timeline,
          'small3Text',
          title3,
          titleChars3,
          stat3,
          subtitle3,
          description3,
          support3,
        )

        revealText(
          timeline,
          'small3Text',
          title3,
          titleChars3,
          stat3,
          subtitle3,
          description3,
          support3,
        )

        timeline.to(
          {},
          {
            duration: 0.82,
          },
        )

        /*
         * ==========================================
         * SMALL 3 → FULL 3
         * ==========================================
         */

        timeline.to(small3, {
          opacity: 0,
          x: 45,
          y: 45,

          duration: 0.8,

          ease:
            'sine.inOut',
        })

        timeline.to(
          full3,
          {
            clipPath:
              'inset(0% 0% 0% 0%)',

            WebkitClipPath:
              'inset(0% 0% 0% 0%)',

            duration: 2.2,

            ease:
              'sine.inOut',
          },
          '-=0.55',
        )

        timeline.to(
          fullImage3,
          {
            scale: 1,

            duration: 2.6,

            ease:
              'power2.out',
          },
          '<',
        )

        hideText(
          timeline,
          title3,
          stat3,
          subtitle3,
          description3,
          support3,
          '-=1.72',
        )

        timeline.set(
          [
            title3,
            stat3,
            subtitle3,
            description3,
            support3,
          ],
          {
            color: ICE,
          },
        )

        timeline.to(
          [header, cta],
          {
            color: ICE,

            duration: 0.9,

            ease:
              'sine.inOut',
          },
          '-=1.25',
        )

        /*
         * ==========================================
         * FULL 3 TEXT
         * ==========================================
         */

        timeline.addLabel(
          'full3Text',
          '>',
        )

        resetText(
          timeline,
          'full3Text',
          title3,
          titleChars3,
          stat3,
          subtitle3,
          description3,
          support3,
        )

        revealText(
          timeline,
          'full3Text',
          title3,
          titleChars3,
          stat3,
          subtitle3,
          description3,
          support3,
        )

        timeline.to(
          {},
          {
            duration: 1.25,
          },
        )

        /*
         * ==========================================
         * SCROLLTRIGGER
         * ==========================================
         */

        ScrollTrigger.create({
          trigger:
            sectionRef.current,

          start:
            'top top',

          end: () => {
            const sectionHeight =
              sectionRef.current
                ?.getBoundingClientRect()
                .height ?? 0

            const sceneHeight =
              sceneRef.current
                ?.getBoundingClientRect()
                .height ?? 0

            return `+=${
              sectionHeight -
              sceneHeight
            }`
          },

          pin: scene,

          pinSpacing: false,

          anticipatePin: 1,

          animation:
            timeline,

          scrub: 2.3,

          invalidateOnRefresh:
            true,
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
      className="
        relative
        mt-[220px]
        h-[4320px]
        w-[1920px]
        bg-[#DDE4EE]
      "
    >
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
        {/* HEADER */}

        <div
          ref={headerRef}
          className="
            absolute
            top-10
            left-0
            z-[100]
            w-[1920px]
            opacity-70
          "
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
            className="
              absolute
              top-[31.6px]
              left-0
              h-[1.6px]
              w-full
            "
            style={{
              backgroundColor:
                'currentColor',
            }}
          />
        </div>

        {/* FULLSCREEN IMAGES */}

        {OUR_METHOD_STATES.map(
          (
            state,
            stateIndex,
          ) => (
            <div
              key={`full-${state.title}`}
              ref={(element) => {
                fullImageRefs.current[
                  stateIndex
                ] = element
              }}
              className="
                absolute
                inset-0
                z-20
                h-[1080px]
                w-[1920px]
                overflow-hidden
              "
              style={{
                clipPath:
                  'inset(100% 0% 0% 100%)',

                WebkitClipPath:
                  'inset(100% 0% 0% 100%)',

                willChange:
                  'clip-path',
              }}
            >
              <img
                ref={(element) => {
                  fullImageInnerRefs.current[
                    stateIndex
                  ] = element
                }}
                src={
                  WIDE_IMAGES[
                    stateIndex
                  ]
                }
                alt=""
                aria-hidden="true"
                className="
                  h-full
                  w-full
                  object-cover
                  will-change-transform
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-black/[0.16]
                "
              />
            </div>
          ),
        )}

        {/* TITLES */}

        {OUR_METHOD_STATES.map(
          (
            state,
            stateIndex,
          ) => (
            <h2
              key={`title-${state.title}`}
              ref={(element) => {
                titleRefs.current[
                  stateIndex
                ] = element
              }}
              aria-label={state.title}
              className="
                text-card-heading
                absolute
                top-[153px]
                left-10
                z-40
                m-0
                w-[544px]
              "
              style={{
                opacity: 0,
                color: SAGE,
              }}
            >
              <PremiumTitle
                text={state.title}
              />
            </h2>
          ),
        )}

        {/* SUPPORT */}

        {OUR_METHOD_STATES.map(
          (
            state,
            stateIndex,
          ) => (
            <p
              key={`support-${state.title}`}
              ref={(element) => {
                supportRefs.current[
                  stateIndex
                ] = element
              }}
              className="
                text-footnote
                absolute
                top-[867px]
                left-10
                z-40
                w-[216px]
              "
              style={{
                opacity: 0,
                color: GRAY_LIGHT,

                willChange:
                  'transform, opacity',
              }}
            >
              {
                state
                  .supportingText[0]
              }

              <br />

              {
                state
                  .supportingText[1]
              }
            </p>
          ),
        )}

        {/* INFO */}

        {OUR_METHOD_STATES.map(
          (
            state,
            stateIndex,
          ) => (
            <div
              key={`info-${state.title}`}
              className="
                absolute
                top-[153px]
                left-[822px]
                z-40
                w-[290px]
              "
            >
              <span
                ref={(element) => {
                  statRefs.current[
                    stateIndex
                  ] = element
                }}
                className="
                  text-stat-accent
                  block
                "
                style={{
                  opacity: 0,
                  color: SAGE,

                  willChange:
                    'transform, opacity',
                }}
              >
                {state.stat}
              </span>

              <p
                ref={(element) => {
                  subtitleRefs.current[
                    stateIndex
                  ] = element
                }}
                className="
                  text-heading-two
                  mt-[10px]
                "
                style={{
                  opacity: 0,
                  color: ESPRESSO,

                  willChange:
                    'transform, opacity',
                }}
              >
                {state.subtitle}
              </p>

              <p
                ref={(element) => {
                  descriptionRefs.current[
                    stateIndex
                  ] = element
                }}
                className="
                  text-body-copy
                  mt-[10px]
                "
                style={{
                  opacity: 0,
                  color: BODY_COLOR,

                  willChange:
                    'transform, opacity',
                }}
              >
                {state.description}
              </p>
            </div>
          ),
        )}

        {/* SMALL IMAGES */}

        {OUR_METHOD_STATES.map(
          (
            state,
            stateIndex,
          ) => (
            <div
              key={`small-${state.title}`}
              ref={(element) => {
                smallImageRefs.current[
                  stateIndex
                ] = element
              }}
              className="
                absolute
                top-[79px]
                left-[1415px]
                z-30
                h-[873px]
                w-[505px]
                overflow-hidden
              "
              style={{
                opacity:
                  stateIndex ===
                  0
                    ? 1
                    : 0,

                transform:
                  stateIndex ===
                  0
                    ? 'translate(0px, 0px)'
                    : 'translate(90px, 90px)',

                willChange:
                  'transform, opacity',
              }}
            >
              <img
                src={
                  WIDE_IMAGES[
                    stateIndex
                  ]
                }
                alt={`${state.title} — ${state.stat}`}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-black/20
                "
              />
            </div>
          ),
        )}

        {/* GET ADVICE — HERO STYLE + HERO TRANSITION */}

        <a
          ref={ctaRef}
          href="#contact-form"
          onClick={handleCtaClick}
          className="
            group
            absolute
            top-[872px]
            left-[828px]
            z-[100]
            flex
            w-[290px]
            flex-col
            text-left
            focus-visible:outline-none
          "
        >
          <span
            className="
              our-method-cta-line
              block
              h-[2px]
              w-full
              origin-left
            "
          >
            <span
              className="
                block
                h-full
                w-full
                origin-right
                bg-current

                transition-transform
                duration-300
                ease-out

                group-hover:scale-x-[0.95]
                group-focus-visible:scale-x-[0.95]
              "
            />
          </span>

          <span
            className="
              our-method-cta-content
              mt-[6px]
              flex
              items-center
              justify-between
            "
          >
            <span
              className="text-button-label"
              aria-label="Get Advice"
            >
              <AnimatedWords
                text="Get Advice"
                letterClassName="our-method-cta-letter"
              />
            </span>

            <span
              className="
                inline-flex

                transition-transform
                duration-300
                ease-out

                group-hover:translate-x-[8px]
                group-focus-visible:translate-x-[8px]
              "
            >
              <ArrowIcon />
            </span>
          </span>
        </a>
      </div>
    </section>
  )
}