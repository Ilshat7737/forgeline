"use client";

import { useEffect } from "react";
import { REVEAL_ROOT_MARGIN, REVEAL_SELECTOR, REVEAL_THRESHOLD, revealDelay } from "@/lib/reveal";

/**
 * Scroll reveal for the whole site, except the legal documents.
 *
 * The hidden state is applied only after this component runs, so without JavaScript, before hydration,
 * or with reduced motion enabled, every block renders fully visible. Entering the viewport reveals a block
 * and leaving it resets the state, so the animation repeats on each pass.
 */
export function RevealRoot() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const observed = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) (entry.target as HTMLElement).dataset.revealed = "true";
          else delete (entry.target as HTMLElement).dataset.revealed;
        }
      },
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
    );

    function scan() {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (observed.has(element)) return;
        const position = [...(element.parentElement?.children ?? [])].indexOf(element);
        element.style.setProperty("--reveal-delay", `${revealDelay(position)}ms`);
        observed.add(element);
        observer.observe(element);
      });
    }

    root.dataset.reveal = "on";
    scan();

    // Client sections (work filter, form success) swap nodes after hydration.
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      observed.forEach((element) => delete (element as HTMLElement).dataset.revealed);
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
