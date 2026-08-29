import {
  archShapeOptions,
  corniceDecorOptions,
  floorMaterialOptions,
  gableMaterialOptions,
  gableShapeOptions,
  pentRoofOptions,
  sideDormerStyleOptions,
  turretRoofOptions,
  windowGlassOptions,
  windowMuntinOptions,
  windowShapeOptions,
  windowShutterOptions,
  type SelectOption
} from './render-options';

export interface CameraState {
  zoom: number;
  panX: number;
  panY: number;
}

export interface FloorState {
  style: string;
  material: string;
  height: string;
  overhang: string;
  decorH?: string;
  arches: string;
  archType?: string;
  turret?: string;
  oriel?: string;
  decor?: string;
  decorFill?: string;
  pentRoof?: string;
}

export interface GableState {
  shape: string;
  mat: string;
  style: string;
  pitch: string;
  steps: string;
  stepHeight: string;
  stepH?: string;
  tiers: string;
}

export interface GeneratorState {
  version?: string;
  rows: string;
  cols: string;
  thick: string;
  sockel?: boolean;
  sockelH?: string;
  sockelStyle?: string;
  sockelQuader?: string;
  ruine?: string;
  doorType?: string;
  doorFrame?: string;
  doorPos?: string;
  egCorners?: string;
  egCornersSide?: string;
  winFrame?: boolean;
  hasGable?: boolean;
  gableCount?: string;
  sideDormerCount?: string;
  sideDormerStyle?: string;
  sideDormerX?: string;
  roofOverhang?: string;
  cornice?: string;
  corniceH?: string;
  hasDormer?: boolean;
  dormShape?: string;
  dormSteps?: string;
  dormStepH?: string;
  dormWin?: boolean;
  dormStyle?: string;
  dormArchCount?: string;
  dormArchType?: string;
  dormGable?: string;
  dormerW?: string;
  dormerH?: string;
  dormPitch?: string;
  dormTiers?: string;
  winDens?: string;
  winRandom?: string;
  winSprossenThick?: string;
  winPatternScale?: string;
  winStyle?: string;
  winSprossen?: string;
  winGlass?: string;
  winShutters?: string;
  winShutterColor?: string;
  globalDecor?: string;
  decorScheme?: string;
  warp?: string;
  asym?: string;
  turretW?: string;
  turretStyle?: string;
  turretRoofStyle?: string;
  timberPreset?: string;
  plasterColor?: string;
  plasterColor2?: string;
  stoneColor?: string;
  turretRoofColor?: string;
  gableColor?: string;
  turretColor?: string;
  dormerColor?: string;
  cam?: CameraState;
  floors?: FloorState[];
  gables?: GableState[];
  [key: string]: unknown;
}

export type LegacyGeneratorStateInput = Partial<Omit<GeneratorState, 'floors' | 'gables'>> & {
  floors?: Partial<FloorState>[];
  gables?: Partial<GableState>[];
};

