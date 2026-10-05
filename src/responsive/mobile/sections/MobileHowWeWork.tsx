import { useRef, useState } from 'react'

import { Cta } from '../components/Cta'
import { MobileSlider } from '../components/MobileSlider'
import { Pagination } from '../components/Pagination'
import { SectionLabel } from '../components/SectionLabel'
import { HOW_WE_WORK_STEPS } from '../../../data/howWeWork'
import { useMobileReveal } from '../hooks/useMobileReveal'

export function MobileHowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  useMobileReveal(sectionRef)

  const total = HOW_WE_WORK_STEPS.length

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How We Work"
      className="m-sec m-sec--gap m-hww"
    >
      <SectionLabel
        lines={[
          'A minimum of actions on your part.',
          'how we work',
          'Maximum - from ours.',
        ]}
      />

      <MobileSlider
        label="How we work"
        index={index}
        onIndexChange={setIndex}
        after={
          <div className="m-hww__pag">
            <Pagination index={index} total={total} />
          </div>
        }
      >
        {HOW_WE_WORK_STEPS.map((step, i) => (
          <div key={step.title} className="m-hww__slide">
            <h2 className="m-big">{step.title}</h2>

            {/* Figma dots fade in per step: 25 / 50 / 75 / 100% sage. */}
            <span
              className="m-hww__dot"
              aria-hidden="true"
              style={{ opacity: (i + 1) / total }}
            />

            <div className="m-hww__text">
              <p className="m-t16m">{step.subtitle}</p>
              <p className="m-t16">{step.description}</p>
            </div>
          </div>
        ))}
      </MobileSlider>

      <Cta
        href="#contact-form"
        label="Get advice"
        className="m-hww__cta"
      />

      <p className="m-foot">
        from your first request to your key.
        <br />
        we handle everything.
      </p>
    </section>
  )
}
