import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

export type Theme = 'light' | 'dark'

function readTheme(): Theme {
  const fromHtml = document.documentElement.dataset.theme
  if (fromHtml === 'light' || fromHtml === 'dark') return fromHtml
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}
