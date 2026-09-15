/** Public origin used for canonical URLs, robots and sitemap. Configure NEXT_PUBLIC_SITE_URL before production. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
}
