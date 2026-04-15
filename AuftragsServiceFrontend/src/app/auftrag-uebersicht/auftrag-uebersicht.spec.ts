import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragUebersicht } from './auftrag-uebersicht';

describe('AuftragUebersicht', () => {
  let component: AuftragUebersicht;
  let fixture: ComponentFixture<AuftragUebersicht>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuftragUebersicht],
    }).compileComponents();

    fixture = TestBed.createComponent(AuftragUebersicht);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
