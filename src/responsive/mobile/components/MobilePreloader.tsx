import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { gsap } from '../../../lib/gsap'

type MobilePreloaderProps = {
  onComplete?: () => void
}

type ProgressPoint = {
  progress: number
  value: number
}

/*
 * ==========================================
 * MOBILE PRELOADER BASE LAYOUT
 * ==========================================
 *
 * Base Figma width: 375px
 *
 * Video:
 * left: 119px
 * width: 157px
 * right: 99px
 *
 * 119 + 157 + 99 = 375
 *
 * Video height: 260px
 * ==========================================
 */

const BASE_WIDTH = 375

const VIDEO_LEFT = 119
const VIDEO_WIDTH = 157
const VIDEO_HEIGHT = 260

const TEXT_SIDE_GAP = 20

const VIDEO_CENTER_OFFSET = -20

const PERCENT_GAP = 120

const TEXT_VISIBILITY_POINTS: ProgressPoint[] = [
  {
    progress: 0,
    value: 0,
  },
  {
    progress: 15,
    value: 0.25,
  },
  {
    progress: 35,
    value: 0.5,
  },
  {
    progress: 55,
    value: 0.7,
  },
  {
    progress: 75,
    value: 0.9,
  },
  {
    progress: 100,
    value: 1,
  },
]

function interpolateProgress(
  progress: number,
  points: ProgressPoint[],
) {
  if (
    progress <=
    points[0].progress
  ) {
    return points[0].value
  }

  const lastPoint =
    points[
      points.length - 1
    ]

  if (
    progress >=
    lastPoint.progress
  ) {
    return lastPoint.value
  }

  for (
    let index = 0;
    index <
    points.length - 1;
    index += 1
  ) {
    const start =
      points[index]

    const end =
      points[index + 1]

    if (
      progress >=
        start.progress &&
      progress <=
        end.progress
    ) {
      const range =
        end.progress -
        start.progress

      const localProgress =
        (
          progress -
          start.progress
        ) /
        range

      return (
        start.value +
        (
          end.value -
          start.value
        ) *
          localProgress
      )
    }
  }

  return 0
}

