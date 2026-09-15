import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { serviceGroups, servicesPage } from "@/content/services";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceSelector } from "@/components/services/service-selector";
import { ServiceGroup } from "@/components/services/service-group";
import { TechnologyStrip } from "@/components/services/technology-strip";
import { DeliveryPrinciples } from "@/components/services/delivery-principles";
import { ServicesCta } from "@/components/services/services-cta";
import "@/styles/services.css";

export const metadata: Metadata = {
  title: pages.services.title,
  description: pages.services.description,
  alternates: { canonical: "/services" },
  openGraph: { title: pages.services.title, description: pages.services.description, url: "/services", type: "website" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero {...servicesPage.hero} />
      <ServiceSelector groups={serviceGroups.map((group) => ({ id: group.id, content: <ServiceGroup group={group} /> }))} />
      <TechnologyStrip />
      <DeliveryPrinciples />
      <ServicesCta />
    </>
  );
}
