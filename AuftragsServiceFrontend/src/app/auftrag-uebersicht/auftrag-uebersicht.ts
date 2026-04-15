import { Component, inject, OnInit, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { AuftragStore } from '../store/auftrag.store';
import { AuftragUebersichtDTO } from '../models/auftrag.models';

@Component({
  selector: 'app-auftrag-uebersicht',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './auftrag-uebersicht.html',
  styleUrl: './auftrag-uebersicht.css',
})
export class AuftragUebersicht implements OnInit {
  readonly store      = inject(AuftragStore);
  readonly dataSource = new MatTableDataSource<AuftragUebersichtDTO>([]);
  readonly spalten    = ['auftrag_id', 'dokumentenTyp', 'erstelltAm', 'inhalt'];

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sortingDataAccessor = (row, column) => {
        switch (column) {
          case 'auftrag_id':    return row.auftrag_id;
          case 'dokumentenTyp': return row.dokumentenTyp ?? '';
          case 'erstelltAm':   return row.erstelltAm ?? '';
          default:             return '';
        }
      };
      this.dataSource.sort = sort;
    }
  }

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.uebersicht();
    });
  }

  ngOnInit(): void {
    this.store.ladeAlle();
  }

  aktualisieren(): void {
    this.store.ladeAlle();
  }
}
