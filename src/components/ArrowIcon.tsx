import type { CSSProperties } from 'react'

interface ArrowIconProps {
  className?: string
  style?: CSSProperties
}

export function ArrowIcon({ className, style }: ArrowIconProps) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M0.5 6H19M19 6L14 1M19 6L14 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
