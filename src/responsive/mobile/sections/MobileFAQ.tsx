import { useRef, useState } from 'react'

import { ArrowIcon } from '../../../components/ArrowIcon'
import { SectionLabel } from '../components/SectionLabel'
import { FAQ_ITEMS } from '../../../data/faq'
import { useMobileReveal } from '../hooks/useMobileReveal'

/* Same active (diagonal) arrow the desktop FAQ uses. */
function ActiveArrow() {
  return (
    <svg
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17.9415 2.73679C18.0374 2.19289 17.6742 1.67423 17.1303 1.57833L8.26703 0.0154978C7.72313 -0.0804057 7.20447 0.282763 7.10857 0.826657C7.01267 1.37055 7.37584 1.88921 7.91973 1.98511L15.7982 3.3743L14.409 11.2528C14.3131 11.7967 14.6763 12.3153 15.2202 12.4112C15.7641 12.5071 16.2827 12.144 16.3786 11.6001L17.9415 2.73679ZM0.573608 14.0347L1.14718 14.8538L17.5302 3.38229L16.9566 2.56314L16.3831 1.74399L3.19481e-05 13.2155L0.573608 14.0347Z"
        fill="#555555"
      />
    </svg>
  )
}

export function MobileFAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useMobileReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="m-sec m-sec--gap m-faq"
    >
      <SectionLabel
        lines={[
          'The questions we hear most often',
          'questions',
          'and the answers you actually need.',
        ]}
      />

      <h2 className="m-big m-faq__title" data-reveal>
        Quick
      </h2>

      <div className="m-faq__list">
        {FAQ_ITEMS.map((item, i) => {
          const isActive = active === i

          return (
            <div
              key={item.question}
              className={`m-faq__item ${
                i === FAQ_ITEMS.length - 1 ? 'm-faq__item--last' : ''
              }`}
              data-active={isActive}
            >
              <p className="m-t16m m-faq__q">{item.question}</p>

              <div className="m-faq__row">
                <p className="m-t16 m-faq__a">{item.answer}</p>

                <button
                  type="button"
                  className="m-faq__toggle"
                  aria-expanded={isActive}
                  aria-label={
                    isActive
                      ? `Close answer: ${item.question}`
                      : `Show answer: ${item.question}`
                  }
                  onClick={() => setActive(isActive ? null : i)}
                >
                  {isActive ? <ActiveArrow /> : <ArrowIcon />}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <p className="m-foot">
        frequent questions.
        <br />
        clear answers.
      </p>
    </section>
  )
}