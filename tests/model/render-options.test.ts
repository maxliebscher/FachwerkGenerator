import { describe, expect, it } from "vitest";
import { timberMemberKinds } from "../../src/model/fachwerk-vocabulary";
import {
  archShapeOptions,
  corniceDecorOptions,
  floorMaterialOptions,
  gableMaterialOptions,
  gableShapeOptions,
  pentRoofOptions,
  sideDormerStyleOptions,
  stripRepeatedPrefix,
  renderSelectOptions,
  turretRoofOptions,
  windowGlassOptions,
  windowMuntinOptions,
  windowShapeOptions,
  windowShutterOptions,
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
    expectUniqueOptionValues(turretRoofOptions);
    expectUniqueOptionValues(windowShapeOptions);
    expectUniqueOptionValues(windowMuntinOptions);
    expectUniqueOptionValues(windowGlassOptions);
    expectUniqueOptionValues(windowShutterOptions);
    expectUniqueOptionValues(sideDormerStyleOptions);
    expectUniqueOptionValues(archShapeOptions);
  });

  it("removes only the repeated select prefix", () => {
    expect(stripRepeatedPrefix("Trauf-Gesims: Schiffskehle", "Trauf-Gesims:")).toBe("Schiffskehle");
    expect(stripRepeatedPrefix("Schiffskehle", "Trauf-Gesims:")).toBe("Schiffskehle");
  });

  it("renders cornice options without disabled experimental values", () => {
    const html = renderSelectOptions(corniceDecorOptions, "schiffskehle");

    expect(html).toContain('<option value="schiffskehle" selected>Schiffskehle</option>');
    expect(html).not.toContain("neidkoepfe");
    expect(html).not.toContain("Neidköpfe");
  });

  it("keeps legacy material and roof values available", () => {
    expect(floorMaterialOptions.map((option) => option.value)).toEqual(["plaster", "plaster2", "brick", "stone"]);
    expect(gableMaterialOptions.map((option) => option.value)).toContain("inherit_floor");
    expect(gableShapeOptions.map((option) => option.value)).toContain("krueppel");
    expect(pentRoofOptions.map((option) => option.value)).toContain("full");
    expect(turretRoofOptions.map((option) => option.value)).toEqual(["spitz", "flach", "krueppel", "barock"]);
    expect(windowMuntinOptions.map((option) => option.value)).toContain("t_form");
    expect(sideDormerStyleOptions.map((option) => option.value)).toContain("fledermaus");
    expect(archShapeOptions.map((option) => option.value)).toEqual(["rund", "spitz", "korb"]);
  });

  it("documents core timber member vocabulary", () => {
    expect(timberMemberKinds).toEqual(
      expect.arrayContaining(["schwelle", "raehm", "staender", "riegel", "strebe"]),
    );
  });
});
