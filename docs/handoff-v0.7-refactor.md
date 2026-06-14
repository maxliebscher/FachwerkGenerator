# FachwerkGenerator v0.7_refactor Handoff

## Ziel

v0.7_refactor baut die letzte manuell erstellte Stable `Fachwerkgenerator_v0.6.7.8_stable.html` als statisch deploybare Vite/TypeScript-Version neu auf. Der Fokus liegt auf Funktionsgleichheit, besserer Projektstruktur und prüfbaren Kernflows, nicht auf neuen Produktfunktionen.

## Aktueller Stand

- Arbeitsbranch lokal: `v0.7-refactor`.
- Keine Commits, kein Push, keine PR, kein GitHub-Release.
- Demo/Build:
  - Entwicklung: `npm.cmd run dev`
  - Build: `npm.cmd run build`
  - Preview: `npm.cmd run preview -- --host 127.0.0.1 --port 4174`
  - Smoke: `npm.cmd run smoke`
- Das statische Build-Artefakt liegt in `dist/`.

## Struktur

- `index.html`: aus der Stable extrahiertes UI-Markup, Versionstitel auf `v0.7_refactor` gesetzt.
- `src/app/legacy-runtime.ts`: mechanisch extrahierter Canvas-/DOM-Runtime-Block aus v0.6.7.8. Für Parität bewusst gekapselt und mit `@ts-nocheck`, weil der Originalcode viele implizite DOM-/Global-Annahmen enthält.
- `src/ui/info-modal.ts`: extrahiertes Info-Modal-Skript.
- `src/styles/app.css`: extrahierte Stable-CSS-Regeln plus schmale responsive Korrektur für Mobile-Viewports.
- `src/model/generator-state.ts`: typisierte State-/JSON-Kompatibilitätshelfer für v0.6.x-Importe und v0.7-Weiterarbeit.
- `tests/model/generator-state.test.ts`: Unit-Tests für Legacy-State-Normalisierung, JSON-Roundtrip und Kamera-Fallbacks.
- `tests/e2e/fachwerk-smoke.spec.ts`: Playwright-Smoke mit realen UI-Aktionen, Canvas-Pixelcheck, Export und Import-Roundtrip.

## Bewusste Entscheidungen

- Der Renderer wurde zuerst verhaltensgleich gekapselt statt komplett neu erfunden. Das reduziert Refactor-Risiko und erhält den bestehenden Funktionsumfang.
- Zwei implizite Globals aus der Stable (`savedFloorStates`, `savedGableStates`) wurden im Runtime-Modul explizit deklariert, weil Module sonst strikt ausführen und die Renderkette bricht.
- Doppelte Exportfelder `globalDecor` und `decorScheme` wurden bereinigt. Das ändert die effektive JSON-Bedeutung nicht, entfernt aber Build-Warnungen.
- Ein kaputter statischer HTML-Template-Ausdruck im Dormer-Select wurde entfernt.
- Mobile-Layout: unter 760px stapeln Sidebar und Canvas. Die Header-Farbzeile scrollt intern statt die ganze Seite horizontal zu verbreitern.
- Tailwind läuft aktuell noch über CDN wie in der Stable. Vite warnt deshalb in der Browser-Konsole. Für eine spätere Produktionshärtung sollte Tailwind lokal gebaut werden.

## Verifikation

Zuletzt erfolgreich:

- `npm.cmd test`: 1 Testdatei, 3 Tests bestanden.
- `npm.cmd run build`: TypeScript + Vite Build erfolgreich.
- `npm.cmd run smoke`: 1 Playwright-Smoke bestanden.
- Browser-QA über lokale Preview `http://127.0.0.1:4174/`:
  - Desktop: UI sichtbar, Canvas gerendert, Slider `Geschosse`/`Gefache` ändern State und Canvas bleibt sichtbar.
  - Mobile 390x844: keine Seiten-Überbreite mehr (`bodyScrollWidth 384`, `viewportWidth 390`), Canvas bleibt vorhanden.

Screenshots wurden außerhalb des Repos abgelegt:

- `C:\Users\nimdas\AppData\Local\Temp\fachwerk-v07-desktop.png`
- `C:\Users\nimdas\AppData\Local\Temp\fachwerk-v07-mobile-fixed-2.png`

## Bekannte Restpunkte

- `src/app/legacy-runtime.ts` ist noch ein großer Paritätsblock. Nächste Refactor-Runs sollten einzelne Renderfamilien testgetrieben aus diesem Modul herauslösen.
- Tailwind-CDN-Warnung bleibt sichtbar und sollte in einem separaten Produktionshärtungs-Branch durch lokales Tailwind/PostCSS ersetzt werden.
- `npm install` meldet zwei high-severity Audit-Funde in der Dev-Toolchain. Nicht automatisch mit `npm audit fix --force` behoben, weil das Breaking Changes erzwingen kann.
- Keine GitHub-Aktion ausführen ohne neue eindeutige Bestätigung.
