import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragsNavigation } from './auftrags-navigation';

describe('AuftragsNavigation', () => {
  let component: AuftragsNavigation;
  let fixture: ComponentFixture<AuftragsNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuftragsNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(AuftragsNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
