import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MobileMenu } from "./mobile-menu";

let breakpointChange: (event: { matches: boolean }) => void;

beforeEach(() => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn((_event, callback) => { breakpointChange = callback; }),
    removeEventListener: vi.fn(),
  })));
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
  vi.unstubAllGlobals();
});

function renderMenu() {
  return render(
    <>
      <MobileMenu pathname="/services" />
      <main><a href="/work">Background link</a></main>
      <footer />
    </>,
  );
}

describe("mobile navigation", () => {
  it("starts closed and exposes its state and panel relationship", () => {
    renderMenu();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!);
    expect(panel?.hidden).toBe(true);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("focuses the first link, marks the current route, and locks the background", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    const services = within(nav).getByRole("link", { name: "Services" });
    expect(document.activeElement).toBe(services);
    expect(services.getAttribute("aria-current")).toBe("page");
    expect(within(nav).getByRole("link", { name: "Approach" }).hasAttribute("aria-current")).toBe(false);
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.querySelector("main")?.inert).toBe(true);
    expect(document.querySelector("footer")?.inert).toBe(true);
  });

  it("closes with Escape, restores focus, and preserves earlier scroll styles", () => {
    document.body.style.overflow = "auto";
    renderMenu();
    const main = document.querySelector("main")!;
    main.inert = false;
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.queryByRole("navigation")).toBeNull();
    expect(document.body.style.overflow).toBe("auto");
    expect(main.inert).toBe(false);
  });

  it("closes from the toggle and after following a link", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("navigation")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    // Avoid jsdom's unimplemented document navigation while checking the handler.
    const link = screen.getByRole("link", { name: "Services" });
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Open menu" }));
    expect(document.body.style.overflow).toBe("");
  });

  it("cycles keyboard focus at both ends of the open menu", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const toggle = screen.getByRole("button", { name: "Close menu" });
    const lastLink = screen.getByRole("link", { name: "Discuss your project" });
    lastLink.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(toggle);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastLink);
  });

  it("unlocks scrolling when switching to desktop or unmounting", () => {
    const { unmount } = renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    act(() => breakpointChange({ matches: true }));
    expect(document.body.style.overflow).toBe("");
    expect(screen.queryByRole("navigation")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on browser history navigation and restores focus", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.popState(window);
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Open menu" }));
    expect(document.body.style.overflow).toBe("");
  });
});
