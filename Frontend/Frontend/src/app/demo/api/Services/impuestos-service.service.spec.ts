import { TestBed } from '@angular/core/testing';

import { ImpuestoServiceService } from './impuestos-service.service';

describe('ImpuestoServiceService', () => {
  let service: ImpuestoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpuestoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
