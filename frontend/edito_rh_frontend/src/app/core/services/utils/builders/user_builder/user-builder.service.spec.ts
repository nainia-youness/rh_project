import { TestBed } from '@angular/core/testing';

import { UserBuilderService } from './user-builder.service';

describe('UserBuilderService', () => {
  let service: UserBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
