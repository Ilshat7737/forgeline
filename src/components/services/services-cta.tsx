import { ButtonLink } from "@/components/ui/button-link";
import { servicesPage } from "@/content/services";

export function ServicesCta() {
  return (
    <section className="services-cta py-section" data-surface="dark" aria-labelledby="services-cta-heading">
      <div className="site-container">
        <h2 id="services-cta-heading" className="font-display text-display-lg font-bold">{servicesPage.cta.heading}</h2>
        <div className="services-cta__bottom">
          <p>{servicesPage.cta.body}</p>
          <ButtonLink href={servicesPage.cta.link.href}>{servicesPage.cta.link.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
