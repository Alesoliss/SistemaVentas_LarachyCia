import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalesViewModel } from '../../api/Models/SucursalesViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SucursalServiceService } from '../../api/Services/sucursal-service.service';



@Component({
  selector: 'app-list',
  templateUrl: './listSucursal.component.html',
  styleUrls: ['./listSucursales.component.css']
})
export class SucursalesListadoComponent implements OnInit {
  sucursal!: SucursalesViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
   EmpleadoSeleccionado: SucursalesViewModel = { 
    sucur_Id: 0, 
    sucur_Descripcion: '', 
    sucur_Direccion: '', 
    munic_Id: '', 
    sucur_Telefono: '', 
    sucur_UsuarioCreacion: 0,
    sucur_FechaCreacion: new Date(),
    sucur_UsuarioModificacion:  null,
    sucur_FechaModificacion:  null,
    sucur_Estado: null,
    munic_Descripcion: '',
    usuarioCreacion: '',
    usuarioModificacion: '',
 
 
};
  constructor(private service: SucursalServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getSucursal();
  }

onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.sucursal = this.sucursal.filter((sucur: SucursalesViewModel) => {
    return (
      sucur.sucur_Id.toString().toLowerCase().includes(searchText) ||
      sucur.sucur_Descripcion.toLowerCase().includes(searchText) ||
      sucur.sucur_Direccion.toLowerCase().includes(searchText) ||
      sucur.munic_Id.toLowerCase().includes(searchText) ||
      sucur.sucur_Telefono.toLowerCase().includes(searchText) ||
      sucur.munic_Descripcion.toString().toLowerCase().includes(searchText) ||
      sucur.usuarioCreacion.toString().toLowerCase().includes(searchText) ||
      sucur.usuarioModificacion.toString().toLowerCase().includes(searchText) ||
      (sucur.sucur_FechaCreacion && sucur.sucur_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (sucur.sucur_UsuarioModificacion && sucur.sucur_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((sucur.sucur_FechaModificacion && sucur.sucur_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
      ((sucur.sucur_Estado !== null && sucur.sucur_Estado.toString().toLowerCase().includes(searchText)))
    );
  });
}


getSucursal(): void {
    this.service.getSucursal().subscribe(
      (response: any) => {
        console.log(response);
        this.sucursal = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getSucursal();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editDepartamento(depto: SucursalesViewModel): void {
    this.EmpleadoSeleccionado = depto;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteDepartamento(depto: SucursalesViewModel): void {
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
  declarations: [SucursalesListadoComponent]
})
export class SucursalesListadoModule {}
