import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {
  getLayoutMode,
  reloadOnLayoutModeChange,
} from './responsive/layoutMode'
import { LazyCompactApp } from './responsive/lazyCompactApp'
import '@fontsource/anton/400.css'
import './index.css'

const layoutMode = getLayoutMode()

reloadOnLayoutModeChange(layoutMode)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {layoutMode === 'compact' ? (
      <Suspense fallback={null}>
        <LazyCompactApp />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
