import { TestBed } from '@angular/core/testing';

import { VilleBuilderService } from './ville-builder.service';

describe('VilleBuilderService', () => {
  let service: VilleBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VilleBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
