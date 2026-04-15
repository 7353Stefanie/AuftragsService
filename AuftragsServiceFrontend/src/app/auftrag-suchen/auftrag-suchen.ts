import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuftragStore } from '../store/auftrag.store';

@Component({
  selector: 'app-auftrag-suchen',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe,
  ],
  templateUrl: './auftrag-suchen.html',
  styleUrl: './auftrag-suchen.css',
})
export class AuftragSuchen {
  readonly store     = inject(AuftragStore);
  readonly auftragsId = signal<string>('');
  readonly gesucht    = signal(false);

  onAuftragsIdInput(event: Event): void {
    const input  = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    input.value  = digits;
    this.auftragsId.set(digits);
  }

  onSuchen(): void {
    const auftragsId = parseInt(this.auftragsId(), 10);
    if (isNaN(auftragsId)) return;
    this.gesucht.set(true);
    this.store.sucheNachAuftragsId(auftragsId);
  }
}
