import { useEffect, useRef, useState } from 'react'

import { gsap } from '../../../lib/gsap'
import { Cta } from '../components/Cta'
import { MobileSlider } from '../components/MobileSlider'
import { Pagination } from '../components/Pagination'
import { SectionLabel } from '../components/SectionLabel'
import { HOW_WE_WORK_STEPS } from '../../../data/howWeWork'
import { useMobileReveal } from '../hooks/useMobileReveal'

export function MobileHowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)

  const subtitleRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  const descriptionRefs =
    useRef<(HTMLParagraphElement | null)[]>([])

  const dotRefs =
    useRef<(HTMLSpanElement | null)[]>([])

  const [index, setIndex] = useState(0)

  useMobileReveal(sectionRef)

  const total = HOW_WE_WORK_STEPS.length

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    HOW_WE_WORK_STEPS.forEach((_, i) => {
      const subtitle = subtitleRefs.current[i]
      const description = descriptionRefs.current[i]
      const dot = dotRefs.current[i]

      if (!subtitle || !description || !dot) {
        return
      }

      const subtitleWords = Array.from(
        subtitle.querySelectorAll<HTMLElement>(
          '.m-hww__word',
        ),
      )

      const descriptionWords = Array.from(
        description.querySelectorAll<HTMLElement>(
          '.m-hww__word',
        ),
      )

      gsap.killTweensOf([
        ...subtitleWords,
        ...descriptionWords,
        dot,
      ])

      /*
       * Inactive slide:
       * all words stay visible at 24%.
       */
      if (i !== index) {
        gsap.set(subtitleWords, {
          opacity: 0.24,
        })

        gsap.set(descriptionWords, {
          opacity: 0.24,
        })

        gsap.set(dot, {
          opacity: 0.24,
        })

        return
      }

      /*
       * Reduced motion:
       * show active card immediately.
       */
      if (prefersReducedMotion) {
        gsap.set(subtitleWords, {
          opacity: 1,
        })

        gsap.set(descriptionWords, {
          opacity: 1,
        })

        gsap.set(dot, {
          opacity: 1,
        })

        return
      }

      /*
       * Active slide starts from 24%.
       */
      gsap.set(subtitleWords, {
        opacity: 0.24,
      })

      gsap.set(descriptionWords, {
        opacity: 0.24,
      })

      gsap.set(dot, {
        opacity: 0.24,
      })

      /*
       * Subtitle:
       * words become fully visible one by one.
       */
      gsap.to(subtitleWords, {
        opacity: 1,
        duration: 0.14,
        stagger: {
          each: 0.045,
          from: 'start',
        },
        ease: 'none',
        overwrite: 'auto',
      })

      /*
       * Description:
       * starts shortly after subtitle.
       */
      gsap.to(descriptionWords, {
        opacity: 1,
        duration: 0.14,
        stagger: {
          each: 0.03,
          from: 'start',
        },
        delay: 0.18,
        ease: 'none',
        overwrite: 'auto',
      })

      /*
       * Dot becomes active.
       */
      gsap.to(dot, {
        opacity: 1,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  }, [index])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How We Work"
      className="m-sec m-sec--gap m-hww"
    >
      <SectionLabel
        lines={[
          'A minimum of actions on your part.',
          'how we work',
          'Maximum - from ours.',
        ]}
      />

      <MobileSlider
        label="How we work"
        index={index}
        onIndexChange={setIndex}
        after={
          <div className="m-hww__pag">
            <Pagination
              index={index}
              total={total}
            />
          </div>
        }
      >
        {HOW_WE_WORK_STEPS.map((step, i) => {
          const subtitleWords =
            step.subtitle.split(' ')

          const descriptionWords =
            step.description.split(' ')

          return (
            <div
              key={step.title}
              className="m-hww__slide"
            >
              <h2 className="m-big">
                {step.title}
              </h2>

              <span
                ref={(element) => {
                  dotRefs.current[i] = element
                }}
                className="m-hww__dot"
                aria-hidden="true"
              />

              <div className="m-hww__text">
                <p
                  ref={(element) => {
                    subtitleRefs.current[i] = element
                  }}
                  className="m-t16m m-hww__subtitle"
                >
                  {subtitleWords.map(
                    (word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        className="m-hww__word"
                      >
                        {word}
                        {wordIndex <
                        subtitleWords.length - 1
                          ? ' '
                          : ''}
                      </span>
                    ),
                  )}
                </p>

                <p
                  ref={(element) => {
                    descriptionRefs.current[i] = element
                  }}
                  className="m-t16 m-hww__description"
                >
                  {descriptionWords.map(
                    (word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        className="m-hww__word"
                      >
                        {word}
                        {wordIndex <
                        descriptionWords.length - 1
                          ? ' '
                          : ''}
                      </span>
                    ),
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </MobileSlider>

      <Cta
        href="#contact-form"
        label="Get Advice"
        className="m-hww__cta"
      />

      <p className="m-foot">
        from your first request to your key.
        <br />
        we handle everything.
      </p>
    </section>
  )
}