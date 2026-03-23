import { type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, MessageCircle, Phone } from 'lucide-react'
import { SiteFooter } from '../components/sections/SiteFooter'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_URL,
  getWhatsAppComposeUrl,
} from '../data/contact'

export default function GetInTouchPage() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const contact = String(fd.get('contact') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    if (!name || !contact || !message) return

    const text = [
      'Portfolio inquiry',
      '',
      `Name: ${name}`,
      `Contact: ${contact}`,
      '',
      message,
    ].join('\n')

    const url = getWhatsAppComposeUrl(text)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main
      id="main-content"
      className="page-shell page-shell--studio contact-page pb-28 sm:pb-32"
    >
      <nav className="contact-page__nav" aria-label="Contact">
        <Link className="contact-page__back" to="/">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          Home
        </Link>
      </nav>

      <header className="contact-page__masthead">
        <h1 className="contact-page__title">Get in touch</h1>
        <p className="contact-page__intro">
          Add your details below and send — your message is passed through to me in
          one step. You can also reach me directly by email, phone, or WhatsApp.
        </p>
      </header>

      <section
        className="contact-page__details"
        aria-labelledby="contact-details-heading"
      >
        <h2 id="contact-details-heading" className="contact-page__details-title">
          Contact details
        </h2>
        <p className="contact-page__details-lede">
          Prefer to reach out yourself? Use any of these.
        </p>
        <ul className="contact-page__details-list" role="list">
          <li className="contact-page__details-item">
            <span className="contact-page__details-label">Email</span>
            <a
              className="contact-page__details-value contact-page__details-value--link"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              <Mail size={16} strokeWidth={2} aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="contact-page__details-item">
            <span className="contact-page__details-label">Phone</span>
            <a
              className="contact-page__details-value contact-page__details-value--link"
              href={CONTACT_PHONE_HREF}
            >
              <Phone size={16} strokeWidth={2} aria-hidden />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </li>
          <li className="contact-page__details-item">
            <span className="contact-page__details-label">WhatsApp</span>
            <a
              className="contact-page__details-value contact-page__details-value--link contact-page__details-value--wa"
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} strokeWidth={2} aria-hidden />
              Message on WhatsApp
            </a>
          </li>
        </ul>
      </section>

      <section className="contact-page__form-section" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading" className="contact-page__form-title">
          Send a message
        </h2>
        <p className="contact-page__form-lede">
          Your name, how I can reach you, and what you’d like to discuss — then
          tap Send.
        </p>
        <form className="contact-page__form" onSubmit={onSubmit} noValidate>
          <label className="contact-page__label contact-page__label--minimal" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="contact-page__input contact-page__input--minimal"
            autoComplete="name"
            placeholder="Your name"
            required
          />

          <label
            className="contact-page__label contact-page__label--minimal"
            htmlFor="contact-reach"
          >
            Email or phone
          </label>
          <input
            id="contact-reach"
            name="contact"
            type="text"
            className="contact-page__input contact-page__input--minimal"
            autoComplete="on"
            inputMode="text"
            placeholder="you@email.com or phone"
            required
          />

          <label className="contact-page__label contact-page__label--minimal" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            className="contact-page__textarea contact-page__textarea--minimal"
            rows={5}
            placeholder="Project, timeline, anything I should know…"
            required
          />

          <button type="submit" className="contact-page__submit">
            Send
          </button>
          <p className="contact-page__form-note">
            Send opens your messaging app with this note ready — review it there,
            then confirm to deliver. If nothing opens, use email or WhatsApp above.
          </p>
        </form>
      </section>

      <SiteFooter />
      <div className="page-end-spacer" aria-hidden="true" />
    </main>
  )
}
