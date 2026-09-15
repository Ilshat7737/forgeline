"use client";

import { useEffect, useRef } from "react";
import { contactPage } from "@/content/contact";
import { ButtonLink } from "@/components/ui/button-link";

export function ContactSuccess({ development }: { development: boolean }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return (
    <section className="contact-success" aria-labelledby="contact-success-heading">
      <h2 ref={heading} id="contact-success-heading" tabIndex={-1}>{contactPage.success.heading}</h2>
      <p>{contactPage.success.body}</p>
      {development && <p className="contact-success__development">{contactPage.success.development}</p>}
      <div className="contact-success__links">
        <ButtonLink href={contactPage.success.primary.href} surface="light">{contactPage.success.primary.label}</ButtonLink>
        <ButtonLink href={contactPage.success.secondary.href} variant="secondary" surface="light">{contactPage.success.secondary.label}</ButtonLink>
      </div>
    </section>
  );
}
