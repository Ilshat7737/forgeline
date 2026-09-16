import type { SVGProps } from "react";

// Original 24px drawings, shared rounded 1.75px strokes, no external icon assets.
const paths = {
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M5 6.5c4 2 10 2 14 0M5 17.5c4-2 10-2 14 0M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z",
  mobile: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM10 6h4M11.5 18h1",
  brain: "M12 5c-1-4-7-2-6 2-4 0-5 6-1 7-2 4 3 7 5 5 0 3 2 2 2 0V5Zm0 0c1-4 7-2 6 2 4 0 5 6 1 7 2 4-3 7-5 5 0 3-2 2-2 0M6 7l2 2M5 14h3l1 2M18 7l-2 2M19 14h-3l-1 2",
  pen: "m4 16 12-12a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Zm9-9 3 3M4 16l3 3",
  settings: "m9 3-.5 3-2 1L4 6l-2 4 2.5 2v2L2 16l2 4 2.5-1 2 1 .5 3h6l.5-3 2-1 2.5 1 2-4-2.5-2v-2L22 10l-2-4-2.5 1-2-1-.5-3H9Zm7 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  cloud: "M6 19a4 4 0 0 1-1-8 5 5 0 0 1 9-4 4 4 0 0 1 5 5 3.5 3.5 0 0 1-1 7H6Z",
  database: "M20 6c0 2-3.6 3-8 3S4 8 4 6s3.6-3 8-3 8 1 8 3ZM4 6v12c0 2 3.6 3 8 3s8-1 8-3V6M4 12c0 2 3.6 3 8 3s8-1 8-3",
  users: "M10 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2 20v-3a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v3m2-7h3a4 4 0 0 1 4 4v3",
  cube: "m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5M12 12v10",
  layers: "m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5",
  conversation: "M4 4h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H3V6a2 2 0 0 1 1-2ZM7 8h8M7 12h5m10-3v10h-3l-3 3v-3h-3",
  scan: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 7h8v10H8V7Zm3 3h2m-2 4h2",
  workflow: "M3 3h6v6H3V3Zm12 12h6v6h-6v-6ZM15 3h6v6h-6V3ZM3 15h6v6H3v-6Zm9-9h3m-2-2 2 2-2 2M18 9v6m-2-2 2 2 2-2M12 18H9m2-2-2 2 2 2M6 15V9m-2 2 2-2 2 2",
  play: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM10 7l7 5-7 5V7Z",
} as const;

export type IconName = keyof typeof paths;
type IconProps = Omit<SVGProps<SVGSVGElement>, "name" | "children"> & { name: IconName; label?: string };

export function Icon({ name, label, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}
