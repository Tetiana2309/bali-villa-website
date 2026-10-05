import { useRef, useState } from 'react'

import { LazyVideo } from '../components/LazyVideo'
import { MobileSlider } from '../components/MobileSlider'
import { Pagination } from '../components/Pagination'
import { SectionLabel } from '../components/SectionLabel'
import { GALLERY_STATES } from '../../../data/gallery'
import { useMobileReveal } from '../hooks/useMobileReveal'
import { canAutoplayVideo } from '../hooks/useSlideVideo'
import { useInView, usePageVisible } from '../hooks/useInView'

const BASE_URL = import.meta.env.BASE_URL

/* First frame of each gallery video (generated from the existing mp4s). */
const POSTERS = [1, 2, 3].map(
  (n) => `${BASE_URL}images/mobile/gallery-villa-${n}-poster.webp`,
)

const withPeriod = (text: string) => (/[.!?]$/.test(text) ? text : `${text}.`)

export function MobileGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  useMobileReveal(sectionRef)

  const inView = useInView(sectionRef, 0.25)
  const pageVisible = usePageVisible()
  const allowed = canAutoplayVideo()

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Gallery"
      className="m-sec m-sec--gap"
    >
      <SectionLabel
        lines={[
          'They live differently here',
          'gallery',
          'Just one feeling: “my home”',
        ]}
      />

      <MobileSlider
        label="Gallery"
        className="m-gal__slider"
        index={index}
        onIndexChange={setIndex}
      >
        {GALLERY_STATES.map((state, i) => {
          const [first, ...rest] = withPeriod(state.description).split('. ')

          return (
            <div key={state.title}>
              <div className="m-gal__media">
                <LazyVideo
                  src={state.video}
                  poster={POSTERS[i]}
                  play={allowed && inView && pageVisible && i === index}
                />
                <h2 className="m-gal__title">{state.title}</h2>
              </div>

              <div className="m-gal__body m-t16">
                <p>{state.location}</p>
                <p>{state.specs}</p>
                {i === 0 ? (
                  /* Figma card 1 breaks after the first sentence and ends with "see details..." */
                  <p>
                    {first}.<br />
                    {rest.join('. ')}{' '}
                    <span className="m-gal__more">see details...</span>
                  </p>
                ) : (
                  <p>{withPeriod(state.description)}</p>
                )}

                <Pagination index={i} total={GALLERY_STATES.length} />
              </div>
            </div>
          )
        })}
      </MobileSlider>
    </section>
  )
}
