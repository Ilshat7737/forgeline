import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// The four V1 routes only; filtered Work URLs (?category=) are intentionally excluded.
const routes = ["/", "/services", "/work", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({ url: `${siteUrl}${route === "/" ? "" : route}` }));
}
