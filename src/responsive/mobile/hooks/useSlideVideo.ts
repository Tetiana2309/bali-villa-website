import { type RefObject, useEffect } from 'react'

interface NetworkInformationLike {
  saveData?: boolean
}

/*
 * Autoplay is skipped for reduced-motion and data-saver users:
 * the poster frame stays visible instead.
 */
export function canAutoplayVideo() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  const connection = (
    navigator as Navigator & { connection?: NetworkInformationLike }
  ).connection

  return !connection?.saveData
}

const UNLOAD_DELAY_MS = 2500

/*
 * Visibility-driven playback for a slide video.
 *
 *  - play=true  : attach src (first time only) and play muted + looped.
 *                 If the browser blocks autoplay the poster stays visible.
 *  - play=false : pause immediately; after a short delay drop the src so
 *                 at most one video stays decoded (iOS Safari memory).
 *                 The poster attribute keeps the fallback frame visible.
 *
 * Nothing is fetched until a slide first becomes active (preload="none").
 */
export function useSlideVideo(
  ref: RefObject<HTMLVideoElement | null>,
  src: string,
  play: boolean,
) {
  useEffect(() => {
    const video = ref.current

    if (!video) {
      return
    }

    video.muted = true
    video.defaultMuted = true

    if (!play) {
      video.pause()

      const timer = window.setTimeout(() => {
        if (video.getAttribute('src')) {
          video.removeAttribute('src')
          video.load()
        }
      }, UNLOAD_DELAY_MS)

      return () => window.clearTimeout(timer)
    }

    if (video.getAttribute('src') !== src) {
      video.src = src
    }

    const attempt = video.play()

    if (attempt) {
      attempt.catch(() => {
        /* autoplay blocked: keep the poster frame */
      })
    }
  }, [ref, src, play])

  useEffect(() => {
    const video = ref.current

    return () => {
      video?.pause()
    }
  }, [ref])
}
