import { TestBed } from '@angular/core/testing';

import { EmployeBuilderService } from './employe-builder.service';

describe('EmployeBuilderService', () => {
  let service: EmployeBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
