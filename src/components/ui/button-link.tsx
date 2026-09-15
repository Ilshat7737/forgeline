import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./arrow-icon";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  surface?: "dark" | "light";
};

export function ButtonLink({
  variant = "primary",
  surface = "dark",
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
      <ArrowIcon className="button-link__arrow shrink-0" />
    </Link>
  );
}
