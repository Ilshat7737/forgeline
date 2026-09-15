import type { MetadataRoute } from "next";
import { publishedLegalLinks } from "@/lib/legal";
import { getSiteUrl } from "@/lib/site-url";

// The four V1 routes plus legal pages once published; filtered Work URLs (?category=) are intentionally excluded.
const routes = ["/", "/services", "/work", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const paths = [...routes, ...publishedLegalLinks().map((link) => link.href)];
  return paths.map((route) => ({ url: `${siteUrl}${route === "/" ? "" : route}` }));
}
