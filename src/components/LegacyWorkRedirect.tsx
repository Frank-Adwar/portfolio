import { Navigate, useParams } from 'react-router-dom'

/** Old `/work/:slug` URLs → `/works/:slug` */
export function LegacyWorkRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/works/${slug}`} replace />
}
