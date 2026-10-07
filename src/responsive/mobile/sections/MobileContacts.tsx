import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ArrowIcon } from '../../../components/ArrowIcon'
import {
  CONTACTS_COPY,
  CONTACT_METHODS,
  SOCIAL_LINKS,
  type ContactMethod,
} from '../../../data/contacts'
import { gsap } from '../../../lib/gsap'

gsap.registerPlugin(ScrollTrigger)

const BASE_URL = import.meta.env.BASE_URL

/*
 * ==========================================
 * ANIMATED WORDS
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
          className="m-con__word"
        >
          {word.split('').map(
            (
              character,
              characterIndex,
            ) => (
              <span
                key={`${character}-${characterIndex}`}
                className={letterClassName}
                aria-hidden="true"
              >
                {character}
              </span>
            ),
          )}

          {wordIndex <
            words.length - 1 && (
            <span
              className={letterClassName}
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

/*
 * ==========================================
 * VIDEO LOGO
 * ==========================================
 */

function MobileVideoLogo() {
  const maskId =
    useId().replace(/:/g, '')

  return (
    <svg
      className="m-con__logo"
      viewBox="0 0 498 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

function MobileSocialLink({
  label,
  href,
}: {
  label: string
  href: string
}) {
  return (
    <a
      href={href}
      className="m-con__social-link"
    >
      {label
        .split('')
        .map(
          (
            character,
            index,
          ) => (
            <span
              key={`${label}-${index}`}
              className="m-con__social-letter"
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

/*
 * ==========================================
 * CONTACTS
 * ==========================================
 */

export function MobileContacts() {
  const [method, setMethod] =
    useState<ContactMethod | null>(
      null,
    )

  const sectionRef =
    useRef<HTMLElement>(null)

  const headingRefs =
    useRef<
      (HTMLParagraphElement | null)[]
    >([])

  const formRef =
    useRef<HTMLFormElement>(null)

  const sendButtonRef =
    useRef<HTMLButtonElement>(null)

  const sendLineRef =
    useRef<HTMLSpanElement>(null)

  const sendContentRef =
    useRef<HTMLSpanElement>(null)

  const infoRef =
    useRef<HTMLDivElement>(null)

  const socialsRef =
    useRef<HTMLUListElement>(null)

  const logoRef =
    useRef<HTMLDivElement>(null)

  const legalRef =
    useRef<HTMLDivElement>(null)

  /*
   * ==========================================
   * SUBMIT
   * ==========================================
   */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const formData =
      new FormData(
        event.currentTarget,
      )

    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      method,
      handle:
        formData.get('handle'),
    }

    console.log(
      'mobile contact form:',
      data,
    )
  }

  /*
   * ==========================================
   * ENTRANCE ANIMATION
   * ==========================================
   */

  useEffect(() => {
    if (
      !sectionRef.current ||
      !formRef.current ||
      !sendButtonRef.current ||
      !sendLineRef.current ||
      !sendContentRef.current ||
      !infoRef.current ||
      !socialsRef.current ||
      !logoRef.current ||
      !legalRef.current
    ) {
      return
    }

    const section =
      sectionRef.current

    const form =
      formRef.current

    const sendButton =
      sendButtonRef.current

    const sendLine =
      sendLineRef.current

    const sendContent =
      sendContentRef.current

    const info =
      infoRef.current

    const socials =
      socialsRef.current

    const logo =
      logoRef.current

    const legal =
      legalRef.current

    const headings =
      headingRefs.current.filter(
        (
          item,
        ): item is HTMLParagraphElement =>
          item !== null,
      )

    const sendLetters =
      Array.from(
        sendButton.querySelectorAll<HTMLElement>(
          '.m-con__letter',
        ),
      )

    const reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

    const ctx = gsap.context(
      () => {
        if (reducedMotion) {
          gsap.set(
            [
              ...headings,
              form,
              info,
              socials,
              logo,
              legal,
            ],
            {
              opacity: 1,
              y: 0,
            },
          )

          gsap.set(sendLine, {
            scaleX: 1,
          })

          gsap.set(sendContent, {
            x: 0,
          })

          gsap.set(sendLetters, {
            opacity: 1,
            y: 0,
          })

          return
        }

        gsap.set(headings, {
          opacity: 0,
          y: 22,
        })

        gsap.set(
          [
            form,
            info,
            socials,
            logo,
            legal,
          ],
          {
            opacity: 0,
            y: 18,
          },
        )

        gsap.set(sendLine, {
          scaleX: 0,
          transformOrigin:
            'left center',
        })

        gsap.set(sendContent, {
          x: 14,
        })

        gsap.set(sendLetters, {
          opacity: 0,
          y: 5,
        })

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          })

        timeline.to(
          headings,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: 'power3.out',
          },
          0,
        )

        timeline.to(
          form,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          0.25,
        )

        timeline.to(
          sendLine,
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          },
          0.52,
        )

        timeline.to(
          sendContent,
          {
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.75,
        )

        timeline.to(
          sendLetters,
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            stagger: 0.025,
            ease: 'power2.out',
          },
          0.75,
        )

        timeline.to(
          [
            info,
            socials,
            logo,
            legal,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.6,
        )
      },
      section,
    )

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contacts"
      aria-label="Contacts"
      className="m-con"
    >
      {/* STRIPES */}

      <div
        className="m-con__stripes"
        aria-hidden="true"
      />

      {/* SECTION LABEL */}

     <div className="m-label">
  <p>Write To Us</p>
  <p>Contacts</p>
  <p>We’ll Respond Soon.</p>
</div>

      {/* HEADING */}

 <div className="m-con__heading">
  {CONTACTS_COPY.headingLines.map(
    (line, index) => (
      <p
        key={line}
        ref={(element) => {
          headingRefs.current[index] =
            element
        }}
      >
        {line}
      </p>
    ),
  )}
</div>

      {/* FORM */}

      <form
        ref={formRef}
        className="m-form"
        onSubmit={handleSubmit}
      >
        <p className="m-form__desc m-t16">
          {
            CONTACTS_COPY.formDescription
          }
        </p>

        {/* NAME */}

        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="name"
          className="m-field"
        />

        {/* NUMBER */}

        <input
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          placeholder="number"
          className="m-field"
        />

        {/* CONTACT METHODS */}

        <div
          className="m-chips"
          role="radiogroup"
          aria-label="Preferred contact method"
        >
          {CONTACT_METHODS.map(
            (option) => {
              const isActive =
                method === option

              return (
                <button
                  key={option}
                  type="button"
                  className="m-chip"
                  role="radio"
                  aria-checked={
                    isActive
                  }
                  onClick={() => {
                    setMethod(
                      option,
                    )
                  }}
                >
                  {option.toLowerCase()}
                </button>
              )
            },
          )}
        </div>

        {/* CONDITIONAL CONTACT FIELD */}

        <div
          className={`m-handle ${
            method
              ? 'm-handle--open'
              : ''
          }`}
          aria-hidden={!method}
        >
          <div className="m-handle__inner">
            <input
              type={
                method
                  ?.toLowerCase() ===
                'email'
                  ? 'email'
                  : 'text'
              }
              name="handle"
              required={
                method !== null
              }
              tabIndex={
                method ? 0 : -1
              }
              autoComplete={
                method
                  ?.toLowerCase() ===
                'email'
                  ? 'email'
                  : 'off'
              }
              placeholder={
                method
                  ? `your ${method.toLowerCase()} contact`
                  : ''
              }
              className="m-field m-field--handle"
            />
          </div>
        </div>

        {/* SEND */}

        <button
          ref={sendButtonRef}
          type="submit"
          className="m-send"
        >
          <span
            ref={sendLineRef}
            className="m-send__line"
          >
            <span className="m-send__line-inner" />
          </span>

          <span
            ref={sendContentRef}
            className="m-send__row"
          >
            <span
              className="m-send__label"
              aria-label="Send"
            >
              <AnimatedWords
                text="Send"
                letterClassName="m-con__letter"
              />
            </span>

            <span className="m-send__arrow">
              <ArrowIcon />
            </span>
          </span>
        </button>
      </form>

      {/* VIDEO LOGO */}

      <div ref={logoRef}>
        <MobileVideoLogo />
      </div>

      {/* PHONE + ADDRESS */}

      <div
        ref={infoRef}
        className="m-con__info"
      >
        <div className="m-con__phones">
          {CONTACTS_COPY.phoneNumbers.map(
            (phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(
                  /\s/g,
                  '',
                )}`}
                className="m-t16"
              >
                {phone}
              </a>
            ),
          )}
        </div>

        <p className="m-con__addr m-t16">
          {CONTACTS_COPY.address}
        </p>
      </div>

      {/* SOCIALS */}

      <ul
        ref={socialsRef}
        className="m-con__socials"
      >
        {SOCIAL_LINKS.map(
          (social) => (
            <li key={social.label}>
              <MobileSocialLink
                label={
                  social.label
                }
                href={social.href}
              />
            </li>
          ),
        )}
      </ul>

      {/* LEGAL */}

      <div
        ref={legalRef}
        className="m-con__legal"
      >
        <span>
          © luc.id
        </span>

        <a href="/privacy">
          privacy policy
        </a>

        <a href="/terms">
          terms & conditions
        </a>
      </div>
    </section>
  )
}