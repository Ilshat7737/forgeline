import { pages } from "@/content/pages";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Organization data for search engines.
 *
 * Only facts the owner supplied: brand name, site, logo, description, country and founding year.
 * No legal entity, address, phone or aggregateRating — a rating without real, visible reviews breaks
 * Google's structured data policy and risks losing every rich result for the domain.
 */
export function OrganizationSchema() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/apple-icon`,
    image: `${siteUrl}/opengraph-image`,
    description: pages.home.description,
    foundingDate: "2026",
    address: { "@type": "PostalAddress", addressCountry: "EE" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
