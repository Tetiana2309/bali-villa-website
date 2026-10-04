import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'

import {
  CONTACT_METHODS,
  SOCIAL_LINKS,
  CONTACTS_COPY,
  type ContactMethod,
} from '../data/contacts'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL =
  import.meta.env.BASE_URL

const DECORATIVE_LINES = [
  { top: 0, height: 6 },
  { top: 20, height: 10 },
  { top: 44, height: 16 },
  { top: 74, height: 24 },
  { top: 111, height: 40 },
  { top: 141, height: 50 },
]

const INPUT_CLASS = `
  contact-input
  text-body-copy
  w-[696px]
  border-0
  border-b
  border-[#392919]
  bg-transparent
  p-0
  text-[#392919]
  outline-none
  placeholder:text-[#392919]/40
`

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
  const words =
    text.split(' ')

  return (
    <>
      {words.map(
        (
          word,
          wordIndex,
        ) => (
          <span
            key={`${word}-${wordIndex}`}
            className="
              inline-block
              whitespace-nowrap
            "
          >
            {word
              .split('')
              .map(
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
              words.length -
                1 && (
              <span
                className={`${letterClassName} inline-block`}
                aria-hidden="true"
              >
                {'\u00A0'}
              </span>
            )}
          </span>
        ),
      )}
    </>
  )
}

/*
 * ==========================================
 * FOOTER VIDEO LOGO
 * ==========================================
 */

