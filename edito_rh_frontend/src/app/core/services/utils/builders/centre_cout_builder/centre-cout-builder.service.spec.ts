import { TestBed } from '@angular/core/testing';

import { CentreCoutBuilderService } from './centre-cout-builder.service';

describe('CentreCoutBuilderService', () => {
  let service: CentreCoutBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreCoutBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
