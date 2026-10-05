import { useRef } from 'react'

import { useSlideVideo } from '../hooks/useSlideVideo'

interface LazyVideoProps {
  src: string
  poster: string
  play: boolean
}

/*
 * Decorative looping video (no controls, as in the Figma).
 * preload="none": nothing downloads until the slide first plays.
 */
export function LazyVideo({ src, poster, play }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useSlideVideo(ref, src, play)

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
