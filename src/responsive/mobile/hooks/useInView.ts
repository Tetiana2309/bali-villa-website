import { type RefObject, useEffect, useState } from 'react'

/** True while the element intersects the viewport. */
export function useInView(
  ref: RefObject<Element | null>,
  threshold = 0.2,
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, threshold])

  return inView
}

/** True while the tab is visible (videos pause when it is not). */
export function usePageVisible() {
  const [visible, setVisible] = useState(
    () => document.visibilityState !== 'hidden',
  )

  useEffect(() => {
    const onChange = () =>
      setVisible(document.visibilityState !== 'hidden')

    document.addEventListener('visibilitychange', onChange)

    return () =>
      document.removeEventListener('visibilitychange', onChange)
  }, [])

  return visible
}
