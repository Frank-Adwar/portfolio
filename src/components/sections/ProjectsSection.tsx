import { Link } from 'react-router-dom'
import { WorkSlides } from '../WorkSlides'
import { SectionHeading } from '../SectionHeading'

export function ProjectsSection() {
  return (
    <section id="projects" className="section section--projects studio-work">
      <div className="studio-work__row">
        <div className="studio-work__head">
          <SectionHeading variant="simple">Selected work</SectionHeading>
          <p className="studio-work__lede">
            Full list and case studies are on the works page; the gallery shows
            snapshots from different parts of each site.
          </p>
          <div className="studio-work__actions">
            <Link className="works-teaser__link" to="/gallery">
              Open gallery
              <span className="works-teaser__arrow" aria-hidden>
                →
              </span>
            </Link>
            <Link className="works-teaser__link works-teaser__link--secondary" to="/works">
              View all works
              <span className="works-teaser__arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
        <WorkSlides />
      </div>
    </section>
  )
}