function VideoFooterLogo() {
  const maskId =
    useId().replace(/:/g, '')

  return (
    <svg
      width="712"
      height="338"
      viewBox="0 0 498 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="
        block
        h-[338px]
        w-[712px]
      "
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="498"
          height="200"
        >
          <rect
            x="0"
            y="0"
            width="498"
            height="200"
            fill="black"
          />

          <path
            d="M0 198.321V13.6411H42.3374V198.321H0Z"
            fill="white"
          />

          <path
            d="M90.3183 200C81.0134 200 73.8796 198.251 68.917 194.753C64.0319 191.256 60.6976 186.394 58.9142 180.168C57.1307 173.872 56.239 166.527 56.239 158.132V40.9234H98.1112V153.725C98.1112 160.021 98.654 164.428 99.7396 166.946C100.825 169.395 103.384 170.619 107.416 170.619C111.758 170.619 114.472 168.87 115.558 165.373C116.721 161.875 117.303 157.363 117.303 151.836V40.9234H158.826V198.321H117.186V181.532C114.55 187.548 111.371 192.13 107.649 195.278C104.004 198.426 98.2275 200 90.3183 200Z"
            fill="white"
          />

          <path
            d="M225.649 200C206.109 200 192.229 195.488 184.01 186.464C175.868 177.44 171.797 164.183 171.797 146.695V98.2162C171.797 85.0647 173.348 74.1168 176.449 65.3725C179.551 56.6282 184.979 50.0874 192.733 45.7503C200.487 41.4131 211.265 39.2445 225.068 39.2445C234.683 39.2445 243.29 40.7835 250.889 43.8615C258.565 46.9395 264.614 51.4516 269.034 57.3977C273.453 63.3438 275.663 70.6191 275.663 79.2235V103.253H233.21V81.2172C233.21 77.5796 232.628 74.5366 231.465 72.0881C230.302 69.5698 227.782 68.3106 223.905 68.3106C217.081 68.3106 213.669 72.6828 213.669 81.4271V157.712C213.669 160.93 214.445 163.903 215.995 166.632C217.546 169.29 220.105 170.619 223.672 170.619C227.316 170.619 229.837 169.325 231.232 166.737C232.706 164.078 233.442 161 233.442 157.503V131.06H275.663V158.552C275.663 167.226 273.492 174.676 269.15 180.902C264.885 187.058 258.992 191.78 251.47 195.068C243.949 198.356 235.342 200 225.649 200Z"
            fill="white"
          />

          <path
            d="M285.843 198.216V166.946H327.482V198.216H285.843Z"
            fill="white"
          />

          <path
            d="M339.639 31.2697V0H381.279V31.2697H339.639ZM339.639 198.321V40.9234H381.279V198.321H339.639Z"
            fill="white"
          />

          <path
            d="M429.725 200C421.661 200 415.264 198.671 410.534 196.013C405.804 193.354 402.276 189.682 399.949 184.995C397.623 180.308 396.072 174.816 395.297 168.52C394.599 162.225 394.25 155.474 394.25 148.269V79.8531C394.25 67.751 396.615 57.9573 401.345 50.4722C406.153 42.9871 414.256 39.2445 425.654 39.2445C434.106 39.2445 440.581 40.8884 445.078 44.1763C449.653 47.3942 453.181 51.9063 455.663 57.7125V13.6411H498V198.321H455.663V181.637C453.336 187.303 450.235 191.78 446.358 195.068C442.558 198.356 437.014 200 429.725 200ZM445.66 170.619C449.614 170.619 452.251 169.185 453.569 166.317C454.965 163.449 455.663 158.307 455.663 150.892V84.68C455.663 80.9724 455.042 77.3347 453.802 73.7671C452.639 70.1294 450.002 68.3106 445.892 68.3106C441.395 68.3106 438.565 70.0245 437.402 73.4523C436.239 76.88 435.657 80.6226 435.657 84.68V150.892C435.657 164.043 438.991 170.619 445.66 170.619Z"
            fill="white"
          />
        </mask>
      </defs>

      <foreignObject
        x="0"
        y="0"
        width="498"
        height="200"
        mask={`url(#${maskId})`}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source
              src={`${BASE_URL}videos/hero-setion.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
      </foreignObject>
    </svg>
  )
}

/*
 * ==========================================
 * SOCIAL LINK
 * ==========================================
 */

function AnimatedSocialLink({
  label,
  href,
}: {
  label: string
  href: string
}) {
  const characters =
    label.split('')

  return (
    <a
      href={href}
      className="
        group
        inline-flex
        text-body-copy
        outline-none
      "
    >
      {characters.map(
        (
          character,
          index,
        ) => (
          <span
            key={`${label}-${index}`}
            className="
              inline-block
              text-[#392919]
              transition-colors
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:text-[#DDE4EE]
              group-focus-visible:text-[#DDE4EE]
            "
            style={{
              transitionDelay:
                `${index * 35}ms`,
            }}
          >
            {character === ' '
              ? '\u00A0'
              : character}
          </span>
        ),
      )}
    </a>
  )
}

export function Contacts() {
  const [method, setMethod] =
    useState<ContactMethod | null>(
      null,
    )

  /*
   * ==========================================
   * ENTRANCE REFS
   * ==========================================
   */

  const sectionRef =
    useRef<HTMLElement>(null)

  const headerRef =
    useRef<HTMLDivElement>(null)

  const verticalLineRef =
    useRef<HTMLSpanElement>(null)

  const headingLineRefs =
    useRef<
      (HTMLParagraphElement | null)[]
    >([])

  const formRef =
    useRef<HTMLFormElement>(null)

  const contactInfoRef =
    useRef<HTMLDivElement>(null)

  const socialsRef =
    useRef<HTMLUListElement>(null)

  const logoRef =
    useRef<HTMLDivElement>(null)

  const bottomRef =
    useRef<HTMLDivElement>(null)

  /*
   * ==========================================
   * SEND BUTTON REFS
   * ==========================================
   */

  const sendButtonRef =
    useRef<HTMLButtonElement>(null)

  const sendLineRef =
    useRef<HTMLSpanElement>(null)

  const sendContentRef =
    useRef<HTMLSpanElement>(null)

  /*
   * ==========================================
   * FORM
   * ==========================================
   */

  const handleSubmit = (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
  }

  /*
   * ==========================================
   * CONTACTS ENTRANCE
   * ==========================================
   */

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headerRef.current ||
      !verticalLineRef.current ||
      !formRef.current ||
      !contactInfoRef.current ||
      !socialsRef.current ||
      !logoRef.current ||
      !bottomRef.current ||
      !sendButtonRef.current ||
      !sendLineRef.current ||
      !sendContentRef.current
    ) {
      return
    }

    const section =
      sectionRef.current

    const header =
      headerRef.current

    const verticalLine =
      verticalLineRef.current

    const form =
      formRef.current

    const contactInfo =
      contactInfoRef.current

    const socials =
      socialsRef.current

    const logo =
      logoRef.current

    const bottom =
      bottomRef.current

    const sendButton =
      sendButtonRef.current

    const sendLine =
      sendLineRef.current

    const sendContent =
      sendContentRef.current

    const sendLetters =
      Array.from(
        sendButton.querySelectorAll<HTMLElement>(
          '.contacts-send-letter',
        ),
      )

    const headingLines =
      headingLineRefs.current.filter(
        (
          line,
        ): line is HTMLParagraphElement =>
          line !== null,
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
            verticalLine,
            {
              scaleY: 1,
            },
          )

          gsap.set(
            [
              header,
              ...headingLines,
              form,
              contactInfo,
              socials,
              logo,
              bottom,
            ],
            {
              opacity: 1,
              x: 0,
              y: 0,
            },
          )

          gsap.set(
            sendLine,
            {
              scaleX: 1,
            },
          )

          gsap.set(
            sendContent,
            {
              x: 0,
            },
          )

          gsap.set(
            sendLetters,
            {
              opacity: 1,
              y: 0,
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
          verticalLine,
          {
            scaleY: 0,

            transformOrigin:
              'top center',
          },
        )

        gsap.set(
          headingLines,
          {
            opacity: 0,
            y: 22,
          },
        )

        gsap.set(
          form,
          {
            opacity: 0,
            y: 18,
          },
        )

        gsap.set(
          contactInfo,
          {
            opacity: 0,
            y: 16,
          },
        )

        gsap.set(
          socials,
          {
            opacity: 0,
            y: 16,
          },
        )

        gsap.set(
          logo,
          {
            opacity: 0,
            y: 14,
          },
        )

        gsap.set(
          bottom,
          {
            opacity: 0,
            y: 10,
          },
        )

        /*
         * ========================================
         * SEND BUTTON INITIAL STATE
         * ========================================
         */

        gsap.set(
          sendLine,
          {
            scaleX: 0,

            transformOrigin:
              'left center',
          },
        )

        gsap.set(
          sendContent,
          {
            x: 14,
          },
        )

        gsap.set(
          sendLetters,
          {
            opacity: 0,
            y: 5,
          },
        )

        /*
         * ========================================
         * MASTER ENTRANCE
         * ========================================
         */

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                section,

              start:
                'top 76%',

              once: true,
            },
          })

        /*
         * ======================================
         * 1. HEADER
         * ======================================
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
         * ======================================
         * 2. VERTICAL DIVIDER
         * ======================================
         */

        timeline.to(
          verticalLine,
          {
            scaleY: 1,

            duration:
              1.15,

            ease:
              'power3.inOut',
          },
          0.07,
        )

        /*
         * ======================================
         * 3. LARGE HEADING
         * ======================================
         */

        timeline.to(
          headingLines,
          {
            opacity: 1,
            y: 0,

            duration:
              0.8,

            stagger: {
              each:
                0.09,

              from:
                'start',
            },

            ease:
              'power3.out',
          },
          0.14,
        )

        /*
         * ======================================
         * 4. FORM
         * ======================================
         */

        timeline.to(
          form,
          {
            opacity: 1,
            y: 0,

            duration:
              0.9,

            ease:
              'power3.out',
          },
          0.4,
        )

        /*
         * ======================================
         * 5. HERO-STYLE SEND LINE
         * ======================================
         */

        timeline.to(
          sendLine,
          {
            scaleX: 1,

            duration:
              1,

            ease:
              'power3.inOut',
          },
          0.64,
        )

        /*
         * ======================================
         * 6. HERO-STYLE SEND CONTENT
         * ======================================
         */

        timeline.to(
          sendContent,
          {
            x: 0,

            duration:
              0.8,

            ease:
              'power3.out',
          },
          0.94,
        )

        /*
         * ======================================
         * 7. HERO-STYLE SEND LETTERS
         * ======================================
         */

        timeline.to(
          sendLetters,
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
          0.94,
        )

        /*
         * ======================================
         * 8. CONTACT DETAILS
         * ======================================
         */

        timeline.to(
          [
            contactInfo,
            socials,
          ],
          {
            opacity: 1,
            y: 0,

            duration:
              0.8,

            stagger:
              0.08,

            ease:
              'power3.out',
          },
          0.64,
        )

        /*
         * ======================================
         * 9. VIDEO LOGO
         * ======================================
         */

        timeline.to(
          logo,
          {
            opacity: 1,
            y: 0,

            duration:
              1,

            ease:
              'power3.out',
          },
          0.74,
        )

        /*
         * ======================================
         * 10. BOTTOM ROW
         * ======================================
         */

        timeline.to(
          bottom,
          {
            opacity: 1,
            y: 0,

            duration:
              0.7,

            ease:
              'power3.out',
          },
          0.9,
        )
      }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contacts"
      aria-label="Contacts"
      className="
        relative
        mt-[220px]
        h-[1372px]
        w-[1920px]
        bg-ice
        text-espresso
      "
    >
      {/*
       * ==========================================
       * INPUT STYLES
       * ==========================================
       */}

      <style>
        {`
          .contact-input,
          .contact-input:hover,
          .contact-input:focus,
          .contact-input:active {
            background: transparent !important;
            background-color: transparent !important;
            color: #392919 !important;
            -webkit-text-fill-color: #392919 !important;
            caret-color: #392919 !important;
            outline: none !important;
            border-radius: 0 !important;
            appearance: none !important;
            -webkit-appearance: none !important;
          }

          .contact-input:-webkit-autofill,
          .contact-input:-webkit-autofill:hover,
          .contact-input:-webkit-autofill:focus,
          .contact-input:-webkit-autofill:active {
            -webkit-text-fill-color: #392919 !important;
            caret-color: #392919 !important;
            background: transparent !important;
            background-color: transparent !important;
            transition: background-color 99999s ease-out 0s !important;
            -webkit-box-shadow: 0 0 0 1000px #7B978A inset !important;
            box-shadow: 0 0 0 1000px #7B978A inset !important;
          }

          .contact-input::placeholder {
            color: rgba(57, 41, 25, 0.4);
            -webkit-text-fill-color: rgba(57, 41, 25, 0.4);
          }
        `}
      </style>

      {/*
       * ==========================================
       * DECORATIVE TOP LINES
       *
       * STATIC — NO GSAP ANIMATION
       * ==========================================
       */}

      <div
        className="
          absolute
          top-0
          left-0
          h-[191px]
          w-[1920px]
          overflow-hidden
        "
      >
        {DECORATIVE_LINES.map(
          (
            line,
            index,
          ) => (
            <span
              key={index}
              className="
                absolute
                left-0
                w-full
                bg-[#7B978A]
              "
              style={{
                top:
                  `${line.top}px`,

                height:
                  `${line.height}px`,
              }}
            />
          ),
        )}
      </div>

      {/*
       * ==========================================
       * MAIN CONTACT AREA
       * ==========================================
       */}

      <div
        className="
          absolute
          top-[190px]
          left-0
          h-[1184px]
          w-[1920px]
          bg-[#7B978A]
        "
      >
        {/*
         * ========================================
         * SECTION HEADER
         * ========================================
         */}

        <div
          ref={headerRef}
          className="
            pointer-events-none
            absolute
            inset-0
          "
          style={{
            willChange:
              'opacity, transform',
          }}
        >
          <SectionHeader
            className="top-10"
            left="Write To Us"
            center="Contacts"
            right="We'll Respond Soon."
          />
        </div>

        {/*
         * ========================================
         * CENTRAL VERTICAL LINE
         * ========================================
         */}

        <span
          ref={verticalLineRef}
          className="
            absolute
            top-[72px]
            left-[960px]
            h-[1112px]
            w-[1.6px]
            bg-[#392919]/70
          "
          style={{
            transformOrigin:
              'top center',

            willChange:
              'transform',
          }}
        />

        {/*
         * ========================================
         * LARGE HEADING
         * ========================================
         */}

        <div
          className="
            absolute
            top-[112px]
            left-[40px]
            flex
            w-[663px]
            flex-col
            gap-[4px]
          "
        >
          {CONTACTS_COPY.headingLines.map(
            (
              line,
              index,
            ) => (
              <p
                key={line}
                ref={(
                  element,
                ) => {
                  headingLineRefs.current[
                    index
                  ] =
                    element
                }}
                className="
                  text-wordmark
                  m-0
                  text-[140px]
                  leading-[1]
                  whitespace-nowrap
                  text-[#392919]
                "
                style={{
                  willChange:
                    'opacity, transform',
                }}
              >
                {line}
              </p>
            ),
          )}
        </div>

        {/*
         * ========================================
         * CONTACT FORM
         * ========================================
         */}

        <form
          ref={formRef}
          id="contact-form"
          onSubmit={
            handleSubmit
          }
          className="
            absolute
            top-[151px]
            left-[1184px]
            w-[696px]
          "
          style={{
            willChange:
              'opacity, transform',
          }}
        >
          <div
            className="
              w-[696px]
            "
          >
            <p
              className="
                text-body-copy
                m-0
                text-[#392919]
              "
            >
              {
                CONTACTS_COPY.formDescription
              }
            </p>

            <div
              className="
                mt-[38px]
                h-[1px]
                w-[696px]
                bg-[#392919]
              "
            />
          </div>

          {/*
           * ======================================
           * NAME
           * ======================================
           */}

          <input
            type="text"
            name="name"
            required
            placeholder="name"
            autoComplete="name"
            className={`
              ${INPUT_CLASS}
              mt-[32px]
              h-[32px]
            `}
          />

          {/*
           * ======================================
           * PHONE
           * ======================================
           */}

          <input
            type="tel"
            name="phone"
            required
            placeholder="number"
            autoComplete="tel"
            className={`
              ${INPUT_CLASS}
              mt-[32px]
              h-[32px]
            `}
          />

          {/*
           * ======================================
           * CONTACT METHODS
           * ======================================
           */}

          <div
            className="
              mt-[32px]
              flex
              w-[696px]
              gap-[12px]
            "
            role="radiogroup"
            aria-label="Preferred contact method"
          >
            {CONTACT_METHODS.map(
              (
                option,
              ) => {
                const isActive =
                  method ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    role="radio"
                    aria-checked={
                      isActive
                    }
                    onClick={() =>
                      setMethod(
                        option,
                      )
                    }
                    className={`
                      flex
                      h-[44px]
                      w-[165px]
                      shrink-0
                      items-center
                      justify-center
                      border
                      text-[18px]
                      font-normal
                      outline-none

                      transition-[background-color,color,border-color]
                      duration-700

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      ${
                        isActive
                          ? 'border-[#392919] bg-[#392919] text-[#DDE4EE]'
                          : 'border-[#392919]/40 bg-transparent text-[#392919]'
                      }
                    `}
                  >
                    {
                      option.toLowerCase()
                    }
                  </button>
                )
              },
            )}
          </div>

          {/*
           * ======================================
           * CONDITIONAL CONTACT FIELD
           * ======================================
           */}

          <div
            className={`
              grid
              w-[696px]
              overflow-hidden

              transition-[grid-template-rows,opacity,margin-top]
              duration-700

              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                method
                  ? 'mt-[24px] grid-rows-[1fr] opacity-100'
                  : 'mt-0 grid-rows-[0fr] opacity-0'
              }
            `}
          >
            <div
              className="
                min-h-0
                overflow-hidden
              "
            >
              <input
                type="text"
                name="handle"
                required={
                  method !==
                  null
                }
                tabIndex={
                  method
                    ? 0
                    : -1
                }
                placeholder={
                  method
                    ? `your ${method.toLowerCase()} contact`
                    : ''
                }
                className={`
                  ${INPUT_CLASS}
                  h-[32px]

                  transition-[opacity,transform]
                  duration-700

                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    method
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-[6px] opacity-0'
                  }
                `}
              />
            </div>
          </div>

          {/*
           * ======================================
           * SEND — SAME PRINCIPLE AS HERO
           * ======================================
           */}

          <button
            ref={sendButtonRef}
            type="submit"
            className="
              group
              mt-[100px]
              flex
              w-[696px]
              flex-col
              text-left
              outline-none
            "
          >
            {/*
             * ====================================
             * LINE
             * ====================================
             */}

            <span
              ref={sendLineRef}
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
                  bg-[#392919]

                  transition-[background-color,transform]
                  duration-300
                  ease-out

                  group-hover:scale-x-[0.95]
                  group-hover:bg-[#DDE4EE]

                  group-focus-visible:scale-x-[0.95]
                  group-focus-visible:bg-[#DDE4EE]
                "
              />
            </span>

            {/*
             * ====================================
             * CONTENT
             * ====================================
             */}

            <span
              ref={sendContentRef}
              className="
                mt-[6px]
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-button-label
                  text-[#392919]

                  transition-colors
                  duration-300
                  ease-out

                  group-hover:text-[#DDE4EE]
                  group-focus-visible:text-[#DDE4EE]
                "
                aria-label="Send"
              >
                <AnimatedWords
                  text="Send"
                  letterClassName="contacts-send-letter"
                />
              </span>

              <span
                className="
                  inline-flex
                  text-[#392919]

                  transition-[color,transform]
                  duration-300
                  ease-out

                  group-hover:translate-x-[8px]
                  group-hover:text-[#DDE4EE]

                  group-focus-visible:translate-x-[8px]
                  group-focus-visible:text-[#DDE4EE]
                "
              >
                <ArrowIcon />
              </span>
            </span>
          </button>
        </form>

        {/*
         * ========================================
         * PHONE + ADDRESS
         * ========================================
         */}

        <div
          ref={contactInfoRef}
          className="
            absolute
            top-[756px]
            left-[40px]
            w-[279px]
          "
          style={{
            willChange:
              'opacity, transform',
          }}
        >
          <div
            className="
              flex
              flex-col
              gap-[10px]
            "
          >
            <span className="text-body-copy">
              {
                CONTACTS_COPY.phoneNumbers[
                  0
                ]
              }
            </span>

            <span className="text-body-copy">
              {
                CONTACTS_COPY.phoneNumbers[
                  1
                ]
              }
            </span>
          </div>

          <p
            className="
              text-body-copy
              mt-[88px]
              w-[279px]
              text-espresso/70
            "
          >
            {
              CONTACTS_COPY.address
            }
          </p>
        </div>

        {/*
         * ========================================
         * SOCIAL LINKS
         * ========================================
         */}

        <ul
          ref={socialsRef}
          className="
            absolute
            top-[756px]
            left-[548px]
            flex
            w-[120px]
            flex-col
            gap-[20px]
          "
          style={{
            willChange:
              'opacity, transform',
          }}
        >
          {SOCIAL_LINKS.map(
            (
              link,
            ) => (
              <li
                key={
                  link.label
                }
              >
                <AnimatedSocialLink
                  href={
                    link.href
                  }
                  label={
                    link.label
                  }
                />
              </li>
            ),
          )}
        </ul>

        {/*
         * ========================================
         * VIDEO LOGO
         * ========================================
         */}

        <div
          ref={logoRef}
          className="
            absolute
            top-[748px]
            left-[1168px]
            h-[338px]
            w-[712px]
          "
          style={{
            willChange:
              'opacity, transform',
          }}
        >
          <VideoFooterLogo />
        </div>

        {/*
         * ========================================
         * BOTTOM ROW
         * ========================================
         */}

        <div
          ref={bottomRef}
          className="
            absolute
            top-[1128px]
            left-[40px]
            flex
            w-[1840px]
            items-center
            justify-between
          "
          style={{
            willChange:
              'opacity, transform',
          }}
        >
          <span
            className="
              text-footnote
              text-espresso
            "
          >
            ©2025
          </span>

          <span
            className="
              text-footnote
              absolute
              right-[476px]
              text-espresso
            "
          >
            web designer tetiana
            varzonova
          </span>

          <a
            href="#"
            className="
              text-footnote
              text-espresso
              hover:text-espresso
            "
          >
            privacy policy
          </a>
        </div>
      </div>
    </section>
  )
}