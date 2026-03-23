import type { RefObject } from 'react'
import { SocialLinks } from '../SocialLinks'

type Props = {
  ruleRef: RefObject<HTMLDivElement | null>
}

export function HeroSection({ ruleRef }: Props) {
  return (
    <section id="home" className="section section--hero hero-studio">
      <div className="hero-studio__grid">
        <div className="hero-studio__visual">
          <div className="hero-studio__creative">
            <div className="hero-studio__creative-lead">
              <div className="hero-studio__portrait">
                <span className="hero-studio__portrait-halo" aria-hidden="true" />
                <span className="hero-studio__portrait-offset" aria-hidden="true" />
                <div className="hero-studio__avatar-wrap">
                  <img
                    className="hero-studio__avatar"
                    src="/portrait-photo-bw.png"
                    alt="Frank Adwar"
                    width={160}
                    height={160}
                    decoding="async"
                  />
                </div>
                <span
                  className="hero-studio__portrait-badge"
                  aria-hidden="true"
                  title="Available"
                >
                  <span className="hero-studio__portrait-badge-inner" />
                </span>
              </div>
            </div>
            <p className="hero-studio__creative-line hero-studio__creative-line--accent">
              From first sketch to live URL
            </p>
            <ul className="hero-studio__creative-services" aria-label="Services">
              <li>Custom design</li>
              <li>Tailored builds</li>
              <li>Maintenance</li>
            </ul>
            <div className="hero-studio__creative-status">
              <p className="hero-studio__creative-meta">
                <span className="hero-studio__creative-dot" aria-hidden="true" />
                <span className="hero-studio__status-open">Open for projects</span>
                <span className="hero-studio__status-sep" aria-hidden="true">
                  {' '}
                  ·{' '}
                </span>
                <span className="hero-studio__status-reply">
                  I reply within minutes
                </span>
              </p>
              <p className="hero-studio__creative-meta hero-studio__creative-meta--compact">
                <span className="hero-studio__creative-dot" aria-hidden="true" />
                <span className="hero-studio__status-open">Open for collaborations</span>
              </p>
            </div>
          </div>
          {/* Measurement anchor — visible line is ScrollLineOverlay */}
          <div ref={ruleRef} className="hero-studio__rule" aria-hidden="true" />
        </div>
        <div className="hero-studio__copy">
          <p className="hero-studio__kicker">Portfolio</p>
          <h1 className="hero-studio__name">Frank Adwar</h1>
          <p className="hero-studio__tagline">
            I help businesses and individuals launch clean, effective brands and
            websites — custom work tailored to your goals, with maintenance and
            upgrades when you need them.
          </p>
          <p className="hero-studio__role">
            Graphic designer · web design &amp; development
          </p>
          <p className="hero-studio__lede">
            I design and build websites that turn visitors into clients.
          </p>
          <p className="hero-studio__lede">
            From idea to launch — clear process, fast delivery.
          </p>
          <div className="hero-studio__social">
            <SocialLinks variant="wrap" />
          </div>
        </div>
      </div>
    </section>
  )
}
