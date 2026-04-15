import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuftragFormComponent } from './auftrag-form/auftrag-form.component';
import { AuftragSuchen } from './auftrag-suchen/auftrag-suchen';
import { AuftragsNavigation, AnsichtTyp } from './auftrags-navigation/auftrags-navigation';
import { AuftragUebersicht } from './auftrag-uebersicht/auftrag-uebersicht';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    AuftragFormComponent,
    AuftragSuchen,
    AuftragsNavigation,
    AuftragUebersicht
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly aktiveAnsicht = signal<AnsichtTyp>('erfassen');

  ansichtWechseln(ansicht: AnsichtTyp): void {
    this.aktiveAnsicht.set(ansicht);
  }
}
