import {
  type MouseEvent,
  useEffect,
  useRef,
} from 'react'

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

/*
 * ==========================================
 * HERO-STYLE LETTER SPLIT
 * ==========================================
 */

function AnimatedWords({
  text,
  letterClassName,
}: {
  text: string
  letterClassName: string
}) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {word.split('').map(
            (
              character,
              characterIndex,
            ) => (
              <span
                key={`${character}-${characterIndex}`}
                className={`${letterClassName} inline-block`}
                aria-hidden="true"
              >
                {character}
              </span>
            ),
          )}

          {wordIndex <
            words.length - 1 && (
            <span
              className={`${letterClassName} inline-block`}
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

interface HowWeWorkProps {
  onNavigate?: (
    targetId: string,
  ) => void
}

export function HowWeWork({
  onNavigate,
}: HowWeWorkProps) {
  const sectionRef =
    useRef<HTMLElement>(null)

  const stepRefs =
    useRef<
      (HTMLDivElement | null)[]
    >([])

  const imageRefs =
    useRef<
      (HTMLImageElement | null)[]
    >([])

  const activeSubtitleRefs =
    useRef<
      (HTMLParagraphElement | null)[]
    >([])

  const activeDescriptionRefs =
    useRef<
      (HTMLParagraphElement | null)[]
    >([])

  const subtitleWordRefs =
    useRef<
      (HTMLSpanElement | null)[][]
    >([])

  const descriptionWordRefs =
    useRef<
      (HTMLSpanElement | null)[][]
    >([])

  const dotRefs =
    useRef<
      (HTMLSpanElement | null)[]
    >([])

  const footerTextRef =
    useRef<HTMLParagraphElement>(
      null,
    )

  /*
   * ==========================================
   * CTA REFS
   * ==========================================
   */

  const ctaRef =
    useRef<HTMLAnchorElement>(
      null,
    )

  const ctaLineRef =
    useRef<HTMLSpanElement>(
      null,
    )

  const ctaContentRef =
    useRef<HTMLSpanElement>(
      null,
    )

  const activeStepRef =
    useRef<number | null>(
      null,
    )

  const activeImageRef =
    useRef(0)

  /*
   * ==========================================
   * SAME NAVIGATION AS HERO
   * ==========================================
   */

  const handleCtaClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()

    onNavigate(
      '#contact-form',
    )
  }

  useEffect(() => {
    if (
      !sectionRef.current
    ) {
      return
    }

    /*
     * ==========================================
     * HELPERS
     * ==========================================
     */

    const getSubtitleWords = (
      index: number,
    ) => {
      return (
        subtitleWordRefs.current[
          index
        ] ?? []
      ).filter(
        (
          word,
        ): word is HTMLSpanElement =>
          word !== null,
      )
    }

    const getDescriptionWords = (
      index: number,
    ) => {
      return (
        descriptionWordRefs.current[
          index
        ] ?? []
      ).filter(
        (
          word,
        ): word is HTMLSpanElement =>
          word !== null,
      )
    }

    const ctx =
      gsap.context(() => {
        /*
         * ==========================================
         * INITIAL IMAGE STATE
         * ==========================================
         */

        const firstImage =
          imageRefs.current[0]

        const secondImage =
          imageRefs.current[1]

        if (firstImage) {
          gsap.set(
            firstImage,
            {
              opacity: 1,
            },
          )
        }

        if (secondImage) {
          gsap.set(
            secondImage,
            {
              opacity: 0,
            },
          )
        }

        activeImageRef.current =
          0

        /*
         * ==========================================
         * INITIAL TEXT STATE
         * ==========================================
         */

        HOW_WE_WORK_STEPS.forEach(
          (_, index) => {
            const subtitle =
              activeSubtitleRefs
                .current[index]

            const description =
              activeDescriptionRefs
                .current[index]

            const subtitleWords =
              getSubtitleWords(
                index,
              )

            const descriptionWords =
              getDescriptionWords(
                index,
              )

            const dot =
              dotRefs.current[
                index
              ]

            if (subtitle) {
              gsap.set(
                subtitle,
                {
                  opacity: 1,
                },
              )
            }

            if (
              description
            ) {
              gsap.set(
                description,
                {
                  opacity: 1,
                },
              )
            }

            gsap.set(
              subtitleWords,
              {
                opacity: 0,
              },
            )

            gsap.set(
              descriptionWords,
              {
                opacity: 0,
              },
            )

            if (dot) {
              gsap.set(
                dot,
                {
                  opacity:
                    0.24,
                },
              )
            }
          },
        )

        activeStepRef.current =
          null

        /*
         * ==========================================
         * IMAGE TRANSITION
         * ==========================================
         */

        const changeImage = (
          nextImageIndex: number,
        ) => {
          if (
            activeImageRef.current ===
            nextImageIndex
          ) {
            return
          }

          const image0 =
            imageRefs.current[0]

          const image1 =
            imageRefs.current[1]

          if (
            !image0 ||
            !image1
          ) {
            return
          }

          activeImageRef.current =
            nextImageIndex

          gsap.killTweensOf(
            image0,
          )

          gsap.killTweensOf(
            image1,
          )

          gsap.to(
            image0,
            {
              opacity:
                nextImageIndex ===
                0
                  ? 1
                  : 0,

              duration: 2.8,

              ease:
                'sine.inOut',

              overwrite:
                'auto',
            },
          )

          gsap.to(
            image1,
            {
              opacity:
                nextImageIndex ===
                1
                  ? 1
                  : 0,

              duration: 2.8,

              ease:
                'sine.inOut',

              overwrite:
                'auto',
            },
          )
        }

        /*
         * ==========================================
         * DEACTIVATE STEP
         * ==========================================
         */

        const deactivateStep =
          (
            index: number,
          ) => {
            const subtitle =
              activeSubtitleRefs
                .current[index]

            const description =
              activeDescriptionRefs
                .current[index]

            const dot =
              dotRefs.current[
                index
              ]

            if (
              subtitle
            ) {
              gsap.killTweensOf(
                subtitle,
              )

              gsap.to(
                subtitle,
                {
                  opacity: 0,

                  duration:
                    0.45,

                  ease:
                    'power1.out',

                  overwrite:
                    'auto',
                },
              )
            }

            if (
              description
            ) {
              gsap.killTweensOf(
                description,
              )

              gsap.to(
                description,
                {
                  opacity: 0,

                  duration:
                    0.45,

                  ease:
                    'power1.out',

                  overwrite:
                    'auto',
                },
              )
            }

            if (dot) {
              gsap.killTweensOf(
                dot,
              )

              gsap.to(
                dot,
                {
                  opacity:
                    0.24,

                  duration:
                    0.45,

                  ease:
                    'power2.out',

                  overwrite:
                    'auto',
                },
              )
            }
          }

        /*
         * ==========================================
         * ACTIVATE STEP
         * ==========================================
         */

        const activateStep =
          (
            nextIndex: number,
          ) => {
            if (
              nextIndex < 0 ||
              nextIndex >=
                HOW_WE_WORK_STEPS.length
            ) {
              return
            }

            const previousIndex =
              activeStepRef.current

            if (
              previousIndex ===
              nextIndex
            ) {
              return
            }

            /*
             * ======================================
             * DEACTIVATE PREVIOUS
             * ======================================
             */

            if (
              previousIndex !==
              null
            ) {
              deactivateStep(
                previousIndex,
              )
            }

            /*
             * ======================================
             * CLEAN OTHER STEPS
             * ======================================
             */

            HOW_WE_WORK_STEPS.forEach(
              (
                _,
                index,
              ) => {
                if (
                  index ===
                    nextIndex ||
                  index ===
                    previousIndex
                ) {
                  return
                }

                const subtitle =
                  activeSubtitleRefs
                    .current[
                    index
                  ]

                const description =
                  activeDescriptionRefs
                    .current[
                    index
                  ]

                const subtitleWords =
                  getSubtitleWords(
                    index,
                  )

                const descriptionWords =
                  getDescriptionWords(
                    index,
                  )

                const dot =
                  dotRefs
                    .current[
                    index
                  ]

                if (
                  subtitle
                ) {
                  gsap.killTweensOf(
                    subtitle,
                  )

                  gsap.set(
                    subtitle,
                    {
                      opacity:
                        1,
                    },
                  )
                }

                if (
                  description
                ) {
                  gsap.killTweensOf(
                    description,
                  )

                  gsap.set(
                    description,
                    {
                      opacity:
                        1,
                    },
                  )
                }

                gsap.killTweensOf(
                  subtitleWords,
                )

                gsap.killTweensOf(
                  descriptionWords,
                )

                gsap.set(
                  subtitleWords,
                  {
                    opacity:
                      0,
                  },
                )

                gsap.set(
                  descriptionWords,
                  {
                    opacity:
                      0,
                  },
                )

                if (dot) {
                  gsap.killTweensOf(
                    dot,
                  )

                  gsap.set(
                    dot,
                    {
                      opacity:
                        0.24,
                    },
                  )
                }
              },
            )

            /*
             * ======================================
             * IMAGE
             * ======================================
             */

            const nextImageIndex =
              IMAGE_INDEX_BY_STEP[
                nextIndex
              ]

            changeImage(
              nextImageIndex,
            )

            /*
             * ======================================
             * NEXT ACTIVE LAYER
             * ======================================
             */

            const nextSubtitle =
              activeSubtitleRefs
                .current[
                nextIndex
              ]

            const nextDescription =
              activeDescriptionRefs
                .current[
                nextIndex
              ]

            const nextSubtitleWords =
              getSubtitleWords(
                nextIndex,
              )

            const nextDescriptionWords =
              getDescriptionWords(
                nextIndex,
              )

            const nextDot =
              dotRefs.current[
                nextIndex
              ]

            if (
              nextSubtitle
            ) {
              gsap.killTweensOf(
                nextSubtitle,
              )

              gsap.set(
                nextSubtitle,
                {
                  opacity: 1,
                },
              )
            }

            if (
              nextDescription
            ) {
              gsap.killTweensOf(
                nextDescription,
              )

              gsap.set(
                nextDescription,
                {
                  opacity: 1,
                },
              )
            }

            gsap.killTweensOf(
              nextSubtitleWords,
            )

            gsap.killTweensOf(
              nextDescriptionWords,
            )

            gsap.set(
              nextSubtitleWords,
              {
                opacity: 0,
              },
            )

            gsap.set(
              nextDescriptionWords,
              {
                opacity: 0,
              },
            )

            /*
             * ======================================
             * SUBTITLE PRINT
             * ======================================
             */

            gsap.to(
              nextSubtitleWords,
              {
                opacity: 1,

                duration:
                  0.14,

                stagger: {
                  each: 0.045,
                  from:
                    'start',
                },

                ease:
                  'none',

                overwrite:
                  'auto',
              },
            )

            /*
             * ======================================
             * DESCRIPTION PRINT
             * ======================================
             */

            gsap.to(
              nextDescriptionWords,
              {
                opacity: 1,

                duration:
                  0.14,

                stagger: {
                  each: 0.03,
                  from:
                    'start',
                },

                delay: 0.18,

                ease:
                  'none',

                overwrite:
                  'auto',
              },
            )

            /*
             * ======================================
             * DOT
             * ======================================
             */

            if (
              nextDot
            ) {
              gsap.killTweensOf(
                nextDot,
              )

              gsap.to(
                nextDot,
                {
                  opacity: 1,

                  duration:
                    0.55,

                  ease:
                    'power2.out',

                  overwrite:
                    'auto',
                },
              )
            }

            activeStepRef.current =
              nextIndex
          }

        /*
         * ==========================================
         * CLEAR ACTIVE STATE
         * ==========================================
         */

        const clearActiveStep =
          () => {
            const currentIndex =
              activeStepRef.current

            if (
              currentIndex ===
              null
            ) {
              return
            }

            deactivateStep(
              currentIndex,
            )

            activeStepRef.current =
              null
          }

        /*
         * ==========================================
         * STEP TRIGGERS
         * ==========================================
         */

        HOW_WE_WORK_STEPS.forEach(
          (_, index) => {
            const step =
              stepRefs.current[
                index
              ]

            if (!step) {
              return
            }

            ScrollTrigger.create({
              trigger: step,

              start:
                'top 60%',

              onEnter: () => {
                activateStep(
                  index,
                )
              },

              onEnterBack:
                () => {
                  activateStep(
                    index,
                  )
                },

              onLeaveBack:
                () => {
                  if (
                    index ===
                    0
                  ) {
                    clearActiveStep()

                    return
                  }

                  activateStep(
                    index - 1,
                  )
                },

              invalidateOnRefresh:
                true,
            })
          },
        )

        /*
         * ==========================================
         * FOOTER TEXT
         * ==========================================
         */

        if (
          footerTextRef.current
        ) {
          gsap.fromTo(
            footerTextRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 0.9,

              duration: 0.9,

              ease:
                'power2.out',

              scrollTrigger: {
                trigger:
                  footerTextRef.current,

                start:
                  'top 92%',

                once: true,
              },
            },
          )
        }

        /*
         * ==========================================
         * CTA — HERO STYLE
         * ==========================================
         */

        const cta =
          ctaRef.current

        const ctaLine =
          ctaLineRef.current

        const ctaContent =
          ctaContentRef.current

        const ctaLetters =
          cta
            ? Array.from(
                cta.querySelectorAll<HTMLElement>(
                  '.how-we-work-cta-letter',
                ),
              )
            : []

        /*
         * Initial Hero-style state.
         */

        if (
          ctaLine
        ) {
          gsap.set(
            ctaLine,
            {
              scaleX: 0,

              transformOrigin:
                'left center',
            },
          )
        }

        if (
          ctaContent
        ) {
          gsap.set(
            ctaContent,
            {
              x: 14,
            },
          )
        }

        if (
          ctaLetters.length >
          0
        ) {
          gsap.set(
            ctaLetters,
            {
              opacity: 0,
              y: 5,
            },
          )
        }

        /*
         * Entrance animation.
         */

        if (
          cta
        ) {
          ScrollTrigger.create({
            trigger: cta,

            start:
              'top 92%',

            once: true,

            onEnter: () => {
              const ctaTimeline =
                gsap.timeline()

              if (
                ctaLine
              ) {
                ctaTimeline.to(
                  ctaLine,
                  {
                    scaleX: 1,

                    duration:
                      1,

                    ease:
                      'power3.inOut',
                  },
                  0,
                )
              }

              if (
                ctaContent
              ) {
                ctaTimeline.to(
                  ctaContent,
                  {
                    x: 0,

                    duration:
                      0.8,

                    ease:
                      'power3.out',
                  },
                  0.32,
                )
              }

              if (
                ctaLetters.length >
                0
              ) {
                ctaTimeline.to(
                  ctaLetters,
                  {
                    opacity: 1,
                    y: 0,

                    duration:
                      0.32,

                    stagger: {
                      each:
                        0.025,

                      from:
                        'start',
                    },

                    ease:
                      'power2.out',
                  },
                  0.32,
                )
              }
            },
          })
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
      className="
        relative
        mt-[220px]
        h-[1312px]
        w-[1920px]
        bg-ice
      "
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
       */}

      <div
        className="
          absolute
          top-[301px]
          left-[670px]
          h-[710px]
          w-[580px]
          overflow-hidden
        "
      >
        {CENTRAL_IMAGES.map(
          (
            image,
            index,
          ) => (
            <img
              key={image}
              ref={(
                element,
              ) => {
                imageRefs.current[
                  index
                ] =
                  element
              }}
              src={image}
              alt=""
              aria-hidden="true"
              draggable={
                false
              }
              className="
                absolute
                inset-0
                block
                h-full
                w-full
                object-cover
              "
              style={{
                willChange:
                  'opacity',

                backfaceVisibility:
                  'hidden',
              }}
            />
          ),
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-black/50
          "
        />
      </div>

      {/*
       * ==========================================
       * STEPS
       * ==========================================
       */}

      <div
        className="
          absolute
          top-[152px]
          left-0
          h-[976px]
          w-[1920px]
        "
      >
        {HOW_WE_WORK_STEPS.map(
          (
            step,
            i,
          ) => {
            const subtitleWords =
              step.subtitle.split(
                ' ',
              )

            const descriptionWords =
              step.description.split(
                ' ',
              )

            return (
              <div
                key={
                  step.title
                }
                ref={(
                  element,
                ) => {
                  stepRefs.current[
                    i
                  ] =
                    element
                }}
                className="
                  absolute
                  left-0
                  h-[184px]
                  w-[1920px]
                "
                style={{
                  top:
                    STEP_TOP_OFFSETS[
                      i
                    ],
                }}
              >
                {/*
                 * ================================
                 * LARGE TITLE
                 * ================================
                 */}

                <span
                  className="
                    text-wordmark
                    absolute
                    top-0
                    left-10
                    opacity-40
                  "
                >
                  {
                    step.title
                  }
                </span>

                {/*
                 * ================================
                 * RIGHT CONTENT
                 * ================================
                 */}

                <div
                  className="
                    absolute
                    top-0
                    right-[173px]
                    w-[335px]
                  "
                >
                  {/*
                   * BASE SUBTITLE
                   */}

                  <p
                    className="text-heading-two"
                    style={{
                      color:
                        '#392919',

                      opacity:
                        0.24,
                    }}
                  >
                    {
                      step.subtitle
                    }
                  </p>

                  {/*
                   * BASE DESCRIPTION
                   */}

                  <p
                    className="
                      text-body-copy
                      mt-[10px]
                    "
                    style={{
                      color:
                        '#555555',

                      opacity:
                        0.24,
                    }}
                  >
                    {
                      step.description
                    }
                  </p>

                  {/*
                   * ACTIVE LAYER
                   */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      top-0
                      left-0
                      w-full
                    "
                    aria-hidden="true"
                  >
                    {/*
                     * ACTIVE SUBTITLE
                     */}

                    <p
                      ref={(
                        element,
                      ) => {
                        activeSubtitleRefs.current[
                          i
                        ] =
                          element
                      }}
                      className="text-heading-two"
                      style={{
                        color:
                          '#392919',

                        opacity:
                          1,
                      }}
                    >
                      {subtitleWords.map(
                        (
                          word,
                          wordIndex,
                        ) => (
                          <span
                            key={`${word}-${wordIndex}`}
                            ref={(
                              element,
                            ) => {
                              if (
                                !subtitleWordRefs
                                  .current[
                                  i
                                ]
                              ) {
                                subtitleWordRefs.current[
                                  i
                                ] =
                                  []
                              }

                              subtitleWordRefs.current[
                                i
                              ][
                                wordIndex
                              ] =
                                element
                            }}
                            style={{
                              opacity:
                                0,
                            }}
                          >
                            {
                              word
                            }

                            {wordIndex <
                            subtitleWords.length -
                              1
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
                      ref={(
                        element,
                      ) => {
                        activeDescriptionRefs.current[
                          i
                        ] =
                          element
                      }}
                      className="
                        text-body-copy
                        mt-[10px]
                      "
                      style={{
                        color:
                          '#555555',

                        opacity:
                          1,
                      }}
                    >
                      {descriptionWords.map(
                        (
                          word,
                          wordIndex,
                        ) => (
                          <span
                            key={`${word}-${wordIndex}`}
                            ref={(
                              element,
                            ) => {
                              if (
                                !descriptionWordRefs
                                  .current[
                                  i
                                ]
                              ) {
                                descriptionWordRefs.current[
                                  i
                                ] =
                                  []
                              }

                              descriptionWordRefs.current[
                                i
                              ][
                                wordIndex
                              ] =
                                element
                            }}
                            style={{
                              opacity:
                                0,
                            }}
                          >
                            {
                              word
                            }

                            {wordIndex <
                            descriptionWords.length -
                              1
                              ? ' '
                              : ''}
                          </span>
                        ),
                      )}
                    </p>
                  </div>
                </div>

                {/*
                 * ================================
                 * DOT
                 * ================================
                 */}

                <span
                  ref={(
                    element,
                  ) => {
                    dotRefs.current[
                      i
                    ] =
                      element
                  }}
                  className="
                    absolute
                    top-0
                    right-10
                    h-4
                    w-4
                    rounded-full
                    bg-[#7B978A]
                  "
                  style={{
                    opacity:
                      0.24,
                  }}
                />

                {/*
                 * ================================
                 * DIVIDER
                 * ================================
                 */}

                <span
                  className="
                    absolute
                    left-0
                    h-[1.6px]
                    w-full
                    bg-espresso/30
                  "
                  style={{
                    top:
                      STEP_HEIGHT,
                  }}
                />
              </div>
            )
          },
        )}
      </div>

      {/*
       * ==========================================
       * FOOTER
       * ==========================================
       */}

      <p
        ref={
          footerTextRef
        }
        className="
          text-footnote
          absolute
          top-[1228px]
          left-10
          w-[260px]
          text-gray-light/90
        "
      >
        from your first request
        to your key.

        <br />

        we handle everything.
      </p>

      {/*
       * ==========================================
       * GET ADVICE
       *
       * SAME BUTTON PRINCIPLE AS HERO
       * + SAME APP TRANSITION
       * ==========================================
       */}

      <a
        ref={ctaRef}
        href="#contact-form"
        onClick={
          handleCtaClick
        }
        className="
          group
          absolute
          top-[1234px]
          left-[1413px]
          flex
          w-[467px]
          flex-col
          text-left
          focus-visible:outline-none
        "
      >
        {/*
         * ========================================
         * LINE
         *
         * Outer span = GSAP entrance.
         * Inner span = Hero hover.
         * ========================================
         */}

        <span
          ref={
            ctaLineRef
          }
          className="
            block
            h-[2px]
            w-full
            origin-left
          "
        >
          <span
            className="
              block
              h-full
              w-full
              origin-right
              bg-current

              transition-transform
              duration-300
              ease-out

              group-hover:scale-x-[0.95]
              group-focus-visible:scale-x-[0.95]
            "
          />
        </span>

        {/*
         * ========================================
         * CONTENT
         * ========================================
         */}

        <span
          ref={
            ctaContentRef
          }
          className="
            mt-[6px]
            flex
            items-center
            justify-between
          "
        >
          <span
            className="text-button-label"
            aria-label="Get Advice"
          >
            <AnimatedWords
              text="Get Advice"
              letterClassName="how-we-work-cta-letter"
            />
          </span>

          <span
            className="
              inline-flex

              transition-transform
              duration-300
              ease-out

              group-hover:translate-x-[8px]
              group-focus-visible:translate-x-[8px]
            "
          >
            <ArrowIcon />
          </span>
        </span>
      </a>
    </section>
  )
}