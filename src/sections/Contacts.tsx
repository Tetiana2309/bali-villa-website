import { useState, type FormEvent } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import {
  CONTACT_METHODS,
  SOCIAL_LINKS,
  CONTACTS_COPY,
  type ContactMethod,
} from '../data/contacts'

const DECORATIVE_LINES = [
  { top: 0, height: 6 },
  { top: 20, height: 10 },
  { top: 44, height: 16 },
  { top: 74, height: 24 },
  { top: 111, height: 40 },
  { top: 141, height: 50 },
]

function FooterLogo() {
  return (
    <svg
      width="498"
      height="200"
      viewBox="0 0 498 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 198.321V13.6411H42.3374V198.321H0Z"
        fill="#392919"
      />

      <path
        d="M90.3183 200C81.0134 200 73.8796 198.251 68.917 194.753C64.0319 191.256 60.6976 186.394 58.9142 180.168C57.1307 173.872 56.239 166.527 56.239 158.132V40.9234H98.1112V153.725C98.1112 160.021 98.654 164.428 99.7396 166.946C100.825 169.395 103.384 170.619 107.416 170.619C111.758 170.619 114.472 168.87 115.558 165.373C116.721 161.875 117.303 157.363 117.303 151.836V40.9234H158.826V198.321H117.186V181.532C114.55 187.548 111.371 192.13 107.649 195.278C104.004 198.426 98.2275 200 90.3183 200Z"
        fill="#392919"
      />

      <path
        d="M225.649 200C206.109 200 192.229 195.488 184.01 186.464C175.868 177.44 171.797 164.183 171.797 146.695V98.2162C171.797 85.0647 173.348 74.1168 176.449 65.3725C179.551 56.6282 184.979 50.0874 192.733 45.7503C200.487 41.4131 211.265 39.2445 225.068 39.2445C234.683 39.2445 243.29 40.7835 250.889 43.8615C258.565 46.9395 264.614 51.4516 269.034 57.3977C273.453 63.3438 275.663 70.6191 275.663 79.2235V103.253H233.21V81.2172C233.21 77.5796 232.628 74.5366 231.465 72.0881C230.302 69.5698 227.782 68.3106 223.905 68.3106C217.081 68.3106 213.669 72.6828 213.669 81.4271V157.712C213.669 160.93 214.445 163.903 215.995 166.632C217.546 169.29 220.105 170.619 223.672 170.619C227.316 170.619 229.837 169.325 231.232 166.737C232.706 164.078 233.442 161 233.442 157.503V131.06H275.663V158.552C275.663 167.226 273.492 174.676 269.15 180.902C264.885 187.058 258.992 191.78 251.47 195.068C243.949 198.356 235.342 200 225.649 200Z"
        fill="#392919"
      />

      <path
        d="M285.843 198.216V166.946H327.482V198.216H285.843Z"
        fill="#392919"
      />

      <path
        d="M339.639 31.2697V0H381.279V31.2697H339.639ZM339.639 198.321V40.9234H381.279V198.321H339.639Z"
        fill="#392919"
      />

      <path
        d="M429.725 200C421.661 200 415.264 198.671 410.534 196.013C405.804 193.354 402.276 189.682 399.949 184.995C397.623 180.308 396.072 174.816 395.297 168.52C394.599 162.225 394.25 155.474 394.25 148.269V79.8531C394.25 67.751 396.615 57.9573 401.345 50.4722C406.153 42.9871 414.256 39.2445 425.654 39.2445C434.106 39.2445 440.581 40.8884 445.078 44.1763C449.653 47.3942 453.181 51.9063 455.663 57.7125V13.6411H498V198.321H455.663V181.637C453.336 187.303 450.235 191.78 446.358 195.068C442.558 198.356 437.014 200 429.725 200ZM445.66 170.619C449.614 170.619 452.251 169.185 453.569 166.317C454.965 163.449 455.663 158.307 455.663 150.892V84.68C455.663 80.9724 455.042 77.3347 453.802 73.7671C452.639 70.1294 450.002 68.3106 445.892 68.3106C441.395 68.3106 438.565 70.0245 437.402 73.4523C436.239 76.88 435.657 80.6226 435.657 84.68V150.892C435.657 164.043 438.991 170.619 445.66 170.619Z"
        fill="#392919"
      />
    </svg>
  )
}

