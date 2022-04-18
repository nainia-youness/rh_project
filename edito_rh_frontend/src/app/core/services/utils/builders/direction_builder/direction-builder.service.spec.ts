import { TestBed } from '@angular/core/testing';

import { DirectionBuilderService } from './direction-builder.service';

describe('DirectionBuilderService', () => {
  let service: DirectionBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
