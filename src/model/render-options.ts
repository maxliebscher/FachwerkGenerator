export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

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

export function stripRepeatedPrefix(label: string, prefix: string): string {
  return label.startsWith(prefix) ? label.slice(prefix.length).trim() : label;
}
