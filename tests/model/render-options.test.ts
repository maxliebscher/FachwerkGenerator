import { describe, expect, it } from "vitest";
import { timberMemberKinds } from "../../src/model/fachwerk-vocabulary";
import {
  corniceDecorOptions,
  floorMaterialOptions,
  gableMaterialOptions,
  gableShapeOptions,
  pentRoofOptions,
  stripRepeatedPrefix,
} from "../../src/model/render-options";

function expectUniqueOptionValues(options: readonly { value: string }[]): void {
  const values = options.map((option) => option.value);

  expect(new Set(values).size).toBe(values.length);
}

describe("render options", () => {
  it("keeps option values unique", () => {
    expectUniqueOptionValues(corniceDecorOptions);
    expectUniqueOptionValues(floorMaterialOptions);
    expectUniqueOptionValues(gableMaterialOptions);
    expectUniqueOptionValues(gableShapeOptions);
    expectUniqueOptionValues(pentRoofOptions);
  });

  it("removes only the repeated select prefix", () => {
    expect(stripRepeatedPrefix("Trauf-Gesims: Schiffskehle", "Trauf-Gesims:")).toBe("Schiffskehle");
    expect(stripRepeatedPrefix("Schiffskehle", "Trauf-Gesims:")).toBe("Schiffskehle");
  });

  it("keeps legacy material and roof values available", () => {
    expect(floorMaterialOptions.map((option) => option.value)).toEqual(["plaster", "plaster2", "brick", "stone"]);
    expect(gableMaterialOptions.map((option) => option.value)).toContain("inherit_floor");
    expect(gableShapeOptions.map((option) => option.value)).toContain("krueppel");
    expect(pentRoofOptions.map((option) => option.value)).toContain("full");
  });

  it("documents core timber member vocabulary", () => {
    expect(timberMemberKinds).toEqual(
      expect.arrayContaining(["schwelle", "raehm", "staender", "riegel", "strebe"]),
    );
  });
});
