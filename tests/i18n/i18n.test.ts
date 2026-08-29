import { describe, expect, it } from 'vitest';
import {
  resolveInitialLanguage,
  translateSourceText,
  type SupportedLanguage
} from '../../src/i18n/i18n';

describe('i18n language resolution', () => {
  it('prefers an explicit query parameter over stored and browser language', () => {
    expect(resolveInitialLanguage('?lang=en', 'de', ['de-DE'])).toBe('en');
    expect(resolveInitialLanguage('?lang=de', 'en', ['en-US'])).toBe('de');
  });

  it('uses the stored choice before browser detection', () => {
    expect(resolveInitialLanguage('', 'en', ['de-DE'])).toBe('en');
  });

  it('treats the /en/ entry point as an explicit language choice', () => {
    expect(resolveInitialLanguage('', 'de', ['de-DE'], '/en/')).toBe('en');
  });

  it('defaults German browsers to German and other browsers to English', () => {
    expect(resolveInitialLanguage('', null, ['de-AT', 'en'])).toBe('de');
    expect(resolveInitialLanguage('', null, ['en-GB'])).toBe('en');
  });
});

describe('architectural terminology', () => {
  const en: SupportedLanguage = 'en';

  it('uses established English timber-frame terminology', () => {
    expect(translateSourceText('Gefache', en)).toBe('Infill bays');
    expect(translateSourceText('Vorkragung', en)).toBe('Jetty projection');
    expect(translateSourceText('Traufgesimse', en)).toBe('Eaves cornice');
    expect(translateSourceText('Zwerchhaus (Dormer)', en)).toBe('Cross-gable (wall dormer)');
  });

  it('retains regional German terms where no exact equivalent exists', () => {
    expect(translateSourceText('Schiffskehle', en)).toBe('Schiffskehle (carved cove)');
    expect(translateSourceText('Hessenmann', en)).toBe('Hessenmann bracing');
    expect(translateSourceText('Wilder Mann (Authentisch)', en)).toBe('Wilder Mann bracing (authentic)');
  });

  it('translates dynamic floor and gable labels', () => {
    expect(translateSourceText('Giebel 3', en)).toBe('Gable 3');
    expect(translateSourceText('2. OG', en)).toBe('Upper storey 2');
    expect(translateSourceText('EG', en)).toBe('Ground floor');
  });

  it('preserves icon prefixes while translating their labels', () => {
    expect(translateSourceText('🎲 Zufall', en)).toBe('🎲 Randomise');
    expect(translateSourceText('🖼️ Bild speichern', en)).toBe('🖼️ Save image');
  });

  it('returns the German source unchanged in German mode', () => {
    expect(translateSourceText('Krüppelwalm', 'de')).toBe('Krüppelwalm');
  });
});
