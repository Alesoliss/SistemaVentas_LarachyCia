import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoListadoComponent } from './listEmpleados.component';

describe('EmpleadosListadoComponent', () => {
  let component: EmpleadoListadoComponent;
  let fixture: ComponentFixture<EmpleadoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});