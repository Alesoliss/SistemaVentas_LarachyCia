import { TestBed } from '@angular/core/testing';

import { RolServiceService } from './roles-service.service';

describe('RolServiceService', () => {
  let service: RolServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
