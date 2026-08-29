import { expect, test } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';

test('v0.8 renders and supports the main generator workflow', async ({ page }, testInfo) => {
  const consoleMessages: string[] = [];
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });

  await page.goto('/');
  await expect(page).toHaveTitle(/v0\.8/);
  await expect(page.locator('.header-brand-chip')).toContainText(/(?:Fachwerk-|Timber-Frame )Generator v0\.8/);
  await expect(page.locator('header')).not.toContainText('Long live the timber');
  await expect(page.locator('#fachwerkCanvas')).toBeVisible();
  await expect(page.locator('#paramRows')).toHaveValue('2');

  await expect.poll(() => canvasHasVisiblePixels(page), { timeout: 10_000 }).toBeTruthy();

  await expect(page.locator('#paramCornice option')).not.toContainText(['Neidköpfe']);
  await expect(page.locator('#floorDecor-1 option')).not.toContainText(['Neidköpfe']);
  await page.locator('#paramCornice').selectOption('schiffskehle');
  await expect(page.locator('#paramCornice')).toHaveValue('schiffskehle');
  await page.locator('#floorDecor-1').selectOption('schiffskehle');
  await expect(page.locator('#floorDecor-1')).toHaveValue('schiffskehle');

  const legacyImportPath = testInfo.outputPath('legacy-disabled-neidkoepfe.json');
  await writeFile(
    legacyImportPath,
    JSON.stringify({
      rows: '2',
      cols: '4',
      thick: '6',
      cornice: 'neidkoepfe',
      floors: [
        { style: 'skelett', material: 'plaster', height: '1.9', overhang: '0', decor: 'none', arches: '4' },
        { style: 'skelett', material: 'plaster', height: '1.7', overhang: '12', decor: 'neidkoepfe', arches: '4' }
      ],
      gables: []
    }),
    'utf8'
  );
  await page.locator('#btnImport').setInputFiles(legacyImportPath);
  await expect(page.locator('#paramCornice')).toHaveValue('none');
  await expect(page.locator('#floorDecor-1')).toHaveValue('none');

  await page.locator('#paramRows').fill('5');
  await expect(page.locator('#rowsVal')).toHaveText('5');
  await expect(page.locator('.floor-config:not(.gable-config)')).toHaveCount(5);

  await page.locator('#btnAddFloorTop').click();
  await expect(page.locator('#paramRows')).toHaveValue('6');
  await page.locator('#btnRemoveFloorBottom').click();
  await expect(page.locator('#paramRows')).toHaveValue('5');

  await page.locator('#paramCols').fill('12');
  await page.locator('#paramThick').fill('10');
  await page.locator('#paramWarp').fill('20');
  await page.locator('#paramGableCount').fill('2');
  await expect(page.locator('.gable-config')).toHaveCount(2);

  await page.locator('#paramDormerShape').selectOption('mansard');
  await page.locator('#paramTurretStyle').selectOption('massiv_stein');
  await page.locator('#colorPreset').selectOption('red');
  await page.locator('#camZoomSlider').fill('1.5');
  await page.locator('#camPanXSlider').fill('50');
  await page.locator('#camPanYSlider').fill('-25');
  await page.locator('#btnResetCam').click();
  await expect(page.locator('#camZoomSlider')).toHaveValue('1');
  await expect(page.locator('#camPanXSlider')).toHaveValue('0');
  await expect(page.locator('#camPanYSlider')).toHaveValue('0');

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#btnExport').click();
  const download = await downloadPromise;
  const exportPath = testInfo.outputPath('fachwerk-export.json');
  await download.saveAs(exportPath);

  const exported = JSON.parse(await readFile(exportPath, 'utf8'));
  expect(exported.version).toBe('0.8.0');
  expect(exported.rows).toBe('5');
  expect(exported.cols).toBe('12');
  expect(exported.thick).toBe('10');
  expect(exported.globalDecor).toBeDefined();
  expect(Array.isArray(exported.floors)).toBe(true);
  expect(Array.isArray(exported.gables)).toBe(true);

  await page.locator('#paramRows').fill('3');
  await page.locator('#btnImport').setInputFiles(exportPath);
  await expect(page.locator('#paramRows')).toHaveValue('5');
  await expect(page.locator('#paramCols')).toHaveValue('12');

  const pngDownloadPromise = page.waitForEvent('download');
  await page.locator('#btnExportImg').click();
  const pngDownload = await pngDownloadPromise;
  const pngPath = testInfo.outputPath('fachwerk-export.png');
  await pngDownload.saveAs(pngPath);
  const pngBytes = await readFile(pngPath);
  expect(Array.from(pngBytes.subarray(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect(pngBytes.length).toBeGreaterThan(1_000);

  await expect.poll(() => canvasHasVisiblePixels(page), { timeout: 10_000 }).toBeTruthy();
  expect(consoleMessages.filter((entry) =>
    !entry.includes('cdn.tailwindcss.com') &&
    !entry.includes('willReadFrequently')
  )).toEqual([]);
});

async function canvasHasVisiblePixels(page: import('@playwright/test').Page): Promise<boolean> {
  return page.locator('#fachwerkCanvas').evaluate((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width === 0 || canvas.height === 0) return false;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0 && (data[i] !== 241 || data[i + 1] !== 245 || data[i + 2] !== 249)) {
        return true;
      }
    }
    return false;
  });
}
