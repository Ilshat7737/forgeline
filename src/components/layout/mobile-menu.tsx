"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navigation } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/button-link";

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Keep shared header behavior inside Home's existing interactive boundary.
  useEffect(() => {
    const header = buttonRef.current?.closest("header");
    if (!header) return;
    function updateSticky() {
      if (header) header.dataset.sticky = String(window.scrollY > 120);
    }
    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    return () => window.removeEventListener("scroll", updateSticky);
  }, []);

  useEffect(() => {
    const links = buttonRef.current?.closest("header")?.querySelectorAll("a[data-header-link]");
    links?.forEach((link) => {
      if (link.getAttribute("href") === pathname) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }, [pathname]);

  function closeMenu() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLAnchorElement>("a")?.focus();

    // Keep keyboard and assistive-technology navigation inside the open menu.
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });

    function dismiss() {
      setIsOpen(false);
      buttonRef.current?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
      if (event.key === "Tab") {
        const links = panel?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const lastLink = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === buttonRef.current) {
          event.preventDefault();
          lastLink?.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          buttonRef.current?.focus();
        }
      }
    }

    const desktop = window.matchMedia("(min-width: 1024px)");
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false);
        document.querySelector<HTMLAnchorElement>(".desktop-navigation a")?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", dismiss);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.body.style.overflow = originalOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", dismiss);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="menu-toggle"
        onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
      >
        {isOpen ? navigation.menu.close : navigation.menu.open}
        <span className="menu-toggle__icon" aria-hidden="true" data-open={isOpen}>
          <span />
          <span />
        </span>
      </button>
      <div ref={panelRef} id={panelId} className="mobile-menu__panel" data-surface="white" hidden={!isOpen}>
        <nav aria-label={navigation.label} className="site-container">
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="mobile-menu__link nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink
            href={navigation.contact.href}
            variant="primary-coral"
            surface="white"
            aria-current={pathname === navigation.contact.href ? "page" : undefined}
            className="mt-4 w-full"
            onClick={closeMenu}
          >
            {navigation.contact.label}
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
