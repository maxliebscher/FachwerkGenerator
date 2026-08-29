import { expect, test } from '@playwright/test';

const desktopViewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 800 }
] as const;

for (const viewport of desktopViewports) {
  test(`header uses its intentional layout at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto('/en/');

    const geometry = await page.evaluate(() => {
      const elements = [
        document.querySelector('header > div:first-child'),
        document.querySelector('#camZoomSlider')?.parentElement,
        document.querySelector('#colorPreset')?.parentElement,
        document.querySelector('#btnExportImg')?.parentElement
      ];
      const rects = elements.map((element) => element?.getBoundingClientRect());
      const header = document.querySelector('header')?.getBoundingClientRect();
      return {
        centers: rects.map((rect) => rect ? rect.top + rect.height / 2 : -1),
        bounds: rects.map((rect) => rect ? { left: rect.left, right: rect.right, width: rect.width } : null),
        headerHeight: header?.height ?? 0,
        pageWidth: document.documentElement.scrollWidth
      };
    });

    await page.screenshot({
      path: testInfo.outputPath(`header-${viewport.width}.png`),
      fullPage: false
    });

    await expect(page.locator('.header-brand-chip')).toContainText("Max Liebscher's FassadenSchmied: Timber-Frame Generator v0.8");
    await expect(page.locator('header')).not.toContainText('Long live the timber');
    await expect(page.locator('.header-palette-label')).toHaveCount(7);
    await expect.poll(() => page.locator('.header-palette-label').evaluateAll((elements) => elements.every((element) => element.getBoundingClientRect().width > 0))).toBeTruthy();
    if (viewport.width >= 1800) {
      expect(Math.max(...geometry.centers) - Math.min(...geometry.centers)).toBeLessThanOrEqual(8);
      expect(geometry.headerHeight).toBeLessThanOrEqual(80);
    } else {
      expect(Math.max(geometry.centers[0], geometry.centers[1], geometry.centers[3]) - Math.min(geometry.centers[0], geometry.centers[1], geometry.centers[3])).toBeLessThanOrEqual(8);
      expect(geometry.centers[2]).toBeGreaterThan(geometry.centers[0] + 20);
      expect(geometry.headerHeight).toBeLessThanOrEqual(120);
    }
    expect(geometry.pageWidth).toBeLessThanOrEqual(viewport.width);
    for (const bounds of geometry.bounds) {
      expect(bounds).not.toBeNull();
      expect(bounds!.width).toBeGreaterThan(0);
      expect(bounds!.left).toBeGreaterThanOrEqual(0);
      expect(bounds!.right).toBeLessThanOrEqual(viewport.width);
    }
    await expect.poll(() => page.locator('.header-palette').evaluate((element) => {
      const palette = element.getBoundingClientRect();
      const roofColour = element.querySelector('#customTurretRoof')?.getBoundingClientRect();
      return Boolean(roofColour && roofColour.left >= palette.left && roofColour.right <= palette.right + 1);
    })).toBeTruthy();

  });
}
