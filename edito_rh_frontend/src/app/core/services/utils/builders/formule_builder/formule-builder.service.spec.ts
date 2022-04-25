import { TestBed } from '@angular/core/testing';

import { FormuleBuilderService } from './formule-builder.service';

describe('FormuleBuilderService', () => {
  let service: FormuleBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormuleBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
