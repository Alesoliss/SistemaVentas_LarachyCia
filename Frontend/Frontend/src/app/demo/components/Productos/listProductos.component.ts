import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosViewModel } from '../../api/Models/ProductoViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProductosServiceService } from '../../api/Services/productos-service.service';



@Component({
  selector: 'app-list',
  templateUrl: './listProductos.component.html',
  styleUrls: ['./listProductos.component.css']
})
export class ProductoListadoComponent implements OnInit {
  Productos!: ProductosViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
   EmpleadoSeleccionado: ProductosViewModel = { 
    Produ_Id: 0, 
    Produ_Descripcion: '', 
    Produ_Existencia: '', 
    Produ_PrecioCompra: '', 
    Produ_PrecioVenta: '', 
    Impue_Id: 0,
    Unida_Id: 0,
    Prove_Id: 0,
    Sucur_Id: 0,
    Produ_UsuarioCreacion: 0,
    Produ_FechaCreacion: new Date(),
    Produ_UsuarioModificacion:  null,
    Produ_FechaModificacion:  null,
    Produ_Estado: null,
    Produ_ImagenUrl: '',
    Unida_Descripcion: '',
    Prove_Marca: '',
    Impue_Descripcion: '',
    UsuarioCreacion: '',
    UsuarioModificacion: '',
    Categ_Descripcion: '',
    Sucur_Descripcion: '',
    Vende_Id: 0,
    Vende_Cantidad: '',
    Vende_UsuarioCreacion: 0,
    Vende_FechaCreacion: new Date(),
    Vende_UsuarioModificacion:  null,
    Vende_FechaModificacion:  null,
    Vende_Estado:  null,
    cliente: '',
};
  constructor(private service: ProductosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getCargo();
  }

onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.Productos = this.Productos.filter((Prod: ProductosViewModel) => {
    return (
      Prod.Produ_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Produ_Descripcion.toLowerCase().includes(searchText) ||
      Prod.Produ_Existencia.toLowerCase().includes(searchText) ||
      Prod.Produ_PrecioCompra.toLowerCase().includes(searchText) ||
      Prod.Produ_PrecioVenta.toLowerCase().includes(searchText) ||
      Prod.Impue_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Unida_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Prove_Id.toString().toLowerCase().includes(searchText) ||
      Prod.Sucur_Id.toString().toLowerCase().includes(searchText) ||
      Prod.UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
      Prod.UsuarioModificacion.toString().toLowerCase().includes(searchText) ||
      (Prod.Produ_FechaCreacion && Prod.Produ_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (Prod.Produ_UsuarioModificacion && Prod.Produ_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((Prod.Produ_FechaModificacion && Prod.Produ_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
      ((Prod.Produ_Estado !== null && Prod.Produ_Estado.toString().toLowerCase().includes(searchText)))
    );
  });
}


  getCargo(): void {
    this.service.getCargo().subscribe(
      (response: any) => {
        console.log(response);
        this.Productos = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getCargo();
  }

  openModal(): void {
    this.router.navigate(['app/ProductoCreate']);
  }

  closeModal(): void {
    this.showModal = false;
  }

  editDepartamento(depto: ProductosViewModel): void {
    this.EmpleadoSeleccionado = depto;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteDepartamento(depto: ProductosViewModel): void {
    this.EmpleadoSeleccionado = depto;
    this.deleteModal = true;
  }

  eliminarDepartamento(): void {
    this.deleteModal = false;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule
  ],
  declarations: [ProductoListadoComponent]
})
export class ProductosListadoModule {}
