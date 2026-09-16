import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { serviceGroups } from "@/content/services";
import { ServicesHero } from "@/components/services/services-hero";
import { ServiceSelector } from "@/components/services/service-selector";
import { ServiceGroup } from "@/components/services/service-group";
import { TechnologyStrip } from "@/components/services/technology-strip";
import { DeliveryPrinciples } from "@/components/services/delivery-principles";
import { ServicesCta } from "@/components/services/services-cta";
import { pageMetadata } from "@/lib/metadata";
import "@/styles/services.css";

export const metadata: Metadata = pageMetadata(pages.services, "/services");

export default function ServicesPage() {
  return (
    <div className="site-container services-bento" data-surface="canvas">
      <ServicesHero />
      <ServiceSelector groups={serviceGroups.map((group) => ({ id: group.id, content: <ServiceGroup group={group} /> }))} />
      <TechnologyStrip />
      <DeliveryPrinciples />
      <ServicesCta />
    </div>
  );
}
