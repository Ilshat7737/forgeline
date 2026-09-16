import { describe, expect, it } from "vitest";
import { REVEAL_SELECTOR, revealDelay } from "./reveal";

describe("reveal delay", () => {
  it("gives the first child no delay", () => {
    expect(revealDelay(0)).toBe(0);
  });

  it("steps later children by 60ms", () => {
    expect(revealDelay(1)).toBe(60);
    expect(revealDelay(3)).toBe(180);
  });

  it("caps the wait so long grids stay responsive", () => {
    expect(revealDelay(6)).toBe(360);
    expect(revealDelay(13)).toBe(360);
  });

  it("ignores negative, fractional and invalid indexes", () => {
    expect(revealDelay(-2)).toBe(0);
    expect(revealDelay(2.9)).toBe(120);
    expect(revealDelay(Number.NaN)).toBe(0);
  });

  it("targets only the direct children of a revealing group", () => {
    expect(REVEAL_SELECTOR).toBe("[data-reveal-group] > *, [data-reveal='stagger'] > *");
  });
});
