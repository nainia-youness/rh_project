import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSideNavComponent } from './header-side-nav.component';

describe('HeaderSideNavComponent', () => {
  let component: HeaderSideNavComponent;
  let fixture: ComponentFixture<HeaderSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
