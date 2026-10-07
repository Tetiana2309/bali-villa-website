import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../../lib/gsap'

import { MobileMenu } from './components/MobileMenu'
import { MobilePreloader } from './components/MobilePreloader'

import { MobileScrollContext } from './hooks/useMobileScroll'
import { useMobileViewport } from './hooks/useMobileViewport'

import { MobileContacts } from './sections/MobileContacts'
import { MobileFAQ } from './sections/MobileFAQ'
import { MobileGallery } from './sections/MobileGallery'
import { MobileHero } from './sections/MobileHero'
import { MobileHowWeWork } from './sections/MobileHowWeWork'
import { MobileOurMethod } from './sections/MobileOurMethod'
import { MobileTestimonials } from './sections/MobileTestimonials'

import './mobile.css'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL =
  import.meta.env.BASE_URL

/*
 * ==========================================
 * MOBILE VIDEO LOGO MASK
 * ==========================================
 */

const MOBILE_VIDEO_LOGO_MASK_SVG = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 498 200"
  preserveAspectRatio="none"
>
  <path
    fill="white"
    d="M0 198.321V13.6411H42.3374V198.321H0Z"
  />

  <path
    fill="white"
    d="M90.3183 200C81.0134 200 73.8796 198.251 68.917 194.753C64.0319 191.256 60.6976 186.394 58.9142 180.168C57.1307 173.872 56.239 166.527 56.239 158.132V40.9234H98.1112V153.725C98.1112 160.021 98.654 164.428 99.7396 166.946C100.825 169.395 103.384 170.619 107.416 170.619C111.758 170.619 114.472 168.87 115.558 165.373C116.721 161.875 117.303 157.363 117.303 151.836V40.9234H158.826V198.321H117.186V181.532C114.55 187.548 111.371 192.13 107.649 195.278C104.004 198.426 98.2275 200 90.3183 200Z"
  />

  <path
    fill="white"
    d="M225.649 200C206.109 200 192.229 195.488 184.01 186.464C175.868 177.44 171.797 164.183 171.797 146.695V98.2162C171.797 85.0647 173.348 74.1168 176.449 65.3725C179.551 56.6282 184.979 50.0874 192.733 45.7503C200.487 41.4131 211.265 39.2445 225.068 39.2445C234.683 39.2445 243.29 40.7835 250.889 43.8615C258.565 46.9395 264.614 51.4516 269.034 57.3977C273.453 63.3438 275.663 70.6191 275.663 79.2235V103.253H233.21V81.2172C233.21 77.5796 232.628 74.5366 231.465 72.0881C230.302 69.5698 227.782 68.3106 223.905 68.3106C217.081 68.3106 213.669 72.6828 213.669 81.4271V157.712C213.669 160.93 214.445 163.903 215.995 166.632C217.546 169.29 220.105 170.619 223.672 170.619C227.316 170.619 229.837 169.325 231.232 166.737C232.706 164.078 233.442 161 233.442 157.503V131.06H275.663V158.552C275.663 167.226 273.492 174.676 269.15 180.902C264.885 187.058 258.992 191.78 251.47 195.068C243.949 198.356 235.342 200 225.649 200Z"
  />

  <path
    fill="white"
    d="M285.843 198.216V166.946H327.482V198.216H285.843Z"
  />

  <path
    fill="white"
    d="M339.639 31.2697V0H381.279V31.2697H339.639ZM339.639 198.321V40.9234H381.279V198.321H339.639Z"
  />

  <path
    fill="white"
    d="M429.725 200C421.661 200 415.264 198.671 410.534 196.013C405.804 193.354 402.276 189.682 399.949 184.995C397.623 180.308 396.072 174.816 395.297 168.52C394.599 162.225 394.25 155.474 394.25 148.269V79.8531C394.25 67.751 396.615 57.9573 401.345 50.4722C406.153 42.9871 414.256 39.2445 425.654 39.2445C434.106 39.2445 440.581 40.8884 445.078 44.1763C449.653 47.3942 453.181 51.9063 455.663 57.7125V13.6411H498V198.321H455.663V181.637C453.336 187.303 450.235 191.78 446.358 195.068C442.558 198.356 437.014 200 429.725 200ZM445.66 170.619C449.614 170.619 452.251 169.185 453.569 166.317C454.965 163.449 455.663 158.307 455.663 150.892V84.68C455.663 80.9724 455.042 77.3347 453.802 73.7671C452.639 70.1294 450.002 68.3106 445.892 68.3106C441.395 68.3106 438.565 70.0245 437.402 73.4523C436.239 76.88 435.657 80.6226 435.657 84.68V150.892C435.657 164.043 438.991 170.619 445.66 170.619Z"
  />
