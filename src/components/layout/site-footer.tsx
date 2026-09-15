import Link from "next/link";
import { legalNavigation, navigation } from "@/content/navigation";
import { getCopyright, site } from "@/content/site";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Wordmark } from "@/components/ui/wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-dark bg-plum-950" data-surface="dark">
      <div className="site-container py-6 lg:py-8">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-grid">
          <div className="lg:col-span-6">
            <Wordmark />
            <p className="mt-2 text-body-md font-medium">{site.footer.tagline}</p>
            <p className="mt-2 max-w-measure text-body-md text-lavender-100">{site.footer.description}</p>
          </div>
          <nav aria-label={navigation.label} className="flex flex-col items-start lg:col-span-3">
            {navigation.links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
            ))}
          </nav>
          <div className="lg:col-span-3">
            <Link href={navigation.contact.href} className="editorial-link">
              {navigation.contact.label}<ArrowIcon direction="east" className="shrink-0" />
            </Link>
            {legalNavigation.length > 0 && (
              <ul className="mt-3">
                {legalNavigation.map((link) => (
                  <li key={link.href}><Link href={link.href} className="nav-link">{link.label}</Link></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 border-t border-border-dark pt-3 text-label sm:flex-row sm:items-center sm:justify-between">
          <p>{getCopyright()}</p>
          <a href="#top" className="editorial-link">
            {site.footer.backToTop}<ArrowIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
