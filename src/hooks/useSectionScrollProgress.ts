import { useLayoutEffect, useRef, useState } from 'react'

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function easeOutQuint(t: number) {
  return 1 - (1 - t) ** 5
}

/** Share factor: line growth completes in first portion of section scroll (lower = faster fill). */
const PORTRAIT_MOTION_WINDOW = 0.4

/**
 * Eased 0→1 for line + image growth — smooth deceleration toward the end.
 */
export function portraitMotionT(progress: number): number {
  return easeOutQuint(Math.min(1, progress / PORTRAIT_MOTION_WINDOW))
}

/**
 * Progress 0 → 1 while the section is scrolled through the viewport.
 * Section should be taller than 100vh (e.g. min-height: 250vh) for a usable range.
 * useLayoutEffect + rAF retry: forwarded refs are set after the first paint tick.
 */
export function useSectionScrollProgress() {
  const ref = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    let cancelled = false
    let rafId = 0
    let attempts = 0
    let removeListeners: (() => void) | undefined

    const update = () => {
      const el = ref.current
      if (!el || cancelled) return
      const rect = el.getBoundingClientRect()
      const scrollY = window.scrollY
      const sectionTop = scrollY + rect.top
      const h = el.offsetHeight
      const wh = window.innerHeight
      const start = sectionTop - wh
      const end = sectionTop + h - wh
      const raw = (scrollY - start) / (end - start)
      const p = Math.min(1, Math.max(0, raw))
      setProgress(p)
    }

    const tryAttach = () => {
      if (cancelled) return
      const el = ref.current
      if (!el) {
        if (attempts++ < 180) {
          rafId = requestAnimationFrame(tryAttach)
        }
        return
      }
      update()
      window.addEventListener('scroll', update, { passive: true })
      window.addEventListener('resize', update)
      removeListeners = () => {
        window.removeEventListener('scroll', update)
        window.removeEventListener('resize', update)
      }
    }

    tryAttach()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      removeListeners?.()
    }
  }, [])

  return { ref, progress }
}

export { easeOutCubic, easeOutQuint }
