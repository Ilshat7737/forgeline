import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/services" }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("site header", () => {
  it("becomes sticky only beyond 120px and returns to the page flow at the top", () => {
    vi.stubGlobal("scrollY", 0);
    render(<SiteHeader />);
    const header = screen.getByRole("banner");
    expect(header.getAttribute("data-sticky")).toBe("false");
    vi.stubGlobal("scrollY", 120);
    fireEvent.scroll(window);
    expect(header.getAttribute("data-sticky")).toBe("false");
    vi.stubGlobal("scrollY", 121);
    fireEvent.scroll(window);
    expect(header.getAttribute("data-sticky")).toBe("true");
    vi.stubGlobal("scrollY", 0);
    fireEvent.scroll(window);
    expect(header.getAttribute("data-sticky")).toBe("false");
  });

  it("handles a restored scroll position and identifies the current page", () => {
    vi.stubGlobal("scrollY", 300);
    render(<SiteHeader />);
    expect(screen.getByRole("banner").getAttribute("data-sticky")).toBe("true");
    expect(screen.getByRole("link", { name: "Services" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "About" }).hasAttribute("aria-current")).toBe(false);
  });
});
