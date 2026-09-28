import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { FAQ_ITEMS, FAQ_DIVIDER_POSITIONS } from '../data/faq'

export function FAQ() {
  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative mt-[220px] h-[620px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-10 opacity-70"
        left="The Questions We Hear Most Often"
        center="Questions"
        right="And The Answers You Actually Need."
      />

      <h2 className="text-wordmark absolute top-[92px] left-10 m-0 w-[309px] opacity-40">
        Quick
      </h2>

      <p className="text-footnote absolute top-[488px] left-10 w-[172px] text-[#999999]/90">
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

        {FAQ_ITEMS.map((item) => (
          <div
            key={item.question}
            className="absolute left-0 w-[947px]"
            style={{ top: item.top, height: item.height }}
          >
            <div className="flex h-full w-[845px] items-center justify-between gap-10">
              <p className="text-heading-two w-[348px] shrink-0">
                {item.question}
              </p>

              <p
                className="text-body-copy w-[365px]"
                style={{ opacity: 0.15 }}
              >
                {item.answer}
              </p>
            </div>

            <span className="absolute top-1/2 right-[0px] -translate-y-1/2 text-espresso">
              <ArrowIcon />
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}