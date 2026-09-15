import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { services, servicesPage, type ServiceGroupContent } from "@/content/services";

export function ServiceGroup({ group }: { group: ServiceGroupContent }) {
  return (
    <section className="service-group" aria-labelledby={`group-${group.id}`}>
      <div className="service-group__intro">
        <span className="service-group__number" aria-hidden="true">{group.number}</span>
        <div>
          <h2 id={`group-${group.id}`} className="font-display text-heading-lg font-semibold">{group.title}</h2>
          <p className="service-group__description">{group.introduction}</p>
          <p className="service-group__marker">{servicesPage.selector.relevant}</p>
        </div>
      </div>
      <ul className="service-group__rows">
        {services.filter((service) => service.group === group.id).map((service) => (
          <li key={service.slug} className="service-group__row">
            <div>
              <h3 className="service-group__title">{service.title}</h3>
              <p>{service.shortDescription}</p>
            </div>
            <Link href={`/contact?service=${service.slug}`} className="editorial-link" aria-label={`${servicesPage.discuss}: ${service.title}`}>
              {servicesPage.discuss}<ArrowIcon direction="east" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
