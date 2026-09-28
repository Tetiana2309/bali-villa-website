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
    if (index >= OUR_METHOD_STATES.length - 1) return

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
      .call(() => {
        setIndex((current) => current + 1)
      })
      .set(cardRef.current, { y: -12 })
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
  }

  const goToPrevious = () => {
    if (isAnimating.current) return
    if (index <= 0) return

    isAnimating.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
      },
    })

    tl.to(cardRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.45,
      ease: 'power2.in',
    })
      .call(() => {
        setIndex((current) => current - 1)
      })
      .set(cardRef.current, { y: 12 })
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
      <div className="absolute top-10 left-0 w-[1920px] opacity-70">
        <span className="text-heading-two absolute top-0 left-10">
          Facts That Speak For Us
        </span>

        <span className="text-heading-two absolute top-0 left-[1413px]">
          About Us
        </span>

        <span className="text-heading-two absolute top-0 right-10">
          We Do Not Promise, We Deliver
        </span>

        <span className="absolute top-[31.6px] left-0 h-[1.6px] w-full bg-espresso" />
      </div>

      <div ref={cardRef} className="absolute inset-0">
        <h2 className="text-card-heading absolute top-[153px] left-10 m-0 w-[544px] opacity-40">
          {state.title}
        </h2>

        <p className="text-footnote absolute top-[867px] left-10 w-[216px] text-gray-light/90">
          {state.supportingText[0]}
          <br />
          {state.supportingText[1]}
        </p>

        <div className="absolute top-[153px] left-[822px] w-[290px]">
          <span className="text-stat-accent block">
            {state.stat}
          </span>

          <p className="text-heading-two mt-[10px]">
            {state.subtitle}
          </p>

          <p className="text-body-copy mt-[10px] text-espresso/70">
            {state.description}
          </p>
        </div>

        <img
          src={state.image}
          alt={`${state.title} — ${state.stat}`}
          className="absolute top-[79px] left-[1415px] h-[873px] w-[505px] object-cover"
        />
      </div>

      <a
        href="#contact-form"
        className="group absolute top-[872px] left-[828px] flex w-[290px] flex-col gap-1.5 text-left"
      >
        <span className="h-[2px] w-full bg-espresso" />

        <span className="flex items-center justify-between">
          <span className="text-button-label">
            Get Advice
          </span>

          <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </a>

      <div className="absolute top-[374px] left-[822px] w-[132px]">
        {index === 0 && (
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-two">
              1/
              <span className="opacity-45">
                {OUR_METHOD_STATES.length}
              </span>
            </span>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next method highlight"
              className="group text-espresso/45"
            >
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {index === 1 && (
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Show previous method highlight"
              className="group text-espresso/45"
            >
              <ArrowIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            <span className="text-heading-two">
              2/
              <span className="opacity-45">
                {OUR_METHOD_STATES.length}
              </span>
            </span>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next method highlight"
              className="group text-espresso/45"
            >
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {index === 2 && (
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Show previous method highlight"
              className="group text-espresso/45"
            >
              <ArrowIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            <span className="text-heading-two">
              3/
              <span className="opacity-45">
                {OUR_METHOD_STATES.length}
              </span>
            </span>
          </div>
        )}
      </div>
    </section>
  )
}