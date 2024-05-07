import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoViewModel } from '../../api/Models/EmpleadosViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { EmpleadosServiceService } from '../../api/Services/empleados-service.service';



@Component({
  selector: 'app-list',
  templateUrl: './listEmpleados.component.html',
  styleUrls: ['./listEmpleados.component.css']
})
export class EmpleadoListadoComponent implements OnInit {
  Empleados!: EmpleadoViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
   EmpleadoSeleccionado: EmpleadoViewModel = { 
    Emple_Id: 0, 
    Emple_DNI: 0,
    Emple_PrimerNombre: '', 
    Emple_SegundoApellido: '', 
    Emple_PrimerApellido: '', 
    Emple_SegundoNombre: '', 
    Emple_Sexo: '',
    Estad_Id: 0,
    Emple_Telefono:'',
    Emple_Correo:'',
    Emple_Direccion: '',
    Munic_Id: 0,
    Cargo_Id: 0,
    Emple_UsuarioCreacion: 0, 
    Emple_FechaCreacion: new Date(), 
    Emple_UsuarioModificacion: null, 
    Emple_FechaModificacion: null, 
    Emple_Estado: null, 
    Sucur_Id:0,
    UsuarioCreacion: '', 
  UsuarioModificacion: ''  ,
  Munic_Descripcion: '',
  Sucur_Descripcion: '',
  Cargo_Descripcion:''
};
  constructor(private service: EmpleadosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getCargo();
  }

onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.Empleados = this.Empleados.filter((Empl: EmpleadoViewModel) => {
    return (
      Empl.Emple_Id.toString().toLowerCase().includes(searchText) ||
      Empl.Emple_DNI.toString().toLowerCase().includes(searchText) ||
      Empl.Emple_PrimerNombre.toLowerCase().includes(searchText) ||
      Empl.Emple_SegundoApellido.toLowerCase().includes(searchText) ||
      Empl.Emple_PrimerApellido.toLowerCase().includes(searchText) ||
      Empl.Emple_SegundoNombre.toLowerCase().includes(searchText) ||
      Empl.Emple_Sexo.toLowerCase().includes(searchText) ||
      Empl.Estad_Id.toString().toLowerCase().includes(searchText) ||
      Empl.Emple_Telefono.toString().toLowerCase().includes(searchText) ||
      Empl.Emple_Correo.toLowerCase().includes(searchText) ||
      Empl.Emple_Direccion.toLowerCase().includes(searchText) ||
      Empl.Munic_Id.toString().toLowerCase().includes(searchText) ||
      Empl.Cargo_Id.toString().toLowerCase().includes(searchText) ||
      Empl.Sucur_Id.toString().toLowerCase().includes(searchText) ||
      Empl.UsuarioCreacion.toString().toLowerCase().includes(searchText) ||
      Empl.UsuarioModificacion.toString().toLowerCase().includes(searchText) ||
      (Empl.Emple_FechaCreacion && Empl.Emple_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (Empl.Emple_UsuarioModificacion && Empl.Emple_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((Empl.Emple_FechaModificacion && Empl.Emple_FechaModificacion.toString().toLowerCase().includes(searchText))) ||
      ((Empl.Emple_Estado !== null && Empl.Emple_Estado.toString().toLowerCase().includes(searchText)))
    );
  });
}


  getCargo(): void {
    this.service.getCargo().subscribe(
      (response: any) => {
        console.log(response);
        this.Empleados = response.data;
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
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editDepartamento(depto: EmpleadoViewModel): void {
    this.EmpleadoSeleccionado = depto;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteDepartamento(depto: EmpleadoViewModel): void {
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
  declarations: [EmpleadoListadoComponent]
})
export class EmpleadosListadoModule {}
