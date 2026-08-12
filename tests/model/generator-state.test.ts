import { describe, expect, it } from 'vitest';
import {
  normalizeCameraState,
  normalizeLegacyState,
  parseGeneratorStateJson,
  serializeGeneratorState
} from '../../src/model/generator-state';

describe('generator state compatibility', () => {
  it('normalizes old exports with missing optional fields', () => {
    const state = normalizeLegacyState({ rows: 3 as unknown as string, cols: '8', thick: undefined });

    expect(state.rows).toBe('3');
    expect(state.cols).toBe('8');
    expect(state.thick).toBe('7');
    expect(state.globalDecor).toBe('0');
    expect(state.decorScheme).toBe('hist1');
    expect(state.floors).toEqual([]);
    expect(state.gables).toEqual([]);
  });

  it('keeps legacy decorative fields stable through JSON roundtrip', () => {
    const parsed = parseGeneratorStateJson('{"rows":"4","cols":"10","thick":"7","globalDecor":"35","decorScheme":"hist1"}');
    const serialized = serializeGeneratorState(parsed);

    expect(JSON.parse(serialized)).toMatchObject({
      rows: '4',
      cols: '10',
      thick: '7',
      globalDecor: '35',
      decorScheme: 'hist1'
    });
  });

  it('coerces invalid camera values to safe defaults', () => {
    expect(normalizeCameraState({ zoom: '2.5', panX: 'bad', panY: -20 })).toEqual({
      zoom: 2.5,
      panX: 0,
      panY: -20
    });
  });

  it('normalizes exported runtime fields with safe defaults', () => {
    const state = normalizeLegacyState({
      timberPreset: undefined,
      plasterColor: undefined,
      sockel: undefined,
      sockelStyle: undefined,
      hasGable: undefined,
      gableCount: undefined,
      cornice: undefined,
      dormShape: undefined,
      winStyle: undefined,
      winSprossen: undefined
    });

    expect(state).toMatchObject({
      timberPreset: 'custom',
      plasterColor: '#fdfbf7',
      sockel: true,
      sockelStyle: 'stein_gerade',
      hasGable: true,
      gableCount: '1',
      cornice: 'none',
      dormShape: 'halbwalm',
      winStyle: 'quadrat',
      winSprossen: 'keine'
    });
  });

  it('maps disabled decorative values to selectable fallbacks on import', () => {
    const state = normalizeLegacyState({
      cornice: 'neidkoepfe',
      floors: [
        { style: 'skelett', material: 'plaster', height: '1.7', overhang: '12', decor: 'neidkoepfe', arches: '4' }
      ]
    });

    expect(state.cornice).toBe('none');
    expect(state.floors?.[0]?.decor).toBe('none');
  });

  it('preserves floor and gable state shape across legacy aliases', () => {
    const state = normalizeLegacyState({
      floors: [
        { style: undefined as unknown as string, material: 'stone', height: 1.8 as unknown as string, overhang: 22 as unknown as string }
      ],
      gables: [
        { shape: 'krueppel', mat: 'inherit_floor', style: 'leer', pitch: 1.4 as unknown as string, steps: 6 as unknown as string, stepHeight: 0.8 as unknown as string, tiers: 2 as unknown as string }
      ]
    });

    expect(state.floors?.[0]).toMatchObject({
      style: 'skelett',
      material: 'stone',
      height: '1.8',
      overhang: '22',
      decor: 'none',
      arches: '4'
    });
    expect(state.gables?.[0]).toMatchObject({
      shape: 'krueppel',
      mat: 'inherit_floor',
      style: 'leer',
      pitch: '1.4',
      steps: '6',
      stepHeight: '0.8',
      tiers: '2'
    });
  });
});
