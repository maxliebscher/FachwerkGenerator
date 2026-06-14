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
});
