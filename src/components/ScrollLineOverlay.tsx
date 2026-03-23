import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { RefObject } from 'react'
import { portraitMotionT } from '../hooks/useSectionScrollProgress'

type Props = {
  ruleRef: RefObject<HTMLDivElement | null>
  /** Bottom of why-websites section — line stops here at progress 1 (does not run into sections below). */
  lineEndRef: RefObject<HTMLElement | null>
  progress: number
  reduceMotion: boolean
}

/** Narrow portrait: horizontal bar instead of vertical rule (tablet+ / landscape keep vertical). */
function useHorizontalScrollLine() {
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const sync = () => {
      const narrow = window.matchMedia('(max-width: 767px)').matches
      const portrait = window.matchMedia('(orientation: portrait)').matches
      setHorizontal(narrow && portrait)
    }
    sync()
    window.addEventListener('resize', sync)
    window.addEventListener('orientationchange', sync)
    return () => {
      window.removeEventListener('resize', sync)
      window.removeEventListener('orientationchange', sync)
    }
  }, [])

  return horizontal
}

/**
 * Fixed overlay: vertical rule aligned to the hero measurement anchor. Height
 * grows with scroll progress from the hero bar to the bottom of the why-websites
 * section. On narrow portrait mobile, a horizontal bar replaces the vertical line.
 */
export function ScrollLineOverlay({
  ruleRef,
  lineEndRef,
  progress,
  reduceMotion,
}: Props) {
  const horizontal = useHorizontalScrollLine()
  const [line, setLine] = useState({
    left: 0,
    top: 0,
    height: 0,
    width: 1,
  })

  const progressRef = useRef(progress)
  const reduceMotionRef = useRef(reduceMotion)
  const rafRef = useRef(0)

  const measureAndSet = useCallback(() => {
    const el = ruleRef.current
    const endEl = lineEndRef.current
    if (!el) return

    const r = el.getBoundingClientRect()
    const p = progressRef.current
    const m = reduceMotionRef.current ? 1 : portraitMotionT(p)
    const baseH = Math.max(r.height, 1)
    const width = 1 + m * 5

    let maxHeight = baseH
    if (endEl) {
      const er = endEl.getBoundingClientRect()
      maxHeight = Math.max(baseH, er.bottom - r.top)
    }

    const height = baseH + m * (maxHeight - baseH)

    setLine({
      left: r.left + r.width / 2,
      top: r.top,
      height,
      width,
    })
  }, [ruleRef, lineEndRef])

  const schedule = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      measureAndSet()
    })
  }, [measureAndSet])

  useLayoutEffect(() => {
    progressRef.current = progress
    reduceMotionRef.current = reduceMotion
    schedule()
  }, [progress, reduceMotion, schedule])

  useEffect(() => {
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [schedule])

  const p = reduceMotion ? 1 : progress
  const m = reduceMotion ? 1 : portraitMotionT(p)

  if (horizontal) {
    return (
      <div
        className="scroll-line-overlay scroll-line-overlay--horizontal"
        aria-hidden="true"
      >
        <div
          className="scroll-line-overlay__fill"
          style={{ width: `${m * 100}%` }}
        />
      </div>
    )
  }

  return (
    <div
      className="scroll-line-overlay"
      aria-hidden="true"
      style={{
        left: line.left,
        top: line.top,
        width: line.width,
        height: line.height,
      }}
    />
  )
}
