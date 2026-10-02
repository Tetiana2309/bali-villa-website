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
  const topPanelRef =
    useRef<HTMLDivElement>(null)

  const bottomPanelRef =
    useRef<HTMLDivElement>(null)

  const leftPanelRef =
    useRef<HTMLDivElement>(null)

  const rightPanelRef =
    useRef<HTMLDivElement>(null)

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
   *
   * Самого video здесь больше нет.
   *
   * Под Preloader будет находиться
   * единственное видео Hero.
   *
   * Мы просто постепенно делаем
   * центральную плашку прозрачной.
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
   * Надпись постепенно поднимается
   * снизу к своей позиции.
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
       * LUC уходит влево.
       */

      if (leftWordRef.current) {
        exitTimeline.to(
          leftWordRef.current,
          {
            x: -120,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.inOut',
          },
          0,
        )
      }

      /*
       * .ID уходит вправо.
       */

      if (rightWordRef.current) {
        exitTimeline.to(
          rightWordRef.current,
          {
            x: 120,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.inOut',
          },
          0,
        )
      }

      /*
       * Проценты исчезают.
       */

      if (percentageRef.current) {
        exitTimeline.to(
          percentageRef.current,
          {
            opacity: 0,
            y: -14,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          0,
        )
      }

      /*
       * Центральная плашка полностью
       * становится прозрачной.
       */

      if (centerCoverRef.current) {
        exitTimeline.to(
          centerCoverRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'none',
          },
          0,
        )
      }

      /*
       * ==========================================
       * OPEN THE HERO
       * ==========================================
       *
       * Здесь мы НЕ увеличиваем video.
       *
       * Мы просто убираем четыре панели,
       * окружающие квадрат.
       *
       * Видео Hero под ними остаётся
       * абсолютно неподвижным.
       * ==========================================
       */

      if (topPanelRef.current) {
        exitTimeline.to(
          topPanelRef.current,
          {
            height: 0,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0.05,
        )
      }

      if (bottomPanelRef.current) {
        exitTimeline.to(
          bottomPanelRef.current,
          {
            height: 0,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0.05,
        )
      }

      if (leftPanelRef.current) {
        exitTimeline.to(
          leftPanelRef.current,
          {
            width: 0,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0.05,
        )
      }

      if (rightPanelRef.current) {
        exitTimeline.to(
          rightPanelRef.current,
          {
            width: 0,
            duration: 1.2,
            ease: 'power3.inOut',
          },
          0.05,
        )
      }

      /*
       * Маленькая пауза после
       * полного раскрытия.
       */

      exitTimeline.to(
        {},
        {
          duration: 0.05,
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
       * TOP
       * ==========================================
       *
       * Центральное окно:
       * 466 × 466.
       *
       * 466 / 2 = 233.
       * ==========================================
       */}

      <div
        ref={topPanelRef}
        className="
          absolute
          top-0
          left-0
          w-full
          bg-[#DDE4EE]
        "
        style={{
          height:
            'calc(50% - 233px)',

          willChange:
            'height',
        }}
      />

      {/*
       * ==========================================
       * BOTTOM
       * ==========================================
       */}

      <div
        ref={bottomPanelRef}
        className="
          absolute
          bottom-0
          left-0
          w-full
          bg-[#DDE4EE]
        "
        style={{
          height:
            'calc(50% - 233px)',

          willChange:
            'height',
        }}
      />

      {/*
       * ==========================================
       * LEFT
       * ==========================================
       */}

      <div
        ref={leftPanelRef}
        className="
          absolute
          left-0
          bg-[#DDE4EE]
        "
        style={{
          top:
            'calc(50% - 233px)',

          width:
            'calc(50% - 233px)',

          height:
            '466px',

          willChange:
            'width',
        }}
      />

      {/*
       * ==========================================
       * RIGHT
       * ==========================================
       */}

      <div
        ref={rightPanelRef}
        className="
          absolute
          right-0
          bg-[#DDE4EE]
        "
        style={{
          top:
            'calc(50% - 233px)',

          width:
            'calc(50% - 233px)',

          height:
            '466px',

          willChange:
            'width',
        }}
      />

      {/*
       * ==========================================
       * CENTER COVER
       * ==========================================
       *
       * Под этой плашкой будет видно
       * видео Hero.
       *
       * 0%:
       * полностью DDE4EE.
       *
       * 15%:
       * Hero видно на 15%.
       *
       * 35%:
       * Hero видно на 40%.
       *
       * и т.д.
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
       * BRAND ROW
       * ==========================================
       *
       * Пустой блок 466 × 466
       * занимает место центрального окна.
       *
       * Между текстом и квадратом
       * остаётся 36px.
       * ==========================================
       */}

      <div
        className="
          absolute
          top-1/2
          left-1/2
          flex
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
        "
      >
        {/*
         * ========================================
         * LUC
         * ========================================
         */}

        <span
          ref={leftWordRef}
          className="
            shrink-0
            lowercase
            text-[#7B978A]
          "
          style={{
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
              `translate3d(0, ${textTranslateY}px, 0)`,

            transition:
              'opacity 120ms linear, transform 120ms linear',

            willChange:
              'opacity, transform',
          }}
        >
          luc
        </span>

        {/*
         * ========================================
         * EMPTY VIDEO WINDOW
         * ========================================
         *
         * Здесь БОЛЬШЕ НЕТ <video>.
         * ========================================
         */}

        <div
          className="
            mx-[36px]
            h-[466px]
            w-[466px]
            shrink-0
          "
        />

        {/*
         * ========================================
         * .ID
         * ========================================
         */}

        <span
          ref={rightWordRef}
          className="
            shrink-0
            lowercase
            text-[#7B978A]
          "
          style={{
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
              `translate3d(0, ${textTranslateY}px, 0)`,

            transition:
              'opacity 120ms linear, transform 120ms linear',

            willChange:
              'opacity, transform',
          }}
        >
          .id
        </span>
      </div>

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