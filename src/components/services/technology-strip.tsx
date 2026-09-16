import { servicesPage } from "@/content/services";
import { Card } from "@/components/ui/card";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function TechnologyStrip() {
  return (
    <Card as="section" className="technology-strip" surface="dark" shadow="soft" aria-labelledby="technology-heading">
      <SectionHeading headingId="technology-heading" heading={servicesPage.technology.heading} supporting={servicesPage.technology.body} />
      <div className="technology-strip__fade">
        <div className="technology-strip__scroll" role="region" tabIndex={0} aria-labelledby="technology-heading">
          <ul className="technology-strip__names">
            {servicesPage.technology.names.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </div>
        <ArrowIcon direction="east" className="technology-strip__cue" />
      </div>
    </Card>
  );
}