export function normalizeLegacyState(input: LegacyGeneratorStateInput | null | undefined): GeneratorState {
  const state = input ?? {};
  return {
    ...state,
    version: typeof state.version === 'string' ? state.version : '0.8.0',
    rows: String(state.rows ?? '4'),
    cols: String(state.cols ?? '10'),
    thick: String(state.thick ?? '7'),
    sockel: toBoolean(state.sockel, true),
    sockelH: toStringValue(state.sockelH, '40'),
    sockelStyle: toStringValue(state.sockelStyle, 'stein_gerade'),
    sockelQuader: toStringValue(state.sockelQuader, 'none'),
    ruine: toStringValue(state.ruine, 'none'),
    doorType: toStringValue(state.doorType, 'einzeltuer'),
    doorFrame: toStringValue(state.doorFrame, 'holz'),
    doorPos: toStringValue(state.doorPos, '2'),
    egCorners: toStringValue(state.egCorners, 'gerade'),
    egCornersSide: toStringValue(state.egCornersSide, 'both'),
    winFrame: toBoolean(state.winFrame, true),
    hasGable: toBoolean(state.hasGable, true),
    gableCount: toStringValue(state.gableCount, '1'),
    sideDormerCount: toStringValue(state.sideDormerCount, '0'),
    sideDormerStyle: normalizeSelectValue(state.sideDormerStyle, sideDormerStyleOptions, 'fledermaus'),
    sideDormerX: toStringValue(state.sideDormerX, '10'),
    roofOverhang: toStringValue(state.roofOverhang, '10'),
    cornice: normalizeSelectValue(state.cornice, corniceDecorOptions, 'none'),
    corniceH: toStringValue(state.corniceH, '45'),
    hasDormer: toBoolean(state.hasDormer, true),
    dormShape: normalizeSelectValue(state.dormShape, gableShapeOptions, 'halbwalm'),
    dormSteps: toStringValue(state.dormSteps, '5'),
    dormStepH: toStringValue(state.dormStepH, '0.95'),
    dormWin: toBoolean(state.dormWin, true),
    dormStyle: toStringValue(state.dormStyle, 'skelett'),
    dormArchCount: toStringValue(state.dormArchCount, '3'),
    dormArchType: normalizeSelectValue(state.dormArchType, archShapeOptions, 'spitz'),
    dormGable: toStringValue(state.dormGable, 'leer'),
    dormerW: toStringValue(state.dormerW, '1'),
    dormerH: toStringValue(state.dormerH, '0.35'),
    dormPitch: toStringValue(state.dormPitch, '1.1'),
    dormTiers: toStringValue(state.dormTiers, '1'),
    winDens: toStringValue(state.winDens, '40'),
    winRandom: toStringValue(state.winRandom, '0'),
    winSprossenThick: toStringValue(state.winSprossenThick, '40'),
    winPatternScale: toStringValue(state.winPatternScale, '100'),
    winStyle: normalizeSelectValue(state.winStyle, windowShapeOptions, 'quadrat'),
    winSprossen: normalizeSelectValue(state.winSprossen, windowMuntinOptions, 'keine'),
    winGlass: normalizeSelectValue(state.winGlass, windowGlassOptions, 'altglas'),
    winShutters: normalizeSelectValue(state.winShutters, windowShutterOptions, 'keine'),
    winShutterColor: toStringValue(state.winShutterColor, '#446c79'),
    globalDecor: String(state.globalDecor ?? '0'),
    decorScheme: String(state.decorScheme ?? 'hist1'),
    warp: toStringValue(state.warp, '0'),
    asym: toStringValue(state.asym, '0'),
    turretW: toStringValue(state.turretW, '1.4'),
    turretStyle: toStringValue(state.turretStyle, 'manbrust'),
    turretRoofStyle: normalizeSelectValue(state.turretRoofStyle, turretRoofOptions, 'spitz'),
    timberPreset: toStringValue(state.timberPreset, 'custom'),
    plasterColor: toStringValue(state.plasterColor, '#fdfbf7'),
    plasterColor2: toStringValue(state.plasterColor2, '#eed4a4'),
    stoneColor: toStringValue(state.stoneColor, '#b0b2bf'),
    turretRoofColor: toStringValue(state.turretRoofColor, '#475569'),
    gableColor: toStringValue(state.gableColor, '#fdfbf7'),
    turretColor: toStringValue(state.turretColor, '#fdfbf7'),
    dormerColor: toStringValue(state.dormerColor, '#fdfbf7'),
    cam: normalizeCameraState(state.cam),
    floors: Array.isArray(state.floors) ? state.floors.map(normalizeFloorState) : [],
    gables: Array.isArray(state.gables) ? state.gables.map(normalizeGableState) : []
  };
}

export function normalizeCameraState(input: unknown): CameraState {
  const cam = typeof input === 'object' && input !== null ? input as Partial<CameraState> : {};
  return {
    zoom: toFiniteNumber(cam.zoom, 1),
    panX: toFiniteNumber(cam.panX, 0),
    panY: toFiniteNumber(cam.panY, 0)
  };
}

export function parseGeneratorStateJson(json: string): GeneratorState {
  return normalizeLegacyState(JSON.parse(json) as Partial<GeneratorState>);
}

export function serializeGeneratorState(state: Partial<GeneratorState>): string {
  return JSON.stringify(normalizeLegacyState(state), null, 2);
}

function toFiniteNumber(value: unknown, fallback: number): number {
  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeFloorState(input: Partial<FloorState>): FloorState {
  return {
    ...input,
    style: toStringValue(input.style, 'skelett'),
    material: normalizeSelectValue(input.material, floorMaterialOptions, 'plaster'),
    height: toStringValue(input.height, '1.7'),
    overhang: toStringValue(input.overhang, '0'),
    decorH: toStringValue(input.decorH, '30'),
    arches: toStringValue(input.arches, '4'),
    archType: normalizeSelectValue(input.archType, archShapeOptions, 'rund'),
    turret: toStringValue(input.turret, 'none'),
    oriel: toStringValue(input.oriel, 'none'),
    decor: normalizeSelectValue(input.decor, corniceDecorOptions, 'none'),
    decorFill: toStringValue(input.decorFill, 'filled'),
    pentRoof: normalizeSelectValue(input.pentRoof, pentRoofOptions, 'none')
  };
}

function normalizeGableState(input: Partial<GableState>): GableState {
  return {
    ...input,
    shape: normalizeSelectValue(input.shape, gableShapeOptions, 'sattel'),
    mat: normalizeSelectValue(input.mat, gableMaterialOptions, 'plaster'),
    style: toStringValue(input.style, 'fachwerk_classic'),
    pitch: toStringValue(input.pitch, '1.2'),
    steps: toStringValue(input.steps, '5'),
    stepHeight: toStringValue(input.stepHeight ?? input.stepH, '0.95'),
    tiers: toStringValue(input.tiers, '2')
  };
}

function normalizeSelectValue<TFallback extends string>(
  value: unknown,
  options: readonly SelectOption[],
  fallback: TFallback
): string {
  const normalized = toStringValue(value, fallback);
  return options.some((option) => option.value === normalized) ? normalized : fallback;
}

function toStringValue(value: unknown, fallback: string): string {
  return value === undefined || value === null ? fallback : String(value);
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}
