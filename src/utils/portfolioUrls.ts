/** Query flag so live projects can show “return to portfolio” (see `public/return-to-portfolio.js`). */
export const PORTFOLIO_RETURN_PARAM = 'return'
export const PORTFOLIO_RETURN_VALUE = 'portfolio'

export function appendPortfolioReturnParam(urlString: string): string {
  try {
    const u = new URL(urlString)
    u.searchParams.set(PORTFOLIO_RETURN_PARAM, PORTFOLIO_RETURN_VALUE)
    return u.href
  } catch {
    return urlString
  }
}
