import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAffectationsComponent } from './gestion-affectations.component';

describe('GestionAffectationsComponent', () => {
  let component: GestionAffectationsComponent;
  let fixture: ComponentFixture<GestionAffectationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAffectationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
