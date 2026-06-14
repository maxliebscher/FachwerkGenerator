// @ts-nocheck
/* eslint-disable */
// Mechanically extracted from Fachwerkgenerator_v0.6.7.8_stable.html.
// Kept behavior-first for v0.7 parity; smaller render modules can replace this incrementally.
export function bootFachwerkGenerator(): void {
  const canvas = document.getElementById('fachwerkCanvas');
      const ctx = canvas.getContext('2d');
      const uiRows = document.getElementById('paramRows'); 
      const uiCols = document.getElementById('paramCols');
      const uiThick = document.getElementById('paramThick'); 
      const uiSockel = document.getElementById('paramSockel'); 
      const uiSockelH = document.getElementById('paramSockelH');
      const uiDoorType = document.getElementById('paramDoorType'); 
      const uiDoorFrame = document.getElementById('paramDoorFrame');
      const uiDoorPos = document.getElementById('paramDoorPos'); 
      const uiWinFrame = document.getElementById('paramWinFrame');
      const uiGable = document.getElementById('paramGable'); 
      const uiGableCount = document.getElementById('paramGableCount');
      const uiRoofOverhang = document.getElementById('paramRoofOverhang'); 
      const uiCornice = document.getElementById('paramCornice'); 
      const uiCorniceHeight = document.getElementById('paramCorniceHeight');
      const uiSideDormerCount = document.getElementById('paramSideDormerCount');
      const uiSideDormerStyle = document.getElementById('paramSideDormerStyle');
      const gableControlsContainer = document.getElementById('gableControlsContainer');
      const toggleDormer = document.getElementById('toggleDormer'); 
      const uiDormerWin = document.getElementById('paramDormerWin');
      const uiDormerShape = document.getElementById('paramDormerShape'); 
      const dormerStepCont = document.getElementById('dormerStepCont');
      const uiDormerSteps = document.getElementById('paramDormerSteps'); 
      const uiDormerStepHeight = document.getElementById('paramDormerStepHeight');
      const uiDormerStyle = document.getElementById('paramDormerStyle'); 
      const uiDormerGable = document.getElementById('paramDormerGable');
      const uiDormerW = document.getElementById('paramDormerW'); 
      const uiDormerH = document.getElementById('paramDormerH');
      const uiDormerPitch = document.getElementById('paramDormerPitch');
      const uiColorPreset = document.getElementById('colorPreset');
      const uiCustomTimber = document.getElementById('customTimber'); 
      const uiCustomPlaster = document.getElementById('customPlaster'); const uiCustomStone = document.getElementById("customStone"); 
      const uiCustomGable = document.getElementById('customGable'); 
      const uiCustomTurret = document.getElementById('customTurret'); 
      const uiCustomDormer = document.getElementById('customDormer'); 
      const uiCustomTurretRoof = document.getElementById('customTurretRoof');
      const uiWindowD = document.getElementById('paramWindowD'); 
      const uiWarp = document.getElementById('paramWarp');
      const uiAsym = document.getElementById('paramAsym'); 
      const uiTurretW = document.getElementById('paramTurretW');
      const uiTurretStyle = document.getElementById('paramTurretStyle');
      const floorControlsContainer = document.getElementById('floorControlsContainer');
      const btnExport = document.getElementById('btnExport'); 
      const btnImport = document.getElementById('btnImport');
      const btnExportImg = document.getElementById('btnExportImg');
      const uiCamZoom = document.getElementById('camZoomSlider');
      const uiCamPanX = document.getElementById('camPanXSlider');
      const uiCamPanY = document.getElementById('camPanYSlider');
      const btnResetCam = document.getElementById('btnResetCam');
      let camZoom = 1.0; let camPanX = 0; let camPanY = 0;
      const updateVal = (id, val, suffix='') => { document.getElementById(id).innerText = val + suffix; };
      const createLayerGroup = () => ({ 
          bg: [], 
          preShapes: [], 
          innerTimbers: { h: [], d: [], v: [] }, 
          postShapes: [], 
          frameTimbers: { h: [], d: [], v: [] }, 
          windows: [], 
          doors: [], 
          arches: [], 
          customShapes: [] 
      });
      let scene = {
          walls: {...createLayerGroup(), foregroundShapes: []},
          gables: [],
          oriels: createLayerGroup(),
          dormer: createLayerGroup(),
          turrets: createLayerGroup()
      };
      let virtualBounds = { w: 0, h: 0 }; 
      let floorData = [];
      let savedFloorStates = [];
      let savedGableStates = [];
      let COLOR_TIMBER = '#1e404f'; 
      let COLOR_PLASTER = '#fdfbf7'; let COLOR_PLASTER2 = '#e2d5c3'; 
      let COLOR_GABLE = '#fdfbf7'; 
      let COLOR_TURRET = '#fdfbf7'; 
      let COLOR_DORMER = '#fdfbf7'; 
      let COLOR_STONE = '#94a3b8'; 
      let COLOR_BRICK = '#c87d6b'; 
      let COLOR_ARCH = '#334155'; 
      let COLOR_WINDOW = '#ffffff'; 
      let COLOR_TURRET_ROOF = '#475569';
      const STYLE_GROUPS = [
          { label: "Sonder-Architektur", options: [ 
              { value: 'stein_bogen', label: '🪨 Tor-Bögen (Nur Etagen)' } 
          ] },
          { label: "Experimentelle Formen", options: [
              { value: 'herzform', label: '❤️ Herzform (Massiv)' },
              { value: 'herz_fortlaufend', label: '💞 Herz-Fries' },
              { value: 'brezel_fries', label: '🥨 Brezel-Fries' },
              { value: 'jugendstil', label: '🌿 Jugendstil' },
              { value: 'peace', label: '☮️ Peace-Zeichen' },
              { value: 'peace_inv', label: '☮️ Lebensbaum' }
          ] },
          { label: "🐱 Katzen-Motive", options: [
              { value: 'katze_kopf', label: '🐱 Katzen-Kopf' },
              { value: 'katze_nase', label: '🐽 Katzen-Nase' }
          ] },
          { label: "🛡️ Wappen & Friese", options: [
              { value: 'wappen_voll', label: '🛡️ Wappen (Voll)' },
              { value: 'wappen_halb', label: '🛡️ Wappen (Halb)' },
              { value: 'eier_fries', label: '🥚 Eier-Fries' },
              { value: 'fischblase', label: '💧 Fischblase' }
          ] },
          { label: "ᛟ Runen", options: [
              { value: 'rune_othala', label: 'ᛟ Odal / Othala' },
              { value: 'runen', label: 'ᚺ Hagalaz / N-Rune' },
              { value: 'rune_tiwaz', label: 'ᛏ Tiwaz' },
              { value: 'rune_ingwaz', label: 'ᛜ Ingwaz' }
          ] },
          { label: "Neue Zierformen", options: [ 
              { value: 'geschweiftes_kreuz', label: '⚜️ Nasenkreuz (Cutout)' }, 
              { value: 'sternraute', label: '⭐ Sternraute (Achtstern)' }, 
              { value: 'geschweifte_streben', label: '〰️ Geschweifte Streben' } 
          ] },
          { label: "Massive Eck-Ornamente", options: [ 
              { value: 'faecherrosette_rund', label: '🌕 Fächerrosette (Rund/Strahlen)' }, 
              { value: 'faecherrosette_rund_voll', label: '🌑 Fächerrosette (Rund/Voll)' }, 
              { value: 'faecherrosette_dreieck', label: '📐 Fächerrosette (Dreieck/Strahlen)' }, 
              { value: 'faecherrosette_dreieck_voll', label: '▲ Fächerrosette (Dreieck/Voll)' }, 
              { value: 'massive_fussbaender', label: '📐 Massive Fußbänder' } 
          ] },
          { label: "Ziergitter & Friese", options: [ 
              { value: 'bogenfries', label: '🏛️ Bogenfries' }, 
              { value: 'rautennetz', label: '🕸️ Rautennetz' }, 
              { value: 'ziergitter', label: '🪟 Brüstungs-Ziergitter' } 
          ] },
          { label: "Figuren (Personen)", options: [ 
              { value: 'wilder_mann_echt', label: '🧍‍♂️ Wilder Mann (Authentisch)' }, 
              { value: 'wilde_frau', label: '🧍‍♀️ Wilde Frau (Herz-Raute)' }, 
              { value: 'halber_mann', label: '🧍‍♂️ Halber Mann (K-Strebe)' } 
          ] },
          { label: "Klassiker & Kompatibilität", options: [ 
              { value: 'andreaskreuz', label: '❌ Andreaskreuz' }, 
              { value: 'raute', label: '♦️ Raute / Diamant' }, 
              { value: 'bruestungskreuz', label: '🪟 Brüstungskreuz' }, 
              { value: 'kopfbaender', label: '📐 Kopf- & Fußbänder' }, 
              { value: 'geschwungene_raute', label: '🌀 Geschwungene Raute' }, 
              { value: 'skelett', label: 'Skelett / Raster' }, 
              { value: 'wilder_mann', label: 'Wilder Mann (Alt)' }, 
              { value: 'hessenmann', label: 'Hessenmann' }, 
              { value: 'manbrust', label: 'Mann + Brüstung' }, 
              { value: 'schwaeb_mann', label: 'Schwäb. Mann' }, 
              { value: 'rhein_bund', label: 'Rhein. Bund' }, 
              { value: 'k_streben', label: 'Doppel-K' }, 
              { value: 'fischgraet', label: 'Fischgrät' } 
          ] }
      ];
      const GABLE_SPECIFIC_GROUP = { 
          label: "Giebel-Spezifisch", options: [ 
              { value: 'fachwerk_classic', label: 'Giebel-Standard' }, { value: 'stein_bogen', label: '🏛️ Tor-Bögen (Giebel)' }, 
              { value: 'kreuz', label: 'A-Kreuz' },
              { value: 'y_kreuz', label: 'Y-Kreuz' },
              { value: 'vertikal', label: 'Nur Vertikal' }, 
              { value: 'leer', label: 'Leer (Nur Putz/Stein)' } 
          ] 
      };
      const TURRET_MASSIVE_GROUP = {
          label: "Massiv-Bauweise (Türme)", options: [
              { value: 'massiv_putz', label: '🧱 Massiv (Putz)' },
              { value: 'massiv_stein', label: '🧱 Massiv (Stein)' },
              { value: 'massiv_ziegel', label: '🧱 Massiv (Ziegel)' }
          ]
      };
      function setupResizer() {
          const sidebar = document.getElementById('sidebar'); const resizer = document.getElementById('resizer');
          let isResizing = false;
          resizer.addEventListener('pointerdown', (e) => { isResizing = true; resizer.classList.add('dragging'); document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none'; });
          document.addEventListener('pointermove', (e) => {
              if (!isResizing) return;
              const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
              if (newWidth > 220 && newWidth < window.innerWidth * 0.8) sidebar.style.width = `${newWidth}px`;
          });
          document.addEventListener('pointerup', () => { if (isResizing) { isResizing = false; resizer.classList.remove('dragging'); document.body.style.cursor = 'default'; document.body.style.userSelect = 'auto'; resizeCanvas(); } });
      }
      function setupCameraControls() {
          const wrapper = document.getElementById('canvas-wrapper');
          let isDraggingCam = false; let lastMouseX = 0; let lastMouseY = 0;
          wrapper.addEventListener('pointerdown', (e) => { if ((e.button === 1 || e.button === 0)) { isDraggingCam = true; lastMouseX = e.clientX; lastMouseY = e.clientY; e.preventDefault(); } });
          window.addEventListener('pointermove', (e) => { if (isDraggingCam) { camPanX += e.clientX - lastMouseX; camPanY += e.clientY - lastMouseY; lastMouseX = e.clientX; lastMouseY = e.clientY; uiCamPanX.value = camPanX; uiCamPanY.value = camPanY; updateAndGenerate(); } });
          window.addEventListener('pointerup', (e) => { if ((e.button === 1 || e.button === 0)) isDraggingCam = false; });
          wrapper.addEventListener('wheel', (e) => { e.preventDefault(); camZoom = Math.max(0.1, Math.min(5.0, camZoom * (e.deltaY > 0 ? 0.9 : 1.1))); uiCamZoom.value = camZoom; updateAndGenerate(); }, { passive: false });
          uiCamZoom.addEventListener('input', (e) => { camZoom = parseFloat(e.target.value); updateAndGenerate(); });
          uiCamPanX.addEventListener('input', (e) => { camPanX = parseFloat(e.target.value); updateAndGenerate(); });
          uiCamPanY.addEventListener('input', (e) => { camPanY = parseFloat(e.target.value); updateAndGenerate(); });
          btnResetCam.addEventListener('click', () => { camZoom = 1.0; camPanX = 0; camPanY = 0; uiCamZoom.value = 1; uiCamPanX.value = 0; uiCamPanY.value = 0; updateAndGenerate(); });
      }
      function generateSelectOptions(selectEl, selectedVal, isTurret=false, isGable=false, isDormer=false) {
          selectEl.innerHTML = '';
          if (isGable) {
              const specGroup = document.createElement('optgroup'); specGroup.label = GABLE_SPECIFIC_GROUP.label;
              GABLE_SPECIFIC_GROUP.options.forEach(opt => { const option = document.createElement('option'); option.value = opt.value; option.innerText = opt.label; if(opt.value === selectedVal) option.selected = true; specGroup.appendChild(option); });
              selectEl.appendChild(specGroup);
          }
          if (isTurret) {
              const massGroup = document.createElement('optgroup'); massGroup.label = TURRET_MASSIVE_GROUP.label;
              TURRET_MASSIVE_GROUP.options.forEach(opt => { const option = document.createElement('option'); option.value = opt.value; option.innerText = opt.label; if(opt.value === selectedVal) option.selected = true; massGroup.appendChild(option); });
              selectEl.appendChild(massGroup);
          }
          STYLE_GROUPS.forEach(group => {
              if(isTurret && group.label.includes('Friese')) return;
              const optgroup = document.createElement('optgroup'); optgroup.label = group.label;
              group.options.forEach(opt => {
                  if(opt.value === 'stein_bogen' && (isTurret || isGable)) return; 
                  const option = document.createElement('option'); option.value = opt.value; option.innerText = opt.label;
                  if(opt.value === selectedVal) option.selected = true; optgroup.appendChild(option);
              });
              if (optgroup.children.length > 0) selectEl.appendChild(optgroup);
          });
      }
      function populateStyles() {
          generateSelectOptions(uiDormerStyle, 'wilder_mann_echt', false, false, true);
          generateSelectOptions(uiDormerGable, 'fachwerk_classic', false, true, true);
          generateSelectOptions(uiTurretStyle, 'manbrust', true, false, false);
      }
      function darkenColor(hex, percent) {
          if(!hex) return '#000000'; hex = hex.replace('#', '');
          if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
          let r = parseInt(hex.substring(0,2), 16), g = parseInt(hex.substring(2,4), 16), b = parseInt(hex.substring(4,6), 16);
          r = Math.max(0, Math.floor(r * (100 - percent) / 100)); g = Math.max(0, Math.floor(g * (100 - percent) / 100)); b = Math.max(0, Math.floor(b * (100 - percent) / 100));
          return '#' + (r<16?'0':'')+r.toString(16) + (g<16?'0':'')+g.toString(16) + (b<16?'0':'')+b.toString(16);
      }
      function applyColors() {
          const preset = uiColorPreset.value;
          if (preset === 'custom') {
              uiCustomTimber.classList.remove('hidden');
              COLOR_TIMBER = uiCustomTimber.value;
          } else {
              uiCustomTimber.classList.add('hidden');
              if (preset === 'green') COLOR_TIMBER = '#1c4a2d';
              else if (preset === 'red') COLOR_TIMBER = '#8b3030';
              else if (preset === 'teal') COLOR_TIMBER = '#1e404f';
              else if (preset === 'yellow') COLOR_TIMBER = '#70520f';
              else if (preset === 'lilac') COLOR_TIMBER = '#3e2348';
              else if (preset === 'rose') COLOR_TIMBER = '#D76582';
              else COLOR_TIMBER = '#2d1b15';
          }
          COLOR_PLASTER = uiCustomPlaster.value; COLOR_PLASTER2 = document.getElementById('customPlaster2').value; 
          if(uiCustomStone) COLOR_STONE = uiCustomStone.value; 
          COLOR_GABLE = uiCustomGable.value;
          COLOR_TURRET = uiCustomTurret.value;
          COLOR_DORMER = uiCustomDormer.value;
          COLOR_TURRET_ROOF = uiCustomTurretRoof.value;
          updateAndGenerate();
      }
      ['colorPreset', 'customTimber', 'customPlaster', 'customPlaster2', 'customGable', 'customTurret', 'customDormer', 'customTurretRoof', 'customStone'].forEach(id => {
          document.getElementById(id).addEventListener('input', applyColors);
          document.getElementById(id).addEventListener('change', applyColors);
      });
      function getSafeVal(id, def) { const el = document.getElementById(id); return el ? el.value : def; }
      function readFloorStatesFromDOM() {
          const states = [];
          document.querySelectorAll('.floor-config:not(.gable-config)').forEach(card => {
              const idx = card.getAttribute('data-index');
              states[idx] = {
                  style: getSafeVal(`floorStyle-${idx}`, 'skelett'), 
                  material: getSafeVal(`floorMaterial-${idx}`, 'plaster'),
                  height: getSafeVal(`floorHeight-${idx}`, '1.3'), 
                  overhang: getSafeVal(`overHang-${idx}`, 0),
                  decor: getSafeVal(`floorDecor-${idx}`, 'none'),
                  decorFill: getSafeVal(`decorFill-${idx}`, 'filled'),
                  decorH: getSafeVal(`decorHeight-${idx}`, 30),
                  arches: getSafeVal(`archCount-${idx}`, 4),
                  archType: getSafeVal(`archType-${idx}`, 'rund'),
                  turret: getSafeVal(`turret-${idx}`, 'none'), 
                  oriel: getSafeVal(`oriel-${idx}`, 'none'), 
                  pentRoof: getSafeVal(`pentRoof-${idx}`, 'none')
              };
          });
          return states;
      }
      function readGableStatesFromDOM() {
          const states = [];
          document.querySelectorAll('.gable-config').forEach(card => {
              const idx = card.getAttribute('data-index');
              states[idx] = { 
                  shape: getSafeVal(`gableShape-${idx}`, 'sattel'), 
                  mat: getSafeVal(`gableMat-${idx}`, 'plaster'), 
                  style: getSafeVal(`gableStyle-${idx}`, 'fachwerk_classic'), 
                  pitch: getSafeVal(`gablePitch-${idx}`, '1.2'), 
                  steps: getSafeVal(`gableSteps-${idx}`, '5'), 
                  stepHeight: getSafeVal(`gableStepHeight-${idx}`, '0.95'), 
                  tiers: getSafeVal(`gableTiers-${idx}`, '2') 
              };
          });
          return states;
      }
      function initGableControls(preserveState = false) {
          if (preserveState) {
              savedGableStates = readGableStatesFromDOM();
          }
          const count = parseInt(uiGableCount.value); gableControlsContainer.innerHTML = '';
          for (let i = 0; i < count; i++) {
              let sShape = 'barock', sMat = 'plaster', sStyle = 'fachwerk_classic', sPitch = '1.2', sSteps = '5', sStepH = '0.95', sTiers = '2';
              if (savedGableStates[i]) {
                  sShape = savedGableStates[i].shape; sMat = savedGableStates[i].mat; sStyle = savedGableStates[i].style;
                  sPitch = savedGableStates[i].pitch; sSteps = savedGableStates[i].steps; sStepH = savedGableStates[i].stepHeight; sTiers = savedGableStates[i].tiers || '2';
              } else if (i > 0 && savedGableStates[0]) {
                  sShape = savedGableStates[0].shape; sMat = savedGableStates[0].mat; sStyle = savedGableStates[0].style; sPitch = savedGableStates[0].pitch; sSteps = savedGableStates[0].steps; sStepH = savedGableStates[0].stepHeight; sTiers = savedGableStates[0].tiers || '2';
              }
              const gableCard = document.createElement('div'); gableCard.className = 'floor-config gable-config bg-emerald-50/20 border-emerald-200 border-l-emerald-500'; gableCard.setAttribute('data-index', i);
              gableCard.innerHTML = `
                  <div class="floor-header text-emerald-800"><span>Giebel ${i+1}</span></div>
                  <div class="grid grid-cols-2 gap-2 mb-1">
                      <select id="gableShape-${i}" class="floor-select col-span-2 font-bold bg-white">
                          <option value="sattel" ${sShape==='sattel'?'selected':''}>Dachform: Satteldach</option>
                          <option value="halbwalm" ${sShape==='halbwalm'?'selected':''}>Dachform: Halbwalm (Dezent)</option><option value="krueppel" ${sShape==='krueppel'?'selected':''}>Dachform: Krüppelwalm</option>
                          <option value="mansard" ${sShape==='mansard'?'selected':''}>Dachform: Mansarddach</option>
                          <option value="stufe" ${sShape==='stufe'?'selected':''}>Giebel: Stufengiebel</option>
                          <option value="barock" ${sShape==='barock'?'selected':''}>Giebel: Barockschwung</option>
                      </select>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-1">
                      <select id="gableMat-${i}" class="floor-select">
                          <option value="plaster" ${(sMat==='plaster' || sMat==='inherit') ? 'selected':''}>Mat: Giebelfarbe (Menü)</option>
                          <option value="plaster1" ${sMat==='plaster1'?'selected':''}>Mat: Putz 1</option>
                          <option value="plaster2" ${sMat==='plaster2'?'selected':''}>Mat: Putz 2</option>
                          <option value="brick" ${sMat==='brick'?'selected':''}>Mat: Ziegel</option>
                          <option value="stone" ${sMat==='stone'?'selected':''}>Mat: Stein</option>
                          <option value="inherit_floor" ${sMat==='inherit_floor'?'selected':''}>Mat: Wie Etage darunter</option>
                          <option value="roof" ${sMat==='roof'?'selected':''}>Mat: Dach-Farbe</option>
                      </select>
                      <select id="gableStyle-${i}" class="floor-select"></select>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-1 pt-1">
                      <div><label class="control-label"><span>Neigung</span><span id="gablePitchVal-${i}" class="control-value">${parseFloat(sPitch).toFixed(1)}</span></label><input type="range" id="gablePitch-${i}" min="0.5" max="2.5" step="0.1" value="${sPitch}" class="w-full"></div>
                      <div><label class="control-label"><span>Etagen (Horiz.)</span><span id="gableTiersVal-${i}" class="control-value">${sTiers}</span></label><input type="range" id="gableTiers-${i}" min="1" max="4" step="1" value="${sTiers}" class="w-full"></div>
                  </div>
                  <div id="gableStepCont-${i}" class="grid grid-cols-2 gap-2 mb-1 pt-1 border-t border-emerald-100 ${ (sShape==='stufe'||sShape==='barock') ? '' : 'hidden' }">
                      <div><label class="control-label text-emerald-700"><span>Stufen</span><span id="gableStepsVal-${i}" class="control-value">${sSteps}</span></label><input type="range" id="gableSteps-${i}" min="1" max="12" step="1" value="${sSteps}" class="w-full"></div>
                      <div><label class="control-label text-emerald-700"><span>Höhe</span><span id="gableStepHVal-${i}" class="control-value">${sStepH}</span></label><input type="range" id="gableStepHeight-${i}" min="0.1" max="1.5" step="0.05" value="${sStepH}" class="w-full"></div>
                  </div>
              `;
              gableControlsContainer.appendChild(gableCard);
              generateSelectOptions(document.getElementById(`gableStyle-${i}`), sStyle, false, true, false);
              document.getElementById(`gableShape-${i}`).addEventListener('change', (e) => { const cont = document.getElementById(`gableStepCont-${i}`); if(e.target.value === 'stufe' || e.target.value === 'barock') cont.classList.remove('hidden'); else cont.classList.add('hidden'); updateAndGenerate(); });
              ['gableMat-', 'gableStyle-', 'gablePitch-', 'gableSteps-', 'gableStepHeight-', 'gableTiers-'].forEach(prefix => document.getElementById(`${prefix}${i}`).addEventListener('input', (e) => { if(prefix==='gablePitch-') updateVal(`gablePitchVal-${i}`, parseFloat(e.target.value).toFixed(1)); if(prefix==='gableSteps-') updateVal(`gableStepsVal-${i}`, e.target.value); if(prefix==='gableStepHeight-') updateVal(`gableStepHVal-${i}`, parseFloat(e.target.value).toFixed(2)); if(prefix==='gableTiers-') updateVal(`gableTiersVal-${i}`, e.target.value); updateAndGenerate(); }));
          }
      }
      uiGableCount.addEventListener('input', (e) => { updateVal('gableCountVal', e.target.value); initGableControls(true); updateAndGenerate(); });
      function getCurrentStateJSON() {
          savedFloorStates = readFloorStatesFromDOM();
          savedGableStates = readGableStatesFromDOM();
          const getVal = (id, def) => document.getElementById(id) ? document.getElementById(id).value : def;
          const getCheck = (id) => document.getElementById(id) ? document.getElementById(id).checked : false;
          return JSON.stringify({
              version: "0.6.4.7", rows: uiRows.value, cols: uiCols.value, thick: uiThick.value, 
              sockel: uiSockel.checked, sockelH: uiSockelH.value, sockelStyle: getVal('paramSockelStyle', 'stein_gerade'), 
              sockelQuader: getVal('paramSockelQuader', 'none'), ruine: getVal('paramRuine', 'none'),
              doorType: uiDoorType.value, doorFrame: uiDoorFrame.value, doorPos: uiDoorPos.value, 
              egCorners: getVal('paramEgCorners', 'gerade'), egCornersSide: getVal('paramEgCornersSide', 'both'), winFrame: uiWinFrame.checked,
              hasGable: uiGable.checked, gableCount: uiGableCount.value, sideDormerCount: uiSideDormerCount.value, 
              sideDormerStyle: uiSideDormerStyle.value, sideDormerX: getVal('paramSideDormerX', 0), roofOverhang: uiRoofOverhang.value, 
              cornice: uiCornice.value, corniceH: uiCorniceHeight.value,
              hasDormer: toggleDormer.checked, dormShape: uiDormerShape.value, dormSteps: uiDormerSteps.value, 
              dormStepH: uiDormerStepHeight.value, dormWin: uiDormerWin.checked, dormStyle: uiDormerStyle.value, 
              dormArchCount: getVal('paramDormerArchCount', 3), dormArchType: getVal('paramDormerArchType', 'rund'), 
              dormGable: uiDormerGable.value, dormerW: uiDormerW.value, dormerH: uiDormerH.value, 
              dormPitch: uiDormerPitch.value, dormTiers: getVal('paramDormerTiers', 2),
              winDens: uiWindowD.value, winRandom: getVal("paramWinRandom", 0), winSprossenThick: getVal("paramWinSprossenThick", 40), 
              winPatternScale: getVal("paramWinPatternScale", 100), winStyle: getVal("paramWinStyle", "quadrat"), 
              winSprossen: getVal("paramWinSprossen", "kreuz"), winGlass: getVal("paramWinGlass", "hell"), 
              winShutters: getVal("paramWinShutters", "keine"), winShutterColor: getVal("paramWinShutterColor", "#1e404f"), globalDecor: getVal("paramGlobalDecor", "0"), decorScheme: getVal("paramDecorScheme", "hist1"), 
              warp: uiWarp.value, asym: uiAsym.value, turretW: uiTurretW.value, turretStyle: uiTurretStyle.value, 
              turretRoofStyle: getVal('paramTurretRoofStyle', 'spitz'),
              timberPreset: uiColorPreset.value, plasterColor: uiCustomPlaster.value, plasterColor2: getVal('customPlaster2', '#e2d5c3'), 
              stoneColor: getVal('customStone', '#94a3b8'), turretRoofColor: uiCustomTurretRoof.value,
              gableColor: uiCustomGable.value, turretColor: uiCustomTurret.value, dormerColor: uiCustomDormer.value,
              cam: { zoom: camZoom, panX: camPanX, panY: camPanY }, floors: savedFloorStates, gables: savedGableStates
          }, null, 2);
      }
      btnExport.addEventListener('click', () => { const blob = new Blob([getCurrentStateJSON()], {type: "application/json"}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `fachwerk_config_${new Date().toISOString().slice(0,10).replace(/-/g,"")}.json`; a.click(); URL.revokeObjectURL(url); });
      btnExportImg.addEventListener('click', () => { 
              const tempZoom = camZoom, tempPanX = camPanX, tempPanY = camPanY;
              camZoom = 1.0; camPanX = 0; camPanY = 0;
              const exportDpr = 4; 
              const padding =  150 ;  
              canvas.width = (virtualBounds.w + padding * 2) * exportDpr;
              canvas.height = (virtualBounds.h + padding * 2) * exportDpr;
              renderModel(exportDpr, true); 
              const a = document.createElement('a'); 
              a.href = canvas.toDataURL("image/png"); 
              a.download = `fachwerk_bild_${new Date().toISOString().slice(0,10).replace(/-/g,"")}.png`; 
              a.click(); 
              camZoom = tempZoom; camPanX = tempPanX; camPanY = tempPanY;
              resizeCanvas(); 
          });
      btnImport.addEventListener('change', (e) => {
          const file = e.target.files[0]; if(!file) return; const reader = new FileReader();
          reader.onload = (e) => {
              try {
                  const config = JSON.parse(e.target.result);
                  loadState(config);
              } catch(err) { alert("Fehler beim Laden!"); console.error(err); }
          };
          reader.readAsText(file); e.target.value = '';
      });
      uiCols.addEventListener('input', (e) => { let maxCols = parseInt(e.target.value); uiDoorPos.max = maxCols; if(parseInt(uiDoorPos.value) > maxCols) { uiDoorPos.value = maxCols; updateVal('doorPosVal', maxCols); } });
      function initFloorControls(preserveState = false) {
          if (preserveState) {
              savedFloorStates = readFloorStatesFromDOM();
          }
          const rows = parseInt(uiRows.value); 
          floorControlsContainer.innerHTML = '';
          for (let i = 0; i < rows; i++) {
              let st = 'skelett', mat = 'plaster', h = '1.3', oh = '20', decH = '30', arc = '4', arcT = 'rund', tur = 'none', ori = 'none', dec='knaggen', decFill='filled', pR='none';
              if (savedFloorStates[i]) {
                  st = savedFloorStates[i].style; mat = savedFloorStates[i].material; h = savedFloorStates[i].height; oh = savedFloorStates[i].overhang; decH = savedFloorStates[i].decorH || '30'; arc = savedFloorStates[i].arches; arcT = savedFloorStates[i].archType || 'rund'; tur = savedFloorStates[i].turret || 'none'; ori = savedFloorStates[i].oriel || 'none'; dec = savedFloorStates[i].decor || 'knaggen'; decFill = savedFloorStates[i].decorFill || 'filled'; pR = savedFloorStates[i].pentRoof || 'none';
              } else {
                  if (i === 0) { st = 'skelett'; mat = 'stone'; h = '1.5'; oh = '0'; arc = '3'; arcT = 'spitz'; dec='none'; tur='none'; }
                  else if (i === 1) { st = 'wilde_frau'; mat = 'brick'; h = '1.5'; oh = '45'; decH = '44'; dec='knaggen'; decFill='open'; tur='none'; } 
                  else if (i === 2) { st = 'geschweiftes_kreuz'; mat = 'plaster'; h = '1.7'; oh = '81'; decH = '44'; dec='knaggen'; tur='none'; }
                  else if (i === 3) { st = 'skelett'; mat = 'plaster'; h = '1.8'; oh = '113'; decH = '43'; dec='konsolen'; tur='left'; }
              }
              const floorCard = document.createElement('div'); 
              floorCard.className = 'floor-config m-0'; 
              floorCard.setAttribute('data-index', i);
              floorCard.innerHTML = `
                  <div class="floor-header">
                      <div class="flex items-center gap-2">
                          <span class="drag-handle cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 px-3 py-1 select-none" style="touch-action: none;" title="Etage verschieben (Drag & Drop)">☰</span>
                          <span>${i === 0 ? 'EG' : `${i}. OG`}</span>
                          ${rows > 1 ? `<button class="text-[11px] hover:scale-125 text-red-500 opacity-70 hover:opacity-100 transition-all btn-delete-floor" data-delete-idx="${i}" title="Diese Etage löschen">🗑️</button>` : ''}
                      </div>
                      <div class="flex flex-col gap-1 items-end">
                          <div class="flex gap-1 items-center">
                              <select id="oriel-${i}" class="floor-select m-0 text-[9px] py-0 px-1 w-auto border-sky-300">
                                  <option value="none" ${ori==='none'?'selected':''}>Kein Erker</option>
                                  <option value="center" ${ori==='center'?'selected':''}>Erker Mitte</option>
                                  <option value="left" ${ori==='left'?'selected':''}>Erker Links</option>
                                  <option value="right" ${ori==='right'?'selected':''}>Erker Rechts</option>
                              </select>
                              <select id="turret-${i}" class="floor-select m-0 text-[9px] py-0 px-1 w-auto border-indigo-300">
                                  <option value="none" ${tur==='none'?'selected':''}>Kein Turm</option>
                                  <option value="left" ${tur==='left'?'selected':''}>Turm L</option>
                                  <option value="right" ${tur==='right'?'selected':''}>Turm R</option>
                                  <option value="both" ${tur==='both'?'selected':''}>Turm L+R</option>
                              </select>
                          </div>
                          <select id="pentRoof-${i}" class="floor-select m-0 text-[9px] py-0 px-1 w-full border-amber-300">
                              <option value="none" ${pR==='none'?'selected':''}>Ohne Dach</option>
                              <option value="full" ${pR==='full'?'selected':''}>Schutzdach (Voll)</option>
                              <option value="center" ${pR==='center'?'selected':''}>Schutzdach (Mitte)</option>
                              <option value="sides" ${pR==='sides'?'selected':''}>Schutzdach (Außen)</option>
                              <option value="left" ${pR==='left'?'selected':''}>Dach (Nur L)</option>
                              <option value="right" ${pR==='right'?'selected':''}>Dach (Nur R)</option>
                          </select>
                      </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-2">
                      <select id="floorStyle-${i}" class="floor-select"></select>
                      <select id="floorMaterial-${i}" class="floor-select">
                          <option value="plaster" ${mat==='plaster'?'selected':''}>Putz 1</option>
                          <option value="plaster2" ${mat==='plaster2'?'selected':''}>Putz 2</option>
                          <option value="brick" ${mat==='brick'?'selected':''}>Backstein</option>
                          <option value="stone" ${mat==='stone'?'selected':''}>Stein</option>
                      </select>
                  </div>
                  <div class="grid grid-cols-2 gap-2 items-end">
                      <div><label class="control-label"><span>Höhe</span><span id="hVal-${i}" class="control-value">${parseFloat(h).toFixed(1)}x</span></label><input type="range" id="floorHeight-${i}" min="0.5" max="6.0" step="0.1" value="${h}" class="w-full"></div>
                      ${i>0 ? `<div><label class="control-label"><span>Vorkragung</span><span id="oVal-${i}" class="control-value">${oh}</span></label><input type="range" id="overHang-${i}" min="0" max="200" value="${oh}" class="w-full"></div>
                      <div class="mt-1 pt-1 border-t border-slate-100 col-span-2 grid grid-cols-2 gap-2">
                          <div><label class="control-label text-emerald-600"><span>Dekor-Höhe</span><span id="decHVal-${i}" class="control-value">${decH}</span></label><input type="range" id="decorHeight-${i}" min="10" max="150" value="${decH}" class="w-full"></div>
                          <div><label class="control-label">Dekor & Füllung</label>
                              <div class="flex gap-1">
                                  <select id="floorDecor-${i}" class="floor-select m-0 flex-1">
                                      <option value="none" ${dec==='none'?'selected':''}>Streben</option>
                                      <option value="knaggen" ${dec==='knaggen'?'selected':''}>Vouten-Konsolen</option>
                                      <option value="konsolen" ${dec==='konsolen'?'selected':''}>Konsolen</option>
                                      <option value="abgetreppt" ${dec==='abgetreppt'?'selected':''}>Abgetreppt</option>
                                      <option value="schiffskehle" ${dec==='schiffskehle'?'selected':''}>Schiffskehle</option>
                                      <option value="neidkoepfe" ${dec==='neidkoepfe'?'selected':''}>Neidköpfe</option>
                                      <option value="stamm_5eck" ${dec==='stamm_5eck'?'selected':''}>Balkenköpfe (Spitz/Gotisch)</option>
                                      <option value="stamm_spitz" ${dec==='stamm_spitz'?'selected':''}>Balkenköpfe (Massiv/Stumpf)</option>
                                      <option value="stamm_quadrat" ${dec==='stamm_quadrat'?'selected':''}>Balkenköpfe (Robustes Viereck)</option>
                                      <option value="stamm_rund" ${dec==='stamm_rund'?'selected':''}>Balkenköpfe (Breit & Abgerundet)</option></select>
                                  <select id="decorFill-${i}" class="floor-select m-0 w-[40px] px-0 text-center" title="Hintergrund">
                                      <option value="filled" ${decFill==='filled'?'selected':''}>Zu</option>
                                      <option value="open" ${decFill==='open'?'selected':''}>Auf</option>
                                  </select>
                              </div>
                          </div>
                      </div>` : ''}
                  </div>
                  <div id="archContainer-${i}" class="mt-1 pt-1 border-t border-slate-100 ${st !== 'stein_bogen' ? 'hidden' : ''}">
                      <div class="grid grid-cols-2 gap-2">
                          <div><label class="control-label text-amber-600"><span>Bögen</span><span id="arcVal-${i}" class="control-value">${arc}</span></label><input type="range" id="archCount-${i}" min="1" max="12" value="${arc}" class="w-full"></div>
                          <div><label class="control-label text-amber-600">Form</label>
                              <select id="archType-${i}" class="floor-select m-0">
                                  <option value="rund" ${arcT==='rund'?'selected':''}>Rund</option>
                                  <option value="spitz" ${arcT==='spitz'?'selected':''}>Spitz</option>
                                  <option value="korb" ${arcT==='korb'?'selected':''}>Korb</option>
                              </select>
                          </div>
                      </div>
                  </div>
              `;
              floorControlsContainer.prepend(floorCard);
              generateSelectOptions(document.getElementById(`floorStyle-${i}`), st, false, false, false);
          }
          for (let i = 0; i < rows; i++) {
              document.getElementById(`floorStyle-${i}`).addEventListener('change', (e) => { const archC = document.getElementById(`archContainer-${i}`); if(archC) { if(e.target.value === 'stein_bogen') archC.classList.remove('hidden'); else archC.classList.add('hidden'); } updateAndGenerate(); });
              document.getElementById(`floorMaterial-${i}`).addEventListener('change', updateAndGenerate); document.getElementById(`turret-${i}`).addEventListener('change', updateAndGenerate); document.getElementById(`oriel-${i}`).addEventListener('change', updateAndGenerate); document.getElementById(`pentRoof-${i}`)?.addEventListener('change', updateAndGenerate); document.getElementById(`floorHeight-${i}`).addEventListener('input', (e) => { updateVal(`hVal-${i}`, parseFloat(e.target.value).toFixed(1), 'x'); updateAndGenerate(); });
              if(i > 0) { document.getElementById(`overHang-${i}`).addEventListener('input', (e) => { updateVal(`oVal-${i}`, e.target.value); updateAndGenerate(); }); document.getElementById(`decorHeight-${i}`).addEventListener('input', (e) => { updateVal(`decHVal-${i}`, e.target.value); updateAndGenerate(); }); document.getElementById(`floorDecor-${i}`).addEventListener('change', updateAndGenerate); document.getElementById(`decorFill-${i}`)?.addEventListener('change', updateAndGenerate); }
              document.getElementById(`archCount-${i}`)?.addEventListener('input', (e) => { updateVal(`arcVal-${i}`, e.target.value); updateAndGenerate(); }); document.getElementById(`archType-${i}`)?.addEventListener('change', updateAndGenerate);
          }
          }
      function getCellX(i, cols, totalW, asym) {
          if(asym === 0) return i * (totalW / cols);
          let power = Math.pow(4, asym); 
          let t = i / cols; 
          return Math.pow(t, power) * totalW;
      }
      function getWarpPoint(x, y) { 
          const warp = parseInt(uiWarp.value); 
          if (warp === 0) return {x, y}; 
          const bend = Math.sin(y * 0.05) * (warp * 0.2); 
          return {x: x + bend, y: y}; 
      }
      function pushTimber(targetLayer, type, x1, y1, x2, y2, multiplier = 1, isCurve = false, cx1, cy1, cx2, cy2) {
          if(isCurve) { 
              targetLayer[type].push({curve: true, x1, y1, cx1, cy1, cx2, cy2, x2, y2, multi: multiplier}); 
          } else {
              const p1 = getWarpPoint(x1, y1); const p2 = getWarpPoint(x2, y2);
              if (parseInt(uiWarp.value) > 0 && type !== 'h') {
                  const midX = (p1.x + p2.x)/2; const midY = (p1.y + p2.y)/2; const deflect = parseInt(uiWarp.value) * 0.08;
                  targetLayer[type].push({curve: true, x1:p1.x, y1:p1.y, cx1:midX+deflect, cy1:midY, cx2:midX+deflect, cy2:midY, x2:p2.x, y2:p2.y, multi: multiplier});
              } else { 
                  targetLayer[type].push({x1:p1.x, y1:p1.y, x2:p2.x, y2:p2.y, multi: multiplier}); 
              }
          }
      }
      function pseudoRandom(seedA, seedB) { let x = Math.sin(seedA * 12.9898 + seedB * 78.233) * 43758.5453; return x - Math.floor(x); }
      function addWindowLayer(targetList, cellX, cellY, cellW, cellH, frameLayer, useFrames) { 
      let varPct = parseInt(document.getElementById('paramWinRandom')?.value || 0) / 100;
      let r1 = pseudoRandom(cellX, cellY) * 2 - 1; 
      let r2 = pseudoRandom(cellY, cellX) * 2 - 1;
      let padding = cellW * 0.15 * (1 + r1 * varPct); 
      let w_width = cellW - padding * 2; 
      let isFlatCell = (cellH < 105);
      let w_height;
      if (isFlatCell) {
          w_height = cellH * 0.85 * (1 + r2 * varPct); 
          if (w_width > w_height * 2.2) {
              w_width = w_height * 2.2;
              padding = (cellW - w_width) / 2;
          }
      } else {
          w_height = cellH * 0.55 * (1 + r2 * varPct); 
          let max_H = w_width * 2.2; 
          let min_H = w_width * 1.3; 
          if (w_height > max_H) w_height = max_H;
          if (w_height < min_H) w_height = min_H;
          let absolute_max_H = cellH * 0.85;
          if (w_height > absolute_max_H) {
              w_height = absolute_max_H;
              if (w_width > w_height * 0.85) { 
                  w_width = w_height * 0.85; 
                  padding = (cellW - w_width) / 2; 
              }
          }
      }
      const w_y = cellY + (cellH - w_height) / 2;
      targetList.push({x: cellX + padding, y: w_y, w: w_width, h: w_height}); 
      if (useFrames && frameLayer) {
          pushTimber(frameLayer, 'h', cellX, w_y, cellX + cellW, w_y, 2.0); 
          pushTimber(frameLayer, 'h', cellX, w_y + w_height, cellX + cellW, w_y + w_height, 2.2);
          pushTimber(frameLayer, 'v', cellX + padding, w_y, cellX + padding, w_y + w_height, 0.75); 
          pushTimber(frameLayer, 'v', cellX + padding + w_width, w_y, cellX + padding + w_width, w_y + w_height, 0.75);
      }
  }
      function drawPattern(style, ctx, cellX, yBottom, cellW, storyH) {
          let cr = cellX + cellW; 
          let midX = cellX + cellW / 2; 
          let yTop = yBottom + storyH; 
          let midY = yBottom + storyH / 2;
          if (style === 'geschweiftes_kreuz') {
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, yTop, 2.0); 
              pushTimber(ctx.inner, 'd', cr, yBottom, cellX, yTop, 2.0);
              let rW = cellW * 0.38; let rH = storyH * 0.38; 
              let clipBox = { x: cellX, y: yBottom, w: cellW, h: storyH };
              ctx.post.push({ type: 'negative_ellipse', x: midX, y: yTop, rx: rW, ry: rH, clipBox, color: ctx.color }); 
              ctx.post.push({ type: 'negative_ellipse', x: midX, y: yBottom, rx: rW, ry: rH, clipBox, color: ctx.color }); 
              ctx.post.push({ type: 'negative_ellipse', x: cellX, y: midY, rx: rW, ry: rH, clipBox, color: ctx.color }); 
              ctx.post.push({ type: 'negative_ellipse', x: cr, y: midY, rx: rW, ry: rH, clipBox, color: ctx.color });
          } 
          else if (style === 'sternraute') {
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, yTop, 0.85); 
              pushTimber(ctx.inner, 'd', cr, yBottom, cellX, yTop, 0.85);
              pushTimber(ctx.inner, 'd', midX, yBottom, cr, midY, 0.85); 
              pushTimber(ctx.inner, 'd', cr, midY, midX, yTop, 0.85); 
              pushTimber(ctx.inner, 'd', midX, yTop, cellX, midY, 0.85); 
              pushTimber(ctx.inner, 'd', cellX, midY, midX, yBottom, 0.85);
          }
          else if (style === 'geschweifte_streben') {
              let brustH = yBottom + storyH * 0.5; 
              pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.9);
              pushTimber(ctx.inner, 'd', cellX, brustH, midX, yBottom, 1.1, true, cellX + cellW*0.25, brustH, midX, yBottom + storyH*0.15); 
              pushTimber(ctx.inner, 'd', cr, brustH, midX, yBottom, 1.1, true, cr - cellW*0.25, brustH, midX, yBottom + storyH*0.15);
          }
          else if (style === 'faecherrosette_rund' || style === 'faecherrosette_rund_voll') {
              let brustH = yBottom + storyH * 0.4; let r = Math.min(cellW * 0.45, storyH * 0.45);
              ctx.pre.push({ type: 'arc', x: cellX, y: yBottom, r, startAngle: 0, endAngle: Math.PI/2 }); 
              ctx.pre.push({ type: 'arc', x: cr, y: yBottom, r, startAngle: Math.PI/2, endAngle: Math.PI });
              if(style === 'faecherrosette_rund') { 
                  ctx.pre.push({ type: 'carving', x1: cellX, y1: yBottom, x2: cellX + r*0.85, y2: yBottom + r*0.35, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cellX, y1: yBottom, x2: cellX + r*0.7, y2: yBottom + r*0.7, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cellX, y1: yBottom, x2: cellX + r*0.35, y2: yBottom + r*0.85, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cr, y1: yBottom, x2: cr - r*0.85, y2: yBottom + r*0.35, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cr, y1: yBottom, x2: cr - r*0.7, y2: yBottom + r*0.7, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cr, y1: yBottom, x2: cr - r*0.35, y2: yBottom + r*0.85, widthMulti: 0.8 }); 
              }
          }
          else if (style === 'massive_fussbaender') {
              let fw = Math.min(cellW * 0.45, storyH * 0.45);
              pushTimber(ctx.inner, 'd', cellX, yBottom + fw, cellX + fw, yBottom, 2.2, true, cellX + fw*0.15, yBottom + fw*0.7, cellX + fw*0.3, yBottom + fw*0.15);
              pushTimber(ctx.inner, 'd', cr, yBottom + fw, cr - fw, yBottom, 2.2, true, cr - fw*0.15, yBottom + fw*0.7, cr - fw*0.3, yBottom + fw*0.15);
          }
          else if (style === 'faecherrosette_dreieck' || style === 'faecherrosette_dreieck_voll') {
              let brustH = yBottom + storyH * 0.4; let r = Math.min(cellW * 0.45, storyH * 0.45);
              ctx.pre.push({ type: 'poly', points: [{x: cellX, y: yBottom}, {x: cellX + r, y: yBottom}, {x: cellX, y: yBottom + r}] }); 
              ctx.pre.push({ type: 'poly', points: [{x: cr, y: yBottom}, {x: cr - r, y: yBottom}, {x: cr, y: yBottom + r}] });
              if(style === 'faecherrosette_dreieck') { 
                  ctx.pre.push({ type: 'carving', x1: cellX, y1: yBottom, x2: cellX + r*0.75, y2: yBottom + r*0.25, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cellX, y1: yBottom, x2: cellX + r*0.5, y2: yBottom + r*0.5, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cellX, y1: yBottom, x2: cellX + r*0.25, y2: yBottom + r*0.75, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cr, y1: yBottom, x2: cr - r*0.75, y2: yBottom + r*0.25, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cr, y1: yBottom, x2: cr - r*0.5, y2: yBottom + r*0.5, widthMulti: 0.8 }); 
                  ctx.pre.push({ type: 'carving', x1: cr, y1: yBottom, x2: cr - r*0.25, y2: yBottom + r*0.75, widthMulti: 0.8 }); 
              }
          }
          else if (style === 'bogenfries') {
              let count = Math.max(2, Math.round(cellW / 33)); let aw = cellW / count; let ah = Math.min(aw * 0.5, storyH * 0.2); 
              let path = [{type: 'M', x: cellX, y: yTop}, {type: 'L', x: cellX, y: yTop - ah * 0.3}];
              for(let i=0; i<count; i++) { let lx = cellX + i*aw; let rx = lx + aw; path.push({ type: 'B', cx1: lx + aw*0.1, cy1: yTop - ah, cx2: rx - aw*0.1, cy2: yTop - ah, x: rx, y: yTop - ah * 0.3 }); } path.push({type: 'L', x: cr, y: yTop});
              ctx.pre.push({ type: 'path', path }); 
              let brustH = yBottom + storyH * 0.4; 
              pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.8); 
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, brustH, 0.7); 
              pushTimber(ctx.inner, 'd', cr, yBottom, cellX, brustH, 0.7);
          }
          else if (style === 'rautennetz') {
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, yTop, 0.8); pushTimber(ctx.inner, 'd', cr, yBottom, cellX, yTop, 0.8); 
              pushTimber(ctx.inner, 'd', cellX, midY, midX, yTop, 0.8); pushTimber(ctx.inner, 'd', midX, yBottom, cr, midY, 0.8); 
              pushTimber(ctx.inner, 'd', cr, midY, midX, yTop, 0.8); pushTimber(ctx.inner, 'd', midX, yBottom, cellX, midY, 0.8);
          }
          else if (style === 'ziergitter') {
              let brustH = yBottom + storyH * 0.4; pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.9); 
              let count = 3; let subW = cellW / count;
              for(let i=0; i<count; i++) { 
                  let lx = cellX + i*subW; let rx = lx + subW; 
                  if (i > 0) pushTimber(ctx.inner, 'v', lx, yBottom, lx, brustH, 0.7); 
                  pushTimber(ctx.inner, 'd', lx, yBottom, rx, brustH, 0.6); 
                  pushTimber(ctx.inner, 'd', rx, yBottom, lx, brustH, 0.6); 
              }
          }
          else if (style === 'wilder_mann_echt') {
              let h1 = yBottom + storyH * 0.35; let h2 = yBottom + storyH * 0.65;
              pushTimber(ctx.frame, 'v', midX, yBottom, midX, yTop, 1.4); 
              pushTimber(ctx.inner, 'h', cellX, h1, cr, h1, 0.9); pushTimber(ctx.inner, 'h', cellX, h2, cr, h2, 0.9);
              pushTimber(ctx.inner, 'd', cellX, yBottom, midX, h1, 0.85); pushTimber(ctx.inner, 'd', cr, yBottom, midX, h1, 0.85); 
              pushTimber(ctx.inner, 'd', midX, h2, cellX, yTop, 0.85); pushTimber(ctx.inner, 'd', midX, h2, cr, yTop, 0.85);
          }
          else if (style === 'wilde_frau') {
              let h1 = yBottom + storyH * 0.33; let h2 = yBottom + storyH * 0.66;
              pushTimber(ctx.inner, 'h', cellX, h1, cr, h1, 0.9); pushTimber(ctx.inner, 'h', cellX, h2, cr, h2, 0.9); 
              pushTimber(ctx.inner, 'd', cellX, yBottom, midX, h1, 0.85); pushTimber(ctx.inner, 'd', cr, yBottom, midX, h1, 0.85); 
              pushTimber(ctx.inner, 'd', midX, h2, cellX, yTop, 0.85); pushTimber(ctx.inner, 'd', midX, h2, cr, yTop, 0.85);
              let rX = cellW * 0.25; 
              pushTimber(ctx.inner, 'd', midX, h1, cellX + rX, midY, 0.85); pushTimber(ctx.inner, 'd', midX, h1, cr - rX, midY, 0.85); 
              pushTimber(ctx.inner, 'd', cellX + rX, midY, midX, h2, 0.85); pushTimber(ctx.inner, 'd', cr - rX, midY, midX, h2, 0.85);
          }
          else if (style === 'halber_mann') {
              pushTimber(ctx.inner, 'h', cellX, midY, cr, midY, 0.85); pushTimber(ctx.inner, 'd', cellX, midY, cr, yBottom, 0.85); pushTimber(ctx.inner, 'd', cellX, midY, cr, yTop, 0.85);
          }
          else if (style === 'geschwungene_raute') {
              let cpX_L = cellX + cellW * 0.3; let cpX_R = cr - cellW * 0.3; let cpY_B = yBottom + storyH * 0.3; let cpY_T = yTop - storyH * 0.3;
              pushTimber(ctx.inner, 'd', midX, yTop, cellX, midY, 0.9, true, cpX_L, cpY_T, cpX_L, cpY_T); pushTimber(ctx.inner, 'd', midX, yTop, cr, midY, 0.9, true, cpX_R, cpY_T, cpX_R, cpY_T); pushTimber(ctx.inner, 'd', cellX, midY, midX, yBottom, 0.9, true, cpX_L, cpY_B, cpX_L, cpY_B); pushTimber(ctx.inner, 'd', cr, midY, midX, yBottom, 0.9, true, cpX_R, cpY_B, cpX_R, cpY_B);
          }
          else if (style === 'andreaskreuz') { 
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, yTop, 0.9); pushTimber(ctx.inner, 'd', cr, yBottom, cellX, yTop, 0.9); 
          }
          else if (style === 'raute') { 
              pushTimber(ctx.inner, 'd', midX, yBottom, cr, midY, 0.9); pushTimber(ctx.inner, 'd', cr, midY, midX, yTop, 0.9); pushTimber(ctx.inner, 'd', midX, yTop, cellX, midY, 0.9); pushTimber(ctx.inner, 'd', cellX, midY, midX, yBottom, 0.9); 
          }
          else if (style === 'bruestungskreuz') { 
              let brustH = yBottom + storyH * 0.4; pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.9); pushTimber(ctx.inner, 'd', cellX, yBottom, cr, brustH, 0.8); pushTimber(ctx.inner, 'd', cr, yBottom, cellX, brustH, 0.8); pushTimber(ctx.inner, 'v', midX, brustH, midX, yTop, 0.8); 
          }
          else if (style === 'kopfbaender') { 
              let bd = Math.min(cellW * 0.3, storyH * 0.3); pushTimber(ctx.inner, 'd', cellX, yTop - bd, cellX + bd, yTop, 0.7); pushTimber(ctx.inner, 'd', cr, yTop - bd, cr - bd, yTop, 0.7); pushTimber(ctx.inner, 'd', cellX, yBottom + bd, cellX + bd, yBottom, 0.7); pushTimber(ctx.inner, 'd', cr, yBottom + bd, cr - bd, yBottom, 0.7); 
          }
          else if (style === 'hessenmann') {
              let brustH = yBottom + storyH * 0.4; let shoulderY = yBottom + storyH * 0.8;
              pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.9); pushTimber(ctx.frame, 'v', midX, brustH, midX, yTop, 1.2);
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, brustH, 0.9); pushTimber(ctx.inner, 'd', cr, yBottom, cellX, brustH, 0.9); 
              pushTimber(ctx.inner, 'd', midX, midY, cellX, shoulderY, 1.0); pushTimber(ctx.inner, 'd', midX, midY, cr, shoulderY, 1.0); 
              pushTimber(ctx.inner, 'd', midX, yTop, cellX, midY, 0.9); pushTimber(ctx.inner, 'd', midX, yTop, cr, midY, 0.9);
          }
          else if (style === 'wilder_mann') { 
              let leg = cellW * 0.4; let arm = cellW * 0.4; 
              pushTimber(ctx.inner, 'd', midX, midY, midX - leg, yBottom, 1.0); pushTimber(ctx.inner, 'd', midX, midY, midX + leg, yBottom, 1.0); 
              pushTimber(ctx.inner, 'd', midX, midY, midX - arm, yTop, 1.0); pushTimber(ctx.inner, 'd', midX, midY, midX + arm, yTop, 1.0); 
          }
          else if (style === 'manbrust') { 
              let brustH = yBottom + storyH * 0.4; pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.8); 
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, brustH, 0.8); pushTimber(ctx.inner, 'd', cr, yBottom, cellX, brustH, 0.8); 
              pushTimber(ctx.inner, 'd', midX, yTop, cellX, midY + 10, 0.8); pushTimber(ctx.inner, 'd', midX, yTop, cr, midY + 10, 0.8); 
          }
          else if (style === 'schwaeb_mann') { 
              let leg = cellW * 0.4; let arm = cellW * 0.4; 
              pushTimber(ctx.inner, 'd', midX, midY, midX - leg, yBottom, 1.0, true, midX - leg/2, yBottom + 10, midX - leg/2, yBottom + 10); 
              pushTimber(ctx.inner, 'd', midX, midY, midX + leg, yBottom, 1.0, true, midX + leg/2, yBottom + 10, midX + leg/2, yBottom + 10); 
              pushTimber(ctx.inner, 'd', midX, midY, midX - arm, yTop, 1.0, true, midX - arm/2, yTop - 10, midX - arm/2, yTop - 10); 
              pushTimber(ctx.inner, 'd', midX, midY, midX + arm, yTop, 1.0, true, midX + arm/2, yTop - 10, midX + arm/2, yTop - 10); 
          }
          else if (style === 'rhein_bund') { 
              let brustH = yBottom + storyH * 0.4; let faceH = yBottom + storyH * 0.8; 
              pushTimber(ctx.inner, 'h', cellX, brustH, cr, brustH, 0.9); 
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, brustH, 0.8, true, cellX + 15, brustH - 5, cellX + 15, brustH - 5); 
              pushTimber(ctx.inner, 'd', cr, yBottom, cellX, brustH, 0.8, true, cr - 15, brustH - 5, cr - 15, brustH - 5); 
              pushTimber(ctx.inner, 'd', cellX, faceH, midX, yTop, 0.7, true, cellX + cellW*0.3, faceH + 10, cellX + cellW*0.3, faceH + 10); 
              pushTimber(ctx.inner, 'd', cr, faceH, midX, yTop, 0.7, true, cr - cellW*0.3, faceH + 10, cr - cellW*0.3, faceH + 10); 
          }
          else if (style === 'k_streben') { 
              pushTimber(ctx.inner, 'h', cellX, midY, cr, midY, 0.9); pushTimber(ctx.inner, 'd', midX, midY, cellX, yBottom, 1.0); 
              pushTimber(ctx.inner, 'd', midX, midY, cellX, yTop, 1.0); pushTimber(ctx.inner, 'd', midX, midY, cr, yBottom, 1.0); pushTimber(ctx.inner, 'd', midX, midY, cr, yTop, 1.0); 
          }
          else if (style === 'fischgraet') { 
              pushTimber(ctx.inner, 'd', cellX, yBottom, cr, yTop, 0.7); pushTimber(ctx.inner, 'd', cr, yBottom, cellX, yTop, 0.7); 
          }
          else if (style === 'herzform') {
              let hBottom = yBottom + storyH * 0.15; let hTopDrop = yBottom + storyH * 0.8;
              pushTimber(ctx.inner, 'v', midX, yBottom, midX, hBottom, 1.5);
              let cx1L = cellX - cellW * 0.25; let cy1L = yBottom + storyH * 0.7; let cx2L = cellX + cellW * 0.2; let cy2L = yTop + storyH * 0.15;
              pushTimber(ctx.inner, 'd', midX, hBottom, midX, hTopDrop, 1.5, true, cx1L, cy1L, cx2L, cy2L);
              let cx1R = cr + cellW * 0.25; let cy1R = cy1L; let cx2R = cr - cellW * 0.2; let cy2R = cy2L;
              pushTimber(ctx.inner, 'd', midX, hBottom, midX, hTopDrop, 1.5, true, cx1R, cy1R, cx2R, cy2R);
          }
          else if (style === 'herz_fortlaufend') {
              let hBottom = yBottom + storyH * 0.15; let hTopDrop = yBottom + storyH * 0.8;
              let cx1L = cellX + cellW * 0.75; let cy1L = yBottom + storyH * 0.7; let cx2L = cellX + cellW * 0.3; let cy2L = yTop + storyH * 0.15;
              pushTimber(ctx.inner, 'd', cellX, hBottom, cellX, hTopDrop, 1.4, true, cx1L, cy1L, cx2L, cy2L);
              let cx1R = cr - cellW * 0.75; let cy1R = cy1L; let cx2R = cr - cellW * 0.3; let cy2R = cy2L;
              pushTimber(ctx.inner, 'd', cr, hBottom, cr, hTopDrop, 1.4, true, cx1R, cy1R, cx2R, cy2R);
          }
          else if (style === 'brezel_fries') {
              let amp = storyH * 0.35;
              pushTimber(ctx.inner, 'd', cellX, midY, midX, midY, 1.4, true, cellX+cellW*0.1, midY+amp, midX-cellW*0.1, midY+amp);
              pushTimber(ctx.inner, 'd', midX, midY, cr, midY, 1.4, true, midX+cellW*0.1, midY-amp, cr-cellW*0.1, midY-amp);
              pushTimber(ctx.inner, 'd', cellX, midY, midX, midY, 1.4, true, cellX+cellW*0.1, midY-amp, midX-cellW*0.1, midY-amp);
              pushTimber(ctx.inner, 'd', midX, midY, cr, midY, 1.4, true, midX+cellW*0.1, midY+amp, cr-cellW*0.1, midY+amp);
          }
          else if (style === 'peace') {
              pushTimber(ctx.inner, 'v', midX, yBottom, midX, yTop, 1.3);
              pushTimber(ctx.inner, 'd', midX, yBottom + storyH * 0.55, cellX, yBottom + storyH * 0.1, 1.1);
              pushTimber(ctx.inner, 'd', midX, yBottom + storyH * 0.55, cr, yBottom + storyH * 0.1, 1.1);
          }
          else if (style === 'peace_inv') {
              pushTimber(ctx.inner, 'v', midX, yBottom, midX, yTop, 1.3);
              pushTimber(ctx.inner, 'd', midX, yBottom + storyH * 0.45, cellX, yBottom + storyH * 0.9, 1.1);
              pushTimber(ctx.inner, 'd', midX, yBottom + storyH * 0.45, cr, yBottom + storyH * 0.9, 1.1);
          }
          else if (style === 'jugendstil') {
              pushTimber(ctx.inner, 'v', midX, yBottom, midX, yBottom + storyH * 0.25, 1.4);
              let topCurv = storyH * 0.4;
              pushTimber(ctx.inner, 'd', midX, yBottom + storyH * 0.25, cellX, yTop, 1.3, true, cellX + cellW*0.6, yBottom + storyH*0.6, cellX, yTop - topCurv);
              pushTimber(ctx.inner, 'd', midX, yBottom + storyH * 0.25, cr, yTop, 1.3, true, cr - cellW*0.6, yBottom + storyH*0.6, cr, yTop - topCurv);
              pushTimber(ctx.inner, 'd', cellX, yBottom + storyH*0.05, midX, yBottom + storyH * 0.25, 1.0, true, cellX + cellW*0.3, yBottom, midX - cellW*0.1, yBottom + storyH*0.1);
              pushTimber(ctx.inner, 'd', cr, yBottom + storyH*0.05, midX, yBottom + storyH * 0.25, 1.0, true, cr - cellW*0.3, yBottom, midX + cellW*0.1, yBottom + storyH*0.1);
          }
          else if (style === 'katze_kopf') {
              let midY1 = yBottom + storyH * 0.35; let midY2 = yBottom + storyH * 0.65;
              pushTimber(ctx.inner, 'd', cellX, yBottom, midX, midY1, 1.5);
              pushTimber(ctx.inner, 'd', cr, yBottom, midX, midY1, 1.5);
              pushTimber(ctx.inner, 'v', midX, midY1, midX, midY2, 1.5);
              pushTimber(ctx.inner, 'd', midX, midY2, cellX, yTop, 1.5);
              pushTimber(ctx.inner, 'd', midX, midY2, cr, yTop, 1.5);
              pushTimber(ctx.inner, 'd', cellX, yTop, midX, midY1, 1.5, true, cellX+cellW*0.2, yBottom+storyH*0.7, cellX+cellW*0.4, yBottom+storyH*0.4);
              pushTimber(ctx.inner, 'd', cr, yTop, midX, midY1, 1.5, true, cr-cellW*0.2, yBottom+storyH*0.7, cr-cellW*0.4, yBottom+storyH*0.4);
          }
          else if (style === 'katze_nase') {
              let nBot = yBottom + storyH * 0.3; let nTop = yBottom + storyH * 0.6; let wOffset = cellW * 0.21;
              pushTimber(ctx.inner, 'd', cellX, yTop, midX, nBot, 1.6);
              pushTimber(ctx.inner, 'd', cr, yTop, midX, nBot, 1.6);
              pushTimber(ctx.inner, 'h', midX - wOffset, nTop, midX + wOffset, nTop, 1.6);
              pushTimber(ctx.inner, 'v', midX, yBottom, midX, nBot, 1.6);
          }
          else if (style === 'wappen_voll') {
              pushTimber(ctx.inner, 'h', cellX+cellW*0.1, yTop-storyH*0.1, cr-cellW*0.1, yTop-storyH*0.1, 1.3);
              pushTimber(ctx.inner, 'd', cellX+cellW*0.1, yTop-storyH*0.1, midX, yBottom+storyH*0.1, 1.4, true, cellX+cellW*0.1, yBottom+storyH*0.4, midX-cellW*0.2, yBottom+storyH*0.1);
              pushTimber(ctx.inner, 'd', cr-cellW*0.1, yTop-storyH*0.1, midX, yBottom+storyH*0.1, 1.4, true, cr-cellW*0.1, yBottom+storyH*0.4, midX+cellW*0.2, yBottom+storyH*0.1);
          }
          else if (style === 'wappen_halb') {
              let yShieldBot = yBottom + storyH * 0.15; let yShieldTop = yTop - storyH * 0.15;
              pushTimber(ctx.inner, 'h', cellX, yShieldTop, cr, yShieldTop, 1.4);
              pushTimber(ctx.inner, 'd', cr, yShieldTop, cr, yShieldBot, 1.6, true, cr-cellW*0.5, yShieldTop, cr-cellW*0.5, yShieldBot+storyH*0.2);
              pushTimber(ctx.inner, 'd', cellX, yShieldTop, cellX, yShieldBot, 1.6, true, cellX+cellW*0.5, yShieldTop, cellX+cellW*0.5, yShieldBot+storyH*0.2);
          }
          else if (style === 'eier_fries') {
              pushTimber(ctx.inner, 'd', cellX, yBottom, midX, midY, 1.2, true, cellX+cellW*0.3, yBottom, midX, yBottom+storyH*0.2);
              pushTimber(ctx.inner, 'd', cr, yBottom, midX, midY, 1.2, true, cr-cellW*0.3, yBottom, midX, yBottom+storyH*0.2);
              pushTimber(ctx.inner, 'd', cellX, yTop, midX, midY, 1.2, true, cellX+cellW*0.3, yTop, midX, yTop-storyH*0.2);
              pushTimber(ctx.inner, 'd', cr, yTop, midX, midY, 1.2, true, cr-cellW*0.3, yTop, midX, yTop-storyH*0.2);
          }
          else if (style === 'fischblase') {
              pushTimber(ctx.inner, 'd', midX, yBottom, midX, yTop, 1.4, true, cellX-cellW*0.25, yBottom+storyH*0.4, midX, yTop);
              pushTimber(ctx.inner, 'd', midX, yBottom, midX, yTop, 1.4, true, midX+cellW*0.3, yBottom+storyH*0.1, cr+cellW*0.1, yTop-storyH*0.3);
          }
          else if (style === 'rune_othala') {
              let qYBot = yBottom + storyH*0.3; let rMidY = yBottom + storyH*0.6;
              pushTimber(ctx.inner, 'd', midX, yTop-storyH*0.05, cellX+cellW*0.2, rMidY, 1.2);
              pushTimber(ctx.inner, 'd', midX, yTop-storyH*0.05, cr-cellW*0.2, rMidY, 1.2);
              pushTimber(ctx.inner, 'd', cellX+cellW*0.2, rMidY, midX, qYBot, 1.2);
              pushTimber(ctx.inner, 'd', cr-cellW*0.2, rMidY, midX, qYBot, 1.2);
              pushTimber(ctx.inner, 'd', midX, qYBot, cellX+cellW*0.1, yBottom, 1.2);
              pushTimber(ctx.inner, 'd', midX, qYBot, cr-cellW*0.1, yBottom, 1.2);
          }
          else if (style === 'runen') {
              pushTimber(ctx.inner, 'd', cellX, yTop, cr, yBottom, 1.4);
          }
          else if (style === 'rune_tiwaz') {
              pushTimber(ctx.inner, 'v', midX, yBottom, midX, yTop, 1.3);
              pushTimber(ctx.inner, 'd', midX, yTop, cellX+cellW*0.2, yTop-storyH*0.35, 1.2);
              pushTimber(ctx.inner, 'd', midX, yTop, cr-cellW*0.2, yTop-storyH*0.35, 1.2);
          }
          else if (style === 'rune_ingwaz') {
              pushTimber(ctx.inner, 'd', midX, yTop-storyH*0.15, cellX+cellW*0.25, midY, 1.2);
              pushTimber(ctx.inner, 'd', midX, yTop-storyH*0.15, cr-cellW*0.25, midY, 1.2);
              pushTimber(ctx.inner, 'd', cellX+cellW*0.25, midY, midX, yBottom+storyH*0.15, 1.2);
              pushTimber(ctx.inner, 'd', cr-cellW*0.25, midY, midX, yBottom+storyH*0.15, 1.2);
          }
      }
      function buildLayers() {
          scene = { 
              walls: {...createLayerGroup(), foregroundShapes: []}, 
              gables: [], 
              oriels: createLayerGroup(), 
              dormer: createLayerGroup(), 
              turrets: createLayerGroup() 
          };
          scene.oriels.roofs = []; 
          scene.dormer.path = []; 
          scene.dormer.bgColor = '';
          floorData = [];
          const baseCellW = 100; 
          const rows = parseInt(uiRows.value); 
          const cols = parseInt(uiCols.value); 
          const windowDensity = parseInt(uiWindowD.value) / 100; 
          const asym = parseFloat(uiAsym.value);
          let buildingVirtualW = (cols * baseCellW); 
          let maxW = buildingVirtualW; 
          let sockelH = uiSockel.checked ? (parseInt(uiSockelH.value) || 0) : 0; 
          let currentY = sockelH; 
          let topFloorW = 0; 
          let topFloorStartX = 0; 
          let topFloorMaterial = 'plaster'; 
          let topFloorYBot = 0;
          const useWinFrames = uiWinFrame.checked; 
          const doorType = uiDoorType.value; 
          const doorFrame = uiDoorFrame.value;
          let safeDoorPos = Math.min(parseInt(uiDoorPos.value) - 1, cols - 1);
          let totalPeakY = currentY; 
          const baseTurretW = baseCellW * parseFloat(uiTurretW.value); 
          const tStyle = uiTurretStyle.value; 
          let sockelStyle = document.getElementById('paramSockelStyle')?.value || 'stein_gerade';
          let sockelQuader = document.getElementById('paramSockelQuader')?.value || 'none';
          let isRuine = document.getElementById('paramRuine')?.value === 'overlay';
          if (sockelH > 0) {
              let sW_half = (cols * baseCellW) / 2 + 15; maxW = sW_half * 2;
              let p = [];
              if (sockelStyle === 'stein_schraeg') {
                  let botOut = sockelH * 0.4;
                  if ((sW_half + botOut) * 2 > maxW) maxW = (sW_half + botOut) * 2;
                  p = [{x: -sW_half - botOut, y: 0}, {x: sW_half + botOut, y: 0}, {x: sW_half, y: sockelH}, {x: -sW_half, y: sockelH}];
              } else if (sockelStyle !== 'holz_pfeiler') {
                  p = [{x: -sW_half, y: 0}, {x: sW_half, y: 0}, {x: sW_half, y: sockelH}, {x: -sW_half, y: sockelH}];
              }
              if (p.length > 0) {
                  scene.walls.bg.push({ color: COLOR_STONE, poly: p, isSockel: true, sockelStyle: sockelStyle, sockelQuader: sockelQuader, w: sW_half * 2, h: sockelH, sW_half: sW_half });
              } else if (sockelStyle === 'holz_pfeiler') {
                  scene.walls.bg.push({ isSockel: true, sockelStyle: 'holz_pfeiler', cols: cols, asym: asym, sW_half: sW_half, h: sockelH, virtualW: (cols * baseCellW) });
              }
          }
          if (isRuine && rows > 0) {
              let egH = parseFloat(document.getElementById('floorHeight-0')?.value || 1.5) * baseCellW;
              let sW_half = (cols * baseCellW) / 2 + 15;
              let maxRuinY = sockelH + egH * 0.85;
              let minRuinY = sockelH + egH * 0.15;
              let segments = 16;
              let step = (sW_half * 2) / segments;
              let pr = [];
              if (sockelStyle === 'stein_schraeg') {
                  let botOut = sockelH * 0.4;
                  pr.push({x: -sW_half - botOut, y: 0}, {x: sW_half + botOut, y: 0});
              } else {
                  pr.push({x: -sW_half, y: 0}, {x: sW_half, y: 0});
              }
              pr.push({x: sW_half, y: minRuinY + pseudoRandom(0, 1) * (maxRuinY - minRuinY)});
              for(let i=1; i<segments; i++) {
                  let px = sW_half - i*step;
                  let py = minRuinY + pseudoRandom(i, sockelH) * (maxRuinY - minRuinY);
                  pr.push({x: px, y: py});
              }
              pr.push({x: -sW_half, y: minRuinY + pseudoRandom(99, 1) * (maxRuinY - minRuinY)});
              scene.walls.backgroundShapes = scene.walls.backgroundShapes || [];
              scene.walls.backgroundShapes.push({
                  type: 'ruine_overlay', poly: pr, color: COLOR_STONE,
                  sockelQuader: sockelQuader, sockelStyle: sockelStyle, 
                  sW_half: sW_half, h: maxRuinY, sockelH: sockelH
              });
          }
          for (let j = 0; j < rows; j++) {
              const style = document.getElementById(`floorStyle-${j}`)?.value || 'skelett';
              const material = document.getElementById(`floorMaterial-${j}`)?.value || 'plaster';
              const matColor = material === 'stone' ? COLOR_STONE : material === 'brick' ? COLOR_BRICK : material === 'plaster2' ? COLOR_PLASTER2 : COLOR_PLASTER;
              const heightMult = parseFloat(document.getElementById(`floorHeight-${j}`)?.value || 1.3);
              const overhang = j === 0 ? 0 : parseInt(document.getElementById(`overHang-${j}`)?.value || 0);
              const decorH = j === 0 ? 0 : parseInt(document.getElementById(`decorHeight-${j}`)?.value || 30);
              const turretState = document.getElementById(`turret-${j}`)?.value || 'none'; 
              const orielState = document.getElementById(`oriel-${j}`)?.value || 'none';
              const decor = j === 0 ? 'none' : (document.getElementById(`floorDecor-${j}`)?.value || 'knaggen');
              const decorFill = j === 0 ? 'filled' : (document.getElementById(`decorFill-${j}`)?.value || 'filled');
              const storyH = baseCellW * heightMult; 
              let storyVirtualW = buildingVirtualW + (overhang * 2);
              if(storyVirtualW > maxW) maxW = storyVirtualW;
              let joistGap = (j > 0 && overhang > 0) ? decorH : 0;
              let startX = -storyVirtualW / 2; 
              let yBottom = currentY + joistGap; 
              let yTop = yBottom + storyH;
              if (j === rows - 1) { topFloorW = storyVirtualW; topFloorStartX = startX; topFloorMaterial = material; topFloorYBot = yBottom; }
              floorData.push({ yBot: yBottom, yTop: yTop, joistGapY: currentY, startX: startX, width: storyVirtualW, turret: turretState, oriel: orielState, mat: material, matColor: matColor, style: style });
              if (joistGap > 0) {
                  if (j > 0) {
                      let innerFloor = floorData[j-1]; let iStartX = innerFloor.startX; let iEndX = innerFloor.startX + innerFloor.width; let eStartX = startX; let eEndX = -startX;
                      if (decorFill === 'open') {
                          scene.walls.bg.push({ color: darkenColor(matColor, 15), poly: [{x: iStartX, y: currentY}, {x: iEndX, y: currentY}, {x: iEndX, y: yBottom}, {x: iStartX, y: yBottom}] });
                          scene.walls.bg.push({ color: darkenColor(matColor, 40), poly: [{x: eStartX, y: yBottom}, {x: eEndX, y: yBottom}, {x: iEndX, y: yBottom-2}, {x: iStartX, y: yBottom-2}] });
                      } else {
                          let bgPath = [{type:'M', x: eStartX, y: yBottom}, {type:'L', x: eEndX, y: yBottom}];
                          if (decor === 'konsolen') { 
                              bgPath.push({type:'B', cx1: eEndX, cy1: currentY + (yBottom-currentY)*0.5, cx2: iEndX, cy2: currentY + (yBottom-currentY)*0.2, x: iEndX, y: currentY}, {type:'L', x: iStartX, y: currentY}, {type:'B', cx1: iStartX, cy1: currentY + (yBottom-currentY)*0.2, cx2: eStartX, cy2: currentY + (yBottom-currentY)*0.5, x: eStartX, y: yBottom});
                          } else if (decor === 'knaggen') { 
                              bgPath.push({type:'B', cx1: eEndX, cy1: yBottom, cx2: iEndX, cy2: yBottom, x: iEndX, y: currentY}, {type:'L', x: iStartX, y: currentY}, {type:'B', cx1: iStartX, cy1: yBottom, cx2: eStartX, cy2: yBottom, x: eStartX, y: yBottom});
                          } else if (typeof decor !== 'undefined' && decor === 'abgetreppt' || typeof cornice !== 'undefined' && cornice === 'abgetreppt') {
                      let jg = yBottom - currentY;
                      let o = typeof overhang !== 'undefined' ? overhang : rOver;
                      bgPath.push(
                          {type:'L', x: iEndX + o*0.66, y: yBottom},
                          {type:'L', x: iEndX + o*0.66, y: currentY + jg*0.66},
                          {type:'L', x: iEndX + o*0.33, y: currentY + jg*0.66},
                          {type:'L', x: iEndX + o*0.33, y: currentY + jg*0.33},
                          {type:'L', x: iEndX, y: currentY + jg*0.33},
                          {type:'L', x: iEndX, y: currentY},
                          {type:'L', x: iStartX, y: currentY},
                          {type:'L', x: iStartX, y: currentY + jg*0.33},
                          {type:'L', x: iStartX - o*0.33, y: currentY + jg*0.33},
                          {type:'L', x: iStartX - o*0.33, y: currentY + jg*0.66},
                          {type:'L', x: iStartX - o*0.66, y: currentY + jg*0.66},
                          {type:'L', x: iStartX - o*0.66, y: yBottom},
                          {type:'L', x: eStartX, y: yBottom}
                      );
                  } else {
                      bgPath.push({type:'L', x: eEndX, y: currentY}, {type:'L', x: eStartX, y: currentY}, {type:'L', x: eStartX, y: yBottom});
                      pushTimber(scene.walls.frameTimbers, 'h', eStartX - 8.5, currentY, eEndX + 8.5, currentY, 1.4);
                  }
                          scene.walls.bg.push({ color: darkenColor(matColor, 15), path: bgPath });
                      }
                  } else { 
                      scene.walls.bg.push({ color: darkenColor(matColor, 15), poly: [{x: startX, y: currentY}, {x: -startX, y: currentY}, {x: -startX, y: yBottom}, {x: startX, y: yBottom}] }); 
                  }
              }
              scene.walls.bg.push({ color: matColor, poly: [{x: startX, y: yBottom}, {x: -startX, y: yBottom}, {x: -startX, y: yTop}, {x: startX, y: yTop}] });
              let egCornerStyle = document.getElementById('paramEgCorners')?.value || 'gerade';
              let egCornerSide = document.getElementById('paramEgCornersSide')?.value || 'both';
              let nextOverhang = (j === 0 && rows > 1) ? parseInt(document.getElementById(`overHang-1`)?.value || 0) : 0;
              if (j === 0 && nextOverhang > 0 && egCornerStyle !== 'gerade') {
                  let nextJoistGap = parseInt(document.getElementById(`decorHeight-1`)?.value || 30);
                  let corbelTopY = yTop + nextJoistGap; 
                  let outerX = startX - nextOverhang;
                  let rOuterX = -startX + nextOverhang;
                  let lipH = Math.min(25, nextOverhang * 0.4); 
                  let lipY = corbelTopY - lipH; 
                  let curveStartY = yBottom + storyH * 0.15; 
                  let leftPath = []; let rightPath = []; let jointsLeft = []; let jointsRight = [];
                  if (egCornerStyle === 'geschwungen') {
                      let pullYTop = lipY - storyH * 0.5; 
                      let pullYBot = curveStartY + storyH * 0.3; 
                      leftPath = [
                          {type: 'M', x: startX, y: yBottom}, {type: 'L', x: startX, y: corbelTopY}, 
                          {type: 'L', x: outerX, y: corbelTopY}, {type: 'L', x: outerX, y: lipY}, 
                          {type: 'B', cx1: outerX, cy1: pullYTop, cx2: startX, cy2: pullYBot, x: startX, y: curveStartY},
                          {type: 'L', x: startX, y: yBottom}
                      ];
                      rightPath = [
                          {type: 'M', x: -startX, y: yBottom}, {type: 'L', x: -startX, y: corbelTopY}, 
                          {type: 'L', x: rOuterX, y: corbelTopY}, {type: 'L', x: rOuterX, y: lipY}, 
                          {type: 'B', cx1: rOuterX, cy1: pullYTop, cx2: -startX, cy2: pullYBot, x: -startX, y: curveStartY},
                          {type: 'L', x: -startX, y: yBottom}
                      ];
                      if (material === 'stone' || material === 'plaster') {
                          jointsLeft.push({x1: startX, y1: lipY, x2: outerX, y2: lipY}); 
                          jointsRight.push({x1: -startX, y1: lipY, x2: rOuterX, y2: lipY}); 
                          let jY1 = curveStartY + (lipY - curveStartY) * 0.35;
                          let jY2 = curveStartY + (lipY - curveStartY) * 0.70;
                          jointsLeft.push({x1: startX, y1: jY1, x2: startX - nextOverhang*0.15, y2: jY1});
                          jointsLeft.push({x1: startX, y1: jY2, x2: startX - nextOverhang*0.65, y2: jY2});
                          jointsRight.push({x1: -startX, y1: jY1, x2: -startX + nextOverhang*0.15, y2: jY1});
                          jointsRight.push({x1: -startX, y1: jY2, x2: -startX + nextOverhang*0.65, y2: jY2});
                      }
                  } else if (egCornerStyle === 'abgeschraegt') {
                      leftPath = [
                          {type: 'M', x: startX, y: yBottom}, {type: 'L', x: startX, y: corbelTopY}, 
                          {type: 'L', x: outerX, y: corbelTopY}, {type: 'L', x: outerX, y: lipY}, 
                          {type: 'L', x: startX, y: curveStartY}, {type: 'L', x: startX, y: yBottom}
                      ];
                      rightPath = [
                          {type: 'M', x: -startX, y: yBottom}, {type: 'L', x: -startX, y: corbelTopY}, 
                          {type: 'L', x: rOuterX, y: corbelTopY}, {type: 'L', x: rOuterX, y: lipY}, 
                          {type: 'L', x: -startX, y: curveStartY}, {type: 'L', x: -startX, y: yBottom}
                      ];
                      if (material === 'stone' || material === 'plaster') {
                          jointsLeft.push({x1: startX, y1: lipY, x2: outerX, y2: lipY});
                          jointsRight.push({x1: -startX, y1: lipY, x2: rOuterX, y2: lipY});
                      }
                  } else if (egCornerStyle === 'verzahnt') {
                      let vStartY = yBottom + storyH * 0.45; 
                      let dy = lipY - vStartY;
                      let lStepX1 = startX - nextOverhang * 0.85;
                      let lStepX2 = startX - nextOverhang * 0.45;
                      let stepY1  = lipY - dy * 0.35;
                      let stepY2  = lipY - dy * 0.70;
                      let rStepX1 = -startX + nextOverhang * 0.85;
                      let rStepX2 = -startX + nextOverhang * 0.45;
                      leftPath = [
                          {type: 'M', x: startX, y: yBottom}, {type: 'L', x: startX, y: corbelTopY}, 
                          {type: 'L', x: outerX, y: corbelTopY}, {type: 'L', x: outerX, y: lipY}, 
                          {type: 'B', cx1: outerX, cy1: stepY1, cx2: lStepX1, cy2: lipY, x: lStepX1, y: stepY1},
                          {type: 'B', cx1: lStepX1, cy1: stepY2, cx2: lStepX2, cy2: stepY1, x: lStepX2, y: stepY2},
                          {type: 'B', cx1: lStepX2, cy1: vStartY, cx2: startX, cy2: stepY2, x: startX, y: vStartY},
                          {type: 'L', x: startX, y: yBottom}
                      ];
                      rightPath = [
                          {type: 'M', x: -startX, y: yBottom}, {type: 'L', x: -startX, y: corbelTopY}, 
                          {type: 'L', x: rOuterX, y: corbelTopY}, {type: 'L', x: rOuterX, y: lipY}, 
                          {type: 'B', cx1: rOuterX, cy1: stepY1, cx2: rStepX1, cy2: lipY, x: rStepX1, y: stepY1},
                          {type: 'B', cx1: rStepX1, cy1: stepY2, cx2: rStepX2, cy2: stepY1, x: rStepX2, y: stepY2},
                          {type: 'B', cx1: rStepX2, cy1: vStartY, cx2: -startX, cy2: stepY2, x: -startX, y: vStartY},
                          {type: 'L', x: -startX, y: yBottom}
                      ];
                      if (material === 'stone' || material === 'plaster') {
                          jointsLeft.push({x1: startX, y1: lipY, x2: outerX, y2: lipY});
                          jointsRight.push({x1: -startX, y1: lipY, x2: rOuterX, y2: lipY});
                          jointsLeft.push({x1: startX, y1: stepY1, x2: lStepX1, y2: stepY1});
                          jointsLeft.push({x1: startX, y1: stepY2, x2: lStepX2, y2: stepY2});
                          jointsRight.push({x1: -startX, y1: stepY1, x2: rStepX1, y2: stepY1});
                          jointsRight.push({x1: -startX, y1: stepY2, x2: rStepX2, y2: stepY2});
                      }
                  } else if (egCornerStyle === 'pfeiler') {
                      let baseH = storyH * 0.22;
                      let capH = storyH * 0.25;
                      let shaftW = nextOverhang * 0.60;
                      let baseW = nextOverhang * 0.85;
                      let lShaft = startX - shaftW;
                      let lBase = startX - baseW;
                      leftPath = [
                          {type: 'M', x: startX, y: yBottom},
                          {type: 'L', x: startX, y: corbelTopY},
                          {type: 'L', x: outerX, y: corbelTopY},
                          {type: 'L', x: outerX, y: lipY},
                          {type: 'B', cx1: outerX, cy1: lipY - capH*0.4, cx2: lShaft, cy2: lipY - capH*0.1, x: lShaft, y: lipY - capH},
                          {type: 'L', x: lShaft, y: yBottom + baseH},
                          {type: 'L', x: lBase, y: yBottom + baseH * 0.75},
                          {type: 'L', x: lBase, y: yBottom + baseH * 0.25},
                          {type: 'L', x: startX - baseW*0.9, y: yBottom},
                          {type: 'L', x: startX, y: yBottom}
                      ];
                      let rShaft = -startX + shaftW;
                      let rBase = -startX + baseW;
                      rightPath = [
                          {type: 'M', x: -startX, y: yBottom},
                          {type: 'L', x: -startX, y: corbelTopY},
                          {type: 'L', x: rOuterX, y: corbelTopY},
                          {type: 'L', x: rOuterX, y: lipY},
                          {type: 'B', cx1: rOuterX, cy1: lipY - capH*0.4, cx2: rShaft, cy2: lipY - capH*0.1, x: rShaft, y: lipY - capH},
                          {type: 'L', x: rShaft, y: yBottom + baseH},
                          {type: 'L', x: rBase, y: yBottom + baseH * 0.75},
                          {type: 'L', x: rBase, y: yBottom + baseH * 0.25},
                          {type: 'L', x: -startX + baseW*0.9, y: yBottom},
                          {type: 'L', x: -startX, y: yBottom}
                      ];
                      if (typeof sockelH !== 'undefined' && sockelH > 0) {
                          let lPost = startX - baseW * 0.95; 
                          let rPost = -startX + baseW * 0.95;
                          let sColor = typeof COLOR_STONE !== 'undefined' ? COLOR_STONE : '#94a3b8';
                          scene.walls.bg.push({ type: 'eg_auskragung', color: sColor, path: [
                              {type: 'M', x: startX, y: yBottom}, {type: 'L', x: lPost, y: yBottom}, 
                              {type: 'L', x: lPost, y: 0}, {type: 'L', x: startX, y: 0}
                          ], joints: [ {x1: lPost, y1: yBottom*0.33, x2: startX, y2: yBottom*0.33}, {x1: lPost, y1: yBottom*0.66, x2: startX, y2: yBottom*0.66} ] });
                          scene.walls.bg.push({ type: 'eg_auskragung', color: sColor, path: [
                              {type: 'M', x: -startX, y: yBottom}, {type: 'L', x: rPost, y: yBottom}, 
                              {type: 'L', x: rPost, y: 0}, {type: 'L', x: -startX, y: 0}
                          ], joints: [ {x1: rPost, y1: yBottom*0.33, x2: -startX, y2: yBottom*0.33}, {x1: rPost, y1: yBottom*0.66, x2: -startX, y2: yBottom*0.66} ] });
                      }
                      if (material === 'stone' || material === 'plaster') {
                          jointsLeft.push({x1: startX, y1: lipY, x2: outerX, y2: lipY});
                          jointsLeft.push({x1: startX, y1: lipY - capH*0.25, x2: startX - nextOverhang*0.8, y2: lipY - capH*0.25});
                          jointsLeft.push({x1: startX, y1: lipY - capH*0.5, x2: startX - nextOverhang*0.65, y2: lipY - capH*0.5});
                          jointsLeft.push({x1: startX, y1: lipY - capH, x2: lShaft, y2: lipY - capH});
                          jointsLeft.push({x1: startX, y1: yBottom + baseH, x2: lShaft, y2: yBottom + baseH});
                          jointsLeft.push({x1: startX, y1: yBottom + baseH*0.75, x2: lBase, y2: yBottom + baseH*0.75});
                          jointsLeft.push({x1: startX, y1: yBottom + baseH*0.25, x2: lBase, y2: yBottom + baseH*0.25});
                          jointsLeft.push({x1: startX - shaftW*0.5, y1: yBottom + baseH, x2: startX - shaftW*0.5, y2: lipY - capH});
                          jointsLeft.push({x1: startX - shaftW*0.25, y1: yBottom + baseH, x2: startX - shaftW*0.25, y2: lipY - capH});
                          jointsRight.push({x1: -startX, y1: lipY, x2: rOuterX, y2: lipY});
                          jointsRight.push({x1: -startX, y1: lipY - capH*0.25, x2: -startX + nextOverhang*0.8, y2: lipY - capH*0.25});
                          jointsRight.push({x1: -startX, y1: lipY - capH*0.5, x2: -startX + nextOverhang*0.65, y2: lipY - capH*0.5});
                          jointsRight.push({x1: -startX, y1: lipY - capH, x2: rShaft, y2: lipY - capH});
                          jointsRight.push({x1: -startX, y1: yBottom + baseH, x2: rShaft, y2: yBottom + baseH});
                          jointsRight.push({x1: -startX, y1: yBottom + baseH*0.75, x2: rBase, y2: yBottom + baseH*0.75});
                          jointsRight.push({x1: -startX, y1: yBottom + baseH*0.25, x2: rBase, y2: yBottom + baseH*0.25});
                          jointsRight.push({x1: -startX + shaftW*0.5, y1: yBottom + baseH, x2: -startX + shaftW*0.5, y2: lipY - capH});
                          jointsRight.push({x1: -startX + shaftW*0.25, y1: yBottom + baseH, x2: -startX + shaftW*0.25, y2: lipY - capH});
                      }
                  }
  if (egCornerSide === 'left' || egCornerSide === 'both') {
                      scene.walls.bg.push({ type: 'eg_auskragung', color: matColor, path: leftPath, joints: jointsLeft });
                  }
                  if (egCornerSide === 'right' || egCornerSide === 'both') {
                      scene.walls.bg.push({ type: 'eg_auskragung', color: matColor, path: rightPath, joints: jointsRight });
                  }
              }
              pushTimber(scene.walls.frameTimbers, 'h', startX, yBottom, -startX, yBottom, 1.6);
              pushTimber(scene.walls.frameTimbers, 'h', startX, yTop, -startX, yTop, 1.4);
              if (style === 'stein_bogen') {
                  const arches = parseInt(document.getElementById(`archCount-${j}`)?.value || 4);
                  const archType = document.getElementById(`archType-${j}`)?.value || 'rund';
                  const archW = storyVirtualW / arches; const archH = storyH * 0.75; 
                  for(let i=0; i<arches; i++) { scene.walls.arches.push({cx: startX + (i + 0.5) * archW, y: yBottom, w: archW * 0.8, h: archH, type: archType}); }
              }
              if (j > 0 && overhang > 0) {
                   let innerFloor = floorData[j-1];
                   if (decor === 'abgetreppt') {
                       let y0 = currentY; let y1 = currentY + joistGap * 0.33; let y2 = currentY + joistGap * 0.66; let y3 = yBottom;
                       let iStartX = innerFloor.startX; let iEndX = innerFloor.startX + innerFloor.width;
                       let eStartX = startX; let eEndX = startX + storyVirtualW;
                       let tOff = parseInt(uiThick.value) * 1.05;
                       pushTimber(scene.walls.frameTimbers, 'h', iStartX - tOff, y0, iEndX + tOff, y0, 1.4); 
                       pushTimber(scene.walls.frameTimbers, 'v', iStartX, y0 - tOff, iStartX, y1 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iEndX, y0 - tOff, iEndX, y1 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'h', iStartX - overhang*0.33 - tOff, y1, iEndX + overhang*0.33 + tOff, y1, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iStartX - overhang*0.33, y1 - tOff, iStartX - overhang*0.33, y2 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iEndX + overhang*0.33, y1 - tOff, iEndX + overhang*0.33, y2 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'h', iStartX - overhang*0.66 - tOff, y2, iEndX + overhang*0.66 + tOff, y2, 1.4); 
                       pushTimber(scene.walls.frameTimbers, 'v', iStartX - overhang*0.66, y2 - tOff, iStartX - overhang*0.66, y3 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iEndX + overhang*0.66, y2 - tOff, iEndX + overhang*0.66, y3 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'h', eStartX - tOff, y3, eEndX + tOff, y3, 1.6);
                   } else if (decor === 'schiffskehle') {
                       let iStartX = innerFloor.startX; let iEndX = innerFloor.startX + innerFloor.width;
                       let eStartX = startX; let eEndX = startX + storyVirtualW;
                       pushTimber(scene.walls.innerTimbers, 'd', iStartX, currentY, eStartX, yBottom, 1.0, true, eStartX, currentY, eStartX, yBottom);
                       pushTimber(scene.walls.innerTimbers, 'd', iEndX, currentY, eEndX, yBottom, 1.0, true, eEndX, currentY, eEndX, yBottom);
                   }
                   for(let i=0; i<=cols; i++) { 
                       let bx = startX + getCellX(i, cols, storyVirtualW, asym); 
                       let innerBx = innerFloor.startX + getCellX(i, cols, innerFloor.width, asym);
                       if (decor !== 'none' && decor !== 'abgetreppt' && decor !== 'schiffskehle') {
                           let bk_w = 14; 
                           let bk_y = yBottom - Math.min(joistGap * 0.15, 4); 
                           pushTimber(scene.walls.frameTimbers, 'h', bx - bk_w, bk_y, bx + bk_w, bk_y, 1.4);
                       }
                       if (decor === 'konsolen') {
                           if (Math.abs(bx - innerBx) > 2) {
                               scene.walls.customShapes.push({ type: 'konsole', color: COLOR_TIMBER, x1: innerBx, y1: currentY, x2: bx, y2: yBottom });
                           } else {
                               pushTimber(scene.walls.frameTimbers, 'v', bx, currentY - 1.0, bx, yBottom, 1.6);
                           }
                       } else if (decor === 'knaggen') {
                           if (Math.abs(bx - innerBx) > 2) {
                               pushTimber(scene.walls.innerTimbers, 'd', innerBx, currentY, bx, yBottom, 1.2, true, innerBx, yBottom, bx, yBottom); 
                           } else {
                               pushTimber(scene.walls.frameTimbers, 'v', bx, currentY - 1.0, bx, yBottom, 1.6);
                           }
                       } else if (decor === 'none') {
                           pushTimber(scene.walls.frameTimbers, 'v', bx, currentY - 1.0, bx, yBottom, 1.6);}
                   }
                   if (decor === 'stamm_5eck' || decor === 'stamm_spitz' || decor === 'stamm_quadrat' || decor === 'stamm_rund' || decor === 'stamm_rund' || decor === 'stamm_quadrat' || decor === 'stamm_rund') {
                       for(let i = 0; i <= cols; i++) {
                           let bx = startX + getCellX(i, cols, storyVirtualW, asym);
                           scene.walls.customShapes.push({type: decor, color: COLOR_TIMBER, cx: bx, cy: yBottom, size: 14});
                       }
                   } else if (decor === 'neidkoepfe') { 
                       scene.walls.customShapes.push({type: 'neidkopf', color: COLOR_TIMBER, cx: startX + 15, cy: yBottom, size: 20, flip: true}); 
                       scene.walls.customShapes.push({type: 'neidkopf', color: COLOR_TIMBER, cx: -startX - 15, cy: yBottom, size: 20, flip: false}); 
                   }
              }
              let pCtx = { inner: scene.walls.innerTimbers, frame: scene.walls.frameTimbers, pre: scene.walls.preShapes, post: scene.walls.postShapes, color: matColor };
              for (let i = 0; i < cols; i++) {
                  let cl = startX + getCellX(i, cols, storyVirtualW, asym); 
                  let cr = startX + getCellX(i+1, cols, storyVirtualW, asym); 
                  let cw = cr - cl;
                  let isDoorBay = (j === 0 && i === safeDoorPos && doorType !== 'none' && style !== 'stein_bogen');
                  if (style !== 'stein_bogen') { 
                       let skipLeftPost = (style === 'hessenmann' && i % 2 === 1 && i < cols - 1) || (style === 'halber_mann' && i > 0) || style === 'eier_fries';
                       if (!skipLeftPost) pushTimber(scene.walls.frameTimbers, 'v', cl, yBottom, cl, yTop, 1.6);
                       if (i === cols - 1 && style !== 'eier_fries') pushTimber(scene.walls.frameTimbers, 'v', cr, yBottom, cr, yTop, 1.6);
                  }
                  if (isDoorBay) {
                      let dW = doorType === 'einzeltuer' ? cw * 0.5 : cw * 0.8; 
                      let dH = doorType === 'rundbogen' ? storyH * 0.85 : storyH * 0.8; 
                      let dX = cl + (cw - dW) / 2; let dY = yBottom;
                      scene.walls.doors.push({x: dX, y: dY, w: dW, h: dH, type: doorType, frame: doorFrame});
                      if (doorFrame === 'holz') {
                          pushTimber(scene.walls.frameTimbers, 'h', cl, dY + dH, cr, dY + dH, 1.2); 
                          pushTimber(scene.walls.frameTimbers, 'v', dX, dY, dX, dY + dH, 1.1); 
                          pushTimber(scene.walls.frameTimbers, 'v', dX + dW, dY, dX + dW, dY + dH, 1.1);
                          if (storyH - dH > 10 && doorType !== 'rundbogen') pushTimber(scene.walls.innerTimbers, 'v', cl+cw/2, dY + dH, cl+cw/2, yTop, 0.9);
                          if (doorType === 'rundbogen') pushTimber(scene.walls.innerTimbers, 'h', dX, dY + dH - dW/2, dX + dW, dY + dH - dW/2, 0.9);
                      } else if (doorFrame === 'stein') {
                          scene.walls.customShapes.push({ type: 'stone_frame', color: COLOR_STONE, x: dX, y: dY, w: dW, h: dH, doorType: doorType });
                      }
                      if (sockelH > 0) {
                          let steps = Math.max(1, Math.floor(sockelH / 12)); 
                          let stepH = sockelH / steps; 
                          let stepW_inc = 15; 
                          for(let s=0; s<steps; s++) { 
                              scene.walls.customShapes.push({ type: 'stairs', color: COLOR_STONE, x: dX - (s+1)*stepW_inc, y: sockelH - (s+1)*stepH, w: dW + (s+1)*stepW_inc*2, h: stepH }); 
                          }
                      }
                  } else if (style !== 'stein_bogen' && style !== 'skelett') {
                      if (style === 'hessenmann') { 
                          if(i < cols - 1 && i % 2 === 0) { 
                              let cr2 = startX + getCellX(i+2, cols, storyVirtualW, asym); 
                              drawPattern(style, pCtx, cl, yBottom, cr2-cl, storyH); 
                              pushTimber(scene.walls.frameTimbers, 'v', cr2, yBottom, cr2, yTop, 1.6); 
                              i++; 
                          } else { 
                              drawPattern('wilder_mann', pCtx, cl, yBottom, cw, storyH); 
                          }
                      } else { 
                          drawPattern(style, pCtx, cl, yBottom, cw, storyH); 
                      }
                  }
                  let globDec = parseInt(document.getElementById('paramGlobalDecor')?.value || 0) / 100;
                  if (globDec > 0 && style !== 'stein_bogen' && !isDoorBay) {
                      let dThick = parseInt(document.getElementById('paramThick')?.value || 8) * 1.5;
                      let isLeftCorner = (i === 0);
                      let isRightCorner = (i === cols - 1);
                      if (j > 0 && pseudoRandom(i*11, j*7) < globDec * 0.85) {
                          let rType = pseudoRandom(i, j*3);
                          if (rType < 0.25) {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'text', x: cl, y: yBottom, w: cw, h: dThick, color: COLOR_TIMBER});
                          } else if (rType < 0.45) {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'ranken', x: cl, y: yBottom, w: cw, h: dThick, color: COLOR_TIMBER});
                          } else if (rType < 0.75) {
                              let rSize = Math.min(cw * 0.45, 55); 
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'sonnenrad', x: cl + cw/2, y: yBottom, size: rSize, color: COLOR_TIMBER});
                          } else {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'feston', x: cl + cw/2, y: yBottom + storyH*0.2, w: cw*0.8, h: storyH*0.15, color: COLOR_TIMBER});
                          }
                      }
                      if ((isLeftCorner || isRightCorner) && j > 0 && pseudoRandom(j, 99) < globDec) {
                          let cx = isLeftCorner ? cl : cr;
                          scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'akanthus', x: cx, yTop: yTop, yBot: yBottom, size: dThick * 1.6, color: COLOR_TIMBER});
                      }
                      if (i > 0 && !isRightCorner && pseudoRandom(i*5, j*13) < globDec * 0.7) {
                          let rType = pseudoRandom(j, i*2);
                          if (rType < 0.35) {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'zopf', x: cl, yTop: yTop, yBot: yBottom, size: dThick, color: COLOR_TIMBER});
                          } else if (rType < 0.55) {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'saeule', x: cl, yTop: yTop, yBot: yBottom, size: dThick * 1.2, color: COLOR_TIMBER});
                          } else if (rType < 0.75) {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'wappen', x: cl, y: yBottom + storyH*0.4, size: dThick*1.6, color: COLOR_TIMBER});
                          } else {
                              scene.walls.customShapes.push({type: 'fassaden_dekor', decorType: 'maske', x: cl, y: yBottom + storyH*0.7, size: dThick*1.4, color: COLOR_TIMBER});
                          }
                      }
                  }
                  const decoratedStyles = ['geschweiftes_kreuz', 'sternraute', 'rautennetz', 'katze_kopf', 'katze_nase', 'wappen_voll', 'rune_othala', 'rune_ingwaz', 'herzform']; 
                  if (!isDoorBay && style !== 'stein_bogen' && material === 'plaster' && !decoratedStyles.includes(style)) { 
                      if (pseudoRandom(i, j) < windowDensity) {
                          let winH = (style==='bogenfries' || style==='ziergitter' || style.includes('faecherrosette') || style==='massive_fussbaender') ? storyH * 0.45 : storyH;
                          let winY = (style==='bogenfries') ? yBottom : yBottom + (storyH - winH);
                          addWindowLayer(scene.walls.windows, cl, winY, cw, winH, scene.walls.innerTimbers, useWinFrames); 
                      }
                  }
              }
              let pentRoofState = document.getElementById(`pentRoof-${j}`)?.value || 'none';
              if (pentRoofState !== 'none') {
                  let rHeight = baseCellW * 0.35; 
                  let roofYTop = yTop + (j > 0 ? 0 : 5); 
                  let drawPentRoof = (rx1, rx2) => {
                      scene.walls.foregroundShapes = scene.walls.foregroundShapes || [];
                      scene.walls.foregroundShapes.push({
                          type: 'wetterdach', x1: rx1, x2: rx2,
                          yTop: roofYTop, yBot: roofYTop - rHeight,
                          color: COLOR_TURRET_ROOF
                      });
                  };
                  if (pentRoofState === 'full') drawPentRoof(startX, -startX);
                  else if (pentRoofState === 'center') drawPentRoof(-storyVirtualW*0.35, storyVirtualW*0.35);
                  else if (pentRoofState === 'sides') { drawPentRoof(startX, startX + storyVirtualW*0.3); drawPentRoof(-startX - storyVirtualW*0.3, -startX); }
                  else if (pentRoofState === 'left') drawPentRoof(startX, startX + storyVirtualW*0.4);
                  else if (pentRoofState === 'right') drawPentRoof(-startX - storyVirtualW*0.4, -startX);
              }
              currentY = yTop;
          }
          let getBayCenter = (bayIndex, floorW, fStart) => {
              let i1 = Math.max(0, Math.min(bayIndex, cols - 1));
              let i2 = Math.max(0, Math.min(bayIndex + 1, cols));
              let cl = getCellX(i1, cols, floorW, asym);
              let cr = getCellX(i2, cols, floorW, asym);
              return fStart + (cl + cr) / 2;
          };
          ['left', 'center', 'right'].forEach(pos => {
              let sequenceActive = false; let seqStartIdx = -1;
              for(let j=0; j<=rows; j++) {
                  let hasOriel = j < rows && (floorData[j].oriel === pos);
                  if (hasOriel && !sequenceActive) { sequenceActive = true; seqStartIdx = j; } 
                  else if (!hasOriel && sequenceActive) {
                      let endIdx = j - 1; let fStart = floorData[seqStartIdx]; let fEnd = floorData[endIdx];
                      let xCenter = 0;
                      if (pos === 'left') xCenter = getBayCenter(1, fEnd.width, fEnd.startX);
                      else if (pos === 'right') xCenter = getBayCenter(cols - 2, fEnd.width, fEnd.startX);
                      else xCenter = getBayCenter(Math.floor(cols / 2), fEnd.width, fEnd.startX);
                      let orielW = baseCellW * 1.4;
                      let cW = orielW * 0.5; let sW = orielW * 0.25;
                      let leftEdge = xCenter - cW/2 - sW; let rightEdge = xCenter + cW/2 + sW;
                      let tBot = fStart.yBot; let tTop = fEnd.yTop;
                      let corbelY = tBot - orielW * 0.6; 
                      let matColor = fEnd.matColor;
                      let cBgPath = [ {type: 'M', x: leftEdge, y: tBot}, {type: 'L', x: rightEdge, y: tBot}, {type: 'B', cx1: rightEdge, cy1: corbelY, cx2: xCenter + cW/2, cy2: corbelY, x: xCenter, y: corbelY}, {type: 'B', cx1: xCenter - cW/2, cy1: corbelY, cx2: leftEdge, cy2: corbelY, x: leftEdge, y: tBot} ];
                      scene.oriels.bg.push({ color: darkenColor(matColor, 15), path: cBgPath });
                      pushTimber(scene.oriels.frameTimbers, 'd', xCenter, corbelY, leftEdge, tBot, 1.2, true, xCenter-cW/2, corbelY, leftEdge, corbelY);
                      pushTimber(scene.oriels.frameTimbers, 'd', xCenter, corbelY, rightEdge, tBot, 1.2, true, xCenter+cW/2, corbelY, rightEdge, corbelY);
                      pushTimber(scene.oriels.innerTimbers, 'v', xCenter-cW/2, tBot, xCenter-cW/4, corbelY+10, 1.0);
                      pushTimber(scene.oriels.innerTimbers, 'v', xCenter+cW/2, tBot, xCenter+cW/4, corbelY+10, 1.0);
                      for(let k=seqStartIdx; k<=endIdx; k++) {
                          let kFloor = floorData[k];
                          scene.oriels.bg.push({ color: darkenColor(matColor, 15), poly: [{x: leftEdge, y: kFloor.yBot}, {x: xCenter-cW/2, y: kFloor.yBot}, {x: xCenter-cW/2, y: kFloor.yTop}, {x: leftEdge, y: kFloor.yTop}] });
                          scene.oriels.bg.push({ color: matColor, poly: [{x: xCenter-cW/2, y: kFloor.yBot}, {x: xCenter+cW/2, y: kFloor.yBot}, {x: xCenter+cW/2, y: kFloor.yTop}, {x: xCenter-cW/2, y: kFloor.yTop}] });
                          scene.oriels.bg.push({ color: darkenColor(matColor, 25), poly: [{x: xCenter+cW/2, y: kFloor.yBot}, {x: rightEdge, y: kFloor.yBot}, {x: rightEdge, y: kFloor.yTop}, {x: xCenter+cW/2, y: kFloor.yTop}] });
                          pushTimber(scene.oriels.frameTimbers, 'h', leftEdge, kFloor.yBot, rightEdge, kFloor.yBot, 1.2);
                          if(k === endIdx) pushTimber(scene.oriels.frameTimbers, 'h', leftEdge, kFloor.yTop, rightEdge, kFloor.yTop, 1.2);
                          pushTimber(scene.oriels.frameTimbers, 'v', leftEdge, kFloor.yBot, leftEdge, kFloor.yTop, 1.1);
                          pushTimber(scene.oriels.frameTimbers, 'v', xCenter-cW/2, kFloor.yBot, xCenter-cW/2, kFloor.yTop, 1.1);
                          pushTimber(scene.oriels.frameTimbers, 'v', xCenter+cW/2, kFloor.yBot, xCenter+cW/2, kFloor.yTop, 1.1);
                          pushTimber(scene.oriels.frameTimbers, 'v', rightEdge, kFloor.yBot, rightEdge, kFloor.yTop, 1.1);
                          pushTimber(scene.oriels.innerTimbers, 'd', leftEdge, kFloor.yBot, xCenter-cW/2, kFloor.yTop, 0.8); 
                          pushTimber(scene.oriels.innerTimbers, 'd', xCenter-cW/2, kFloor.yBot, leftEdge, kFloor.yTop, 0.8);
                          pushTimber(scene.oriels.innerTimbers, 'd', xCenter+cW/2, kFloor.yBot, rightEdge, kFloor.yTop, 0.8); 
                          pushTimber(scene.oriels.innerTimbers, 'd', rightEdge, kFloor.yBot, xCenter+cW/2, kFloor.yTop, 0.8);
                          addWindowLayer(scene.oriels.windows, xCenter-cW/2, kFloor.yBot, cW, kFloor.yTop - kFloor.yBot, scene.oriels.innerTimbers, useWinFrames);
                      }
                      let roofY = tTop + orielW * 0.7;
                      scene.oriels.roofs.push({ color: COLOR_TURRET_ROOF, poly: [{x: leftEdge, y: tTop}, {x: rightEdge, y: tTop}, {x: xCenter, y: roofY}] });
                      pushTimber(scene.oriels.frameTimbers, 'v', xCenter, tTop, xCenter, roofY, 1.0); 
                      pushTimber(scene.oriels.frameTimbers, 'd', leftEdge, tTop, xCenter, roofY, 1.2); 
                      pushTimber(scene.oriels.frameTimbers, 'd', rightEdge, tTop, xCenter, roofY, 1.2);
                      if(roofY > totalPeakY) totalPeakY = roofY;
                      let currentOrielMaxX = Math.abs(xCenter) + orielW*0.5 + 20;
                      if(currentOrielMaxX * 2 > maxW) maxW = currentOrielMaxX * 2;
                      sequenceActive = false;
                  }
              }
          });
          ['left', 'right'].forEach(side => {
              let sequenceActive = false; let seqStartIdx = -1;
              for(let j=0; j<=rows; j++) {
                  let hasTurret = j < rows && (floorData[j].turret === side || floorData[j].turret === 'both');
                  if (hasTurret && !sequenceActive) { sequenceActive = true; seqStartIdx = j; } 
                  else if (!hasTurret && sequenceActive) {
                      let endIdx = j - 1; let fStart = floorData[seqStartIdx]; let fEnd = floorData[endIdx];
                      let xCenter = side === 'left' ? fEnd.startX - baseTurretW/2 + 10 : (fEnd.startX + fEnd.width) + baseTurretW/2 - 10;
                      let tBot = fStart.yBot; let tTop = fEnd.yTop;
                      let isMassive = tStyle.startsWith('massiv_');
                      let matColor = COLOR_TURRET;
                      if(tStyle === 'massiv_stein') matColor = COLOR_STONE;
                      if(tStyle === 'massiv_ziegel') matColor = COLOR_BRICK;
                      if(tStyle === 'massiv_putz') matColor = COLOR_TURRET;
                      let corbelY = tBot - baseTurretW * 0.25; 
                      let roofY = tTop + baseTurretW * 1.5;
                      let left = xCenter - baseTurretW/2; 
                      let right = xCenter + baseTurretW/2;
                      let wallColor = COLOR_TIMBER; 
                      for(let kFill=seqStartIdx; kFill<=endIdx; kFill++) {
                          let kFloor = floorData[kFill];
                          let wEdgeK = side === 'left' ? kFloor.startX : kFloor.startX + kFloor.width;
                          scene.turrets.bg.push({ color: wallColor, poly: [{x: xCenter, y: kFloor.yBot}, {x: wEdgeK, y: kFloor.yBot}, {x: wEdgeK, y: kFloor.yTop}, {x: xCenter, y: kFloor.yTop}] });
                      }
                      let tRoofStyle = document.getElementById('paramTurretRoofStyle')?.value || 'spitz';
                      if (tRoofStyle === 'flach') roofY = tTop + baseTurretW * 0.8;
                      else if (tRoofStyle === 'krueppel') roofY = tTop + baseTurretW * 0.9;
                      else if (tRoofStyle === 'barock') roofY = tTop + baseTurretW * 1.25;
                      else roofY = tTop + baseTurretW * 1.5;
                      let tBgPath = [ 
                          {type: 'M', x: left, y: tBot}, {type: 'L', x: left, y: tTop}, 
                          {type: 'L', x: right, y: tTop}, {type: 'L', x: right, y: tBot}, 
                          {type: 'B', cx1: right, cy1: corbelY, cx2: left, cy2: corbelY, x: left, y: tBot} 
                      ];
                      scene.turrets.bg.push({ color: darkenColor(matColor, 5), path: tBgPath });
                      let tCorniceOverhang = 8;
                      let cLeft = left - tCorniceOverhang;
                      let cRight = right + tCorniceOverhang;
                      pushTimber(scene.turrets.frameTimbers, 'h', cLeft, tTop, cRight, tTop, 1.5); 
                      let tCorniceW = cRight - cLeft;
                      let baseSize = 18;
                      let growthFactor = baseTurretW * 0.05; 
                      let targetCorbelWidth = Math.min(32, baseSize + growthFactor); 
                      let tCorbelH = targetCorbelWidth * 0.8; 
                      let minGap = targetCorbelWidth * 0.6; 
                      let corbelCount = Math.max(1, Math.floor(tCorniceW / (targetCorbelWidth + minGap)));
                      let corbelStep = tCorniceW / corbelCount;
                      for(let i = 0; i <= corbelCount; i++) {
                          let cx = cLeft + i * corbelStep;
                          if (i === 0) cx += targetCorbelWidth / 2;
                          if (i === corbelCount) cx -= targetCorbelWidth / 2;
                          scene.turrets.customShapes.push({
                              type: 'solid_path', color: COLOR_TIMBER, joints: [],
                              path: [
                                  {type: 'M', x: cx - targetCorbelWidth/2, y: tTop},
                                  {type: 'L', x: cx + targetCorbelWidth/2, y: tTop},
                                  {type: 'L', x: cx + targetCorbelWidth/2, y: tTop - tCorbelH},
                                  {type: 'L', x: cx - targetCorbelWidth/2, y: tTop - tCorbelH},
                                  {type: 'L', x: cx - targetCorbelWidth/2, y: tTop}
                              ]
                          });
                      }
                      if (tRoofStyle === 'spitz' || tRoofStyle === 'flach') {
                          scene.turrets.bg.push({ color: COLOR_TURRET_ROOF, poly: [{x: cLeft, y: tTop}, {x: cRight, y: tTop}, {x: xCenter, y: roofY}] });
                          pushTimber(scene.turrets.frameTimbers, 'd', cLeft, tTop, xCenter, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'd', cRight, tTop, xCenter, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'v', xCenter, tTop, xCenter, roofY, 1.0);
                      } else if (tRoofStyle === 'krueppel') {
                          let cutW = baseTurretW * 0.45;
                          scene.turrets.bg.push({ color: COLOR_TURRET_ROOF, poly: [{x: cLeft, y: tTop}, {x: cRight, y: tTop}, {x: xCenter + cutW/2, y: roofY}, {x: xCenter - cutW/2, y: roofY}] });
                          pushTimber(scene.turrets.frameTimbers, 'd', cLeft, tTop, xCenter - cutW/2, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'd', cRight, tTop, xCenter + cutW/2, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'h', xCenter - cutW/2, roofY, xCenter + cutW/2, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'v', xCenter, tTop, xCenter, roofY, 1.0);
                      } else if (tRoofStyle === 'barock') {
                          let bPath = [
                              {type: 'M', x: cLeft, y: tTop}, {type: 'L', x: cRight, y: tTop},
                              {type: 'B', cx1: cRight, cy1: tTop + baseTurretW*0.4, cx2: xCenter + baseTurretW*0.25, cy2: roofY - baseTurretW*0.15, x: xCenter, y: roofY},
                              {type: 'B', cx1: xCenter - baseTurretW*0.25, cy1: roofY - baseTurretW*0.15, cx2: cLeft, cy2: tTop + baseTurretW*0.4, x: cLeft, y: tTop}
                          ];
                          scene.turrets.bg.push({ color: COLOR_TURRET_ROOF, path: bPath });
                          pushTimber(scene.turrets.frameTimbers, 'd', cLeft, tTop, xCenter, roofY, 1.2, true, cLeft, tTop + baseTurretW*0.4, xCenter - baseTurretW*0.25, roofY - baseTurretW*0.15); 
                          pushTimber(scene.turrets.frameTimbers, 'd', cRight, tTop, xCenter, roofY, 1.2, true, cRight, tTop + baseTurretW*0.4, xCenter + baseTurretW*0.25, roofY - baseTurretW*0.15); 
                          pushTimber(scene.turrets.frameTimbers, 'v', xCenter, tTop, xCenter, roofY, 1.0);
                      } else if (tRoofStyle === 'krueppel') {
                          let cutW = baseTurretW * 0.45;
                          scene.turrets.bg.push({ color: COLOR_TURRET_ROOF, poly: [{x: left, y: tTop}, {x: right, y: tTop}, {x: xCenter + cutW/2, y: roofY}, {x: xCenter - cutW/2, y: roofY}] });
                          pushTimber(scene.turrets.frameTimbers, 'd', left, tTop, xCenter - cutW/2, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'd', right, tTop, xCenter + cutW/2, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'h', xCenter - cutW/2, roofY, xCenter + cutW/2, roofY, 1.2); 
                          pushTimber(scene.turrets.frameTimbers, 'v', xCenter, tTop, xCenter, roofY, 1.0);
                      } else if (tRoofStyle === 'barock') {
                          let bPath = [
                              {type: 'M', x: left, y: tTop}, {type: 'L', x: right, y: tTop},
                              {type: 'B', cx1: right, cy1: tTop + baseTurretW*0.6, cx2: xCenter + baseTurretW*0.2, cy2: roofY - baseTurretW*0.2, x: xCenter, y: roofY},
                              {type: 'B', cx1: xCenter - baseTurretW*0.2, cy1: roofY - baseTurretW*0.2, cx2: left, cy2: tTop + baseTurretW*0.6, x: left, y: tTop}
                          ];
                          scene.turrets.bg.push({ color: COLOR_TURRET_ROOF, path: bPath });
                          pushTimber(scene.turrets.frameTimbers, 'd', left, tTop, xCenter, roofY, 1.2, true, left, tTop + baseTurretW*0.6, xCenter - baseTurretW*0.2, roofY - baseTurretW*0.2); 
                          pushTimber(scene.turrets.frameTimbers, 'd', right, tTop, xCenter, roofY, 1.2, true, right, tTop + baseTurretW*0.6, xCenter + baseTurretW*0.2, roofY - baseTurretW*0.2); 
                          pushTimber(scene.turrets.frameTimbers, 'v', xCenter, tTop, xCenter, roofY, 1.0);
                      }
                      if (!isMassive) {
                          pushTimber(scene.turrets.frameTimbers, 'h', left, tBot, right, tBot, 1.4);
                          scene.turrets.customShapes.push({
                              type: 'solid_path', color: COLOR_TIMBER, joints: [], 
                              path: [
                                  {type: 'M', x: left, y: tBot},
                                  {type: 'B', cx1: left, cy1: corbelY, cx2: right, cy2: corbelY, x: right, y: tBot},
                                  {type: 'L', x: left, y: tBot} 
                              ]
                          });
                      } else if (matColor === COLOR_STONE || matColor === COLOR_PLASTER) {
                          scene.turrets.customShapes.push({ 
                              type: 'solid_path', color: darkenColor(matColor, 15), joints: [],
                              path: [
                                  {type: 'M', x: left + baseTurretW*0.1, y: tBot - baseTurretW*0.02},
                                  {type: 'B', cx1: left + baseTurretW*0.1, cy1: corbelY+1, cx2: right - baseTurretW*0.1, cy2: corbelY+1, x: right - baseTurretW*0.1, y: tBot - baseTurretW*0.02},
                                  {type: 'L', x: left + baseTurretW*0.1, y: tBot - baseTurretW*0.02}
                              ]
                          });
                      }
                      for(let k=seqStartIdx; k<=endIdx; k++) {
                          let kFloor = floorData[k];
                          let gapStart = kFloor.joistGapY; let gapEnd = kFloor.yBot;
                          if (!isMassive) {
                              if (k > seqStartIdx && gapEnd > gapStart) {
                                  pushTimber(scene.turrets.frameTimbers, 'v', left, gapStart, left, gapEnd, 1.2); 
                                  pushTimber(scene.turrets.frameTimbers, 'v', right, gapStart, right, gapEnd, 1.2); 
                                  pushTimber(scene.turrets.innerTimbers, 'v', xCenter, gapStart, xCenter, gapEnd, 1.0);
                              }
                              pushTimber(scene.turrets.frameTimbers, 'h', left, kFloor.yBot, right, kFloor.yBot, 1.3); 
                              pushTimber(scene.turrets.frameTimbers, 'v', left, kFloor.yBot, left, kFloor.yTop, 1.2);
                              pushTimber(scene.turrets.frameTimbers, 'v', right, kFloor.yBot, right, kFloor.yTop, 1.2); 
                              pushTimber(scene.turrets.frameTimbers, 'v', xCenter, kFloor.yBot, xCenter, kFloor.yTop, 1.0);
                              if(k === endIdx) pushTimber(scene.turrets.frameTimbers, 'h', left, kFloor.yTop, right, kFloor.yTop, 1.3);
                              let tCtx = { inner: scene.turrets.innerTimbers, frame: scene.turrets.frameTimbers, pre: scene.turrets.preShapes, post: scene.turrets.postShapes, color: matColor };
                              drawPattern(tStyle, tCtx, left, kFloor.yBot, xCenter-left, kFloor.yTop-kFloor.yBot);
                              drawPattern(tStyle, tCtx, xCenter, kFloor.yBot, right-xCenter, kFloor.yTop-kFloor.yBot);
                          }
                      }
                      if(roofY > totalPeakY) totalPeakY = roofY;
                      let currentTurretMaxX = Math.abs(xCenter) + baseTurretW/2 + 40;
                      if(currentTurretMaxX * 2 > maxW) maxW = currentTurretMaxX * 2;
                      sequenceActive = false;
                  }
              }
          });
          let mainRoofMaxPeak = currentY; 
          if (uiGable.checked) {
              let rOver = parseInt(uiRoofOverhang.value); let cornice = uiCornice.value; let cH = parseInt(uiCorniceHeight.value);
              let numGables = parseInt(uiGableCount.value);
              let wallL = topFloorStartX; let wallR = -topFloorStartX;
              let roofBaseY = currentY;
              if(rOver > 0) {
                  if(true) {
                      roofBaseY = currentY + cH;
                      let defGMat = savedGableStates[0] ? savedGableStates[0].mat : 'plaster'; let defCol = COLOR_PLASTER; 
                      let iStartX = topFloorStartX;
                      let iEndX = topFloorStartX + topFloorW;
                      let eStartX = topFloorStartX - rOver;
                      let eEndX = topFloorStartX + topFloorW + rOver;
                      let overhang = rOver;
                      let joistGap = cH;
                      let yBottom = roofBaseY;
                      let bgPath = [{type:'M', x: eStartX, y: yBottom}, {type:'L', x: eEndX, y: yBottom}];
                      if (cornice === 'konsolen') { 
                          bgPath.push({type:'B', cx1: eEndX, cy1: currentY + (yBottom-currentY)*0.5, cx2: iEndX, cy2: currentY + (yBottom-currentY)*0.2, x: iEndX, y: currentY}, {type:'L', x: iStartX, y: currentY}, {type:'B', cx1: iStartX, cy1: currentY + (yBottom-currentY)*0.2, cx2: eStartX, cy2: currentY + (yBottom-currentY)*0.5, x: eStartX, y: yBottom});
                      } else if (cornice === 'knaggen') { 
                          bgPath.push({type:'B', cx1: eEndX, cy1: yBottom, cx2: iEndX, cy2: yBottom, x: iEndX, y: currentY}, {type:'L', x: iStartX, y: currentY}, {type:'B', cx1: iStartX, cy1: yBottom, cx2: eStartX, cy2: yBottom, x: eStartX, y: yBottom});
                      } else if (cornice === 'schiffskehle') {
                          bgPath.push({type:'B', cx1: eEndX, cy1: currentY, cx2: eEndX, cy2: yBottom, x: iEndX, y: currentY}, {type:'L', x: iStartX, y: currentY}, {type:'B', cx1: eStartX, cy1: currentY, cx2: eStartX, cy2: yBottom, x: eStartX, y: yBottom});
                      } else if (typeof decor !== 'undefined' && decor === 'abgetreppt' || typeof cornice !== 'undefined' && cornice === 'abgetreppt') {
                      let jg = yBottom - currentY;
                      let o = typeof overhang !== 'undefined' ? overhang : rOver;
                      bgPath.push(
                          {type:'L', x: iEndX + o*0.66, y: yBottom},
                          {type:'L', x: iEndX + o*0.66, y: currentY + jg*0.66},
                          {type:'L', x: iEndX + o*0.33, y: currentY + jg*0.66},
                          {type:'L', x: iEndX + o*0.33, y: currentY + jg*0.33},
                          {type:'L', x: iEndX, y: currentY + jg*0.33},
                          {type:'L', x: iEndX, y: currentY},
                          {type:'L', x: iStartX, y: currentY},
                          {type:'L', x: iStartX, y: currentY + jg*0.33},
                          {type:'L', x: iStartX - o*0.33, y: currentY + jg*0.33},
                          {type:'L', x: iStartX - o*0.33, y: currentY + jg*0.66},
                          {type:'L', x: iStartX - o*0.66, y: currentY + jg*0.66},
                          {type:'L', x: iStartX - o*0.66, y: yBottom},
                          {type:'L', x: eStartX, y: yBottom}
                      );
                  } else {
                      bgPath.push({type:'L', x: eEndX, y: currentY}, {type:'L', x: eStartX, y: currentY}, {type:'L', x: eStartX, y: yBottom});
                      pushTimber(scene.walls.frameTimbers, 'h', eStartX - 1.0, currentY, eEndX + 1.0, currentY, 1.4);
                  }
                      scene.walls.bg.push({ color: darkenColor(defCol, 15), path: bgPath });
                      if (cornice === 'abgetreppt') {
                          let y0 = currentY; let y1 = currentY + joistGap * 0.33; let y2 = currentY + joistGap * 0.66; let y3 = yBottom;
                          let tOff = parseInt(uiThick.value) * 1.05;
                       pushTimber(scene.walls.frameTimbers, 'h', iStartX - tOff, y0, iEndX + tOff, y0, 1.4); 
                       pushTimber(scene.walls.frameTimbers, 'v', iStartX, y0 - tOff, iStartX, y1 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iEndX, y0 - tOff, iEndX, y1 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'h', iStartX - overhang*0.33 - tOff, y1, iEndX + overhang*0.33 + tOff, y1, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iStartX - overhang*0.33, y1 - tOff, iStartX - overhang*0.33, y2 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iEndX + overhang*0.33, y1 - tOff, iEndX + overhang*0.33, y2 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'h', iStartX - overhang*0.66 - tOff, y2, iEndX + overhang*0.66 + tOff, y2, 1.4); 
                       pushTimber(scene.walls.frameTimbers, 'v', iStartX - overhang*0.66, y2 - tOff, iStartX - overhang*0.66, y3 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'v', iEndX + overhang*0.66, y2 - tOff, iEndX + overhang*0.66, y3 + tOff, 1.4);
                       pushTimber(scene.walls.frameTimbers, 'h', eStartX - tOff, y3, eEndX + tOff, y3, 1.6);
                   } else if (cornice === 'schiffskehle') {
                          pushTimber(scene.walls.innerTimbers, 'd', iStartX, currentY, eStartX, yBottom, 1.0, true, eStartX, currentY, eStartX, yBottom);
                          pushTimber(scene.walls.innerTimbers, 'd', iEndX, currentY, eEndX, yBottom, 1.0, true, eEndX, currentY, eEndX, yBottom);
                      }
                      for(let i=0; i<=cols; i++) {
                          let bx = eStartX + getCellX(i, cols, topFloorW + rOver*2, asym); 
                          let innerBx = iStartX + getCellX(i, cols, topFloorW, asym);
                          if (cornice !== 'none' && cornice !== 'abgetreppt' && cornice !== 'schiffskehle') {
                              let bk_w = 14; let bk_y = yBottom - Math.min(joistGap * 0.15, 4); 
                              pushTimber(scene.walls.frameTimbers, 'h', bx - bk_w, bk_y, bx + bk_w, bk_y, 1.4);
                          }
                          if (cornice === 'konsolen') {
                              if (Math.abs(bx - innerBx) > 2) {
                                  scene.walls.customShapes.push({ type: 'konsole', color: COLOR_TIMBER, x1: innerBx, y1: currentY, x2: bx, y2: yBottom });
                              } else {
                                  pushTimber(scene.walls.frameTimbers, 'v', bx, currentY - 1.0, bx, yBottom, 1.6);
                              }
                          } else if (cornice === 'knaggen') {
                              if (Math.abs(bx - innerBx) > 2) {
                                  pushTimber(scene.walls.innerTimbers, 'd', innerBx, currentY, bx, yBottom, 1.2, true, innerBx, yBottom, bx, yBottom); 
                              } else {
                                  pushTimber(scene.walls.frameTimbers, 'v', bx, currentY - 1.0, bx, yBottom, 1.6);
                              }
                          } else if (cornice === 'stamm_5eck' || cornice === 'stamm_spitz' || cornice === 'stamm_quadrat' || cornice === 'stamm_rund') {
                              scene.walls.customShapes.push({type: cornice, color: COLOR_TIMBER, cx: bx, cy: yBottom, size: 14});
                          } else if (cornice === 'none') { pushTimber(scene.walls.frameTimbers, 'v', bx, currentY - 1.0, bx, yBottom, 1.6); }
                      }
                      if (cornice === 'neidkoepfe') {
                          scene.walls.customShapes.push({type: 'neidkopf', color: COLOR_TIMBER, cx: iStartX + 15, cy: yBottom, size: 25, flip: true}); 
                          scene.walls.customShapes.push({type: 'neidkopf', color: COLOR_TIMBER, cx: iEndX - 15, cy: yBottom, size: 25, flip: false}); 
                      }
                      pushTimber(scene.walls.frameTimbers, 'h', eStartX, yBottom, eEndX, yBottom, 1.8);
                  } else { pushTimber(scene.walls.frameTimbers, 'h', wallL-rOver, currentY, wallR+rOver, currentY, 1.6); }
              } else { pushTimber(scene.walls.frameTimbers, 'h', wallL, currentY, wallR, currentY, 1.6); }
              currentY = roofBaseY; 
              let gW_total = topFloorW + rOver * 2; let gStartX_global = wallL - rOver; let singleGableW = gW_total / numGables;
              for(let g = 0; g < numGables; g++) {
                  let rShape = document.getElementById(`gableShape-${g}`)?.value || 'barock';
                  let gMat = document.getElementById(`gableMat-${g}`)?.value || 'brick';
                  let gStyle = document.getElementById(`gableStyle-${g}`)?.value || 'fachwerk_classic';
                  let rPitch = parseFloat(document.getElementById(`gablePitch-${g}`)?.value || 1.2);
                  let gSteps = parseInt(document.getElementById(`gableSteps-${g}`)?.value || 5);
                  let gStepH = parseFloat(document.getElementById(`gableStepHeight-${g}`)?.value || 0.95);
                  let finalGableMat = gMat;
                  if (gMat === 'inherit_floor') finalGableMat = topFloorMaterial; 
                  let gMatColor = COLOR_GABLE; 
                  if(finalGableMat === 'stone') gMatColor = COLOR_STONE;
                  if(finalGableMat === 'brick') gMatColor = COLOR_BRICK; if(finalGableMat === 'plaster1') gMatColor = COLOR_PLASTER; if(finalGableMat === 'plaster2') gMatColor = COLOR_PLASTER2; if(finalGableMat === 'roof') gMatColor = COLOR_TURRET_ROOF;
                  let startX = gStartX_global + g * singleGableW; let endX = startX + singleGableW; let midX = startX + singleGableW / 2;
                  let gableH = (singleGableW / 2) * rPitch; let yPeak = currentY + gableH;
                  if(yPeak > mainRoofMaxPeak) mainRoofMaxPeak = yPeak;
                  let p = [];
                  if(rShape === 'sattel') { p = [{type:'M', x:startX, y:currentY}, {type:'L', x:endX, y:currentY}, {type:'L', x:midX, y:yPeak}]; } 
                  else if (rShape === 'krueppel' || rShape === 'halbwalm') {
                      const isHalf = rShape === 'halbwalm';
                      const f = isHalf ? 0.92 : 0.7; const wf = isHalf ? 0.1 : 0.3;
                      let cutY = currentY + gableH * f; let cutW = singleGableW * wf; yPeak = cutY;
                      p = [{type:'M', x:startX, y:currentY}, {type:'L', x:endX, y:currentY}, {type:'L', x:midX + cutW/2, y:cutY}, {type:'L', x:midX - cutW/2, y:cutY}];
                  } else if (rShape === 'mansard') {
                      let midY = currentY + gableH * 0.6; let steep = singleGableW * 0.15;
                      p = [{type:'M', x:startX, y:currentY}, {type:'L', x:endX, y:currentY}, {type:'L', x:endX-steep, y:midY}, {type:'L', x:midX, y:yPeak}, {type:'L', x:startX+steep, y:midY}];
                  } else if (rShape === 'stufe') {
                      p.push({type:'M', x:startX, y:currentY});
                      let sW = (singleGableW/2)/gSteps; let sH = (gableH/gSteps) * gStepH; yPeak = currentY + gSteps * sH;
                      for(let i=0; i<gSteps; i++) { let cx = startX + i*sW; let nx = startX + (i+1)*sW; let ny = currentY + (i+1)*sH; p.push({type:'L', x: cx, y: ny}, {type:'L', x: nx, y: ny}); }
                      for(let i=0; i<gSteps; i++) { let cx = midX + i*sW; let nx = midX + (i+1)*sW; let cy = yPeak - i*sH; let ny = yPeak - (i+1)*sH; p.push({type:'L', x: nx, y: cy}, {type:'L', x: nx, y: ny}); }
                  } else if (rShape === 'barock') {
                      p.push({type:'M', x:startX, y:currentY});
                      let sW = (singleGableW/2)/gSteps; let sH = (gableH/gSteps) * gStepH; yPeak = currentY + gSteps * sH;
                      for(let i=0; i<gSteps; i++) { let cx = startX + i*sW; let nx = startX + (i+1)*sW; let cy = currentY + i*sH; let ny = currentY + (i+1)*sH; let tcx2 = (i === gSteps - 1) ? nx - sW*0.6 : nx; p.push({type:'B', cx1: cx, cy1: ny, cx2: tcx2, cy2: cy, x: nx, y: ny}); }
                      for(let i=0; i<gSteps; i++) { let cx = midX + i*sW; let nx = midX + (i+1)*sW; let cy = yPeak - i*sH; let ny = yPeak - (i+1)*sH; let tcx1 = (i === 0) ? cx + sW*0.6 : cx; p.push({type:'B', cx1: tcx1, cy1: ny, cx2: nx, cy2: cy, x: nx, y: ny}); }
                  }
                  let gableObj = createLayerGroup(); 
                  gableObj.path = p; 
                  gableObj.bgColor = gMatColor;
                  if(rShape === 'barock') {
                      for(let i=1; i<p.length; i++) { if(p[i].type==='B') pushTimber(gableObj.frameTimbers, 'd', p[i-1].x, p[i-1].y, p[i].x, p[i].y, 1.6, true, p[i].cx1, p[i].cy1, p[i].cx2, p[i].cy2); }
                  } else {
                      for(let i=1; i<p.length; i++) { if(p[i].type==='L' && p[i].y > currentY) pushTimber(gableObj.frameTimbers, 'd', p[i-1].x, p[i-1].y, p[i].x, p[i].y, 1.6); }
                      if(rShape !== 'stufe') pushTimber(gableObj.frameTimbers, 'd', p[p.length-1].x, p[p.length-1].y, p[0].x, p[0].y, 1.6);
                  }
                  if (gStyle === 'stein_bogen') {
                      let dArches = 3; 
                      let dArchW = singleGableW / dArches; let dArchH = gableH * 0.8; 
                      for(let i=0; i<dArches; i++) { gableObj.arches.push({cx: startX + (i + 0.5) * dArchW, y: currentY, w: dArchW * 0.8, h: dArchH, type: 'rund'}); }
                  } else if (gStyle === 'kreuz') {
                      pushTimber(gableObj.frameTimbers, 'v', midX, currentY, midX, yPeak, 1.4);
                      pushTimber(gableObj.innerTimbers, 'd', startX, currentY, midX, yPeak, 0.9); 
                      pushTimber(gableObj.innerTimbers, 'd', endX, currentY, midX, yPeak, 0.9);
                      let qY = currentY + (yPeak-currentY)/2;
                      pushTimber(gableObj.innerTimbers, 'd', startX + (midX-startX)/2, currentY, midX, qY, 0.8); 
                      pushTimber(gableObj.innerTimbers, 'd', endX - (endX-midX)/2, currentY, midX, qY, 0.8);
                  } else if (gStyle === 'y_kreuz') {
                      let stemTopY = currentY + (yPeak-currentY)*0.4; 
                      pushTimber(gableObj.frameTimbers, 'v', midX, currentY, midX, yPeak, 1.4);
                      let rMidY = currentY + (yPeak-currentY)*0.5;
                      pushTimber(gableObj.innerTimbers, 'd', midX, stemTopY, startX + (midX-startX)/2, rMidY, 0.9); 
                      pushTimber(gableObj.innerTimbers, 'd', midX, stemTopY, endX - (endX-midX)/2, rMidY, 0.9);
                  } else if(gStyle === 'fachwerk_classic') {
                      let midY1 = currentY + gableH * 0.35; let midY2 = currentY + gableH * 0.7;
                      pushTimber(gableObj.innerTimbers, 'h', startX, midY1, endX, midY1, 1.0); pushTimber(gableObj.innerTimbers, 'h', startX, midY2, endX, midY2, 0.9); 
                      pushTimber(gableObj.frameTimbers, 'v', midX, currentY, midX, yPeak, 1.2); 
                      pushTimber(gableObj.innerTimbers, 'd', midX, currentY, startX, midY1, 0.9); pushTimber(gableObj.innerTimbers, 'd', midX, currentY, endX, midY1, 0.9);
                      for(let x=startX+baseCellW*0.6; x<endX; x+=baseCellW*0.6) pushTimber(gableObj.innerTimbers, 'v', x, currentY, x, yPeak, 0.9);
                  } else if (gStyle === 'vertikal') { 
                      for(let x=startX+baseCellW*0.8; x<endX; x+=baseCellW*0.8) pushTimber(gableObj.innerTimbers, 'v', x, currentY, x, yPeak, 0.9); 
                  } else if (gStyle !== 'leer') {
                      let actualGBays = Math.max(1, Math.round(singleGableW / baseCellW));
                      let actualGW = singleGableW / actualGBays;
                      let gTiers = parseInt(document.getElementById(`gableTiers-${g}`)?.value || 2);
                      let tierH = gableH / gTiers;
                      let gCtx = { inner: gableObj.innerTimbers, frame: gableObj.frameTimbers, pre: gableObj.preShapes, post: gableObj.postShapes, color: gMatColor };
                      for(let t = 0; t < gTiers; t++) {
                          let tierY = currentY + t * tierH;
                          if (t > 0) pushTimber(gableObj.frameTimbers, 'h', startX, tierY, endX, tierY, 1.2); 
                          for(let i=0; i<actualGBays; i++) {
                              let cl = startX + i * actualGW;
                              drawPattern(gStyle, gCtx, cl, tierY, actualGW, tierH);
                              if (t === 0 && i > 0) pushTimber(gableObj.frameTimbers, 'v', cl, currentY, cl, yPeak, 1.4);
                          }
                      }
                  }
                  scene.gables.push(gableObj);
                  if(Math.abs(gStartX_global) * 2 > maxW) maxW = Math.abs(gStartX_global) * 2;
              }
              if(mainRoofMaxPeak > totalPeakY) totalPeakY = mainRoofMaxPeak;
          let dormerCount = parseInt(uiSideDormerCount?.value || 0);
          let dType = uiSideDormerStyle?.value || 'schlepp';
          if (dormerCount > 0 && numGables === 1) { 
              let firstGPitch = parseFloat(document.getElementById('gablePitch-0')?.value || 1.2);
              let firstGH = (topFloorW / 2) * firstGPitch;
              let defGMat = savedGableStates[0] ? savedGableStates[0].mat : 'plaster';
              let defCol = (defGMat === 'stone') ? COLOR_STONE : (defGMat === 'brick') ? COLOR_BRICK : COLOR_GABLE;
              let drawEnhancedSideDormer = (x, y) => {
                  let gW = baseCellW * 0.75; let gH = baseCellW * 0.65;
                  let isLeft = x < 0; let dir = isLeft ? -1 : 1;
                  let lX = x - gW/2; let rX = x + gW/2;
                  let innerX = x - dir * gW * 0.9; 
                  let leftEdge = isLeft ? lX : innerX;
                  let rightEdge = isLeft ? innerX : rX;
                  let outerEdge = isLeft ? lX : rX;
                  let cheekColor = darkenColor(COLOR_TURRET_ROOF, 8);
                  let roofColor = darkenColor(COLOR_TURRET_ROOF, 2);
                  scene.walls.bg.push({ color: cheekColor, poly: [
                      {x: leftEdge, y: y}, {x: rightEdge, y: y}, 
                      {x: rightEdge, y: y+gH}, {x: leftEdge, y: y+gH}
                  ]});
                  pushTimber(scene.walls.frameTimbers, 'v', outerEdge, y, outerEdge, y+gH, 1.0);
                  pushTimber(scene.walls.frameTimbers, 'h', leftEdge, y, rightEdge, y, 1.0);
                  if (dType === 'fledermaus') {
                      let path = [{type:'M', x:x-gW*1.2, y:y}, {type:'B', cx1:x-gW/2, cy1:y+gH*1.5, cx2:x+gW/2, cy2:y+gH*1.5, x:x+gW*1.2, y:y}];
                      scene.walls.bg.push({ color: roofColor, path: path });
                  } else if (dType === 'walm') {
                      scene.walls.bg.push({ color: roofColor, poly: [{x:lX-5, y:y+gH}, {x:rX+5, y:y+gH}, {x:x, y:y+gH+gW/2}, {x:lX, y:y+gH+10}]});
                  } else if (dType === 'dreieck') {
                      scene.walls.bg.push({ color: roofColor, poly: [{x:lX-8, y:y+gH}, {x:rX+8, y:y+gH}, {x:x, y:y+gH+gW*0.8}]});
                      pushTimber(scene.walls.frameTimbers, 'd', lX-8, y+gH, x, y+gH+gW*0.8, 1.1);
                      pushTimber(scene.walls.frameTimbers, 'd', rX+8, y+gH, x, y+gH+gW*0.8, 1.1);
                  } else if (dType === 'rund') {
                      let path = [{type:'M', x:lX-5, y:y+gH}, {type:'B', cx1:lX-5, cy1:y+gH+gW*0.8, cx2:rX+5, cy2:y+gH+gW*0.8, x:rX+5, y:y+gH}];
                      scene.walls.bg.push({ color: roofColor, path: path });
                      pushTimber(scene.walls.frameTimbers, 'd', lX-5, y+gH, rX+5, y+gH, 1.1, true, lX-5, y+gH+gW*0.8, rX+5, y+gH+gW*0.8);
                  } else { 
                      scene.walls.bg.push({ color: roofColor, poly: [{x:lX-10, y:y+gH}, {x:rX+10, y:y+gH}, {x:rX+10, y:y+gH+15}, {x:lX-10, y:y+gH+15}]});
                      pushTimber(scene.walls.frameTimbers, 'h', lX-10, y+gH, rX+10, y+gH, 1.1);
                  }
              };
              for (let i = 0; i < dormerCount; i++) {
                  let rShape = document.getElementById('gableShape-0')?.value || 'sattel';
                  let startTY = 0.25; let endTY = 0.75;
                  if (rShape === 'krueppel' || rShape === 'mansard') endTY = 0.55;
                  let adjTY = dormerCount === 1 ? 0.45 : startTY + (i / (dormerCount - 1)) * (endTY - startTY);
                  let rOver = parseInt(document.getElementById('paramRoofOverhang')?.value || 60);
                  let gW_half = (topFloorW + rOver * 2) / 2;
                  let properGH = gW_half * firstGPitch;
                  let gSteps = parseInt(document.getElementById('gableSteps-0')?.value || 5);
                  let gStepH = parseFloat(document.getElementById('gableStepHeight-0')?.value || 0.95);
                  if (rShape === 'stufe' || rShape === 'barock') {
                      let sH = (properGH / gSteps) * gStepH;
                      let stepIdx = Math.floor(gSteps * adjTY);
                      adjTY = (stepIdx + 0.5) * (sH / properGH); 
                  }
                  let ry = currentY + properGH * adjTY;
                  let rx = 0;
                  if (rShape === 'mansard') {
                      let steep = (topFloorW + rOver * 2) * 0.15; 
                      let midY = currentY + properGH * 0.6;
                      if (ry < midY) rx = gW_half - ((ry - currentY) / (properGH * 0.6)) * steep;
                      else rx = (gW_half - steep) * (1 - (ry - midY) / (properGH * 0.4));
                  } else if (rShape === 'krueppel' || rShape === 'halbwalm') {
                      let isHalf = rShape === 'halbwalm';
                      let f = isHalf ? 0.92 : 0.7; let wf = isHalf ? 0.1 : 0.3;
                      let cutY = currentY + properGH * f; let cutW = gW_half * 2 * wf;
                      if (ry < cutY) rx = gW_half - ((ry - currentY) / (properGH * f)) * (gW_half - cutW/2);
                      else rx = cutW/2 * (1 - (ry - cutY) / (properGH * (1 - f)));
                  } else if (rShape === 'stufe' || rShape === 'barock') {
                      let sW = gW_half / gSteps; let sH = (properGH / gSteps) * gStepH;
                      let stepIdx = Math.floor((ry - currentY) / sH);
                      rx = gW_half - stepIdx * sW;
                  } else {
                      rx = gW_half * (1 - adjTY);
                  }
                  let shiftX = parseInt(document.getElementById('paramSideDormerX')?.value || 0);
                  rx = Math.max(0, rx - (baseCellW * 0.75) + shiftX); 
                  drawEnhancedSideDormer(-rx, ry);
                  drawEnhancedSideDormer(rx, ry);
              }
          }
          }
          if (uiGable.checked && toggleDormer.checked) {
              let defCol = COLOR_DORMER;
              let dPitch = parseFloat(uiDormerPitch.value);
              let reqBaysFloat = parseFloat(uiDormerW.value); let dCellW = topFloorW / cols; 
              let dWidth = Math.min(topFloorW, reqBaysFloat * dCellW); let dStartX = -(dWidth / 2);
              let baseGH = mainRoofMaxPeak - currentY;
              let dHeight = baseGH * parseFloat(uiDormerH.value); 
              let dStartY = currentY + dHeight;
              let dGableH = (dWidth / 2) * dPitch;
              let dPeakY = dStartY + dGableH;
              let dShape = uiDormerShape.value;
              let dSteps = parseInt(uiDormerSteps.value);
              let dStepH = parseFloat(uiDormerStepHeight.value);
              scene.dormer.bgColor = defCol;
              let dp = [{type:'M', x:dStartX, y:currentY}, {type:'L', x:-dStartX, y:currentY}, {type:'L', x:-dStartX, y:dStartY}];
              if (dShape === 'sattel') {
                  dp.push({type:'L', x:0, y:dPeakY}, {type:'L', x:dStartX, y:dStartY});
              } else if (dShape === 'krueppel' || dShape === 'halbwalm') {
                  const isHalf = dShape === 'halbwalm';
                  const f = isHalf ? 0.92 : 0.7; const wf = isHalf ? 0.1 : 0.3;
                  let cutY = dStartY + dGableH * f; let cutW = dWidth * wf; dPeakY = cutY;
                  dp.push({type:'L', x:cutW/2, y:cutY}, {type:'L', x:-cutW/2, y:cutY}, {type:'L', x:dStartX, y:dStartY});
              } else if (dShape === 'mansard') {
                  let midY = dStartY + dGableH * 0.6; let steep = dWidth * 0.15;
                  dp.push({type:'L', x:(-dStartX)-steep, y:midY}, {type:'L', x:0, y:dPeakY}, {type:'L', x:dStartX+steep, y:midY}, {type:'L', x:dStartX, y:dStartY});
              } else if (dShape === 'stufe') {
                  let sW = (dWidth/2)/dSteps; let sH = (dGableH/dSteps) * dStepH; dPeakY = dStartY + dSteps * sH;
                  for(let i=0; i<dSteps; i++) { let cx = (-dStartX) - i*sW; let nx = (-dStartX) - (i+1)*sW; let cy = dStartY + i*sH; let ny = dStartY + (i+1)*sH; dp.push({type:'L', x: cx, y: ny}, {type:'L', x: nx, y: ny}); }
                  for(let i=0; i<dSteps; i++) { let cx = -i*sW; let nx = -(i+1)*sW; let cy = dPeakY - i*sH; let ny = dPeakY - (i+1)*sH; dp.push({type:'L', x: nx, y: cy}, {type:'L', x: nx, y: ny}); }
              } else if (dShape === 'barock') {
                  let sW = (dWidth/2)/dSteps; let sH = (dGableH/dSteps) * dStepH; dPeakY = dStartY + dSteps * sH;
                  for(let i=0; i<dSteps; i++) { let cx = (-dStartX) - i*sW; let nx = (-dStartX) - (i+1)*sW; let cy = dStartY + i*sH; let ny = dStartY + (i+1)*sH; let tcx2 = (i === dSteps - 1) ? nx + sW*0.6 : nx; dp.push({type:'B', cx1: cx, cy1: ny, cx2: tcx2, cy2: cy, x: nx, y: ny}); }
                  for(let i=0; i<dSteps; i++) { let cx = -i*sW; let nx = -(i+1)*sW; let cy = dPeakY - i*sH; let ny = dPeakY - (i+1)*sH; let tcx1 = (i === 0) ? cx - sW*0.6 : cx; dp.push({type:'B', cx1: tcx1, cy1: ny, cx2: nx, cy2: cy, x: nx, y: ny}); }
              }
              scene.dormer.path = dp.slice(); 
              scene.dormer.path.push({type:'L', x:dStartX, y:currentY});
              pushTimber(scene.dormer.frameTimbers, 'h', dStartX, currentY, -dStartX, currentY, 1.6);
              pushTimber(scene.dormer.frameTimbers, 'v', dStartX, currentY, dStartX, dStartY, 1.6);
              pushTimber(scene.dormer.frameTimbers, 'v', -dStartX, currentY, -dStartX, dStartY, 1.6);
              pushTimber(scene.dormer.frameTimbers, 'h', dStartX, dStartY, -dStartX, dStartY, 1.4);
              if(dShape === 'barock') {
                  for(let i=3; i<dp.length; i++) { if(dp[i].type==='B') pushTimber(scene.dormer.frameTimbers, 'd', dp[i-1].x, dp[i-1].y, dp[i].x, dp[i].y, 1.6, true, dp[i].cx1, dp[i].cy1, dp[i].cx2, dp[i].cy2); }
              } else {
                  for(let i=3; i<dp.length; i++) { if(dp[i].type==='L') pushTimber(scene.dormer.frameTimbers, 'd', dp[i-1].x, dp[i-1].y, dp[i].x, dp[i].y, 1.6); }
              }
              let dStyle = uiDormerStyle.value; let drawDormWindows = uiDormerWin.checked;
              let actualDormerBays = Math.max(1, Math.round(dWidth / dCellW)); let actualDW = dWidth / actualDormerBays;
              let pCtx = { inner: scene.dormer.innerTimbers, frame: scene.dormer.frameTimbers, pre: scene.dormer.preShapes, post: scene.dormer.postShapes, color: defCol };
              if (dStyle === 'stein_bogen') {
                  let dArches = parseInt(document.getElementById('paramDormerArchCount')?.value || 3);
                  let dArchType = document.getElementById('paramDormerArchType')?.value || 'rund';
                  let dArchW = dWidth / dArches; let dArchH = dHeight * 0.75; 
                  for(let i=0; i<dArches; i++) { scene.dormer.arches.push({cx: dStartX + (i + 0.5) * dArchW, y: currentY, w: dArchW * 0.8, h: dArchH, type: dArchType}); }
              } else {
                  for(let i=0; i<actualDormerBays; i++) {
                      let cl = dStartX + i * actualDW; let cw = actualDW;
                      if(i > 0 && dStyle !== 'halber_mann' && dStyle !== 'eier_fries') pushTimber(scene.dormer.frameTimbers, 'v', cl, currentY, cl, currentY + dHeight, 1.6);
                      if (dStyle !== 'skelett') {
                          if (dStyle === 'hessenmann') {
                              if (i < actualDormerBays - 1) { 
                                  let cr2 = dStartX + (i + 2) * actualDW; 
                                  drawPattern(dStyle, pCtx, cl, currentY, cr2-cl, dHeight); 
                                  pushTimber(scene.dormer.frameTimbers, 'v', cr2, currentY, cr2, currentY + dHeight, 1.6);
                                  i++;
                              } else { 
                                  drawPattern('wilder_mann', pCtx, cl, currentY, cw, dHeight); 
                              }
                          } else {
                              drawPattern(dStyle, pCtx, cl, currentY, cw, dHeight);
                          }
                      }
                      const decoratedStyles = ['geschweiftes_kreuz', 'sternraute', 'rautennetz', 'katze_kopf', 'katze_nase', 'wappen_voll', 'rune_othala', 'rune_ingwaz', 'herzform'];
                      if (drawDormWindows && !decoratedStyles.includes(dStyle) && (pseudoRandom(i, rows+1) < windowDensity)) {
                          let winH = (dStyle==='bogenfries' || dStyle==='ziergitter' || dStyle.includes('faecherrosette') || dStyle==='massive_fussbaender') ? dHeight * 0.45 : dHeight;
                          let winY = (dStyle==='bogenfries') ? currentY : currentY + (dHeight - winH);
                          addWindowLayer(scene.dormer.windows, cl, winY, actualDW, winH, scene.dormer.innerTimbers, useWinFrames);
                      }
                  }
              }
              let dGable = uiDormerGable.value;
              if(dGable === 'vertikal') { 
                  for(let x=dStartX+actualDW/2; x<-dStartX; x+=actualDW/2) pushTimber(scene.dormer.innerTimbers, 'v', x, dStartY, x, dPeakY, 1.1); 
              } else if (dGable === 'fachwerk_classic' || dGable === 'fachwerk') {
                  let midY = dStartY + (dPeakY - dStartY)*0.4; let wAtMid = dWidth * 0.6;
                  pushTimber(scene.dormer.innerTimbers, 'h', -wAtMid/2, midY, wAtMid/2, midY, 1.0); 
                  pushTimber(scene.dormer.frameTimbers, 'v', 0, dStartY, 0, dPeakY, 1.4);
                  pushTimber(scene.dormer.innerTimbers, 'd', 0, dStartY, -wAtMid/2, midY, 0.8); 
                  pushTimber(scene.dormer.innerTimbers, 'd', 0, dStartY, wAtMid/2, midY, 0.8);
              } else if (dGable === 'kreuz') {
                  pushTimber(scene.dormer.frameTimbers, 'v', 0, dStartY, 0, dPeakY, 1.4);
                  pushTimber(scene.dormer.innerTimbers, 'd', -dWidth/2, dStartY, 0, dPeakY, 0.9); 
                  pushTimber(scene.dormer.innerTimbers, 'd', dWidth/2, dStartY, 0, dPeakY, 0.9);
                  let qY = dStartY + (dPeakY-dStartY)/2;
                  pushTimber(scene.dormer.innerTimbers, 'd', -dWidth/4, dStartY, 0, qY, 0.8); 
                  pushTimber(scene.dormer.innerTimbers, 'd', dWidth/4, dStartY, 0, qY, 0.8);
              } else if (dGable === 'y_kreuz') {
                  let stemTopY = dStartY + (dPeakY-dStartY)*0.4; 
                  pushTimber(scene.dormer.frameTimbers, 'v', 0, dStartY, 0, dPeakY, 1.4);
                  let rafterMidY = dStartY + (dPeakY-dStartY)*0.5; let rafterLeftMidX = -dWidth/4;
                  pushTimber(scene.dormer.innerTimbers, 'd', 0, stemTopY, rafterLeftMidX, rafterMidY, 0.9); 
                  pushTimber(scene.dormer.innerTimbers, 'd', 0, stemTopY, -rafterLeftMidX, rafterMidY, 0.9);
              } else if (dGable === 'stein_bogen') {
                  let dArches = parseInt(document.getElementById('paramDormerArchCount')?.value || 3);
                  let dArchType = document.getElementById('paramDormerArchType')?.value || 'rund';
                  let dArchW = dWidth / dArches; let dArchH = dGableH * 0.8; 
                  for(let i=0; i<dArches; i++) { scene.dormer.arches.push({cx: dStartX + (i + 0.5) * dArchW, y: dStartY, w: dArchW * 0.8, h: dArchH, type: dArchType}); }
              } else if (dGable !== 'leer') {
                  let dGableCtx = { inner: scene.dormer.innerTimbers, frame: scene.dormer.frameTimbers, pre: scene.dormer.preShapes, post: scene.dormer.postShapes, color: defCol };
                  let dTiers = parseInt(document.getElementById('paramDormerTiers')?.value || 2);
                  let tierH = dGableH / dTiers;
                  for(let t = 0; t < dTiers; t++) {
                      let tierY = dStartY + t * tierH;
                      if (t > 0) pushTimber(scene.dormer.frameTimbers, 'h', dStartX, tierY, -dStartX, tierY, 1.2); 
                      for(let i=0; i<actualDormerBays; i++) {
                          let cl = dStartX + i * actualDW;
                          drawPattern(dGable, dGableCtx, cl, tierY, actualDW, tierH);
                          if (t === 0 && i > 0) pushTimber(scene.dormer.frameTimbers, 'v', cl, dStartY, cl, dPeakY, 1.4);
                      }
                  }
              }
              if(dPeakY > totalPeakY) totalPeakY = dPeakY;
          }
          virtualBounds = { w: maxW, h: totalPeakY };
      }
      function renderModel(overrideDpr = null, exportMode = false) {
          const dpr = overrideDpr || window.devicePixelRatio || 1; 
          const padding = exportMode ? 150 : 60; const sW = canvas.width / dpr; const sH = canvas.height / dpr; 
          ctx.save(); ctx.scale(dpr, dpr); 
          if(exportMode) { ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0, 0, sW, sH); } else { ctx.clearRect(0, 0, sW, sH); }
          let baseScale = Math.min((sW - padding * 2) / virtualBounds.w, (sH - padding * 2) / virtualBounds.h);
          let finalScale = baseScale * camZoom;
          ctx.translate((sW / 2) + camPanX, padding + (virtualBounds.h * baseScale * camZoom) + camPanY); 
          ctx.scale(finalScale, -finalScale); 
          const vThickBase = parseInt(uiThick.value) * 1.5; 
          const matPatternCache = {};
          const resolveFill = (c) => {
              if (!c) return '#000';
              if (matPatternCache[c]) return matPatternCache[c];
              const isMatch = (color, base) => {
                  if (!base) return false;
                  if (color === base) return true;
                  for (let s of [2, 5, 6, 8, 10, 15, 20, 25, 30, 40]) {
                      if (color === darkenColor(base, s)) return true;
                  }
                  return false;
              };
              if (isMatch(c, COLOR_BRICK)) {
                  const pc = document.createElement('canvas'); pc.width = 36; pc.height = 18; const pctx = pc.getContext('2d');
                  pctx.fillStyle = '#cbd5e1'; pctx.fillRect(0, 0, 36, 18);
                  pctx.fillStyle = c; pctx.fillRect(0, 0, 17, 8); pctx.fillRect(18, 0, 18, 8); pctx.fillRect(-9, 9, 17, 8); pctx.fillRect(9, 9, 17, 8); pctx.fillRect(27, 9, 18, 8);
                  pctx.fillStyle = 'rgba(255,255,255,0.15)'; pctx.fillRect(0, 0, 17, 1); pctx.fillRect(18, 0, 18, 1); pctx.fillRect(-9, 9, 17, 1); pctx.fillRect(9, 9, 17, 1); pctx.fillRect(27, 9, 18, 1);
                  pctx.fillStyle = 'rgba(0,0,0,0.15)'; pctx.fillRect(0, 7, 17, 1); pctx.fillRect(18, 7, 18, 1); pctx.fillRect(-9, 16, 17, 1); pctx.fillRect(9, 16, 17, 1); pctx.fillRect(27, 16, 18, 1);
                  pctx.fillRect(16, 1, 1, 7); pctx.fillRect(35, 1, 1, 7); pctx.fillRect(7, 10, 1, 7); pctx.fillRect(25, 10, 1, 7);
                  let pat = ctx.createPattern(pc, 'repeat'); matPatternCache[c] = pat; return pat;
              }
              if (isMatch(c, COLOR_STONE)) {
                  const pc = document.createElement('canvas'); pc.width = 60; pc.height = 30; const pctx = pc.getContext('2d');
                  pctx.fillStyle = darkenColor(c, 25); pctx.fillRect(0, 0, 60, 30); 
                  const drawStone = (sx, sy, sw, sh, isDark) => {
                      pctx.fillStyle = isDark ? darkenColor(c, 6) : c;
                      pctx.fillRect(sx, sy, sw, sh);
                      for(let i=0; i<(sw*sh*0.1); i++) {
                          pctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)';
                          pctx.fillRect(sx + Math.random()*sw, sy + Math.random()*sh, 1, 1);
                      }
                      pctx.fillStyle = 'rgba(255,255,255,0.1)'; pctx.fillRect(sx, sy, sw, 1); pctx.fillRect(sx, sy, 1, sh);
                      pctx.fillStyle = 'rgba(0,0,0,0.15)'; pctx.fillRect(sx, sy+sh-1, sw, 1); pctx.fillRect(sx+sw-1, sy, 1, sh);
                  };
                  drawStone(0, 0, 28, 13, false); drawStone(30, 0, 28, 13, true);
                  drawStone(-15, 15, 28, 13, true); drawStone(15, 15, 28, 13, false); drawStone(45, 15, 28, 13, false);
                  let pat = ctx.createPattern(pc, 'repeat'); matPatternCache[c] = pat; return pat;
              }
              if (isMatch(c, COLOR_PLASTER) || isMatch(c, COLOR_PLASTER2) || isMatch(c, COLOR_GABLE) || isMatch(c, COLOR_TURRET) || isMatch(c, COLOR_DORMER)) {
                  const pc = document.createElement('canvas'); pc.width = 80; pc.height = 80; const pctx = pc.getContext('2d');
                  pctx.fillStyle = c; pctx.fillRect(0, 0, 80, 80);
                  for (let i = 0; i < 600; i++) {
                      let s = Math.random() * 1.2 + 0.5;
                      pctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.025)' : 'rgba(255,255,255,0.03)';
                      pctx.fillRect(Math.random() * 80, Math.random() * 80, s, s);
                  }
                  let pat = ctx.createPattern(pc, 'repeat'); matPatternCache[c] = pat; return pat;
              }
              return c;
          };
          const applyPath = (path) => {
              if(!path || path.length===0) return;
              ctx.beginPath();
              path.forEach(cmd => { 
                  if(cmd.type==='M') ctx.moveTo(cmd.x, cmd.y); 
                  if(cmd.type==='L') ctx.lineTo(cmd.x, cmd.y); 
                  if(cmd.type==='B') ctx.bezierCurveTo(cmd.cx1, cmd.cy1, cmd.cx2, cmd.cy2, cmd.x, cmd.y); 
              });
              ctx.closePath();
          };
          const drawTimbers = (timberGroup) => {
              if(!timberGroup) return;
              ctx.strokeStyle = COLOR_TIMBER; ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; ctx.miterLimit = 2; 
              ['h', 'd', 'v'].forEach(type => { 
                  if(!timberGroup[type]) return;
                  timberGroup[type].forEach(line => { 
                      ctx.lineWidth = vThickBase * line.multi; 
                      ctx.beginPath(); 
                      if(line.curve) { ctx.moveTo(line.x1, line.y1); ctx.bezierCurveTo(line.cx1, line.cy1, line.cx2, line.cy2, line.x2, line.y2); } 
                      else { ctx.moveTo(line.x1, line.y1); ctx.lineTo(line.x2, line.y2); } 
                      ctx.stroke(); 
                  }); 
              });
          };
          const drawPreShapes = (shapes) => {
              if(!shapes) return;
              shapes.forEach(s => {
                  if (s.type === 'arc' || s.type === 'poly' || s.type === 'path') {
                      ctx.fillStyle = COLOR_TIMBER; ctx.beginPath();
                      if (s.type === 'arc') { ctx.moveTo(s.x, s.y); ctx.arc(s.x, s.y, s.r, s.startAngle, s.endAngle, false); } 
                      else if (s.type === 'poly') { ctx.moveTo(s.points[0].x, s.points[0].y); s.points.forEach(p => ctx.lineTo(p.x, p.y)); } 
                      else if (s.type === 'path') { 
                          s.path.forEach(cmd => { 
                              if(cmd.type === 'M') ctx.moveTo(cmd.x, cmd.y); 
                              if(cmd.type === 'L') ctx.lineTo(cmd.x, cmd.y); 
                              if(cmd.type === 'B') ctx.bezierCurveTo(cmd.cx1, cmd.cy1, cmd.cx2, cmd.cy2, cmd.x, cmd.y); 
                          }); 
                      }
                      ctx.closePath(); ctx.fill();
                  } else if (s.type === 'carving') {
                      ctx.strokeStyle = COLOR_PLASTER; ctx.lineWidth = vThickBase * s.widthMulti; ctx.lineCap = 'round';
                      ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
                  }
              });
          };
          const drawPostShapes = (shapes) => {
              if(!shapes) return;
              shapes.forEach(s => {
                  if (s.type === 'negative_ellipse') {
                      ctx.save();
                      if (s.clipBox) { 
                          ctx.beginPath(); 
                          ctx.rect(s.clipBox.x, s.clipBox.y, s.clipBox.w, s.clipBox.h); 
                          ctx.clip(); 
                      }
                      ctx.fillStyle = resolveFill(s.color); 
                      ctx.beginPath(); 
                      ctx.ellipse(s.x, s.y, s.rx, s.ry, 0, 0, Math.PI*2); 
                      ctx.fill();
                      ctx.strokeStyle = COLOR_TIMBER; 
                      ctx.lineWidth = vThickBase * 0.9; 
                      ctx.stroke();
                      ctx.restore();
                  }
              });
          };
          const drawWindows = (winArray) => { 
              if(!winArray) return;
              let winStyle = document.getElementById('paramWinStyle')?.value || 'quadrat';
              let winSprossen = document.getElementById('paramWinSprossen')?.value || 'mix';
              let winGlass = document.getElementById('paramWinGlass')?.value || 'hell';
              let sprossenThick = parseInt(document.getElementById('paramWinSprossenThick')?.value || 40) / 100;
              let patternScale = parseInt(document.getElementById('paramWinPatternScale')?.value || 100) / 100;
              let winShutters = document.getElementById('paramWinShutters')?.value || 'keine';
              let shutterColor = document.getElementById('paramWinShutterColor')?.value || '#1e404f';
              let glassColor = COLOR_WINDOW; 
              if (winGlass === 'altglas') glassColor = '#b5d8ca'; 
              else if (winGlass === 'abend') glassColor = '#f4c759'; 
              else if (winGlass === 'dunkel') glassColor = '#2e3c4a'; 
              let insetY = vThickBase * 0.7;   
              let insetX = vThickBase * 0.375; 
              winArray.forEach((win, index) => { 
                  let wx = win.x + insetX;
                  let wy = win.y + insetY;
                  let ww = Math.max(1, win.w - (insetX * 2));
                  let wh = Math.max(1, win.h - (insetY * 2));
                  let cx = wx + ww / 2;
                  let r = ww / 2;
                  let sH = Math.max(1, wh - r); 
                  let canOpenLeft = true;
                  let canOpenRight = true;
                  if (winShutters !== 'keine') {
                      for (let j = 0; j < winArray.length; j++) {
                          if (index === j) continue;
                          let other = winArray[j];
                          let ox = other.x + insetX;
                          let oy = other.y + insetY;
                          let ow = Math.max(1, other.w - (insetX * 2));
                          if (Math.abs(wy - oy) < wh / 2) {
                              if (ox < wx && (wx - (ox + ow)) < (ww/2 + ow/2)) canOpenLeft = false;
                              if (ox > wx && (ox - (wx + ww)) < (ww/2 + ow/2)) canOpenRight = false;
                          }
                      }
                  }
                  let rnd = pseudoRandom(wx, wy);
                  if (winShutters !== 'keine') {
                      if (rnd > 0.85) canOpenLeft = false;
                      if (rnd > 0.92) canOpenRight = false;
                  }
                  ctx.fillStyle = glassColor; 
                  ctx.strokeStyle = COLOR_TIMBER; 
                  ctx.lineWidth = (vThickBase * 0.4); 
                  ctx.beginPath();
                  ctx.moveTo(wx + ww, wy);
                  ctx.lineTo(wx + ww, wy + sH);
                  if (winStyle === 'spitzbogen') {
                      ctx.bezierCurveTo(wx + ww, wy + wh * 1.05, cx + r*0.05, wy + wh, cx, wy + wh);
                      ctx.bezierCurveTo(cx - r*0.05, wy + wh, wx, wy + wh * 1.05, wx, wy + sH);
                  } else if (winStyle === 'flachbogen') {
                      let fH = wh - r*0.4;
                      ctx.lineTo(wx + ww, wy + fH);
                      ctx.ellipse(cx, wy + fH, r, r*0.4, 0, 0, Math.PI, false);
                  } else if (winStyle === 'rundbogen') {
                      ctx.arc(cx, wy + sH, r, 0, Math.PI, false);
                  } else {
                      ctx.lineTo(wx + ww, wy + wh);
                      ctx.lineTo(wx, wy + wh);
                  }
                  ctx.lineTo(wx, wy);
                  ctx.closePath();
                  ctx.fill(); 
                  ctx.stroke(); 
                  let currentSprossen = winSprossen;
                  if (winSprossen === 'mix') {
                      let randMix = pseudoRandom(wx * 2, wy * 2);
                      if (randMix < 0.33) currentSprossen = 'rauten';
                      else if (randMix < 0.66) currentSprossen = 'butzen';
                      else currentSprossen = 'halbkreis';
                  } else if (winSprossen === 'mix_modern') {
                      let randMix = pseudoRandom(wx * 2, wy * 2);
                      if (randMix < 0.25) currentSprossen = 'kreuz';
                      else if (randMix < 0.50) currentSprossen = 'steg';
                      else if (randMix < 0.70) currentSprossen = 'quersteg';
                      else if (randMix < 0.85) currentSprossen = 't_form';
                      else currentSprossen = 'keine'; 
                  }
                  if (currentSprossen !== 'keine') {
                      ctx.save();
                      ctx.clip(); 
                      ctx.beginPath(); 
                      ctx.lineWidth = vThickBase * sprossenThick;
                      ctx.strokeStyle = (winGlass === 'dunkel') ? darkenColor(COLOR_TIMBER, 30) : COLOR_TIMBER;
                      if (currentSprossen === 'steg') {
                          ctx.moveTo(cx, wy); ctx.lineTo(cx, wy + wh * 1.1); 
                      } else if (currentSprossen === 'quersteg') {
                          ctx.moveTo(wx, wy + wh * 0.33); ctx.lineTo(wx + ww, wy + wh * 0.33);
                      } else if (currentSprossen === 't_form') {
                          ctx.moveTo(wx, wy + wh * 0.33); ctx.lineTo(wx + ww, wy + wh * 0.33);
                          ctx.moveTo(cx, wy + wh * 0.33); ctx.lineTo(cx, wy + wh * 1.1);
                      } else if (currentSprossen === 'kreuz') {
                          ctx.moveTo(wx, wy + wh * 0.5); ctx.lineTo(wx + ww, wy + wh * 0.5); 
                          ctx.moveTo(cx, wy); ctx.lineTo(cx, wy + wh * 1.1); 
                      } else if (currentSprossen === 'gitter') {
                          ctx.moveTo(cx, wy); ctx.lineTo(cx, wy + wh * 1.1); 
                          ctx.moveTo(wx, wy + wh * 0.33); ctx.lineTo(wx + ww, wy + wh * 0.33); 
                          ctx.moveTo(wx, wy + wh * 0.66); ctx.lineTo(wx + ww, wy + wh * 0.66); 
                      } else if (currentSprossen === 'rauten') {
                          let step = (ww / 2.5) * patternScale; 
                          for(let d = -wh; d < ww + wh; d += step) {
                              ctx.moveTo(wx + d, wy); ctx.lineTo(wx + d + wh, wy + wh);
                              ctx.moveTo(wx + d, wy + wh); ctx.lineTo(wx + d + wh, wy);
                          }
                      } else if (currentSprossen === 'butzen') {
                          let bSize = (ww / 4.5) * patternScale;
                          ctx.lineWidth = vThickBase * sprossenThick * 0.6; 
                          for(let y = wy; y < wy + wh; y += bSize) {
                              for(let x = wx; x < wx + ww; x += bSize) {
                                  ctx.moveTo(x + bSize, y + bSize/2);
                                  ctx.arc(x + bSize/2, y + bSize/2, bSize/2, 0, Math.PI*2);
                              }
                          }
                      } else if (currentSprossen === 'halbkreis') {
                          let bSize = (ww / 3) * patternScale;
                          ctx.lineWidth = vThickBase * sprossenThick * 0.6; 
                          for(let y = wy; y < wy + wh + bSize; y += bSize*0.5) {
                              let offset = (Math.round(y/(bSize*0.5)) % 2 === 0) ? 0 : bSize/2;
                              for(let x = wx - offset; x < wx + ww + bSize; x += bSize) {
                                  ctx.moveTo(x + bSize, y);
                                  ctx.arc(x + bSize/2, y, bSize/2, 0, Math.PI);
                              }
                          }
                      }
                      ctx.stroke(); 
                      ctx.restore();
                  }
                  if (winShutters !== 'keine') {
                      let drawShutter = (sx, sy, sw, sh, isLeft) => {
                          ctx.fillStyle = shutterColor;
                          ctx.strokeStyle = darkenColor(shutterColor, 40);
                          ctx.lineWidth = vThickBase * 0.4;
                          ctx.fillRect(sx, sy, sw, sh);
                          ctx.strokeRect(sx, sy, sw, sh);
                          if (winShutters === 'z_beschlag') {
                              let pw = sw / 3;
                              for(let p=1; p<3; p++) { ctx.beginPath(); ctx.moveTo(sx + p*pw, sy); ctx.lineTo(sx + p*pw, sy + sh); ctx.stroke(); }
                              ctx.lineWidth = vThickBase * 0.6;
                              ctx.beginPath(); 
                              ctx.moveTo(sx + sw*0.1, sy + sh*0.1); ctx.lineTo(sx + sw*0.9, sy + sh*0.1);
                              ctx.moveTo(sx + sw*0.1, sy + sh*0.9); ctx.lineTo(sx + sw*0.9, sy + sh*0.9);
                              if (isLeft) { ctx.moveTo(sx + sw*0.1, sy + sh*0.9); ctx.lineTo(sx + sw*0.9, sy + sh*0.1); } 
                              else { ctx.moveTo(sx + sw*0.1, sy + sh*0.1); ctx.lineTo(sx + sw*0.9, sy + sh*0.9); }
                              ctx.stroke();
                          } else if (winShutters === 'lamellen') {
                              ctx.lineWidth = vThickBase * 0.25;
                              let lH = sw * 0.25;
                              for(let ly = sy + lH; ly < sy + sh - lH; ly += lH) {
                                  ctx.beginPath(); ctx.moveTo(sx + sw*0.15, ly); ctx.lineTo(sx + sw*0.85, ly); ctx.stroke();
                              }
                              ctx.lineWidth = vThickBase * 0.5;
                              ctx.strokeRect(sx + sw*0.1, sy + sw*0.1, sw*0.8, sh - sw*0.2);
                          } else if (winShutters === 'kassetten') {
                              ctx.lineWidth = vThickBase * 0.4;
                              let pad = sw * 0.15; let kH = (sh - pad*3) / 2;
                              ctx.strokeRect(sx + pad, sy + pad, sw - pad*2, kH);
                              ctx.strokeRect(sx + pad, sy + pad*2 + kH, sw - pad*2, kH);
                          } else if (winShutters === 'brett') {
                              let pw = sw / 4;
                              for(let p=1; p<4; p++) { ctx.beginPath(); ctx.moveTo(sx + p*pw, sy); ctx.lineTo(sx + p*pw, sy + sh); ctx.stroke(); }
                              ctx.fillStyle = '#1c1917';
                              ctx.fillRect(sx, sy + sh*0.15, sw, vThickBase * 0.5);
                              ctx.fillRect(sx, sy + sh*0.85, sw, vThickBase * 0.5);
                          }
                      };
                      if (!canOpenLeft) drawShutter(wx, wy, ww/2, wh, true);
                      else drawShutter(wx - ww/2, wy, ww/2, wh, true);
                      if (!canOpenRight) drawShutter(wx + ww/2, wy, ww/2, wh, false);
                      else drawShutter(wx + ww, wy, ww/2, wh, false);
                  }
              }); 
          };
          const drawDoors = (doorsArray) => {
              if(!doorsArray) return;
              doorsArray.forEach(door => {
                  ctx.fillStyle = '#6e452d'; 
                  let r = door.w / 2; let sH = door.h - r;
                  ctx.beginPath();
                  if (door.type === 'rundbogen') {
                      ctx.moveTo(door.x + door.w, door.y); ctx.lineTo(door.x + door.w, door.y + sH);
                      ctx.arc(door.x + r, door.y + sH, r, 0, Math.PI, false); ctx.lineTo(door.x, door.y);
                  } else {
                      ctx.moveTo(door.x + door.w, door.y); ctx.lineTo(door.x + door.w, door.y + door.h);
                      ctx.lineTo(door.x, door.y + door.h); ctx.lineTo(door.x, door.y);
                  }
                  ctx.closePath(); ctx.fill();
                  ctx.strokeStyle = '#4a2e1b';
                  ctx.lineWidth = vThickBase * 0.8;
                  ctx.save(); ctx.clip();
                  if (door.type !== 'einzeltuer') {
                      ctx.beginPath(); 
                      ctx.moveTo(door.x + door.w/2, door.y); 
                      ctx.lineTo(door.x + door.w/2, door.y + door.h); 
                      ctx.stroke();
                  }
                  ctx.fillStyle = '#1c1917';
                  let hY = door.y + door.h * 0.45;
                  let hR = vThickBase * 0.8;
                  if (door.type === 'einzeltuer') {
                      ctx.beginPath(); ctx.arc(door.x + door.w * 0.8, hY, hR, 0, Math.PI*2); ctx.fill();
                  } else {
                      ctx.beginPath(); ctx.arc(door.x + door.w * 0.5 - vThickBase * 1.5, hY, hR, 0, Math.PI*2); ctx.fill();
                      ctx.beginPath(); ctx.arc(door.x + door.w * 0.5 + vThickBase * 1.5, hY, hR, 0, Math.PI*2); ctx.fill();
                  }
                  ctx.restore();
              });
          };
          const renderGroup = (g) => {
              drawPreShapes(g.preShapes);
              if (g.backgroundShapes) {
                  g.backgroundShapes.forEach(p => {
                      if (p.type === 'ruine_overlay') {
                          ctx.fillStyle = resolveFill(p.color);
                          ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); 
                          for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); 
                          ctx.closePath(); ctx.fill();
                          ctx.strokeStyle = darkenColor(COLOR_STONE, 30); ctx.lineWidth = vThickBase * 0.6;
                          ctx.beginPath(); ctx.moveTo(p.poly[2].x, p.poly[2].y);
                          for(let i=3; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y);
                          ctx.stroke();
                          ctx.save(); ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); 
                          for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); ctx.clip();
                          ctx.strokeStyle = darkenColor(COLOR_STONE, 25); ctx.lineWidth = vThickBase * 0.5;
                          for(let y=15; y<p.h; y+=15) { ctx.beginPath(); for(let x=-p.sW_half-50; x<p.sW_half+50; x+=20) { ctx.lineTo(x, y + pseudoRandom(x,y)*4 - 2); } ctx.stroke(); }
                          for(let y=0; y<p.h; y+=15) { let offset = (y % 30 === 0) ? 0 : 20; for(let x = -p.sW_half - 50 + offset; x < p.sW_half + 50; x+=40) { let xx = x + pseudoRandom(y,x)*10 - 5; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y+15); ctx.stroke(); } }
                          if (p.sockelQuader === 'rustikal') {
                              ctx.fillStyle = COLOR_STONE; ctx.strokeStyle = darkenColor(COLOR_STONE, 30); ctx.lineWidth = vThickBase * 0.6;
                              let blockH = 18;
                              for (let y = 0; y < p.h; y += blockH) {
                                  let wL = (y % (blockH*2) === 0) ? 35 : 20; let wR = (y % (blockH*2) === 0) ? 20 : 35;
                                  let curW = p.sW_half; let nextW = p.sW_half;
                                  if (p.sockelStyle === 'stein_schraeg') {
                                      if (y < p.sockelH) curW = p.sW_half + (p.sockelH - y) * 0.4;
                                      let ny = Math.min(y+blockH, p.h);
                                      if (ny < p.sockelH) nextW = p.sW_half + (p.sockelH - ny) * 0.4;
                                  }
                                  let lx = -curW; let lnx = -nextW;
                                  ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + wL + pseudoRandom(y,1)*5, y); ctx.lineTo(lnx + wL + pseudoRandom(y,2)*5, Math.min(y+blockH, p.h)); ctx.lineTo(lnx, Math.min(y+blockH, p.h)); ctx.closePath(); ctx.fill(); ctx.stroke();
                                  let rx = curW; let rnx = nextW;
                                  ctx.beginPath(); ctx.moveTo(rx, y); ctx.lineTo(rx - wR - pseudoRandom(y,3)*5, y); ctx.lineTo(rnx - wR - pseudoRandom(y,4)*5, Math.min(y+blockH, p.h)); ctx.lineTo(rnx, Math.min(y+blockH, p.h)); ctx.closePath(); ctx.fill(); ctx.stroke();
                              }
                          }
                          ctx.restore();
                      }
                  });
              }
              if(g.customShapes) {
                  g.customShapes.forEach(s => {
                      if (s.type === 'stairs' || s.type === 'stone_frame' || s.type === 'fassaden_dekor') return; 
                      ctx.fillStyle = resolveFill(s.color);
                      if(s.type === 'konsole') { 
                          ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x1, s.y2); ctx.lineTo(s.x2, s.y2); 
                          ctx.bezierCurveTo(s.x2, s.y1 + (s.y2-s.y1)*0.5, s.x1, s.y1 + (s.y2-s.y1)*0.2, s.x1, s.y1); 
                          ctx.closePath(); ctx.fill(); ctx.strokeStyle = COLOR_TIMBER; ctx.lineWidth = vThickBase * 1.0; ctx.stroke(); 
                      } else if (s.type === 'stamm_5eck' || s.type === 'stamm_spitz' || s.type === 'stamm_quadrat' || s.type === 'stamm_rund') {
                          let size = s.size || 15;
                          ctx.beginPath();
                          if (s.type === 'stamm_5eck') {
                              ctx.moveTo(s.cx, s.cy - size * 1.2); 
                              ctx.lineTo(s.cx + size * 1.1, s.cy - size * 0.2);
                              ctx.lineTo(s.cx + size * 0.8, s.cy + size * 0.4);
                              ctx.lineTo(s.cx - size * 0.8, s.cy + size * 0.4);
                              ctx.lineTo(s.cx - size * 1.1, s.cy - size * 0.2);
                          } else if (s.type === 'stamm_spitz') {
                              ctx.moveTo(s.cx - size * 0.3, s.cy - size * 1.4); 
                              ctx.lineTo(s.cx + size * 0.3, s.cy - size * 1.4); 
                              ctx.lineTo(s.cx + size * 0.9, s.cy - size * 0.3);
                              ctx.lineTo(s.cx + size * 0.7, s.cy + size * 0.4);
                              ctx.lineTo(s.cx - size * 0.7, s.cy + size * 0.4);
                              ctx.lineTo(s.cx - size * 0.9, s.cy - size * 0.3);
                          } else if (s.type === 'stamm_quadrat') {
                              let vW = size * 1.0; let vH = size * 1.2;
                              ctx.rect(s.cx - vW, s.cy - size * 1.5, vW * 2, vH);
                          } else {
                              let vW = size * 1.3; 
                              let vH = size * 1.2; 
                              let rad = size * 0.5; 
                              let x = s.cx - vW;
                              let y = s.cy - size * 1.5;
                              ctx.moveTo(x, y + vH); 
                              ctx.lineTo(x + vW * 2, y + vH); 
                              ctx.arcTo(x + vW * 2, y, x, y, rad); 
                              ctx.arcTo(x, y, x, y + vH, rad);
                              ctx.lineTo(x, y + vH);
                          }
                          ctx.closePath(); ctx.fill();
                          ctx.strokeStyle = darkenColor(s.color, 10); ctx.lineWidth = vThickBase * 0.45; ctx.stroke();
                      } else if (s.type === 'neidkopf') {
                          let cx = s.cx; let cy = s.cy; let size = s.size || 19;
                          let scl = size / 10;
                          let f = s.flip ? -1 : 1; 
                          ctx.beginPath();
                          ctx.moveTo(cx + (-6 * scl * f), cy);             
                          ctx.lineTo(cx + ( 4 * scl * f), cy);             
                          ctx.lineTo(cx + ( 5 * scl * f), cy -  4 * scl);  
                          ctx.lineTo(cx + (12 * scl * f), cy -  6 * scl);  
                          ctx.lineTo(cx + ( 9 * scl * f), cy - 10 * scl);  
                          ctx.lineTo(cx + ( 4 * scl * f), cy - 11 * scl);  
                          ctx.lineTo(cx + ( 9 * scl * f), cy - 12 * scl);  
                          ctx.lineTo(cx + (16 * scl * f), cy - 16 * scl);  
                          ctx.lineTo(cx + ( 6 * scl * f), cy - 22 * scl);  
                          ctx.lineTo(cx + ( 9 * scl * f), cy - 25 * scl);  
                          ctx.lineTo(cx + ( 2 * scl * f), cy - 30 * scl);  
                          ctx.lineTo(cx + ( 4 * scl * f), cy - 38 * scl);  
                          ctx.lineTo(cx + (-4 * scl * f), cy - 32 * scl);  
                          ctx.lineTo(cx + (-12 * scl * f), cy - 20 * scl); 
                          ctx.lineTo(cx + (-8 * scl * f), cy - 10 * scl);  
                          ctx.closePath();
                          ctx.fill();
                      } else if (s.type === 'solid_path') {
                          applyPath(s.path); ctx.fill();
                          if (s.joints && s.joints.length > 0) {
                              ctx.strokeStyle = darkenColor(s.color, 10); ctx.lineWidth = vThickBase * 0.8; ctx.beginPath();
                              s.joints.forEach(j => { ctx.moveTo(j.x1, j.y1); ctx.lineTo(j.x2, j.y2); }); ctx.stroke();
                          }
                      }
                  });
              }
              drawTimbers(g.innerTimbers);
              drawPostShapes(g.postShapes);
              drawTimbers(g.frameTimbers);
              if(g.customShapes) {
                  g.customShapes.forEach(s => {
                      if (s.type === 'fassaden_dekor') {
                          const dSize = s.size || 14;
                          let pThick = vThickBase;
                          let scheme = document.getElementById('paramDecorScheme')?.value || 'hist1';
                          let redCol = '#991b1b', blueCol = '#1e3a8a', goldCol = '#ca8a04', greenCol = '#166534';
                          if (scheme === 'hist2') { redCol = '#1e3a8a'; blueCol = '#ca8a04'; goldCol = '#fde047'; greenCol = '#1e404f'; }
                          else if (scheme === 'harmony') { redCol = '#c2410c'; blueCol = '#7c2d12'; goldCol = '#eab308'; greenCol = '#3f6212'; }
                          else if (scheme === 'artnouveau') { redCol = '#9d174d'; blueCol = '#1e40af'; goldCol = '#fbbf24'; greenCol = '#065f46'; }
                          else if (scheme === 'nature') { redCol = '#451a03'; blueCol = '#78350f'; goldCol = '#d97706'; greenCol = '#422006'; }
                          ctx.save();
                          ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1;
                          if (s.decorType === 'text') {
                               ctx.fillStyle = goldCol; let charW = pThick * 0.4; let charH = s.h * 0.55;
                               for(let tx = s.x + 10; tx < s.x + s.w - 10; tx += charW * 3) {
                                   if(pseudoRandom(tx, s.y) > 0.2) {
                                       ctx.fillStyle = (pseudoRandom(tx, 1) > 0.9) ? redCol : goldCol;
                                       ctx.fillRect(tx, s.y - charH/2, charW, charH);
                                   }
                               }
                          } else if (s.decorType === 'sonnenrad') {
                               ctx.fillStyle = blueCol; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI); ctx.fill();
                               for(let i=0; i<9; i++) {
                                   ctx.fillStyle = i%2===0 ? redCol : goldCol;
                                   ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.arc(s.x, s.y, s.size*0.9, (i/9)*Math.PI, ((i+1)/9)*Math.PI); ctx.fill();
                               }
                               ctx.strokeStyle = goldCol; ctx.lineWidth = pThick * 0.3; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI); ctx.stroke();
                          } else if (s.decorType === 'akanthus') {
                               let w = s.size; let step = (s.yTop - s.yBot) / 4;
                               for(let ty = s.yBot; ty < s.yTop - step*0.5; ty += step) {
                                   ctx.fillStyle = (pseudoRandom(ty, s.x) > 0.5) ? greenCol : blueCol;
                                   ctx.fillRect(s.x - w*0.8, ty + step*0.1, w*1.6, step*0.8);
                                   ctx.strokeStyle = goldCol; ctx.lineWidth = pThick * 0.4;
                                   ctx.strokeRect(s.x - w*0.5, ty + step*0.2, w, step*0.6);
                               }
                          } else if (s.decorType === 'saeule') {
                               let w = s.size * 0.7; ctx.fillStyle = goldCol; ctx.fillRect(s.x - w*1.2, s.yBot, w*2.4, w*1.5);
                               ctx.fillStyle = '#4b5563'; ctx.fillRect(s.x - w, s.yBot + w*1.5, w*2, (s.yTop - s.yBot) - w*3);
                               ctx.fillStyle = goldCol; ctx.fillRect(s.x - w*1.2, s.yTop - w*1.5, w*2.4, w*1.5);
                          } else if (s.decorType === 'zopf') {
                               let w = pThick * 0.8;
                               for(let ty = s.yTop - w*2; ty > s.yBot + w*2; ty -= w*2.5) {
                                   ctx.fillStyle = redCol; ctx.beginPath(); ctx.ellipse(s.x, ty, w*0.4, w*0.9, 0, 0, Math.PI*2); ctx.fill();
                                   ctx.strokeStyle = goldCol; ctx.lineWidth = pThick * 0.3;
                                   ctx.strokeRect(s.x - w*0.5, ty - w, w, w*2);
                               }
                          }
                          ctx.restore();
                      }
                  });
              }
              if(g.customShapes) {
                  g.customShapes.forEach(s => {
                      if (s.type === 'fassaden_dekor') {
                          const dSize = s.size || 14;
                          let pThick = vThickBase;
                          let isDarkTimber = (s.color === '#2d1b15' || s.color === '#1e404f'); 
                          let goldCol = isDarkTimber ? '#fef08a' : '#ca8a04';
                          let redCol = '#991b1b'; let blueCol = '#1e3a8a'; let greenCol = '#166534';
                          ctx.save();
                          ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1;
                          if (s.decorType === 'text') {
                               ctx.fillStyle = goldCol; let charW = pThick * 0.4; let charH = s.h * 0.55;
                               for(let tx = s.x + 10; tx < s.x + s.w - 10; tx += charW * 2.5) {
                                   let rnd = pseudoRandom(tx, s.y);
                                   if(rnd > 0.15) {
                                       ctx.fillStyle = (rnd > 0.9) ? redCol : goldCol;
                                       let h = charH * (0.7 + pseudoRandom(tx,1)*0.5); let yOff = s.y - h/2;
                                       ctx.fillRect(tx, yOff, charW, h); ctx.fillRect(tx - charW*0.5, yOff, charW*2, charW*0.6); ctx.fillRect(tx - charW*0.5, yOff + h - charW*0.6, charW*2, charW*0.6);
                                   } else { tx += charW * 2; }
                               }
                          } else if (s.decorType === 'sonnenrad') {
                               ctx.fillStyle = blueCol; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI); ctx.fill();
                               let steps = 9;
                               for(let i=0; i<steps; i++) {
                                   let a1 = (i/steps)*Math.PI; let a2 = ((i+1)/steps)*Math.PI;
                                   ctx.fillStyle = i%2===0 ? redCol : goldCol;
                                   ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.arc(s.x, s.y, s.size*0.9, a1, a2); ctx.closePath(); ctx.fill();
                               }
                               ctx.strokeStyle = goldCol; ctx.lineWidth = pThick * 0.3; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI); ctx.stroke();
                          } else if (s.decorType === 'akanthus') {
                               let w = s.size; let numSpirals = Math.max(1, Math.floor((s.yTop - s.yBot) / (w * 2.5)));
                               let step = (s.yTop - s.yBot) / numSpirals;
                               for(let ty = s.yBot; ty < s.yTop - step*0.5; ty += step) {
                                   ctx.fillStyle = (pseudoRandom(ty, s.x) > 0.5) ? greenCol : blueCol;
                                   ctx.fillRect(s.x - w*0.8, ty + step*0.1, w*1.6, step*0.8);
                                   ctx.strokeStyle = goldCol; ctx.lineWidth = pThick * 0.4;
                                   ctx.beginPath(); ctx.moveTo(s.x - w*0.5, ty + step*0.2);
                                   ctx.bezierCurveTo(s.x + w, ty + step*0.2, s.x + w, ty + step*0.8, s.x + w*0.5, ty + step*0.8); ctx.stroke();
                                   ctx.fillStyle = redCol; ctx.beginPath(); ctx.arc(s.x, ty + step*0.5, w*0.3, 0, Math.PI*2); ctx.fill();
                               }
                          } else if (s.decorType === 'saeule') {
                               let w = s.size * 0.7; ctx.fillStyle = goldCol; ctx.fillRect(s.x - w*1.2, s.yBot, w*2.4, w*1.5);
                               ctx.fillStyle = '#4b5563'; ctx.fillRect(s.x - w, s.yBot + w*1.5, w*2, (s.yTop - s.yBot) - w*3);
                               ctx.fillStyle = goldCol; ctx.fillRect(s.x - w*1.2, s.yTop - w*1.5, w*2.4, w*1.5);
                          } else if (s.decorType === 'zopf') {
                               let w = pThick * 0.8;
                               for(let ty = s.yTop - w*2; ty > s.yBot + w*2; ty -= w*2.5) {
                                   ctx.fillStyle = redCol; ctx.beginPath(); ctx.ellipse(s.x, ty, w*0.4, w*0.9, 0, 0, Math.PI*2); ctx.fill();
                                   ctx.strokeStyle = goldCol; ctx.lineWidth = pThick * 0.3; ctx.beginPath();
                                   ctx.moveTo(s.x - w*0.6, ty - w*1.2); ctx.lineTo(s.x + w*0.6, ty + w*1.2); ctx.stroke();
                               }
                          }
                          ctx.restore();
                      }
                  });
              }
              if (typeof drawArches !== 'undefined' && g.arches) {
                  drawArches(g.arches);
              }
              if(g.customShapes) {
                  g.customShapes.forEach(s => {
                      if (s.type === 'stone_frame') { 
                          ctx.fillStyle = resolveFill(s.color);
                          let fw = s.w + vThickBase * 8; let fh = s.h + vThickBase * 4; let fx = s.x - vThickBase * 4; let fy = s.y; 
                          if (s.doorType === 'rundbogen') { let r = fw / 2; let sH_arch = fh - r; ctx.beginPath(); ctx.moveTo(fx + fw, fy); ctx.lineTo(fx + fw, fy + sH_arch); ctx.arc(fx + r, fy + sH_arch, r, 0, Math.PI, false); ctx.lineTo(fx, fy); ctx.closePath(); ctx.fill(); ctx.strokeStyle = darkenColor(s.color, 20); ctx.lineWidth = vThickBase * 0.5; ctx.stroke(); } 
                          else { ctx.fillRect(fx, fy, fw, fh); ctx.strokeStyle = darkenColor(s.color, 20); ctx.lineWidth = vThickBase * 0.5; ctx.strokeRect(fx, fy, fw, fh); } 
                      } else if (s.type === 'stairs') { 
                          ctx.fillStyle = resolveFill(s.color);
                          ctx.fillRect(s.x, s.y, s.w, s.h); ctx.strokeStyle = darkenColor(s.color, 20); ctx.lineWidth = vThickBase * 0.5; ctx.strokeRect(s.x, s.y, s.w, s.h); 
                      }
                  });
              }
              drawDoors(g.doors);
              drawWindows(g.windows);
              if (g.foregroundShapes) {
                  g.foregroundShapes.forEach(p => {
                      if (p.type === 'wetterdach') {
                          let rOverhang = 15;
                          let x1 = p.x1 - rOverhang; let x2 = p.x2 + rOverhang;
                          let roofCol = resolveFill(p.color);
                          ctx.fillStyle = COLOR_TIMBER;
                          let bracketW = 6;
                          let numBrackets = Math.max(2, Math.floor((p.x2 - p.x1) / 40));
                          let step = (p.x2 - p.x1) / numBrackets;
                          for (let i=0; i<=numBrackets; i++) {
                              let bx = p.x1 + i*step;
                              ctx.beginPath();
                              ctx.moveTo(bx - bracketW/2, p.yBot); ctx.lineTo(bx + bracketW/2, p.yBot);
                              ctx.lineTo(bx + bracketW/2, p.yTop - 15); ctx.lineTo(bx - bracketW/2, p.yTop - 15);
                              ctx.closePath(); ctx.fill();
                          }
                          ctx.fillStyle = roofCol;
                          ctx.beginPath();
                          ctx.moveTo(p.x1, p.yTop); ctx.lineTo(p.x2, p.yTop);
                          ctx.lineTo(x2, p.yBot); ctx.lineTo(x1, p.yBot);
                          ctx.closePath(); ctx.fill();
                          ctx.strokeStyle = darkenColor(COLOR_TURRET_ROOF, 25);
                          ctx.lineWidth = vThickBase * 0.4;
                          ctx.beginPath();
                          for(let ly = p.yTop; ly > p.yBot; ly -= 8) {
                              let f = (p.yTop - ly) / (p.yTop - p.yBot);
                              let cx1 = p.x1 - rOverhang * f; let cx2 = p.x2 + rOverhang * f;
                              ctx.moveTo(cx1, ly); ctx.lineTo(cx2, ly);
                          }
                          ctx.stroke();
                          ctx.strokeStyle = COLOR_TIMBER; ctx.lineWidth = vThickBase * 0.8;
                          ctx.beginPath(); ctx.moveTo(x1, p.yBot); ctx.lineTo(x2, p.yBot); ctx.stroke(); 
                          ctx.lineWidth = vThickBase * 0.6;
                          ctx.beginPath();
                          ctx.moveTo(p.x1, p.yTop); ctx.lineTo(x1, p.yBot); 
                          ctx.moveTo(p.x2, p.yTop); ctx.lineTo(x2, p.yBot); 
                          ctx.stroke();
                      }
                  });
              }
          };
          scene.walls.bg.forEach(p => { 
              if (p.type === 'eg_auskragung') {
                  ctx.fillStyle = resolveFill(p.color);
                  applyPath(p.path); ctx.fill();
                  if (p.joints && p.joints.length > 0) {
                      ctx.strokeStyle = darkenColor(p.color, 10); ctx.lineWidth = vThickBase * 0.8; ctx.beginPath();
                      p.joints.forEach(j => { ctx.moveTo(j.x1, j.y1); ctx.lineTo(j.x2, j.y2); }); ctx.stroke();
                  }
              } else if (!p.isSockel || p.sockelStyle !== 'holz_pfeiler') {
                  ctx.fillStyle = resolveFill(p.color); 
                  if (p.path) { applyPath(p.path); } else { ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); ctx.closePath(); }
                  ctx.fill(); 
              }
              if (p.isSockel) {
                  if (p.sockelStyle === 'holz_pfeiler') {
                       let startX = -p.virtualW / 2;
                       ctx.strokeStyle = COLOR_TIMBER; ctx.fillStyle = COLOR_TIMBER; ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
                       let pThick = vThickBase * 2.2;
                       ctx.lineWidth = pThick;
                       ctx.beginPath(); ctx.moveTo(startX - 15, p.h); ctx.lineTo(-startX + 15, p.h); ctx.stroke();
                       for(let i=0; i<=p.cols; i++) {
                           let px = startX + getCellX(i, p.cols, p.virtualW, p.asym);
                           ctx.lineWidth = pThick;
                           ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, p.h); ctx.stroke();
                           ctx.fillStyle = COLOR_STONE;
                           ctx.fillRect(px - pThick*0.9, 0, pThick*1.8, pThick*1.2);
                           ctx.strokeStyle = darkenColor(COLOR_STONE, 30);
                           ctx.lineWidth = vThickBase * 0.4;
                           ctx.strokeRect(px - pThick*0.9, 0, pThick*1.8, pThick*1.2);
                           ctx.strokeStyle = COLOR_TIMBER;
                           ctx.lineWidth = vThickBase * 1.2;
                           let strutH = Math.min(p.h * 0.4, 40);
                           let strutW = Math.min((p.virtualW/p.cols)*0.25, 30);
                           if (i > 0) { ctx.beginPath(); ctx.moveTo(px, p.h - strutH); ctx.lineTo(px - strutW, p.h); ctx.stroke(); }
                           if (i < p.cols) { ctx.beginPath(); ctx.moveTo(px, p.h - strutH); ctx.lineTo(px + strutW, p.h); ctx.stroke(); }
                       }
                  } else {
                      ctx.save();
                      ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); ctx.clip();
                          let wTotal = p.sW_half * 3; 
                          ctx.strokeStyle = darkenColor(COLOR_STONE, 20); ctx.lineWidth = vThickBase * 0.5;
                          for(let y=15; y<p.h; y+=15) { ctx.beginPath(); ctx.moveTo(-wTotal, y); ctx.lineTo(wTotal, y); ctx.stroke(); 
                          for(let y=0; y<p.h; y+=15) { let offset = (y % 30 === 0) ? 0 : 20; for(let x = -wTotal + offset; x < wTotal; x+=40) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y+15); ctx.stroke(); } }
                      }
                      ctx.restore();
                      if (p.sockelQuader === 'rustikal') {
                          ctx.fillStyle = COLOR_STONE;
                          ctx.strokeStyle = darkenColor(COLOR_STONE, 30);
                          ctx.lineWidth = vThickBase * 0.6;
                          let blockH = 18;
                          let bottomW = (p.sockelStyle === 'stein_schraeg') ? p.sW_half + p.h*0.4 : p.sW_half;
                          let topW = p.sW_half;
                          for (let y = 0; y < p.h; y += blockH) {
                              let wL = (y % (blockH*2) === 0) ? 35 : 20; 
                              let wR = (y % (blockH*2) === 0) ? 20 : 35;
                              let curW = bottomW - ((bottomW - topW) * (y/p.h));
                              let nextW = bottomW - ((bottomW - topW) * (Math.min(y+blockH, p.h)/p.h));
                              let lx = -curW; let lnx = -nextW;
                              ctx.beginPath();
                              ctx.moveTo(lx, y); ctx.lineTo(lx + wL + pseudoRandom(y,1)*5, y);
                              ctx.lineTo(lnx + wL + pseudoRandom(y,2)*5, Math.min(y+blockH, p.h));
                              ctx.lineTo(lnx, Math.min(y+blockH, p.h));
                              ctx.closePath();
                              ctx.fill(); ctx.stroke();
                              let rx = curW; let rnx = nextW;
                              ctx.beginPath();
                              ctx.moveTo(rx, y); ctx.lineTo(rx - wR - pseudoRandom(y,3)*5, y);
                              ctx.lineTo(rnx - wR - pseudoRandom(y,4)*5, Math.min(y+blockH, p.h));
                              ctx.lineTo(rnx, Math.min(y+blockH, p.h));
                              ctx.closePath();
                              ctx.fill(); ctx.stroke();
                          }
                      }
                  }
              }
          });
          const drawArches = (archesArray) => {
              if(!archesArray) return;
              ctx.fillStyle = COLOR_ARCH;
              archesArray.forEach(arch => { 
                  ctx.beginPath(); let r = arch.w / 2; let sH = arch.h - r; ctx.moveTo(arch.cx + r, arch.y); ctx.lineTo(arch.cx + r, arch.y + sH); 
                  if(arch.type === 'spitz') { ctx.bezierCurveTo(arch.cx+r, arch.y+arch.h, arch.cx, arch.y+arch.h*1.2, arch.cx, arch.y+arch.h*1.2); ctx.bezierCurveTo(arch.cx, arch.y+arch.h*1.2, arch.cx-r, arch.y+arch.h, arch.cx-r, arch.y+sH); }
                  else if(arch.type === 'korb') { ctx.ellipse(arch.cx, arch.y + sH, r, r*0.6, 0, 0, Math.PI, false); }
                  else { ctx.arc(arch.cx, arch.y + sH, r, 0, Math.PI, false); }
                  ctx.lineTo(arch.cx - r, arch.y); ctx.closePath(); ctx.fill(); 
              });
          };
          renderGroup(scene.walls);
          scene.gables.forEach(gable => {
              if(gable.path.length > 0) {
                  applyPath(gable.path); ctx.fillStyle = resolveFill(gable.bgColor); ctx.fill();
                  ctx.save(); 
                  applyPath(gable.path); ctx.clip(); 
                  renderGroup(gable); 
                  ctx.restore();
              }
          });
          scene.oriels.bg.forEach(p => { 
              ctx.fillStyle = resolveFill(p.color); 
              if (p.path) { applyPath(p.path); } else { ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); ctx.closePath(); }
              ctx.fill(); 
          });
          scene.oriels.roofs.forEach(p => { 
              ctx.fillStyle = resolveFill(p.color); 
              ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); ctx.closePath(); 
              ctx.fill(); 
          });
          renderGroup(scene.oriels);
          scene.turrets.bg.forEach(p => { 
              ctx.fillStyle = resolveFill(p.color); 
              if (p.path) { applyPath(p.path); } else { ctx.beginPath(); ctx.moveTo(p.poly[0].x, p.poly[0].y); for(let i=1; i<p.poly.length; i++) ctx.lineTo(p.poly[i].x, p.poly[i].y); ctx.closePath(); }
              ctx.fill(); 
          });
          renderGroup(scene.turrets);
          if(scene.dormer.path.length > 0) {
              applyPath(scene.dormer.path); ctx.fillStyle = resolveFill(scene.dormer.bgColor); ctx.fill();
              ctx.save(); 
              applyPath(scene.dormer.path); ctx.clip();  renderGroup(scene.dormer); 
              ctx.restore();
          }
          ctx.restore();
      }
      let renderFrameRequest = null;
      function updateAndGenerate() { 
          if (renderFrameRequest) cancelAnimationFrame(renderFrameRequest);
          renderFrameRequest = requestAnimationFrame(() => {
              try { 
                  buildLayers(); 
                  renderModel(); 
              } catch (e) { 
                  console.error("Render Error:", e); 
              } 
          });
      }
      function resizeCanvas() {
          const wrapper = document.getElementById('canvas-wrapper');
          if (!wrapper) return;
          let cw = wrapper.clientWidth; let ch = wrapper.clientHeight; 
          if (cw <= 10 || ch <= 10) return;
          const dpr = window.devicePixelRatio || 1;
          canvas.width = cw * dpr; canvas.height = ch * dpr; 
          updateAndGenerate();
      }
      document.getElementById('btnAddFloorTop')?.addEventListener('click', () => {
          let currentRows = parseInt(uiRows.value);
          if (currentRows < parseInt(uiRows.max)) {
              initFloorControls(true); 
              let topFloor = savedFloorStates[currentRows - 1] || {};
              savedFloorStates.push(JSON.parse(JSON.stringify(topFloor))); 
              uiRows.value = currentRows + 1;
              updateVal('rowsVal', uiRows.value);
              initFloorControls(false); 
              updateAndGenerate(); 
          }
      });
      document.getElementById('btnAddFloorBottom')?.addEventListener('click', () => {
          let currentRows = parseInt(uiRows.value);
          if (currentRows < parseInt(uiRows.max)) {
              initFloorControls(true); 
              let bottomFloor = savedFloorStates[0] || {};
              savedFloorStates.unshift(JSON.parse(JSON.stringify(bottomFloor))); 
              uiRows.value = currentRows + 1;
              updateVal('rowsVal', uiRows.value);
              initFloorControls(false); 
              updateAndGenerate(); 
          }
      });
      document.getElementById('btnRemoveFloorTop')?.addEventListener('click', () => {
          let currentRows = parseInt(uiRows.value);
          if (currentRows > parseInt(uiRows.min)) { 
              initFloorControls(true); 
              savedFloorStates.pop();  
              uiRows.value = currentRows - 1;
              updateVal('rowsVal', uiRows.value);
              initFloorControls(false); 
              updateAndGenerate(); 
          }
      });
      document.getElementById('btnRemoveFloorBottom')?.addEventListener('click', () => {
          let currentRows = parseInt(uiRows.value);
          if (currentRows > parseInt(uiRows.min)) { 
              initFloorControls(true); 
              savedFloorStates.shift(); 
              uiRows.value = currentRows - 1;
              updateVal('rowsVal', uiRows.value);
              initFloorControls(false); 
              updateAndGenerate(); 
          }
      });
      const inputElements = ['paramSideDormerX', 'paramRows', 'paramCols', 'paramThick', 'paramSockelH', 'paramDoorPos', 'paramDormerW', 'paramDormerH', 'paramDormerPitch', 'paramDormerSteps', 'paramDormerStepHeight', 'paramDormerTiers', 'paramDormerArchCount', 'paramWindowD', 'paramWinRandom', 'paramWinSprossenThick', 'paramWinPatternScale', 'paramWarp', 'paramGlobalDecor', 'paramDecorScheme', 'paramAsym', 'paramTurretW', 'paramRoofOverhang', 'paramCorniceHeight', 'paramSideDormerCount'];
      inputElements.forEach(id => {
          document.getElementById(id)?.addEventListener('input', (e) => {
              if(id === 'paramRows') updateVal('rowsVal', e.target.value);
              if(id === 'paramCols') updateVal('colsVal', e.target.value);
              if(id === 'paramThick') updateVal('thickVal', e.target.value);
              if(id === 'paramSockelH') updateVal('sockelHVal', e.target.value);
              if(id === 'paramDoorPos') updateVal('doorPosVal', e.target.value);
              if(id === 'paramDormerW') updateVal('dormerWVal', e.target.value);
              if(id === 'paramDormerH') updateVal('dormerHVal', parseFloat(e.target.value).toFixed(2), 'x');
              if(id === 'paramDormerPitch') updateVal('dormerPitchVal', parseFloat(e.target.value).toFixed(1));
              if(id === 'paramDormerTiers') updateVal('dormerTiersVal', e.target.value);
              if(id === 'paramDormerArchCount') updateVal('dormerArchVal', e.target.value);
              if(id === 'paramDormerSteps') updateVal('dormerStepsVal', e.target.value);
              if(id === 'paramDormerStepHeight') updateVal('dormerStepHVal', parseFloat(e.target.value).toFixed(2));
              if(id === 'paramWindowD') updateVal('windowDVal', e.target.value, '%');
              if(id === 'paramWinRandom') updateVal('winRandomVal', e.target.value, '%');
              if(id === 'paramWinSprossenThick') updateVal('winSprossenThickVal', e.target.value, '%');
              if(id === 'paramWinPatternScale') updateVal('winPatternScaleVal', e.target.value, '%');
              if(id === 'paramWarp') updateVal('warpVal', e.target.value);
              if(id === 'paramGlobalDecor') updateVal('decorGlobalVal', e.target.value, '%');
              if(id === 'paramAsym') updateVal('asymVal', e.target.value);
              if(id === 'paramTurretW') updateVal('turretWVal', parseFloat(e.target.value).toFixed(1), 'x');
              if(id === 'paramRoofOverhang') updateVal('roofOverVal', e.target.value);
              if(id === 'paramCorniceHeight') updateVal('corniceHVal', e.target.value); if(id === 'paramSideDormerCount') updateVal('sideDormerCountVal', e.target.value); if(id === 'paramSideDormerX') updateVal('sideDormerXVal', e.target.value);
              if (id === 'paramRows') initFloorControls(true);
              updateAndGenerate();
          });
      });
      const updateDormerArchVisibility = () => {
              const style = document.getElementById('paramDormerStyle')?.value;
              const gable = document.getElementById('paramDormerGable')?.value;
              const archC = document.getElementById('dormerArchCont');
              if(archC) {
                  if(style === 'stein_bogen' || gable === 'stein_bogen') archC.classList.remove('hidden');
                  else archC.classList.add('hidden');
              }
          };
          document.getElementById('paramDormerStyle')?.addEventListener('change', updateDormerArchVisibility);
          document.getElementById('paramDormerGable')?.addEventListener('change', updateDormerArchVisibility);
      const changeElements = ['paramSockel', 'paramEgCorners', 'paramEgCornersSide', 'paramGable', 'paramCornice', 'paramSideDormerStyle', 'toggleDormer', 'paramDormerShape', 'paramDormerWin', 'paramDormerStyle', 'paramDormerGable', 'paramDormerArchType', 'paramTurretStyle', 'paramTurretRoofStyle', 'paramDoorType', 'paramDoorFrame', 'paramWinFrame', 'paramWinStyle', 'paramWinSprossen', 'paramWinGlass', 'paramSockelStyle', 'paramSockelQuader', 'paramRuine'];
      changeElements.push('paramWinShutters', 'paramWinShutterColor');
      changeElements.forEach(id => { document.getElementById(id)?.addEventListener('change', updateAndGenerate); });
      document.getElementById('paramWinShutterColor')?.addEventListener('input', updateAndGenerate);
      document.getElementById('floorControlsContainer').addEventListener('click', (e) => {
          const btn = e.target.closest('.btn-delete-floor');
          if (!btn) return; 
          let idx = parseInt(btn.getAttribute('data-delete-idx'));
          let name = idx === 0 ? "das Erdgeschoss" : `das ${idx}. OG`;
          if (confirm(`Möchtest du ${name} wirklich löschen?`)) {
              initFloorControls(true); 
              savedFloorStates.splice(idx, 1); 
              uiRows.value = parseInt(uiRows.value) - 1; 
              updateVal('rowsVal', uiRows.value);
              initFloorControls(false); 
              updateAndGenerate(); 
          }
      });
      let draggedFloorIdx = null;
      const fContainer = document.getElementById('floorControlsContainer');
      fContainer.addEventListener('pointerdown', (e) => {
          if (e.target.closest('.drag-handle')) {
              const fc = e.target.closest('.floor-config');
              if (fc) fc.setAttribute('draggable', 'true');
          }
      });
      fContainer.addEventListener('pointerup', (e) => {
          const fc = e.target.closest('.floor-config');
          if (fc) fc.removeAttribute('draggable');
      });
      fContainer.addEventListener('dragstart', (e) => {
          const fc = e.target.closest('.floor-config');
          if (!fc) return;
          draggedFloorIdx = parseInt(fc.getAttribute('data-index'));
          e.dataTransfer.effectAllowed = 'move';
          setTimeout(() => fc.classList.add('opacity-40', 'border-dashed'), 0);
      });
      fContainer.addEventListener('dragover', (e) => {
          e.preventDefault(); 
          const fc = e.target.closest('.floor-config');
          if (fc && parseInt(fc.getAttribute('data-index')) !== draggedFloorIdx) {
              fc.classList.add('border-emerald-500', 'bg-emerald-50');
              fc.classList.remove('border-slate-200');
          }
      });
      fContainer.addEventListener('dragleave', (e) => {
          const fc = e.target.closest('.floor-config');
          if (fc) {
              fc.classList.remove('border-emerald-500', 'bg-emerald-50');
              fc.classList.add('border-slate-200');
          }
      });
      fContainer.addEventListener('drop', (e) => {
          e.preventDefault();
          const fc = e.target.closest('.floor-config');
          fContainer.querySelectorAll('.floor-config').forEach(el => {
              el.classList.remove('opacity-40', 'border-dashed', 'border-emerald-500', 'bg-emerald-50');
              el.classList.add('border-slate-200');
          });
          if (!fc || draggedFloorIdx === null) return;
          let targetIdx = parseInt(fc.getAttribute('data-index'));
          if (draggedFloorIdx === targetIdx) return;
          initFloorControls(true); 
          const movedFloor = savedFloorStates.splice(draggedFloorIdx, 1)[0];
          savedFloorStates.splice(targetIdx, 0, movedFloor); 
          initFloorControls(false); 
          updateAndGenerate(); 
          draggedFloorIdx = null;
          if (e.target.closest('.floor-config')) e.target.closest('.floor-config').removeAttribute('draggable');
      });
      fContainer.addEventListener('dragend', (e) => {
          fContainer.querySelectorAll('.floor-config').forEach(el => {
              el.classList.remove('opacity-40', 'border-dashed', 'border-emerald-500', 'bg-emerald-50');
              el.classList.add('border-slate-200');
          });
          draggedFloorIdx = null;
          if (e.target.closest('.floor-config')) e.target.closest('.floor-config').removeAttribute('draggable');
      });
      function randomizeAll() {
          const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
          const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
          const coin = (p = 0.5) => Math.random() < p;
          const fire = (id, val, type='input') => {
              const el = document.getElementById(id); 
              if(!el) return; 
              if(el.type === 'checkbox') el.checked = val; else el.value = val;
              el.dispatchEvent(new Event(type));
          };
          fire('colorPreset', pick(['default','yellow','green','red','teal','rose']));
          fire('paramCols', rng(5, 12));
          const rows = rng(1, 4); fire('paramRows', rows);
          fire('paramThick', rng(3, 7));
          const p1 = `#${rng(230,255).toString(16).padStart(2,'0')}${rng(220,250).toString(16).padStart(2,'0')}${rng(200,240).toString(16).padStart(2,'0')}`;
          const p2 = `#${rng(210,240).toString(16).padStart(2,'0')}${rng(190,220).toString(16).padStart(2,'0')}${rng(160,200).toString(16).padStart(2,'0')}`;
          fire('customPlaster', p1); fire('customPlaster2', p2);
          fire('customStone', pick(['#7e868c', '#57534e', '#bc6c25', '#4b5563']));
          fire('customTurretRoof', pick(['#334155', '#1c1917', '#450a0a']));
          fire('paramWinShutterColor', pick(['#5c4033', '#2f4f4f', '#7f1d1d', '#1e3a8a']));
          fire('customGable', coin() ? p1 : p2);
          fire('customDormer', p1); fire('customTurret', p1);
          fire('paramWindowD', rng(40, 95));
          fire('paramWinStyle', pick(['quadrat', 'rundbogen', 'flachbogen']), 'change');
          fire('paramWinGlass', pick(['hell', 'altglas', 'abend', 'dunkel']), 'change'); 
          fire('paramWinShutters', coin(0.3) ? pick(['z_beschlag', 'lamellen', 'brett']) : 'keine', 'change');
          fire('paramSockelQuader', pick(['none', 'rustikal']), 'change');
          fire('paramRuine', pick(['none', 'overlay']), 'change');
          fire('paramSockel', coin(0.6), 'change');
          if(document.getElementById('paramSockel').checked) {
              fire('paramSockelH', rng(20, 80));
              fire('paramSockelStyle', pick(['stein_gerade', 'stein_schraeg', 'holz_pfeiler']), 'change');
          }
          fire('paramDoorType', pick(['none', 'einzeltuer', 'doppeltor', 'rundbogen']), 'change');
          fire('paramDoorFrame', pick(['holz', 'stein']), 'change');
          fire('paramDoorPos', rng(1, 10)); 
          fire('paramEgCorners', pick(['gerade', 'geschwungen', 'abgeschraegt', 'pfeiler', 'verzahnt']), 'change');
          fire('paramEgCornersSide', pick(['both', 'left', 'right']), 'change');
          fire('paramTurretW', (0.8 + Math.random() * 1.0).toFixed(1));
          fire('paramTurretStyle', pick(['manbrust', 'skelett', 'massiv_putz', 'massiv_stein', 'massiv_ziegel']), 'change');
          fire('paramTurretRoofStyle', pick(['spitz', 'flach', 'krueppel', 'barock']), 'change');
          savedFloorStates = [];
          let oh = 0;
          for (let i = 0; i < rows; i++) {
              let isEG = (i === 0);
              oh = isEG ? 0 : Math.min(130, oh + rng(15, 45));
              savedFloorStates[i] = {
                  style: pick(['skelett', 'andreaskreuz', 'raute', 'manbrust', 'wilder_mann_echt', 'sternraute', 'k_streben']),
                  material: (isEG && coin(0.6)) ? 'stone' : 'plaster',
                  height: isEG ? 1.6 : 1.2,
                  overhang: oh,
                  decor: pick(['none', 'knaggen', 'konsolen', 'schiffskehle', 'stamm_5eck']),
                  decorFill: (oh > 20 && coin(0.8)) ? 'filled' : 'open',
                  decorH: rng(25, 55),
                  turret: (!isEG && coin(0.2)) ? pick(['left','right','both']) : 'none',
                  oriel: (!isEG && i < rows-1 && coin(0.1)) ? 'center' : 'none',
                  pentRoof: (!isEG && i === 1 && coin(0.25)) ? 'full' : 'none'
              };
          }
          fire('paramRoofOverhang', rng(40, 100));
          fire('paramCornice', pick(['none', 'knaggen', 'konsolen', 'schiffskehle', 'stamm_spitz']), 'change');
          fire('toggleDormer', coin(0.5), 'change');
          savedGableStates = Array.from({length: 5}, (_, idx) => ({
              shape: pick(['sattel', 'barock', 'mansard', 'stufe', 'krueppel', 'halbwalm']),
              style: pick(['fachwerk_classic', 'sternraute', 'y_kreuz', 'vertikal', 'kreuz']),
              mat: pick(['plaster', 'plaster1', 'plaster2', 'inherit_floor', 'brick', 'roof']),
              pitch: (idx === 4) ? (0.8 + Math.random() * 0.4).toFixed(1) : (1.1 + Math.random() * 0.6).toFixed(1),
              steps: 4, tiers: rng(1, 2), stepHeight: (idx === 4) ? 0.25 : 1.0
          }));
          applyColors(); 
          initFloorControls(false);
          initGableControls(false);
          fire('paramGlobalDecor', rng(0, 100));
          if(window.updateAndGenerate) updateAndGenerate();
      }
      document.getElementById('btnRandomize').onclick = randomizeAll;
      let allowReload = false;
      window.addEventListener('beforeunload', function (e) {
          if (!allowReload) {
              e.preventDefault();
              e.returnValue = ''; 
          }
      });
      document.addEventListener('keydown', function (e) {
          const isReload = (e.key === 'F5') || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r');
          if (!isReload) return;
          e.preventDefault();
          if (confirm("Achtung: Beim Neuladen wird dein aktuelles Fachwerkhaus restlos gelöscht.\n\nHast du deinen Entwurf als JSON exportiert?\n\nTrotzdem neu laden?")) {
              allowReload = true; 
              location.reload();
          }
      });
  const BASE_HOUSE_CONFIG = {
    "version": "0.6.4.7",
    "rows": "2",
    "cols": "4",
    "thick": "6",
    "sockel": true,
    "sockelH": "40",
    "sockelStyle": "stein_gerade",
    "sockelQuader": "none",
    "ruine": "none",
    "doorType": "einzeltuer",
    "doorFrame": "holz",
    "doorPos": "2",
    "egCorners": "gerade",
    "egCornersSide": "both",
    "winFrame": true,
    "hasGable": true,
    "gableCount": "1",
    "sideDormerCount": "0",
    "sideDormerStyle": "fledermaus",
    "sideDormerX": "10",
    "roofOverhang": "10",
    "cornice": "none",
    "corniceH": "45",
    "hasDormer": true,
    "dormShape": "halbwalm",
    "dormSteps": "5",
    "dormStepH": "0.95",
    "dormWin": true,
    "dormStyle": "skelett",
    "dormArchCount": "3",
    "dormArchType": "spitz",
    "dormGable": "leer",
    "dormerW": "1",
    "dormerH": "0.35",
    "dormPitch": "1.1",
    "dormTiers": "1",
    "winDens": "40",
    "winRandom": "0",
    "winSprossenThick": "40",
    "winPatternScale": "100",
    "winStyle": "quadrat",
    "winSprossen": "keine",
    "winGlass": "altglas",
    "winShutters": "keine",
    "winShutterColor": "#446c79",
    "globalDecor": "0",
    "decorScheme": "hist1",
    "warp": "0",
    "asym": "0",
    "turretW": "1.4",
    "turretStyle": "manbrust",
    "turretRoofStyle": "spitz",
    "timberPreset": "custom",
    "plasterColor": "#fdfbf7",
    "plasterColor2": "#eed4a4",
    "stoneColor": "#b0b2bf",
    "turretRoofColor": "#475569",
    "gableColor": "#fdfbf7",
    "turretColor": "#fdfbf7",
    "dormerColor": "#fdfbf7",
    "cam": {
      "zoom": 1.1,
      "panX": -67,
      "panY": -78
    },
    "floors": [
      {
        "style": "skelett",
        "material": "plaster",
        "height": "1.9",
        "overhang": 0,
        "decor": "none",
        "decorFill": "filled",
        "decorH": 30,
        "arches": "4",
        "archType": "rund",
        "turret": "none",
        "oriel": "none",
        "pentRoof": "none"
      },
      {
        "style": "skelett",
        "material": "plaster",
        "height": "1.7",
        "overhang": "12",
        "decor": "none",
        "decorFill": "filled",
        "decorH": "39",
        "arches": "4",
        "archType": "rund",
        "turret": "none",
        "oriel": "none",
        "pentRoof": "none"
      }
    ],
    "gables": [
      {
        "shape": "krueppel",
        "mat": "plaster",
        "style": "leer",
        "pitch": "1.2",
        "steps": "5",
        "stepHeight": "0.95",
        "tiers": "1"
      }
    ]
  };
      function loadState(data) {
          if (!data) return;
          const setVal = (id, val) => { 
              let el = document.getElementById(id); 
              if(!el) el = document.getElementById(id.replace('ui', 'param'));
              if(!el) el = document.getElementById(id.replace('param', 'ui'));
              if(el) { 
                  el.value = val; 
                  el.dispatchEvent(new Event('input')); 
                  el.dispatchEvent(new Event('change')); 
                  const out = document.getElementById(el.id + 'Out') || document.getElementById(el.id + 'Val') || document.getElementById(el.id + 'Display');
                  if(out) out.textContent = val;
              }
          };
          const setCheck = (id, val) => { 
              let el = document.getElementById(id); 
              if(!el) el = document.getElementById(id.replace('ui', 'param'));
              if(!el) el = document.getElementById(id.replace('param', 'ui'));
              if(el) { 
                  el.checked = val; 
                  el.dispatchEvent(new Event('change')); 
              }
          };
          setVal('paramRows', data.rows); setVal('paramCols', data.cols); setVal('paramThick', data.thick);
          setCheck('paramSockel', data.sockel); setVal('paramSockelH', data.sockelH); 
          setVal('paramSockelStyle', data.sockelStyle); setVal('paramSockelQuader', data.sockelQuader);
          setVal('paramRuine', data.ruine); setVal('paramDoorType', data.doorType); 
          setVal('paramDoorFrame', data.doorFrame); setVal('paramDoorPos', data.doorPos);
          setVal('paramEgCorners', data.egCorners); setVal('paramEgCornersSide', data.egCornersSide);
          setCheck('paramWinFrame', data.winFrame); setCheck('paramGable', data.hasGable);
          setVal('paramGableCount', data.gableCount); setVal('paramSideDormerCount', data.sideDormerCount);
          setVal('paramSideDormerStyle', data.sideDormerStyle); setVal('paramSideDormerX', data.sideDormerX);
          setVal('paramRoofOverhang', data.roofOverhang); setVal('paramCornice', data.cornice);
          setVal('paramCorniceHeight', data.corniceH); setCheck('toggleDormer', data.hasDormer);
          setVal('paramDormerShape', data.dormShape); setVal('paramDormerSteps', data.dormSteps);
          setVal('paramDormerStepHeight', data.dormStepH); setCheck('paramDormerWin', data.dormWin);
          setVal('paramDormerStyle', data.dormStyle); setVal('paramDormerArchCount', data.dormArchCount);
          setVal('paramDormerArchType', data.dormArchType); setVal('paramDormerGable', data.dormGable);
          setVal('paramDormerW', data.dormerW); setVal('paramDormerH', data.dormerH);
          setVal('paramDormerPitch', data.dormPitch); setVal('paramDormerTiers', data.dormTiers);
          setVal('paramWindowD', data.winDens); setVal('paramWinRandom', data.winRandom);
          setVal('paramWinSprossenThick', data.winSprossenThick); setVal('paramWinPatternScale', data.winPatternScale);
          setVal('paramWinStyle', data.winStyle); setVal('paramWinSprossen', data.winSprossen);
          setVal('paramWinGlass', data.winGlass); setVal('paramWinShutters', data.winShutters);
          setVal('paramWinShutterColor', data.winShutterColor); setVal('paramGlobalDecor', data.globalDecor || '0'); setVal('paramDecorScheme', data.decorScheme || 'hist1'); setVal('paramWarp', data.warp);
          setVal('paramAsym', data.asym); setVal('paramTurretW', data.turretW);
          setVal('paramTurretStyle', data.turretStyle); setVal('paramTurretRoofStyle', data.turretRoofStyle);
          setVal('colorPreset', data.timberPreset); setVal('customPlaster', data.plasterColor);
          setVal('customPlaster2', data.plasterColor2); setVal('customStone', data.stoneColor);
          setVal('customTurretRoof', data.turretRoofColor); setVal('customGable', data.gableColor);
          setVal('customTurret', data.turretColor); setVal('customDormer', data.dormerColor);
          if (data.cam) {
              try { camZoom = data.cam.zoom; camPanX = data.cam.panX; camPanY = data.cam.panY; } catch(e){}
          }
          savedFloorStates = JSON.parse(JSON.stringify(data.floors || []));
          savedGableStates = JSON.parse(JSON.stringify(data.gables || []));
          try { applyColors(); } catch(e){}
          try { initFloorControls(false); } catch(e){}
          try { initGableControls(false); } catch(e){}
          if (typeof updateAndGenerate === 'function') updateAndGenerate();
          if (typeof resizeCanvas === 'function') resizeCanvas();
          window.addEventListener('resize', resizeCanvas);
          const wrapper = document.getElementById('canvas-wrapper');
          if (wrapper) {
              new ResizeObserver(() => {
                  requestAnimationFrame(resizeCanvas);
              }).observe(wrapper);
          }
      }
      const startLegacyApp = () => { 
          populateStyles(); 
          setupResizer(); 
          setupCameraControls(); 
          loadState(BASE_HOUSE_CONFIG);
          if (typeof resizeCanvas === 'function') resizeCanvas();
          window.addEventListener('resize', resizeCanvas);
          const wrapper = document.getElementById('canvas-wrapper');
          if (wrapper) {
              new ResizeObserver(() => {
                  requestAnimationFrame(resizeCanvas);
              }).observe(wrapper);
          }
      };
      (window).loadState = loadState;
      (window).BASE_HOUSE_CONFIG = BASE_HOUSE_CONFIG;
      startLegacyApp();
}
