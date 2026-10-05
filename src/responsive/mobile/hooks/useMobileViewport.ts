import { useEffect } from 'react'

/*
 * Mobile-only page setup, applied from inside the lazy mobile chunk so
 * index.html (shared with desktop) stays untouched:
 *  - html.m-layout scopes the mobile overflow rules in mobile.css
 *  - viewport-fit=cover enables env(safe-area-inset-*)
 */
export function useMobileViewport() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('m-layout')

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="viewport"]',
    )
    const previous = meta?.getAttribute('content') ?? null

    if (meta && previous && !previous.includes('viewport-fit')) {
      meta.setAttribute('content', `${previous}, viewport-fit=cover`)
    }

    return () => {
      root.classList.remove('m-layout')

      if (meta && previous !== null) {
        meta.setAttribute('content', previous)
      }
    }
  }, [])
}
