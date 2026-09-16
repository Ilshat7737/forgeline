import type { MetadataRoute } from "next";
import { publishedLegalLinks } from "@/lib/legal";
import { getSiteUrl } from "@/lib/site-url";

// The six main routes plus legal pages once published; filtered Work URLs (?category=) are intentionally excluded.
const routes = ["/", "/services", "/work", "/approach", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const paths = [...routes, ...publishedLegalLinks().map((link) => link.href)];
  return paths.map((route) => ({ url: `${siteUrl}${route === "/" ? "" : route}` }));
}
