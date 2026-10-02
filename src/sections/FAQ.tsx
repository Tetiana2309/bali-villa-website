import { useRef, useState } from 'react'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { FAQ_ITEMS, FAQ_DIVIDER_POSITIONS } from '../data/faq'

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const wordRefs = useRef<(HTMLSpanElement | null)[][]>([])

  const getWords = (index: number) => {
    return (wordRefs.current[index] ?? []).filter(
      (word): word is HTMLSpanElement => word !== null,
    )
  }

  const hideAnswer = (index: number) => {
    const words = getWords(index)

    if (!words.length) return

    gsap.killTweensOf(words)

    gsap.to(words, {
      opacity: 0,
      duration: 0.18,
      stagger: {
        each: 0.012,
        from: 'end',
      },
      ease: 'power1.out',
      overwrite: 'auto',
    })
  }

  const showAnswer = (index: number) => {
    const words = getWords(index)

    if (!words.length) return

    gsap.killTweensOf(words)

    gsap.set(words, {
      opacity: 0,
    })

    gsap.to(words, {
      opacity: 1,
      duration: 0.16,
      stagger: 0.04,
      ease: 'none',
      overwrite: 'auto',
    })
  }

  const toggleItem = (index: number) => {
    const currentActiveIndex = activeIndex

    /*
     * ==========================================
     * CLOSE SAME ITEM
     * ==========================================
     */

    if (currentActiveIndex === index) {
      hideAnswer(index)
      setActiveIndex(null)
      return
    }

    /*
     * ==========================================
     * CLOSE CURRENT ITEM
     * ==========================================
     */

    if (currentActiveIndex !== null) {
      hideAnswer(currentActiveIndex)
    }

    /*
     * ==========================================
     * OPEN NEW ITEM
     * ==========================================
     */

    setActiveIndex(index)

    requestAnimationFrame(() => {
      showAnswer(index)
    })
  }

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative mt-0 h-[620px] w-[1920px] bg-ice"
    >
      {/*
       * ==========================================
       * SECTION HEADER
       * ==========================================
       */}

      <SectionHeader
        className="top-10 opacity-70"
        left="The Questions We Hear Most Often"
        center="Questions"
        right="And The Answers You Actually Need."
      />

      {/*
       * ==========================================
       * WORDMARK
       * ==========================================
       */}

      <h2 className="text-wordmark absolute top-[92px] left-10 m-0 w-[309px] opacity-40">
        Quick
      </h2>

      {/*
       * ==========================================
       * SUPPORTING COPY
       * ==========================================
       */}

      <p className="text-footnote absolute top-[488px] left-10 w-[172px] text-[#999999]/90">
        frequent questions.
        <br />
        clear answers.
      </p>

      {/*
       * ==========================================
       * FAQ LIST
       * ==========================================
       */}

      <div className="absolute top-[92px] left-[933px] h-[440px] w-[987px]">
        {/*
         * ========================================
         * DIVIDERS
         * ========================================
         */}

        {FAQ_DIVIDER_POSITIONS.map((y) => (
          <span
            key={y}
            className="absolute left-0 h-[1.5px] w-full bg-espresso/30"
            style={{ top: y }}
          />
        ))}

        {/*
         * ========================================
         * FAQ ITEMS
         * ========================================
         */}

        {FAQ_ITEMS.map((item, index) => {
          const isActive = activeIndex === index
          const words = item.answer.split(' ')

          return (
            <div
              key={item.question}
              className="absolute left-0 w-[947px]"
              style={{
                top: item.top,
                height: item.height,
              }}
            >
              <div className="flex h-full w-[845px] items-center justify-between gap-10">
                {/*
                 * ==================================
                 * QUESTION
                 * ==================================
                 */}

                <p className="text-heading-two w-[348px] shrink-0">
                  {item.question}
                </p>

                {/*
                 * ==================================
                 * ANSWER
                 * ==================================
                 */}

                <div className="relative w-[365px] shrink-0">
                  {/*
                   * BASE ANSWER
                   *
                   * Always visible at 15%.
                   */}

                  <p
                    className="text-body-copy w-[365px]"
                    style={{
                      color: '#555555',
                      opacity: 0.15,
                    }}
                  >
                    {item.answer}
                  </p>

                  {/*
                   * ACTIVE ANSWER
                   *
                   * Same text sits directly above.
                   * Every word has its own span.
                   *
                   * GSAP reveals words one by one,
                   * creating a printing effect.
                   */}

                  <p
                    className="text-body-copy pointer-events-none absolute top-0 left-0 w-[365px]"
                    aria-hidden="true"
                    style={{
                      color: '#555555',
                    }}
                  >
                    {words.map((word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        ref={(element) => {
                          if (!wordRefs.current[index]) {
                            wordRefs.current[index] = []
                          }

                          wordRefs.current[index][wordIndex] = element
                        }}
                        style={{
                          opacity: 0,
                        }}
                      >
                        {word}
                        {wordIndex < words.length - 1 ? ' ' : ''}
                      </span>
                    ))}
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
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
                aria-label={
                  isActive
                    ? `Close answer: ${item.question}`
                    : `Show answer: ${item.question}`
                }
                className="group absolute top-1/2 right-0 flex h-10 w-10 -translate-y-1/2 items-center justify-end text-espresso"
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
                    className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
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

                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}