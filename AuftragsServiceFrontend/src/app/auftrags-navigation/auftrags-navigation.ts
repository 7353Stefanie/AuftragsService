import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type AnsichtTyp = 'erfassen' | 'suchen' | 'uebersicht';

@Component({
  selector: 'app-auftrags-navigation',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './auftrags-navigation.html',
  styleUrl: './auftrags-navigation.css',
})
export class AuftragsNavigation {
  @Input()  aktiv: AnsichtTyp = 'erfassen';
  @Output() ansichtWechseln = new EventEmitter<AnsichtTyp>();

  wechseln(ansicht: AnsichtTyp): void {
    this.ansichtWechseln.emit(ansicht);
  }
}
