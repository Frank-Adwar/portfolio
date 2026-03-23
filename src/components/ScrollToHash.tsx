import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

type NavState = { scrollTo?: string } | null

/**
 * No hash auto-scroll. `/works` and `/works/:slug` → top; `/` → top unless state.scrollTo.
 */
export function ScrollToHash() {
  const location = useLocation()

  useLayoutEffect(() => {
    const path = location.pathname
    if (path.startsWith('/works')) {
      window.scrollTo(0, 0)
      return
    }
    if (path.startsWith('/work/')) {
      window.scrollTo(0, 0)
      return
    }
    if (location.pathname !== '/') return
    const scrollTo = (location.state as NavState)?.scrollTo
    if (scrollTo) return
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- omit location.state so clearing scroll intent does not snap to top
  }, [location.pathname, location.key])

  return null
}
