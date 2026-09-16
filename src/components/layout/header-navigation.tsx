"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { navigation } from "@/content/navigation";

export function HeaderNavigation() {
  const pathname = usePathname();
  return (
    <>
      <nav aria-label={navigation.label} className="desktop-navigation hidden items-center gap-1 lg:flex">
        {navigation.links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link" aria-current={pathname === link.href ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <ButtonLink href={navigation.contact.href} variant="primary-coral" surface="canvas" className="hidden lg:inline-flex" aria-current={pathname === navigation.contact.href ? "page" : undefined}>
        {navigation.contact.label}
      </ButtonLink>
    </>
  );
}
