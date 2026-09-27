import { ArrowIcon } from '../components/ArrowIcon'
import { NAV_ITEMS } from '../data/site'

interface UtilityLinkProps {
  label: string
  targetId: string
  opacity: number
}

function UtilityLink({ label, targetId, opacity }: UtilityLinkProps) {
  return (
    <a href={targetId} className="flex w-[364px] flex-col text-ice" style={{ opacity }}>
      <span className="h-[2px] w-full bg-ice" />
      <span className="mt-[6px] flex items-center justify-between">
        <span className="text-button-label capitalize">{label}</span>
        <ArrowIcon />
      </span>
    </a>
  )
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative h-[1080px] w-[1920px] overflow-hidden bg-espresso"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-setion.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Legibility scrim over the background video. Figma does not expose an
          exact overlay color/opacity for the Hero background (the frame's
          children were not resolvable via the design tool), so this darkening
          gradient is a necessary implementation assumption, not a Figma value. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="absolute top-10 left-[404px]">
        <span className="text-logo">luc.id</span>
      </div>

      <div className="absolute top-10 right-[404px] flex w-[364px] flex-col gap-[34px]">
        <UtilityLink label="Get Advice" targetId="#contact-form" opacity={1} />
        <UtilityLink label="View Gallery" targetId="#gallery" opacity={0.5} />
      </div>

     <nav
        aria-label="Primary"
        className="absolute top-[589px] right-[404px] w-[110px]"
>
  <ul className="flex flex-col items-start gap-[10px]">
    {NAV_ITEMS.map((item) => (
      <li key={item.href}>
        <a
          href={item.href}
          className="block text-left text-footnote text-ice/70 capitalize"
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

      <h1 className="text-hero-title absolute top-[504px] left-[404px] m-0 w-[997px]">vill.bali</h1>

      <p className="text-footnote absolute bottom-[165px] left-[907px] w-[290px] text-ice/70 lowercase">
        this is not a place to look for housing -<br />
        this is a place to find your home.
      </p>
    </section>
  )
}
