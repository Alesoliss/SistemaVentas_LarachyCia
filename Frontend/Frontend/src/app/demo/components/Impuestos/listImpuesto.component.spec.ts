import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestoListadoComponent } from './listImpuesto.component';

describe('ImpuestoListadoComponent', () => {
  let component: ImpuestoListadoComponent;
  let fixture: ComponentFixture<ImpuestoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpuestoListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpuestoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});