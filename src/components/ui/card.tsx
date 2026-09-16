import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type CardSurface = "white" | "lavender" | "dark" | "coral";
export type Surface = CardSurface | "canvas" | "light";

type CardProps = ComponentProps<"div"> & {
  as?: "div" | "article" | "section" | "aside";
  surface?: CardSurface;
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "card" | "tile";
  shadow?: "none" | "soft" | "card" | "raised";
};

export function Card({ as: Element = "div", surface = "white", padding = "md", radius = "card", shadow = "none", className, ...props }: CardProps) {
  return <Element {...props} data-surface={surface} className={cn("card", `card--padding-${padding}`, `card--radius-${radius}`, `card--shadow-${shadow}`, className)} />;
}
