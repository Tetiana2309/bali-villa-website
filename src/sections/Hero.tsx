import {
  type MouseEvent,
  useLayoutEffect,
  useRef,
} from 'react'

import { ArrowIcon } from '../components/ArrowIcon'
import { NAV_ITEMS } from '../data/site'
import { gsap } from '../lib/gsap'

const BASE_URL =
  import.meta.env.BASE_URL

const HERO_TITLE = 'vill.bali'

const DESCRIPTION_LINES = [
  'this is not a place to look for housing -',
  'this is a place to find your home.',
]

interface UtilityLinkProps {
  label: string
  targetId: string
  opacity: number
  onNavigate?: (
    targetId: string,
  ) => void
}

interface HeroProps {
  heroReady?: boolean
  onNavigate?: (
    targetId: string,
  ) => void
}

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
      {words.map(
        (
          word,
          wordIndex,
        ) => (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-block whitespace-nowrap"
          >
            {word
              .split('')
              .map(
                (
                  character,
                  characterIndex,
                ) => (
                  <span
                    key={`${character}-${characterIndex}`}
                    className={`${letterClassName} inline-block`}
                    aria-hidden="true"
                  >
                    {character}
                  </span>
                ),
              )}

            {wordIndex <
              words.length - 1 && (
              <span
                className={`${letterClassName} inline-block`}
                aria-hidden="true"
              >
                {'\u00A0'}
              </span>
            )}
          </span>
        ),
      )}
    </>
  )
}

function UtilityLink({
  label,
  targetId,
  opacity,
  onNavigate,
}: UtilityLinkProps) {
  const isDimmed =
    opacity < 1

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()

    onNavigate(targetId)
  }

  return (
    <a
      href={targetId}
      onClick={handleClick}
      className={`
        hero-utility-link
        group
        flex
        w-[364px]
        flex-col
        text-ice

        transition-opacity
        duration-300
        ease-out

        ${
          isDimmed
            ? `
              opacity-50
              hover:opacity-100
              focus-visible:opacity-100
            `
            : 'opacity-100'
        }

        focus-visible:outline-none
      `}
    >
      {/*
       * ==========================================
       * UTILITY LINE
       * ==========================================
       */}

      <span
        className="
          hero-utility-line
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
            bg-ice

            transition-transform
            duration-300
            ease-out

            group-hover:scale-x-[0.95]
            group-focus-visible:scale-x-[0.95]
          "
        />
      </span>

      {/*
       * ==========================================
       * UTILITY CONTENT
       * ==========================================
       */}

      <span
        className="
          hero-utility-content
          mt-[6px]
          flex
          items-center
          justify-between
        "
      >
        <span
          className="text-button-label"
          aria-label={label}
        >
          <AnimatedWords
            text={label}
            letterClassName="hero-utility-letter"
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
  )
}

