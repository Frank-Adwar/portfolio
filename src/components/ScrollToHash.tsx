import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

type NavState = { scrollTo?: string } | null

/**
 * On route change: scroll to top for every page except home when `state.scrollTo`
 * targets a section (HomePage runs smooth scroll to that id).
 */
export function ScrollToHash() {
  const location = useLocation()

  useLayoutEffect(() => {
    const path = location.pathname
    const scrollTo = (location.state as NavState)?.scrollTo

    if (path === '/') {
      if (scrollTo) return
      window.scrollTo(0, 0)
      return
    }

    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- omit location.state so clearing scroll intent does not snap to top on home
  }, [location.pathname, location.key])

  return null
}
