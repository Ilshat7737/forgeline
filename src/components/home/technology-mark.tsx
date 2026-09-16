import type { ReactNode } from "react";

const marks: Record<string, ReactNode> = {
  React: <><circle cx="24" cy="24" r="3" fill="currentColor" /><ellipse cx="24" cy="24" rx="22" ry="8" /><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(120 24 24)" /></>,
  "Node.js": <><path d="m24 2 19 11v22L24 46 5 35V13Z" /><path d="M21 16v17c0 5-8 5-10 1m26-15c-8-6-14-2-13 2 1 5 13 2 13 8 0 6-10 7-15 2" /></>,
  ".NET": <><circle cx="3" cy="34" r="1.5" fill="currentColor" /><path d="M9 35V15l12 20V15m16 0H26v20h11M26 25h9m4-10h9m-5 0v20" /></>,
  Python: <><path d="M24 3c-11 0-12 3-12 10v6h16v3H10C0 22 0 38 10 38h5v-7c0-5 4-8 9-8h12V12c0-6-3-9-12-9Z" fill="currentColor" stroke="none" /><path d="M24 45c11 0 12-3 12-10v-6H20v-3h18c10 0 10-16 0-16h-5v7c0 5-4 8-9 8H12v11c0 6 3 9 12 9Z" fill="currentColor" stroke="none" opacity=".75" /><circle cx="19" cy="9" r="2" fill="var(--color-plum-900)" /><circle cx="29" cy="39" r="2" fill="var(--color-plum-900)" /></>,
  AWS: <><path d="M4 13h7v14H4v-7h7m5-7 3 14 4-10 4 10 3-14m14 1h-8v6h8v7h-8M4 34c11 9 27 9 39 0m-9-1 10-1-2 9" /></>,
};
export function TechnologyMark({ name }: { name: string }) {
  return <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{marks[name]}</svg>;
}
