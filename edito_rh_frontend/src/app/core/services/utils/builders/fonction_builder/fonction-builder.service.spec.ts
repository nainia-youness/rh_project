import { TestBed } from '@angular/core/testing';

import { FonctionBuilderService } from './fonction-builder.service';

describe('FonctionBuilderService', () => {
  let service: FonctionBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
