"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SectionLabel } from "@/components/ui/section-label";
import { home } from "@/content/home";
import { homeServices } from "@/content/services";
import { nextOpenService } from "@/lib/accordion";

const slugs = homeServices.map((service) => service.slug);

export function ServicesAccordion() {
  const [openSlug, setOpenSlug] = useState<string>(homeServices[0].slug);
  return (
    <section id="services" className="home-section" data-surface="dark" aria-labelledby="services-heading">
      <div className="site-container">
        <SectionLabel>{home.services.label}</SectionLabel>
        <h2 id="services-heading" className="home-section__heading">{home.services.heading}</h2>
        <div className="services-accordion">
          {homeServices.map((service) => {
            const open = openSlug === service.slug;
            const buttonId = `service-${service.slug}`;
            const panelId = `${buttonId}-details`;
            return (
              <div key={service.slug} className="service-row" data-open={open}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="service-row__toggle"
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-disabled={open}
                    onClick={() => setOpenSlug((current) => nextOpenService(current, service.slug, slugs))}
                  >
                    <span className="service-row__number" aria-hidden="true">{String(service.homeOrder).padStart(2, "0")}</span>
                    <span className="service-row__title">{service.homeTitle}</span>
                    <span className="service-row__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
                        <path d="M3 12h18" />{!open && <path d="M12 3v18" />}
                      </svg>
                      <span className="sr-only">{open ? home.services.collapse : home.services.expand}</span>
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="service-row__panel">
                  <p>{service.homeDescription}</p>
                  <Link href={`/contact?service=${service.slug}`} className="editorial-link">
                    {home.services.discuss}<ArrowIcon direction="east" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <Link href={home.services.all.href} className="editorial-link home-section__link">
          {home.services.all.label}<ArrowIcon direction="east" />
        </Link>
      </div>
    </section>
  );
}
