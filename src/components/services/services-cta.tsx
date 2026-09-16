import { ButtonLink } from "@/components/ui/button-link";
import { servicesPage } from "@/content/services";
import { Card } from "@/components/ui/card";

export function ServicesCta() {
  return (
    <Card as="section" className="services-cta" surface="coral" shadow="soft" aria-labelledby="services-cta-heading">
      <h2 id="services-cta-heading">{servicesPage.cta.heading}</h2>
      <div className="services-cta__bottom">
        <p>{servicesPage.cta.body}</p>
        <ButtonLink href={servicesPage.cta.link.href} variant="primary-dark">{servicesPage.cta.link.label}</ButtonLink>
      </div>
    </Card>
  );
}
