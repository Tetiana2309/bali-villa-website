import { ArrowIcon } from '../components/ArrowIcon'
import { useScrollToSection } from '../hooks/useScrollToSection'
import { NAV_ITEMS } from '../data/site'

interface UtilityLinkProps {
  label: string
  targetId: string
}

function UtilityLink({ label, targetId }: UtilityLinkProps) {
  const scrollToSection = useScrollToSection()

  return (
    <button
      type="button"
      onClick={() => scrollToSection(targetId)}
      className="group flex w-[240px] flex-col gap-1 text-left text-white"
    >
      <span className="h-px w-full bg-white/70" />
      <span className="flex items-center justify-between py-1">
        <span className="text-heading-two">{label}</span>
        <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  )
}

export function Hero() {
  const scrollToSection = useScrollToSection()

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

      <div className="absolute top-10 left-10">
        <span className="text-logo">luc.id</span>
      </div>

      <div className="absolute top-10 right-10 flex flex-col gap-4">
        <UtilityLink label="Get Advice" targetId="#contact-form" />
        <UtilityLink label="View Gallery" targetId="#gallery" />
      </div>

      <nav aria-label="Primary" className="absolute top-[600px] right-10">
        <ul className="flex flex-col gap-2 text-right">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="text-heading-two text-white/90 transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <h1 className="text-hero-title absolute bottom-[190px] left-10 m-0">vill.bali</h1>

      <p className="text-footnote absolute bottom-[110px] left-1/2 w-[380px] -translate-x-1/2 text-center text-white/90">
        this is not a place to look for housing -<br />
        this is a place to find your home.
      </p>
    </section>
  )
}
