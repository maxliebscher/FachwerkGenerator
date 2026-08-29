import { EN_TRANSLATIONS, KEY_TRANSLATIONS } from './translations';

export type SupportedLanguage = 'de' | 'en';

const STORAGE_KEY = 'fachwerkgenerator.language';
const supportedLanguages: readonly SupportedLanguage[] = ['de', 'en'];
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ['title', 'aria-label', 'placeholder'] as const;
const germanSourceByEnglishText = new Map(
  Object.entries(EN_TRANSLATIONS).map(([german, english]) => [english, german])
);

let currentLanguage: SupportedLanguage = 'de';
let observer: MutationObserver | null = null;
let originalTitle = '';

export function resolveInitialLanguage(
  search: string,
  storedLanguage: string | null,
  browserLanguages: readonly string[],
  pathname = ''
): SupportedLanguage {
  const queryLanguage = new URLSearchParams(search).get('lang');
  if (isSupportedLanguage(queryLanguage)) return queryLanguage;
  if (isEnglishPath(pathname)) return 'en';
  if (isSupportedLanguage(storedLanguage)) return storedLanguage;
  return browserLanguages.some((language) => language.toLowerCase().startsWith('de')) ? 'de' : 'en';
}

export function initializeI18n(): SupportedLanguage {
  let storedLanguage: string | null = null;
  try {
    storedLanguage = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    storedLanguage = null;
  }
  currentLanguage = resolveInitialLanguage(
    window.location.search,
    storedLanguage,
    window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language],
    window.location.pathname
  );
  originalTitle = currentLanguage === 'en'
    ? germanSourceByEnglishText.get(document.title) ?? document.title
    : document.title;
  document.documentElement.lang = currentLanguage;
  replaceLanguageUrl(currentLanguage);
  return currentLanguage;
}

export function activateI18n(): void {
  bindLanguageSwitcher();
  applyDocumentLanguage(document);
  observer?.disconnect();
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => applyDocumentLanguage(node));
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function getCurrentLanguage(): SupportedLanguage {
  return currentLanguage;
}

export function setLanguage(language: SupportedLanguage): void {
  if (!isSupportedLanguage(language)) return;
  currentLanguage = language;
  document.documentElement.lang = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Local storage can be unavailable for hardened or file:// browser contexts.
  }
  replaceLanguageUrl(language);
  applyDocumentLanguage(document);
  window.dispatchEvent(new CustomEvent('fachwerk:languagechange', { detail: { language } }));
}

export function translateSourceText(source: string, language = currentLanguage): string {
  if (language === 'de') return source;
  const direct = EN_TRANSLATIONS[source];
  if (direct) return direct;

  const prefixedLabel = /^([^\p{L}\p{N}]*)([\p{L}\p{N}].*)$/u.exec(source);
  if (prefixedLabel) {
    const translatedLabel = EN_TRANSLATIONS[prefixedLabel[2]];
    if (translatedLabel) return `${prefixedLabel[1]}${translatedLabel}`;
  }

  const gableMatch = /^Giebel\s+(\d+)$/.exec(source);
  if (gableMatch) return `Gable ${gableMatch[1]}`;
  const upperStoreyMatch = /^(\d+)\.\s*OG$/.exec(source);
  if (upperStoreyMatch) return `Upper storey ${upperStoreyMatch[1]}`;
  if (source === 'EG') return 'Ground floor';

  return source;
}

export function applyDocumentLanguage(root: Node): void {
  for (const element of collectElements(root)) translateKeyedElement(element);
  for (const textNode of collectTextNodes(root)) translateTextNode(textNode);
  for (const element of collectElements(root)) translateElementAttributes(element);

  if (root === document || root === document.documentElement) {
    document.title = translateSourceText(originalTitle || document.title, currentLanguage);
  }
  updateLanguageSwitcher();
}

function bindLanguageSwitcher(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.language;
      if (isSupportedLanguage(language)) setLanguage(language);
    });
  });
}

function updateLanguageSwitcher(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.setAttribute('aria-pressed', String(active));
  });
}

function translateTextNode(node: Text): void {
  const parent = node.parentElement;
  if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) return;
  if (parent.closest('[data-i18n-key]')) return;
  const source = originalText.get(node) ?? node.textContent ?? '';
  if (!originalText.has(node)) originalText.set(node, source);
  const trimmed = source.trim();
  if (!trimmed) return;
  const translated = translateSourceText(trimmed, currentLanguage);
  node.textContent = translated === trimmed ? source : source.replace(trimmed, translated);
}

function translateKeyedElement(element: Element): void {
  const key = element.getAttribute('data-i18n-key');
  if (!key) return;
  const translation = KEY_TRANSLATIONS[key]?.[currentLanguage];
  if (translation !== undefined) element.textContent = translation;
}

function translateElementAttributes(element: Element): void {
  let originals = originalAttributes.get(element);
  if (!originals) {
    originals = new Map<string, string>();
    originalAttributes.set(element, originals);
  }
  for (const attribute of translatedAttributes) {
    const value = element.getAttribute(attribute);
    if (value !== null && !originals.has(attribute)) originals.set(attribute, value);
    const source = originals.get(attribute);
    if (source !== undefined) element.setAttribute(attribute, translateSourceText(source, currentLanguage));
  }
}

function collectTextNodes(root: Node): Text[] {
  const nodes: Text[] = [];
  if (root.nodeType === Node.TEXT_NODE) nodes.push(root as Text);
  if (root.nodeType !== Node.TEXT_NODE) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  }
  return nodes;
}

function collectElements(root: Node): Element[] {
  const elements: Element[] = [];
  if (root instanceof Element) elements.push(root);
  if ('querySelectorAll' in root) {
    elements.push(...Array.from((root as ParentNode).querySelectorAll('*')));
  }
  return elements;
}

function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage);
}

function isEnglishPath(pathname: string): boolean {
  return /(?:^|\/)en(?:\/|$)/i.test(pathname);
}

function localizedPathname(pathname: string, language: SupportedLanguage): string {
  const withoutEnglishSegment = pathname.replace(/\/en(?:\/|$)/i, '/');
  if (language === 'de') return withoutEnglishSegment;
  const base = withoutEnglishSegment.endsWith('/') ? withoutEnglishSegment : `${withoutEnglishSegment}/`;
  return `${base}en/`.replace(/\/+/g, '/');
}

function replaceLanguageUrl(language: SupportedLanguage): void {
  try {
    const url = new URL(window.location.href);
    if (['http:', 'https:'].includes(url.protocol)) {
      url.searchParams.delete('lang');
      url.pathname = localizedPathname(url.pathname, language);
    } else {
      url.searchParams.set('lang', language);
    }
    window.history.replaceState(window.history.state, '', url);
  } catch {
    // Language switching still works when the current URL cannot be rewritten.
  }
}
