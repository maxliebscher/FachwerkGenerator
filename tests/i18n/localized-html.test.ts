import { describe, expect, it } from 'vitest';
import { createEnglishHtml } from '../../src/i18n/localized-html';

describe('English static entry point', () => {
  it('creates English metadata and keeps built assets reachable from /en/', () => {
    const source = `<!doctype html>
      <html lang="de">
      <head>
        <title>Max Liebschers' FassadenSchmied: Fachwerk-Generator v0.8</title>
        <meta name="description" content="Deutsche Beschreibung">
        <meta property="og:title" content="Fachwerk-Generator">
        <meta property="og:description" content="Deutsche Beschreibung">
        <meta property="og:url" content="https://fachwerkgenerator.de/">
        <link rel="canonical" href="https://fachwerkgenerator.de/">
        <link rel="icon" href="./favicon.svg">
        <script type="module" src="./assets/index-abc.js"></script>
      </head>
      <body><h1>Max Liebschers' FassadenSchmied: Fachwerk-Generator v0.8</h1></body>
      </html>`;

    const english = createEnglishHtml(source.replace(/\n/g, '\r\n'));

    expect(english).toContain('<html lang="en">');
    expect(english).not.toContain('\r');
    expect(english).toContain("<title>Max Liebscher's FassadenSchmied: Timber-Frame Generator v0.8</title>");
    expect(english).toContain("<h1>Max Liebschers' FassadenSchmied: Fachwerk-Generator v0.8</h1>");
    expect(english).toContain('https://fachwerkgenerator.de/en/');
    expect(english).toContain('src="../assets/index-abc.js"');
    expect(english).toContain('href="../favicon.svg"');
  });
});
