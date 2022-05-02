import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObjectsFieldComponent } from './update-objects-field.component';

describe('UpdateObjectsFieldComponent', () => {
  let component: UpdateObjectsFieldComponent;
  let fixture: ComponentFixture<UpdateObjectsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateObjectsFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObjectsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
