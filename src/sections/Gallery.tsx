import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { GALLERY_STATES } from '../data/gallery'

const STATE_SCROLL_DISTANCE = 900

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(
    () => {
      const layers = layerRefs.current.filter((el): el is HTMLDivElement => el !== null)
      if (layers.length < 2) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.set(layers[0], { opacity: 1 })
      gsap.set(layers.slice(1), { opacity: 0 })

      if (prefersReducedMotion) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(layers.length - 1) * STATE_SCROLL_DISTANCE}`,
          scrub: 1,
          pin: true,
        },
      })

      layers.slice(0, -1).forEach((layer, i) => {
        tl.to(layer, { opacity: 0, duration: 1, ease: 'power1.inOut' }, i)
        tl.to(layers[i + 1], { opacity: 1, duration: 1, ease: 'power1.inOut' }, i)
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Gallery"
      className="relative h-[1080px] w-[1920px] overflow-hidden bg-espresso"
    >
      <SectionHeader
        className="top-10"
        left="They Live Differently Here"
        center="gallery"
        right='Just One Feeling: "My Home"'
      />

      {/*
        Figma's "Villa Info" frame (node 71:358) resolved with no children via
        the design tool (likely an unexpanded component instance), so the
        exact pixel coordinates for the villa name / location / specs / description
        block below are approximated from the section screenshot rather than
        taken from Figma metadata directly, unlike the rest of this section.
      */}
      <div className="absolute top-[100px] left-0 h-[980px] w-[1920px]">
        {GALLERY_STATES.map((state, i) => (
          <div
            key={state.title}
            ref={(el) => {
              layerRefs.current[i] = el
            }}
            className="absolute inset-0"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={state.video}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute bottom-[36px] left-10 flex flex-col gap-[10px]">
              <h3 className="text-card-heading m-0 text-white">{state.title}</h3>
              <p className="text-footnote text-white/80">{state.location}</p>
            </div>

            <div className="absolute bottom-[36px] left-[950px] flex w-[380px] flex-col gap-[18px]">
              <p className="text-body-copy text-white">{state.specs}</p>
              <p className="text-body-copy text-white/85">{state.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
