import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { FAQ_ITEMS, FAQ_DIVIDER_POSITIONS } from '../data/faq'

/**
 * Static-fidelity pass: renders Figma's default FAQ state exactly as
 * captured (item 1 answer at full opacity with its arrow in the active
 * orientation, items 2-5 dimmed to 15% with arrows in the default
 * orientation) with no click interaction or animation for now.
 */
export function FAQ() {
  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative h-[572px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-10"
        left="The Questions We Hear Most Often"
        center="questions"
        right="And The Answers You Actually Need."
      />

      <h2 className="text-wordmark absolute top-[92px] left-10 m-0 w-[309px]">Quick</h2>

      <p className="text-footnote absolute top-[488px] left-10 w-[172px] text-espresso/70">
        frequent questions.
        <br />
        clear answers.
      </p>

      <div className="absolute top-[92px] left-[933px] h-[440px] w-[987px]">
        {FAQ_DIVIDER_POSITIONS.map((y) => (
          <span
            key={y}
            className="absolute left-0 h-[1.5px] w-full bg-espresso/30"
            style={{ top: y }}
          />
        ))}

        {FAQ_ITEMS.map((item, i) => {
          const isActive = i === 0

          return (
            <div
              key={item.question}
              className="absolute left-0 w-[947px]"
              style={{ top: item.top, height: item.height }}
            >
              <div className="flex h-full w-[845px] items-center justify-between gap-10">
                <p className="text-heading-two w-[348px] shrink-0">{item.question}</p>
                <p className="text-body-copy w-[365px]" style={{ opacity: isActive ? 1 : 0.15 }}>
                  {item.answer}
                </p>
              </div>

              <span className="absolute top-1/2 right-[20px] -translate-y-1/2 text-espresso">
                <ArrowIcon style={{ transform: isActive ? 'rotate(-45deg)' : 'rotate(0deg)' }} />
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
