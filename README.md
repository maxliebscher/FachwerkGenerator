# FassadenSchmied: Fachwerk-Generator 🏡

[![Website](https://img.shields.io/badge/Website-fachwerkgenerator.de-blue)](https://fachwerkgenerator.de)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> 🇬🇧 **English version:** The generator includes a carefully translated English interface at **[fachwerkgenerator.de/en/](https://fachwerkgenerator.de/en/)**. The language can also be changed directly in the toolbar.


**[Fachwerkgenerator.de](https://fachwerkgenerator.de)** ist ein browserbasiertes Open-Source-Tool zur visuellen Gestaltung, Erforschung und Konzeption harmonischer Fachwerk-Strukturen. Es ist Teil des Architektur-Ästhetik-Projekts **FassadenSchmied**.

---
### 💻 Screenshot aus dem Generator
<p align="center">
  <img src="screenshot-1.jpg" alt="Beispiel aus dem Fachwerkgenerator" width="98%"/>
</p>

### 📸 Nach der Erstellung: Von der Skizze zum Rendering
</p>
<p align="center">
  <img src="Vorlage-zu-KI_2.jpg" alt="Iterationen aus Quellbild" width="98%"/>
</p>
<p align="center">
  <img src="Vorlage-zu-KI_3.jpg" alt="Beispiele aus dem Generator unter Nutzung von 'NanoBanana 2 Pro" width="49%"/>
  <img src="Vorlage-zu-KI_1.jpg" alt="" width="49%"/>


---

### ✨ Features
* **Live-Generierung:** Anpassung von Reihen, Spalten, Balkendicke, Etagenhöhen und Überhängen in Echtzeit.
* **Architektonische Vielfalt:** Integration von Giebeln, Gauben (Fledermausgauben, Walmgauben etc.), Sockeln, Türen und Fensterstilen.
* **Farb- & Materialkontrolle:** Auswahl von typischen Fachwerk-Holzfarben sowie freie Definition von Putzfarben und Dachmaterialien.
* **Inspiration:** Ein Zufalls-Modus erzeugt prozedural generierte Fachwerk-Kombinationen als kreativen Startpunkt.
* **100% Client-Side:** Vollständige lokale Ausführung direkt im Webbrowser. Es werden keine Nutzer- oder Formulardaten an Server gesendet.

### ⚠️ Bekannte Limitierungen & Haftungsausschluss
Dieses Modul dient **ausschließlich der visuellen Gestaltung und Konzeptentwicklung**. 
* Es ersetzt **keine statische oder bauplanerische Prüfung**.
* Generierte Entwürfe sind visuelle Ideen, keine Baupläne.
* Es gibt keine Garantie für die durchweg korrekte Verwendung historischer architektonischer Fachbegriffe (z.B. "Wilder Mann", "Knaggen").

### 🚀 Nutzung & Lokale Entwicklung
1. Die aktuellste, vollumfängliche Version ist direkt im Browser nutzbar unter: **[fachwerkgenerator.de](https://fachwerkgenerator.de)**
2. Für den Einstieg stehen reduzierte Basis-Versionen zur Verfügung:
   * [Demo 1: Minimal-Modul](https://fachwerkgenerator.de/demo-1.html)
   * [Demo 2: Erweitertes Basis-Modul](https://fachwerkgenerator.de/demo-2.html)
3. Für die lokale Entwicklung: `npm install`, danach `npm run dev`.
4. `npm run build` erzeugt die statisch hostbare Website in `dist/`. Wegen der gebündelten JavaScript-Module muss sie über einen Webserver ausgeliefert werden; das direkte Öffnen der Quell-`index.html` per Doppelklick wird nicht unterstützt.

### 🤝 Ergebnisse teilen
Erstellte Entwürfe oder daraus resultierende KI-Architektur-Renderings können gerne auf Social Media geteilt werden.
Zugehörige Hashtags: **#fassadenschmied** und **#fachwerkgenerator** (Mention: **@fassadenschmied**).

### 📄 Lizenz & Namensnennung

**Software (verbindliche MIT-Bedingungen):** Der FachwerkGenerator steht unter der [MIT-Lizenz](LICENSE). Sie erlaubt die Nutzung, Veränderung und Weitergabe der Software, auch kommerziell und in Forks. Der Copyright-Vermerk und der Erlaubnisvermerk aus `LICENSE` müssen in allen Kopien oder wesentlichen Teilen der Software enthalten bleiben. Eine kurze Namensnennung allein ersetzt diese Hinweise nicht. Maßgeblich ist der vollständige Lizenztext einschließlich des Gewährleistungs- und Haftungsausschlusses.

**Generierte Bilder und Entwürfe (freiwillige Namensnennung):** Aus der MIT-Lizenz der Software folgt keine allgemeine Pflicht, bei der Nutzung oder Veröffentlichung damit erzeugter Bilder und Entwürfe den Entwickler zu nennen – auch nicht bei kommerziellen oder offiziellen Veröffentlichungen. Wir freuen uns über eine freiwillige Angabe, zum Beispiel: *„Erstellt mit dem Fachwerk-Generator von Maximilian Georg Liebscher / FassadenSchmied – fachwerkgenerator.de“*. Auch die oben genannten Hashtags und Markierungen sind freiwillig.

Diese Klarstellung vergibt keine zusätzliche Lizenz für Ergebnisse und trifft keine Aussage über etwaige Rechte an verwendeten oder übernommenen fremden Inhalten.

Mögliche künftige Regelungen für eine verpflichtende Namensnennung bei Ergebnissen sind als [offene Entscheidung dokumentiert](docs/licensing-attribution.md); sie werden hiermit nicht eingeführt.
