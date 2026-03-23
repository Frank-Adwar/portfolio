import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollLineOverlay } from '../components/ScrollLineOverlay'
import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { HeroSection } from '../components/sections/HeroSection'
import { WhyWebsitesSection } from '../components/sections/WhyWebsitesSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { SiteFooter } from '../components/sections/SiteFooter'
import {
  scrollToSection,
  type SectionId,
} from '../hooks/useActiveSection'
import { useSectionScrollProgress } from '../hooks/useSectionScrollProgress'

export default function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { ref: whyWebRef, progress } = useSectionScrollProgress()
  const heroRuleRef = useRef<HTMLDivElement>(null)
  const whyWebLineEndRef = useRef<HTMLDivElement | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useLayoutEffect(() => {
    const id = location.state?.scrollTo as SectionId | undefined
    if (!id) return
    scrollToSection(id)
    navigate('.', { replace: true, state: null })
  }, [location.state, location.key, navigate])

  return (
    <>
      <ScrollLineOverlay
        ruleRef={heroRuleRef}
        lineEndRef={whyWebLineEndRef}
        progress={progress}
        reduceMotion={reduceMotion}
      />
      <main
        id="main-content"
        className="page-shell page-shell--studio page-shell--home"
      >
        <HeroSection ruleRef={heroRuleRef} />
        <WhyWebsitesSection
          ref={whyWebRef}
          progress={progress}
          lineEndRef={whyWebLineEndRef}
        />
        <div className="studio-mid">
          <AboutSection />
          <ContactSection />
        </div>
        <ProjectsSection />
        <SiteFooter />
        <div className="page-end-spacer" aria-hidden="true" />
      </main>
    </>
  )
}
