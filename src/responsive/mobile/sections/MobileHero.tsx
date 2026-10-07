import {
  useLayoutEffect,
  useRef,
} from 'react'

import { gsap } from '../../../lib/gsap'
import { Cta } from '../components/Cta'

const BASE_URL =
  import.meta.env.BASE_URL

const HERO_VIDEO =
  `${BASE_URL}videos/hero-setion.mp4`

interface MobileHeroProps {
  heroReady: boolean
  menuOpen: boolean
  onMenuOpen: () => void
  menuButtonRef:
    React.RefObject<HTMLButtonElement | null>
}

export function MobileHero({
  heroReady,
  menuOpen,
  onMenuOpen,
  menuButtonRef,
}: MobileHeroProps) {
  const sectionRef =
    useRef<HTMLElement>(null)

  const contentRef =
    useRef<HTMLDivElement>(null)

  const headerRef =
    useRef<HTMLElement>(null)

  const villRef =
    useRef<HTMLSpanElement>(null)

  const baliRef =
    useRef<HTMLSpanElement>(null)

  const dotRef =
    useRef<HTMLElement>(null)

  const ctasRef =
    useRef<HTMLDivElement>(null)

  const descriptionRef =
    useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const content =
      contentRef.current

    const header =
      headerRef.current

    const vill =
      villRef.current

    const bali =
      baliRef.current

    const dot =
      dotRef.current

    const ctas =
      ctasRef.current

    const description =
      descriptionRef.current

    if (!content) {
      return
    }

    /*
     * ==========================================
     * CLEAN PREVIOUS ANIMATIONS
     * ==========================================
     */

    gsap.killTweensOf(
      [
        content,
        header,
        vill,
        bali,
        dot,
        ctas,
        description,
      ].filter(Boolean),
    )

    /*
     * ==========================================
     * PRELOADER ACTIVE
     * ==========================================
     *
     * Video stays visible.
     * Hero content stays hidden.
     */

    if (!heroReady) {
      gsap.set(
        content,
        {
          autoAlpha: 0,
          pointerEvents:
            'none',
        },
      )

      if (header) {
        gsap.set(
          header,
          {
            opacity: 0,
            y: 8,
          },
        )
      }

      if (vill) {
        gsap.set(
          vill,
          {
            opacity: 0,
            yPercent: 110,
          },
        )
      }

      if (bali) {
        gsap.set(
          bali,
          {
            opacity: 0,
            yPercent: 110,
          },
        )
      }

      if (dot) {
        gsap.set(
          dot,
          {
            opacity: 0,
            scale: 0.45,
            y: 16,

            transformOrigin:
              'center center',
          },
        )
      }

      if (ctas) {
        gsap.set(
          ctas,
          {
            opacity: 0,
            y: 12,
          },
        )
      }

      if (description) {
        gsap.set(
          description,
          {
            opacity: 0,
            y: 8,
          },
        )
      }

      return
    }

    /*
     * ==========================================
     * REDUCED MOTION
     * ==========================================
     */

    const reduced =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (reduced) {
      gsap.set(
        content,
        {
          autoAlpha: 1,
          pointerEvents:
            'auto',
        },
      )

      if (header) {
        gsap.set(
          header,
          {
            opacity: 1,
            y: 0,
          },
        )
      }

      if (vill) {
        gsap.set(
          vill,
          {
            opacity: 1,
            yPercent: 0,
          },
        )
      }

      if (bali) {
        gsap.set(
          bali,
          {
            opacity: 1,
            yPercent: 0,
          },
        )
      }

      if (dot) {
        gsap.set(
          dot,
          {
            opacity: 1,
            scale: 1,
            y: 0,
          },
        )
      }

      if (ctas) {
        gsap.set(
          ctas,
          {
            opacity: 1,
            y: 0,
          },
        )
      }

      if (description) {
        gsap.set(
          description,
          {
            opacity: 1,
            y: 0,
          },
        )
      }

      return
    }

    /*
     * ==========================================
     * START STATE
     * ==========================================
     */

    gsap.set(
      content,
      {
        autoAlpha: 1,
        pointerEvents:
          'auto',
      },
    )

    if (header) {
      gsap.set(
        header,
        {
          opacity: 0,
          y: 8,
        },
      )
    }

    if (vill) {
      gsap.set(
        vill,
        {
          opacity: 0,
          yPercent: 110,
        },
      )
    }

    if (bali) {
      gsap.set(
        bali,
        {
          opacity: 0,
          yPercent: 110,
        },
      )
    }

    if (dot) {
      gsap.set(
        dot,
        {
          opacity: 0,
          scale: 0.45,
          y: 16,

          transformOrigin:
            'center center',
        },
      )
    }

    if (ctas) {
      gsap.set(
        ctas,
        {
          opacity: 0,
          y: 12,
        },
      )
    }

    if (description) {
      gsap.set(
        description,
        {
          opacity: 0,
          y: 8,
        },
      )
    }

    /*
     * ==========================================
     * HERO INTRO
     * ==========================================
     */

    const timeline =
      gsap.timeline()

    /*
     * 1. HEADER
     */

    if (header) {
      timeline.to(
        header,
        {
          opacity: 1,
          y: 0,

          duration: 0.45,

          ease:
            'power2.out',
        },
        0.08,
      )
    }

    /*
     * 2. VILL
     *
     * Goes upward like desktop title.
     */

    if (vill) {
      timeline.to(
        vill,
        {
          opacity: 1,

          yPercent: 0,

          duration: 1,

          ease:
            'power4.out',
        },
        0.18,
      )
    }

    /*
     * 3. BALI
     *
     * Slight delay after VILL.
     */

    if (bali) {
      timeline.to(
        bali,
        {
          opacity: 1,

          yPercent: 0,

          duration: 1,

          ease:
            'power4.out',
        },
        0.3,
      )
    }

    /*
     * 4. DOT
     */

    if (dot) {
      timeline.to(
        dot,
        {
          opacity: 1,

          scale: 1,

          y: 0,

          duration: 0.6,

          ease:
            'power3.out',
        },
        0.58,
      )
    }

    /*
     * 5. CTA
     */

    if (ctas) {
      timeline.to(
        ctas,
        {
          opacity: 1,

          y: 0,

          duration: 0.65,

          ease:
            'power3.out',
        },
        0.72,
      )
    }

    /*
     * 6. DESCRIPTION
     */

    if (description) {
      timeline.to(
        description,
        {
          opacity: 1,

          y: 0,

          duration: 0.7,

          ease:
            'power2.out',
        },
        1.05,
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
      className="m-hero"
    >
      <div className="m-hero__media">

        {/*
         * ======================================
         * HERO VIDEO
         * ======================================
         */}

        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/*
         * ======================================
         * HERO CONTENT
         * ======================================
         */}

        <div
          ref={contentRef}
          style={{
            position:
              'absolute',

            inset: 0,

            zIndex: 2,
          }}
        >
          <div className="m-hero__overlay" />

          {/*
           * ====================================
           * HEADER
           * ====================================
           */}

          <header
            ref={headerRef}
            className="m-head"
          >
            <span
              className="m-logo"
              aria-label="luc.id"
            >
              luc.id
            </span>

            <button
              ref={menuButtonRef}
              type="button"
              className="m-menu-btn"
              aria-expanded={
                menuOpen
              }
              aria-controls="mobile-menu"
              onClick={
                onMenuOpen
              }
            >
              menu

              <i
                aria-hidden="true"
              />
            </button>
          </header>

          {/*
           * ====================================
           * WORDMARK
           * ====================================
           *
           * Structure stays exactly the same:
           *
           * vill
           * dot
           * bali
           *
           * We only added refs.
           * ====================================
           */}

          <h1
            className="m-wordmark"
            aria-label="vill.bali"
          >
            <span
              ref={villRef}
              aria-hidden="true"
              style={{
                left: 0,
              }}
            >
              vill
            </span>

            <i
              ref={dotRef}
              aria-hidden="true"
            />

            <span
              ref={baliRef}
              aria-hidden="true"
              style={{
                left: 161,
              }}
            >
              bali
            </span>
          </h1>

          {/*
           * ====================================
           * CTA
           * ====================================
           */}

          <div
            ref={ctasRef}
            className="m-hero__ctas"
          >
            <Cta
              href="#gallery"
              label="View Gallery"
              className="m-cta--dim"
            />

            <Cta
              href="#contact-form"
              label="Get Advice"
            />
          </div>

          {/*
           * ====================================
           * DESCRIPTION
           * ====================================
           */}

          <p
            ref={descriptionRef}
            className="m-foot"
          >
            this is not a place to look for housing - this is a place to find
            your home.
          </p>
        </div>
      </div>
    </section>
  )
}