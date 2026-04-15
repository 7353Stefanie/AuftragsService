import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuftragsStatus, AuftragErstellenAnfrage } from '../models/auftrag.models';
import { AuftragStore } from '../store/auftrag.store';
import { FehlerNachricht } from '../fehler-nachricht/fehler-nachricht';

@Component({
  selector: 'app-auftrag-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    FehlerNachricht,
  ],
  templateUrl: './auftrag-form.component.html',
  styleUrls: ['./auftrag-form.component.css'],
})
export class AuftragFormComponent {
  readonly store = inject(AuftragStore);

  readonly kundenId      = signal<string>('');
  readonly dokumentenTyp = signal<AuftragsStatus>('');
  readonly inhalt        = signal<string>('');
  readonly touched       = signal<Record<string, boolean>>({});

  readonly kundenIdValid      = computed(() => { const v = parseInt(this.kundenId(), 10); return !isNaN(v) && v > 0; });
  readonly dokumentenTypValid = computed(() => this.dokumentenTyp() !== '');
  readonly inhaltValid        = computed(() => this.inhalt().trim() !== '');
  readonly formValid          = computed(() => this.kundenIdValid() && this.dokumentenTypValid() && this.inhaltValid());

  readonly statusOptions: AuftragsStatus[] = ['ERHALTEN', 'IN_BEARBEITUNG', 'BESTAETIGT', 'ABGELEHNT'];

  onKundenIdInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');
    input.value = digits;
    this.kundenId.set(digits);
  }

  touch(field: string): void {
    this.touched.update(t => ({ ...t, [field]: true }));
  }

  showError(field: string, valid: boolean): boolean {
    return !!this.touched()[field] && !valid;
  }

  onSubmit(): void {
    this.touched.set({ kundenId: true, dokumentenTyp: true, inhalt: true });
    if (!this.formValid()) return;

    const payload: AuftragErstellenAnfrage = {
      kundenId:      parseInt(this.kundenId(), 10),
      dokumentenTyp: this.dokumentenTyp(),
      inhalt:        this.inhalt(),
    };

    this.store.erfasseAuftrag(payload);
  }
}
