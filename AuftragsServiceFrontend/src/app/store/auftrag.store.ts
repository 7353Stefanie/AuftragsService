import { inject, computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import {
  AuftragBerichtDTO,
  AuftragErstellenAnfrageDTO,
  AuftragErstellenResponseDTO,
  AuftragUebersichtDTO,
} from '../models/auftrag.models';
import { AuftragService } from '../services/auftrag.service';

export interface AuftragState {
  uebersicht:     AuftragUebersichtDTO[];
  auftragBericht: AuftragBerichtDTO | null;
  letzterAuftrag: AuftragErstellenResponseDTO | null;
  loading:        boolean;
  error:          string | null;
}

const initialState: AuftragState = {
  uebersicht:     [],
  auftragBericht: null,
  letzterAuftrag: null,
  loading:        false,
  error:          null,
};

export const AuftragStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ uebersicht, auftragBericht }) => ({
    anzahlAuftraege: computed(() => uebersicht().length),
    hatErgebnis:     computed(() => auftragBericht() !== null),
  })),

  withMethods((store, service = inject(AuftragService)) => ({

    /** GET /api/auftraege */
    ladeAlle: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          service.ladeAlle().pipe(
            tap(uebersicht => patchState(store, { uebersicht, loading: false })),
            catchError(err => {
              patchState(store, { error: err.message ?? 'Fehler beim Laden', loading: false });
              return EMPTY;
            })
          )
        )
      )
    ),

    /** GET /api/auftraege/{id} */
    sucheNachAuftragsId: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null, auftragBericht: null })),
        switchMap(id =>
          service.sucheNachAuftragsId(id).pipe(
            tap(auftragBericht => patchState(store, { auftragBericht, loading: false })),
            catchError(err => {
              patchState(store, { error: err.message ?? 'Auftrag nicht gefunden', loading: false });
              return EMPTY;
            })
          )
        )
      )
    ),

    /** POST /api/auftraege */
    erfasseAuftrag: rxMethod<AuftragErstellenAnfrageDTO>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null, letzterAuftrag: null })),
        switchMap(anfrage =>
          service.erfasseAuftrag(anfrage).pipe(
            tap(letzterAuftrag => patchState(store, { letzterAuftrag, loading: false })),
            catchError(err => {
              patchState(store, { error: err.message ?? 'Fehler bei der Erfassung', loading: false });
              return EMPTY;
            })
          )
        )
      )
    ),

  }))
);
