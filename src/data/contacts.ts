export const CONTACT_METHODS = ['Telegram', 'Viber', 'WhatsApp', 'Email'] as const
export type ContactMethod = (typeof CONTACT_METHODS)[number]

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: 'Telegram', href: '#' },
  { label: 'WhatsApp', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Viber', href: '#' },
  { label: 'Email', href: '#' },
]

/**
 * The four footer heading lines, form description, address and phone
 * numbers below are PLACEHOLDER copy. Figma's Contacts frame (node 71:427)
 * only exposed generic layer names ("Heading Line 01", "Form Description",
 * "Address", "Phone Number 01/02") for these — no literal text was
 * recoverable via metadata, and Figma MCP hit its rate limit before this
 * section could be screenshotted for a visual read. Replace with the real
 * copy once Figma access is available again.
 */
export const CONTACTS_COPY = {
  headingLines: ['Leave', 'A Request', 'We Will', 'Find A Villa'],
  formDescription: 'leave a contact and we will get back to you',
  address: 'Jl. Sunset Road No.88, Seminyak, Kuta, Badung, Bali 80361, Indonesia',
  phoneNumbers: ['+62 000 000 000', '+62 000 000 001'],
}
