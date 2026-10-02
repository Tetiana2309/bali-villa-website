
import { useEffect, useRef, useState } from 'react'

import { gsap } from '../lib/gsap'

const BASE_URL = import.meta.env.BASE_URL

type PreloaderProps = {
  onComplete?: () => void
}

export function Preloader({
  onComplete,
}: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId = 0
    let startTime = 0

    /*
     * ==========================================
     * LOADING COUNTER
     * ==========================================
     *
     * Smooth visual loading:
     *
     * 0 → 100
     *
     * over approximately 2.4 seconds.
     * ==========================================
     */

    const duration = 2400

    const updateProgress = (
      timestamp: number,
    ) => {
      if (!startTime) {
        startTime = timestamp
      }

      const elapsed =
        timestamp - startTime

      const normalized =
        Math.min(
          elapsed / duration,
          1,
        )

      /*
       * Smooth easing.
       */

      const eased =
        1 -
        Math.pow(
          1 - normalized,
          3,
        )

      const nextProgress =
        Math.round(
          eased * 100,
        )

      setProgress(nextProgress)

      if (normalized < 1) {
        frameId =
          requestAnimationFrame(
            updateProgress,
          )

        return
      }

      /*
       * ==========================================
       * EXIT
       * ==========================================
       */

      if (!rootRef.current) {
        onComplete?.()
        return
      }

      const timeline =
        gsap.timeline({
          onComplete: () => {
            onComplete?.()
          },
        })

      if (contentRef.current) {
        timeline.to(
          contentRef.current,
          {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.inOut',
          },
        )
      }

      timeline.to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        '-=0.15',
      )
    }

    frameId =
      requestAnimationFrame(
        updateProgress,
      )

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="
        fixed
        inset-0
        z-[9999]
        h-screen
        w-screen
        overflow-hidden
        bg-[#DDE4EE]
      "
    >
      {/*
       * ==========================================
       * MAIN PRELOADER CONTENT
       * ==========================================
       */}

      <div
        ref={contentRef}
        className="
          absolute
          top-1/2
          left-1/2
          flex
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          items-center
        "
      >
        {/*
         * ========================================
         * BRAND + VIDEO ROW
         * ========================================
         */}

        <div
          className="
            flex
            items-center
            justify-center
          "
        >
          {/*
           * ======================================
           * LUC
           * ======================================
           */}

          <span
            className="
              shrink-0
              lowercase
              text-[#7B978A]
            "
            style={{
              fontFamily: 'Anton, sans-serif',
              fontWeight: 400,
              fontSize: '200px',
              lineHeight: '110%',
              letterSpacing: '-0.01em',
            }}
          >
            luc
          </span>

          {/*
           * ======================================
           * HERO VIDEO SQUARE
           * ======================================
           */}

          <div
            className="
              mx-[36px]
              h-[466px]
              w-[466px]
              shrink-0
              overflow-hidden
            "
          >
            <video
              src={`${BASE_URL}videos/hero-setion.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="
                block
                h-full
                w-full
                object-cover
              "
            />
          </div>

          {/*
           * ======================================
           * .ID
           * ======================================
           */}

          <span
            className="
              shrink-0
              lowercase
              text-[#7B978A]
            "
            style={{
              fontFamily: 'Anton, sans-serif',
              fontWeight: 400,
              fontSize: '200px',
              lineHeight: '110%',
              letterSpacing: '-0.01em',
            }}
          >
            .id
          </span>
        </div>

        {/*
         * ========================================
         * PERCENTAGE
         * ========================================
         */}

        <span
          className="
            mt-[34px]
            lowercase
            text-[#7B978A]
          "
          style={{
            fontFamily: 'Anton, sans-serif',
            fontWeight: 400,
            fontSize: '48px',
            lineHeight: '110%',
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  )
}