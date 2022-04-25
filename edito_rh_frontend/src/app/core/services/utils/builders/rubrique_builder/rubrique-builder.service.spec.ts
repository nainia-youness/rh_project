import { TestBed } from '@angular/core/testing';

import { RubriqueBuilderService } from './rubrique-builder.service';

describe('RubriqueBuilderService', () => {
  let service: RubriqueBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubriqueBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
