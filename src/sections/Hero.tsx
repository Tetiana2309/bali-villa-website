import {
  useLayoutEffect,
  useRef,
} from 'react'

import { ArrowIcon } from '../components/ArrowIcon'
import { NAV_ITEMS } from '../data/site'
import { gsap } from '../lib/gsap'

const BASE_URL =
  import.meta.env.BASE_URL

interface UtilityLinkProps {
  label: string
  targetId: string
  opacity: number
}

interface HeroProps {
  heroReady?: boolean
}

function UtilityLink({
  label,
  targetId,
  opacity,
}: UtilityLinkProps) {
  return (
    <a
      href={targetId}
      className="flex w-[364px] flex-col text-ice"
      style={{ opacity }}
    >
      <span className="h-[2px] w-full bg-ice" />

      <span className="mt-[6px] flex items-center justify-between">
        <span className="text-button-label capitalize">
          {label}
        </span>

        <ArrowIcon />
      </span>
    </a>
  )
}

export function Hero({
  heroReady = false,
}: HeroProps) {
  const logoRef =
    useRef<HTMLDivElement>(null)

  const utilityRef =
    useRef<HTMLDivElement>(null)

  const navRef =
    useRef<HTMLElement>(null)

  const titleRef =
    useRef<HTMLHeadingElement>(null)

  const descriptionRef =
    useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const elements = [
      logoRef.current,
      utilityRef.current,
      navRef.current,
      titleRef.current,
      descriptionRef.current,
    ].filter(
      (
        element,
      ): element is HTMLElement =>
        element !== null,
    )

    /*
     * ==========================================
     * BEFORE HERO IS READY
     * ==========================================
     *
     * Hide all Hero UI before the browser
     * paints the frame.
     *
     * The video itself stays visible
     * underneath the Preloader.
     * ==========================================
     */

    if (!heroReady) {
      gsap.set(elements, {
        opacity: 0,
      })

      if (logoRef.current) {
        gsap.set(
          logoRef.current,
          {
            y: 24,
          },
        )
      }

      if (utilityRef.current) {
        gsap.set(
          utilityRef.current,
          {
            y: 28,
          },
        )
      }

      if (navRef.current) {
        gsap.set(
          navRef.current,
          {
            y: 24,
          },
        )
      }

      if (titleRef.current) {
        gsap.set(
          titleRef.current,
          {
            y: 70,
          },
        )
      }

      if (descriptionRef.current) {
        gsap.set(
          descriptionRef.current,
          {
            y: 30,
          },
        )
      }

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
     * Main title.
     */

    if (titleRef.current) {
      timeline.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        0,
      )
    }

    /*
     * Logo.
     */

    if (logoRef.current) {
      timeline.to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
        },
        0.08,
      )
    }

    /*
     * Utility links.
     */

    if (utilityRef.current) {
      timeline.to(
        utilityRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
        },
        0.16,
      )
    }

    /*
     * Navigation.
     */

    if (navRef.current) {
      timeline.to(
        navRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        0.25,
      )
    }

    /*
     * Description.
     */

    if (descriptionRef.current) {
      timeline.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
        },
        0.34,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [heroReady])

  return (
    <section
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
       *
       * IMPORTANT:
       *
       * This is the ONLY video
       * used during Preloader → Hero.
       *
       * It is already playing underneath
       * the Preloader from the beginning.
       *
       * Do not animate it.
       * Do not resize it.
       * Do not fade it.
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
        <span className="text-logo">
          luc.id
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
          right-[404px]
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
        />

        <UtilityLink
          label="View Gallery"
          targetId="#gallery"
          opacity={0.5}
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
          right-[404px]
          w-[110px]
        "
      >
        <ul className="flex flex-col items-start gap-[10px]">
          {NAV_ITEMS.map(
            (item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="
                    block
                    text-left
                    text-footnote
                    text-ice/70
                    capitalize
                  "
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/*
       * ==========================================
       * TITLE
       * ==========================================
       */}

      <h1
        ref={titleRef}
        className="
          text-hero-title
          absolute
          top-[504px]
          left-[404px]
          m-0
          w-[997px]
        "
      >
        vill.bali
      </h1>

      {/*
       * ==========================================
       * DESCRIPTION
       * ==========================================
       */}

      <p
        ref={descriptionRef}
        className="
          text-footnote
          absolute
          bottom-[165px]
          left-[907px]
          w-[290px]
          text-ice/70
          lowercase
        "
      >
        this is not a place to look for
        housing -
        <br />
        this is a place to find your
        home.
      </p>
    </section>
  )
}