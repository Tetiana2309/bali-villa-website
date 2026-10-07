import { useRef } from 'react'

import { useSlideVideo } from '../hooks/useSlideVideo'

interface LazyVideoProps {
  src: string
  poster: string
  play: boolean
}

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
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        backgroundColor: 'transparent',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    />
  )
}
