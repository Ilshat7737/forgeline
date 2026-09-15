import type { ComponentProps } from "react";
import { FieldDetails, FieldIndicator, fieldDescription, type FieldDetailsProps } from "./field";

export function CheckboxField({ id, label, required, helper, error, indicator = true, ...input }: FieldDetailsProps & Omit<ComponentProps<"input">, "id" | "type"> & { indicator?: boolean }) {
  return (
    <div className="field field--checkbox">
      <label className="checkbox-field" htmlFor={id}>
        <input {...input} type="checkbox" id={id} required={required} aria-invalid={Boolean(error)} aria-describedby={fieldDescription(id, helper, error) ?? input["aria-describedby"]} />
        <span>{label}{indicator && <FieldIndicator required={required} />}</span>
      </label>
      <FieldDetails id={id} helper={helper} error={error} />
    </div>
  );
}
