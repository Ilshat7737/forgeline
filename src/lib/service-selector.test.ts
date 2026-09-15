import { describe, expect, it } from "vitest";
import { groupsForSituation } from "./service-selector";

describe("situation to service groups", () => {
  it("connects building a product to strategy and engineering", () => {
    expect(groupsForSituation("build")).toEqual(["product", "engineering"]);
  });
  it("connects existing systems to engineering and modernization", () => {
    expect(groupsForSituation("improve")).toEqual(["engineering", "systems"]);
  });
  it("connects team support to people and ownership", () => {
    expect(groupsForSituation("strengthen")).toEqual(["team"]);
  });
});
