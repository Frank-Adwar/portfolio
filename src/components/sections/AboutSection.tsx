import { SectionHeading } from '../SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="studio-panel studio-panel--about">
      <SectionHeading variant="simple">About</SectionHeading>
      <p className="studio-panel__text">
        I&apos;m a graphic designer and developer — I design and build websites
        from start to finish, from visual identity and layout through to the
        final live site.
      </p>
      <p className="studio-panel__text">
        I make custom designs tailored to my clients&apos; desires and needs —
        so what we ship fits your brand and your audience, not a one-size-fits-all
        template.
      </p>
      <p className="studio-panel__text">
        I also offer website maintenance and upgrading: keeping your site fast,
        secure, and ready to grow when your business does.
      </p>
      <p className="studio-panel__text">
        My focus is simple: create clean, fast, and easy-to-use websites that
        help your business grow.
      </p>
      <p className="studio-panel__text">
        No unnecessary complexity — just clear communication and solid execution.
      </p>
    </section>
  )
}
