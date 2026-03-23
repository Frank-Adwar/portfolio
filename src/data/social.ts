import { CONTACT_WHATSAPP_URL } from './contact'

/** Social links shown in the hero. WhatsApp only — edit number in `contact.ts`. */
export const socialProfiles = [
  {
    id: 'whatsapp' as const,
    href: CONTACT_WHATSAPP_URL,
    label: 'WhatsApp',
  },
] as const

export type SocialId = (typeof socialProfiles)[number]['id']
