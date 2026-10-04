import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import {
  FAQ_ITEMS,
  FAQ_DIVIDER_POSITIONS,
} from '../data/faq'

gsap.registerPlugin(ScrollTrigger)

export function FAQ() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null)

  /*
   * ==========================================
   * SECTION REVEAL REFS
   * ==========================================
   */

  const sectionRef =
    useRef<HTMLElement>(null)

  const headerRef =
    useRef<HTMLDivElement>(null)

  const wordmarkRef =
    useRef<HTMLHeadingElement>(null)

  const supportRef =
    useRef<HTMLParagraphElement>(null)

  const listRef =
    useRef<HTMLDivElement>(null)

  const rowRefs =
    useRef<
      (HTMLDivElement | null)[]
    >([])

  const dividerRefs =
    useRef<
      (HTMLSpanElement | null)[]
    >([])

  /*
   * ==========================================
   * ANSWER WORD REFS
   * ==========================================
   */

  const wordRefs =
    useRef<
      (HTMLSpanElement | null)[][]
    >([])

  /*
   * ==========================================
   * FAQ ENTRANCE
   * ==========================================
   */

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headerRef.current ||
      !wordmarkRef.current ||
      !supportRef.current ||
      !listRef.current
    ) {
      return
    }

    const section =
      sectionRef.current

    const header =
      headerRef.current

    const wordmark =
      wordmarkRef.current

    const support =
      supportRef.current

    const rows =
      rowRefs.current.filter(
        (
          row,
        ): row is HTMLDivElement =>
          row !== null,
      )

    const dividers =
      dividerRefs.current.filter(
        (
          divider,
        ): divider is HTMLSpanElement =>
          divider !== null,
      )

    const prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    const ctx =
      gsap.context(() => {
        /*
         * ========================================
         * REDUCED MOTION
         * ========================================
         */

        if (
          prefersReducedMotion
        ) {
          gsap.set(
            [
              header,
              wordmark,
              support,
              ...rows,
            ],
            {
              opacity: 1,
              y: 0,
            },
          )

          gsap.set(
            dividers,
            {
              scaleX: 1,
            },
          )

          return
        }

        /*
         * ========================================
         * INITIAL STATES
         * ========================================
         */

        gsap.set(
          header,
          {
            opacity: 0,
            y: 10,
          },
        )

        gsap.set(
          wordmark,
          {
            opacity: 0,
            y: 16,
          },
        )

        gsap.set(
          support,
          {
            opacity: 0,
            y: 12,
          },
        )

        gsap.set(
          rows,
          {
            opacity: 0,
            y: 14,
          },
        )

        gsap.set(
          dividers,
          {
            scaleX: 0,

            transformOrigin:
              'left center',
          },
        )

        /*
         * ========================================
         * ENTRANCE TIMELINE
         * ========================================
         */

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                section,

              start:
                'top 78%',

              once: true,
            },
          })

        /*
         * HEADER
         */

        timeline.to(
          header,
          {
            opacity: 1,
            y: 0,

            duration:
              0.7,

            ease:
              'power3.out',
          },
          0,
        )

        /*
         * QUICK
         */

        timeline.to(
          wordmark,
          {
            opacity: 0.4,
            y: 0,

            duration:
              0.85,

            ease:
              'power3.out',
          },
          0.12,
        )

        /*
         * SUPPORTING COPY
         */

        timeline.to(
          support,
          {
            opacity: 0.9,
            y: 0,

            duration:
              0.7,

            ease:
              'power3.out',
          },
          0.22,
        )

        /*
         * DIVIDER LINES
         */

        timeline.to(
          dividers,
          {
            scaleX: 1,

            duration:
              0.9,

            stagger: {
              each:
                0.055,

              from:
                'start',
            },

            ease:
              'power3.inOut',
          },
          0.18,
        )

        /*
         * FAQ ROWS
         */

        timeline.to(
          rows,
          {
            opacity: 1,
            y: 0,

            duration:
              0.72,

            stagger: {
              each:
                0.075,

              from:
                'start',
            },

            ease:
              'power3.out',
          },
          0.3,
        )
      }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  /*
   * ==========================================
   * ANSWER HELPERS
   * ==========================================
   */

  const getWords = (
    index: number,
  ) => {
    return (
      wordRefs.current[index] ??
      []
    ).filter(
      (
        word,
      ): word is HTMLSpanElement =>
        word !== null,
    )
  }

  /*
   * ==========================================
   * HIDE ANSWER
   * ==========================================
   */

  const hideAnswer = (
    index: number,
  ) => {
    const words =
      getWords(index)

    if (!words.length) {
      return
    }

    gsap.killTweensOf(
      words,
    )

    gsap.to(
      words,
      {
        opacity: 0,

        duration:
          0.18,

        stagger: {
          each:
            0.012,

          from:
            'end',
        },

        ease:
          'power1.out',

        overwrite:
          'auto',
      },
    )
  }

  /*
   * ==========================================
   * SHOW ANSWER
   * ==========================================
   */

  const showAnswer = (
    index: number,
  ) => {
    const words =
      getWords(index)

    if (!words.length) {
      return
    }

    gsap.killTweensOf(
      words,
    )

    gsap.set(
      words,
      {
        opacity: 0,
      },
    )

    gsap.to(
      words,
      {
        opacity: 1,

        duration:
          0.16,

        stagger:
          0.04,

        ease:
          'none',

        overwrite:
          'auto',
      },
    )
  }

  /*
   * ==========================================
   * TOGGLE
   * ==========================================
   */

  const toggleItem = (
    index: number,
  ) => {
    const currentActiveIndex =
      activeIndex

    /*
     * ========================================
     * CLOSE SAME ITEM
     * ========================================
     */

    if (
      currentActiveIndex ===
      index
    ) {
      hideAnswer(
        index,
      )

      setActiveIndex(
        null,
      )

      return
    }

    /*
     * ========================================
     * CLOSE CURRENT ITEM
     * ========================================
     */

    if (
      currentActiveIndex !==
      null
    ) {
      hideAnswer(
        currentActiveIndex,
      )
    }

    /*
     * ========================================
     * OPEN NEW ITEM
     * ========================================
     */

    setActiveIndex(
      index,
    )

    requestAnimationFrame(
      () => {
        showAnswer(
          index,
        )
      },
    )
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="
        relative
        mt-0
        h-[620px]
        w-[1920px]
        bg-ice
      "
    >
      {/*
       * ==========================================
       * SECTION HEADER
       * ==========================================
       */}

      <div
        ref={headerRef}
        className="
          absolute
          top-0
          left-0
          w-[1920px]
        "
        style={{
          willChange:
            'opacity, transform',
        }}
      >
        <SectionHeader
          className="top-10 opacity-70"
          left="The Questions We Hear Most Often"
          center="Questions"
          right="And The Answers You Actually Need."
        />
      </div>

      {/*
       * ==========================================
       * WORDMARK
       * ==========================================
       */}

      <h2
        ref={wordmarkRef}
        className="
          text-wordmark
          absolute
          top-[92px]
          left-10
          m-0
          w-[309px]
        "
        style={{
          opacity:
            0.4,

          willChange:
            'opacity, transform',
        }}
      >
        Quick
      </h2>

      {/*
       * ==========================================
       * SUPPORTING COPY
       * ==========================================
       */}

      <p
        ref={supportRef}
        className="
          text-footnote
          absolute
          top-[488px]
          left-10
          w-[172px]
          text-[#999999]
        "
        style={{
          opacity:
            0.9,

          willChange:
            'opacity, transform',
        }}
      >
        frequent questions.

        <br />

        clear answers.
      </p>

      {/*
       * ==========================================
       * FAQ LIST
       * ==========================================
       */}

      <div
        ref={listRef}
        className="
          absolute
          top-[92px]
          left-[933px]
          h-[440px]
          w-[987px]
        "
      >
        {/*
         * ========================================
         * DIVIDERS
         * ========================================
         */}

        {FAQ_DIVIDER_POSITIONS.map(
          (
            y,
            index,
          ) => (
            <span
              key={y}
              ref={(
                element,
              ) => {
                dividerRefs.current[
                  index
                ] =
                  element
              }}
              className="
                absolute
                left-0
                h-[1.5px]
                w-full
                bg-espresso/30
              "
              style={{
                top: y,

                transformOrigin:
                  'left center',

                willChange:
                  'transform',
              }}
            />
          ),
        )}

        {/*
         * ========================================
         * FAQ ITEMS
         * ========================================
         */}

        {FAQ_ITEMS.map(
          (
            item,
            index,
          ) => {
            const isActive =
              activeIndex ===
              index

            const words =
              item.answer.split(
                ' ',
              )

            return (
              <div
                key={
                  item.question
                }
                ref={(
                  element,
                ) => {
                  rowRefs.current[
                    index
                  ] =
                    element
                }}
                className="
                  absolute
                  left-0
                  w-[947px]
                "
                style={{
                  top:
                    item.top,

                  height:
                    item.height,

                  willChange:
                    'opacity, transform',
                }}
              >
                <div
                  className="
                    flex
                    h-full
                    w-[845px]
                    items-center
                    justify-between
                    gap-10
                  "
                >
                  {/*
                   * ==================================
                   * QUESTION
                   * ==================================
                   */}

                  <p
                    className="
                      text-heading-two
                      w-[348px]
                      shrink-0
                    "
                  >
                    {
                      item.question
                    }
                  </p>

                  {/*
                   * ==================================
                   * ANSWER
                   * ==================================
                   */}

                  <div
                    className="
                      relative
                      w-[365px]
                      shrink-0
                    "
                  >
                    {/*
                     * BASE ANSWER
                     *
                     * Always visible at 15%.
                     */}

                    <p
                      className="
                        text-body-copy
                        w-[365px]
                      "
                      style={{
                        color:
                          '#555555',

                        opacity:
                          0.15,
                      }}
                    >
                      {
                        item.answer
                      }
                    </p>

                    {/*
                     * ACTIVE ANSWER
                     *
                     * Same text sits directly above.
                     * Every word has its own span.
                     */}

                    <p
                      className="
                        text-body-copy
                        pointer-events-none
                        absolute
                        top-0
                        left-0
                        w-[365px]
                      "
                      aria-hidden="true"
                      style={{
                        color:
                          '#555555',
                      }}
                    >
                      {words.map(
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
                                !wordRefs.current[
                                  index
                                ]
                              ) {
                                wordRefs.current[
                                  index
                                ] =
                                  []
                              }

                              wordRefs.current[
                                index
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
                            words.length -
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
                 * ==================================
                 * ARROW BUTTON
                 * ==================================
                 */}

                <button
                  type="button"
                  onClick={() =>
                    toggleItem(
                      index,
                    )
                  }
                  aria-expanded={
                    isActive
                  }
                  aria-label={
                    isActive
                      ? `Close answer: ${item.question}`
                      : `Show answer: ${item.question}`
                  }
                  className="
                    group
                    absolute
                    top-1/2
                    right-0
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-end
                    text-espresso
                  "
                >
                  {isActive ? (
                    /*
                     * ==================================
                     * ACTIVE DIAGONAL ARROW
                     * ==================================
                     */

                    <svg
                      width="18"
                      height="15"
                      viewBox="0 0 18 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="
                        transition-transform
                        duration-300

                        group-hover:-translate-y-[2px]
                        group-hover:translate-x-[2px]
                      "
                    >
                      <path
                        d="M17.9415 2.73679C18.0374 2.19289 17.6742 1.67423 17.1303 1.57833L8.26703 0.0154978C7.72313 -0.0804057 7.20447 0.282763 7.10857 0.826657C7.01267 1.37055 7.37584 1.88921 7.91973 1.98511L15.7982 3.3743L14.409 11.2528C14.3131 11.7967 14.6763 12.3153 15.2202 12.4112C15.7641 12.5071 16.2827 12.144 16.3786 11.6001L17.9415 2.73679ZM0.573608 14.0347L1.14718 14.8538L17.5302 3.38229L16.9566 2.56314L16.3831 1.74399L3.19481e-05 13.2155L0.573608 14.0347Z"
                        fill="#555555"
                      />
                    </svg>
                  ) : (
                    /*
                     * ==================================
                     * DEFAULT HORIZONTAL ARROW
                     * ==================================
                     */

                    <ArrowIcon
                      className="
                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                      "
                    />
                  )}
                </button>
              </div>
            )
          },
        )}
      </div>
    </section>
  )
}