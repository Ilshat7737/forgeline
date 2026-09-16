import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, type ArrowDirection } from "./arrow-icon";
import type { Surface } from "./card";

type ButtonAppearance = {
  variant?: "primary-dark" | "primary-coral" | "quiet";
  /** The surrounding surface determines the focus ring, not the button fill. */
  surface?: Surface;
  arrow?: ArrowDirection | false;
};

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonAppearance;

export function ButtonLink({
  variant = "primary-coral",
  surface,
  arrow = "east",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn("button-link", `button-link--${variant}`, className)}
      data-surface={surface}
    >
      <span>{children}</span>
      {arrow && <ArrowIcon direction={arrow} className="button-link__arrow shrink-0" />}
    </Link>
  );
}
