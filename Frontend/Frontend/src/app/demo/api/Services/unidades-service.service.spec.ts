import { TestBed } from '@angular/core/testing';

import { UnidadServiceService } from './unidades-service.service';

describe('UnidadServiceService', () => {
  let service: UnidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
