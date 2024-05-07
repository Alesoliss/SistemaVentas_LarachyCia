import { TestBed } from '@angular/core/testing';

import { MunicipiosServiceService } from './municipios-service.service';

describe('MunicipiosServiceService', () => {
  let service: MunicipiosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipiosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
