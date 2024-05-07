import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteViewModel } from '../../api/Models/ClientesViewModel';
import { DepartamentoServiceService } from '../../api/Services/departamento-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ClienteServiceService } from '../../api/Services/clientes-service.service';



@Component({
  selector: 'app-list',
  templateUrl: './listCliente.component.html',
  styleUrls: ['./listCliente.component.css']
})
export class ClientesListadoComponent implements OnInit {
  Cliente!: ClienteViewModel[];
  showModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
   EmpleadoSeleccionado: ClienteViewModel = { 
    clien_Id: 0, 
    clien_PrimerNombre: '', 
    clien_SegundoNombre: '', 
    clien_PrimerApellido: '', 
    clien_SegundoApellido: '', 
    clien_Sexo: '', 
    munic_Id: '', 
    estad_Id: 0, 
    clien_Telefono: '',
    clien_Correo: '',  
    clien_Direccion: '',
    clien_UsuarioCreacion: 0,
    clien_FechaCreacion: new Date(),
    clien_UsuarioModificacion:  null,
    clien_FechaModificacion:  null,
    munic_Descripcion: '',
    estad_Descripcion: '',
    usuarioCreacion: '',
    usuarioModificacion: '',
 
 
};
  constructor(private service: ClienteServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getCliente();
  }

onGlobalFilter(event: any): void {
  const searchText = event.target.value.toLowerCase();
  this.Cliente = this.Cliente.filter((Clien: ClienteViewModel) => {
    return (
      Clien.clien_Id.toString().toLowerCase().includes(searchText) ||
      Clien.clien_PrimerNombre.toLowerCase().includes(searchText) ||
      Clien.clien_SegundoNombre.toLowerCase().includes(searchText) ||
      Clien.clien_PrimerApellido.toLowerCase().includes(searchText) ||
      Clien.clien_SegundoApellido.toLowerCase().includes(searchText) ||
      Clien.clien_Sexo.toLowerCase().includes(searchText) ||
      Clien.munic_Id.toLowerCase().includes(searchText) ||
      Clien.estad_Id.toString().toLowerCase().includes(searchText) ||
      Clien.clien_Telefono.toLowerCase().includes(searchText) ||
      Clien.clien_Correo.toLowerCase().includes(searchText) ||
      Clien.clien_Direccion.toLowerCase().includes(searchText) ||
      Clien.munic_Descripcion.toString().toLowerCase().includes(searchText) ||
      Clien.estad_Descripcion.toString().toLowerCase().includes(searchText) ||
      Clien.usuarioCreacion.toString().toLowerCase().includes(searchText) ||
      Clien.usuarioModificacion.toString().toLowerCase().includes(searchText) ||
      (Clien.clien_FechaCreacion && Clien.clien_FechaCreacion.toString().toLowerCase().includes(searchText)) ||
      (Clien.clien_UsuarioModificacion && Clien.clien_UsuarioModificacion.toString().toLowerCase().includes(searchText)) ||
      ((Clien.clien_FechaModificacion && Clien.clien_FechaModificacion.toString().toLowerCase().includes(searchText))) 
    );
  });
}


getCliente(): void {
    this.service.getCliente().subscribe(
      (response: any) => {
        console.log(response);
        this.Cliente = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  clear(): void {
    this.getCliente();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  editDepartamento(depto: ClienteViewModel): void {
    this.EmpleadoSeleccionado = depto;
    this.editModal = true;
  }

  guardarCambios(): void {
    this.editModal = false;
  }

  deleteDepartamento(depto: ClienteViewModel): void {
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
  declarations: [ClientesListadoComponent]
})
export class ClienteListadoModule {}
