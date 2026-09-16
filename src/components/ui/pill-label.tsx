import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function PillLabel({ variant = "eyebrow", className, ...props }: ComponentProps<"span"> & { variant?: "eyebrow" | "tag" }) {
  return <span {...props} className={cn("pill-label", `pill-label--${variant}`, className)} />;
}
