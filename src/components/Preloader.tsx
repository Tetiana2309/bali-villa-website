import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { gsap } from '../lib/gsap'

type PreloaderProps = {
  onComplete?: () => void
}

type ProgressPoint = {
  progress: number
  value: number
}

const VIDEO_VISIBILITY_POINTS: ProgressPoint[] = [
  { progress: 0, value: 0 },
  { progress: 15, value: 0.15 },
  { progress: 35, value: 0.4 },
  { progress: 55, value: 0.65 },
  { progress: 75, value: 0.85 },
  { progress: 100, value: 1 },
]

const TEXT_VISIBILITY_POINTS: ProgressPoint[] = [
  { progress: 0, value: 0 },
  { progress: 15, value: 0.25 },
  { progress: 35, value: 0.5 },
  { progress: 55, value: 0.7 },
  { progress: 75, value: 0.9 },
  { progress: 100, value: 1 },
]

function interpolateProgress(
  progress: number,
  points: ProgressPoint[],
) {
  if (progress <= points[0].progress) {
    return points[0].value
  }

  const lastPoint =
    points[points.length - 1]

  if (progress >= lastPoint.progress) {
    return lastPoint.value
  }

  for (
    let index = 0;
    index < points.length - 1;
    index += 1
  ) {
    const start = points[index]
    const end = points[index + 1]

    if (
      progress >= start.progress &&
      progress <= end.progress
    ) {
      const range =
        end.progress -
        start.progress

      const localProgress =
        (progress -
          start.progress) /
        range

      return (
        start.value +
        (end.value -
          start.value) *
          localProgress
      )
    }
  }

  return 0
}

