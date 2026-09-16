import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./arrow-icon";
import type { ButtonAppearance } from "./button";

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonAppearance;

export function ButtonLink({
  variant = "primary",
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
