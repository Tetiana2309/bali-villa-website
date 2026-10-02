import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from './lib/gsap'
import { DesktopCanvas } from './components/DesktopCanvas'
import { Preloader } from './components/Preloader'

import { Hero } from './sections/Hero'
import { OurMethod } from './sections/OurMethod'
import { HowWeWork } from './sections/HowWeWork'
import { Gallery } from './sections/Gallery'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { Contacts } from './sections/Contacts'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    /*
     * ==========================================
     * SCROLL RESTORATION
     * ==========================================
     */

    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    /*
     * ==========================================
     * LENIS
     * ==========================================
     */

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    /*
     * Always start from the top.
     */

    lenis.scrollTo(0, {
      immediate: true,
    })

    /*
     * Keep ScrollTrigger synchronized
     * with Lenis.
     */

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    /*
     * ==========================================
     * FIRST REFRESH
     * ==========================================
     */

    const refreshFrame = requestAnimationFrame(() => {
      window.scrollTo(0, 0)

      lenis.scrollTo(0, {
        immediate: true,
      })

      ScrollTrigger.refresh()
    })

    /*
     * ==========================================
     * CLEANUP
     * ==========================================
     */

    return () => {
      cancelAnimationFrame(refreshFrame)

      gsap.ticker.remove(updateLenis)

      lenis.destroy()
    }
  }, [])

  /*
   * ==========================================
   * PRELOADER COMPLETE
   * ==========================================
   */

  const handlePreloaderComplete = () => {
    setIsLoading(false)

    /*
     * Wait until React removes the preloader,
     * then refresh all ScrollTrigger positions.
     */

    requestAnimationFrame(() => {
      window.scrollTo(0, 0)

      ScrollTrigger.refresh()
    })
  }

  return (
    <>
      {/*
       * ========================================
       * MAIN WEBSITE
       * ========================================
       *
       * The site is already mounted behind
       * the preloader.
       *
       * This is important because videos,
       * images and ScrollTrigger sections
       * can initialize while the loader
       * is visible.
       * ========================================
       */}

      <DesktopCanvas>
        <Hero />

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
       * Fixed above the whole website.
       * ========================================
       */}

      {isLoading && (
        <Preloader
          onComplete={handlePreloaderComplete}
        />
      )}
    </>
  )
}

export default App