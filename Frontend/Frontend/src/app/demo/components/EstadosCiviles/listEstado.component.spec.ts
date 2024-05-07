import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilListadoComponent } from './listEstado.component';

describe('EstadoCivilListadoComponent', () => {
  let component: EstadoCivilListadoComponent;
  let fixture: ComponentFixture<EstadoCivilListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoCivilListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoCivilListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});