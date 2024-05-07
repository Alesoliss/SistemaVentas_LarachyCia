import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasEncabezadoListadoComponent } from './listVenta.component';

describe('VentasEncabezadoListadoComponent', () => {
  let component: VentasEncabezadoListadoComponent;
  let fixture: ComponentFixture<VentasEncabezadoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasEncabezadoListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasEncabezadoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});