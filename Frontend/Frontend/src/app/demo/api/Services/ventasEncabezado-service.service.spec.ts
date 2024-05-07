import { TestBed } from '@angular/core/testing';

import { ventasEncabezadoServiceService } from './ventasEncabezado-service';

describe('ventasEncabezadoServiceService', () => {
  let service: ventasEncabezadoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ventasEncabezadoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
