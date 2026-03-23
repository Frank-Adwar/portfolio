import { useLocation, useNavigate } from 'react-router-dom'
import { type PrimaryNavKey, scrollToSection } from '../hooks/useActiveSection'

const items: { key: PrimaryNavKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'works', label: 'Works' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'contact', label: 'Get in touch' },
]

type Props = {
  active: PrimaryNavKey
}

export function SideNav({ active }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const onHomePath = location.pathname === '/'

  const go = (key: PrimaryNavKey) => {
    if (key === 'works') {
      navigate('/works')
      return
    }
    if (key === 'contact') {
      navigate('/contact')
      return
    }
    if (key === 'gallery') {
      navigate('/gallery')
      return
    }
    if (key === 'home') {
      if (onHomePath) {
        scrollToSection('home')
        return
      }
      navigate('/')
      return
    }
  }

  return (
    <aside className="side-nav" aria-label="Site">
      <nav className="side-nav__nav" aria-label="Primary">
        <ul className="side-nav__list" role="list">
          {items.map(({ key, label }) => {
            const isActive = active === key
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => go(key)}
                  className={`side-nav__btn${isActive ? ' side-nav__btn--active' : ''}${key === 'contact' ? ' side-nav__btn--multiline' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
