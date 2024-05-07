import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesListadoComponent } from './listSucursales.component';

describe('SucursalesListadoComponent', () => {
  let component: SucursalesListadoComponent;
  let fixture: ComponentFixture<SucursalesListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalesListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});