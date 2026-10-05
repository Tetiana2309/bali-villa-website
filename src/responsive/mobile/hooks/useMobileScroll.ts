import { createContext, useContext } from 'react'

export interface MobileScroll {
  scrollTo: (target: string) => void
}

export const MobileScrollContext = createContext<MobileScroll>({
  scrollTo: () => {},
})

export function useMobileScroll() {
  return useContext(MobileScrollContext)
}
