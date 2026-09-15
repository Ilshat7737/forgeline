import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("wordmark", className)} aria-label={site.name}>
      {site.name}<span className="wordmark__dot" aria-hidden="true">.</span>
    </Link>
  );
}
