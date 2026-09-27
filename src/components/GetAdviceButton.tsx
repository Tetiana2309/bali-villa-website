import { ArrowIcon } from './ArrowIcon'

interface GetAdviceButtonProps {
  className?: string
  label?: string
}

/**
 * The recurring "Get advice" CTA. Links (plain anchor jump, no smooth-scroll
 * animation for this static-fidelity pass) to the Contacts form.
 */
export function GetAdviceButton({ className = '', label = 'Get advice' }: GetAdviceButtonProps) {
  return (
    <a href="#contact-form" className={`group flex w-full flex-col gap-1.5 text-left ${className}`}>
      <span className="h-px w-full bg-espresso" />
      <span className="flex items-center justify-between">
        <span className="text-button-label">{label}</span>
        <ArrowIcon className="text-espresso transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  )
}
