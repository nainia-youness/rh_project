import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNormalFieldComponent } from './update-normal-field.component';

describe('UpdateNormalFieldComponent', () => {
  let component: UpdateNormalFieldComponent;
  let fixture: ComponentFixture<UpdateNormalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNormalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNormalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
