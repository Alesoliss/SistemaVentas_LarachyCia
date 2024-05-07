import { TestBed } from '@angular/core/testing';

import { EstadosCivilesServiceService } from './estadosCiviles-service.service';

describe('EstadosCivilesServiceService', () => {
  let service: EstadosCivilesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosCivilesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
