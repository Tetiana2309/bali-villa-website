import { SectionHeader } from '../components/SectionHeader'
import { GetAdviceButton } from '../components/GetAdviceButton'
import { HOW_WE_WORK_STEPS } from '../data/howWeWork'

const STEP_TOP_OFFSETS = [0, 264, 528, 792]
const STEP_HEIGHT = 184

export function HowWeWork() {
  return (
    <section
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

      <div className="absolute top-[152px] left-0 h-[976px] w-[1920px]">
        {HOW_WE_WORK_STEPS.map((step, i) => (
          <div
            key={step.title}
            className="absolute left-0 h-[184px] w-[1920px]"
            style={{ top: STEP_TOP_OFFSETS[i] }}
          >
            <div className="absolute top-0 left-10 h-[124px] w-[1840px]">
              <span className="text-wordmark absolute top-0 left-0">{step.title}</span>
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-espresso/40" />
              <div className="absolute top-0 right-[468px] w-[335px]">
                <p className="text-heading-two">{step.subtitle}</p>
                <p className="text-body-copy mt-[10px] text-espresso/70">{step.description}</p>
              </div>
            </div>
            <span
              className="absolute left-0 h-px w-full bg-espresso/30"
              style={{ top: STEP_HEIGHT }}
            />
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
