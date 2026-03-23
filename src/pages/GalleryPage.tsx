import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { GallerySnapshots } from '../components/GallerySnapshots'
import { SiteFooter } from '../components/sections/SiteFooter'

export default function GalleryPage() {
  return (
    <main
      id="main-content"
      className="page-shell page-shell--studio gallery-page pb-28 sm:pb-32"
    >
      <nav className="gallery-page__nav" aria-label="Gallery">
        <Link className="gallery-page__back" to="/">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          Home
        </Link>
      </nav>

      <header className="gallery-page__masthead">
        <h1 className="gallery-page__title">Gallery</h1>
        <p className="gallery-page__intro">
          Snapshots from different parts of each site — open case study for the full
          story and live preview.
        </p>
        <Link className="gallery-page__works-link" to="/works">
          View all works
          <span aria-hidden="true"> →</span>
        </Link>
      </header>

      <section className="gallery-page__section" aria-label="Project snapshots">
        <GallerySnapshots />
      </section>

      <SiteFooter />
      <div className="page-end-spacer" aria-hidden="true" />
    </main>
  )
}
