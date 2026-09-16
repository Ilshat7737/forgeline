import Link from "next/link";
import { legalUi } from "@/content/legal";
import { navigation } from "@/content/navigation";
import { getCopyright, site } from "@/content/site";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Wordmark } from "@/components/ui/wordmark";
import { publishedLegalLinks } from "@/lib/legal";

export function SiteFooter() {
  // Legal pages appear only once published, so the footer never links to a draft or a 404.
  const legalNavigation = publishedLegalLinks();
  return (
    <footer className="site-footer" data-surface="canvas">
      <div className="site-container py-6 lg:py-8">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Wordmark />
            <p className="mt-2 text-body-md font-medium">{site.footer.tagline}</p>
            <p className="mt-2 max-w-measure text-body-sm text-text-muted">{site.footer.description}</p>
          </div>
          <nav aria-label={navigation.footerLabel} className="site-footer__nav">
            {navigation.links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
            ))}
          </nav>
          <div className="site-footer__contact">
            <Link href={navigation.contact.href} className="editorial-link">
              {navigation.contact.label}<ArrowIcon direction="east" className="shrink-0" />
            </Link>
            {legalNavigation.length > 0 && (
              <ul className="mt-3" aria-label={legalUi.footerLabel}>
                {legalNavigation.map((link) => (
                  <li key={link.href}><Link href={link.href} className="nav-link">{link.label}</Link></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 border-t border-border-light pt-3 text-label sm:flex-row sm:items-center sm:justify-between">
          <p>{getCopyright()}</p>
          <a href="#top" className="editorial-link">
            {site.footer.backToTop}<ArrowIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
