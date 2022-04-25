import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFormulesComponent } from './gestion-formules.component';

describe('GestionFormulesComponent', () => {
  let component: GestionFormulesComponent;
  let fixture: ComponentFixture<GestionFormulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFormulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFormulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
