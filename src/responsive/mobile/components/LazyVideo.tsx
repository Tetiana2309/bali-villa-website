import { useRef } from 'react'

import { useSlideVideo } from '../hooks/useSlideVideo'

interface LazyVideoProps {
  src: string
  poster: string
  play: boolean
}

/*
 * Decorative looping video.
 *
 * iPhone / Safari safe:
 * - src is always attached
 * - metadata can preload
 * - actual playback is still controlled by useSlideVideo
 */
export function LazyVideo({
  src,
  poster,
  play,
}: LazyVideoProps) {
  const ref =
    useRef<HTMLVideoElement>(null)

  useSlideVideo(
    ref,
    src,
    play,
  )

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