export function Preloader({
  onComplete,
}: PreloaderProps) {
  /*
   * ==========================================
   * REVEAL MASK
   * ==========================================
   */

  const revealHoleRef =
    useRef<SVGRectElement>(null)

  const centerCoverRef =
    useRef<HTMLDivElement>(null)

  const leftWordRef =
    useRef<HTMLSpanElement>(null)

  const rightWordRef =
    useRef<HTMLSpanElement>(null)

  const percentageRef =
    useRef<HTMLSpanElement>(null)

  const [progress, setProgress] =
    useState(0)

  /*
   * ==========================================
   * HERO VIDEO VISIBILITY
   * ==========================================
   */

  const videoVisibility =
    useMemo(
      () =>
        interpolateProgress(
          progress,
          VIDEO_VISIBILITY_POINTS,
        ),
      [progress],
    )

  const centerCoverOpacity =
    1 - videoVisibility

  /*
   * ==========================================
   * TEXT VISIBILITY
   * ==========================================
   */

  const textVisibility =
    useMemo(
      () =>
        interpolateProgress(
          progress,
          TEXT_VISIBILITY_POINTS,
        ),
      [progress],
    )

  /*
   * ==========================================
   * TEXT POSITION
   * ==========================================
   */

  const textTranslateY =
    useMemo(() => {
      const normalized =
        Math.min(
          progress / 100,
          1,
        )

      return (
        36 *
        (1 - normalized)
      )
    }, [progress])

  useEffect(() => {
    let frameId = 0
    let startTime = 0

    let exitTimeline:
      | gsap.core.Timeline
      | null = null

    /*
     * ==========================================
     * REDUCED MOTION
     * ==========================================
     *
     * The exit timeline below is GSAP-driven,
     * so the global CSS reduced-motion rule
     * (which only affects CSS transitions)
     * cannot shorten it. Collapse each of its
     * durations to 0 instead, so the same exit
     * sequence resolves instantly rather than
     * being skipped or restructured.
     * ==========================================
     */

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    const exitDuration = (
      duration: number,
    ) =>
      prefersReducedMotion
        ? 0
        : duration

    /*
     * ==========================================
     * COUNTER
     * ==========================================
     */

    const duration = 3200

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

      const nextProgress =
        Math.round(
          normalized * 100,
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
       * 100% → HERO REVEAL
       * ==========================================
       */

      exitTimeline =
        gsap.timeline({
          onComplete: () => {
            onComplete?.()
          },
        })

      /*
       * ==========================================
       * LUC EXIT
       * ==========================================
       */

      if (leftWordRef.current) {
        exitTimeline.to(
          leftWordRef.current,
          {
            x: -120,
            opacity: 0,
            duration: exitDuration(0.7),
            ease: 'power3.inOut',
          },
          0,
        )
      }

      /*
       * ==========================================
       * .ID EXIT
       * ==========================================
       */

      if (rightWordRef.current) {
        exitTimeline.to(
          rightWordRef.current,
          {
            x: 120,
            opacity: 0,
            duration: exitDuration(0.7),
            ease: 'power3.inOut',
          },
          0,
        )
      }

      /*
       * ==========================================
       * PERCENTAGE EXIT
       * ==========================================
       */

      if (percentageRef.current) {
        exitTimeline.to(
          percentageRef.current,
          {
            opacity: 0,
            y: -14,
            duration: exitDuration(0.4),
            ease: 'power2.inOut',
          },
          0,
        )
      }

      /*
       * ==========================================
       * CENTER COVER
       * ==========================================
       */

      if (centerCoverRef.current) {
        exitTimeline.to(
          centerCoverRef.current,
          {
            opacity: 0,
            duration: exitDuration(0.2),
            ease: 'none',
          },
          0,
        )
      }

      /*
       * ==========================================
       * SINGLE HERO REVEAL
       * ==========================================
       */

      if (revealHoleRef.current) {
        exitTimeline.to(
          revealHoleRef.current,
          {
            attr: {
              x: 0,
              y: 0,
              width: 1920,
              height: 1080,
            },

            duration: exitDuration(1.2),

            ease: 'power3.inOut',
          },
          0.05,
        )
      }

      /*
       * ==========================================
       * SMALL FINAL PAUSE
       * ==========================================
       */

      exitTimeline.to(
        {},
        {
          duration: exitDuration(0.05),
        },
      )
    }

    frameId =
      requestAnimationFrame(
        updateProgress,
      )

    return () => {
      cancelAnimationFrame(
        frameId,
      )

      exitTimeline?.kill()
    }
  }, [onComplete])

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        h-screen
        w-screen
        overflow-hidden
        pointer-events-none
      "
    >
      {/*
       * ==========================================
       * SINGLE BACKGROUND MASK
       * ==========================================
       */}

      <svg
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask
            id="preloader-reveal-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1920"
            height="1080"
          >
            <rect
              x="0"
              y="0"
              width="1920"
              height="1080"
              fill="white"
            />

            <rect
              ref={revealHoleRef}
              x="727"
              y="307"
              width="466"
              height="466"
              fill="black"
            />
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill="#DDE4EE"
          mask="url(#preloader-reveal-mask)"
        />
      </svg>

      {/*
       * ==========================================
       * CENTER COVER
       * ==========================================
       */}

      <div
        ref={centerCoverRef}
        className="
          absolute
          top-1/2
          left-1/2
          h-[466px]
          w-[466px]
          -translate-x-1/2
          -translate-y-1/2
          bg-[#DDE4EE]
        "
        style={{
          opacity:
            centerCoverOpacity,

          transition:
            'opacity 120ms linear',

          willChange:
            'opacity',
        }}
      />

      {/*
       * ==========================================
       * LUC
       * ==========================================
       *
       * Квадрат стоит строго по центру.
       *
       * Половина квадрата:
       * 466 / 2 = 233px
       *
       * Отступ:
       * 36px
       *
       * 233 + 36 = 269px
       * ==========================================
       */}

      <span
        ref={leftWordRef}
        className="
          absolute
          top-1/2
          lowercase
          text-[#7B978A]
        "
        style={{
          right:
            'calc(50% + 269px)',

          fontFamily:
            'Anton, sans-serif',

          fontWeight: 400,

          fontSize:
            '200px',

          lineHeight:
            '110%',

          letterSpacing:
            '-0.01em',

          opacity:
            textVisibility,

          transform:
            `translate3d(0, calc(-50% + ${textTranslateY}px), 0)`,

          transition:
            'opacity 120ms linear, transform 120ms linear',

          willChange:
            'opacity, transform',
        }}
      >
        luc
      </span>

      {/*
       * ==========================================
       * .ID
       * ==========================================
       */}

      <span
        ref={rightWordRef}
        className="
          absolute
          top-1/2
          lowercase
          text-[#7B978A]
        "
        style={{
          left:
            'calc(50% + 269px)',

          fontFamily:
            'Anton, sans-serif',

          fontWeight: 400,

          fontSize:
            '200px',

          lineHeight:
            '110%',

          letterSpacing:
            '-0.01em',

          opacity:
            textVisibility,

          transform:
            `translate3d(0, calc(-50% + ${textTranslateY}px), 0)`,

          transition:
            'opacity 120ms linear, transform 120ms linear',

          willChange:
            'opacity, transform',
        }}
      >
        .id
      </span>

      {/*
       * ==========================================
       * PERCENTAGE
       * ==========================================
       */}

      <span
        ref={percentageRef}
        className="
          absolute
          bottom-[100px]
          left-1/2
          -translate-x-1/2
          lowercase
          text-[#7B978A]
        "
        style={{
          fontFamily:
            'Anton, sans-serif',

          fontWeight: 400,

          fontSize:
            '48px',

          lineHeight:
            '110%',
        }}
      >
        {progress}%
      </span>
    </div>
  )
}