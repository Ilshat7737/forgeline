"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { Wordmark } from "@/components/ui/wordmark";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function updateSticky() {
      setIsSticky(window.scrollY > 120);
    }
    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    return () => window.removeEventListener("scroll", updateSticky);
  }, []);

  return (
    <div className="site-header-slot">
      <header className="site-header" data-sticky={isSticky} data-surface="dark">
        <div className="site-container flex h-full items-center justify-between gap-3">
          <Wordmark />
          <nav aria-label={navigation.label} className="desktop-navigation hidden items-center gap-4 lg:flex">
            {navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ButtonLink
            href={navigation.contact.href}
            className="hidden lg:inline-flex"
            aria-current={pathname === navigation.contact.href ? "page" : undefined}
          >
            {navigation.contact.label}
          </ButtonLink>
          <MobileMenu pathname={pathname} />
        </div>
      </header>
    </div>
  );
}
