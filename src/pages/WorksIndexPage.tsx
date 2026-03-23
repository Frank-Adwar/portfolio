import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { works } from '../data/works'
import { SiteFooter } from '../components/sections/SiteFooter'

export default function WorksIndexPage() {
  const total = works.length
  const totalStr = String(total).padStart(2, '0')

  return (
    <main
      id="main-content"
      className="page-shell page-shell--studio works-page pb-28 sm:pb-32"
    >
      <header className="works-page__masthead">
        <div className="works-page__masthead-row">
          <h1 className="works-page__title">Works</h1>
          <p className="works-page__range" aria-label={`${total} projects`}>
            <span className="works-page__range-num">01</span>
            <span className="works-page__range-sep">/</span>
            <span className="works-page__range-num">{totalStr}</span>
          </p>
        </div>
        <p className="works-page__intro">
          Selected builds — each opens as its own case study with a live preview.
        </p>
      </header>

      <ol className="works-page__list" start={1}>
        {works.map((item, index) => (
          <li key={item.id} className="works-page__item">
            <Link
              to={`/works/${item.slug}`}
              className="works-page__link"
              aria-label={`${item.title} — open project`}
            >
              <span className="works-page__idx" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="works-page__body">
                <h2 className="works-page__name">{item.title}</h2>
                <p className="works-page__category">{item.category}</p>
                <p className="works-page__excerpt">{item.description}</p>
              </div>
              <span className="works-page__go" aria-hidden>
                <ArrowUpRight size={22} strokeWidth={1.75} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <SiteFooter />
      <div className="page-end-spacer" aria-hidden="true" />
    </main>
  )
}