export function Contacts() {
  const [method, setMethod] = useState<ContactMethod>('Telegram')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section
      id="contacts"
      aria-label="Contacts"
      className="relative mt-[220px] h-[1372px] w-[1920px] bg-ice text-espresso"
    >
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 h-[191px] w-[1920px] overflow-hidden">
        {DECORATIVE_LINES.map((line, index) => (
          <span
            key={index}
            className="absolute left-0 w-full bg-[#7B978A]"
            style={{
              top: `${line.top}px`,
              height: `${line.height}px`,
            }}
          />
        ))}
      </div>

      {/* Footer Form Content */}
      <div className="absolute top-[190px] left-0 h-[1184px] w-[1920px] bg-[#7B978A]">
        <SectionHeader
          className="top-10"
          left="Write To Us"
          center="Contacts"
          right="We'll Respond Soon."
        />

        {/* Vertical divider */}
        <span className="absolute top-[72px] left-[960px] h-[1112px] w-[1.6px] bg-[#392919]/70" />

        {/* Main heading */}
        <div className="absolute top-[112px] left-[40px] flex w-[663px] flex-col gap-[4px]">
          {CONTACTS_COPY.headingLines.map((line) => (
            <p
              key={line}
              className="text-wordmark m-0 text-[140px] leading-[1] whitespace-nowrap text-[#392919]"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Contact form */}
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="absolute top-[151px] left-[1184px] w-[696px]"
        >
          {/* Description */}
          <div className="w-[696px]">
            <p className="text-body-copy m-0 text-[#392919]">
              {CONTACTS_COPY.formDescription}
            </p>

            <div className="mt-[38px] h-[1px] w-[696px] bg-[#392919]" />
          </div>

          {/* Name */}
          <input
            type="text"
            name="name"
            required
            placeholder="name"
            autoComplete="name"
            className="text-body-copy mt-[32px] h-[32px] w-[696px] border-0 border-b border-[#392919] bg-transparent p-0 text-[#392919] outline-none placeholder:text-[#392919]/40"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            required
            placeholder="number"
            autoComplete="tel"
            className="text-body-copy mt-[32px] h-[32px] w-[696px] border-0 border-b border-[#392919] bg-transparent p-0 text-[#392919] outline-none placeholder:text-[#392919]/40"
          />

          {/* Contact method buttons */}
          <div
            className="mt-[32px] flex w-[696px] gap-[12px]"
            role="radiogroup"
            aria-label="Preferred contact method"
          >
            {CONTACT_METHODS.map((option) => {
              const isActive = method === option

              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setMethod(option)}
                  className={`flex h-[44px] w-[165px] shrink-0 items-center justify-center border text-[18px] font-normal transition-colors duration-300 ${
                    isActive
                      ? 'border-[#392919] bg-[#392919] text-[#DDE4EE]'
                      : 'border-[#392919]/40 bg-transparent text-[#392919]'
                  }`}
                >
                  {option.toLowerCase()}
                </button>
              )
            })}
          </div>

          {/* Selected contact field */}
          <input
            type="text"
            name="handle"
            required
            placeholder={`your ${method.toLowerCase()} contact`}
            className="text-body-copy mt-[24px] h-[32px] w-[696px] border-0 border-b border-[#392919] bg-transparent p-0 text-[#392919] outline-none placeholder:text-[#392919]/40"
          />

          {/* Send button */}
          <button
            type="submit"
            className="group mt-[100px] flex w-[696px] flex-col gap-[6px] text-left"
          >
            <span className="h-[2px] w-full bg-[#392919]" />

            <span className="flex items-center justify-between">
              <span className="text-button-label text-[#392919]">
                Send
              </span>

              <ArrowIcon className="text-[#392919] transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </form>

        {/* Contact details */}
        <div className="absolute top-[800px] left-[40px] w-[279px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-body-copy">
              {CONTACTS_COPY.phoneNumbers[0]}
            </span>

            <span className="text-body-copy">
              {CONTACTS_COPY.phoneNumbers[1]}
            </span>
          </div>

          <p className="text-body-copy mt-[88px] w-[279px] text-espresso/70">
            {CONTACTS_COPY.address}
          </p>
        </div>

        {/* Social links */}
        <ul className="absolute top-[800px] left-[548px] flex w-[76px] flex-col gap-[20px]">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-body-copy hover:text-[#392919]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* SVG logo */}
        <div className="absolute top-[800px] left-[1168px] h-[200px] w-[498px]">
          <FooterLogo />
        </div>

        {/* Bottom footer row */}
        <div className="absolute top-[1128px] left-[40px] flex w-[1840px] items-center justify-between">
          <span className="text-footnote text-espresso">
            ©2025
          </span>

          <span className="text-footnote absolute right-[476px] text-espresso">
  web designer tetiana varzonova
</span>

          <a
            href="#"
            className="text-footnote text-espresso hover:text-espresso"
          >
            privacy policy
          </a>
        </div>
      </div>
    </section>
  )
}