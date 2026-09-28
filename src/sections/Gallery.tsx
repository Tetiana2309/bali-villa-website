import { GALLERY_STATES } from '../data/gallery'

export function Gallery() {
  const state = GALLERY_STATES[0]

  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="relative mt-[220px] h-[1080px] w-[1920px] overflow-hidden"
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

      {/* Gallery header — no divider line */}
      <div className="absolute top-[90px] left-0 z-10 w-[1920px]">
        <span className="text-heading-two absolute top-0 left-10 text-[#DDE4EE]/70">
          They Live Differently Here
        </span>

        <span className="text-heading-two absolute top-0 left-[1413px] text-[#DDE4EE]/70">
          Gallery
        </span>

        <span className="text-heading-two absolute top-0 right-10 text-[#DDE4EE]/70">
          Just One Feeling: "My Home"
        </span>
      </div>

      {/* Villa title */}
      <h3 className="absolute top-[694px] left-[40px] z-10 m-0 w-[744px] text-[120px] font-medium leading-[0.9] text-[#DDE4EE]">
        {state.title}
      </h3>

      {/* Location */}
      <p className="text-footnote absolute top-[822px] left-[40px] z-10 text-[#DDE4EE]/70">
        {state.location}
      </p>

      {/* Villa specs */}
      <p className="text-body-copy absolute top-[822px] left-[448px] z-10 w-[316px] text-[#DDE4EE]/70">
        {state.specs}
      </p>

      {/* Description */}
      <p className="text-body-copy absolute top-[911px] left-[448px] z-10 w-[316px] text-[#DDE4EE]/70">
        {state.description}
      </p>
    </section>
  )
}