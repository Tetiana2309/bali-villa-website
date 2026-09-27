import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
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
      className="relative mt-[220px] h-[1080px] w-[1920px] bg-ice"
    >
      {/*
        Local section header (not the shared SectionHeader component): this
        section's divider thickness (1.6px) and text-to-divider gap (10px)
        are specific to this pass and must not change the shared header used
        by the other sections.
      */}
      <div className="absolute top-10 left-0 w-[1920px]">
        <span className="text-heading-two absolute top-0 left-10">Facts That Speak For Us</span>
        <span className="text-heading-two absolute top-0 left-[1413px]">About Us</span>
        <span className="text-heading-two absolute top-0 right-10">
          We Do Not Promise, We Deliver
        </span>
        <span className="absolute top-[31.6px] left-0 h-[1.6px] w-full bg-espresso" />
      </div>

      <h2 className="text-card-heading absolute top-[153px] left-10 m-0 w-[474px] opacity-40">
        Our Method
      </h2>

      <p className="text-footnote absolute top-[907px] left-10 w-[211px] text-gray-light/90">
        we don't follow rigid stages.
        <br />
        we move at your pace.
      </p>

      {/*
        Local CTA markup (not the shared GetAdviceButton component): this
        section's divider thickness (2px) is specific to this pass and must
        not change the shared CTA used by other sections.
      */}
      <a
        href="#contact-form"
        className="group absolute top-[914px] left-[828px] flex w-[290px] flex-col gap-1.5 text-left"
      >
        <span className="h-[2px] w-full bg-espresso" />
        <span className="flex items-center justify-between">
          <span className="text-button-label">Get advice</span>
          <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>

      <div ref={cardRef} className="absolute inset-0">
        <div className="absolute top-[153px] left-[622px] w-[290px]">
          <span className="text-stat-accent block">{state.stat}</span>
          <p className="text-heading-two mt-[10px]">{state.subtitle}</p>
          <p className="text-body-copy mt-[10px] text-espresso/70">{state.description}</p>
        </div>

        <img
          src={state.image}
          alt={`Our Method — ${state.stat}`}
          className="absolute top-[79px] left-[1415px] h-[873px] w-[505px] object-cover"
        />
      </div>

      <div className="absolute top-[348px] left-[622px] flex w-[132px] items-center justify-between">
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
