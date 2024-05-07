import { TestBed } from '@angular/core/testing';

import { CategoriasServiceservice } from './categorias-service.service';

describe('CategoriasServiceservice', () => {
  let service: CategoriasServiceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasServiceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
