import { type RefObject, useLayoutEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../../../lib/gsap'

gsap.registerPlugin(ScrollTrigger)

/*
 * Light, one-shot reveal for static elements ([data-reveal]).
 * No pinning, no scrub. Skipped for reduced-motion users.
 */
export function useMobileReveal(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = ref.current

    if (
      !root ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>('[data-reveal]', root)
        .forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 92%',
                once: true,
              },
            },
          )
        })
    }, root)

    return () => ctx.revert()
  }, [ref])
}
