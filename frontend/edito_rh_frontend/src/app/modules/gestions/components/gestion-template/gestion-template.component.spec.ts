import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTemplateComponent } from './gestion-template.component';

describe('GestionTemplateComponent', () => {
  let component: GestionTemplateComponent;
  let fixture: ComponentFixture<GestionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
