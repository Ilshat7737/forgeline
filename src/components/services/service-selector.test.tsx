import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { serviceGroups, serviceSituations, services, servicesPage, type ServiceSituationId } from "@/content/services";
import { ServiceSelector } from "./service-selector";
import { ServiceGroup } from "./service-group";

afterEach(cleanup);

function Selector() {
  return <ServiceSelector groups={serviceGroups.map((group) => ({ id: group.id, content: <ServiceGroup group={group} /> }))} />;
}

function assertSelection(id: ServiceSituationId, relevant: readonly string[]) {
  expect(screen.getAllByRole("tab", { selected: true })).toHaveLength(1);
  expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  for (const situation of serviceSituations) {
    const tab = screen.getByRole("tab", { name: situation.title });
    const panel = document.getElementById(tab.getAttribute("aria-controls")!)!;
    expect(panel.getAttribute("aria-labelledby")).toBe(tab.id);
    expect(panel.hidden).toBe(situation.id !== id);
    expect(tab.tabIndex).toBe(situation.id === id ? 0 : -1);
  }
  for (const group of serviceGroups) {
    const region = screen.getByRole("region", { name: group.title });
    expect(region.parentElement?.getAttribute("data-relevant")).toBe(String(relevant.includes(group.id)));
  }
  expect(screen.getAllByRole("link")).toHaveLength(services.length);
}

describe("service selector", () => {
  it("renders every situation and service in server HTML with no selected or dimmed groups, then hydrates", async () => {
    const container = document.createElement("div");
    document.body.append(container);
    container.innerHTML = renderToString(<Selector />);
    expect(container.querySelector('[role="tablist"]')).toBeNull();
    expect(container.querySelector('[data-relevant="true"]')).toBeNull();
    for (const situation of serviceSituations) {
      const region = within(container).getByRole("region", { name: situation.title });
      expect(region.hidden).toBe(false);
      expect(region.textContent).toContain(situation.body);
    }
    for (const service of services) {
      expect(within(container).getByRole("link", { name: `${servicesPage.discuss}: ${service.title}` }).getAttribute("href")).toBe(`/contact?service=${service.slug}`);
    }
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => {
      root = hydrateRoot(container, <Selector />, { onRecoverableError: (error) => errors.push(error) });
    });
    expect(errors).toEqual([]);
    assertSelection("build", ["product", "engineering"]);
    await act(async () => root.unmount());
    container.remove();
  });

  it("changes the paragraph and relevance markers while retaining every service", () => {
    render(<Selector />);
    assertSelection("build", ["product", "engineering"]);
    fireEvent.click(screen.getByRole("tab", { name: "Improve an existing system" }));
    assertSelection("improve", ["engineering", "systems"]);
    fireEvent.click(screen.getByRole("tab", { name: "Strengthen your team" }));
    assertSelection("strengthen", ["team"]);
  });

  it("moves focus and selection with arrows, wraps at both ends, and supports Home and End", () => {
    render(<Selector />);
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    const steps = [
      ["ArrowRight", 1], ["ArrowDown", 2], ["ArrowRight", 0],
      ["ArrowLeft", 2], ["ArrowUp", 1], ["Home", 0], ["End", 2],
    ] as const;
    for (const [key, index] of steps) {
      fireEvent.keyDown(document.activeElement!, { key });
      expect(document.activeElement).toBe(tabs[index]);
      expect(tabs[index].getAttribute("aria-selected")).toBe("true");
      expect(screen.getByRole("tabpanel").textContent).toContain(serviceSituations[index].body);
    }
  });
});
