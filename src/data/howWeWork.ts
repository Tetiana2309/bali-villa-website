export interface HowWeWorkStep {
  title: string
  subtitle: string
  description: string
}

/** Verified against the Figma screenshot of "How We Work" (node 71:298). */
export const HOW_WE_WORK_STEPS: HowWeWorkStep[] = [
  {
    title: 'Inquiry',
    subtitle: 'You Leave A Short Request',
    description:
      'just a short message or form — that’s all it takes. no calls, no hassle. one step from you, and we handle the rest.',
  },
  {
    title: 'Selection',
    subtitle: 'We Shortlist Only What Suits You',
    description:
      'just 2–3 villas that truly fit — no guessing, no noise. only what matches your style and pace.',
  },
  {
    title: 'Showing',
    subtitle: 'Viewings — Only What Matters',
    description:
      'online, 3d, or in person — view how and when it suits you. no wasted trips. we filter. you choose.',
  },
  {
    title: 'Closing',
    subtitle: 'The Deal . Smooth And Precise',
    description:
      'we handle all the formalities — you just open the door. from documents to handover, it’s all under control.',
  },
]
