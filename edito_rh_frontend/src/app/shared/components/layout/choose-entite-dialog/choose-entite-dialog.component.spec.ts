import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseEntiteDialogComponent } from './choose-entite-dialog.component';

describe('ChooseEntiteDialogComponent', () => {
  let component: ChooseEntiteDialogComponent;
  let fixture: ComponentFixture<ChooseEntiteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseEntiteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseEntiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
