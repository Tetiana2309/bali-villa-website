import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { HOW_WE_WORK_STEPS } from '../data/howWeWork'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL = import.meta.env.BASE_URL

const STEP_TOP_OFFSETS = [0, 264, 528, 792]
const STEP_HEIGHT = 184

/*
 * ==========================================
 * CENTRAL IMAGES
 * ==========================================
 *
 * Inquiry + Selection → image 0
 * Showing + Closing   → image 1
 */

const CENTRAL_IMAGES = [
  `${BASE_URL}images/how-we-work-inquiry.webp`,
  `${BASE_URL}images/how-we-work-closing.webp`,
]

const IMAGE_INDEX_BY_STEP = [0, 0, 1, 1]

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)

  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  const activeSubtitleRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const activeDescriptionRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const subtitleWordRefs = useRef<(HTMLSpanElement | null)[][]>([])
  const descriptionWordRefs = useRef<(HTMLSpanElement | null)[][]>([])

  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  const footerTextRef = useRef<HTMLParagraphElement>(null)
  const ctaContentRef = useRef<HTMLSpanElement>(null)

  const activeStepRef = useRef<number | null>(null)
  const activeImageRef = useRef(0)

  useEffect(() => {
    if (!sectionRef.current) return

    /*
     * ==========================================
     * HELPERS
     * ==========================================
     */

    const getSubtitleWords = (index: number) => {
      return (subtitleWordRefs.current[index] ?? []).filter(
        (word): word is HTMLSpanElement => word !== null,
      )
    }

    const getDescriptionWords = (index: number) => {
      return (descriptionWordRefs.current[index] ?? []).filter(
        (word): word is HTMLSpanElement => word !== null,
      )
    }

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * INITIAL IMAGE STATE
       * ==========================================
       */

      const firstImage = imageRefs.current[0]
      const secondImage = imageRefs.current[1]

      if (firstImage) {
        gsap.set(firstImage, {
          opacity: 1,
        })
      }

      if (secondImage) {
        gsap.set(secondImage, {
          opacity: 0,
        })
      }

      activeImageRef.current = 0

      /*
       * ==========================================
       * INITIAL TEXT STATE
       * ==========================================
       *
       * IMPORTANT:
       *
       * NOTHING is active at first.
       *
       * All active overlays = opacity 0.
       *
       * Only the permanent base text
       * at 24% is visible.
       * ==========================================
       */

      HOW_WE_WORK_STEPS.forEach((_, index) => {
        const subtitle = activeSubtitleRefs.current[index]
        const description = activeDescriptionRefs.current[index]

        const subtitleWords = getSubtitleWords(index)
        const descriptionWords = getDescriptionWords(index)

        const dot = dotRefs.current[index]

        if (subtitle) {
          gsap.set(subtitle, {
            opacity: 1,
          })
        }

        if (description) {
          gsap.set(description, {
            opacity: 1,
          })
        }

        gsap.set(subtitleWords, {
          opacity: 0,
        })

        gsap.set(descriptionWords, {
          opacity: 0,
        })

        if (dot) {
          gsap.set(dot, {
            opacity: 0.24,
          })
        }
      })

      activeStepRef.current = null

      /*
       * ==========================================
       * IMAGE TRANSITION
       * ==========================================
       *
       * Only 2 states.
       *
       * Image 0:
       * Inquiry + Selection
       *
       * Image 1:
       * Showing + Closing
       *
       * Pure slow dissolve.
       * ==========================================
       */

      const changeImage = (nextImageIndex: number) => {
        if (activeImageRef.current === nextImageIndex) {
          return
        }

        const image0 = imageRefs.current[0]
        const image1 = imageRefs.current[1]

        if (!image0 || !image1) return

        activeImageRef.current = nextImageIndex

        gsap.killTweensOf(image0)
        gsap.killTweensOf(image1)

        gsap.to(image0, {
          opacity: nextImageIndex === 0 ? 1 : 0,
          duration: 2.8,
          ease: 'sine.inOut',
          overwrite: 'auto',
        })

        gsap.to(image1, {
          opacity: nextImageIndex === 1 ? 1 : 0,
          duration: 2.8,
          ease: 'sine.inOut',
          overwrite: 'auto',
        })
      }

      /*
       * ==========================================
       * DEACTIVATE STEP
       * ==========================================
       *
       * Full active layer softly disappears.
       *
       * Base 24% text underneath remains.
       * ==========================================
       */

      const deactivateStep = (index: number) => {
        const subtitle = activeSubtitleRefs.current[index]
        const description = activeDescriptionRefs.current[index]

        const dot = dotRefs.current[index]

        if (subtitle) {
          gsap.killTweensOf(subtitle)

          gsap.to(subtitle, {
            opacity: 0,
            duration: 0.45,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        }

        if (description) {
          gsap.killTweensOf(description)

          gsap.to(description, {
            opacity: 0,
            duration: 0.45,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        }

        if (dot) {
          gsap.killTweensOf(dot)

          gsap.to(dot, {
            opacity: 0.24,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }

      /*
       * ==========================================
       * ACTIVATE STEP
       * ==========================================
       */

      const activateStep = (nextIndex: number) => {
        if (
          nextIndex < 0 ||
          nextIndex >= HOW_WE_WORK_STEPS.length
        ) {
          return
        }

        const previousIndex = activeStepRef.current

        if (previousIndex === nextIndex) {
          return
        }

        /*
         * ========================================
         * DEACTIVATE PREVIOUS STEP
         * ========================================
         */

        if (previousIndex !== null) {
          deactivateStep(previousIndex)
        }

        /*
         * ========================================
         * CLEAN OTHER STEPS
         * ========================================
         *
         * Guarantees there is never
         * a half-visible abandoned active layer.
         * ========================================
         */

        HOW_WE_WORK_STEPS.forEach((_, index) => {
          if (
            index === nextIndex ||
            index === previousIndex
          ) {
            return
          }

          const subtitle =
            activeSubtitleRefs.current[index]

          const description =
            activeDescriptionRefs.current[index]

          const subtitleWords =
            getSubtitleWords(index)

          const descriptionWords =
            getDescriptionWords(index)

          const dot = dotRefs.current[index]

          if (subtitle) {
            gsap.killTweensOf(subtitle)

            gsap.set(subtitle, {
              opacity: 1,
            })
          }

          if (description) {
            gsap.killTweensOf(description)

            gsap.set(description, {
              opacity: 1,
            })
          }

          gsap.killTweensOf(subtitleWords)
          gsap.killTweensOf(descriptionWords)

          gsap.set(subtitleWords, {
            opacity: 0,
          })

          gsap.set(descriptionWords, {
            opacity: 0,
          })

          if (dot) {
            gsap.killTweensOf(dot)

            gsap.set(dot, {
              opacity: 0.24,
            })
          }
        })

        /*
         * ========================================
         * IMAGE
         * ========================================
         */

        const nextImageIndex =
          IMAGE_INDEX_BY_STEP[nextIndex]

        changeImage(nextImageIndex)

        /*
         * ========================================
         * PREPARE NEXT ACTIVE LAYER
         * ========================================
         */

        const nextSubtitle =
          activeSubtitleRefs.current[nextIndex]

        const nextDescription =
          activeDescriptionRefs.current[nextIndex]

        const nextSubtitleWords =
          getSubtitleWords(nextIndex)

        const nextDescriptionWords =
          getDescriptionWords(nextIndex)

        const nextDot =
          dotRefs.current[nextIndex]

        if (nextSubtitle) {
          gsap.killTweensOf(nextSubtitle)

          gsap.set(nextSubtitle, {
            opacity: 1,
          })
        }

        if (nextDescription) {
          gsap.killTweensOf(nextDescription)

          gsap.set(nextDescription, {
            opacity: 1,
          })
        }

        gsap.killTweensOf(nextSubtitleWords)
        gsap.killTweensOf(nextDescriptionWords)

        gsap.set(nextSubtitleWords, {
          opacity: 0,
        })

        gsap.set(nextDescriptionWords, {
          opacity: 0,
        })

        /*
         * ========================================
         * SUBTITLE PRINT
         * ========================================
         */

        gsap.to(nextSubtitleWords, {
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
         * ========================================
         * DESCRIPTION PRINT
         * ========================================
         */

        gsap.to(nextDescriptionWords, {
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
         * ========================================
         * DOT
         * ========================================
         */

        if (nextDot) {
          gsap.killTweensOf(nextDot)

          gsap.to(nextDot, {
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        activeStepRef.current = nextIndex
      }

      /*
       * ==========================================
       * CLEAR ACTIVE STATE
       * ==========================================
       *
       * Used when scrolling back above
       * the first activation point.
       *
       * Everything returns to 24%.
       * ==========================================
       */

      const clearActiveStep = () => {
        const currentIndex = activeStepRef.current

        if (currentIndex === null) {
          return
        }

        deactivateStep(currentIndex)

        activeStepRef.current = null
      }

      /*
       * ==========================================
       * STEP TRIGGERS
       * ==========================================
       *
       * Scroll only decides WHICH step
       * becomes active.
       *
       * No scrub.
       * ==========================================
       */

      HOW_WE_WORK_STEPS.forEach((_, index) => {
        const step = stepRefs.current[index]

        if (!step) return

        ScrollTrigger.create({
          trigger: step,

          /*
           * The step becomes active only after
           * crossing this line.
           *
           * Therefore Inquiry is NOT active
           * immediately when the section appears.
           */

          start: 'top 60%',

          /*
           * DOWN
           */

          onEnter: () => {
            activateStep(index)
          },

          /*
           * UP
           *
           * When scrolling back into a row,
           * that row becomes active again.
           */

          onEnterBack: () => {
            activateStep(index)
          },

          /*
           * UP ABOVE FIRST STEP
           *
           * Return the entire section
           * to its initial faded state.
           */

          onLeaveBack: () => {
            if (index === 0) {
              clearActiveStep()
              return
            }

            activateStep(index - 1)
          },

          invalidateOnRefresh: true,
        })
      })

      /*
       * ==========================================
       * FOOTER TEXT
       * ==========================================
       */

      if (footerTextRef.current) {
        gsap.fromTo(
          footerTextRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 0.9,
            duration: 0.9,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: footerTextRef.current,
              start: 'top 92%',
              once: true,
            },
          },
        )
      }

      /*
       * ==========================================
       * CTA
       * ==========================================
       */

      if (ctaContentRef.current) {
        gsap.fromTo(
          ctaContentRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: ctaContentRef.current,
              start: 'top 92%',
              once: true,
            },
          },
        )
      }
    }, sectionRef)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How We Work"
      className="relative mt-[220px] h-[1312px] w-[1920px] bg-ice"
    >
      {/*
       * ==========================================
       * SECTION HEADER
       * ==========================================
       */}

      <SectionHeader
        className="top-10 opacity-70"
        left="A Minimum Of Actions On Your Part."
        center="How We Work"
        right="Maximum - From Ours."
      />

      {/*
       * ==========================================
       * CENTRAL IMAGE
       * ==========================================
       *
       * 580 × 710
       *
       * left/right = 670
       * top/bottom = 301
       * ==========================================
       */}

      <div className="absolute top-[301px] left-[670px] h-[710px] w-[580px] overflow-hidden">
        {CENTRAL_IMAGES.map((image, index) => (
          <img
            key={image}
            ref={(element) => {
              imageRefs.current[index] = element
            }}
            src={image}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 block h-full w-full object-cover"
            style={{
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
            }}
          />
        ))}

        {/*
         * ========================================
         * BLACK OVERLAY
         *
         * #000000 / 50%
         * ========================================
         */}

        <div className="pointer-events-none absolute inset-0 z-10 bg-black/50" />
      </div>

      {/*
       * ==========================================
       * STEPS
       * ==========================================
       */}

      <div className="absolute top-[152px] left-0 h-[976px] w-[1920px]">
        {HOW_WE_WORK_STEPS.map((step, i) => {
          const subtitleWords =
            step.subtitle.split(' ')

          const descriptionWords =
            step.description.split(' ')

          return (
            <div
              key={step.title}
              ref={(element) => {
                stepRefs.current[i] = element
              }}
              className="absolute left-0 h-[184px] w-[1920px]"
              style={{
                top: STEP_TOP_OFFSETS[i],
              }}
            >
              {/*
               * ==================================
               * LARGE TITLE
               * ==================================
               */}

              <span className="text-wordmark absolute top-0 left-10 opacity-40">
                {step.title}
              </span>

              {/*
               * ==================================
               * RIGHT CONTENT
               * ==================================
               */}

              <div className="absolute top-0 right-[173px] w-[335px]">
                {/*
                 * ==================================
                 * BASE SUBTITLE
                 *
                 * ALWAYS 24%
                 * ==================================
                 */}

                <p
                  className="text-heading-two"
                  style={{
                    color: '#392919',
                    opacity: 0.24,
                  }}
                >
                  {step.subtitle}
                </p>

                {/*
                 * ==================================
                 * BASE DESCRIPTION
                 *
                 * ALWAYS 24%
                 * ==================================
                 */}

                <p
                  className="text-body-copy mt-[10px]"
                  style={{
                    color: '#555555',
                    opacity: 0.24,
                  }}
                >
                  {step.description}
                </p>

                {/*
                 * ==================================
                 * ACTIVE LAYER
                 *
                 * Starts hidden for EVERY step.
                 * ==================================
                 */}

                <div
                  className="pointer-events-none absolute top-0 left-0 w-full"
                  aria-hidden="true"
                >
                  {/*
                   * ACTIVE SUBTITLE
                   */}

                  <p
                    ref={(element) => {
                      activeSubtitleRefs.current[i] =
                        element
                    }}
                    className="text-heading-two"
                    style={{
                      color: '#392919',
                      opacity: 1,
                    }}
                  >
                    {subtitleWords.map(
                      (word, wordIndex) => (
                        <span
                          key={`${word}-${wordIndex}`}
                          ref={(element) => {
                            if (
                              !subtitleWordRefs.current[
                                i
                              ]
                            ) {
                              subtitleWordRefs.current[
                                i
                              ] = []
                            }

                            subtitleWordRefs.current[i][
                              wordIndex
                            ] = element
                          }}
                          style={{
                            opacity: 0,
                          }}
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

                  {/*
                   * ACTIVE DESCRIPTION
                   */}

                  <p
                    ref={(element) => {
                      activeDescriptionRefs.current[i] =
                        element
                    }}
                    className="text-body-copy mt-[10px]"
                    style={{
                      color: '#555555',
                      opacity: 1,
                    }}
                  >
                    {descriptionWords.map(
                      (word, wordIndex) => (
                        <span
                          key={`${word}-${wordIndex}`}
                          ref={(element) => {
                            if (
                              !descriptionWordRefs
                                .current[i]
                            ) {
                              descriptionWordRefs.current[
                                i
                              ] = []
                            }

                            descriptionWordRefs.current[
                              i
                            ][wordIndex] = element
                          }}
                          style={{
                            opacity: 0,
                          }}
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

              {/*
               * ==================================
               * DOT
               * ==================================
               */}

              <span
                ref={(element) => {
                  dotRefs.current[i] = element
                }}
                className="absolute top-0 right-10 h-4 w-4 rounded-full bg-[#7B978A]"
                style={{
                  opacity: 0.24,
                }}
              />

              {/*
               * ==================================
               * DIVIDER
               * ==================================
               */}

              <span
                className="absolute left-0 h-[1.6px] w-full bg-espresso/30"
                style={{
                  top: STEP_HEIGHT,
                }}
              />
            </div>
          )
        })}
      </div>

      {/*
       * ==========================================
       * FOOTER
       * ==========================================
       */}

      <p
        ref={footerTextRef}
        className="text-footnote absolute top-[1228px] left-10 w-[260px] text-gray-light/90"
      >
        from your first request to your key.
        <br />
        we handle everything.
      </p>

      {/*
       * ==========================================
       * CTA
       * ==========================================
       */}

      <a
        href="#contact-form"
        className="group absolute top-[1234px] left-[1413px] flex w-[467px] flex-col gap-1.5 text-left"
      >
        <span className="h-[2px] w-full bg-espresso" />

        <span
          ref={ctaContentRef}
          className="flex items-center justify-between"
        >
          <span className="text-button-label">
            Get Advice
          </span>

          <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>
    </section>
  )
}