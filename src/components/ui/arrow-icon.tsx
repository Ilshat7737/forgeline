import type { SVGProps } from "react";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  direction?: "northeast" | "east" | "down-right";
};

const paths = {
  northeast: "M5 19 19 5M5 5h14v14",
  east: "M3 12h18m-7-7 7 7-7 7",
  "down-right": "M5 5l14 14M5 19h14V5",
} as const;

export function ArrowIcon({ direction = "northeast", ...props }: ArrowIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
