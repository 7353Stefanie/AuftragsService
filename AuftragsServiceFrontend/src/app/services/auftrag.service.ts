import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuftragErstellenAnfrageDTO,
  AuftragErstellenResponseDTO,
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
  erfasseAuftrag(anfrage: AuftragErstellenAnfrageDTO): Observable<AuftragErstellenResponseDTO> {
    return this.http.post<AuftragErstellenResponseDTO>(`${this.baseUrl}`, anfrage);
  }
}
