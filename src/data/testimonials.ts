export interface TestimonialState {
  video: string
  reviewerName: string
  reviewerRole: string
  reviewText: string
  villaLocation: string
}

export const TESTIMONIAL_STATES: TestimonialState[] = [
  {
    video: '/videos/review-1.mp4',
    reviewerName: 'Oleksandr',
    reviewerRole: 'is an entrepreneur, constantly on the road',
    reviewText:
      'i just said: bali, quiet, no neighbors. two days later, i had three options. i sat on the first villa’s terrace — and knew. that was it.',
    villaLocation:
      'ubud - 420 m² - private area - villa with terrace overlooking the valley',
  },
  {
    video: '/videos/review-2.mp4',
    reviewerName: 'Elena',
    reviewerRole: 'is a marketer, works online',
    reviewText:
      'i said: safety, quiet, school nearby. three days later, we were walking in the garden of the villa, the children were laughing by the pool.',
    villaLocation:
      'changgu, bali - 400 m² - family villa - secured complex near international school',
  },
  {
    video: '/videos/review-3.mp4',
    reviewerName: 'Nikita, Lena',
    reviewerRole: 'both work in tech, remotely',
    reviewText:
      'we said: space to think, space to breathe. by day two, we were working poolside, sunset in sight. it felt like balance.',
    villaLocation:
      'canggu, bali – 410 m² – modern villa – private workspace and garden lounge',
  },
]
