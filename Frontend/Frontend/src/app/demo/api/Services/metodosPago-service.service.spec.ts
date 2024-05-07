import { TestBed } from '@angular/core/testing';

import { MetodopagoServiceService } from './metodosPago-service.service';

describe('MetodopagoServiceService', () => {
  let service: MetodopagoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodopagoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
