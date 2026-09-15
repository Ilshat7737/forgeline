import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { home } from "@/content/home";

export function ContactBand() {
  return (
    <section className="home-section contact-band" data-surface="dark" aria-labelledby="contact-heading">
      <div className="site-container">
        <SectionLabel>{home.contact.label}</SectionLabel>
        <h2 id="contact-heading" className="contact-band__heading">{home.contact.heading}</h2>
        <div className="contact-band__bottom">
          <p>{home.contact.body}</p>
          <ButtonLink href={home.contact.cta.href}>{home.contact.cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
