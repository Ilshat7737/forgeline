import type { SVGProps } from "react";

export type ArrowDirection = "northeast" | "east" | "down-right" | "south" | "west" | "north";
type ArrowIconProps = SVGProps<SVGSVGElement> & (
  | { direction?: ArrowDirection; variant?: "standard" }
  | { direction?: "south"; variant: "long" }
);

const paths = {
  northeast: "M5 19 19 5M5 5h14v14",
  east: "M3 12h18m-7-7 7 7-7 7",
  "down-right": "M5 5l14 14M5 19h14V5",
  south: "M12 3v18m-7-7 7 7 7-7",
  west: "M21 12H3m7-7-7 7 7 7",
  north: "M12 21V3m-7 7 7-7 7 7",
} as const;

export function ArrowIcon({ direction = "northeast", variant = "standard", ...props }: ArrowIconProps) {
  const long = variant === "long";
  return (
    <svg
      width="24"
      height={long ? 96 : 24}
      viewBox={long ? "0 0 24 96" : "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden="true"
      focusable="false"
    >
      <path d={long ? "M12 3v90m-7-7 7 7 7-7" : paths[direction]} />
    </svg>
  );
}
