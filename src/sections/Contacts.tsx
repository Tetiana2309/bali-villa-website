import { useState, type FormEvent } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { CONTACT_METHODS, SOCIAL_LINKS, CONTACTS_COPY, type ContactMethod } from '../data/contacts'

const DECORATIVE_LINE_POSITIONS = [0, 26, 52, 86, 134, 191]

export function Contacts() {
  const [method, setMethod] = useState<ContactMethod>('Telegram')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Submission wiring (API/CRM/email) is intentionally out of scope for
    // this desktop-scaffolding pass — no backend endpoint was specified.
  }

  return (
    <section
      id="contacts"
      aria-label="Contacts"
      className="relative h-[1372px] w-[1920px] bg-ice text-espresso"
    >
      {/* Decorative line stack — static visual element per the approved
          Figma composition. No interaction or animation added at this stage. */}
      <div className="absolute top-0 left-0 h-[191px] w-[1920px]">
        {DECORATIVE_LINE_POSITIONS.map((y) => (
          <span key={y} className="absolute left-0 h-px w-full bg-espresso/20" style={{ top: y }} />
        ))}
      </div>

      <SectionHeader
        className="top-[201px]"
        left="Write to us"
        center="contacts"
        right="We'll respond soon."
      />

      <span className="absolute top-[232px] left-[960px] h-[1140px] w-px bg-espresso/20" />

      {/*
        PLACEHOLDER copy — see src/data/contacts.ts for why. Sized at
        wordmark scale to match the ~126px-tall heading lines in Figma's
        metadata; the real copy and exact size should be re-verified once
        Figma access is available again.
      */}
      <div className="absolute top-[303px] left-10 w-[663px]">
        {CONTACTS_COPY.headingLines.map((line) => (
          <p key={line} className="text-wordmark m-0 text-[64px] whitespace-nowrap">
            {line}
          </p>
        ))}
      </div>

      <form
        id="contact-form"
        onSubmit={handleSubmit}
        className="absolute top-[342px] left-[1184px] flex w-[696px] flex-col gap-8"
      >
        <p className="text-body-copy text-espresso/70">{CONTACTS_COPY.formDescription}</p>

        <label className="flex flex-col gap-2 border-b border-espresso/30 pb-3">
          <span className="text-footnote text-espresso/60">Name</span>
          <input
            type="text"
            name="name"
            required
            className="text-body-copy bg-transparent outline-none"
            autoComplete="name"
          />
        </label>

        <label className="flex flex-col gap-2 border-b border-espresso/30 pb-3">
          <span className="text-footnote text-espresso/60">Phone number</span>
          <input
            type="tel"
            name="phone"
            required
            className="text-body-copy bg-transparent outline-none"
            autoComplete="tel"
          />
        </label>

        <div className="flex w-full" role="radiogroup" aria-label="Preferred contact method">
          {CONTACT_METHODS.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={method === option}
              onClick={() => setMethod(option)}
              className={`text-heading-two flex h-11 flex-1 items-center justify-center transition-colors duration-300 ${
                method === option ? 'text-sage' : 'text-espresso/60'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-2 border-b border-espresso/30 pb-3">
          <span className="text-footnote text-espresso/60">Your {method} contact</span>
          <input
            type="text"
            name="handle"
            required
            className="text-body-copy bg-transparent outline-none"
          />
        </label>

        <button type="submit" className="group flex w-full flex-col gap-1.5 text-left">
          <span className="h-px w-full bg-espresso" />
          <span className="flex items-center justify-between py-1">
            <span className="text-button-label">send</span>
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>
      </form>

      <div className="absolute top-[979px] left-10 w-[279px]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-body-copy">{CONTACTS_COPY.phoneNumbers[0]}</span>
          <span className="text-body-copy">{CONTACTS_COPY.phoneNumbers[1]}</span>
        </div>
        <p className="text-body-copy mt-[42px] w-[279px] text-espresso/70">
          {CONTACTS_COPY.address}
        </p>
      </div>

      <ul className="absolute top-[979px] left-[548px] flex w-[76px] flex-col gap-[20px]">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-body-copy hover:text-sage">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/*
        Figma's "Footer Logo" (node 71:488) is a vector graphic that was not
        exported/downloaded during inspection. This large, faded wordmark is
        a structural placeholder for that decorative mark, not a recreation
        of the actual asset.
      */}
      <span
        aria-hidden="true"
        className="text-logo absolute top-[979px] left-[1168px] text-[80px] opacity-20"
      >
        luc.id
      </span>

      <div className="absolute top-[1319px] flex w-[1840px] items-center justify-between left-10">
        <span className="text-footnote text-espresso/60">©2025</span>
        <span className="text-footnote text-espresso/60">web designer tetiana varzonova</span>
        <a href="#" className="text-footnote text-espresso/60 hover:text-sage">
          privacy policy
        </a>
      </div>
    </section>
  )
}
