import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVillesComponent } from './gestion-villes.component';

describe('GestionVillesComponent', () => {
  let component: GestionVillesComponent;
  let fixture: ComponentFixture<GestionVillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionVillesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
