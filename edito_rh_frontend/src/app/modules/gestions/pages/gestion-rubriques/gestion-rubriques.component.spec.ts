import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRubriquesComponent } from './gestion-rubriques.component';

describe('GestionRubriquesComponent', () => {
  let component: GestionRubriquesComponent;
  let fixture: ComponentFixture<GestionRubriquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRubriquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRubriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
