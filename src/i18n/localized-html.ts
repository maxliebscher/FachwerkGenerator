const ENGLISH_DESCRIPTION =
  'Create configurable timber-frame facades in your browser and export the result as PNG or JSON.';
const ENGLISH_URL = 'https://fachwerkgenerator.de/en/';
const GERMAN_APP_TITLE = "Max Liebschers' FassadenSchmied: Fachwerk-Generator v0.8";
const ENGLISH_APP_TITLE = "Max Liebscher's FassadenSchmied: Timber-Frame Generator v0.8";

export function createEnglishHtml(source: string): string {
  return source
    .replace(/\r\n?/g, '\n')
    .replace(/<html lang="de">/i, '<html lang="en">')
    .replace(`<title>${GERMAN_APP_TITLE}</title>`, `<title>${ENGLISH_APP_TITLE}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/i, `$1${ENGLISH_DESCRIPTION}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/i, '$1Timber-Frame Generator$2')
    .replace(/(<meta property="og:description" content=")[^"]*(">)/i, `$1${ENGLISH_DESCRIPTION}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(">)/i, `$1${ENGLISH_URL}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/i, `$1${ENGLISH_URL}$2`)
    .replace(/(\b(?:src|href)=")\.\/assets\//g, '$1../assets/')
    .replace(/(\bhref=")\.\/favicon/g, '$1../favicon')
    .replace('data-language="de" aria-label="Deutsch" aria-pressed="true"', 'data-language="de" aria-label="Deutsch" aria-pressed="false"')
    .replace('data-language="en" aria-label="English" aria-pressed="false"', 'data-language="en" aria-label="English" aria-pressed="true"');
}
