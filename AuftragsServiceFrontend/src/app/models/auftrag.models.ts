export type AuftragsStatus =
  | 'ERHALTEN'
  | 'IN_BEARBEITUNG'
  | 'BESTAETIGT'
  | 'ABGELEHNT'
  | '';

/** POST /api/auftraege – Request-Body */
export interface AuftragErstellenAnfrage {
  kundenId:      number;
  dokumentenTyp: AuftragsStatus;
  inhalt:        string;
}

/** POST /api/auftraege – Response */
export interface AuftragErstellenResponse {
  id:            number;
  kundenId:      number;
  dokumentenTyp: AuftragsStatus;
  inhalt:        string;
}

/** GET /api/auftraege/{id} – Response */
export interface AuftragBerichtDTO {
  auftragId:     number;
  kundenId:      number;
  dokumentenTyp: AuftragsStatus;
  status:        AuftragsStatus;
  inhalt:        string;
  berichtId:     string;
  erstelltAm:    string;
}

/** GET /api/auftraege – Übersichtsliste */
export interface AuftragUebersichtDTO {
  auftragId:     number;
  dokumentenTyp: AuftragsStatus;
  erstelltAm:    string;
  inhalt:        string;
}
