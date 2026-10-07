import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
} from 'react'

import { NAV_ITEMS } from '../../../data/site'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onNavigate: (href: string) => void
}

export function MobileMenu({
  open,
  onClose,
  onNavigate,
}: MobileMenuProps) {
  const closeRef =
    useRef<HTMLButtonElement>(null)

  const menuRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      closeRef.current?.focus()
    }
  }, [open])

  const handleKeyDown = (
    event:
      KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Escape') {
      onClose()
      return
    }

    if (
      event.key !== 'Tab' ||
      !menuRef.current
    ) {
      return
    }

    const focusable =
      Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a, button',
        ),
      )

    const first =
      focusable[0]

    const last =
      focusable[
        focusable.length - 1
      ]

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault()
      last.focus()
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleLink = (
    event:
      MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault()

    onNavigate(href)
  }

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className="m-menu"
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      onKeyDown={
        handleKeyDown
      }
    >
      <div className="m-menu__head">
        <span
          className="m-logo"
          aria-label="luc.id"
        >
          luc.id
        </span>

        <button
          ref={closeRef}
          type="button"
          className="m-menu__close"
          aria-label="Close menu"
          onClick={
            onClose
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </button>
      </div>

      <nav aria-label="Primary">
        <ul className="m-menu__list">
          {NAV_ITEMS.map(
            (item) => (
              <li
                key={item.href}
                className="m-menu__item"
              >
                <a
                  href={item.href}
                  className="m-menu__link"
                  aria-label={
                    item.label
                  }
                  onClick={(
                    event,
                  ) =>
                    handleLink(
                      event,
                      item.href,
                    )
                  }
                >
                  <span
                    className="m-menu__marker"
                    aria-hidden="true"
                  />

                  <span className="m-menu__link-text">
                    {item.label}
                  </span>
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  )
}