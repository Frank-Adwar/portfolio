import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getWorkBySlug } from '../data/works'
import { SiteFooter } from '../components/sections/SiteFooter'
import { appendPortfolioReturnParam } from '../utils/portfolioUrls'

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const work = getWorkBySlug(slug)

  const liveWithReturn = work ? appendPortfolioReturnParam(work.href) : ''
  const staticPreview = work?.previewMode === 'static'

  if (!work) {
    return (
      <main
        id="main-content"
        className="page-shell page-shell--studio page-shell--work-detail pb-28 sm:pb-32"
      >
        <p className="work-detail__missing">Project not found.</p>
        <Link className="work-detail__back" to="/works">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          Back to works
        </Link>
      </main>
    )
  }

  return (
    <main
      id="main-content"
      className="page-shell page-shell--studio page-shell--work-detail pb-28 sm:pb-32"
    >
      <nav className="work-detail__nav" aria-label="Project">
        <Link className="work-detail__back" to="/" state={{ scrollTo: 'projects' }}>
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          Selected work
        </Link>
      </nav>

      <header className="work-detail__header">
        <p className="work-detail__category">{work.category}</p>
        <h1 className="work-detail__title">{work.title}</h1>
        <p className="work-detail__desc">{work.description}</p>
      </header>

      <div className="work-detail__frame">
        {staticPreview && work.previewSrc ? (
          <img
            className="work-detail__iframe work-detail__hero-shot"
            src={work.previewSrc}
            alt=""
            loading="lazy"
          />
        ) : staticPreview ? (
          <div
            className="work-detail__iframe work-detail__hero-shot work-detail__hero-shot--empty"
            aria-hidden
          />
        ) : (
          <iframe
            className="work-detail__iframe"
            title={`${work.title} — live preview`}
            src={liveWithReturn}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>

      <div className="work-detail__cta-stack">
        <a
          className="work-detail__check-out work-detail__check-out--secondary"
          href={liveWithReturn}
          target="_blank"
          rel="noreferrer noopener"
        >
          Check it out
          <ExternalLink size={16} strokeWidth={2} aria-hidden />
        </a>
        <Link
          className="work-detail__back-portfolio"
          to="/"
          state={{ scrollTo: 'projects' }}
        >
          <ArrowLeft size={18} strokeWidth={2} aria-hidden />
          Back to portfolio
        </Link>
        {staticPreview ? (
          <p className="work-detail__cta-note">
            Hero preview only (no live embed). “Check it out” opens the site in a
            new tab; this page stays here — use <strong>Back to portfolio</strong>{' '}
            when you’re done.
          </p>
        ) : (
          <p className="work-detail__cta-note">
            “Check it out” opens the live site in a new tab. This portfolio page
            stays open — use <strong>Back to portfolio</strong> when you’re done
            exploring.
          </p>
        )}
      </div>

      <SiteFooter />
      <div className="page-end-spacer" aria-hidden="true" />
    </main>
  )
}
