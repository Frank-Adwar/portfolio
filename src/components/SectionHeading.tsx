import type { ReactNode } from 'react'

type Props = {
  /** Roman numeral — only used when variant is default */
  index?: string
  /** Simple = label only, no bar or index */
  variant?: 'default' | 'simple'
  children: ReactNode
}

export function SectionHeading({
  index = 'I',
  variant = 'default',
  children,
}: Props) {
  if (variant === 'simple') {
    return <h2 className="section-heading section-heading--simple">{children}</h2>
  }

  return (
    <h2 className="section-heading">
      <span className="section-heading-index" aria-hidden="true">
        {index}
      </span>
      <span className="section-heading-text">{children}</span>
    </h2>
  )
}
