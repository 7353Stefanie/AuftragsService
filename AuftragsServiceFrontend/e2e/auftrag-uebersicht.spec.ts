import { test, expect } from '@playwright/test';

const MOCK_UEBERSICHT = [
  { auftragId: 1, dokumentenTyp: 'ERHALTEN',      erstelltAm: '2026-04-01T10:00:00', inhalt: 'Erster Auftrag'  },
  { auftragId: 2, dokumentenTyp: 'IN_BEARBEITUNG', erstelltAm: '2026-04-02T11:00:00', inhalt: 'Zweiter Auftrag' },
  { auftragId: 3, dokumentenTyp: 'BESTAETIGT',     erstelltAm: '2026-04-03T12:00:00', inhalt: 'Dritter Auftrag' },
];

test.describe('Auftrag Übersicht', () => {

  test.beforeEach(async ({ page }) => {
    await page.route('/api/auftraege/uebersicht', route =>
      route.fulfill({ json: MOCK_UEBERSICHT })
    );
    await page.goto('/');
    await page.getByRole('button', { name: /Übersicht/i }).click();
  });

  test('zeigt Tabelle mit Spaltenüberschriften', async ({ page }) => {
    await expect(page.getByText('Auftrags-ID')).toBeVisible();
    await expect(page.getByText('Dokumententyp')).toBeVisible();
    await expect(page.getByText('Erstellt am')).toBeVisible();
    await expect(page.getByText('Inhalt')).toBeVisible();
  });

  test('zeigt alle Aufträge aus der Übersicht', async ({ page }) => {
    await expect(page.getByText('Erster Auftrag')).toBeVisible();
    await expect(page.getByText('Zweiter Auftrag')).toBeVisible();
    await expect(page.getByText('Dritter Auftrag')).toBeVisible();
  });

  test('zeigt Status-Chips korrekt', async ({ page }) => {
    await expect(page.getByText('ERHALTEN').first()).toBeVisible();
    await expect(page.getByText('IN_BEARBEITUNG').first()).toBeVisible();
    await expect(page.getByText('BESTAETIGT').first()).toBeVisible();
  });

  test('Aktualisieren-Button lädt Daten neu', async ({ page }) => {
    await page.unroute('/api/auftraege/uebersicht');
    await page.route('/api/auftraege/uebersicht', route =>
      route.fulfill({ json: MOCK_UEBERSICHT })
    );

    const refreshBtn = page.locator('button.refresh-btn');
    const [response] = await Promise.all([
      page.waitForResponse('/api/auftraege/uebersicht'),
      refreshBtn.click(),
    ]);

    expect(response.status()).toBe(200);
    await expect(page.getByText('Erster Auftrag')).toBeVisible();
  });

  test('zeigt Hinweis wenn keine Aufträge vorhanden', async ({ page }) => {
    await page.unroute('/api/auftraege/uebersicht');
    await page.route('/api/auftraege/uebersicht', route =>
      route.fulfill({ json: [] })
    );

    const refreshBtn = page.locator('button.refresh-btn');
    await Promise.all([
      page.waitForResponse('/api/auftraege/uebersicht'),
      refreshBtn.click(),
    ]);

    await expect(page.getByText('Keine Aufträge vorhanden.')).toBeVisible();
  });
});
