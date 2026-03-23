/**
 * Embed on each deployed project so “Return to portfolio” appears ON the live site
 * when opened from this portfolio (URLs include ?return=portfolio).
 *
 * Add before </body> on the external project:
 *   <script
 *     src="https://YOUR_PRODUCTION_DOMAIN/return-to-portfolio.js"
 *     data-contact-url="https://YOUR_PRODUCTION_DOMAIN/#contact"
 *     defer
 *   ></script>
 */
;(function () {
  var script = document.currentScript
  if (!script) {
    var scripts = document.getElementsByTagName('script')
    script = scripts[scripts.length - 1]
  }
  if (!script) return
  var contactUrl = script.getAttribute('data-contact-url')
  if (!contactUrl) return

  var params
  try {
    params = new URLSearchParams(window.location.search)
  } catch (e) {
    return
  }
  if (params.get('return') !== 'portfolio') return

  if (document.getElementById('portfolio-return-btn')) return

  var a = document.createElement('a')
  a.id = 'portfolio-return-btn'
  a.href = contactUrl
  a.textContent = 'Return to portfolio'
  a.setAttribute('role', 'button')
  a.style.cssText = [
    'position:fixed',
    'bottom:max(1rem, env(safe-area-inset-bottom))',
    'right:max(1rem, env(safe-area-inset-right))',
    'left:auto',
    'z-index:2147483647',
    'display:inline-flex',
    'align-items:center',
    'justify-content:center',
    'gap:0.35rem',
    'padding:0.65rem 1rem',
    'border-radius:8px',
    'border:1px solid rgba(22,163,74,0.55)',
    'background:linear-gradient(135deg,rgba(22,163,74,0.2),rgba(22,163,74,0.08))',
    'color:#0d0d0d',
    'font:700 0.75rem/1.2 system-ui,-apple-system,sans-serif',
    'letter-spacing:0.06em',
    'text-transform:uppercase',
    'text-decoration:none',
    'box-shadow:0 4px 24px -8px rgba(22,163,74,0.45)',
    'cursor:pointer',
  ].join(';')

  a.addEventListener('mouseenter', function () {
    a.style.borderColor = '#16a34a'
    a.style.boxShadow = '0 6px 28px -6px rgba(22,163,74,0.55)'
  })
  a.addEventListener('mouseleave', function () {
    a.style.borderColor = 'rgba(22,163,74,0.55)'
    a.style.boxShadow = '0 4px 24px -8px rgba(22,163,74,0.45)'
  })

  document.body.appendChild(a)
})()
