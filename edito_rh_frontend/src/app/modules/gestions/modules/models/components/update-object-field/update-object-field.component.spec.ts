import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObjectFieldComponent } from './update-object-field.component';

describe('UpdateObjectFieldComponent', () => {
  let component: UpdateObjectFieldComponent;
  let fixture: ComponentFixture<UpdateObjectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateObjectFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObjectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
