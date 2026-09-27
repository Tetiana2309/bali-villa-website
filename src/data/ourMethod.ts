export interface OurMethodState {
  image: string
  stat: string
  subtitle: string
  description: string
}

/**
 * State 1 copy is verified against the Figma screenshot of "Our Method Card"
 * (node 71:274). States 2–3 reuse the confirmed stat values ("200+", "3 pros")
 * that Figma's own font-usage list reports for this section, but their
 * subtitle/description copy was not visible in any inspected frame — Figma
 * MCP hit its rate limit before those alternate-state frames could be
 * screenshotted. Marked PLACEHOLDER; replace with the real copy once Figma
 * access is available again.
 */
export const OUR_METHOD_STATES: OurMethodState[] = [
  {
    image: '/images/our-method-image-1.webp',
    stat: '12 years',
    subtitle: 'Of Impeccable Reputation',
    description: "we don't delegate trust. every step is personally led — start to finish.",
  },
  {
    image: '/images/our-method-image-2.webp',
    stat: '200+',
    // PLACEHOLDER — pending Figma verification
    subtitle: 'Villas Personally Vetted',
    // PLACEHOLDER — pending Figma verification
    description: 'content pending Figma verification.',
  },
  {
    image: '/images/our-method-image-3.webp',
    stat: '3 pros',
    // PLACEHOLDER — pending Figma verification
    subtitle: 'A Small Team, Fully Accountable',
    // PLACEHOLDER — pending Figma verification
    description: 'content pending Figma verification.',
  },
]
