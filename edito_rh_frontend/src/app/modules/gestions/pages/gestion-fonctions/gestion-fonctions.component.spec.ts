import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFonctionsComponent } from './gestion-fonctions.component';

describe('GestionFonctionsComponent', () => {
  let component: GestionFonctionsComponent;
  let fixture: ComponentFixture<GestionFonctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFonctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFonctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
