export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section__inner site-footer__inner">
        <p className="site-footer__line">
          © {new Date().getFullYear()}
          <span className="site-footer__sep" aria-hidden="true">
            {' '}
            ·{' '}
          </span>
          Frank Adwar
          <span className="site-footer__sep" aria-hidden="true">
            {' '}
            ·{' '}
          </span>
          <span className="site-footer__note">
            Designed and built for real results
          </span>
        </p>
      </div>
    </footer>
  )
}
