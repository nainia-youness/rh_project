import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCentresCoutComponent } from './gestion-centres-cout.component';

describe('GestionCentresCoutComponent', () => {
  let component: GestionCentresCoutComponent;
  let fixture: ComponentFixture<GestionCentresCoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCentresCoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCentresCoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
