import { type ReactNode } from 'react'
import {
  FIGMA_CANVAS_WIDTH,
  useFigmaScale,
} from '../hooks/useFigmaScale'

interface DesktopCanvasProps {
  children: ReactNode
}

export function DesktopCanvas({
  children,
}: DesktopCanvasProps) {
  const scale = useFigmaScale()

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'clip',
        overflowY: 'visible',
      }}
    >
      <div
        style={{
          width: FIGMA_CANVAS_WIDTH,
          zoom: scale,
        }}
      >
        {children}
      </div>
    </div>
  )
}