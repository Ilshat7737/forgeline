import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function SectionLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-label font-medium tracking-label uppercase", className)}
    />
  );
}
