import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVariablesComponent } from './gestion-variables.component';

describe('GestionVariablesComponent', () => {
  let component: GestionVariablesComponent;
  let fixture: ComponentFixture<GestionVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
