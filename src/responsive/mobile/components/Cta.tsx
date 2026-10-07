import {
  type MouseEvent,
  useEffect,
  useRef,
} from 'react'

import { ArrowIcon } from '../../../components/ArrowIcon'
import { gsap } from '../../../lib/gsap'
import { useMobileScroll } from '../hooks/useMobileScroll'

interface CtaProps {
  href: string
  label: string
  className?: string
}

function AnimatedWords({
  text,
}: {
  text: string
}) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="m-cta__word"
        >
          {word.split('').map(
            (character, characterIndex) => (
              <span
                key={`${character}-${characterIndex}`}
                className="m-cta__letter"
                aria-hidden="true"
              >
                {character}
              </span>
            ),
          )}

          {wordIndex < words.length - 1 && (
            <span
              className="m-cta__letter"
              aria-hidden="true"
            >
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </>
  )
}

export function Cta({
  href,
  label,
  className = '',
}: CtaProps) {
  const { scrollTo } = useMobileScroll()

  const linkRef = useRef<HTMLAnchorElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault()
    scrollTo(href)
  }

  useEffect(() => {
    const link = linkRef.current
    const line = lineRef.current
    const content = contentRef.current

    if (!link || !line || !content) {
      return
    }

    const letters = Array.from(
      link.querySelectorAll<HTMLElement>(
        '.m-cta__letter',
      ),
    )

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    if (prefersReducedMotion) {
      gsap.set(line, {
        scaleX: 1,
      })

      gsap.set(content, {
        x: 0,
      })

      gsap.set(letters, {
        opacity: 1,
        y: 0,
      })

      return
    }

    gsap.set(line, {
      scaleX: 0,
      transformOrigin: 'left center',
    })

    gsap.set(content, {
      x: 14,
    })

    gsap.set(letters, {
      opacity: 0,
      y: 5,
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        const timeline = gsap.timeline()

        timeline.to(
          line,
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          },
          0,
        )

        timeline.to(
          content,
          {
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.32,
        )

        timeline.to(
          letters,
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            stagger: {
              each: 0.025,
              from: 'start',
            },
            ease: 'power2.out',
          },
          0.32,
        )

        observer.disconnect()
      },
      {
        threshold: 0.35,
      },
    )

    observer.observe(link)

    return () => {
      observer.disconnect()

      gsap.killTweensOf([
        line,
        content,
        ...letters,
      ])
    }
  }, [])

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      className={`m-cta ${className}`.trim()}
      aria-label={label}
    >
      <span
        ref={lineRef}
        className="m-cta__line"
        aria-hidden="true"
      >
        <span className="m-cta__line-inner" />
      </span>

      <span
        ref={contentRef}
        className="m-cta__row"
      >
        <span className="m-cta__label">
          <AnimatedWords text={label} />
        </span>

        <span className="m-cta__arrow">
          <ArrowIcon />
        </span>
      </span>
    </a>
  )
}