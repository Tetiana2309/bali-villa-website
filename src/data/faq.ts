export interface FaqItem {
  question: string
  answer: string
  /** Row height in px, taken from the Figma "FAQ Item" frames (node 71:390). */
  height: number
  /** Top offset in px within the FAQ list, taken from Figma. */
  top: number
}

/** Verified against the Figma screenshot of "FAQ" / "Quick" (node 71:390). */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Why Don't You Show All The Villas At Once?",
    answer:
      'because most of them are not public. and we show them only to those who can really afford them. to preserve your privacy - and your time.',
    top: 13,
    height: 69,
  },
  {
    question: 'And If None Of The Options Are Suitable?',
    answer: "we simply do not impose. we'll stay in touch until you find the right one.",
    top: 105,
    height: 46,
  },
  {
    question: 'Is It Safe To Make A Deal Through You?',
    answer:
      'yes, it is. every step is accompanied by a lawyer, with the developer and all documents checked. this is not a promise, it is a practice.',
    top: 174,
    height: 69,
  },
  {
    question: 'Is It More Expensive Because Of You?',
    answer:
      'no, it is not. the price of the villa does not change, but you do not spend extra hours and do not take risks with "random" transactions.',
    top: 266,
    height: 69,
  },
  {
    question: 'Why Leave A Contact?',
    answer:
      'so that we don\'t guess - but really choose for you. no cold calls. no "sales pitch". just a request - a selection of villas - the decision is yours.',
    top: 358,
    height: 69,
  },
]

export const FAQ_DIVIDER_POSITIONS = [0, 92, 161, 253, 345, 437]
