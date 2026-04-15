import { test, expect } from '@playwright/test';

test.describe('Auftrag erfassen', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('zeigt alle Pflichtfelder', async ({ page }) => {
    await expect(page.getByLabel('Kunden-ID')).toBeVisible();
    await expect(page.getByLabel('Dokumententyp')).toBeVisible();
    await expect(page.getByLabel('Inhalt')).toBeVisible();
    await expect(page.getByRole('button', { name: /Absenden/i })).toBeVisible();
  });

  test('zeigt Fehlermeldung wenn Kunden-ID fehlt', async ({ page }) => {
    await page.getByRole('button', { name: /Absenden/i }).click();
    await expect(page.getByText('Bitte gebe eine Kunden-ID an.')).toBeVisible();
  });

  test('zeigt Fehlermeldung wenn Dokumententyp fehlt', async ({ page }) => {
    await page.getByRole('button', { name: /Absenden/i }).click();
    await expect(page.getByText('Bitte einen Dokumententyp auswählen.')).toBeVisible();
  });

  test('zeigt Fehlermeldung wenn Inhalt fehlt', async ({ page }) => {
    await page.getByRole('button', { name: /Absenden/i }).click();
    await expect(page.getByText('Inhalt darf nicht leer sein.')).toBeVisible();
  });

  test('erlaubt nur Zahlen im Kunden-ID Feld', async ({ page }) => {
    const input = page.getByLabel('Kunden-ID');
    await input.fill('abc123def');
    await expect(input).toHaveValue('123');
  });

  test('sendet Auftrag erfolgreich ab', async ({ page }) => {
    await page.route('/api/auftraege', route =>
      route.fulfill({
        status: 201,
        json: {
          berichtId: 'abc-123',
          status: 'ERHALTEN',
          auftrag: { id: 1, kundenId: 42, dokumentenTyp: 'ERHALTEN', inhalt: 'Testauftrag' }
        }
      })
    );

    await page.getByLabel('Kunden-ID').fill('42');

    await page.getByLabel('Dokumententyp').click();
    await page.getByRole('option', { name: 'ERHALTEN' }).click();

    await page.getByLabel('Inhalt').fill('Testauftrag');

    await page.getByRole('button', { name: /Absenden/i }).click();

    await expect(page.getByText('Erfolgreich übermittelt!')).toBeVisible();
  });
});
