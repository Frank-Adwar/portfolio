import { Lightbulb } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

type Props = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <Lightbulb
        size={20}
        strokeWidth={1.75}
        className={isDark ? 'theme-toggle-icon' : 'theme-toggle-icon theme-toggle-icon--on'}
      />
    </button>
  )
}
