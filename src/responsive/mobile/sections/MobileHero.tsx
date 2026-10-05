import { useRef, useState } from 'react'

import { Cta } from '../components/Cta'

const BASE_URL = import.meta.env.BASE_URL

/*
 * Hero image from the mobile Figma ("img1", 375x392). It is not part of the
 * repository assets and has to be exported from Figma manually.
 */
const HERO_IMAGE = `${BASE_URL}images/mobile/hero-mobile.webp`

interface MobileHeroProps {
  menuOpen: boolean
  onMenuOpen: () => void
  menuButtonRef: React.RefObject<HTMLButtonElement | null>
}

export function MobileHero({
  menuOpen,
  onMenuOpen,
  menuButtonRef,
}: MobileHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      className="m-hero"
    >
      <header className="m-head">
        <span className="m-logo" aria-label="luc.id">
          luc.id
        </span>

        <button
          ref={menuButtonRef}
          type="button"
          className="m-menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onMenuOpen}
        >
          menu
          <i aria-hidden="true" />
        </button>
      </header>

      <div className="m-hero__media">
        {!imageFailed && (
          <img
            src={HERO_IMAGE}
            alt=""
            decoding="async"
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        )}

        <h1 className="m-wordmark" aria-label="vill.bali">
          <span aria-hidden="true" style={{ left: 0 }}>
            vill
          </span>
          <i aria-hidden="true" />
          <span aria-hidden="true" style={{ left: 161 }}>
            bali
          </span>
        </h1>
      </div>

      <div className="m-hero__ctas">
        <Cta
          href="#gallery"
          label="View Gallery"
          className="m-cta--dim"
        />
        <Cta href="#contact-form" label="Get advice" />
      </div>

      <p className="m-foot">
        this is not a place to look for housing - this is a place to find
        your home.
      </p>
    </section>
  )
}
