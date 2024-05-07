import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosListadoComponent } from './listCargo.component';

describe('DepartamentosListadoComponent', () => {
  let component: CargosListadoComponent;
  let fixture: ComponentFixture<CargosListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargosListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});