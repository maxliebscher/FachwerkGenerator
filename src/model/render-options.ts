export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export type SelectOptionValue<TOptions extends readonly SelectOption[]> = TOptions[number]["value"];

export const corniceDecorOptions: readonly SelectOption[] = [
  { value: "none", label: "Streben" },
  { value: "knaggen", label: "Vouten-Konsolen" },
  { value: "konsolen", label: "Konsolen" },
  { value: "abgetreppt", label: "Abgetreppt" },
  { value: "schiffskehle", label: "Schiffskehle" },
  { value: "neidkoepfe", label: "Neidköpfe" },
  { value: "stamm_5eck", label: "Balkenköpfe (Spitz/Gotisch)" },
  { value: "stamm_spitz", label: "Balkenköpfe (Massiv/Stumpf)" },
  { value: "stamm_quadrat", label: "Balkenköpfe (Robustes Viereck)" },
  { value: "stamm_rund", label: "Balkenköpfe (Breit & Abgerundet)" },
] as const;

export type CorniceDecorOption = SelectOptionValue<typeof corniceDecorOptions>;

export const floorMaterialOptions: readonly SelectOption[] = [
  { value: "plaster", label: "Putz 1" },
  { value: "plaster2", label: "Putz 2" },
  { value: "brick", label: "Backstein" },
  { value: "stone", label: "Stein" },
] as const;

export type FloorMaterialOption = SelectOptionValue<typeof floorMaterialOptions>;

export const gableMaterialOptions: readonly SelectOption[] = [
  { value: "plaster", label: "Giebelfarbe (Menü)" },
  { value: "plaster1", label: "Putz 1" },
  { value: "plaster2", label: "Putz 2" },
  { value: "brick", label: "Ziegel" },
  { value: "stone", label: "Stein" },
  { value: "inherit_floor", label: "Wie Etage darunter" },
  { value: "roof", label: "Dach-Farbe" },
] as const;

export type GableMaterialOption = SelectOptionValue<typeof gableMaterialOptions>;

export const gableShapeOptions: readonly SelectOption[] = [
  { value: "sattel", label: "Satteldach" },
  { value: "halbwalm", label: "Halbwalm (Dezent)" },
  { value: "krueppel", label: "Krüppelwalm" },
  { value: "mansard", label: "Mansarddach" },
  { value: "stufe", label: "Stufengiebel" },
  { value: "barock", label: "Barockschwung" },
] as const;

export type GableShapeOption = SelectOptionValue<typeof gableShapeOptions>;

export const pentRoofOptions: readonly SelectOption[] = [
  { value: "none", label: "Ohne Dach" },
  { value: "full", label: "Schutzdach (Voll)" },
  { value: "center", label: "Schutzdach (Mitte)" },
  { value: "sides", label: "Schutzdach (Außen)" },
  { value: "left", label: "Dach (Nur L)" },
  { value: "right", label: "Dach (Nur R)" },
] as const;

export type PentRoofOption = SelectOptionValue<typeof pentRoofOptions>;

export function stripRepeatedPrefix(label: string, prefix: string): string {
  return label.startsWith(prefix) ? label.slice(prefix.length).trim() : label;
}
