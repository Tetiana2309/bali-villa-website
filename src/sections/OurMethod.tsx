import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { GetAdviceButton } from '../components/GetAdviceButton'
import { ArrowIcon } from '../components/ArrowIcon'
import { OUR_METHOD_STATES } from '../data/ourMethod'

export function OurMethod() {
  const [index, setIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const goToNext = () => {
    if (isAnimating.current) return
    isAnimating.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
      },
    })

    tl.to(cardRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.45,
      ease: 'power2.in',
    })
      .call(() => setIndex((current) => (current + 1) % OUR_METHOD_STATES.length))
      .set(cardRef.current, { y: -12 })
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
  }

  const state = OUR_METHOD_STATES[index]

  return (
    <section
      id="our-method"
      aria-label="Our Method"
      className="relative h-[991px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-10"
        left="Facts That Speak For Us"
        center="About Us"
        right="We Do Not Promise, We Deliver"
      />

      <h2 className="text-card-heading absolute top-[152px] left-10 m-0 w-[474px]">Our Method</h2>

      <p className="text-footnote absolute bottom-[73px] left-10 w-[211px] text-espresso/70">
        we don't follow rigid stages.
        <br />
        we move at your pace.
      </p>

      <GetAdviceButton className="absolute bottom-[47px] left-[828px] w-[290px]" />

      <div ref={cardRef} className="absolute inset-0">
        <div className="absolute top-[163px] left-[822px] w-[290px]">
          <span className="text-stat-accent block">{state.stat}</span>
          <p className="text-heading-two mt-[10px]">{state.subtitle}</p>
          <p className="text-body-copy mt-[10px] text-espresso/70">{state.description}</p>
        </div>

        <img
          src={state.image}
          alt={`Our Method — ${state.stat}`}
          className="absolute top-[78px] left-[1415px] h-[873px] w-[505px] object-cover"
        />
      </div>

      <div className="absolute top-[371px] left-[822px] flex w-[132px] items-center justify-between">
        <span className="text-heading-two">
          {index + 1}/{OUR_METHOD_STATES.length}
        </span>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Show next method highlight"
          className="group text-espresso"
        >
          <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  )
}
