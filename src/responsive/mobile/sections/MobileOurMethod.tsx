import { useRef, useState } from 'react'

import { Cta } from '../components/Cta'
import { MobileSlider } from '../components/MobileSlider'
import { Pagination } from '../components/Pagination'
import { SectionLabel } from '../components/SectionLabel'
import { OUR_METHOD_STATES } from '../../../data/ourMethod'
import { useMobileReveal } from '../hooks/useMobileReveal'

const BASE_URL = import.meta.env.BASE_URL

/*
 * Portrait originals of the Our Method artwork (restored from the repo
 * history). The Figma cards crop larger source images that are not in the
 * repository, so these are placed to cover the 215x256 frame around the same
 * focal point until the three Figma image fills are exported.
 */
const PHOTOS = [
  { src: `${BASE_URL}images/mobile/our-method-1.webp`, w: 215, h: 373, x: 0, y: 59 },
  { src: `${BASE_URL}images/mobile/our-method-2.webp`, w: 215, h: 368, x: 0, y: 56 },
  { src: `${BASE_URL}images/mobile/our-method-3.webp`, w: 215, h: 368, x: 0, y: 56 },
]

/* Figma sets the first two titles with a double space ("our  method"). */
const DOUBLE_SPACE_TITLE = [true, true, false]

export function MobileOurMethod() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  useMobileReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="our-method"
      aria-label="Our Method"
      className="m-sec"
    >
      <SectionLabel
        lines={[
          'facts that speak for us',
          'about us',
          'we do not Promise, we deliver',
        ]}
      />

      <MobileSlider
        label="Our method"
        index={index}
        onIndexChange={setIndex}
      >
        {OUR_METHOD_STATES.map((state, i) => (
          <div key={state.title} className="m-om__slide">
            <div className="m-om__photo">
              <img
                src={PHOTOS[i].src}
                alt=""
                loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  width: PHOTOS[i].w,
                  height: PHOTOS[i].h,
                  left: -PHOTOS[i].x,
                  top: -PHOTOS[i].y,
                }}
              />
            </div>

            <h2 className="m-big m-om__title">
              {DOUBLE_SPACE_TITLE[i]
                ? state.title.replace(' ', '  ')
                : state.title}
            </h2>

            <div className="m-om__text">
              <p className="m-om__stat">
                {state.stat.replace(/\+$/, ' +')}
              </p>
              <p className="m-t16m m-om__sub">{state.subtitle}</p>
              <p className="m-t16 m-om__desc">{state.description}</p>

              <Pagination index={i} total={OUR_METHOD_STATES.length} />
            </div>

            <Cta href="#contact-form" label="Get advice" />

            <p className="m-foot">
              {state.supportingText[0]}
              <br />
              {state.supportingText[1]}
            </p>
          </div>
        ))}
      </MobileSlider>
    </section>
  )
}
