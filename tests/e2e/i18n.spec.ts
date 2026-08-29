import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('English entry point, language switching and dynamic controls preserve state', async ({ page }, testInfo) => {
  const consoleMessages: string[] = [];
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });

  await page.goto('/en/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/Timber-Frame Generator/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /timber-frame facades/i);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://fachwerkgenerator.de/en/');
  await expect(page.locator('[data-language="en"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#languageSwitcher')).toHaveAttribute('aria-label', 'Language');
  await expect(page.locator('#paramCornice option')).not.toContainText(['Neidköpfe']);

  await page.locator('#paramCornice').selectOption('schiffskehle');
  await expect(page.locator('#paramCornice')).toHaveValue('schiffskehle');
  await expect(page.locator('#paramCornice option:checked')).toHaveText('Schiffskehle (carved cove)');

  await page.locator('#btnAddFloorTop').click();
  await expect(page.locator('#paramRows')).toHaveValue('3');
  await expect(page.locator('.floor-config:not(.gable-config)')).toContainText(['Upper storey 2']);
  expect(await page.locator('body').innerText()).not.toMatch(
    /\b(?:Geschosse|Gefache|Balken-Dicke|Giebel erzeugen|Fensterläden|Dächer generieren|Überstand|Trauf-Höhe|Zufall-Größe)\b/i
  );

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#btnExport').click();
  const download = await downloadPromise;
  const exportPath = testInfo.outputPath('english-state-export.json');
  await download.saveAs(exportPath);
  const exported = JSON.parse(await readFile(exportPath, 'utf8'));
  expect(exported.rows).toBe('3');
  expect(exported.cornice).toBe('schiffskehle');
  expect(JSON.stringify(exported)).not.toContain('Schiffskehle (carved cove)');

  await page.locator('#btnOpenInfo').click();
  await expect(page.locator('#infoModal')).toBeVisible();
  await expect(page.locator('#infoModal')).toHaveAttribute('role', 'dialog');
  await expect(page.locator('#infoModal')).toHaveAttribute('aria-modal', 'true');
  await expect(page.locator('#btnCloseInfo')).toHaveAttribute('aria-label', 'Close project information');
  await expect(page.locator('#btnCloseInfo')).toBeFocused();
  await expect(page.locator('#btnOpenInfo')).toHaveAttribute('title', 'Project information');
  await expect(page.locator('#infoModalContent')).toContainText('Provider information / legal notice:');
  await expect(page.locator('#infoModalContent')).toContainText('through GitHub Issues and include reproduction steps.');
  await page.waitForTimeout(350);
  await page.screenshot({ path: testInfo.outputPath('english-desktop-modal.png'), fullPage: true });
  await page.locator('#infoModalContent a').last().focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#infoModalContent a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#infoModal')).toBeHidden();
  await expect(page.locator('#btnOpenInfo')).toBeFocused();

  await page.locator('[data-language="de"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:\d+\/$/);
  await expect(page).toHaveTitle(/Fachwerk-Generator v0\.8/);
  await expect(page.locator('.header-brand-chip')).toContainText("Max Liebschers' FassadenSchmied: Fachwerk-Generator v0.8");
  await expect(page.getByText('Geschosse', { exact: true })).toBeVisible();
  await expect(page.locator('#paramCornice')).toHaveValue('schiffskehle');
  await expect(page.locator('#paramCornice option:checked')).toHaveText('Schiffskehle');
  await expect(page.locator('.floor-config:not(.gable-config)')).toContainText(['2. OG']);
  await page.screenshot({ path: testInfo.outputPath('german-desktop-restored.png'), fullPage: true });

  await page.locator('[data-language="en"]').click();
  await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:\d+\/en\/$/);
  await expect(page.locator('#paramCornice')).toHaveValue('schiffskehle');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('[data-language="en"]')).toHaveAttribute('aria-pressed', 'true');

  expect(relevantConsoleMessages(consoleMessages)).toEqual([]);
});

test('language switch remains discoverable and non-overlapping on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:\d+\/en\/$/);

  const switcher = page.locator('#languageSwitcher');
  await expect(switcher).toBeVisible();
  await expect(page.locator('[data-language="de"]')).toBeVisible();
  await expect(page.locator('[data-language="en"]')).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();

  const overlapsHeaderText = await page.evaluate(() => {
    const switcherRect = document.querySelector('#languageSwitcher')?.getBoundingClientRect();
    const titleRect = document.querySelector('header h1')?.getBoundingClientRect();
    if (!switcherRect || !titleRect) return true;
    return !(
      switcherRect.right <= titleRect.left ||
      switcherRect.left >= titleRect.right ||
      switcherRect.bottom <= titleRect.top ||
      switcherRect.top >= titleRect.bottom
    );
  });
  expect(overlapsHeaderText).toBe(false);
  await page.screenshot({ path: testInfo.outputPath('english-mobile-switcher.png'), fullPage: true });
});

function relevantConsoleMessages(messages: readonly string[]): string[] {
  return messages.filter((entry) =>
    !entry.includes('cdn.tailwindcss.com') &&
    !entry.includes('willReadFrequently')
  );
}
