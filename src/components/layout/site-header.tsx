import Link from "next/link";
import { navigation } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Wordmark } from "@/components/ui/wordmark";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <div className="site-header-slot">
      <header className="site-header" data-sticky="false" data-surface="canvas">
        <div className="site-header__inner site-container flex h-full items-center justify-between gap-3">
          <Wordmark />
          <nav aria-label={navigation.label} className="desktop-navigation hidden items-center gap-1 lg:flex">
            {navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-header-link
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ButtonLink
            href={navigation.contact.href}
            variant="primary-coral"
            surface="canvas"
            className="hidden lg:inline-flex"
            data-header-link
          >
            {navigation.contact.label}
          </ButtonLink>
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
