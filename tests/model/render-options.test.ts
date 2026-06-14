import { describe, expect, it } from "vitest";
import { timberMemberKinds } from "../../src/model/fachwerk-vocabulary";
import { corniceDecorOptions, stripRepeatedPrefix } from "../../src/model/render-options";

describe("render options", () => {
  it("keeps cornice decor option values unique", () => {
    const values = corniceDecorOptions.map((option) => option.value);

    expect(new Set(values).size).toBe(values.length);
  });

  it("removes only the repeated select prefix", () => {
    expect(stripRepeatedPrefix("Trauf-Gesims: Schiffskehle", "Trauf-Gesims:")).toBe("Schiffskehle");
    expect(stripRepeatedPrefix("Schiffskehle", "Trauf-Gesims:")).toBe("Schiffskehle");
  });

  it("documents core timber member vocabulary", () => {
    expect(timberMemberKinds).toEqual(
      expect.arrayContaining(["schwelle", "raehm", "staender", "riegel", "strebe"]),
    );
  });
});