export function Hero({
  heroReady = false,
  onNavigate,
}: HeroProps) {
  const sectionRef =
    useRef<HTMLElement>(null)

  const logoRef =
    useRef<HTMLDivElement>(null)

  const utilityRef =
    useRef<HTMLDivElement>(null)

  const navRef =
    useRef<HTMLElement>(null)

  const titleLetterRefs =
    useRef<(HTMLSpanElement | null)[]>([])

  const titleDotRef =
    useRef<HTMLSpanElement>(null)

  const descriptionLetterRefs =
    useRef<(HTMLSpanElement | null)[]>([])

  /*
   * ==========================================
   * NAVIGATION
   * ==========================================
   *
   * Hero does NOT control scrolling.
   *
   * It only sends the destination ID
   * to App.tsx.
   *
   * App.tsx will handle the visual
   * section transition and repositioning.
   * ==========================================
   */

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()

    onNavigate(targetId)
  }

  useLayoutEffect(() => {
    /*
     * ==========================================
     * TITLE LETTERS
     * ==========================================
     */

    const titleLetters =
      titleLetterRefs.current.filter(
        (
          letter,
        ): letter is HTMLSpanElement =>
          letter !== null,
      )

    const regularLetters =
      titleLetters.filter(
        (letter) =>
          letter !==
          titleDotRef.current,
      )

    /*
     * ==========================================
     * LOGO LETTERS
     * ==========================================
     */

    const logoLetters =
      logoRef.current
        ? Array.from(
            logoRef.current.querySelectorAll<HTMLElement>(
              '.hero-logo-letter',
            ),
          )
        : []

    /*
     * ==========================================
     * DESCRIPTION LETTERS
     * ==========================================
     */

    const descriptionLetters =
      descriptionLetterRefs.current.filter(
        (
          letter,
        ): letter is HTMLSpanElement =>
          letter !== null,
      )

    /*
     * ==========================================
     * UTILITY
     * ==========================================
     */

    const utilityLines =
      utilityRef.current
        ? Array.from(
            utilityRef.current.querySelectorAll<HTMLElement>(
              '.hero-utility-line',
            ),
          )
        : []

    const utilityContents =
      utilityRef.current
        ? Array.from(
            utilityRef.current.querySelectorAll<HTMLElement>(
              '.hero-utility-content',
            ),
          )
        : []

    const utilityLetters =
      utilityRef.current
        ? Array.from(
            utilityRef.current.querySelectorAll<HTMLElement>(
              '.hero-utility-letter',
            ),
          )
        : []

    /*
     * ==========================================
     * NAVIGATION
     * ==========================================
     */

    const navItems =
      navRef.current
        ? Array.from(
            navRef.current.querySelectorAll<HTMLElement>(
              'li',
            ),
          )
        : []

    const navLetters =
      navRef.current
        ? Array.from(
            navRef.current.querySelectorAll<HTMLElement>(
              '.hero-nav-letter',
            ),
          )
        : []

    /*
     * ==========================================
     * INITIAL STATE
     * ==========================================
     */

    if (!heroReady) {
      /*
       * TITLE
       */

      gsap.set(
        regularLetters,
        {
          opacity: 0,
          yPercent: 115,
        },
      )

      /*
       * DOT
       */

      if (titleDotRef.current) {
        gsap.set(
          titleDotRef.current,
          {
            opacity: 0,
            scale: 0.45,
            y: 18,

            transformOrigin:
              'center center',
          },
        )
      }

      /*
       * LOGO
       */

      gsap.set(
        logoLetters,
        {
          opacity: 0,
          y: 5,
        },
      )

      /*
       * UTILITY LINES
       */

      gsap.set(
        utilityLines,
        {
          scaleX: 0,

          transformOrigin:
            'left center',
        },
      )

      /*
       * UTILITY CONTENT
       */

      gsap.set(
        utilityContents,
        {
          x: 14,
        },
      )

      /*
       * UTILITY LETTERS
       */

      gsap.set(
        utilityLetters,
        {
          opacity: 0,
          y: 5,
        },
      )

      /*
       * NAV ITEMS
       */

      gsap.set(
        navItems,
        {
          x: 18,
        },
      )

      /*
       * NAV LETTERS
       */

      gsap.set(
        navLetters,
        {
          opacity: 0,
          y: 5,
        },
      )

      /*
       * DESCRIPTION LETTERS
       */

      gsap.set(
        descriptionLetters,
        {
          opacity: 0,
          y: 5,
        },
      )

      return
    }

    /*
     * ==========================================
     * REDUCED MOTION
     * ==========================================
     *
     * Skip the staggered intro entirely and
     * jump straight to the final visible state.
     * ==========================================
     */

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (prefersReducedMotion) {
      gsap.set(
        regularLetters,
        {
          opacity: 1,
          yPercent: 0,
        },
      )

      if (titleDotRef.current) {
        gsap.set(
          titleDotRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
          },
        )
      }

      gsap.set(
        logoLetters,
        {
          opacity: 1,
          y: 0,
        },
      )

      gsap.set(
        utilityLines,
        {
          scaleX: 1,
        },
      )

      gsap.set(
        utilityContents,
        {
          x: 0,
        },
      )

      gsap.set(
        utilityLetters,
        {
          opacity: 1,
          y: 0,
        },
      )

      gsap.set(
        navItems,
        {
          x: 0,
        },
      )

      gsap.set(
        navLetters,
        {
          opacity: 1,
          y: 0,
        },
      )

      gsap.set(
        descriptionLetters,
        {
          opacity: 1,
          y: 0,
        },
      )

      return
    }

    /*
     * ==========================================
     * HERO INTRO
     * ==========================================
     */

    const timeline =
      gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

    /*
     * ==========================================
     * 1. TITLE
     * ==========================================
     */

    timeline.to(
      regularLetters,
      {
        opacity: 1,
        yPercent: 0,

        duration: 1.15,

        stagger: {
          each: 0.11,
          from: 'start',
        },

        ease:
          'power4.out',
      },
      0.18,
    )

    /*
     * ==========================================
     * 2. DOT ACCENT
     * ==========================================
     */

    if (titleDotRef.current) {
      timeline.to(
        titleDotRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,

          duration: 0.65,

          ease:
            'power3.out',
        },
        0.72,
      )
    }

    /*
     * ==========================================
     * 3. LOGO
     * ==========================================
     */

    if (logoLetters.length > 0) {
      timeline.to(
        logoLetters,
        {
          opacity: 1,
          y: 0,

          duration: 0.32,

          stagger: {
            each: 0.04,
            from: 'start',
          },

          ease:
            'power2.out',
        },
        0.42,
      )
    }

    /*
     * ==========================================
     * 4. UTILITY LINES
     * ==========================================
     */

    if (
      utilityLines.length > 0
    ) {
      timeline.to(
        utilityLines,
        {
          scaleX: 1,

          duration: 1,

          stagger: 0.14,

          ease:
            'power3.inOut',
        },
        0.62,
      )
    }

    /*
     * ==========================================
     * 5. UTILITY CONTENT POSITION
     * ==========================================
     */

    if (
      utilityContents.length > 0
    ) {
      timeline.to(
        utilityContents,
        {
          x: 0,

          duration: 0.8,

          stagger: 0.12,

          ease:
            'power3.out',
        },
        0.94,
      )
    }

    /*
     * ==========================================
     * 6. UTILITY LETTERS
     * ==========================================
     */

    if (
      utilityLetters.length > 0
    ) {
      timeline.to(
        utilityLetters,
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
        0.94,
      )
    }

    /*
     * ==========================================
     * 7. NAVIGATION
     * ==========================================
     */

    if (navItems.length > 0) {
      timeline.to(
        navItems,
        {
          x: 0,

          duration: 0.72,

          stagger: {
            each: 0.09,
            from: 'start',
          },

          ease:
            'power3.out',
        },
        1.12,
      )
    }

    /*
     * ==========================================
     * 8. NAVIGATION LETTERS
     * ==========================================
     */

    if (navLetters.length > 0) {
      timeline.to(
        navLetters,
        {
          opacity: 1,
          y: 0,

          duration: 0.3,

          stagger: {
            each: 0.02,
            from: 'start',
          },

          ease:
            'power2.out',
        },
        1.12,
      )
    }

    /*
     * ==========================================
     * 9. DESCRIPTION
     * ==========================================
     */

    if (
      descriptionLetters.length > 0
    ) {
      timeline.to(
        descriptionLetters,
        {
          opacity: 1,
          y: 0,

          duration: 0.35,

          stagger: {
            each: 0.018,
            from: 'start',
          },

          ease:
            'power2.out',
        },
        1.42,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [heroReady])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="
        relative
        h-[1080px]
        w-[1920px]
        overflow-hidden
      "
    >
      {/*
       * ==========================================
       * HERO VIDEO
       * ==========================================
       */}

      <video
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        src={`${BASE_URL}videos/hero-setion.mp4`}
        poster={`${BASE_URL}images/hero-poster.webp`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/*
       * ==========================================
       * LOGO
       * ==========================================
       */}

      <div
        ref={logoRef}
        className="
          absolute
          top-10
          left-[404px]
        "
      >
        <span
          className="text-logo"
          aria-label="luc.id"
        >
          {'luc.id'
            .split('')
            .map(
              (
                character,
                index,
              ) => (
                <span
                  key={`${character}-${index}`}
                  className="
                    hero-logo-letter
                    inline-block
                  "
                  aria-hidden="true"
                >
                  {character}
                </span>
              ),
            )}
        </span>
      </div>

      {/*
       * ==========================================
       * UTILITY LINKS
       * ==========================================
       */}

      <div
        ref={utilityRef}
        className="
          absolute
          top-10
          right-[394px]
          flex
          w-[364px]
          flex-col
          gap-[34px]
        "
      >
        <UtilityLink
          label="Get Advice"
          targetId="#contact-form"
          opacity={1}
          onNavigate={onNavigate}
        />

        <UtilityLink
          label="View Gallery"
          targetId="#gallery"
          opacity={0.5}
          onNavigate={onNavigate}
        />
      </div>

      {/*
       * ==========================================
       * NAVIGATION
       * ==========================================
       */}

      <nav
        ref={navRef}
        aria-label="Primary"
        className="
          absolute
          top-[589px]
          right-[394px]
          w-[120px]
        "
      >
        <ul className="flex flex-col items-start gap-[10px]">
          {NAV_ITEMS.map(
            (item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(
                    event,
                  ) =>
                    handleNavigationClick(
                      event,
                      item.href,
                    )
                  }
                  className="
                    group
                    relative
                    block

                    text-left
                    text-footnote
                    text-ice/70

                    transition-[font-size,color]
                    duration-300
                    ease-out

                    hover:font-['Neue_Montreal']
                    hover:font-normal
                    hover:text-[18px]
                    hover:leading-[120%]
                    hover:text-[#DDE4EE]

                    focus-visible:font-['Neue_Montreal']
                    focus-visible:font-normal
                    focus-visible:text-[18px]
                    focus-visible:leading-[120%]
                    focus-visible:text-[#DDE4EE]
                    focus-visible:outline-none
                  "
                  aria-label={
                    item.label
                  }
                >
                  {/*
                   * ==================================
                   * LEFT HOVER MARKER
                   * ==================================
                   */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      top-1/2
                      left-[-18px]

                      h-[1px]
                      w-[10px]

                      origin-right
                      -translate-y-1/2
                      scale-x-0

                      bg-[#DDE4EE]

                      transition-transform
                      duration-300
                      ease-out

                      group-hover:scale-x-100
                      group-focus-visible:scale-x-100
                    "
                  />

                  {/*
                   * ==================================
                   * NAV TEXT
                   * ==================================
                   */}

                  <span
                    className="
                      inline-block

                      transition-transform
                      duration-300
                      ease-out

                      group-hover:translate-x-[6px]
                      group-focus-visible:translate-x-[6px]
                    "
                  >
                    <AnimatedWords
                      text={item.label}
                      letterClassName="hero-nav-letter"
                    />
                  </span>
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/*
       * ==========================================
       * HERO TITLE
       * ==========================================
       */}

      <h1
        className="
          text-hero-title
          absolute
          top-[504px]
          left-[404px]
          m-0
          w-[997px]
          whitespace-nowrap
        "
        aria-label={
          HERO_TITLE
        }
      >
        {HERO_TITLE.split('').map(
          (
            letter,
            index,
          ) => {
            const isDot =
              letter === '.'

            return (
              <span
                key={`${letter}-${index}`}
                className="
                  inline-block
                  overflow-hidden
                  align-bottom
                "
              >
                <span
                  ref={(element) => {
                    titleLetterRefs.current[
                      index
                    ] = element

                    if (isDot) {
                      titleDotRef.current =
                        element
                    }
                  }}
                  className="
                    inline-block
                  "
                  aria-hidden="true"
                >
                  {letter}
                </span>
              </span>
            )
          },
        )}
      </h1>

      {/*
       * ==========================================
       * DESCRIPTION
       * ==========================================
       */}

      <p
        className="
          text-footnote
          absolute
          bottom-[165px]
          left-[907px]
          w-[290px]
          text-ice/70
          lowercase
        "
        aria-label={`${DESCRIPTION_LINES[0]} ${DESCRIPTION_LINES[1]}`}
      >
        {DESCRIPTION_LINES.map(
          (
            line,
            lineIndex,
          ) => {
            const previousCharacters =
              DESCRIPTION_LINES
                .slice(
                  0,
                  lineIndex,
                )
                .reduce(
                  (
                    total,
                    previousLine,
                  ) =>
                    total +
                    previousLine.length,
                  0,
                )

            return (
              <span
                key={line}
              >
                {line
                  .split('')
                  .map(
                    (
                      character,
                      characterIndex,
                    ) => {
                      const refIndex =
                        previousCharacters +
                        characterIndex

                      return (
                        <span
                          key={`${lineIndex}-${characterIndex}`}
                          ref={(
                            element,
                          ) => {
                            descriptionLetterRefs.current[
                              refIndex
                            ] =
                              element
                          }}
                          className="
                            inline-block
                          "
                          aria-hidden="true"
                        >
                          {character ===
                          ' '
                            ? '\u00A0'
                            : character}
                        </span>
                      )
                    },
                  )}

                {lineIndex <
                  DESCRIPTION_LINES.length -
                    1 && <br />}
              </span>
            )
          },
        )}
      </p>
    </section>
  )
}