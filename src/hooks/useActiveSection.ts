import { useEffect, useState } from 'react'

export const SECTION_IDS = ['home', 'about', 'projects', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

/** Primary rail: Home, Works, Gallery (home projects), Get in touch (/contact). */
export type PrimaryNavKey = 'home' | 'works' | 'gallery' | 'contact'

export function getPrimaryNavActive(
  pathname: string,
  section: SectionId,
): PrimaryNavKey {
  if (pathname === '/contact') {
    return 'contact'
  }
  if (pathname === '/gallery') {
    return 'gallery'
  }
  if (pathname === '/works' || pathname.startsWith('/works/')) {
    return 'works'
  }
  if (pathname === '/' && section === 'projects') {
    return 'gallery'
  }
  if (pathname === '/' && section === 'contact') {
    return 'contact'
  }
  return 'home'
}

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0])

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.28
      let current: SectionId = SECTION_IDS[0]
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= marker) {
          current = id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return active
}

export function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
