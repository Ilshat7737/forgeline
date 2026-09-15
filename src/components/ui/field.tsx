import type { ComponentProps } from "react";
import { contactPage } from "@/content/contact";

export type FieldDetailsProps = { id: string; label: string; required?: boolean; helper?: string; error?: string };

export function fieldDescription(id: string, helper?: string, error?: string): string | undefined {
  return [helper && `${id}-helper`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

export function FieldIndicator({ required }: { required?: boolean }) {
  return <span className="field__indicator">{required ? contactPage.required : contactPage.optional}</span>;
}

export function FieldDetails({ id, helper, error }: Pick<FieldDetailsProps, "id" | "helper" | "error">) {
  return <>{helper && <p id={`${id}-helper`} className="field__helper">{helper}</p>}{error && <p id={`${id}-error`} className="field__error">{error}</p>}</>;
}

export function Field({ id, label, required, helper, error, ...input }: FieldDetailsProps & Omit<ComponentProps<"input">, "id">) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}<FieldIndicator required={required} /></label>
      <input {...input} id={id} required={required} className="field__input" aria-invalid={Boolean(error)} aria-describedby={fieldDescription(id, helper, error)} />
      <FieldDetails id={id} helper={helper} error={error} />
    </div>
  );
}
