import { createContext, useContext } from 'react'

export interface SliderControl {
  goTo: (index: number) => void
}

export const SliderControlContext = createContext<SliderControl>({
  goTo: () => {},
})

export function useSliderControl() {
  return useContext(SliderControlContext)
}