export function MobilePreloader({
  onComplete,
}: MobilePreloaderProps) {
  const revealWindowRef =
    useRef<HTMLDivElement>(
      null,
    )

  const leftWordRef =
    useRef<HTMLSpanElement>(
      null,
    )

  const rightWordRef =
    useRef<HTMLSpanElement>(
      null,
    )

  const percentageRef =
    useRef<HTMLSpanElement>(
      null,
    )

  const [
    progress,
    setProgress,
  ] = useState(0)

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
   * COUNTER + EXIT
   * ==========================================
   */

  useEffect(() => {
    let frameId = 0
    let startTime = 0

    let exitTimeline:
      | gsap.core.Timeline
      | null = null

    const reduced =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    const exitDuration = (
      duration: number,
    ) =>
      reduced
        ? 0
        : duration

    const duration = 3200

    const updateProgress = (
      timestamp: number,
    ) => {
      if (!startTime) {
        startTime =
          timestamp
      }

      const elapsed =
        timestamp -
        startTime

      const normalized =
        Math.min(
          elapsed /
            duration,
          1,
        )

      const nextProgress =
        Math.round(
          normalized *
            100,
        )

      setProgress(
        nextProgress,
      )

      if (
        normalized < 1
      ) {
        frameId =
          requestAnimationFrame(
            updateProgress,
          )

        return
      }

      /*
       * ========================================
       * EXIT TIMELINE
       * ========================================
       */

      exitTimeline =
        gsap.timeline({
          onComplete:
            () => {
              onComplete?.()
            },
        })

      /*
       * LUC → LEFT
       */

      if (
        leftWordRef.current
      ) {
        exitTimeline.to(
          leftWordRef.current,
          {
            x: -70,

            opacity: 0,

            duration:
              exitDuration(
                0.7,
              ),

            ease:
              'power3.inOut',
          },
          0,
        )
      }

      /*
       * .ID → RIGHT
       */

      if (
        rightWordRef.current
      ) {
        exitTimeline.to(
          rightWordRef.current,
          {
            x: 70,

            opacity: 0,

            duration:
              exitDuration(
                0.7,
              ),

            ease:
              'power3.inOut',
          },
          0,
        )
      }

      /*
       * PERCENTAGE
       */

      if (
        percentageRef.current
      ) {
        exitTimeline.to(
          percentageRef.current,
          {
            opacity: 0,

            y: -12,

            duration:
              exitDuration(
                0.4,
              ),

            ease:
              'power2.inOut',
          },
          0,
        )
      }

      /*
       * ========================================
       * VIDEO WINDOW → FULL SCREEN
       * ========================================
       */

      if (
        revealWindowRef.current
      ) {
        exitTimeline.to(
          revealWindowRef.current,
          {
            left: 0,

            top: 0,

            width:
              '100vw',

            height:
              '100dvh',

            duration:
              exitDuration(
                1.2,
              ),

            ease:
              'power3.inOut',
          },
          0.05,
        )
      }

      /*
       * FINAL HOLD
       */

      exitTimeline.to(
        {},
        {
          duration:
            exitDuration(
              0.05,
            ),
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

  /*
   * ==========================================
   * RESPONSIVE HORIZONTAL POSITION
   * ==========================================
   *
   * We keep a virtual 375px artboard
   * centred inside the actual viewport.
   *
   * At 375px:
   *
   * artworkLeft = 0
   *
   * At 430px:
   *
   * artworkLeft = 27.5px
   *
   * So the whole composition stays centred.
   * ==========================================
   */

  const artworkLeft =
    `calc(
      50% -
      ${BASE_WIDTH / 2}px
    )`

  const videoLeft =
    `calc(
      ${artworkLeft} +
      ${VIDEO_LEFT}px
    )`

  const leftWordPosition =
    `calc(
      ${artworkLeft} +
      ${TEXT_SIDE_GAP}px
    )`

  const rightWordPosition =
    `calc(
      50% -
      ${BASE_WIDTH / 2}px +
      ${TEXT_SIDE_GAP}px
    )`

  /*
   * ==========================================
   * VERTICAL POSITION
   * ==========================================
   */

  const videoCenter =
    `calc(
      50% +
      ${VIDEO_CENTER_OFFSET}px
    )`

  /*
   * Video top:
   *
   * -20 - 130
   * =
   * -150px from viewport centre.
   */

  const videoTop =
    `calc(
      50% +
      ${
        VIDEO_CENTER_OFFSET -
        VIDEO_HEIGHT / 2
      }px
    )`

  /*
   * Percentage:
   *
   * video bottom
   * +
   * 120px
   *
   * -20 + 130 + 120
   * =
   * +230px
   */

  const percentageTop =
    `calc(
      50% +
      ${
        VIDEO_CENTER_OFFSET +
        VIDEO_HEIGHT / 2 +
        PERCENT_GAP
      }px
    )`

  return (
    <div
      style={{
        position:
          'fixed',

        inset: 0,

        zIndex: 9999,

        width:
          '100vw',

        height:
          '100dvh',

        overflow:
          'hidden',

        pointerEvents:
          'none',
      }}
    >
      {/*
       * ========================================
       * VIDEO WINDOW
       * ========================================
       */}

      <div
        ref={
          revealWindowRef
        }
        style={{
          position:
            'absolute',

          left:
            videoLeft,

          top:
            videoTop,

          width:
            `${VIDEO_WIDTH}px`,

          height:
            `${VIDEO_HEIGHT}px`,

          background:
            'transparent',

          boxShadow:
            '0 0 0 100vmax #DDE4EE',

          zIndex: 0,

          overflow:
            'hidden',

          willChange:
            'left, top, width, height',

          backfaceVisibility:
            'hidden',
        }}
      />

      {/*
       * ========================================
       * LUC
       * ========================================
       */}

      <span
        ref={
          leftWordRef
        }
        style={{
          position:
            'absolute',

          left:
            leftWordPosition,

          top:
            videoCenter,

          zIndex: 2,

          color:
            '#7B978A',

          fontFamily:
            'Anton, sans-serif',

          fontWeight: 400,

          fontSize:
            '76px',

          lineHeight: 1,

          letterSpacing:
            '-0.01em',

          textTransform:
            'lowercase',

          whiteSpace:
            'nowrap',

          opacity:
            textVisibility,

          transform:
            'translate3d(0, -50%, 0)',

          willChange:
            'opacity, transform',
        }}
      >
        luc
      </span>

      {/*
       * ========================================
       * .ID
       * ========================================
       */}

      <span
        ref={
          rightWordRef
        }
        style={{
          position:
            'absolute',

          right:
            rightWordPosition,

          top:
            videoCenter,

          zIndex: 2,

          color:
            '#7B978A',

          fontFamily:
            'Anton, sans-serif',

          fontWeight: 400,

          fontSize:
            '76px',

          lineHeight: 1,

          letterSpacing:
            '-0.01em',

          textTransform:
            'lowercase',

          whiteSpace:
            'nowrap',

          opacity:
            textVisibility,

          transform:
            'translate3d(0, -50%, 0)',

          willChange:
            'opacity, transform',
        }}
      >
        .id
      </span>

      {/*
       * ========================================
       * PERCENTAGE
       * ========================================
       */}

      <span
        ref={
          percentageRef
        }
        style={{
          position:
            'absolute',

          left:
            '50%',

          top:
            percentageTop,

          zIndex: 2,

          color:
            '#7B978A',

          fontFamily:
            'Anton, sans-serif',

          fontWeight: 400,

          fontSize:
            '32px',

          lineHeight: 1,

          whiteSpace:
            'nowrap',

          transform:
            'translateX(-50%)',

          willChange:
            'opacity, transform',
        }}
      >
        {progress}%
      </span>
    </div>
  )
}