interface SectionHeaderProps {
  left: string
  center: string
  right: string
  className?: string
  showDivider?: boolean
  dividerClassName?: string
}

/**
 * The three-column label band that opens every section
 * (Our Method, How We Work, Gallery, Testimonials, FAQ, Contacts),
 * with an optional full-width divider beneath it.
 *
 * Positions are locked to the Figma coordinates:
 * left label at the 40px gutter,
 * center label at a fixed x,
 * right label flush with the 40px right gutter.
 */
export function SectionHeader({
  left,
  center,
  right,
  className = '',
  showDivider = true,
  dividerClassName = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`absolute left-0 h-8 w-[1920px] ${className}`}
    >
      {showDivider && (
        <div
          className={`
            absolute
            bottom-0
            left-0
            h-[1.6px]
            w-full
            bg-[#392919]/70
            ${dividerClassName}
          `}
        />
      )}

      <span className="text-heading-two absolute top-0 left-10">
        {left}
      </span>

      <span className="text-heading-two absolute top-0 left-[1413px]">
        {center}
      </span>

      <span className="text-heading-two absolute top-0 right-10">
        {right}
      </span>
    </div>
  )
}