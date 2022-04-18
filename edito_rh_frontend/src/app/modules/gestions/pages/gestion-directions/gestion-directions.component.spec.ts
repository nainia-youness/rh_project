import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDirectionsComponent } from './gestion-directions.component';

describe('GestionDirectionsComponent', () => {
  let component: GestionDirectionsComponent;
  let fixture: ComponentFixture<GestionDirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDirectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
