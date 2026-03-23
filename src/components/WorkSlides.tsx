import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { works } from '../data/works'

const INTERVAL_MS = 4800
const SWIPE_PX = 48

export function WorkSlides() {
  const [index, setIndex] = useState(0)
  const [iframeReady, setIframeReady] = useState<Partial<Record<string, boolean>>>(
    {},
  )
  const touchStartX = useRef<number | null>(null)
  /** Ignore iframe load events from a slide we already left (remount races). */
  const activeSlugRef = useRef<string | null>(works[0]?.slug ?? null)
  const prevIndexRef = useRef<number | null>(null)
  const n = works.length
  const current = works[index]!

  activeSlugRef.current = current.slug

  const go = useCallback((i: number) => {
    setIndex(((i % n) + n) % n)
  }, [n])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [n])

  /** Clear stale “ready” when changing slides only (not on mount — avoids fighting first load / Strict Mode). */
  useEffect(() => {
    if (prevIndexRef.current === null) {
      prevIndexRef.current = index
      return
    }
    if (prevIndexRef.current !== index) {
      prevIndexRef.current = index
      setIframeReady({})
    }
  }, [index])

  const onIframeLoad = useCallback((slug: string) => {
    if (slug !== activeSlugRef.current) return
    setIframeReady((s) => ({ ...s, [slug]: true }))
  }, [])

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start == null) return
    const end = e.changedTouches[0]?.clientX
    if (end == null) return
    const dx = end - start
    if (dx > SWIPE_PX) go(index - 1)
    else if (dx < -SWIPE_PX) go(index + 1)
  }

  return (
    <div
      className="work-slides"
      role="region"
      aria-roledescription="carousel"
      aria-label="Previews of selected projects"
    >
      <div
        className="work-slides__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ul className="work-slides__stack">
          {works.map((w, i) => {
            const active = i === index
            const staticPreview = w.previewMode === 'static'
            const posterHidden =
              active && !staticPreview && iframeReady[w.slug]
            return (
              <li
                key={w.slug}
                className={`work-slides__slide${active ? ' work-slides__slide--active' : ''}`}
                aria-hidden={!active}
              >
                <Link
                  className="work-slides__link"
                  to={`/works/${w.slug}`}
                  tabIndex={active ? 0 : -1}
                >
                  <span className="work-slides__embed">
                    {staticPreview && w.previewSrc ? (
                      <img
                        className="work-slides__hero"
                        src={w.previewSrc}
                        alt=""
                        aria-hidden
                      />
                    ) : staticPreview ? (
                      <span className="work-slides__embed-fallback" aria-hidden />
                    ) : w.previewSrc ? (
                      <img
                        className={`work-slides__poster${posterHidden ? ' work-slides__poster--hide' : ''}`}
                        src={w.previewSrc}
                        alt=""
                        aria-hidden
                      />
                    ) : (
                      <span className="work-slides__embed-fallback" aria-hidden />
                    )}
                    {active && !staticPreview ? (
                      <iframe
                        className="work-slides__iframe"
                        title={`${w.title} — live preview`}
                        src={w.href}
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => onIframeLoad(w.slug)}
                      />
                    ) : null}
                  </span>
                  <span className="work-slides__sr">{w.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="work-slides__meta">
        <p className="work-slides__caption" aria-live="polite">
          <span className="work-slides__title">{current.title}</span>
          <span className="work-slides__cat">{current.category}</span>
        </p>
        <div className="work-slides__dots" role="tablist" aria-label="Choose slide">
          {works.map((w, i) => (
            <button
              key={w.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${w.title}`}
              className={`work-slides__dot${i === index ? ' work-slides__dot--active' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
