import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import Lenis from 'lenis'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { DesktopCanvas } from './components/DesktopCanvas'
import { Preloader } from './components/Preloader'

import { gsap } from './lib/gsap'

import { Contacts } from './sections/Contacts'
import { FAQ } from './sections/FAQ'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { HowWeWork } from './sections/HowWeWork'
import { OurMethod } from './sections/OurMethod'
import { Testimonials } from './sections/Testimonials'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] =
    useState(true)

  const lenisRef =
    useRef<Lenis | null>(null)

  useEffect(() => {
    window.history.scrollRestoration =
      'manual'

    window.scrollTo(0, 0)

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.scrollTo(0, {
      immediate: true,
    })

    /*
     * ==========================================
     * LOCK SCROLL DURING PRELOADER
     * ==========================================
     */

    lenis.stop()

    lenis.on(
      'scroll',
      ScrollTrigger.update,
    )

    const updateLenis = (
      time: number,
    ) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)

    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => {
      window.scrollTo(0, 0)

      lenis.scrollTo(0, {
        immediate: true,
      })

      ScrollTrigger.refresh()
    })

    return () => {
      gsap.ticker.remove(
        updateLenis,
      )

      lenis.destroy()

      lenisRef.current = null
    }
  }, [])

  /*
   * ==========================================
   * PRELOADER COMPLETE
   * ==========================================
   */

  const handlePreloaderComplete =
    useCallback(() => {
      /*
       * Unlock Hero UI first.
       */

      setIsLoading(false)

      /*
       * Then unlock scrolling.
       */

      const lenis =
        lenisRef.current

      if (lenis) {
        lenis.scrollTo(0, {
          immediate: true,
        })

        lenis.start()
      }

      /*
       * Recalculate ScrollTrigger only after
       * React has removed the Preloader.
       */

      requestAnimationFrame(() => {
        window.scrollTo(0, 0)

        if (lenis) {
          lenis.scrollTo(0, {
            immediate: true,
          })
        }

        ScrollTrigger.refresh()
      })
    }, [])

  return (
    <>
      {/*
       * ========================================
       * WEBSITE
       * ========================================
       *
       * IMPORTANT:
       *
       * Hero is rendered immediately.
       *
       * Its video is already playing
       * underneath the Preloader.
       * ========================================
       */}

      <DesktopCanvas>
        <Hero
          heroReady={!isLoading}
        />

        <OurMethod />

        <HowWeWork />

        <Gallery />

        <Testimonials />

        <FAQ />

        <Contacts />
      </DesktopCanvas>

      {/*
       * ========================================
       * PRELOADER
       * ========================================
       *
       * Preloader is only a visual cover.
       *
       * It does NOT contain another video.
       * ========================================
       */}

      {isLoading && (
        <Preloader
          onComplete={
            handlePreloaderComplete
          }
        />
      )}
    </>
  )
}

export default App