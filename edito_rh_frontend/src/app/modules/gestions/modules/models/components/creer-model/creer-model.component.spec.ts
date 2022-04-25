import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModelComponent } from './creer-model.component';

describe('CreerModelComponent', () => {
  let component: CreerModelComponent;
  let fixture: ComponentFixture<CreerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
