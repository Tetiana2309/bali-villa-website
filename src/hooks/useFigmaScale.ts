import { useEffect, useState } from 'react'

export const FIGMA_CANVAS_WIDTH = 1920

/**
 * The Figma desktop frame is laid out at a fixed 1920px canvas with
 * absolutely-positioned children. Scaling that canvas as a whole (rather
 * than re-deriving a flex/grid layout) is what lets every section keep the
 * exact spacing, alignment and proportions from the approved design.
 */
export function useFigmaScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      setScale(window.innerWidth / FIGMA_CANVAS_WIDTH)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return scale
}
