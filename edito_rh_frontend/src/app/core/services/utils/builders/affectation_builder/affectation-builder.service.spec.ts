import { TestBed } from '@angular/core/testing';

import { AffectationBuilderService } from './affectation-builder.service';

describe('AffectationBuilderService', () => {
  let service: AffectationBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
