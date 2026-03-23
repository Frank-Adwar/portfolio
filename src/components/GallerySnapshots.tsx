import { Link } from 'react-router-dom'
import { works } from '../data/works'

export function GallerySnapshots() {
  return (
    <div className="gallery-snaps">
      {works.map((w) => (
        <section
          key={w.slug}
          className="gallery-snaps__work"
          aria-labelledby={`gallery-work-${w.slug}`}
        >
          <div className="gallery-snaps__head">
            <h2 id={`gallery-work-${w.slug}`} className="gallery-snaps__title">
              {w.title}
            </h2>
            <p className="gallery-snaps__meta">{w.category}</p>
            <Link className="gallery-snaps__case" to={`/works/${w.slug}`}>
              Case study
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <ul className="gallery-snaps__grid" role="list">
            {w.gallerySnapshots.map((snap, i) => (
              <li key={`${w.slug}-${i}`} className="gallery-snaps__item">
                <Link
                  className="gallery-snaps__card"
                  to={`/works/${w.slug}`}
                  aria-label={`${w.title}: ${snap.label}`}
                >
                  <div className="gallery-snaps__frame">
                    <img
                      className="gallery-snaps__img"
                      src={snap.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="gallery-snaps__label">{snap.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
