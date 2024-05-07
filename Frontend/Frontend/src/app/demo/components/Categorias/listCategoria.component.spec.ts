import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListadoComponent } from './listCategoria.component';

describe('DepartamentosListadoComponent', () => {
  let component: CategoriaListadoComponent;
  let fixture: ComponentFixture<CategoriaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});