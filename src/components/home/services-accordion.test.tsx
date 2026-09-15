import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { homeServices } from "@/content/services";
import { ServicesAccordion } from "./services-accordion";

afterEach(cleanup);

function assertSingleOpen(expectedSlug: string) {
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(8);
  expect(buttons.filter((button) => button.getAttribute("aria-expanded") === "true")).toHaveLength(1);
  const section = screen.getByRole("region", { name: "FROM STRATEGY TO A STABLE RELEASE." });
  expect(within(section).getAllByRole("region")).toHaveLength(1);
  for (const [index, button] of buttons.entries()) {
    const panel = document.getElementById(button.getAttribute("aria-controls")!);
    const open = homeServices[index].slug === expectedSlug;
    expect(panel).not.toBeNull();
    expect(button.getAttribute("aria-expanded")).toBe(String(open));
    expect(button.getAttribute("aria-disabled")).toBe(String(open));
    expect(panel?.hidden).toBe(!open);
    expect(panel?.getAttribute("aria-labelledby")).toBe(button.id);
  }
  expect(screen.getByRole("link", { name: "Discuss this service" }).getAttribute("href")).toBe(`/contact?service=${expectedSlug}`);
}

describe("home services accordion", () => {
  it("opens only the first service on initial render with associated panels", () => {
    render(<ServicesAccordion />);
    assertSingleOpen("web-development");
    expect(screen.getByRole("link", { name: "View all services" }).getAttribute("href")).toBe("/services");
  });

  it("keeps exactly one panel open through every service change and repeated activation", () => {
    render(<ServicesAccordion />);
    for (const service of homeServices) {
      const toggle = screen.getByRole("button", { name: new RegExp(service.homeTitle) });
      toggle.focus();
      fireEvent.click(toggle);
      assertSingleOpen(service.slug);
      expect(document.activeElement).toBe(toggle);
      fireEvent.click(toggle);
      assertSingleOpen(service.slug);
    }
  });
});
