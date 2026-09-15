import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Production guard (spec §18.12): bracketed configuration tokens such as [COMPANY_NAME] must never ship.
const placeholder = /\[[A-Z][A-Z0-9_]{2,}\]/;
const contentDir = join(process.cwd(), "src", "content");
const appDir = join(process.cwd(), "src", "app");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) && !entry.name.includes(".test.") ? [path] : [];
  });
}

describe("visitor-facing copy", () => {
  it.each([...sourceFiles(contentDir), ...sourceFiles(appDir)])("has no bracketed placeholders in %s", (file) => {
    expect(readFileSync(file, "utf8")).not.toMatch(placeholder);
  });
});
