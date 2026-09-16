import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Card, type CardSurface } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
import { homeServices } from "@/content/services";
const surfaces: CardSurface[] = ["lavender", "white", "coral", "lavender", "dark", "lavender", "white", "dark"];
const icons: IconName[] = ["globe", "mobile", "brain", "pen", "settings", "cloud", "database", "users"];
export function ServicesGrid() {
  return <section id="services" className="home-section" aria-labelledby="services-heading">
    <SectionHeading label={home.services.label} heading={home.services.heading} headingId="services-heading" supporting={homeLayout.servicesSupporting} />
    <div className="services-grid">{homeServices.map((service, index) => <Card key={service.slug} surface={surfaces[index]} padding="none" shadow="soft" className="service-card">
      <Link href={`/contact?service=${service.slug}`}><Icon name={icons[index]} /><h3>{service.homeTitle}</h3><p>{service.homeDescription}</p><ArrowIcon direction="east" /></Link>
    </Card>)}</div>
    <Link href={home.services.all.href} className="editorial-link home-section__link">{home.services.all.label}<ArrowIcon direction="east" /></Link>
  </section>;
}
