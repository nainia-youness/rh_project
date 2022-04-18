import { TestBed } from '@angular/core/testing';

import { ContratBuilderService } from './contrat-builder.service';

describe('ContratBuilderService', () => {
  let service: ContratBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
