import { SectionHeader } from '../components/SectionHeader'
import { GALLERY_STATES } from '../data/gallery'

/**
 * Static-fidelity pass: only the first approved Gallery state (Sundar House)
 * is shown. Figma's own composition uses this section as one pinned,
 * scroll-driven 3-state sequence (see GALLERY_STATES for the other two
 * states and their placeholder-marked copy) — that scroll interaction is
 * intentionally not implemented in this pass.
 */
export function Gallery() {
  const state = GALLERY_STATES[0]

  return (
    <section
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
    </section>
  )
}
