import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, type ArrowDirection } from "./arrow-icon";
import type { Surface } from "./card";

// Retain the original variant names while page sections migrate.
export type ButtonVariant = "primary-dark" | "primary-coral" | "quiet" | "primary" | "secondary";
export type ButtonAppearance = {
  variant?: ButtonVariant;
  /** The surrounding surface determines the focus ring, not the button fill. */
  surface?: Surface;
  arrow?: ArrowDirection | false;
};

export function Button({ variant = "primary-coral", surface, arrow = "east", type = "button", className, children, ...props }: ComponentProps<"button"> & ButtonAppearance) {
  return (
    <button {...props} type={type} data-surface={surface} className={cn("button-link", `button-link--${variant}`, className)}>
      <span>{children}</span>
      {arrow && <ArrowIcon direction={arrow} className="button-link__arrow shrink-0" />}
    </button>
  );
}
