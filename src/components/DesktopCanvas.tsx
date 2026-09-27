import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { FIGMA_CANVAS_WIDTH, useFigmaScale } from '../hooks/useFigmaScale'

interface DesktopCanvasProps {
  children: ReactNode
}

/**
 * Hosts every section on a fixed 1920px-wide canvas (the Figma Desktop
 * frame's own coordinate system) and scales it uniformly to the viewport
 * width, so every proportion, spacing and alignment value matches Figma
 * exactly (a uniform scale never distorts relative proportions, unlike a
 * fluid reflow). The outer wrapper clips to the viewport and reserves the
 * scaled height in normal document flow, so the page never grows a
 * horizontal scrollbar even though the inner canvas is wider than most
 * viewports before it is scaled down.
 */
export function DesktopCanvas({ children }: DesktopCanvasProps) {
  const scale = useFigmaScale()
  const innerRef = useRef<HTMLDivElement>(null)
  const [canvasHeight, setCanvasHeight] = useState(0)

  useLayoutEffect(() => {
    if (!innerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasHeight(entry.target.scrollHeight)
      }
    })
    observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: canvasHeight * scale,
        overflow: 'hidden',
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: FIGMA_CANVAS_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
