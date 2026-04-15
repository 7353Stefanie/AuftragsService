import { Component, input, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type FehlerFeld = 'kundenId' | 'dokumentenTyp' | 'inhalt' | 'auftragsId';

const FEHLER_TEXTE: Record<FehlerFeld, string> = {
  kundenId:     'Bitte gebe eine Kunden-ID an.',
  dokumentenTyp:'Bitte einen Dokumententyp auswählen.',
  inhalt:       'Inhalt darf nicht leer sein.',
  auftragsId:   'Bitte gebe eine Auftrags-ID an.',
};

@Component({
  selector: 'app-fehler-nachricht',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './fehler-nachricht.html',
  styleUrl: './fehler-nachricht.css',
})
export class FehlerNachricht {
  readonly feld      = input<FehlerFeld | null>(null);
  readonly zeigen    = input<boolean>(false);
  readonly nachricht = input<string>('');

  protected readonly text = computed(() => {
    if (!this.zeigen()) return '';
    if (this.nachricht()) return this.nachricht();
    const f = this.feld();
    return f ? (FEHLER_TEXTE[f] ?? '') : '';
  });
}
