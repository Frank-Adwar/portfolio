import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { BottomNav } from './components/BottomNav'
import { SideNav } from './components/SideNav'
import { LegacyWorkRedirect } from './components/LegacyWorkRedirect'
import { ScrollToHash } from './components/ScrollToHash'
import { ThemeToggle } from './components/ThemeToggle'
import HomePage from './pages/HomePage'

const WorksIndexPage = lazy(() => import('./pages/WorksIndexPage'))
const GetInTouchPage = lazy(() => import('./pages/GetInTouchPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const WorkDetailPage = lazy(() => import('./pages/WorkDetailPage'))
import {
  getPrimaryNavActive,
  useActiveSection,
} from './hooks/useActiveSection'
import { useTheme } from './hooks/useTheme'
import './App.css'

function AppShell() {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const activeSection = useActiveSection()
  const primaryNav = getPrimaryNavActive(location.pathname, activeSection)

  return (
    <>
      <ScrollToHash />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ThemeToggle theme={theme} onToggle={toggle} />
      <SideNav active={primaryNav} />
      <Suspense fallback={<div className="route-fallback" aria-hidden />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works" element={<WorksIndexPage />} />
          <Route path="/contact" element={<GetInTouchPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/works/:slug" element={<WorkDetailPage />} />
          <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
        </Routes>
      </Suspense>
      <BottomNav active={primaryNav} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  )
}
