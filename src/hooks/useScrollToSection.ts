import { useCallback } from 'react'
import { gsap } from '../lib/gsap'

export function useScrollToSection() {
  return useCallback((targetId: string) => {
    const target = document.querySelector(targetId)
    if (!target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.to(window, {
      duration: prefersReducedMotion ? 0 : 1.4,
      scrollTo: { y: target, autoKill: true },
      ease: 'power3.inOut',
    })
  }, [])
}
