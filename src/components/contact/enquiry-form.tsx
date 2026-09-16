"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitProjectEnquiry } from "@/app/contact/actions";
import { contactErrors, contactFields, contactPage, contactServiceOptions, type ContactFieldName } from "@/content/contact";
import { contactSchema, shortContactSchema, type ContactValues } from "@/lib/contact-schema";
import type { ContactDefaults } from "@/lib/contact-query";
import type { EnquiryResult } from "@/lib/enquiry/types";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Field, FieldDetails, FieldIndicator, fieldDescription } from "@/components/ui/field";
import { TextareaField } from "@/components/ui/textarea-field";
import { CheckboxField } from "@/components/ui/checkbox-field";
import { ContactSuccess } from "./contact-success";

const fieldNames = Object.keys(contactFields) as ContactFieldName[];

/** `privacyHref` is passed only once the Privacy Policy is published, so the helper never links to a draft. */
export function EnquiryForm({ defaults, privacyHref, compact = false }: { defaults: ContactDefaults; privacyHref?: string; compact?: boolean }) {
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [failedAttempt, setFailedAttempt] = useState(0);
  // Honeypot: visitors never see or reach it; automated submissions that fill it are rejected on the server.
  const [website, setWebsite] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, getValues, setValue, setError, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema), mode: "onSubmit", reValidateMode: "onChange", shouldFocusError: false,
    defaultValues: { name: "", email: "", company: "", services: defaults.services, project: defaults.project, timing: "", ndaRequested: false },
  });

  useEffect(() => {
    // App Router navigation can supply a new suggestion while this form remains mounted.
    if (defaults.project && getValues("project") === "") setValue("project", defaults.project);
  }, [defaults.project, getValues, setValue]);

  const errorFields = fieldNames.filter((name) => errors[name]?.message);
  const showSummary = failedAttempt > 0 && errorFields.length > 0;
  // Field errors can arrive a render after the failed attempt, so focus once per attempt when the summary exists.
  const focusedAttempt = useRef(0);
  useEffect(() => {
    if (showSummary && focusedAttempt.current !== failedAttempt) {
      focusedAttempt.current = failedAttempt;
      summary.current?.focus();
    }
  }, [failedAttempt, showSummary]);

  const failValidation = () => { setResult(null); setFailedAttempt((attempt) => attempt + 1); };
  const send = async (values: ContactValues) => {
    setResult(null);
    try {
      const response = await submitProjectEnquiry({ ...(compact ? { ...shortContactSchema.parse(values), services: [], ndaRequested: false } : values), website });
      setResult(response);
      if (response.status === "invalid") {
        for (const name of fieldNames) {
          const message = response.fieldErrors[name];
          if (message) setError(name, { type: "server", message });
        }
        setFailedAttempt((attempt) => attempt + 1);
      }
    } catch {
      setResult({ status: "error", code: "submission-failed" });
    }
  };

  if (result?.status === "success") return <ContactSuccess />;

  return (
    <div className={compact ? "short-enquiry" : undefined}>
      <h2 id="contact-form-heading" className={compact ? "sr-only" : undefined}>{contactPage.formHeading}</h2>
      {showSummary && (
        <div className="contact-error-summary" ref={summary} tabIndex={-1} aria-labelledby="contact-error-heading">
          <h3 id="contact-error-heading">{contactPage.errorSummary}</h3>
          <ul>{errorFields.map((name) => (
            <li key={name}><a href={`#contact-${name}`} onClick={(event) => { event.preventDefault(); document.getElementById(`contact-${name}`)?.focus(); }}>{contactFields[name].label}: {errors[name]?.message}</a></li>
          ))}</ul>
        </div>
      )}
      <form noValidate onSubmit={handleSubmit(send, failValidation)} aria-labelledby="contact-form-heading" aria-busy={isSubmitting}>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-website">{contactPage.honeypot}</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </div>
        <fieldset className="contact-form__fields" disabled={isSubmitting}>
          <div className="contact-form__pair">
            <Field {...contactFields.name} {...register("name")} id="contact-name" autoComplete="name" error={errors.name?.message} />
            <Field {...contactFields.email} {...register("email")} id="contact-email" type="email" autoComplete="email" error={errors.email?.message} />
          </div>
          {!compact && <>
          <Field {...contactFields.company} {...register("company")} id="contact-company" autoComplete="organization" error={errors.company?.message} />
          <fieldset className="contact-services" id="contact-services" tabIndex={-1} aria-invalid={Boolean(errors.services)} aria-describedby={fieldDescription("contact-services", undefined, errors.services?.message)}>
            <legend className="field__label">{contactFields.services.label}<FieldIndicator /></legend>
            <div className="contact-services__options">
              {contactServiceOptions.map((option) => <CheckboxField key={option.value} {...register("services")} id={`contact-service-${option.value}`} label={option.label} value={option.value} indicator={false} aria-describedby={errors.services ? "contact-services-error" : undefined} />)}
            </div>
            <FieldDetails id="contact-services" error={errors.services?.message} />
          </fieldset>
          </>}
          <TextareaField {...contactFields.project} {...register("project")} id="contact-project" rows={compact ? 4 : 7} error={errors.project?.message} />
          {!compact && <>
          <Field {...contactFields.timing} {...register("timing")} id="contact-timing" error={errors.timing?.message} />
          <CheckboxField {...contactFields.ndaRequested} {...register("ndaRequested")} id="contact-ndaRequested" error={errors.ndaRequested?.message} />
          </>}
        </fieldset>
        <p className="contact-form__privacy">
          {contactPage.privacy}
          {privacyHref && <> <Link href={privacyHref} className="contact-form__privacy-link">{contactPage.privacyLink}</Link></>}
        </p>
        {result?.status === "error" && <p className="contact-form__failure" role="alert">{contactErrors.general}</p>}
        <button type="submit" className="button-link button-link--primary-coral contact-form__submit" data-surface="white" disabled={isSubmitting}>
          <span>{isSubmitting ? contactPage.pending : contactPage.submit}</span>
          <ArrowIcon direction={compact ? "east" : "northeast"} className="button-link__arrow shrink-0" />
        </button>
      </form>
    </div>
  );
}
