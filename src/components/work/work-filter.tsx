"use client";

import { Component, useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { workCategories, workPage, type WorkFilterCategory } from "@/content/work";
import { filterConcepts, getFilterScrollOffset, parseCategory } from "@/lib/work-filter";
import { ConceptGrid, type ConceptGridEntry } from "./concept-grid";
import { WorkStatusMessage, type WorkStatus } from "./work-status";

const categoryEvent = "work-category-change";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(categoryEvent, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(categoryEvent, callback);
  };
}
const getSnapshot = () => parseCategory(new URLSearchParams(window.location.search).get("category"));
const getServerSnapshot = (): WorkFilterCategory => "all";

function selectCategory(category: WorkFilterCategory) {
  const url = new URL(window.location.href);
  if (category === "all") url.searchParams.delete("category");
  else url.searchParams.set("category", category);
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(categoryEvent));
}

export function WorkFilter({ entries, status = "ready", onRetry = () => window.location.reload() }: {
  entries: readonly ConceptGridEntry[];
  status?: WorkStatus;
  onRetry?: () => void;
}) {
  const selected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const button = row.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      row.parentElement?.setAttribute("data-overflow", String(row.scrollWidth > row.clientWidth));
      if (!button) return;
      const left = button.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
      // Assign only the row's offset: instant, including with reduced motion.
      row.scrollLeft = getFilterScrollOffset(row.scrollLeft, row.clientWidth, row.scrollWidth, left, button.offsetWidth);
    };
    update();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(update);
    observer?.observe(row);
    window.addEventListener("resize", update);
    return () => { observer?.disconnect(); window.removeEventListener("resize", update); };
  }, [selected]);
  const visible = filterConcepts(entries, selected);
  return (
    <>
      <div className="work-filter__toolbar">
        <div className="work-filter__fade">
          <div ref={rowRef} className="work-filter" role="group" aria-label={workPage.filterLabel}>
            {workCategories.map((category) => (
              <button key={category.id} type="button" aria-pressed={selected === category.id} aria-controls="concept-grid" onClick={() => selectCategory(category.id)}>{category.label}</button>
            ))}
          </div>
        </div>
        <div className="work-filter__summary">
          <p className="work-filter__count" aria-live="polite" aria-atomic="true">
            {status === "ready" && `${workPage.showing} ${visible.length} ${visible.length === 1 ? workPage.singular : workPage.plural}`}
          </p>
          {status === "ready" && selected === "all" && <p className="work-filter__note">{workPage.featuredNote}</p>}
        </div>
      </div>
      <WorkStatusMessage status={status} onRetry={onRetry} />
      {status === "ready" && visible.length === 0 && (
        <div className="work-status"><p>{workPage.empty}</p><button type="button" className="work-reset" onClick={() => selectCategory("all")}>{workPage.reset}</button></div>
      )}
      <div hidden={status !== "ready"} aria-busy={status === "loading"}>
        <ConceptGrid entries={entries} visibleIds={visible.map((entry) => entry.id)} />
      </div>
    </>
  );
}

export class WorkFilterBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <WorkStatusMessage status="error" onRetry={() => this.setState({ failed: false })} />
      : this.props.children;
  }
}
