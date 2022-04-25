import { TestBed } from '@angular/core/testing';

import { FormuleService } from './formule.service';

describe('FormuleService', () => {
  let service: FormuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
