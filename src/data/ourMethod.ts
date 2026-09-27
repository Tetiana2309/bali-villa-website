export interface OurMethodState {
  image: string
  title: string
  stat: string
  subtitle: string
  description: string
  supportingText: [string, string]
}

export const OUR_METHOD_STATES: OurMethodState[] = [
  {
    image: '/images/our-method-image-1.webp',
    title: 'Our Method',
    stat: '12 years',
    subtitle: 'Of Impeccable Reputation',
    description:
      "we don't delegate trust. every step is personally led — start to finish.",
    supportingText: [
      "we don't follow rigid stages.",
      'we move at your pace.',
    ],
  },
  {
    image: '/images/our-method-image-2.webp',
    title: 'Our Delivery',
    stat: '200+',
    subtitle: 'Villas Handed Over',
    description:
      'we handle every step — from concept to keys.',
    supportingText: [
      "we don’t just build villas.",
      'we deliver them complete.',
    ],
  },
  {
    image: '/images/our-method-image-3.webp',
    title: 'We Handle It',
    stat: '3 pros',
    subtitle: 'One Team For Every Deal',
    description:
      'a lawyer, a manager, and an analyst — ready to act as yours from day one.',
    supportingText: [
      "you don’t coordinate people.",
      'you focus on decisions.',
    ],
  },
]