import { TestBed } from '@angular/core/testing';

import { VariableBuilderService } from './variable-builder.service';

describe('VariableBuilderService', () => {
  let service: VariableBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
