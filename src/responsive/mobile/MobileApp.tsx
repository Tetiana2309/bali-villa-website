import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../../lib/gsap'
import { MobileMenu } from './components/MobileMenu'
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

/*
 * ==========================================
 * MOBILE (< 768px)
 * ==========================================
 *
 * Separate tree from the desktop App: no pinning, no desktop timelines.
 *
 * Lenis only smooths wheel/trackpad input. Touch scrolling stays native
 * (syncTouch: false) so swipes and the horizontal sliders behave like any
 * other mobile page. ScrollTrigger is used only for light one-shot reveals.
 * ==========================================
 */
export default function MobileApp() {
  const lenisRef = useRef<Lenis | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useMobileViewport()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    ScrollTrigger.config({ ignoreMobileResize: true })

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: 'vertical',
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(raf)

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /* Lock page scroll while the menu is open. */
  useEffect(() => {
    const lenis = lenisRef.current
    const root = document.documentElement

    if (menuOpen) {
      lenis?.stop()
      root.style.overflow = 'hidden'
    } else {
      lenis?.start()
      root.style.overflow = ''
    }

    return () => {
      root.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = useCallback((target: string) => {
    const element = document.querySelector<HTMLElement>(target)

    if (!element) {
      return
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    lenisRef.current?.scrollTo(element, {
      duration: reduced ? 0 : 1.1,
      immediate: reduced,
    })

    window.history.replaceState(null, '', target)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  const navigateFromMenu = useCallback(
    (href: string) => {
      setMenuOpen(false)
      /* Let Lenis restart (effect above) before it starts scrolling. */
      requestAnimationFrame(() => scrollTo(href))
    },
    [scrollTo],
  )

  const scroll = useMemo(() => ({ scrollTo }), [scrollTo])

  return (
    <MobileScrollContext.Provider value={scroll}>
      <main className="m-root">
        <MobileHero
          menuOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          menuButtonRef={menuButtonRef}
        />
        <MobileOurMethod />
        <MobileHowWeWork />
        <MobileGallery />
        <MobileTestimonials />
        <MobileFAQ />
        <MobileContacts />

        <MobileMenu
          open={menuOpen}
          onClose={closeMenu}
          onNavigate={navigateFromMenu}
        />
      </main>
    </MobileScrollContext.Provider>
  )
}
