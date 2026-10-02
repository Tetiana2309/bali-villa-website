import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from './lib/gsap'
import { DesktopCanvas } from './components/DesktopCanvas'
import { Hero } from './sections/Hero'
import { OurMethod } from './sections/OurMethod'
import { HowWeWork } from './sections/HowWeWork'
import { Gallery } from './sections/Gallery'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { Contacts } from './sections/Contacts'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenis.scrollTo(0, {
      immediate: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
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
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <DesktopCanvas>
      <Hero />
      <OurMethod />
      <HowWeWork />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contacts />
    </DesktopCanvas>
  )
}

export default App