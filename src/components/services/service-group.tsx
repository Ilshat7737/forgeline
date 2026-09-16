import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Card, type CardSurface } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, servicesPage, type ServiceGroupContent, type ServiceGroupId } from "@/content/services";

const surfaces: readonly CardSurface[] = ["white", "lavender", "coral", "dark", "lavender"];
const icons: Record<ServiceGroupId, readonly IconName[]> = {
  product: ["scan", "conversation", "workflow", "cube", "pen"],
  engineering: ["globe", "mobile", "layers", "cube", "settings"],
  systems: ["brain", "brain", "cloud", "workflow", "database"],
  team: ["users", "workflow", "conversation"],
};

export function ServiceGroup({ group }: { group: ServiceGroupContent }) {
  return (
    <section className="service-group" aria-labelledby={`group-${group.id}`}>
      <div className="service-group__intro">
        <SectionHeading label={group.number} heading={group.title} headingId={`group-${group.id}`} supporting={group.introduction} />
        <p className="service-group__marker">{servicesPage.selector.relevant}</p>
      </div>
      <ul className="service-group__grid">
        {services.filter((service) => service.group === group.id).map((service, index) => (
          <li key={service.slug}>
            <Card surface={surfaces[index]} padding="none" shadow="soft" className="service-group__card">
              <Link href={`/contact?service=${service.slug}`} aria-label={`${servicesPage.discuss}: ${service.title}`}>
                <Icon name={icons[group.id][index]} />
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <span className="service-group__link-label">{servicesPage.discuss}<ArrowIcon direction="east" /></span>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
