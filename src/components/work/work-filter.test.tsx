import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { workConcepts, workPage } from "@/content/work";
import { WorkFilter, WorkFilterBoundary } from "./work-filter";
import { ConceptSection } from "./concept-section";
import { ConceptCard } from "./concept-card";

const entries = workConcepts.map((concept) => ({ id: concept.id, category: concept.category, content: <ConceptCard concept={concept} artwork={null} /> }));

afterEach(() => { cleanup(); window.history.replaceState(null, "", "/work"); });

describe("Work filter", () => {
  it("server-renders All and hydrates the URL category without a mismatch", async () => {
    window.history.replaceState({ retained: true }, "", "/work?category=mobile");
    const container = document.createElement("div");
    document.body.append(container);
    container.innerHTML = renderToString(<WorkFilter entries={entries} />);
    expect(within(container).getAllByRole("article")).toHaveLength(6);
    expect(within(container).getByRole("button", { name: "All" }).getAttribute("aria-pressed")).toBe("true");
    const errors: unknown[] = [];
    let root: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, <WorkFilter entries={entries} />, { onRecoverableError: (error) => errors.push(error) }); });
    expect(errors).toEqual([]);
    expect(within(container).getAllByRole("article")).toHaveLength(1);
    expect(within(container).getByRole("button", { name: "Mobile" }).getAttribute("aria-pressed")).toBe("true");
    await act(async () => root.unmount());
    container.remove();
  });

  it("updates the URL shallowly, preserves history state, params and fragment, and retains expanded sections", () => {
    window.history.replaceState({ retained: true }, "", "/work?source=example#workflow-automation");
    const replace = vi.spyOn(window.history, "replaceState");
    const push = vi.spyOn(window.history, "pushState");
    render(<><WorkFilter entries={entries} />{workConcepts.map((concept) => <ConceptSection key={concept.id} concept={concept} />)}</>);
    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(replace).toHaveBeenLastCalledWith({ retained: true }, "", "/work?source=example&category=mobile#workflow-automation");
    expect(push).not.toHaveBeenCalled();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("Showing 1 concept").getAttribute("aria-live")).toBe("polite");
    for (const concept of workConcepts) {
      expect(screen.getByRole("region", { name: concept.heading }).id).toBe(concept.id);
    }
    expect(screen.getAllByText(workPage.disclaimer)).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(window.location.search).toBe("?source=example");
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("falls back to All for invalid values and responds to browser history changes", () => {
    window.history.replaceState(null, "", "/work?category=invalid");
    render(<WorkFilter entries={entries} />);
    expect(screen.getAllByRole("article")).toHaveLength(6);
    act(() => {
      window.history.replaceState(null, "", "/work?category=desktop");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(screen.getByRole("button", { name: "Desktop" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });

  it("offers a working reset when a category is empty", () => {
    window.history.replaceState(null, "", "/work?category=mobile");
    render(<WorkFilter entries={entries.filter((entry) => entry.category === "web")} />);
    expect(screen.getByText(workPage.empty)).toBeTruthy();
    expect(screen.getByText("Showing 0 concepts")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: workPage.reset }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(window.location.search).toBe("");
  });

  it("shows loading and error only for their supplied status and exposes retry", () => {
    const retry = vi.fn();
    const { rerender } = render(<WorkFilter entries={entries} status="loading" onRetry={retry} />);
    expect(screen.getByRole("status").textContent).toBe(workPage.loading);
    expect(screen.queryByRole("article")).toBeNull();
    rerender(<WorkFilter entries={entries} status="error" onRetry={retry} />);
    expect(screen.getByRole("status").textContent).toContain(workPage.error);
    fireEvent.click(screen.getByRole("button", { name: workPage.retry }));
    expect(retry).toHaveBeenCalledOnce();
    rerender(<WorkFilter entries={entries} status="ready" />);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("recovers a failed client render through the error boundary", () => {
    let fail = true;
    function FailingFilter() {
      if (fail) throw new Error("Test render failure");
      return <WorkFilter entries={entries} />;
    }
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<WorkFilterBoundary><FailingFilter /></WorkFilterBoundary>);
    expect(screen.getByText(workPage.error)).toBeTruthy();
    fail = false;
    fireEvent.click(screen.getByRole("button", { name: workPage.retry }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
});
