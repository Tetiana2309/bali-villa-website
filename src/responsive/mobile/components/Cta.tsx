import type { MouseEvent } from 'react'

import { ArrowIcon } from '../../../components/ArrowIcon'
import { useMobileScroll } from '../hooks/useMobileScroll'

interface CtaProps {
  href: string
  label: string
  className?: string
}

/* Figma "кнопка": 2px line, label left, arrow right. */
export function Cta({ href, label, className = '' }: CtaProps) {
  const { scrollTo } = useMobileScroll()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollTo(href)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`m-cta ${className}`}
    >
      <span className="m-cta__row">
        <span>{label}</span>
        <ArrowIcon />
      </span>
    </a>
  )
}
