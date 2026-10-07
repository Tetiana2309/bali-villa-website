import { type RefObject, useEffect } from 'react'

interface NetworkInformationLike {
  saveData?: boolean
}

/*
 * iOS / iPadOS WebKit (Safari and every other iOS browser).
 * Used only to scope iPhone-specific workarounds; Android and desktop
 * keep their current behaviour.
 */
export const IS_IOS_WEBKIT: boolean =
  typeof navigator !== 'undefined' &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1))

/*
 * ==========================================
 * AUTOPLAY PERMISSION
 * ==========================================
 *
 * Respect reduced motion and data saver.
 */

export function canAutoplayVideo(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (reducedMotion) {
    return false
  }

  const connection = (
    navigator as Navigator & {
      connection?: NetworkInformationLike
    }
  ).connection

  return !connection?.saveData
}

/*
 * ==========================================
 * SLIDE VIDEO PLAYBACK
 * ==========================================
 *
 * iPhone / Safari compatibility:
 *
 * - Keep the video src attached
 * - Force muted inline playback
 * - Play only the active visible slide
 * - Pause inactive slides
 * - Retry playback when video is ready
 * - Never remove src during playback lifecycle
 * - Clean up listeners on slide changes
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

    let cancelled = false

    /*
     * ========================================
     * VIDEO CONFIGURATION
     * ========================================
     */

    video.muted = true
    video.defaultMuted = true
    video.loop = true
    video.playsInline = true

    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    /*
     * ========================================
     * SOURCE
     * ========================================
     *
     * LazyVideo already provides src in JSX.
     * Only update it if it actually changes.
     */

    if (video.getAttribute('src') !== src) {
      video.src = src
    }

    /*
     * ========================================
     * PLAYBACK
     * ========================================
     */

    const attemptPlay = () => {
      if (cancelled || !play) {
        return
      }

      if (!video.isConnected) {
        return
      }

      if (!video.paused) {
        return
      }

      video.muted = true
      video.playsInline = true

      const promise = video.play()

      if (promise) {
        void promise.catch(() => {
          /*
           * Safari may reject autoplay.
           * Keep the poster as a fallback.
           */
        })
      }
    }

    /*
     * ========================================
     * INACTIVE SLIDE
     * ========================================
     */

    if (!play) {
      video.pause()

      return () => {
        cancelled = true
      }
    }

    /*
     * ========================================
     * ACTIVE SLIDE
     * ========================================
     *
     * Try immediately, then retry when
     * Safari reports that playback is ready.
     */

    video.addEventListener(
      'loadeddata',
      attemptPlay,
    )

    video.addEventListener(
      'canplay',
      attemptPlay,
    )

    video.addEventListener(
      'canplaythrough',
      attemptPlay,
    )

    /*
     * Retry if the video unexpectedly pauses
     * while its slide is still active.
     */

    const handleWaiting = () => {
      if (cancelled) {
        return
      }

      if (video.readyState >= 2) {
        attemptPlay()
      }
    }

    video.addEventListener(
      'stalled',
      handleWaiting,
    )

    /*
     * Start playback.
     */

    attemptPlay()

    /*
     * ========================================
     * CLEANUP
     * ========================================
     */

    return () => {
      cancelled = true

      video.removeEventListener(
        'loadeddata',
        attemptPlay,
      )

      video.removeEventListener(
        'canplay',
        attemptPlay,
      )

      video.removeEventListener(
        'canplaythrough',
        attemptPlay,
      )

      video.removeEventListener(
        'stalled',
        handleWaiting,
      )

      video.pause()
    }
  }, [ref, src, play])

  /*
   * ==========================================
   * UNMOUNT CLEANUP
   * ==========================================
   */

  useEffect(() => {
    const video = ref.current

    return () => {
      video?.pause()
    }
  }, [ref])
}