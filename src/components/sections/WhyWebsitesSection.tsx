import {
  forwardRef,
  useEffect,
  useState,
} from 'react'
import type { RefObject } from 'react'
import { easeOutQuint } from '../../hooks/useSectionScrollProgress'

/** Rows top → bottom: 1 · 2 · 3 · 2 · 2 (pyramid silhouette, widest near the base). */
const SKILLS_PYRAMID: string[][] = [
  ['Graphic design & branding'],
  ['UI / UX & visual design', 'Figma → production layouts'],
  ['React · TypeScript', 'Next.js · Vite', 'CSS systems & responsive'],
  ['Android & iOS apps', 'Native & cross-platform mobile'],
  ['Performance & accessibility', 'SEO foundations'],
]

const WEBSITE_TYPES: {
  roman: string
  label: string
  description: string
}[] = [
  {
    roman: 'I',
    label: 'Portfolio websites',
    description:
      'A calm place to show how you think and what you have made—so the right clients recognize you before they ever email.',
  },
  {
    roman: 'II',
    label: 'E-commerce websites',
    description:
      'Browse, trust, checkout—your products deserve a storefront that feels as serious as what you sell.',
  },
  {
    roman: 'III',
    label: 'Business websites',
    description:
      'Services, proof, and contact in one story—so locals and professionals choose you with confidence.',
  },
  {
    roman: 'IV',
    label: 'Organizational websites',
    description:
      'Members, donors, and partners find clarity here—programs and impact, explained without clutter.',
  },
  {
    roman: 'V',
    label: 'Landing & marketing sites',
    description:
      'One offer, one action—built for launches and ads so attention turns into sign-ups or sales.',
  },
  {
    roman: 'VI',
    label: 'Custom builds & redesigns',
    description:
      'From blank slate or tired site to something you are proud to share—migration, speed, and SEO without drama.',
  },
]

type Props = {
  progress: number
  lineEndRef: RefObject<HTMLDivElement | null>
}

export const WhyWebsitesSection = forwardRef<HTMLElement, Props>(
  function WhyWebsitesSection({ progress, lineEndRef }, ref) {
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const sync = () => setReduceMotion(mq.matches)
      sync()
      mq.addEventListener('change', sync)
      return () => mq.removeEventListener('change', sync)
    }, [])

    const p = reduceMotion ? 1 : progress
    const listOpacity = easeOutQuint(
      Math.max(0, Math.min(1, (p - 0.06) / 0.28)),
    )

    return (
      <section
        ref={ref}
        id="why-websites"
        className="why-web why-web--home"
        aria-labelledby="why-web-heading"
      >
        <div className="why-web__sticky">
          <div className="why-web__stage">
            <aside
              className="why-web__aside"
              aria-labelledby="why-aside-heading"
              style={{ opacity: reduceMotion ? 1 : 0.35 + listOpacity * 0.65 }}
            >
              <div className="why-web__aside-inner">
                <span className="why-web__aside-watermark" aria-hidden="true">
                  02
                </span>
                <div className="why-web__aside-frame">
                  <p id="why-aside-heading" className="why-web__aside-kicker">
                    Skill set
                  </p>
                  <div className="why-web__aside-skills why-web__aside-skills--pyramid">
                    {SKILLS_PYRAMID.map((row, rowIndex) => (
                      <ul
                        key={rowIndex}
                        className="why-web__aside-skills-row"
                        role="list"
                      >
                        {row.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    ))}
                  </div>
                  <p className="why-web__aside-foot">
                    Frank Adwar — web &amp; mobile design &amp; development
                  </p>
                </div>
              </div>
            </aside>
            <div className="why-web__column">
              <header className="why-web__header">
                <p className="why-web__eyebrow">Why a website</p>
                <h2 id="why-web-heading" className="why-web__title">
                  The one place online that is truly yours
                </h2>
                <p className="why-web__lede">
                  Social profiles disappear into feeds. A website stays—clear,
                  findable, and built to turn curiosity into trust and trust into
                  action.
                </p>
              </header>

              <div
                className="why-web__body"
                style={{ opacity: reduceMotion ? 1 : listOpacity }}
              >
                <p className="why-web__text">
                  For a business, a site is how you show up when someone searches
                  your name at midnight, compares you to a competitor, or decides
                  whether to walk through your door. It answers the quiet
                  question: <em>Are you real? Are you serious? Can I rely on you?</em>
                </p>
                <p className="why-web__text">
                  It is open around the clock—your story, your proof, your offer—
                  without you repeating yourself. That is not vanity; it is leverage.
                  The feeling you want is simple: confidence when someone asks for
                  your link, and relief knowing you are not invisible online.
                </p>
                <p className="why-web__text why-web__text--emphasis">
                  Below are the kinds of sites I craft—each shaped so the right
                  people feel invited, informed, and ready to take the next step.
                </p>

                <h3 className="why-web__subhead">Websites I build</h3>
                <ol className="why-web__list" role="list">
                  {WEBSITE_TYPES.map((item) => (
                    <li key={item.roman} className="why-web__list-item">
                      <details className="why-web__details">
                        <summary className="why-web__summary">
                          <span className="why-web__roman" aria-hidden="true">
                            {item.roman}.
                          </span>
                          <span className="why-web__label">{item.label}</span>
                        </summary>
                        <p className="why-web__details-text">
                          {item.description}
                        </p>
                      </details>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                ref={lineEndRef}
                className="why-web__line-end"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>
    )
  },
)
