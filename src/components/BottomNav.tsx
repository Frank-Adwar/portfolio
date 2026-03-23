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

export function BottomNav({ active }: Props) {
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
    <nav aria-label="Primary" className="bottom-nav">
      <div className="bottom-nav__shell">
        {items.map(({ key, label }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => go(key)}
              className={`bottom-nav__btn${isActive ? ' bottom-nav__btn--active' : ''}`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
