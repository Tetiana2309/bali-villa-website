import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { HOW_WE_WORK_STEPS } from '../data/howWeWork'

const STEP_TOP_OFFSETS = [0, 264, 528, 792]
const STEP_HEIGHT = 184

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      aria-label="How We Work"
      className="relative mt-[220px] h-[1312px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-10 opacity-70"
        left="A Minimum Of Actions On Your Part."
        center="How We Work"
        right="Maximum - From Ours."
      />

      <div className="absolute top-[152px] left-0 h-[976px] w-[1920px]">
        {HOW_WE_WORK_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="absolute left-0 h-[184px] w-[1920px]"
            style={{ top: STEP_TOP_OFFSETS[i] }}
          >
            <div className="absolute top-0 left-10 h-[124px] w-[1840px]">
              <span className="text-wordmark absolute top-0 left-0 opacity-40">
                {step.title}
              </span>

             <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#7B978A]/25" />

              <div className="absolute top-0 right-[133px] w-[335px]">
                <p className="text-heading-two">
                  {step.subtitle}
                </p>

                <p className="text-body-copy mt-[10px] text-espresso/70">
                  {step.description}
                </p>
              </div>
            </div>

            <span
              className="absolute left-0 h-[1.6px] w-full bg-espresso/30"
              style={{ top: STEP_HEIGHT }}
            />
          </div>
        ))}
      </div>

      <p className="text-footnote absolute top-[1228px] left-10 w-[260px] text-gray-light/90">
        from your first request to your key.
        <br />
        we handle everything.
      </p>

      <a
        href="#contact-form"
        className="group absolute top-[1234px] left-[1413px] flex w-[467px] flex-col gap-1.5 text-left"
      >
        <span className="h-[2px] w-full bg-espresso" />

        <span className="flex items-center justify-between">
          <span className="text-button-label">
            Get Advice
          </span>

          <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>
    </section>
  )
}