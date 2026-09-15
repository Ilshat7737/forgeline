import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function PageShell({ className, ...props }: Omit<ComponentProps<"main">, "id">) {
  return (
    <main
      {...props}
      id="main-content"
      tabIndex={-1}
      className={cn("min-w-0 flex-1", className)}
    />
  );
}
