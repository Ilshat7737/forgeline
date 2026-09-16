import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { home } from "@/content/home";
import { homeLayout } from "@/content/home-layout";
import { homeServices } from "@/content/services";
import { Hero } from "./hero";
import { ServicesGrid } from "./services-grid";
import { InsightLinks } from "./insight-links";
import { FeaturedWork } from "./featured-work";
import { StudioStrip } from "./studio-strip";
afterEach(cleanup);

describe("Home composition semantics", () => {
  it("retains the hero wording and gives the cube artwork a single label", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(home.hero.lines.join(" "));
    expect(screen.getByRole("img", { name: homeLayout.cubesLabel })).toBeTruthy();
  });
  it("replaces the accordion with canonical service links", () => {
    render(<ServicesGrid />);
    for (const service of homeServices) {
      const heading = screen.getByRole("heading", { name: service.homeTitle });
      expect(heading.closest("a")?.getAttribute("href")).toBe(`/contact?service=${service.slug}`);
    }
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("link", { name: home.services.all.label }).getAttribute("href")).toBe("/services");
  });
  it("keeps articles non-interactive with the preparation status visible", () => {
    render(<InsightLinks />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
    for (const article of screen.getAllByRole("article")) {
      expect(within(article).queryByRole("link")).toBeNull();
      expect(within(article).getByText(home.insights.status).hasAttribute("hidden")).toBe(false);
      expect(article.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    }
  });
  it("labels concepts and links to existing work anchors", () => {
    render(<FeaturedWork />);
    for (const concept of home.work.concepts) {
      expect(screen.getByRole("heading", { name: concept.title }).closest("a")?.getAttribute("href")).toBe(concept.href);
    }
    expect(screen.getAllByText(home.work.conceptLabel)).toHaveLength(2);
  });
  it("presents the status vignette as a single image, not live progress", () => {
    render(<StudioStrip />);
    const image = screen.getByRole("img", { name: homeLayout.status.label });
    expect(image.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
    expect(within(image).queryByRole("list")).toBeNull();
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.getByRole("link", { name: homeLayout.scroll }).getAttribute("href")).toBe("#about");
  });
});
