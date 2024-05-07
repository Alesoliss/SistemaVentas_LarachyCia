import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesListadoComponent } from './listUnidad.component';

describe('DepartamentosListadoComponent', () => {
  let component: UnidadesListadoComponent;
  let fixture: ComponentFixture<UnidadesListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadesListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnidadesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});