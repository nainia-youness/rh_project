import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseEntiteComponent } from './choose-entite.component';

describe('ChooseEntiteComponent', () => {
  let component: ChooseEntiteComponent;
  let fixture: ComponentFixture<ChooseEntiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseEntiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
