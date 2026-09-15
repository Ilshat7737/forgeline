import type { ComponentProps } from "react";
import { FieldDetails, FieldIndicator, fieldDescription, type FieldDetailsProps } from "./field";

export function TextareaField({ id, label, required, helper, error, ...input }: FieldDetailsProps & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}<FieldIndicator required={required} /></label>
      <textarea {...input} id={id} required={required} className="field__input field__textarea" aria-invalid={Boolean(error)} aria-describedby={fieldDescription(id, helper, error)} />
      <FieldDetails id={id} helper={helper} error={error} />
    </div>
  );
}
