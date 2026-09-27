import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { GetAdviceButton } from '../components/GetAdviceButton'
import { HOW_WE_WORK_STEPS } from '../data/howWeWork'

const STEP_SCROLL_DISTANCE = 600

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(
    () => {
      const steps = stepRefs.current.filter((el): el is HTMLDivElement => el !== null)
      if (steps.length < 2) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.set(steps[0], { yPercent: 0 })
      gsap.set(steps.slice(1), { yPercent: 100 })

      if (prefersReducedMotion) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(steps.length - 1) * STEP_SCROLL_DISTANCE}`,
          scrub: 1,
          pin: true,
        },
      })

      steps.slice(1).forEach((step, i) => {
        tl.to(step, { yPercent: 0, duration: 1, ease: 'power2.inOut' }, i)
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-label="How We Work"
      className="relative h-[1312px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-10"
        left="A Minimum Of Actions On Your Part."
        center="How We Work"
        right="Maximum - From Ours."
      />

      <div className="absolute top-[152px] left-0 h-[184px] w-[1920px] overflow-hidden">
        {HOW_WE_WORK_STEPS.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className="absolute inset-0 bg-ice"
            style={{ zIndex: i + 1 }}
          >
            <div className="absolute top-0 left-10 h-[124px] w-[1840px]">
              <span className="text-wordmark absolute top-0 left-0">{step.title}</span>
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-espresso/40" />
              <div className="absolute top-0 right-[468px] w-[335px]">
                <p className="text-heading-two">{step.subtitle}</p>
                <p className="text-body-copy mt-[10px] text-espresso/70">{step.description}</p>
              </div>
            </div>
            <span className="absolute bottom-0 left-0 h-px w-full bg-espresso/30" />
          </div>
        ))}
      </div>

      <p className="text-footnote absolute top-[1228px] left-10 w-[260px] text-espresso/70">
        from your first request to your key.
        <br />
        we handle everything.
      </p>

      <GetAdviceButton className="absolute top-[1234px] left-[1413px] w-[467px]" />
    </section>
  )
}
