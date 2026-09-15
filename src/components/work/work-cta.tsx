import { ButtonLink } from "@/components/ui/button-link";
import { workPage } from "@/content/work";

export function WorkCta() {
  return (
    <section className="work-cta py-section" data-surface="dark" aria-labelledby="work-cta-heading">
      <div className="site-container">
        <h2 id="work-cta-heading">{workPage.cta.heading}</h2>
        <div className="work-cta__bottom"><p>{workPage.cta.body}</p><ButtonLink href={workPage.cta.href}>{workPage.cta.label}</ButtonLink></div>
      </div>
    </section>
  );
}
