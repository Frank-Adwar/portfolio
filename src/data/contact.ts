/** Contact details — edit here if your number or email changes. */
export const CONTACT_EMAIL = 'frankianadwar@gmail.com'

/** Local number as you use it (Kenya). */
export const CONTACT_PHONE_DISPLAY = '0790919076'

/**
 * Full international (Kenya +254). Used for `tel:` and WhatsApp — not +44.
 */
export const CONTACT_PHONE_E164 = '+254790919076'

export const CONTACT_PHONE_HREF = 'tel:+254790919076'

/**
 * WhatsApp — digits only after wa.me/ (254 + national mobile without leading 0).
 */
export const CONTACT_WHATSAPP_URL = 'https://wa.me/254790919076'

export const CONTACT_WHATSAPP_PHONE_DIGITS = '254790919076'

/** Opens WhatsApp (app or web) with a pre-filled message. */
export function getWhatsAppComposeUrl(message: string): string {
  return `https://wa.me/${CONTACT_WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(message)}`
}
