import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { workPage } from "@/content/work";

export function WorkCta() {
  return (
    <Card as="section" surface="lavender" shadow="soft" className="work-cta" aria-labelledby="work-cta-heading">
        <h2 id="work-cta-heading">{workPage.cta.heading}</h2>
        <div className="work-cta__bottom"><p>{workPage.cta.body}</p><ButtonLink href={workPage.cta.href}>{workPage.cta.label}</ButtonLink></div>
    </Card>
  );
}
