import { ArrowIcon } from './ArrowIcon'
import { useScrollToSection } from '../hooks/useScrollToSection'

interface GetAdviceButtonProps {
  className?: string
  label?: string
}

/**
 * The recurring "Get advice" CTA (Hero utility link excluded — see
 * HeroUtilityLink). Always scrolls to the Contacts form, per the approved
 * interaction model.
 */
export function GetAdviceButton({ className = '', label = 'Get advice' }: GetAdviceButtonProps) {
  const scrollToSection = useScrollToSection()

  return (
    <button
      type="button"
      onClick={() => scrollToSection('#contact-form')}
      className={`group flex w-full flex-col gap-1.5 text-left ${className}`}
    >
      <span className="h-px w-full bg-espresso" />
      <span className="flex items-center justify-between">
        <span className="text-button-label">{label}</span>
        <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  )
}
