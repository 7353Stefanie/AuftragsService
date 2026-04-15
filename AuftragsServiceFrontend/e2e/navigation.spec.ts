import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('zeigt standardmäßig "Auftrag erfassen"', async ({ page }) => {
    await expect(page.getByText('Auftrag erfassen')).toBeVisible();
    await expect(page.locator('mat-card-title', { hasText: 'Auftrag erfassen' })).toBeVisible();
  });

  test('wechselt zu "Auftrag suchen" beim Klick', async ({ page }) => {
    await page.getByRole('button', { name: /Auftrag suchen/i }).click();
    await expect(page.locator('mat-card-title', { hasText: 'Auftrag suchen' })).toBeVisible();
    await expect(page.locator('mat-card-title', { hasText: 'Auftrag erfassen' })).not.toBeVisible();
  });

  test('wechselt zu "Übersicht der Aufträge" beim Klick', async ({ page }) => {
    await page.route('/api/auftraege/uebersicht', route =>
      route.fulfill({ json: [] })
    );
    await page.getByRole('button', { name: /Übersicht/i }).click();
    await expect(page.locator('mat-card-title', { hasText: 'Übersicht der Aufträge' })).toBeVisible();
  });

  test('markiert den aktiven Navigations-Button', async ({ page }) => {
    const suchenBtn = page.getByRole('button', { name: /Auftrag suchen/i });
    await suchenBtn.click();
    await expect(suchenBtn).toHaveClass(/aktiv/);
  });
});
