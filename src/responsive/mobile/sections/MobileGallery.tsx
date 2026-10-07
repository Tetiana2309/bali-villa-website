import {
  useRef,
  useState,
} from 'react'

import { LazyVideo } from '../components/LazyVideo'
import { MobileSlider } from '../components/MobileSlider'
import { Pagination } from '../components/Pagination'
import { SectionLabel } from '../components/SectionLabel'

import { GALLERY_STATES } from '../../../data/gallery'

import { useMobileReveal } from '../hooks/useMobileReveal'
import {
  useInView,
  usePageVisible,
} from '../hooks/useInView'

const withPeriod = (
  text: string,
) =>
  /[.!?]$/.test(text)
    ? text
    : `${text}.`

export function MobileGallery() {
  const sectionRef =
    useRef<HTMLElement>(null)

  const [
    index,
    setIndex,
  ] = useState(0)

  useMobileReveal(
    sectionRef,
  )

  const inView =
    useInView(
      sectionRef,
      0.01,
    )

  const pageVisible =
    usePageVisible()

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
        onIndexChange={
          setIndex
        }
      >
        {GALLERY_STATES.map(
          (
            state,
            slideIndex,
          ) => {
            const shouldPlay =
              inView &&
              pageVisible &&
              slideIndex ===
                index

            return (
              <div
                key={
                  state.title
                }
              >
                <div className="m-gal__media">
                  <LazyVideo
                    src={
                      state.video
                    }
                    poster=""
                    play={
                      shouldPlay
                    }
                  />

                  <h2 className="m-gal__title">
                    {
                      state.title
                    }
                  </h2>
                </div>

                <div className="m-gal__body m-t16">
                  <p>
                    {
                      state.location
                    }
                  </p>

                  <p>
                    {
                      state.specs
                    }
                  </p>

                  <p>
                    {withPeriod(
                      state.description,
                    )}
                  </p>

                  <Pagination
                    index={
                      slideIndex
                    }
                    total={
                      GALLERY_STATES.length
                    }
                  />
                </div>
              </div>
            )
          },
        )}
      </MobileSlider>
    </section>
  )
}