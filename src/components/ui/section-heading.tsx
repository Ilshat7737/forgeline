import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = Omit<ComponentProps<"div">, "children"> & {
  label?: string;
  heading: string;
  supporting?: ReactNode;
  headingId?: string;
  level?: 2 | 3;
};

export function SectionHeading({ label, heading, supporting, headingId, level = 2, className, ...props }: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div {...props} className={cn("section-heading", className)}>
      <div>
        {label && <p className="section-heading__label">{label}</p>}
        <Heading id={headingId} className="section-heading__title">{heading}</Heading>
      </div>
      {supporting && <p className="section-heading__supporting">{supporting}</p>}
    </div>
  );
}
