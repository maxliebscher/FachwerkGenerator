import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('v0.7 refactor renders and supports the main generator workflow', async ({ page }, testInfo) => {
  const consoleMessages: string[] = [];
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });

  await page.goto('/');
  await expect(page).toHaveTitle(/v0\.7_refactor/);
  await expect(page.locator('#fachwerkCanvas')).toBeVisible();
  await expect(page.locator('#paramRows')).toHaveValue('2');

  await expect.poll(() => canvasHasVisiblePixels(page), { timeout: 10_000 }).toBeTruthy();

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
