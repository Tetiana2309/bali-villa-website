export interface GalleryState {
  video: string
  title: string
  location: string
  specs: string
  description: string
}

/**
 * State 1 ("Sundar House") copy is verified against the Figma screenshot of
 * "Gallery — State 01" (node 71:346). States 2–3 titles ("Lunara Villa",
 * "Casa Vireya") are confirmed Figma layer names; their location/specs/
 * description copy was not visible in any inspected frame — Figma MCP hit
 * its rate limit before those alternate-state frames (62:103, 62:121) could
 * be screenshotted. Marked PLACEHOLDER; replace with the real copy once
 * Figma access is available again.
 */
export const GALLERY_STATES: GalleryState[] = [
  {
    video: '/videos/gallery-villa-1.mp4',
    title: 'Sundar House',
    location: 'ubud, private jungle area',
    specs:
      '420 m² - 3 bedrooms - swimming pool - terrace overlooking the valley - designer interior',
    description:
      'for quiet living in the midst of nature. a bright, thoughtfully designed space with character',
  },
  {
    video: '/videos/gallery-villa-2.mp4',
    title: 'Lunara Villa',
    // PLACEHOLDER — pending Figma verification
    location: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    specs: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    description: 'content pending Figma verification',
  },
  {
    video: '/videos/gallery-villa-3.mp4',
    title: 'Casa Vireya',
    // PLACEHOLDER — pending Figma verification
    location: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    specs: 'content pending Figma verification',
    // PLACEHOLDER — pending Figma verification
    description: 'content pending Figma verification',
  },
]