</svg>
`

const MOBILE_VIDEO_LOGO_MASK =
  `url("data:image/svg+xml,${encodeURIComponent(
    MOBILE_VIDEO_LOGO_MASK_SVG,
  )}")`

/*
 * ==========================================
 * MOBILE TRANSITION LOGO
 * ==========================================
 */

function MobileVideoTransitionLogo() {
  return (
    <div className="m-transition__logo">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="m-transition__video"
        style={{
          WebkitMaskImage:
            MOBILE_VIDEO_LOGO_MASK,

          maskImage:
            MOBILE_VIDEO_LOGO_MASK,

          WebkitMaskSize:
            '100% 100%',

          maskSize:
            '100% 100%',

          WebkitMaskRepeat:
            'no-repeat',

          maskRepeat:
            'no-repeat',

          WebkitMaskPosition:
            'center',

          maskPosition:
            'center',
        }}
      >
        <source
          src={`${BASE_URL}videos/hero-setion.mp4`}
          type="video/mp4"
        />
      </video>
    </div>
  )
}

export default function MobileApp() {
  const lenisRef =
    useRef<Lenis | null>(null)

  const menuButtonRef =
    useRef<HTMLButtonElement>(null)

  const transitionRef =
    useRef<HTMLDivElement>(null)

  const transitionLogoRef =
    useRef<HTMLDivElement>(null)

  const transitionActiveRef =
    useRef(false)

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [isLoading, setIsLoading] =
    useState(true)

  useMobileViewport()

  /*
   * ==========================================
   * LENIS SETUP
   * ==========================================
   */

  useEffect(() => {
    window.history.scrollRestoration =
      'manual'

    window.scrollTo(
      0,
      0,
    )

    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    const lenis =
      new Lenis({
        lerp: 0.1,

        smoothWheel: true,

        syncTouch: false,

        gestureOrientation:
          'vertical',
      })

    lenisRef.current =
      lenis

    /*
     * INITIAL TRANSITION STATE
     */

    if (
      transitionRef.current
    ) {
      gsap.set(
        transitionRef.current,
        {
          clipPath:
            'inset(100% 0% 0% 0%)',
        },
      )
    }

    if (
      transitionLogoRef.current
    ) {
      gsap.set(
        transitionLogoRef.current,
        {
          clipPath:
            'inset(0% 50% 0% 50%)',

          opacity: 0,
        },
      )
    }

    /*
     * PRELOADER LOCK
     */

    lenis.stop()

    lenis.scrollTo(
      0,
      {
        immediate: true,
      },
    )

    lenis.on(
      'scroll',
      ScrollTrigger.update,
    )

    const raf = (
      time: number,
    ) => {
      lenis.raf(
        time * 1000,
      )
    }

    gsap.ticker.add(
      raf,
    )

    const refreshFrame =
      requestAnimationFrame(
        () => {
          window.scrollTo(
            0,
            0,
          )

          lenis.scrollTo(
            0,
            {
              immediate: true,
            },
          )

          ScrollTrigger.refresh()
        },
      )

    return () => {
      cancelAnimationFrame(
        refreshFrame,
      )

      gsap.ticker.remove(
        raf,
      )

      lenis.destroy()

      lenisRef.current =
        null
    }
  }, [])

  /*
   * ==========================================
   * PRELOADER COMPLETE
   * ==========================================
   */

  const handlePreloaderComplete =
    useCallback(() => {
      const lenis =
        lenisRef.current

      window.scrollTo(
        0,
        0,
      )

      if (lenis) {
        lenis.scrollTo(
          0,
          {
            immediate: true,
          },
        )
      }

      setIsLoading(false)

      requestAnimationFrame(
        () => {
          window.scrollTo(
            0,
            0,
          )

          if (lenis) {
            lenis.scrollTo(
              0,
              {
                immediate: true,
              },
            )

            lenis.start()
          }

          ScrollTrigger.refresh()
        },
      )
    }, [])

  /*
   * ==========================================
   * SCROLL LOCK
   * ==========================================
   */

  useEffect(() => {
    const lenis =
      lenisRef.current

    const root =
      document.documentElement

    if (
      isLoading ||
      menuOpen ||
      transitionActiveRef.current
    ) {
      lenis?.stop()

      root.style.overflow =
        'hidden'
    } else {
      lenis?.start()

      root.style.overflow =
        ''
    }

    return () => {
      root.style.overflow =
        ''
    }
  }, [
    isLoading,
    menuOpen,
  ])

  /*
   * ==========================================
   * NORMAL SCROLL
   * ==========================================
   */

  const scrollTo =
    useCallback(
      (
        target: string,
      ) => {
        if (isLoading) {
          return
        }

        const element =
          document.querySelector<HTMLElement>(
            target,
          )

        if (!element) {
          return
        }

        const reduced =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches

        lenisRef.current
          ?.scrollTo(
            element,
            {
              duration:
                reduced
                  ? 0
                  : 1.1,

              immediate:
                reduced,
            },
          )

        window.history.replaceState(
          null,
          '',
          target,
        )
      },
      [
        isLoading,
      ],
    )

  /*
   * ==========================================
   * PREMIUM MOBILE SECTION TRANSITION
   * ==========================================
   */

  const navigateWithTransition =
    useCallback(
      (
        targetId: string,
      ) => {
        if (
          isLoading ||
          transitionActiveRef.current
        ) {
          return
        }

        const lenis =
          lenisRef.current

        const transition =
          transitionRef.current

        const logo =
          transitionLogoRef.current

        if (
          !lenis ||
          !transition
        ) {
          return
        }

        const target =
          document.querySelector<HTMLElement>(
            targetId,
          )

        if (!target) {
          return
        }

        const reduced =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches

        if (reduced) {
          lenis.scrollTo(
            target,
            {
              immediate: true,
              force: true,
            },
          )

          window.history.replaceState(
            null,
            '',
            targetId,
          )

          return
        }

        /*
         * LOCK
         */

        transitionActiveRef.current =
          true

        lenis.stop()

        document.documentElement.style.overflow =
          'hidden'

        gsap.killTweensOf(
          transition,
        )

        if (logo) {
          gsap.killTweensOf(
            logo,
          )
        }

        /*
         * RESET
         */

        gsap.set(
          transition,
          {
            clipPath:
              'inset(100% 0% 0% 0%)',
          },
        )

        if (logo) {
          gsap.set(
            logo,
            {
              clipPath:
                'inset(0% 50% 0% 50%)',

              opacity: 0,
            },
          )
        }

        /*
         * MASTER TIMELINE
         */

        const timeline =
          gsap.timeline()

        /*
         * 1. BACKGROUND ENTER
         */

        timeline.to(
          transition,
          {
            clipPath:
              'inset(0% 0% 0% 0%)',

            duration: 0.9,

            ease:
              'power3.inOut',
          },
        )

        /*
         * 2. LOGO REVEAL
         */

        if (logo) {
          timeline.to(
            logo,
            {
              clipPath:
                'inset(0% 0% 0% 0%)',

              opacity: 1,

              duration: 1,

              ease:
                'power3.inOut',
            },
            '-=0.4',
          )
        }

        /*
         * 3. HOLD
         */

        timeline.to(
          {},
          {
            duration: 0.45,
          },
        )

        /*
         * 4. HIDDEN JUMP
         */

        timeline.add(() => {
          lenis.scrollTo(
            target,
            {
              immediate: true,
              force: true,
            },
          )

          ScrollTrigger.update()

          window.history.replaceState(
            null,
            '',
            targetId,
          )
        })

        /*
         * 5. LOGO CLOSE
         */

        if (logo) {
          timeline.to(
            logo,
            {
              clipPath:
                'inset(0% 50% 0% 50%)',

              opacity: 0,

              duration: 0.7,

              ease:
                'power3.inOut',
            },
          )
        }

        /*
         * 6. DESTINATION REVEAL
         */

        timeline.to(
          transition,
          {
            clipPath:
              'inset(0% 0% 100% 0%)',

            duration: 0.9,

            ease:
              'power3.inOut',

            onStart: () => {
              ScrollTrigger.update()
            },

            onComplete: () => {
              gsap.set(
                transition,
                {
                  clipPath:
                    'inset(100% 0% 0% 0%)',
                },
              )

              if (logo) {
                gsap.set(
                  logo,
                  {
                    clipPath:
                      'inset(0% 50% 0% 50%)',

                    opacity: 0,
                  },
                )
              }

              document.documentElement.style.overflow =
                ''

              lenis.start()

              transitionActiveRef.current =
                false

              ScrollTrigger.refresh()
            },
          },
          '-=0.05',
        )
      },
      [
        isLoading,
      ],
    )

  /*
   * ==========================================
   * MENU
   * ==========================================
   */

  const closeMenu =
    useCallback(() => {
      setMenuOpen(
        false,
      )

      menuButtonRef.current
        ?.focus()
    }, [])

  const navigateFromMenu =
    useCallback(
      (
        href: string,
      ) => {
        setMenuOpen(
          false,
        )

        /*
         * Wait for menu to disappear
         * before transition starts.
         */

        requestAnimationFrame(
          () => {
            requestAnimationFrame(
              () => {
                navigateWithTransition(
                  href,
                )
              },
            )
          },
        )
      },
      [
        navigateWithTransition,
      ],
    )

  /*
   * ==========================================
   * SCROLL CONTEXT
   * ==========================================
   */

  const scroll =
    useMemo(
      () => ({
        scrollTo,
      }),
      [
        scrollTo,
      ],
    )

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <MobileScrollContext.Provider
      value={scroll}
    >
      <main className="m-root">
        <MobileHero
          heroReady={
            !isLoading
          }
          menuOpen={
            menuOpen
          }
          onMenuOpen={() =>
            setMenuOpen(
              true,
            )
          }
          menuButtonRef={
            menuButtonRef
          }
        />

        <MobileOurMethod />

        <MobileHowWeWork />

        <MobileGallery />

        <MobileTestimonials />

        <MobileFAQ />

        <MobileContacts />

        <MobileMenu
          open={
            menuOpen
          }
          onClose={
            closeMenu
          }
          onNavigate={
            navigateFromMenu
          }
        />
      </main>

      {/*
       * ========================================
       * MOBILE SECTION TRANSITION
       * ========================================
       */}

      <div
        ref={transitionRef}
        className="m-transition"
        aria-hidden="true"
      >
        <div
          ref={
            transitionLogoRef
          }
          className="m-transition__logo-wrap"
        >
          <MobileVideoTransitionLogo />
        </div>
      </div>

      {/*
       * ========================================
       * MOBILE PRELOADER
       * ========================================
       */}

      {isLoading && (
        <MobilePreloader
          onComplete={
            handlePreloaderComplete
          }
        />
      )}
    </MobileScrollContext.Provider>
  )
}