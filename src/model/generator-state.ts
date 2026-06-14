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
  stepH: string;
  tiers: string;
}

export interface GeneratorState {
  version?: string;
  rows: string;
  cols: string;
  thick: string;
  globalDecor?: string;
  decorScheme?: string;
  cam?: CameraState;
  floors?: FloorState[];
  gables?: GableState[];
  [key: string]: unknown;
}

export function normalizeLegacyState(input: Partial<GeneratorState> | null | undefined): GeneratorState {
  const state = input ?? {};
  return {
    ...state,
    version: typeof state.version === 'string' ? state.version : '0.7.0-refactor',
    rows: String(state.rows ?? '4'),
    cols: String(state.cols ?? '10'),
    thick: String(state.thick ?? '7'),
    globalDecor: String(state.globalDecor ?? '0'),
    decorScheme: String(state.decorScheme ?? 'hist1'),
    cam: normalizeCameraState(state.cam),
    floors: Array.isArray(state.floors) ? state.floors : [],
    gables: Array.isArray(state.gables) ? state.gables : []
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
