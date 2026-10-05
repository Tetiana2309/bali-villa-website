import { ArrowIcon } from '../../../components/ArrowIcon'
import { useSliderControl } from '../hooks/useSliderControl'

interface PaginationProps {
  /** Zero-based index of the slide this control belongs to. */
  index: number
  total: number
  className?: string
  /** Figma draws the very first Testimonials arrow in #555 instead of the faded tone. */
  darkNext?: boolean
}

/*
 * Figma "1/3 →", "← 2/3 →", "← 3/3".
 * Arrows only exist where a neighbouring slide exists.
 */
export function Pagination({
  index,
  total,
  className = '',
  darkNext = false,
}: PaginationProps) {
  const { goTo } = useSliderControl()

  const hasPrev = index > 0
  const hasNext = index < total - 1

  return (
    <div
      className={`m-pag ${hasPrev ? '' : 'm-pag--first'} ${className}`}
    >
      {hasPrev && (
        <button
          type="button"
          className="m-pag__arrow m-pag__arrow--prev"
          aria-label="Previous"
          onClick={() => goTo(index - 1)}
        >
          <ArrowIcon />
        </button>
      )}

      <span className="m-pag__count" aria-hidden="true">
        <span>{index + 1}</span>
        <span>/</span>
        <span>{total}</span>
      </span>

      {hasNext && (
        <button
          type="button"
          className={`m-pag__arrow ${darkNext ? 'm-pag__arrow--dark' : ''}`}
          aria-label="Next"
          onClick={() => goTo(index + 1)}
        >
          <ArrowIcon />
        </button>
      )}
    </div>
  )
}
