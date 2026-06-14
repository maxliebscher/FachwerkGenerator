export const timberMemberKinds = [
  "schwelle",
  "raehm",
  "staender",
  "riegel",
  "strebe",
  "kopfband",
  "fussband",
  "balkenkopf",
] as const;

export type TimberMemberKind = (typeof timberMemberKinds)[number];

export const infillKinds = ["putz", "stein", "ziegel", "lehm"] as const;

export type InfillKind = (typeof infillKinds)[number];

export const structuralGuidelines = {
  infillIsNonStructural: true,
  boundaryMembers: ["schwelle", "raehm"],
  openingMembers: ["staender", "sturzriegel", "bruestungsriegel"],
  bracingMembers: ["strebe", "kopfband", "fussband"],
} as const;
