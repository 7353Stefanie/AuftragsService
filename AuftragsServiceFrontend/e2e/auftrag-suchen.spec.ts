import { test, expect } from '@playwright/test';

test.describe('Auftrag suchen', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Auftrag suchen/i }).click();
  });

  test('zeigt Suchfeld und Suchen-Button', async ({ page }) => {
    await expect(page.getByLabel('Auftrags-ID')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Suchen', exact: true })).toBeVisible();
  });

  test('erlaubt nur Zahlen im Auftrags-ID Feld', async ({ page }) => {
    const input = page.getByLabel('Auftrags-ID');
    await input.fill('abc7def');
    await expect(input).toHaveValue('7');
  });

  test('zeigt Ergebnistabelle nach erfolgreicher Suche', async ({ page }) => {
    await page.route('/api/auftraege/7', route =>
      route.fulfill({
        json: {
          auftragId: 7,
          kundenId: 44,
          dokumentenTyp: 'ERHALTEN',
          inhalt: 'Kauf von Radioantenne',
          berichtId: '1f530a5f-af35-427b-88f0-7734a7b8a0d6',
          status: 'ERHALTEN',
          erstelltAm: '2026-04-15T08:44:48'
        }
      })
    );

    await page.getByLabel('Auftrags-ID').fill('7');
    await page.getByRole('button', { name: 'Suchen', exact: true }).click();

    await expect(page.getByText('7')).toBeVisible();
    await expect(page.getByText('44')).toBeVisible();
    await expect(page.getByText('Kauf von Radioantenne')).toBeVisible();
  });

  test('zeigt Fehlermeldung wenn Auftrag nicht gefunden', async ({ page }) => {
    await page.route('/api/auftraege/999', route =>
      route.fulfill({ status: 404, json: {} })
    );

    await page.getByLabel('Auftrags-ID').fill('999');
    await page.getByRole('button', { name: 'Suchen', exact: true }).click();

    await expect(page.getByText('Auftrags-ID konnte nicht gefunden werden.')).toBeVisible();
  });
});
