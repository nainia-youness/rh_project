import { TestBed } from '@angular/core/testing';

import { EntiteBuilderService } from './entite-builder.service';

describe('EntiteBuilderService', () => {
  let service: EntiteBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntiteBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
