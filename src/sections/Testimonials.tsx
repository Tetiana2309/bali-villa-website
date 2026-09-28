import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { ArrowIcon } from '../components/ArrowIcon'
import { TESTIMONIAL_STATES } from '../data/testimonials'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const goToNext = () => {
    if (isAnimating.current) return
    if (index >= TESTIMONIAL_STATES.length - 1) return

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

  const state = TESTIMONIAL_STATES[index]

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="relative mt-[220px] h-[620px] w-[1920px] bg-ice"
    >
      <SectionHeader
        className="top-[80px] opacity-70"
        left="Words From Those Who Found Their Villa"
        center="Feedback"
        right="A Place They Now Call Home."
      />

      <h2 className="text-wordmark absolute top-[132px] left-10 m-0 w-[379px] opacity-40">
        Review
      </h2>

      <p className="text-footnote absolute top-[491px] left-10 w-[172px] text-[#999999]/90">
        they found their place.
        <br />
        now it's your turn.
      </p>

      <div ref={cardRef} className="absolute inset-0">
        <video
          key={state.video}
          className="absolute top-[132px] left-[724px] h-[403px] w-[560px] object-cover"
          src={state.video}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute top-[132px] left-[1413px] w-[340px]">
          <p className="text-heading-two text-[24px] font-medium">
            {state.reviewerName}
          </p>

          <p className="text-footnote mt-[8px] text-[#666666]">
            {state.reviewerRole}
          </p>

          <p className="text-body-copy mt-[18px] text-[#666666]">
            {state.reviewText}
          </p>
        </div>

        <p className="text-body-copy absolute top-[329px] left-[1413px] w-[340px] text-espresso/85">
          {state.villaLocation}
        </p>
      </div>

      <div className="absolute top-[491px] left-[1413px] w-[127px]">
        {index === 0 && (
          <div className="flex w-full items-center justify-between">
            <span className="text-heading-two">
              1/
              <span className="opacity-45">
                {TESTIMONIAL_STATES.length}
              </span>
            </span>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next testimonial"
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
              aria-label="Show previous testimonial"
              className="group text-espresso/45"
            >
              <ArrowIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            <span className="text-heading-two">
              2/
              <span className="opacity-45">
                {TESTIMONIAL_STATES.length}
              </span>
            </span>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next testimonial"
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
              aria-label="Show previous testimonial"
              className="group text-espresso/45"
            >
              <ArrowIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            <span className="text-heading-two">
              3/
              <span className="opacity-45">
                {TESTIMONIAL_STATES.length}
              </span>
            </span>
          </div>
        )}
      </div>
    </section>
  )
}