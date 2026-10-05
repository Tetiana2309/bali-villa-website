import { type FormEvent, useRef, useState } from 'react'

import { ArrowIcon } from '../../../components/ArrowIcon'
import { SectionLabel } from '../components/SectionLabel'
import {
  CONTACTS_COPY,
  CONTACT_METHODS,
  type ContactMethod,
  SOCIAL_LINKS,
} from '../../../data/contacts'
import { useMobileReveal } from '../hooks/useMobileReveal'

/*
 * Large "luc.id" wordmark (Figma vector 335x128).
 * The vector's SVG source is not retrievable through Figma MCP, so it is set
 * in Anton, sized and tracked to the exact 335x128 box measured from the
 * Figma render, until the original SVG is exported.
 */
function LucIdWordmark() {
  return (
    <svg
      className="m-con__logo"
      viewBox="0 0 335 128"
      role="img"
      aria-label="luc.id"
    >
      <text
        x="-5"
        y="126.6"
        fill="currentColor"
        transform="scale(1.17 1)"
        style={{
          fontFamily: "var(--font-anton, 'Anton', sans-serif)",
          fontSize: '137.6px',
          letterSpacing: '-1.5px',
        }}
      >
        luc.id
      </text>
    </svg>
  )
}

/*
 * Contact details exactly as drawn in the mobile Figma. (The desktop data
 * file still holds placeholder numbers.)
 */
const FIGMA_PHONES = ['+62 812 34 56 78 90', '+62 361 123 45 67']

export function MobileContacts() {
  const sectionRef = useRef<HTMLElement>(null)
  const [method, setMethod] = useState<ContactMethod>('Telegram')

  useMobileReveal(sectionRef)

  /* Same as desktop: no backend yet, the submit is only prevented. */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section
      ref={sectionRef}
      id="contacts"
      aria-label="Contacts"
      className="m-con"
    >
      <div className="m-con__stripes" aria-hidden="true" />

      <SectionLabel
        lines={['Write to us', 'contacts', 'We’ll respond soon.']}
      />

      <h2 className="m-con__heading" data-reveal>
        {CONTACTS_COPY.headingLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </h2>

      <form id="contact-form" className="m-form" onSubmit={handleSubmit}>
        <p className="m-t16 m-form__desc">{CONTACTS_COPY.formDescription}</p>

        <input
          className="m-field"
          type="text"
          name="name"
          placeholder="name"
          autoComplete="name"
        />

        <input
          className="m-field"
          type="tel"
          name="number"
          placeholder="number"
          autoComplete="tel"
          inputMode="tel"
        />

        <div
          className="m-chips"
          role="radiogroup"
          aria-label="Preferred contact method"
        >
          {CONTACT_METHODS.map((option) => (
            <button
              key={option}
              type="button"
              className="m-chip"
              role="radio"
              aria-checked={method === option}
              onClick={() => setMethod(option)}
            >
              {option.toLowerCase()}
            </button>
          ))}
        </div>

        <input
          className="m-field m-field--handle"
          type="text"
          name="handle"
          placeholder={method.toLowerCase()}
          required
        />

        <button type="submit" className="m-cta m-send" aria-label="Send">
          <span className="m-send__row">
            <span>send</span>
            <ArrowIcon />
          </span>
        </button>
      </form>

      <LucIdWordmark />

      <div className="m-con__info m-t16">
        <div className="m-con__phones">
          {FIGMA_PHONES.map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>
              {phone}
            </a>
          ))}
        </div>

        <p className="m-con__addr">{CONTACTS_COPY.address}</p>
      </div>

      <ul className="m-con__socials m-t16">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className="m-con__legal">
        <span>©2025</span>
        <span>web designer tetiana varzonova</span>
        <a href="#">privacy policy</a>
      </div>
    </section>
  )
}
