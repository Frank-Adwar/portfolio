import { Link, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'

/**
 * Fixed control on inner routes so visitors always have an obvious way back to
 * the portfolio home (e.g. after opening a live site in another tab).
 */
export function PortfolioHomeFab() {
  const { pathname } = useLocation()
  if (pathname === '/') return null

  return (
    <Link
      className="portfolio-home-fab"
      to="/"
      state={{ scrollTo: 'projects' }}
      aria-label="Back to portfolio home"
    >
      <Home size={18} strokeWidth={2} aria-hidden />
      <span className="portfolio-home-fab__label">Home</span>
    </Link>
  )
}
