import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { WorkItem } from '../data/works'

type Props = {
  items: WorkItem[]
}

export function WorkShowcase({ items }: Props) {
  if (items.length === 0) return null

  return (
    <div className="work-staircase" role="list">
      {items.map((item, index) => (
        <Link
          key={item.id}
          to={`/works/${item.slug}`}
          className="work-stair__link"
          role="listitem"
          aria-label={`${item.title} — open project page`}
          style={{
            marginLeft: `calc(${index} * clamp(1rem, 3.2vw, 2.1rem))`,
          }}
        >
          <article className="work-stair__card">
            <div className="work-stair__row">
              <header className="work-stair__head">
                <h3 className="work-stair__title">{item.title}</h3>
                {item.description ? (
                  <p className="work-stair__meta">{item.description}</p>
                ) : null}
              </header>
              <span className="work-stair__cta-group">
                <span className="work-stair__open">View project</span>
                <span className="work-stair__cta" aria-hidden>
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </span>
            </div>
            <div className="work-stair__frame" aria-hidden>
              <div className="work-stair__frame-inner" />
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
