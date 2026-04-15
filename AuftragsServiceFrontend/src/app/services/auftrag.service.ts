import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuftragErstellenAnfrage,
  AuftragErstellenResponse,
  AuftragBerichtDTO,
  AuftragUebersichtDTO,
} from '../models/auftrag.models';

@Injectable({ providedIn: 'root' })
export class AuftragService {
  private readonly http    = inject(HttpClient);
  private readonly baseUrl = '/api/auftraege';

  /** GET /api/auftraege/uebersicht*/
  ladeAlle(): Observable<AuftragUebersichtDTO[]> {
    return this.http.get<AuftragUebersichtDTO[]>(`${this.baseUrl}/uebersicht`);
  }

  /** GET /api/auftraege/{id} */
  sucheNachAuftragsId(id: number): Observable<AuftragBerichtDTO> {
    return this.http.get<AuftragBerichtDTO>(`${this.baseUrl}/${id}`);
  }

  /** POST /api/auftraege/uebersicht */
  erfasseAuftrag(anfrage: AuftragErstellenAnfrage): Observable<AuftragErstellenResponse> {
    return this.http.post<AuftragErstellenResponse>(`${this.baseUrl}`, anfrage);
  }
}
