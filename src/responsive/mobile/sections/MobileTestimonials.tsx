import { useRef, useState } from 'react'

import { LazyVideo } from '../components/LazyVideo'
import { MobileSlider } from '../components/MobileSlider'
import { Pagination } from '../components/Pagination'
import { SectionLabel } from '../components/SectionLabel'
import { TESTIMONIAL_STATES } from '../../../data/testimonials'
import { useMobileReveal } from '../hooks/useMobileReveal'
import { canAutoplayVideo } from '../hooks/useSlideVideo'
import { useInView, usePageVisible } from '../hooks/useInView'

const BASE_URL = import.meta.env.BASE_URL

/* First frame of each review video (generated from the existing mp4s). */
const POSTERS = [1, 2, 3].map(
  (n) => `${BASE_URL}images/mobile/review-${n}-poster.webp`,
)

export function MobileTestimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  useMobileReveal(sectionRef)

  const inView = useInView(sectionRef, 0.25)
  const pageVisible = usePageVisible()
  const allowed = canAutoplayVideo()

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Testimonials"
      className="m-sec m-sec--gap m-tst"
    >
      <SectionLabel
        lines={[
          'Words from those who found their villa',
          'feedback',
          'A place they now call home.',
        ]}
      />

      <h2 className="m-big m-tst__title" data-reveal>
        Review
      </h2>

      <MobileSlider
        label="Testimonials"
        className="m-tst__slider"
        index={index}
        onIndexChange={setIndex}
      >
        {TESTIMONIAL_STATES.map((state, i) => (
          <div key={state.reviewerName}>
            <div className="m-tst__media">
              <LazyVideo
                src={state.video}
                poster={POSTERS[i]}
                play={allowed && inView && pageVisible && i === index}
              />
            </div>

            <div className="m-tst__text">
              <p className="m-t16m m-tst__name">{state.reviewerName}</p>
              <p className="m-t16 m-tst__role">{state.reviewerRole}</p>
              <p className="m-t16 m-tst__review">{state.reviewText}</p>
              <p className="m-t16 m-tst__loc">{state.villaLocation}</p>
            </div>

            <div className="m-tst__pag">
              <Pagination
                index={i}
                total={TESTIMONIAL_STATES.length}
                darkNext={i === 0}
              />
            </div>
          </div>
        ))}
      </MobileSlider>

      <p className="m-foot">
        they found their place.
        <br />
        now it’s your turn.
      </p>
    </section>
  )
}
