import { type ReactNode } from 'react'

import {
  FIGMA_CANVAS_WIDTH,
  useFigmaScale,
} from '../hooks/useFigmaScale'

interface DesktopCanvasProps {
  children: ReactNode
}

const SCALE_OVERSCAN = 0.0015

export function DesktopCanvas({
  children,
}: DesktopCanvasProps) {
  const scale = useFigmaScale()

  const safeScale =
    scale + SCALE_OVERSCAN

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'visible',
        backgroundColor: '#DDE4EE',
      }}
    >
      <div
        style={{
          width: FIGMA_CANVAS_WIDTH,
          zoom: safeScale,
          display: 'block',
        }}
      >
        {children}
      </div>
    </div>
  )
}