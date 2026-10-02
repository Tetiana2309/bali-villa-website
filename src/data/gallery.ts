export interface GalleryState {
  video: string
  title: string
  location: string
  specs: string
  description: string
}

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
    location: 'canggu, private hillside location',
    specs:
      '480 m² - 3 bedrooms - infinity pool - panoramic terrace - modern tropical interior',
    description:
      'for slow mornings and golden evenings in the treetops. a luminous, refined space open to nature and sky',
  },
  {
    video: '/videos/gallery-villa-3.mp4',
    title: 'Casa Vireya',
    location: 'uluwatu, elevated jungle-view location',
    specs:
      '520 m² - 4 bedrooms - sunken lounge & firepit - seamless indoor-outdoor living - contemporary organic design',
    description:
      'for quiet mornings and golden hours by the water. a refined, open space immersed in light and lush nature',
  },
]
