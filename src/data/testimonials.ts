export interface TestimonialState {
  video: string
  reviewerName: string
  reviewerRole: string
  reviewText: string
  villaLocation: string
}

/**
 * State 1 ("Oleksandr") copy is verified against the Figma screenshot of
 * "Testimonials Card One" (node 71:363). States 2–3 were not visible in any
 * inspected frame — Figma MCP hit its rate limit before those alternate
 * testimonial frames could be screenshotted. Marked PLACEHOLDER; replace
 * with the real copy once Figma access is available again.
 */
export const TESTIMONIAL_STATES: TestimonialState[] = [
  {
    video: '/videos/review-1.mp4',
    reviewerName: 'Oleksandr',
    reviewerRole: 'is an entrepreneur, constantly on the road',
    reviewText:
      'i just said: bali, quiet, no neighbors. two days later, i had three options. i sat on the first villa’s terrace — and knew. that was it.',
    villaLocation: 'ubud - 420 m² - private area - villa with terrace overlooking the valley',
  },
  {
    video: '/videos/review-2.mp4',
    // PLACEHOLDER — pending Figma verification
    reviewerName: 'Pending Name',
    // PLACEHOLDER — pending Figma verification
    reviewerRole: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    reviewText: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    villaLocation: 'content pending Figma verification',
  },
  {
    video: '/videos/review-3.mp4',
    // PLACEHOLDER — pending Figma verification
    reviewerName: 'Pending Name',
    // PLACEHOLDER — pending Figma verification
    reviewerRole: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    reviewText: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    villaLocation: 'content pending Figma verification',
  },
]
