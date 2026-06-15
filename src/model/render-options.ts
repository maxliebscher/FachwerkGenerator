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

export const turretRoofOptions: readonly SelectOption[] = [
  { value: "spitz", label: "Spitz (Normal)" },
  { value: "flach", label: "Zeltdach (Flach)" },
  { value: "krueppel", label: "Krüppelwalm" },
  { value: "barock", label: "Zwiebel / Barock" },
] as const;

export type TurretRoofOption = SelectOptionValue<typeof turretRoofOptions>;

export const windowShapeOptions: readonly SelectOption[] = [
  { value: "quadrat", label: "Eckig (Normal)" },
  { value: "rundbogen", label: "Rundbogen" },
  { value: "spitzbogen", label: "Spitzbogen" },
  { value: "flachbogen", label: "Flachbogen" },
] as const;

export type WindowShapeOption = SelectOptionValue<typeof windowShapeOptions>;

export const windowMuntinOptions: readonly SelectOption[] = [
  { value: "kreuz", label: "Kreuz (+)" },
  { value: "steg", label: "Mittelsteg (|)" },
  { value: "quersteg", label: "Querstrich (-)" },
  { value: "t_form", label: "T-Form (T)" },
  { value: "gitter", label: "Gitter (#)" },
  { value: "rauten", label: "Rauten (Bleiglas)" },
  { value: "butzen", label: "Butzenscheiben" },
  { value: "halbkreis", label: "Halbkreis (Schuppen)" },
  { value: "mix", label: "Mix (Historisch)" },
  { value: "mix_modern", label: "Mix (Modern: Kreuz/Steg/T)" },
  { value: "keine", label: "Keine" },
] as const;

export type WindowMuntinOption = SelectOptionValue<typeof windowMuntinOptions>;

export const windowGlassOptions: readonly SelectOption[] = [
  { value: "hell", label: "Hell (Normal)" },
  { value: "altglas", label: "Altglas (Grünlich)" },
  { value: "abend", label: "Beleuchtet (Warmgelb)" },
  { value: "dunkel", label: "Nacht (Dunkelblau)" },
] as const;

export type WindowGlassOption = SelectOptionValue<typeof windowGlassOptions>;

export const windowShutterOptions: readonly SelectOption[] = [
  { value: "keine", label: "Keine" },
  { value: "z_beschlag", label: "Z-Beschlag (Klassisch)" },
  { value: "lamellen", label: "Lamellen (Süden)" },
  { value: "kassetten", label: "Kassetten (Edel)" },
  { value: "brett", label: "Einfache Bretter" },
] as const;

export type WindowShutterOption = SelectOptionValue<typeof windowShutterOptions>;

export const sideDormerStyleOptions: readonly SelectOption[] = [
  { value: "schlepp", label: "Schleppdach (Flach)" },
  { value: "fledermaus", label: "Fledermaus" },
  { value: "walm", label: "Walmdach" },
  { value: "dreieck", label: "Dreiecksgaube (Spitz)" },
  { value: "rund", label: "Rundbogengaube" },
] as const;

export type SideDormerStyleOption = SelectOptionValue<typeof sideDormerStyleOptions>;

export const archShapeOptions: readonly SelectOption[] = [
  { value: "rund", label: "Rund" },
  { value: "spitz", label: "Spitz" },
  { value: "korb", label: "Korb" },
] as const;

export type ArchShapeOption = SelectOptionValue<typeof archShapeOptions>;

export function stripRepeatedPrefix(label: string, prefix: string): string {
  return label.startsWith(prefix) ? label.slice(prefix.length).trim() : label;
}
