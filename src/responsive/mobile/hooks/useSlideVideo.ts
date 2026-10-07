import {
  type RefObject,
  useEffect,
} from 'react'

interface NetworkInformationLike {
  saveData?: boolean
}

/*
 * ==========================================
 * AUTOPLAY PERMISSION
 * ==========================================
 */

export function canAutoplayVideo(): boolean {
  if (
    typeof window === 'undefined' ||
    typeof navigator === 'undefined'
  ) {
    return false
  }

  const reducedMotion =
    window.matchMedia(
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
 * iPhone / Safari safe:
 *
 * - src always stays attached
 * - muted + playsInline are forced
 * - only active slide plays
 * - inactive slide pauses
 * - retries after loadeddata / canplay
 * - retries after tab becomes visible again
 * - handles Safari suspend / stalled cases
 * - never removes src
 * - no forced video unload
 * ==========================================
 */

export function useSlideVideo(
  ref:
    RefObject<HTMLVideoElement | null>,
  src: string,
  play: boolean,
) {
  useEffect(() => {
    const video =
      ref.current

    if (!video) {
      return
    }

    let cancelled = false
    let playPending = false

    /*
     * ========================================
     * BASE CONFIGURATION
     * ========================================
     */

    video.muted = true
    video.defaultMuted = true

    video.loop = true
    video.playsInline = true

    video.autoplay = false

    video.setAttribute(
      'muted',
      '',
    )

    video.setAttribute(
      'playsinline',
      '',
    )

    video.setAttribute(
      'webkit-playsinline',
      '',
    )

    /*
     * ========================================
     * SOURCE
     * ========================================
     */

    if (
      video.getAttribute(
        'src',
      ) !== src
    ) {
      video.src = src
    }

    /*
     * ========================================
     * PLAY HELPER
     * ========================================
     */

    const attemptPlay =
      async () => {
        if (
          cancelled ||
          !play ||
          playPending
        ) {
          return
        }

        if (
          !video.isConnected
        ) {
          return
        }

        if (
          document.visibilityState ===
          'hidden'
        ) {
          return
        }

        if (
          !video.paused &&
          !video.ended
        ) {
          return
        }

        playPending = true

        video.muted = true
        video.defaultMuted = true
        video.playsInline = true

        try {
          await video.play()
        } catch {
          /*
           * Safari can reject play()
           * while the video is still
           * preparing.
           *
           * loadeddata / canplay will
           * retry later.
           */
        } finally {
          playPending = false
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
     * VIDEO READY EVENTS
     * ========================================
     */

    const handleLoadedData =
      () => {
        void attemptPlay()
      }

    const handleCanPlay =
      () => {
        void attemptPlay()
      }

    const handlePlaying =
      () => {
        playPending = false
      }

    /*
     * ========================================
     * SAFARI RECOVERY
     * ========================================
     */

    const handleStalled =
      () => {
        if (
          cancelled ||
          !play
        ) {
          return
        }

        if (
          video.readyState >= 2
        ) {
          void attemptPlay()
        }
      }

    const handleSuspend =
      () => {
        if (
          cancelled ||
          !play
        ) {
          return
        }

        if (
          video.readyState >= 2
        ) {
          void attemptPlay()
        }
      }

    const handlePause =
      () => {
        if (
          cancelled ||
          !play
        ) {
          return
        }

        /*
         * Safari may pause video when
         * compositing layers or viewport
         * state changes.
         *
         * Retry on next frame.
         */

        requestAnimationFrame(
          () => {
            void attemptPlay()
          },
        )
      }

    /*
     * ========================================
     * PAGE VISIBILITY
     * ========================================
     */

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          'hidden'
        ) {
          video.pause()
          return
        }

        if (play) {
          requestAnimationFrame(
            () => {
              void attemptPlay()
            },
          )
        }
      }

    /*
     * ========================================
     * WINDOW FOCUS
     * ========================================
     */

    const handleFocus =
      () => {
        if (!play) {
          return
        }

        requestAnimationFrame(
          () => {
            void attemptPlay()
          },
        )
      }

    /*
     * ========================================
     * EVENT LISTENERS
     * ========================================
     */

    video.addEventListener(
      'loadeddata',
      handleLoadedData,
    )

    video.addEventListener(
      'canplay',
      handleCanPlay,
    )

    video.addEventListener(
      'playing',
      handlePlaying,
    )

    video.addEventListener(
      'stalled',
      handleStalled,
    )

    video.addEventListener(
      'suspend',
      handleSuspend,
    )

    video.addEventListener(
      'pause',
      handlePause,
    )

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    )

    window.addEventListener(
      'focus',
      handleFocus,
    )

    /*
     * ========================================
     * INITIAL START
     * ========================================
     */

    if (
      video.readyState >= 2
    ) {
      void attemptPlay()
    } else {
      /*
       * Important for Safari:
       * explicitly ask browser to
       * prepare the video.
       */

      video.load()
    }

    /*
     * Try again on the next frame.
     */

    const startFrame =
      requestAnimationFrame(
        () => {
          void attemptPlay()
        },
      )

    /*
     * ========================================
     * CLEANUP
     * ========================================
     */

    return () => {
      cancelled = true

      cancelAnimationFrame(
        startFrame,
      )

      video.removeEventListener(
        'loadeddata',
        handleLoadedData,
      )

      video.removeEventListener(
        'canplay',
        handleCanPlay,
      )

      video.removeEventListener(
        'playing',
        handlePlaying,
      )

      video.removeEventListener(
        'stalled',
        handleStalled,
      )

      video.removeEventListener(
        'suspend',
        handleSuspend,
      )

      video.removeEventListener(
        'pause',
        handlePause,
      )

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      )

      window.removeEventListener(
        'focus',
        handleFocus,
      )

      video.pause()
    }
  }, [
    ref,
    src,
    play,
  ])

  /*
   * ==========================================
   * COMPONENT UNMOUNT
   * ==========================================
   */

  useEffect(() => {
    const video =
      ref.current

    return () => {
      if (!video) {
        return
      }

      video.pause()
    }
  }, [ref])
}